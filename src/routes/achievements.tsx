import { createFileRoute } from "@tanstack/react-router";
import { Award, BadgeCheck, Cloud, Sparkles, Star, Trophy } from "lucide-react";
import { Chip, Counter, GlassCard, PageHeader, Reveal } from "@/components/ui-kit";
import { ACHIEVEMENTS } from "@/data/team";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Mission Mavericks" },
      { name: "description", content: "Awards, certifications, grants and open-source milestones earned by the team." },
      { property: "og:title", content: "Achievements — Mission Mavericks" },
      { property: "og:description", content: "Awards, certifications, grants and open-source milestones." },
    ],
  }),
  component: AchievementsPage,
});

const ICONS = { trophy: Trophy, cloud: Cloud, sparkles: Sparkles, star: Star, badge: BadgeCheck, award: Award };

function AchievementsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Achievements"
        title="Proof of excellence"
        description="Six headline wins in the last twelve months — and the standard we intend to keep."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Awards won", value: 6 },
          { label: "Certifications", value: 14 },
          { label: "Grant funding (USD)", value: 25000 },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <GlassCard className="p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="mt-2 font-display text-3xl font-bold tabular-nums">
                <Counter value={s.value} />
              </p>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {ACHIEVEMENTS.map((a, i) => {
          const Icon = ICONS[a.icon];
          return (
            <Reveal key={a.title} delay={i * 0.05}>
              <GlassCard interactive className="h-full p-6">
                <span className="gradient-brand shadow-glow grid h-12 w-12 place-items-center rounded-2xl">
                  <Icon className="h-6 w-6 text-primary-foreground" aria-hidden />
                </span>
                <h2 className="mt-4 text-base font-semibold">{a.title}</h2>
                <Chip className="mt-2">{a.org}</Chip>
                <p className="mt-3 text-sm text-muted-foreground">{a.detail}</p>
              </GlassCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
