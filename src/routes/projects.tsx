import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Lightbulb, Sparkles, Layers } from "lucide-react";
import { Chip, GlassCard, Meter, PageHeader, Reveal } from "@/components/ui-kit";
import { PROJECT } from "@/data/team";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Motor Claims Intelligence Hub — Mission Mavericks" },
      {
        name: "description",
        content:
          "MCIH is an AI-powered motor insurance claims platform unifying vehicle, policy and claim data with explainable decision support.",
      },
      { property: "og:title", content: "Motor Claims Intelligence Hub (MCIH)" },
      {
        property: "og:description",
        content: "AI powered insurance claims platform built by Mission Mavericks.",
      },
    ],
  }),
  component: ProjectPage,
});

function ProjectPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Project"
        title={PROJECT.title}
        description={PROJECT.category}
      />

      <Reveal>
        <GlassCard className="overflow-hidden">
          <div
            className="relative h-36"
            style={{ background: "linear-gradient(135deg, oklch(0.62 0.19 264), oklch(0.58 0.2 300))" }}
            aria-hidden
          >
            <span className="absolute bottom-4 left-6 font-display text-2xl font-extrabold text-primary-foreground">
              MCIH
            </span>
          </div>
          <div className="grid gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Status</p>
              <p className="mt-1 font-semibold text-primary">{PROJECT.status}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Duration</p>
              <p className="mt-1 font-semibold">{PROJECT.duration}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Current phase</p>
              <p className="mt-1 font-semibold">{PROJECT.currentPhase}</p>
            </div>
            <div>
              <Meter value={PROJECT.progress} label="Progress" />
            </div>
          </div>
        </GlassCard>
      </Reveal>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <GlassCard interactive className="h-full p-7">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-warning/15">
              <AlertTriangle className="h-5 w-5 text-warning" aria-hidden />
            </span>
            <h2 className="mt-4 text-lg font-semibold">Problem statement</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{PROJECT.problem}</p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.06}>
          <GlassCard interactive className="h-full p-7">
            <span className="gradient-brand grid h-11 w-11 place-items-center rounded-2xl">
              <Lightbulb className="h-5 w-5 text-primary-foreground" aria-hidden />
            </span>
            <h2 className="mt-4 text-lg font-semibold">Our solution</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{PROJECT.solution}</p>
          </GlassCard>
        </Reveal>
      </div>

      <h2 className="mb-4 mt-10 flex items-center gap-2 text-lg font-semibold">
        <Sparkles className="h-5 w-5 text-primary" aria-hidden /> Key features
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECT.features.map((f, i) => (
          <Reveal key={f} delay={i * 0.04}>
            <GlassCard interactive className="flex h-full items-center gap-3 p-5">
              <span className="gradient-brand grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs font-bold text-primary-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm font-medium">{f}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <Reveal>
          <GlassCard className="h-full p-7">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <CheckCircle2 className="h-5 w-5 text-success" aria-hidden /> Expected outcomes
            </h2>
            <ul className="mt-4 space-y-3">
              {PROJECT.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden />
                  {o}
                </li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.06}>
          <GlassCard className="h-full p-7">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Layers className="h-5 w-5 text-primary" aria-hidden /> Technologies used
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {PROJECT.technologies.map((t) => (
                <Chip key={t} className="px-3 py-1.5 text-xs">
                  {t}
                </Chip>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  );
}
