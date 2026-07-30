import { createFileRoute } from "@tanstack/react-router";
import { Code2, Users2, Medal } from "lucide-react";
import { Chip, GlassCard, PageHeader, Reveal } from "@/components/ui-kit";
import { HACKATHONS } from "@/data/team";

export const Route = createFileRoute("/hackathons")({
  head: () => ({
    meta: [
      { title: "Hackathons — Mission Mavericks" },
      { name: "description", content: "Every hackathon Mission Mavericks entered, with results and field size." },
      { property: "og:title", content: "Hackathons — Mission Mavericks" },
      { property: "og:description", content: "Nine competitions, one winner's trophy and four podium finishes." },
    ],
  }),
  component: HackathonsPage,
});

function HackathonsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Hackathons"
        title="48 hours at a time"
        description="Competitions we entered, what we shipped and how we placed against the field."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {HACKATHONS.map((h, i) => (
          <Reveal key={h.name} delay={i * 0.05}>
            <GlassCard interactive className="h-full p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="gradient-brand grid h-11 w-11 shrink-0 place-items-center rounded-2xl">
                  <Code2 className="h-5 w-5 text-primary-foreground" aria-hidden />
                </span>
                <Chip className="border-primary/25 bg-primary/10 text-primary">
                  <Medal className="mr-1 h-3 w-3" aria-hidden /> {h.result}
                </Chip>
              </div>
              <h2 className="mt-4 text-base font-semibold">{h.name}</h2>
              <p className="text-sm text-muted-foreground">{h.year}</p>
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users2 className="h-3.5 w-3.5" aria-hidden /> {h.teams} teams competing
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
