import { Bell, ChevronDown, Search, Sparkles } from "lucide-react";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl md:px-8">
      <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm hover:bg-secondary transition-colors">
        <span className="text-foreground font-medium">Mumbai</span>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      <div className="relative ml-2 hidden flex-1 max-w-xl md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Ask NeuroCity AI…"
          className="w-full rounded-lg border border-border bg-card py-2 pl-9 pr-20 text-sm placeholder:text-muted-foreground focus:border-foreground/30 focus:outline-none"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 sm:flex">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-success)" }} />
          <span className="text-xs text-muted-foreground">City Health</span>
          <span className="text-xs font-semibold text-foreground">86</span>
        </div>

        <div
          className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 sm:flex"
          style={{
            color: "var(--color-ai)",
            backgroundColor: "color-mix(in oklab, var(--color-ai) 10%, transparent)",
          }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">AI live</span>
        </div>

        <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-card hover:bg-secondary">
          <Bell className="h-4 w-4" />
          <span
            className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full"
            style={{ backgroundColor: "var(--color-risk)" }}
          />
        </button>

        <button className="flex items-center gap-2 rounded-lg border border-border bg-card pl-1 pr-3 py-1 hover:bg-secondary">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-foreground text-background text-[11px] font-semibold">
            CA
          </span>
          <span className="hidden text-sm font-medium sm:inline">Admin</span>
        </button>
      </div>
    </header>
  );
}
