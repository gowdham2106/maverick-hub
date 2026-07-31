import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  FolderKanban,
  GitBranch,
  Images,
  FileText,
  Info,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoLockup } from "@/components/brand/Logo";

export const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/about", label: "About Team", icon: Info },
  { to: "/projects", label: "Project", icon: FolderKanban },
  { to: "/roadmap", label: "Roadmap", icon: GitBranch },
  { to: "/gallery", label: "Gallery", icon: Images },
  { to: "/documents", label: "Documents", icon: FileText },
] as const;

export function Sidebar({
  collapsed,
  onToggle,
  onNavigate,
}: {
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "flex h-full flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl transition-[width] duration-300",
        collapsed ? "w-[76px]" : "w-[264px]",
      )}
    >
      <div className="flex items-center gap-3 px-4 py-5">
        <LogoLockup collapsed={collapsed} size={40} />
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              onClick={onNavigate}
              title={collapsed ? label : undefined}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors",
                "focus-visible:ring-2 focus-visible:ring-ring",
                active
                  ? "text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-xl bg-sidebar-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className={cn("relative h-[18px] w-[18px] shrink-0", active && "text-primary")} aria-hidden />
              {!collapsed && <span className="relative truncate">{label}</span>}
            </Link>
          );
        })}
      </div>

      <div className="border-t border-sidebar-border p-3">
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-ring"
        >
          {collapsed ? (
            <PanelLeftOpen className="h-[18px] w-[18px]" aria-hidden />
          ) : (
            <PanelLeftClose className="h-[18px] w-[18px]" aria-hidden />
          )}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </nav>
  );
}
