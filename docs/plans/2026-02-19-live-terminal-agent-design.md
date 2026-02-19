# Live Terminal Agent Design

## Date: 2026-02-19

## Summary

Transform the homepage Terminal from a static, hardcoded component into a live AI agent powered by the existing LangChain/LangGraph backend. Enhance the floating ChatWidget on other pages with a breathing animation and hide it on the homepage where the terminal serves as the agent.

## Homepage Terminal — Boot Sequence

When the user scrolls to the terminal section, it plays a Claude Code-inspired boot sequence via typewriter effect:

```
$ cam-code init
⠋ Loading context...
✓ Cameron Keith — D1 Golfer / AI Engineer / Dartmouth '26
✓ Ready

Hey! I'm Cam Code. Ask me anything about Cameron,
his projects, or golf career.

$ > _
```

The boot types out line by line with realistic delays. After it finishes, the cursor is live and connected to the AI backend.

## Homepage Terminal — Live Interaction

Once booted, the terminal is a real AI agent:

- User types questions at the `$ >` prompt
- Responses stream in token-by-token from the existing `/api/agent` LangChain endpoint
- Slash commands work (`/help`, `/projects`, `/golf`, etc.) with the same navigation behavior as the current ChatWidget
- Markdown from AI responses gets terminal-adapted rendering (green for code, muted for text — no chat bubbles)
- Same conversation persistence via localStorage

## Technical Approach

- Refactor `Terminal.tsx` to merge the AI capabilities from ChatWidget (streaming, API calls, slash commands, navigation)
- Reuse the same `/api/agent` endpoint — no backend changes needed
- The boot intro replaces the current hardcoded `INTRO_LINES` and `COMMANDS`
- After boot, the terminal switches from typewriter mode to live streaming mode

## Floating Widget — Other Pages

- Breathing animation: gentle emerald glow pulse on the FAB (`box-shadow` animation, ~3s cycle)
- Hidden on homepage: ChatWidget uses `usePathname()` to detect `/` and hides the FAB + panel

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Boot sequence | Typewriter intro first | Builds anticipation, matches Claude Code CLI feel |
| AI response rendering | Stream naturally | Practical, fast, matches how real AI tools work |
| Floating widget life | Subtle breathing animation | Non-distracting, signals presence without popup spam |
| Homepage FAB | Hidden | Terminal IS the agent — no duplication needed |
