## ADDED Requirements

### Requirement: AI Agent Chat Interface
The system SHALL provide a floating chat widget accessible from all pages that allows users to ask natural-language questions about Cameron Keith.

#### Scenario: User opens chat widget
- **WHEN** user clicks the chat button in the bottom-right corner
- **THEN** a chat panel expands with a greeting message and input field

#### Scenario: User asks a question
- **WHEN** user types a question and submits it
- **THEN** the agent responds with accurate information based on Cameron's portfolio data
- **AND** the response streams in progressively

#### Scenario: User closes chat widget
- **WHEN** user clicks the close button or chat toggle
- **THEN** the chat panel collapses but conversation history is preserved in memory

### Requirement: Agent Navigation Capability
The system SHALL allow the AI agent to navigate users to relevant pages within the portfolio site.

#### Scenario: Agent navigates on request
- **WHEN** user asks about a topic that corresponds to a specific page (e.g., "show me your projects")
- **THEN** the agent navigates the user to the relevant page (e.g., `/projects`)
- **AND** displays a message confirming the navigation

#### Scenario: Navigation preserves chat state
- **WHEN** the agent invokes the navigate tool with a valid route
- **THEN** the browser navigates to that route using client-side routing
- **AND** the chat widget remains open with conversation history preserved

### Requirement: Agent Knowledge Base
The system SHALL provide the AI agent with comprehensive knowledge about Cameron Keith sourced from existing portfolio data files.

#### Scenario: User asks about projects
- **WHEN** user asks about projects Cameron has built
- **THEN** the agent responds with information from the projects data including names, descriptions, and tech stacks

#### Scenario: User asks about golf career
- **WHEN** user asks about golf achievements or stats
- **THEN** the agent responds with accurate information from the golf data

#### Scenario: User asks about experience
- **WHEN** user asks about work experience or education
- **THEN** the agent responds with information from the experience data

### Requirement: Conversation Memory
The system SHALL maintain conversation history within a browser session using client-side React state.

#### Scenario: Multi-turn conversation
- **WHEN** user asks a follow-up question referencing a previous exchange
- **THEN** the agent responds with context from the conversation history

#### Scenario: Cross-page persistence
- **WHEN** user navigates between pages
- **THEN** the conversation history persists in the chat widget

### Requirement: LangGraph Agent Architecture
The system SHALL use LangGraph.js to orchestrate the AI agent with Grok 4.1 fast (non-thinking) via xAI API as the underlying LLM.

#### Scenario: Agent processes request via LangGraph
- **WHEN** a user message is received by the `/api/agent` endpoint
- **THEN** the LangGraph agent graph processes it through the LLM and available tools
- **AND** returns a streaming response

#### Scenario: Agent uses tools
- **WHEN** the agent determines a tool call is needed (navigate or get_info)
- **THEN** the tool is executed within the LangGraph graph
- **AND** the result is incorporated into the agent's final response
