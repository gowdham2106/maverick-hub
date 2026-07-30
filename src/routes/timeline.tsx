import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { GlassCard, PageHeader, Reveal } from "@/components/ui-kit";
import { PROJECT_TIMELINE } from "@/data/team";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Project Timeline — Mission Mavericks" },
      { name: "description", content: "Phase-by-phase delivery timeline for the Motor Claims Intelligence Hub." },
      { property: "og:title", content: "Project Timeline — Mission Mavericks" },
      { property: "og:description", content: "Idea to deployment: how MCIH is being built." },
    ],
  }),
  component: TimelinePage,
});

function TimelinePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Timeline"
        title="How MCIH is coming together"
        description="Six phases from first sketch to a deployed, demo-ready platform."
      />

      <ol className="relative space-y-4 border-l border-border pl-6">
        {PROJECT_TIMELINE.map((t, i) => (
          <Reveal key={t.phase} delay={i * 0.05}>
            <li className="relative">
              <span
                className={
                  t.state === "upcoming"
                    ? "absolute -left-[31px] top-5 h-3 w-3 rounded-full bg-muted ring-4 ring-background"
                    : "gradient-brand absolute -left-[31px] top-5 h-3 w-3 rounded-full ring-4 ring-background"
                }
              />
              <GlassCard interactive className="flex items-start gap-4 p-5">
                {t.state === "done" ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" aria-hidden />
                ) : t.state === "current" ? (
                  <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin text-primary" aria-hidden />
                ) : (
                  <Circle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
                )}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <p className="font-semibold">{t.phase}</p>
                    <span className="text-xs capitalize text-muted-foreground">{t.state}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{t.detail}</p>
                </div>
              </GlassCard>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
