import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, CircleDashed, Loader2 } from "lucide-react";
import {
  Chip,
  EmptyState,
  ErrorState,
  GlassCard,
  Meter,
  PageHeader,
  Reveal,
  Skeleton,
} from "@/components/ui-kit";
import { BRAND } from "@/data/team";
import { useRoadmap } from "@/hooks/use-portal";

export const Route = createFileRoute("/roadmap")({
  head: () => ({
    meta: [
      { title: "Roadmap — Mission Mavericks Hub" },
      {
        name: "description",
        content:
          "Four-week delivery roadmap for Claim Shield Plus: planning, research, build and release with deliverables and completion status.",
      },
      { property: "og:title", content: "Roadmap — Mission Mavericks Hub" },
      { property: "og:description", content: "Week by week delivery plan for Claim Shield Plus." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RoadmapPage,
});

function StatusBadge({ status }: { status: string }) {
  if (status === "completed")
    return (
      <Chip className="border-success/30 bg-success/10 text-success">
        <CheckCircle2 className="mr-1 h-3 w-3" aria-hidden /> Completed
      </Chip>
    );
  if (status === "in-progress")
    return (
      <Chip className="border-primary/30 bg-primary/10 text-primary">
        <Loader2 className="mr-1 h-3 w-3 animate-spin" aria-hidden /> In progress
      </Chip>
    );
  return (
    <Chip>
      <CircleDashed className="mr-1 h-3 w-3" aria-hidden /> Upcoming
    </Chip>
  );
}

function RoadmapPage() {
  const { data, isLoading, isError, refetch } = useRoadmap();

  return (
    <div>
      <PageHeader
        eyebrow="Roadmap"
        title="Four weeks to delivery"
        description={`How ${BRAND.projectName} moves from planning to final demonstration.`}
      />

      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="rounded-3xl" style={{ height: 150 }} />
          ))}
        </div>
      ) : isError ? (
        <ErrorState message="The roadmap could not be loaded." onRetry={() => refetch()} />
      ) : (data?.length ?? 0) === 0 ? (
        <EmptyState title="No roadmap yet" description="Roadmap weeks will appear here once published." />
      ) : (
        <ol className="relative space-y-4 border-l border-border pl-6">
          {data!.map((w, i) => (
            <Reveal key={w.id} delay={i * 0.05}>
              <li className="relative">
                <span
                  className="gradient-brand absolute -left-[31px] top-6 grid h-4 w-4 place-items-center rounded-full ring-4 ring-background"
                  aria-hidden
                />
                <GlassCard interactive className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Week {w.week_number}
                      </p>
                      <h2 className="font-display text-lg font-bold">{w.title}</h2>
                    </div>
                    <StatusBadge status={w.status} />
                  </div>

                  <div className="mt-4 grid gap-5 lg:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Focus
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {w.focus_items.map((f) => (
                          <Chip key={f}>{f}</Chip>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        Deliverables
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {w.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2
                              className={`mt-0.5 h-4 w-4 shrink-0 ${
                                w.status === "completed" ? "text-success" : "text-muted-foreground"
                              }`}
                              aria-hidden
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Meter value={w.progress} label="Completion" />
                  </div>
                </GlassCard>
              </li>
            </Reveal>
          ))}
        </ol>
      )}
    </div>
  );
}
