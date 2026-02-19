# Live Terminal Agent Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the homepage Terminal from a static demo into a live AI agent with a Claude Code-style boot sequence, and add a breathing animation to the floating ChatWidget (hidden on homepage).

**Architecture:** Rewrite `Terminal.tsx` to merge in the AI streaming, slash commands, and navigation from `ChatWidget.tsx`, adapting the rendering for terminal-style output (no chat bubbles). Update `ChatWidget.tsx` to hide on `/` and pulse its FAB. No backend changes — same `/api/agent` endpoint.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, react-markdown, Framer Motion (useReducedMotion)

---

### Task 1: Rewrite Terminal.tsx — Boot Sequence + AI Agent

**Files:**
- Modify: `src/components/interactive/Terminal.tsx` (full rewrite, keeping shell: title bar, typewriter util, IntersectionObserver)

**Step 1: Replace intro content with Claude Code-style boot sequence**

Replace the `INTRO_LINES` constant with a boot sequence. These are the lines that typewrite on scroll:

```typescript
const BOOT_LINES = [
  { text: "$ cam-code init", style: "command" },
  { text: "⠋ Loading context...", style: "muted", delay: 600 },
  { text: "✓ Cameron Keith — D1 Golfer / AI Engineer / Dartmouth '26", style: "success" },
  { text: "✓ Ready", style: "success", delay: 400 },
  { text: "", style: "muted" },
  { text: "Hey! I'm Cam Code — Cameron's AI assistant.", style: "greeting" },
  { text: "Ask me anything or type /help for commands.", style: "greeting" },
];
```

Each line has a `style` field so the renderer can color them differently:
- `command` → green `$ ` prefix, white text
- `muted` → gray text
- `success` → green `✓`
- `greeting` → white/light text

**Step 2: Add AI streaming, slash commands, and state**

Add these imports and state to Terminal:

```typescript
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
```

Port from ChatWidget into Terminal:
- `SLASH_COMMANDS` and `ROUTE_MAP` constants (exact copy from ChatWidget lines 23-47)
- `buildHelpText()` function (exact copy from ChatWidget lines 49-54)
- `Message` interface (exact copy from ChatWidget lines 7-12)
- `STORAGE_KEY` — use `"ck-terminal-messages"` (separate from chat widget)
- `loadMessages()` function adapted for terminal (loads from localStorage)

New state for the live agent:

```typescript
const [messages, setMessages] = useState<Message[]>([]);
const [isLoading, setIsLoading] = useState(false);
const router = useRouter();
```

**Step 3: Add handleSlashCommand and sendMessage**

Port `handleSlashCommand` from ChatWidget (lines 184-245). Adapt it to append terminal-style lines to `displayedLines` instead of chat bubbles. For example, a `/help` command should render as:

```
$ > /help
Available commands:
  /help     — Show available commands
  /clear    — Clear conversation
  /about    — Go to about page
  ...
```

Port `sendMessage` from ChatWidget (lines 248-372). The key adaptation: instead of updating a `messages` state that renders as chat bubbles, AI responses should be appended to `displayedLines` as terminal output lines. The streaming logic stays the same (fetch `/api/agent`, read stream, parse JSON events), but the text content gets split by newlines and pushed to `displayedLines`.

For the streaming accumulation:
- When a `text` event arrives, append to a `streamingContent` ref
- Split `streamingContent` by `\n` and update the last N displayed lines to match
- This gives the natural streaming feel within terminal output

**Step 4: Adapt the output renderer**

The existing renderer maps `displayedLines` to `<div>` elements. Extend it to handle:

1. **Boot lines** — already styled by the `style` field during typewriter
2. **User commands** — lines starting with `$ >` get green prefix + white text (already works)
3. **AI responses** — rendered with `ReactMarkdown` using terminal-adapted components:
   - `p` → `<div className="leading-relaxed text-[#e4e4e7]">`
   - `strong` → `<strong className="text-[#fafafa]">`
   - `code` → `<code className="text-[#10b981] bg-[#1a1a1a] px-1 rounded">`
   - `ul/ol/li` → indented with muted bullets
   - `a` → green underlined links

The key distinction: boot lines and user commands are plain strings in `displayedLines`. AI responses need markdown rendering. Use a `TerminalLine` type:

```typescript
type TerminalLine =
  | { type: "text"; content: string; style?: "command" | "muted" | "success" | "greeting" }
  | { type: "ai"; content: string }
  | { type: "nav"; status: "pending" | "done"; route: string };
```

Replace `displayedLines: string[]` with `lines: TerminalLine[]`.

**Step 5: Wire up input to sendMessage instead of handleCommand**

After boot completes, the input should:
1. Check for slash commands first (same as ChatWidget)
2. If not a slash command, call `sendMessage` which streams from `/api/agent`
3. Show a loading indicator (bouncing dots or spinner) during streaming
4. Disable input while loading

Replace the existing `handleCommand` callback with a new one that delegates to slash commands or AI:

```typescript
const handleInput = useCallback(async () => {
  const trimmed = inputValue.trim();
  if (!trimmed || isLoading) return;
  setInputValue("");

  // Show the command in terminal
  setLines(prev => [...prev, { type: "text", content: `$ > ${trimmed}`, style: "command" }]);

  // Check slash commands
  if (trimmed.startsWith("/")) {
    if (handleSlashCommand(trimmed)) return;
    setLines(prev => [...prev, {
      type: "text",
      content: `Unknown command. Type /help for available commands.`,
      style: "muted"
    }]);
    return;
  }

  // AI message
  await sendMessage(trimmed);
}, [inputValue, isLoading, handleSlashCommand, sendMessage]);
```

**Step 6: Add localStorage persistence**

After boot, load previous conversation from `ck-terminal-messages`. Persist messages (not displayed lines — messages are the semantic data) to localStorage on change. On return visits where localStorage has data, skip the boot sequence and show the previous conversation with a fresh prompt.

**Step 7: Verify in browser**

Run: `npm run dev`
Expected:
- Scroll to terminal section on homepage
- Boot sequence typewriters line by line
- After boot, cursor is active
- Type a question → AI streams response in terminal style
- Type `/help` → shows slash commands
- Type `/projects` → navigates to /projects
- Refresh page → previous conversation restored, boot skipped

---

### Task 2: Update ChatWidget.tsx — Breathing Animation + Hide on Homepage

**Files:**
- Modify: `src/components/interactive/ChatWidget.tsx`

**Step 1: Add breathing animation keyframes**

In the existing `useEffect` that injects `terminal-blink-style`, also inject a breathing animation:

```css
@keyframes cam-code-breathe {
  0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
  50% { box-shadow: 0 0 35px rgba(16, 185, 129, 0.55); }
}
```

**Step 2: Apply breathing to the FAB button**

Update the toggle button's style to use the breathing animation:

```tsx
style={{
  animation: isOpen ? "none" : "cam-code-breathe 3s ease-in-out infinite",
}}
```

Remove the existing static `boxShadow` on the button (line 644) since the animation handles it.

**Step 3: Hide on homepage**

Add `usePathname` import:

```typescript
import { useRouter, usePathname } from "next/navigation";
```

At the top of the component:

```typescript
const pathname = usePathname();
const isHomepage = pathname === "/";
```

Wrap the entire return in a homepage check:

```tsx
if (isHomepage) return null;
```

**Step 4: Verify in browser**

Run: `npm run dev`
Expected:
- On homepage (`/`): no floating button visible
- On `/about` or any other page: FAB visible with gentle emerald glow pulse
- Click FAB: chat opens, pulse stops
- Close chat: pulse resumes

---

### Task 3: Verify Integration

**Step 1: Full flow test**

1. Navigate to homepage → scroll to terminal → boot sequence plays → type "what projects has cameron built?" → AI streams response
2. Type `/about` → navigates to about page → floating ChatWidget FAB appears with breathing glow
3. Click FAB → chat widget opens → ask a question → works independently
4. Navigate back to `/` → FAB disappears, terminal is still there
5. Refresh homepage → previous terminal conversation loads, boot skipped

**Step 2: Commit**

```bash
git add src/components/interactive/Terminal.tsx src/components/interactive/ChatWidget.tsx
git commit -m "feat: bring terminal to life with AI agent, add breathing animation to chat widget"
```
