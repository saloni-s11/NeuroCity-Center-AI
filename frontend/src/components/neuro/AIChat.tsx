import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, X, Loader2 } from "lucide-react";
import { ChatMessage } from "../../types/city";
import { sendChatMessage } from "../../services/chatApi";

const suggestions = [
  "Why is traffic increasing in Sector 3?",
  "Which region is at highest risk this week?",
  "What happens if EV adoption reaches 60%?",
  "Where should we invest next year?",
];

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting if empty
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          id: "initial",
          role: "assistant",
          content: "Good morning. I'm tracking 3 emerging risks across the city. Ask me anything about traffic, environment, or future scenarios."
        }
      ]);
    }
  }, [open, messages.length]);

  // Scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, error]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
    
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await sendChatMessage(text);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.reply,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setError("Failed to connect to NeuroCity Assistant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-40 flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-background shadow-[var(--shadow-elevated)] transition-transform hover:scale-105"
        style={{
          background:
            "linear-gradient(135deg, var(--color-ai), color-mix(in oklab, var(--color-ai) 60%, var(--color-info)))",
        }}
      >
        {open ? <X className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
        {open ? "Close" : "Ask NeuroCity"}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-40 flex w-[min(380px,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-elevated)]">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div
              className="grid h-7 w-7 place-items-center rounded-lg text-background"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-ai), var(--color-info))",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div>
              <div className="text-sm font-semibold">NeuroCity Assistant</div>
              <div className="text-[11px] text-muted-foreground">Reasoning over live city data</div>
            </div>
          </div>

          <div className="max-h-[320px] min-h-[320px] flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`rounded-xl px-3 py-2 text-sm ${
                  msg.role === 'assistant' 
                    ? 'bg-secondary text-foreground self-start max-w-[90%]' 
                    : 'bg-foreground text-background self-end max-w-[85%]'
                }`}
              >
                {msg.content} 
              </div>
            ))}
            
            {isLoading && (
              <div className="rounded-xl bg-secondary px-3 py-2 text-sm self-start max-w-[90%] flex items-center gap-2">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Thinking...
              </div>
            )}
            
            {error && (
              <div className="rounded-xl bg-risk/10 text-risk px-3 py-2 text-sm text-center border border-risk/30 mt-2">
                {error}
              </div>
            )}
            
            {messages.length === 1 && !isLoading && (
              <div className="space-y-1.5 mt-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="flex w-full items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                    {s}
                  </button>
                ))}
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-border p-3">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend(inputValue);
                }
              }}
              disabled={isLoading}
              placeholder="Ask anything…"
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-foreground/30 disabled:opacity-50"
            />
            <button
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className="grid h-9 w-9 place-items-center rounded-lg bg-foreground text-background hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
