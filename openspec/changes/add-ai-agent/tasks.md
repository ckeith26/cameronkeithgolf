## 1. Infrastructure Setup
- [x] 1.1 Remove `output: "export"` from `next.config.ts` to enable API routes
- [x] 1.2 Install dependencies: `@langchain/langgraph`, `@langchain/openai`, `@langchain/core`
- [x] 1.3 Add `.env.local` with `XAI_API_KEY` placeholder and create `.env.example` for documentation

## 2. Agent Backend
- [x] 2.1 Create knowledge base module (`src/lib/agent/knowledge.ts`) — structures existing data files into agent-consumable text format
- [x] 2.2 Create agent tools (`src/lib/agent/tools.ts`) — `navigate` and `get_info` tool definitions using LangChain tool schema
- [x] 2.3 Create LangGraph agent graph (`src/lib/agent/graph.ts`) — ReAct-style graph with Grok 4.1 fast via xAI API
- [x] 2.4 Create API route handler (`src/app/api/agent/route.ts`) — streaming POST endpoint that invokes the LangGraph agent

## 3. Chat Widget Frontend
- [x] 3.1 Create chat widget component (`src/components/interactive/ChatWidget.tsx`) — floating toggle button + expandable chat panel with message list and input
- [x] 3.2 Create message rendering — user/assistant message bubbles, typing/streaming indicator, navigation action display
- [x] 3.3 Add chat widget to root layout (`src/app/layout.tsx`) as a client-side overlay
- [x] 3.4 Implement client-side navigation handling — when agent responds with a `navigate` action, trigger `router.push()` from the widget

## 4. Integration & Polish
- [x] 4.1 Style chat widget to match existing dark theme (dark background, green accent, monospace where appropriate)
- [x] 4.2 Add keyboard shortcut to toggle chat (Cmd/Ctrl+K)
- [ ] 4.3 Test end-to-end: ask questions, verify navigation, check streaming responses
- [x] 4.4 Verify build succeeds with new server-side configuration
