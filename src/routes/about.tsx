import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart, Flag } from "lucide-react";
import { GlassCard, PageHeader, Reveal } from "@/components/ui-kit";
import { TEAM, TIMELINE } from "@/data/team";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Team — Mission Mavericks" },
      { name: "description", content: "Mission, vision, core values and the journey of the Mission Mavericks team." },
      { property: "og:title", content: "About the Team — Mission Mavericks" },
      { property: "og:description", content: "Mission, vision, core values and our journey so far." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="About"
        title="Who we are"
        description={TEAM.tagline}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <GlassCard interactive className="h-full p-7">
            <span className="gradient-brand grid h-11 w-11 place-items-center rounded-2xl">
              <Target className="h-5 w-5 text-primary-foreground" aria-hidden />
            </span>
            <h2 className="mt-4 text-lg font-semibold">Our mission</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{TEAM.mission}</p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.06}>
          <GlassCard interactive className="h-full p-7">
            <span className="gradient-brand grid h-11 w-11 place-items-center rounded-2xl">
              <Eye className="h-5 w-5 text-primary-foreground" aria-hidden />
            </span>
            <h2 className="mt-4 text-lg font-semibold">Our vision</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{TEAM.vision}</p>
          </GlassCard>
        </Reveal>
      </div>

      <h2 className="mb-4 mt-10 flex items-center gap-2 text-lg font-semibold">
        <Heart className="h-5 w-5 text-primary" aria-hidden /> Core values
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {TEAM.values.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.05}>
            <GlassCard interactive className="h-full p-6">
              <p className="font-display text-sm font-bold">{v.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{v.detail}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <h2 className="mb-4 mt-10 flex items-center gap-2 text-lg font-semibold">
        <Flag className="h-5 w-5 text-primary" aria-hidden /> Our journey
      </h2>
      <ol className="relative space-y-4 border-l border-border pl-6">
        {TIMELINE.map((t, i) => (
          <Reveal key={t.phase} delay={i * 0.05}>
            <li className="relative">
              <span className="gradient-brand absolute -left-[31px] top-4 h-3 w-3 rounded-full ring-4 ring-background" />
              <GlassCard className="p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold">{t.phase}</p>
                  <span className="text-xs text-muted-foreground">{t.date}</span>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">{t.detail}</p>
              </GlassCard>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
