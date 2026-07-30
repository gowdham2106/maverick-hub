import { useEffect, useState } from "react";
import { Bell, MessageSquare, Menu, Moon, Search, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

/** Live clock + current date, hydration-safe (renders after mount). */
function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <div className="h-8 w-32" aria-hidden />;

  return (
    <div className="hidden text-right lg:block">
      <p className="text-sm font-semibold tabular-nums">
        {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </p>
      <p className="text-[11px] text-muted-foreground">
        {now.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short", year: "numeric" })}
      </p>
    </div>
  );
}

function IconButton({
  label,
  badge,
  onClick,
  children,
}: {
  label: string;
  badge?: number;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="relative grid h-11 w-11 place-items-center rounded-xl border border-border bg-card/60 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
      {badge ? (
        <span className="gradient-brand absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[10px] font-bold text-primary-foreground">
          {badge}
        </span>
      ) : null}
    </button>
  );
}

export function Topbar({
  theme,
  onToggleTheme,
  onOpenMobileNav,
  query,
  onQueryChange,
}: {
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenMobileNav: () => void;
  query: string;
  onQueryChange: (v: string) => void;
}) {
  return (
    <header className="glass sticky top-0 z-30 rounded-none border-x-0 border-t-0 px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={onOpenMobileNav}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-card/60 lg:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden />
        </button>

        <div className="relative min-w-0 flex-1 max-w-xl">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            type="search"
            placeholder="Search members, projects, documents…"
            aria-label="Search everything"
            className={cn(
              "h-11 w-full rounded-xl border border-border bg-card/60 pl-9 pr-3 text-sm",
              "placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            )}
          />
        </div>

        <LiveClock />

        <div className="flex shrink-0 items-center gap-2">
          <IconButton label="Notifications" badge={4}>
            <Bell className="h-5 w-5" aria-hidden />
          </IconButton>
          <IconButton label="Messages" badge={2}>
            <MessageSquare className="h-5 w-5" aria-hidden />
          </IconButton>
          <IconButton label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={onToggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" aria-hidden /> : <Moon className="h-5 w-5" aria-hidden />}
          </IconButton>
          <span className="gradient-brand grid h-11 w-11 place-items-center rounded-xl text-sm font-bold text-primary-foreground">
            AM
          </span>
        </div>
      </div>
    </header>
  );
}
