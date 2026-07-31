import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Fade + slide-up on scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Number that counts up when it scrolls into view. */
export function Counter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 70, damping: 20 });

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) ref.current.textContent = latest.toFixed(decimals) + suffix;
      }),
    [spring, decimals, suffix],
  );

  return <span ref={ref}>{"0" + suffix}</span>;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <Reveal className="mb-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </span>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
        </div>
        {action}
      </div>
    </Reveal>
  );
}

export function GlassCard({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass rounded-3xl",
        interactive && "hover-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Accent chip used for tech stacks, tags and departments. */
export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-secondary/70 px-2.5 py-1 text-[11px] font-medium text-secondary-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Gradient progress bar that fills when visible. */
export function Meter({ value, label }: { value: number; label?: string }) {
  return (
    <div>
      {label ? (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="font-medium">{label}</span>
          <span className="text-muted-foreground">{value}%</span>
        </div>
      ) : null}
      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="gradient-brand h-full rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

/** Soft aurora blobs used behind hero areas. */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-float absolute -left-16 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
      <div
        className="animate-float absolute -right-10 top-10 h-80 w-80 rounded-full bg-violet/30 blur-3xl"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="animate-float absolute bottom-[-6rem] left-1/3 h-64 w-64 rounded-full bg-chart-3/25 blur-3xl"
        style={{ animationDelay: "-6s" }}
      />
    </div>
  );
}

/** Shimmer placeholder used while data loads. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-secondary/70", className)} aria-hidden />;
}

/** Card-shaped skeleton grid for list and grid pages. */
export function SkeletonGrid({ count = 6, height = 140 }: { count?: number; height?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-label="Loading content">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="rounded-3xl" style={undefined as never} />
      ))}
      <span className="sr-only">Loading…</span>
      <style>{`[role="status"] > div { height: ${height}px; }`}</style>
    </div>
  );
}

/** Centered spinner for inline loading states. */
export function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <div className="grid place-items-center p-12" role="status">
      <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden />
      <span className="sr-only">{label}</span>
    </div>
  );
}

/** Friendly empty state with an illustrated gradient mark. */
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <GlassCard className="p-12 text-center">
      <span className="gradient-brand mx-auto grid h-14 w-14 place-items-center rounded-3xl">
        <Inbox className="h-6 w-6 text-primary-foreground" aria-hidden />
      </span>
      <p className="mt-4 font-display text-lg font-bold">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </GlassCard>
  );
}

/** Error state with a retry affordance. */
export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <GlassCard className="p-12 text-center">
      <span className="grid mx-auto h-14 w-14 place-items-center rounded-3xl bg-destructive/10">
        <AlertCircle className="h-6 w-6 text-destructive" aria-hidden />
      </span>
      <p className="mt-4 font-display text-lg font-bold">Something went wrong</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
      >
        <RefreshCw className="h-4 w-4" aria-hidden /> Try again
      </button>
    </GlassCard>
  );
}
