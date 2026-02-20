import { NextRequest, NextResponse } from "next/server";
import { createAgent } from "@/lib/agent/graph";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

export async function POST(request: NextRequest) {
  if (!process.env.XAI_API_KEY) {
    return NextResponse.json(
      { error: "XAI_API_KEY not configured" },
      { status: 500 }
    );
  }

  let body: { messages: { role: string; content: string }[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.messages || !Array.isArray(body.messages)) {
    return NextResponse.json(
      { error: "messages array required" },
      { status: 400 }
    );
  }

  const agent = createAgent();

  // Convert client messages to LangChain format
  const langchainMessages = body.messages.map(
    (m: { role: string; content: string }) => {
      if (m.role === "user") {
        return new HumanMessage(m.content);
      }
      return new AIMessage(m.content);
    }
  );

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        let navigateRoute: string | null = null;
        let openResume = false;

        const eventStream = agent.streamEvents(
          { messages: langchainMessages },
          { version: "v2" }
        );

        for await (const event of eventStream) {
          // Stream text content from the LLM
          if (event.event === "on_chat_model_stream") {
            const content = event.data.chunk?.content;
            if (content && typeof content === "string") {
              controller.enqueue(
                encoder.encode(
                  JSON.stringify({ type: "text", content }) + "\n"
                )
              );
            }
          }

          // Capture tool actions
          if (event.event === "on_tool_end") {
            try {
              const output =
                typeof event.data.output === "string"
                  ? event.data.output
                  : event.data.output?.content
                    ? String(event.data.output.content)
                    : String(event.data.output);
              const parsed = JSON.parse(output);
              if (parsed.action === "navigate") {
                navigateRoute = parsed.route;
              } else if (parsed.action === "open_resume") {
                openResume = true;
              }
            } catch {
              // Tool output wasn't parseable - ignore
            }
          }
        }

        // Send action events after text is complete
        if (navigateRoute) {
          controller.enqueue(
            encoder.encode(
              JSON.stringify({ type: "navigate", route: navigateRoute }) + "\n"
            )
          );
        }
        if (openResume) {
          controller.enqueue(
            encoder.encode(
              JSON.stringify({ type: "open_resume", url: "/cameron-keith-resume.pdf" }) + "\n"
            )
          );
        }

        controller.enqueue(
          encoder.encode(JSON.stringify({ type: "done" }) + "\n")
        );
      } catch {
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              type: "error",
              message: "Something went wrong. Please try again.",
            }) + "\n"
          )
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
