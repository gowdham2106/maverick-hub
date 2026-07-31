import logo from "@/assets/mission-mavericks-logo.png";
import { cn } from "@/lib/utils";

/**
 * Official Mission Mavericks shield logo.
 * Always rendered square so the mark is never distorted.
 */
export function Logo({
  size = 40,
  className,
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={logo}
      alt="Mission Mavericks shield logo"
      width={size}
      height={size}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("shrink-0 select-none object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}

export function LogoLockup({
  collapsed = false,
  size = 40,
  subtitle = "Claim Shield Plus",
}: {
  collapsed?: boolean;
  size?: number;
  subtitle?: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Logo size={size} priority />
      {!collapsed && (
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-bold">Mission Mavericks Hub</p>
          <p className="truncate text-[11px] text-muted-foreground">{subtitle}</p>
        </div>
      )}
    </div>
  );
}
