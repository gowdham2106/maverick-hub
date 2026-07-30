import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart, Flag, GraduationCap, Layers } from "lucide-react";
import { Chip, GlassCard, PageHeader, Reveal } from "@/components/ui-kit";
import { MEMBERS, TEAM } from "@/data/team";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Team — Mission Mavericks" },
      {
        name: "description",
        content:
          "Mission, vision, core values, the nine members, faculty mentor and technology stack behind Mission Mavericks.",
      },
      { property: "og:title", content: "About the Team — Mission Mavericks" },
      { property: "og:description", content: "Meet the nine Mission Mavericks, our mentor and our stack." },
    ],
  }),
  component: AboutPage,
});

function Avatar({ initials, hue, size = 64 }: { initials: string; hue: number; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-2xl font-display font-bold text-primary-foreground"
      style={{
        width: size,
        height: size,
        fontSize: size / 3,
        background: `linear-gradient(135deg, oklch(0.62 0.19 ${hue}), oklch(0.55 0.21 ${hue + 45}))`,
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

function AboutPage() {
  return (
    <div>
      <PageHeader eyebrow="About" title="Who we are" description={TEAM.tagline} />

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

      <h2 className="mb-1 mt-12 text-lg font-semibold">Team members</h2>
      <p className="mb-5 text-sm text-muted-foreground">Nine people, one standard — excellence.</p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MEMBERS.map((m, i) => (
          <Reveal key={m.id} delay={i * 0.04}>
            <GlassCard interactive className="flex h-full items-center gap-4 p-6">
              <Avatar initials={m.initials} hue={m.hue} />
              <div className="min-w-0">
                <p className="truncate font-display text-base font-bold">{m.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <h2 className="mb-4 mt-12 flex items-center gap-2 text-lg font-semibold">
        <GraduationCap className="h-5 w-5 text-primary" aria-hidden /> Faculty mentor
      </h2>
      <Reveal>
        <GlassCard className="flex flex-col gap-5 p-7 sm:flex-row sm:items-start">
          <Avatar initials={TEAM.mentor.initials} hue={264} size={72} />
          <div className="min-w-0">
            <p className="font-display text-lg font-bold">{TEAM.mentor.name}</p>
            <p className="text-sm text-muted-foreground">{TEAM.mentor.title}</p>
            <p className="mt-1 text-sm text-primary">{TEAM.mentor.focus}</p>
            <p className="mt-4 border-l-2 border-primary/40 pl-4 text-sm italic leading-relaxed text-muted-foreground">
              “{TEAM.mentor.quote}”
            </p>
          </div>
        </GlassCard>
      </Reveal>

      <h2 className="mb-4 mt-12 flex items-center gap-2 text-lg font-semibold">
        <Layers className="h-5 w-5 text-primary" aria-hidden /> Technology stack
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEAM.techStack.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.03}>
            <GlassCard interactive className="flex items-center justify-between gap-3 p-5">
              <p className="font-medium">{t.name}</p>
              <Chip>{t.category}</Chip>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <h2 className="mb-4 mt-12 flex items-center gap-2 text-lg font-semibold">
        <Flag className="h-5 w-5 text-primary" aria-hidden /> Our journey
      </h2>
      <ol className="relative space-y-4 border-l border-border pl-6">
        {TEAM.journey.map((t, i) => (
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
