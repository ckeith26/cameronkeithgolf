"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
  navStatus?: "pending" | "done";
  navRoute?: string;
}

const STORAGE_KEY = "ck-chat-messages";

const GREETING: Message = {
  role: "assistant",
  content:
    "Hey! I'm **Cam Code**, Cameron's AI assistant. Ask me anything or type `/help` to see available commands.",
};

// ── Slash commands ───────────────────────────────────────────────────
const SLASH_COMMANDS: Record<
  string,
  { description: string; action: "navigate" | "resume" | "clear" | "help" }
> = {
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

function buildHelpText(): string {
  const lines = Object.entries(SLASH_COMMANDS).map(
    ([cmd, { description }]) => `\`${cmd}\` - ${description}`
  );
  return `**Available commands:**\n${lines.join("\n")}`;
}

function loadMessages(): Message[] {
  if (typeof window === "undefined") return [GREETING];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Message[];
      if (parsed.length > 0) return parsed;
    }
  } catch {
    // Corrupted storage - reset
  }
  return [GREETING];
}

// ── Cam Code sparkle icon (Claude-inspired) ──────────────────────────
function CamCodeIcon({
  size = 20,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <circle cx="12" cy="12" r="2.2" />
      <rect x="11" y="1.5" width="2" height="8.5" rx="1" />
      <rect
        x="11.15"
        y="2.5"
        width="1.7"
        height="7.5"
        rx="0.85"
        transform="rotate(68 12 12)"
      />
      <rect
        x="11"
        y="3"
        width="2"
        height="7"
        rx="1"
        transform="rotate(140 12 12)"
      />
      <rect
        x="11.15"
        y="2"
        width="1.7"
        height="8"
        rx="0.85"
        transform="rotate(212 12 12)"
      />
      <rect
        x="11"
        y="2.5"
        width="2"
        height="7.5"
        rx="1"
        transform="rotate(284 12 12)"
      />
    </svg>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  // Load conversation from localStorage on mount
  useEffect(() => {
    setMessages(loadMessages());
  }, []);

  // Persist conversation to localStorage whenever messages change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-50)));
    } catch {
      // Storage full or unavailable
    }
  }, [messages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Keyboard shortcut: Cmd/Ctrl + K to toggle
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ── Handle slash commands ──────────────────────────────────────────
  const handleSlashCommand = useCallback(
    (cmd: string): boolean => {
      const normalized = cmd.toLowerCase().trim();
      const command = SLASH_COMMANDS[normalized];
      if (!command) return false;

      // Show the command as a user message
      setMessages((prev) => [...prev, { role: "user", content: normalized }]);

      switch (command.action) {
        case "help":
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: buildHelpText() },
          ]);
          break;

        case "clear":
          setMessages([GREETING]);
          localStorage.removeItem(STORAGE_KEY);
          break;

        case "navigate": {
          const route = ROUTE_MAP[normalized];
          if (route) {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: "", navStatus: "pending", navRoute: route },
            ]);
            router.push(route);
            setTimeout(() => {
              setMessages((prev) => {
                const updated = [...prev];
                for (let i = updated.length - 1; i >= 0; i--) {
                  if (updated[i].navStatus === "pending" && updated[i].navRoute === route) {
                    updated[i] = { ...updated[i], navStatus: "done" };
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
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Opening **Cameron's resume** in a new tab.",
            },
          ]);
          break;
      }

      return true;
    },
    [router]
  );

  // ── Send message (AI or slash command) ─────────────────────────────
  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    setInput("");

    // Check for slash commands first
    if (trimmed.startsWith("/")) {
      if (handleSlashCommand(trimmed)) return;
      // Unknown command - show help
      setMessages((prev) => [
        ...prev,
        { role: "user", content: trimmed },
        {
          role: "assistant",
          content: `Unknown command \`${trimmed}\`. Type \`/help\` to see available commands.`,
        },
      ]);
      return;
    }

    // Regular AI message
    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    // Add empty assistant message as placeholder for streaming
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

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

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const event = JSON.parse(line);
            if (event.type === "text") {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last.role === "assistant") {
                  updated[updated.length - 1] = {
                    ...last,
                    content: last.content + event.content,
                  };
                }
                return updated;
              });
            } else if (event.type === "navigate") {
              setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "", navStatus: "pending", navRoute: event.route },
              ]);
              router.push(event.route);
              setTimeout(() => {
                setMessages((prev) => {
                  const updated = [...prev];
                  for (let i = updated.length - 1; i >= 0; i--) {
                    if (updated[i].navStatus === "pending") {
                      updated[i] = { ...updated[i], navStatus: "done" };
                      break;
                    }
                  }
                  return updated;
                });
              }, 700);
            } else if (event.type === "open_resume") {
              window.open(event.url, "_blank");
            } else if (event.type === "error") {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last.role === "assistant" && !last.content) {
                  updated[updated.length - 1] = {
                    ...last,
                    content: event.message,
                  };
                }
                return updated;
              });
            }
          } catch {
            // Skip malformed lines
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant" && !last.content) {
          updated[updated.length - 1] = {
            ...last,
            content: "Sorry, something went wrong. Please try again.",
          };
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, router, handleSlashCommand]);

  if (isHomepage) return null;

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 z-50 flex flex-col w-[360px] sm:w-[400px] max-h-[520px] rounded-xl border border-[#27272a] bg-[#0a0a0a] shadow-2xl"
          style={{ boxShadow: "0 0 40px rgba(16, 185, 129, 0.08)" }}
        >
          {/* Header */}
          <div className="relative px-4 py-3 border-b border-[#27272a]">
            <div className="absolute top-2 right-2 flex items-center gap-1">
              <button
                onClick={() => handleSlashCommand("/clear")}
                className="text-[#3f3f46] hover:text-[#a1a1aa] transition-colors text-[10px] font-mono px-1.5 py-0.5"
                aria-label="Clear chat"
                title="Clear conversation"
              >
                /clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#3f3f46] hover:text-[#a1a1aa] transition-colors text-sm leading-none px-1"
                aria-label="Close chat"
              >
                &times;
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <img
                src="/images/cameron-headshot.jpg"
                alt="Cameron Keith"
                className="w-8 h-8 rounded-full object-cover border border-[#27272a]"
              />
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[#fafafa] font-mono text-sm font-medium">
                    Cam Code
                  </span>
                  <span className="text-[#52525b] font-mono text-[10px]">
                    v1.0.0
                  </span>
                </div>
                <p className="text-[#71717a] font-mono text-[10px]">
                  camkeith.me
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px] max-h-[380px]">
            {messages.map((msg, i) =>
              msg.navStatus ? (
                /* Navigation step indicator */
                <div key={i} className="flex items-center gap-2 pl-3 -mt-1">
                  <span className="text-[#3f3f46]">⎿</span>
                  {msg.navStatus === "pending" ? (
                    <svg
                      className="w-3.5 h-3.5 text-[#10b981] animate-spin shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        opacity="0.25"
                      />
                      <path
                        d="M12 2a10 10 0 0 1 10 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <span className="text-[#10b981] text-sm">✓</span>
                  )}
                  <span className="text-[#a1a1aa] font-mono text-xs">
                    {msg.navStatus === "pending"
                      ? `Navigating to ${msg.navRoute}…`
                      : `Navigated to ${msg.navRoute}`}
                  </span>
                </div>
              ) : (
                /* Regular message bubble */
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#10b981] text-[#0a0a0a] rounded-br-sm"
                        : "bg-[#1a1a1a] text-[#e4e4e7] border border-[#27272a] rounded-bl-sm"
                    }`}
                  >
                    {msg.content ? (
                      msg.role === "assistant" ? (
                        <div className="chat-markdown">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => (
                                <p className="mb-2 last:mb-0">{children}</p>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-semibold text-[#fafafa]">
                                  {children}
                                </strong>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc list-inside mb-2 last:mb-0 space-y-1">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal list-inside mb-2 last:mb-0 space-y-1">
                                  {children}
                                </ol>
                              ),
                              li: ({ children }) => (
                                <li className="text-[#e4e4e7]">{children}</li>
                              ),
                              a: ({ href, children }) => (
                                <a
                                  href={href}
                                  className="text-[#10b981] underline hover:text-[#34d399]"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {children}
                                </a>
                              ),
                              code: ({ children }) => (
                                <code className="bg-[#27272a] text-[#10b981] px-1 py-0.5 rounded text-xs font-mono">
                                  {children}
                                </code>
                              ),
                            }}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        msg.content
                      )
                    ) : (
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa] animate-bounce" />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa] animate-bounce"
                          style={{ animationDelay: "0.15s" }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[#a1a1aa] animate-bounce"
                          style={{ animationDelay: "0.3s" }}
                        />
                      </span>
                    )}
                  </div>
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* CLI-style input */}
          <div className="px-4 py-2.5 border-t border-[#27272a]">
            <div className="flex items-center gap-1.5">
              <span className="text-[#10b981] font-mono text-sm select-none">
                ❯
              </span>
              <div className="relative flex-1">
                {/* Colored overlay with block cursor */}
                <div
                  aria-hidden
                  className="absolute inset-0 flex items-center font-mono text-sm pointer-events-none whitespace-pre overflow-hidden"
                >
                  {(() => {
                    const lower = input.toLowerCase();
                    const match = Object.keys(SLASH_COMMANDS).find(
                      (cmd) => lower === cmd || lower.startsWith(cmd + " ")
                    );

                    let textNode: React.ReactNode;
                    if (!input) {
                      textNode = null;
                    } else if (match) {
                      textNode = (
                        <>
                          <span className="text-[#10b981]">
                            {input.slice(0, match.length)}
                          </span>
                          <span className="text-[#fafafa]">
                            {input.slice(match.length)}
                          </span>
                        </>
                      );
                    } else if (
                      input.startsWith("/") &&
                      Object.keys(SLASH_COMMANDS).some((cmd) =>
                        cmd.startsWith(lower)
                      )
                    ) {
                      textNode = (
                        <span className="text-[#10b981]">{input}</span>
                      );
                    } else {
                      textNode = (
                        <span className="text-[#fafafa]">{input}</span>
                      );
                    }

                    return (
                      <>
                        {textNode}
                        {inputFocused && (
                          <span
                            className="inline-block w-[7px] h-[14px] bg-[#10b981] align-middle ml-px"
                            style={{
                              animation: "terminal-blink 1s step-end infinite",
                            }}
                          />
                        )}
                      </>
                    );
                  })()}
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask anything or /help..."
                  disabled={isLoading}
                  className="w-full bg-transparent text-transparent font-mono text-sm outline-none placeholder:text-[#3f3f46] disabled:opacity-50 caret-transparent"
                  aria-label="Chat message input"
                />
              </div>
              {isLoading && (
                <span className="text-[#10b981] text-xs font-mono animate-pulse">
                  ●
                </span>
              )}
            </div>
            <p className="text-[9px] text-[#3f3f46] mt-1 font-mono">
              {typeof navigator !== "undefined" &&
              /Mac/.test(navigator.userAgent)
                ? "⌘"
                : "Ctrl"}
              +K to toggle
            </p>
          </div>
        </div>
      )}

      {/* Toggle button - Cam Code sparkle */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-4 right-4 z-50 w-13 h-13 rounded-full bg-[#10b981] text-[#0a0a0a] shadow-lg hover:bg-[#0d9668] hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
        style={{
          animation: isOpen ? "none" : "cam-code-breathe 3s ease-in-out infinite",
        }}
        aria-label={isOpen ? "Close Cam Code" : "Open Cam Code"}
      >
        {isOpen ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6L18 18" />
          </svg>
        ) : (
          <CamCodeIcon size={22} />
        )}
      </button>
    </>
  );
}
