"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

// ── Types ────────────────────────────────────────────────────────────

interface TerminalProps {
  className?: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

type TerminalLine =
  | { type: "text"; content: string; style?: "command" | "muted" | "success" | "greeting" }
  | { type: "ai"; content: string }
  | { type: "nav"; status: "pending" | "done"; route: string }
  | { type: "loading" };

// ── Constants ────────────────────────────────────────────────────────

const STORAGE_KEY = "ck-terminal-messages";

const BOOT_LINES: { content: string; style?: "command" | "muted" | "success" | "greeting"; delay: number }[] = [
  { content: "$ cam-code init", style: "command", delay: 600 },
  { content: "⠋ Loading context...", style: "muted", delay: 800 },
  { content: "✓ Cameron Keith — D1 Golfer / AI Engineer / Dartmouth '26", style: "success", delay: 500 },
  { content: "✓ Ready", style: "success", delay: 600 },
  { content: "", style: undefined, delay: 300 },
  { content: "Hey! I'm Cam Code — Cameron's AI assistant.", style: "greeting", delay: 400 },
  { content: "Ask me anything or type /help for commands.", style: "greeting", delay: 300 },
];

const SLASH_COMMANDS: Record<string, { description: string; action: "navigate" | "resume" | "clear" | "help" }> = {
  "/help": { description: "Show available commands", action: "help" },
  "/clear": { description: "Clear conversation", action: "clear" },
  "/home": { description: "Go to home page", action: "navigate" },
  "/about": { description: "Go to about page", action: "navigate" },
  "/work": { description: "Go to work & experience", action: "navigate" },
  "/projects": { description: "Go to projects", action: "navigate" },
  "/golf": { description: "Go to golf page", action: "navigate" },
  "/blog": { description: "Go to blog", action: "navigate" },
  "/contact": { description: "Go to contact page", action: "navigate" },
  "/resume": { description: "Open Cameron's resume", action: "resume" },
};

const ROUTE_MAP: Record<string, string> = {
  "/home": "/",
  "/about": "/about",
  "/work": "/work",
  "/projects": "/projects",
  "/golf": "/golf",
  "/blog": "/blog",
  "/contact": "/contact",
};

// ── Helpers ──────────────────────────────────────────────────────────

function buildHelpLines(): TerminalLine[] {
  const lines: TerminalLine[] = [
    { type: "text", content: "Available commands:", style: "greeting" },
  ];
  for (const [cmd, { description }] of Object.entries(SLASH_COMMANDS)) {
    lines.push({ type: "text", content: `  ${cmd.padEnd(12)} ${description}`, style: "muted" });
  }
  return lines;
}

function loadMessages(): Message[] | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Message[];
      if (parsed.length > 0) return parsed;
    }
  } catch {
    // Corrupted storage — reset
  }
  return null;
}

function persistMessages(messages: Message[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-50)));
  } catch {
    // Storage full or unavailable
  }
}

function messagesToLines(messages: Message[]): TerminalLine[] {
  const lines: TerminalLine[] = [];
  for (const msg of messages) {
    if (msg.role === "user") {
      lines.push({ type: "text", content: `$ > ${msg.content}`, style: "command" });
    } else {
      lines.push({ type: "ai", content: msg.content });
    }
  }
  return lines;
}

// Keyframes for terminal-blink, terminal-dot-bounce, and cam-code-breathe
// are defined in globals.css

// ── Markdown Components for AI lines ─────────────────────────────────

const markdownComponents = {
  p: ({ children }: { children?: React.ReactNode }) => (
    <div className="leading-relaxed text-[#e4e4e7] mb-1 last:mb-0">{children}</div>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="text-[#fafafa] font-semibold">{children}</strong>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="text-[#10b981] bg-[#1a1a1a] px-1 rounded text-xs font-mono">{children}</code>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-inside ml-2 mb-1 last:mb-0 space-y-0.5 text-[#a1a1aa]">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-inside ml-2 mb-1 last:mb-0 space-y-0.5 text-[#a1a1aa]">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-[#e4e4e7]">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      className="text-[#10b981] underline hover:text-[#34d399]"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};

// ── Line Renderers ───────────────────────────────────────────────────

function renderTextLine(line: Extract<TerminalLine, { type: "text" }>) {
  const { content, style } = line;

  if (!content) return <span className="inline-block h-4">{"\u00A0"}</span>;

  switch (style) {
    case "command":
      if (content.startsWith("$ >")) {
        return (
          <span className="leading-relaxed">
            <span className="text-[#10b981]">$ &gt;</span>
            <span className="text-[#fafafa]">{content.slice(3)}</span>
          </span>
        );
      }
      if (content.startsWith("$ ")) {
        return (
          <span className="leading-relaxed">
            <span className="text-[#10b981]">$ </span>
            <span className="text-[#fafafa]">{content.slice(2)}</span>
          </span>
        );
      }
      return <span className="leading-relaxed text-[#10b981]">{content}</span>;

    case "muted":
      return <span className="leading-relaxed text-[#71717a]">{content}</span>;

    case "success":
      if (content.startsWith("✓")) {
        return (
          <span className="leading-relaxed">
            <span className="text-[#10b981]">✓</span>
            <span className="text-[#e4e4e7]">{content.slice(1)}</span>
          </span>
        );
      }
      return <span className="leading-relaxed text-[#10b981]">{content}</span>;

    case "greeting":
      return <span className="leading-relaxed text-[#e4e4e7]">{content}</span>;

    default:
      return <span className="leading-relaxed text-[#a1a1aa]">{content}</span>;
  }
}

function renderAiLine(line: Extract<TerminalLine, { type: "ai" }>) {
  if (!line.content) return null;
  return (
    <div className="leading-relaxed pl-1 border-l-2 border-[#27272a] ml-1 my-1">
      <ReactMarkdown components={markdownComponents}>{line.content}</ReactMarkdown>
    </div>
  );
}

function renderNavLine(line: Extract<TerminalLine, { type: "nav" }>) {
  return (
    <div className="flex items-center gap-2 leading-relaxed">
      {line.status === "pending" ? (
        <svg
          className="w-3.5 h-3.5 text-[#10b981] animate-spin shrink-0"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ) : (
        <span className="text-[#10b981] text-sm">✓</span>
      )}
      <span className="text-[#a1a1aa] font-mono text-xs">
        {line.status === "pending" ? `Navigating to ${line.route}...` : `Navigated to ${line.route}`}
      </span>
    </div>
  );
}

function renderLoadingLine() {
  return (
    <div className="flex items-center gap-1 py-1 pl-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block w-1.5 h-1.5 rounded-full bg-[#a1a1aa]"
          style={{
            animation: "terminal-dot-bounce 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

const blinkingCursor = (
  <span
    className="inline-block w-2 h-4 bg-[#10b981] align-middle ml-px"
    style={{ animation: "terminal-blink 1s step-end infinite" }}
  />
);

function renderLine(line: TerminalLine, index: number, showCursor?: boolean) {
  switch (line.type) {
    case "text":
      return (
        <div key={index}>
          {renderTextLine(line)}
          {showCursor && blinkingCursor}
        </div>
      );
    case "ai":
      return <div key={index}>{renderAiLine(line)}</div>;
    case "nav":
      return <div key={index}>{renderNavLine(line)}</div>;
    case "loading":
      return <div key={index}>{renderLoadingLine()}</div>;
  }
}

// ── Main Component ───────────────────────────────────────────────────

export function Terminal({ className }: TerminalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRestoredSession, setHasRestoredSession] = useState(false);

  const mountedRef = useRef(true);

  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  // ── Scroll to bottom ───────────────────────────────────────────────

  const scrollToBottom = useCallback(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, []);

  // ── Typewriter utility ─────────────────────────────────────────────

  const typeText = useCallback(
    (text: string, style?: "command" | "muted" | "success" | "greeting"): Promise<void> => {
      return new Promise((resolve) => {
        if (!text) {
          setLines((prev) => [...prev, { type: "text", content: "", style }]);
          resolve();
          return;
        }

        let currentIndex = 0;
        // Push an empty text line that we'll fill character by character
        setLines((prev) => [...prev, { type: "text", content: "", style }]);

        function typeNextChar() {
          if (!mountedRef.current) { resolve(); return; }
          if (currentIndex < text.length) {
            currentIndex++;
            setLines((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last.type === "text") {
                updated[updated.length - 1] = { ...last, content: text.slice(0, currentIndex) };
              }
              return updated;
            });
            scrollToBottom();
            const delay = 30 + Math.random() * 30;
            setTimeout(typeNextChar, delay);
          } else {
            resolve();
          }
        }

        typeNextChar();
      });
    },
    [scrollToBottom]
  );

  // ── Boot sequence ──────────────────────────────────────────────────

  const playBoot = useCallback(async () => {
    if (prefersReducedMotion) {
      // Skip animation — show all boot lines instantly
      setLines(BOOT_LINES.map((b) => ({ type: "text" as const, content: b.content, style: b.style })));
      setBootComplete(true);
      return;
    }

    setIsTyping(true);

    for (const bootLine of BOOT_LINES) {
      await typeText(bootLine.content, bootLine.style);
      await new Promise((r) => setTimeout(r, bootLine.delay));
    }

    setIsTyping(false);
    setBootComplete(true);
  }, [prefersReducedMotion, typeText]);

  // ── Check for existing session on mount ────────────────────────────

  useEffect(() => {
    const stored = loadMessages();
    if (stored && stored.length > 0) {
      setMessages(stored);
      setHasRestoredSession(true);
    }
  }, []);

  // ── Persist messages on every change ───────────────────────────────

  useEffect(() => {
    if (messages.length > 0) {
      persistMessages(messages);
    }
  }, [messages]);

  // ── IntersectionObserver to trigger boot on scroll ─────────────────

  useEffect(() => {
    if (hasStarted) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [hasStarted]);

  // ── Start boot or restore session when visible ─────────────────────

  useEffect(() => {
    if (!hasStarted) return;

    if (hasRestoredSession) {
      // Skip boot — show restored conversation with a fresh prompt
      const restoredLines = messagesToLines(messages);
      setLines(restoredLines);
      setBootComplete(true);
    } else {
      playBoot();
    }
    // Intentionally omits hasRestoredSession, messages, playBoot — only fires once when hasStarted becomes true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted]);

  // ── Focus input when boot completes ────────────────────────────────

  useEffect(() => {
    if (bootComplete) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [bootComplete, scrollToBottom]);

  // ── Slash command handler ──────────────────────────────────────────

  const handleSlashCommand = useCallback(
    (cmd: string): boolean => {
      const normalized = cmd.toLowerCase().trim();
      const command = SLASH_COMMANDS[normalized];
      if (!command) return false;

      // Show the command as a terminal line
      setLines((prev) => [...prev, { type: "text", content: `$ > ${normalized}`, style: "command" }]);

      // Also track in messages for AI context
      const userMsg: Message = { role: "user", content: normalized };

      switch (command.action) {
        case "help": {
          const helpLines = buildHelpLines();
          setLines((prev) => [...prev, ...helpLines]);
          const helpContent = Object.entries(SLASH_COMMANDS)
            .map(([c, { description }]) => `${c} — ${description}`)
            .join("\n");
          setMessages((prev) => [...prev, userMsg, { role: "assistant", content: helpContent }]);
          break;
        }

        case "clear":
          setLines([]);
          setMessages([]);
          localStorage.removeItem(STORAGE_KEY);
          break;

        case "navigate": {
          const route = ROUTE_MAP[normalized];
          if (route) {
            setLines((prev) => [...prev, { type: "nav", status: "pending", route }]);
            setMessages((prev) => [...prev, userMsg, { role: "assistant", content: `Navigating to ${route}` }]);
            router.push(route);
            setTimeout(() => {
              setLines((prev) => {
                const updated = [...prev];
                for (let i = updated.length - 1; i >= 0; i--) {
                  const line = updated[i];
                  if (line.type === "nav" && line.status === "pending" && line.route === route) {
                    updated[i] = { ...line, status: "done" };
                    break;
                  }
                }
                return updated;
              });
            }, 700);
          }
          break;
        }

        case "resume":
          window.open("/cameron-keith-resume.pdf", "_blank");
          setLines((prev) => [
            ...prev,
            { type: "text", content: "Opening Cameron's resume in a new tab.", style: "success" },
          ]);
          setMessages((prev) => [
            ...prev,
            userMsg,
            { role: "assistant", content: "Opening Cameron's resume in a new tab." },
          ]);
          break;
      }

      return true;
    },
    [router]
  );

  // ── Send AI message ────────────────────────────────────────────────

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      // Check for slash commands first
      if (trimmed.startsWith("/")) {
        if (handleSlashCommand(trimmed)) return;
        // Unknown slash command
        setLines((prev) => [
          ...prev,
          { type: "text", content: `$ > ${trimmed}`, style: "command" },
          { type: "text", content: `Unknown command "${trimmed}". Type /help to see available commands.`, style: "muted" },
        ]);
        return;
      }

      // Show user input as command line
      setLines((prev) => [...prev, { type: "text", content: `$ > ${trimmed}`, style: "command" }]);

      // Build messages for API — use functional updater to avoid stale closure
      const userMsg: Message = { role: "user", content: trimmed };
      let updatedMessages: Message[] = [];
      setMessages((prev) => {
        updatedMessages = [...prev, userMsg];
        return updatedMessages;
      });

      // Show loading indicator
      setIsLoading(true);
      setLines((prev) => [...prev, { type: "loading" }]);

      try {
        const response = await fetch("/api/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.slice(-50).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!response.ok) throw new Error("Request failed");

        // Remove loading indicator and add empty AI line for streaming
        setLines((prev) => {
          const filtered = prev.filter((l) => l.type !== "loading");
          return [...filtered, { type: "ai", content: "" }];
        });

        if (!response.body) throw new Error("No response stream");
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let accumulatedContent = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const jsonLines = buffer.split("\n");
          buffer = jsonLines.pop() || "";

          for (const jsonLine of jsonLines) {
            if (!jsonLine.trim()) continue;
            try {
              const event = JSON.parse(jsonLine);

              if (event.type === "text") {
                accumulatedContent += event.content;
                setLines((prev) => {
                  const updated = [...prev];
                  // Find the last AI line to update
                  for (let i = updated.length - 1; i >= 0; i--) {
                    if (updated[i].type === "ai") {
                      updated[i] = { type: "ai", content: accumulatedContent };
                      break;
                    }
                  }
                  return updated;
                });
                scrollToBottom();
              } else if (event.type === "navigate") {
                setLines((prev) => [
                  ...prev,
                  { type: "nav", status: "pending", route: event.route },
                ]);
                router.push(event.route);
                setTimeout(() => {
                  setLines((prev) => {
                    const updated = [...prev];
                    for (let i = updated.length - 1; i >= 0; i--) {
                      const line = updated[i];
                      if (line.type === "nav" && line.status === "pending") {
                        updated[i] = { ...line, status: "done" };
                        break;
                      }
                    }
                    return updated;
                  });
                }, 700);
              } else if (event.type === "open_resume") {
                window.open(event.url, "_blank");
              } else if (event.type === "error") {
                setLines((prev) => {
                  const updated = [...prev];
                  for (let i = updated.length - 1; i >= 0; i--) {
                    if (updated[i].type === "ai" && (updated[i] as Extract<TerminalLine, { type: "ai" }>).content === "") {
                      updated[i] = { type: "ai", content: event.message };
                      break;
                    }
                  }
                  return updated;
                });
              }
            } catch {
              // Skip malformed JSON lines
            }
          }
        }

        // Store the assistant response in messages
        if (accumulatedContent) {
          setMessages((prev) => [...prev, { role: "assistant", content: accumulatedContent }]);
        }
      } catch {
        // Remove loading indicator and show error
        setLines((prev) => {
          const filtered = prev.filter((l) => l.type !== "loading");
          // Check if there's an empty AI line to replace
          const lastIdx = filtered.length - 1;
          if (lastIdx >= 0 && filtered[lastIdx].type === "ai" && (filtered[lastIdx] as Extract<TerminalLine, { type: "ai" }>).content === "") {
            const updated = [...filtered];
            updated[lastIdx] = { type: "ai", content: "Sorry, something went wrong. Please try again." };
            return updated;
          }
          return [...filtered, { type: "ai", content: "Sorry, something went wrong. Please try again." }];
        });
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, something went wrong. Please try again." },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, router, handleSlashCommand, scrollToBottom]
  );

  // ── Handle submit ──────────────────────────────────────────────────

  const handleSubmit = useCallback(() => {
    if (!inputValue.trim()) return;
    const val = inputValue;
    setInputValue("");
    sendMessage(val);
  }, [inputValue, sendMessage]);

  // ── Render ─────────────────────────────────────────────────────────

  return (
    <div
      ref={containerRef}
      className={`bg-[#111111] rounded-lg border border-[#27272a] overflow-hidden ${className ?? ""}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#27272a]">
        <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
        <div className="w-3 h-3 rounded-full bg-[#eab308]" />
        <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
        <span className="ml-2 text-xs text-[#a1a1aa] font-mono">cam-code</span>
      </div>

      {/* Output */}
      <div
        ref={outputRef}
        className="p-4 font-mono text-sm min-h-[200px] max-h-[400px] overflow-y-auto"
      >
        {lines.map((line, i) =>
          renderLine(line, i, isTyping && i === lines.length - 1)
        )}

        {/* Input line */}
        {bootComplete && !isTyping && (
          <div className="flex items-center mt-1">
            <span className="text-[#10b981] font-mono text-sm">$ &gt;&nbsp;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              disabled={isLoading}
              className="flex-1 bg-transparent text-[#fafafa] font-mono text-sm outline-none caret-[#10b981] disabled:opacity-50"
              spellCheck={false}
              autoComplete="off"
              placeholder="Ask anything or /help..."
              aria-label="Terminal input"
            />
          </div>
        )}
      </div>
    </div>
  );
}
