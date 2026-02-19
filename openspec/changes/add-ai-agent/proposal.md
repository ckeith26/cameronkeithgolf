# Change: Add AI Agent Chat Widget

## Why
Users visiting Cameron's portfolio should be able to ask natural-language questions about his background, projects, golf career, and experience — and get intelligent, contextual answers. The agent can also navigate users to relevant pages, creating an interactive guide experience.

## What Changes
- **BREAKING**: Remove static export (`output: "export"`) to enable Next.js API routes
- Add LangGraph.js agent with Grok 4.1 fast (xAI) as the LLM
- Add `/api/agent` streaming endpoint for agent conversations
- Add floating chat widget component accessible from all pages
- Agent has tools to navigate users to pages and search Cameron's knowledge base
- Conversation memory maintained in client-side React state

## Impact
- Affected specs: new `ai-agent` capability
- Affected code: `next.config.ts`, new API route, new components, new lib files
- Deployment: Requires server-capable hosting (Vercel, etc.) instead of pure static hosting
