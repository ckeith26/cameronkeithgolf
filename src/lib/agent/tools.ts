import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { getKnowledge } from "./knowledge";

export const navigateTool = tool(
  async ({ route }: { route: string }) => {
    return JSON.stringify({ action: "navigate", route });
  },
  {
    name: "navigate",
    description: `Navigate the user to a page on Cameron's portfolio site. Use this when the user wants to see a section or when you want to direct them somewhere relevant.

Top-level pages: /, /about, /work, /projects, /golf, /blog, /contact
Project detail pages: /projects/{slug} (e.g. /projects/brama-ai, /projects/guard-ai, /projects/coffee-chats)
Blog posts: /blog/{slug} (e.g. /blog/hello-world)

Use get_info("projects") first if you need to look up a project slug.`,
    schema: z.object({
      route: z
        .string()
        .describe(
          "The route path to navigate to, e.g. '/projects', '/projects/brama-ai', '/golf'"
        ),
    }),
  }
);

export const getInfoTool = tool(
  async ({ topic }: { topic: string }) => {
    return getKnowledge(topic);
  },
  {
    name: "get_info",
    description:
      "Retrieve detailed information about Cameron Keith from his portfolio data. Always use this tool to get accurate facts before answering questions about Cameron.",
    schema: z.object({
      topic: z
        .enum([
          "about",
          "projects",
          "experience",
          "golf",
          "coursework",
          "contact",
        ])
        .describe("The topic to retrieve information about"),
    }),
  }
);

export const shareResumeTool = tool(
  async () => {
    return JSON.stringify({
      action: "open_resume",
      url: "/cameron-keith-resume.pdf",
    });
  },
  {
    name: "share_resume",
    description:
      "Open Cameron Keith's resume PDF for the user. Use this when someone asks to see, download, or view his resume or CV.",
    schema: z.object({}),
  }
);

export const agentTools = [navigateTool, getInfoTool, shareResumeTool];
