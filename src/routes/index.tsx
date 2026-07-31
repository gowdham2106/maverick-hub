import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Activity,
  CalendarClock,
  FileText,
  Images,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Aurora,
  Chip,
  Counter,
  EmptyState,
  ErrorState,
  GlassCard,
  Meter,
  Reveal,
  Skeleton,
} from "@/components/ui-kit";
import { Logo } from "@/components/brand/Logo";
import { BRAND, QUOTE, TEAM } from "@/data/team";
import { useActivity, useCounts, useProject, useRoadmap } from "@/hooks/use-portal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mission Mavericks Hub — Claim Shield Plus Dashboard" },
      {
        name: "description",
        content:
          "Live delivery dashboard for Claim Shield Plus: project progress, roadmap week, documents, gallery and recent team activity.",
      },
      { property: "og:title", content: "Mission Mavericks Hub — Claim Shield Plus Dashboard" },
      { property: "og:description", content: "Own the Mission. Be the Maverick. Win Together." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  text,
}: {
  icon: typeof FileText;
  label: string;
  value?: number;
  suffix?: string;
  text?: string;
}) {
  return (
    <GlassCard interactive className="flex items-center gap-4 p-6">
      <span className="gradient-brand grid h-12 w-12 shrink-0 place-items-center rounded-2xl">
        <Icon className="h-5 w-5 text-primary-foreground" aria-hidden />
      </span>
      <div className="min-w-0">
        {text !== undefined ? (
          <p className="truncate font-display text-lg font-extrabold">{text}</p>
        ) : (
          <p className="font-display text-2xl font-extrabold">
            <Counter value={value ?? 0} suffix={suffix} />
          </p>
        )}
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </GlassCard>
  );
}

function DashboardPage() {
  const project = useProject();
  const roadmap = useRoadmap();
  const counts = useCounts();
  const activity = useActivity(6);

  const currentWeek =
    roadmap.data?.find((w) => w.status === "in-progress") ??
    roadmap.data?.filter((w) => w.status === "completed").at(-1) ??
    roadmap.data?.[0];

  const chartData =
    roadmap.data?.map((w) => ({ week: `Week ${w.week_number}`, completion: w.progress })) ?? [];

  const lastUpdated = project.data?.updated_at
    ? new Date(project.data.updated_at).toLocaleDateString(undefined, {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div>
      <Reveal>
        <GlassCard className="relative mb-8 overflow-hidden p-8 sm:p-10">
          <Aurora />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-4">
              <Logo size={64} priority />
              <div>
                <Chip className="border-primary/30 bg-primary/10 text-primary">{TEAM.subtitle}</Chip>
                <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
                  {BRAND.appName}
                </h1>
              </div>
            </div>
            <p className="mt-3 max-w-2xl text-sm font-medium text-muted-foreground sm:text-base">
              {BRAND.taglineLines.join(" ")}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="gradient-brand inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold text-primary-foreground"
              >
                View {BRAND.projectName} <ArrowRight className="h-4 w-4" aria-hidden />
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
        {project.isLoading || counts.isLoading || roadmap.isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="rounded-3xl" style={{ height: 104 }} />
          ))
        ) : (
          <>
            <Reveal>
              <StatCard icon={ShieldCheck} label="Current project" text={project.data?.name ?? BRAND.projectName} />
            </Reveal>
            <Reveal delay={0.05}>
              <StatCard icon={Rocket} label="Project progress" value={project.data?.progress ?? 0} suffix="%" />
            </Reveal>
            <Reveal delay={0.1}>
              <StatCard
                icon={CalendarClock}
                label="Current roadmap week"
                text={currentWeek ? `Week ${currentWeek.week_number} · ${currentWeek.title}` : "—"}
              />
            </Reveal>
            <Reveal delay={0.15}>
              <StatCard icon={FileText} label="Documents uploaded" value={counts.data?.documents ?? 0} />
            </Reveal>
          </>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Reveal>
          <StatCard icon={Images} label="Gallery images" value={counts.data?.gallery ?? 0} />
        </Reveal>
        <Reveal delay={0.05}>
          <StatCard icon={Activity} label="Project status" text={project.data?.status ?? "—"} />
        </Reveal>
        <Reveal delay={0.1}>
          <StatCard icon={CalendarClock} label="Last updated" text={lastUpdated} />
        </Reveal>
        <Reveal delay={0.15}>
          <StatCard icon={Activity} label="Recent activity entries" value={activity.data?.length ?? 0} />
        </Reveal>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <GlassCard className="h-full p-6">
            <h2 className="text-lg font-semibold">Roadmap completion</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Progress across the four delivery weeks of {BRAND.projectName}.
            </p>
            <div className="mt-6 h-64">
              {roadmap.isLoading ? (
                <Skeleton className="h-full w-full rounded-2xl" />
              ) : roadmap.isError ? (
                <ErrorState message="The roadmap could not be loaded." onRetry={() => roadmap.refetch()} />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="phaseFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.45} />
                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={12} />
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
              )}
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.06}>
          <GlassCard className="h-full p-6">
            <h2 className="text-lg font-semibold">{project.data?.name ?? BRAND.projectName}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{project.data?.category ?? ""}</p>
            <div className="mt-5">
              <Meter value={project.data?.progress ?? 0} label="Overall progress" />
            </div>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Status</dt>
                <dd className="font-medium text-primary">{project.data?.status ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Current phase</dt>
                <dd className="font-medium">{project.data?.current_phase ?? "—"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Last updated</dt>
                <dd className="font-medium">{lastUpdated}</dd>
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
        <GlassCard className="mt-6 p-6">
          <h2 className="text-lg font-semibold">Recent activity</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Automatically captured whenever the team publishes an update.
          </p>
          <div className="mt-5">
            {activity.isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="w-full rounded-2xl" style={{ height: 56 }} />
                ))}
              </div>
            ) : activity.isError ? (
              <ErrorState message="Activity could not be loaded." onRetry={() => activity.refetch()} />
            ) : (activity.data?.length ?? 0) === 0 ? (
              <EmptyState
                title="No activity yet"
                description="Uploads, roadmap changes and project updates will appear here automatically."
              />
            ) : (
              <ul className="space-y-3">
                {activity.data!.map((a) => (
                  <li key={a.id} className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card/60 p-3">
                    <span className="gradient-brand grid h-9 w-9 shrink-0 place-items-center rounded-xl">
                      <Activity className="h-4 w-4 text-primary-foreground" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {a.action} — {a.entity}
                      </p>
                      {a.details && <p className="truncate text-xs text-muted-foreground">{a.details}</p>}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(a.created_at).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </GlassCard>
      </Reveal>

      <Reveal>
        <GlassCard className="mt-6 p-8 text-center">
          <p className="mx-auto max-w-3xl font-display text-lg italic">“{QUOTE.text}”</p>
          <p className="mt-3 text-sm text-muted-foreground">— {QUOTE.author}</p>
        </GlassCard>
      </Reveal>
    </div>
  );
}
