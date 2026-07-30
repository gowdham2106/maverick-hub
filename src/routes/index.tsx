import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, FolderKanban, Users, Rocket } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Aurora, Chip, Counter, GlassCard, Meter, PageHeader, Reveal } from "@/components/ui-kit";
import { MEMBERS, PROJECT, PROJECT_TIMELINE, QUOTE, TEAM } from "@/data/team";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mission Mavericks — Team Portfolio Dashboard" },
      {
        name: "description",
        content:
          "Mission Mavericks team dashboard: the Motor Claims Intelligence Hub, project progress, team and documentation.",
      },
      { property: "og:title", content: "Mission Mavericks — Team Portfolio Dashboard" },
      { property: "og:description", content: "One Team. One Mission. One Standard—Excellence." },
    ],
  }),
  component: DashboardPage,
});

const PHASE_PROGRESS = PROJECT_TIMELINE.map((p, i) => ({
  phase: p.phase,
  completion: p.state === "done" ? 100 : p.state === "current" ? 60 : 15 + i,
}));

const STATS = [
  { label: "Team members", value: MEMBERS.length, icon: Users },
  { label: "Active project", value: 1, icon: FolderKanban },
  { label: "Phases completed", value: PROJECT_TIMELINE.filter((p) => p.state === "done").length, icon: Rocket },
  { label: "Key features", value: PROJECT.features.length, icon: FileText },
];

function DashboardPage() {
  return (
    <div>
      <Reveal>
        <GlassCard className="relative mb-8 overflow-hidden p-8 sm:p-10">
          <Aurora />
          <div className="relative">
            <Chip className="border-primary/30 bg-primary/10 text-primary">{TEAM.subtitle}</Chip>
            <h1 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl">{TEAM.name}</h1>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">{TEAM.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="gradient-brand inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-primary-foreground"
              >
                View the project <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/documents"
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
              >
                <FileText className="h-4 w-4" aria-hidden /> Documents
              </Link>
            </div>
          </div>
        </GlassCard>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <GlassCard interactive className="flex items-center gap-4 p-6">
              <span className="gradient-brand grid h-12 w-12 place-items-center rounded-2xl">
                <s.icon className="h-5 w-5 text-primary-foreground" aria-hidden />
              </span>
              <div>
                <p className="font-display text-2xl font-extrabold">
                  <Counter value={s.value} />
                </p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <GlassCard className="h-full p-6">
            <h2 className="text-lg font-semibold">Phase completion</h2>
            <p className="mt-1 text-sm text-muted-foreground">Progress across the MCIH delivery phases.</p>
            <div className="mt-6 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={PHASE_PROGRESS}>
                  <defs>
                    <linearGradient id="phaseFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.03} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="phase" tickLine={false} axisLine={false} fontSize={12} />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} width={32} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 14,
                      border: "1px solid var(--color-border)",
                      background: "var(--color-card)",
                      fontSize: 12,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="completion"
                    stroke="var(--color-primary)"
                    strokeWidth={2.5}
                    fill="url(#phaseFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.06}>
          <GlassCard className="h-full p-6">
            <h2 className="text-lg font-semibold">{PROJECT.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{PROJECT.category}</p>
            <div className="mt-5">
              <Meter value={PROJECT.progress} label="Overall progress" />
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Status</dt>
                <dd className="font-medium text-primary">{PROJECT.status}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Current phase</dt>
                <dd className="font-medium">{PROJECT.currentPhase}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Duration</dt>
                <dd className="font-medium">{PROJECT.duration}</dd>
              </div>
            </dl>
            <Link
              to="/projects"
              className="mt-6 inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-4 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary"
            >
              Project details <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </GlassCard>
        </Reveal>
      </div>

      <Reveal>
        <GlassCard className="mt-6 p-8 text-center">
          <p className="mx-auto max-w-3xl font-display text-lg italic">“{QUOTE.text}”</p>
          <p className="mt-3 text-sm text-muted-foreground">— {QUOTE.author}</p>
        </GlassCard>
      </Reveal>
    </div>
  );
}
