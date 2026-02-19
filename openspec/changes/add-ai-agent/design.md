## Context
The portfolio site is currently a statically exported Next.js 16 app. Adding an AI agent requires server-side API routes for secure API key handling and LLM inference. This introduces a new architectural pattern (server-side AI processing) and external dependencies (xAI Grok API, LangGraph.js).

## Goals / Non-Goals
- Goals:
  - Users can ask anything about Cameron and get accurate, contextual answers
  - Agent can navigate users to relevant pages via client-side routing
  - Conversation feels natural and responsive (streaming)
  - Conversation memory persists within a browser session
- Non-Goals:
  - Persistent memory across sessions (future enhancement)
  - Complex multi-step tool chains (keep it simple for v1)
  - Voice input/output
  - Admin panel for managing agent behavior

## Decisions

### LLM Provider: xAI Grok 4.1 fast (non-thinking)
- **Why**: User-specified. Fast inference, good quality, cost-effective.
- **Integration**: OpenAI-compatible API via `@langchain/openai`'s `ChatOpenAI` with custom base URL (`https://api.x.ai/v1`).
- **Alternative**: Anthropic Claude or OpenAI GPT — but Grok was explicitly requested.

### Agent Framework: LangGraph.js
- **Why**: User-specified. Provides structured agent graphs with tool calling and state management.
- **Pattern**: Simple ReAct-style graph: LLM node → conditional tool execution → LLM node.
- **Alternative**: Plain LangChain agent chain — but LangGraph gives finer control over agent flow.

### API Architecture: Next.js Route Handler with Streaming
- **Endpoint**: `POST /api/agent`
- **Request body**: `{ messages: Message[] }`
- **Response**: Streamed text via `ReadableStream` with agent responses.
- **Why streaming**: Grok responses can take a few seconds; streaming shows partial results immediately for better UX.

### Chat Widget: Floating overlay
- **Why**: Accessible from every page without disrupting layout. Common UX pattern for AI assistants.
- **Position**: Bottom-right corner, expandable chat panel.
- **Styling**: Matches existing dark theme (`bg-[#111111]`, green accent `#10b981`, monospace font).

### Agent Tools
1. **`navigate`**: Navigates the user to a page route. Agent passes the route path; client-side handler calls `router.push()`.
2. **`get_info`**: Retrieves structured information about Cameron from the knowledge base. Accepts a topic parameter (about, projects, experience, golf, coursework, contact).

### Knowledge Base: Structured data from existing files
- **Approach**: Import the existing TypeScript data files (`projects.ts`, `about.ts`, `experience.ts`, `golf.ts`, `coursework.ts`, `navigation.ts`) and format them as structured text for tool responses.
- **Why not RAG/embeddings**: The total data is small (~10KB). All fits easily in context. RAG adds unnecessary complexity for v1.
- **System prompt**: Concise persona instructions ("You are Cameron Keith's AI assistant...") plus guidance on when to use each tool.

### Memory: Client-side conversation history
- **Approach**: Full message array maintained in React state and sent with each API request.
- **Trade-off**: Slightly more bandwidth per request, but avoids server-side state/database.
- **Limit**: Cap at last 50 messages to prevent context overflow.

### Deployment Change
- **Current**: `output: "export"` → static HTML to `/out`
- **New**: Remove `output: "export"` to enable API routes
- **Impact**: Must deploy to server-capable host (Vercel handles this natively with zero config).

## Risks / Trade-offs
- **API key security**: xAI key stored as `XAI_API_KEY` in `.env.local`, never exposed to client → Mitigation: server-side only, verified in deployment settings.
- **Cost**: Each chat message incurs xAI API call → Mitigation: Grok 4.1 fast is cost-effective; rate limiting can be added later.
- **Deployment migration**: Breaking change from static to server export → Mitigation: Vercel handles Next.js natively; minimal config change.

## Open Questions
- Rate limiting strategy for production (defer to post-v1)
- Whether to add persistent memory via database (defer to post-v1)
