import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Users,
  FolderCheck,
  Code2,
  Trophy,
  Github,
  Percent,
  Flame,
  ArrowRight,
  Quote,
  Sparkles,
  CloudSun,
} from "lucide-react";
import { Aurora, Chip, Counter, GlassCard, Meter, Reveal } from "@/components/ui-kit";
import { ACTIVITY, EFFORT_SPLIT, MEMBERS, QUOTE, TEAM, WEEKLY_PROGRESS } from "@/data/team";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Mission Mavericks" },
      {
        name: "description",
        content:
          "Live team dashboard for Mission Mavericks: statistics, weekly delivery charts, activity feed and leaderboard.",
      },
      { property: "og:title", content: "Dashboard — Mission Mavericks" },
      {
        property: "og:description",
        content: "Statistics, weekly delivery charts, activity feed and team leaderboard.",
      },
    ],
  }),
  component: Dashboard,
});

const STATS = [
  { label: "Total Members", value: 8, icon: Users, suffix: "" },
  { label: "Completed Projects", value: 12, icon: FolderCheck, suffix: "" },
  { label: "Hackathons", value: 9, icon: Code2, suffix: "" },
  { label: "Awards Won", value: 6, icon: Trophy, suffix: "" },
  { label: "GitHub Repos", value: 34, icon: Github, suffix: "" },
  { label: "Completion Rate", value: 87, icon: Percent, suffix: "%" },
  { label: "Contribution Score", value: 942, icon: Flame, suffix: "" },
];

const CHART_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

/** Shared Recharts tooltip styling using design tokens. */
const tooltipStyle = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    color: "var(--popover-foreground)",
    fontSize: "12px",
  },
  labelStyle: { color: "var(--muted-foreground)" },
} as const;

function Dashboard() {
  const leaderboard = [...MEMBERS].sort((a, b) => b.contribution - a.contribution).slice(0, 5);

  return (
    <div className="space-y-8">
      {/* ---------- Hero ---------- */}
      <Reveal>
        <section className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 sm:p-12">
          <Aurora />
          <div className="gradient-soft absolute inset-0" aria-hidden />
          <div className="relative max-w-3xl">
            <Chip className="border-primary/30 bg-primary/10 text-primary">
              <Sparkles className="mr-1.5 h-3 w-3" aria-hidden /> {TEAM.tagline}
            </Chip>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl">
              Welcome to <span className="gradient-text">Mission Mavericks</span>
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              {TEAM.subtitle} A collective of eight engineers, designers and researchers shipping
              production-grade products every single sprint.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="gradient-brand shadow-glow inline-flex h-12 items-center gap-2 rounded-xl px-6 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring"
              >
                View Projects <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/members"
                className="glass inline-flex h-12 items-center rounded-xl px-6 text-sm font-semibold transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring"
              >
                Meet the Team
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ---------- Stats ---------- */}
      <section aria-label="Team statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.05}>
            <GlassCard interactive className="h-full p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                  <p className="mt-2 font-display text-3xl font-bold tabular-nums">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                </div>
                <span className="gradient-brand grid h-11 w-11 shrink-0 place-items-center rounded-2xl">
                  <s.icon className="h-5 w-5 text-primary-foreground" aria-hidden />
                </span>
              </div>
            </GlassCard>
          </Reveal>
        ))}

        <Reveal delay={0.35}>
          <GlassCard className="h-full p-5">
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <CloudSun className="h-4 w-4" aria-hidden /> Today at HQ
            </div>
            <p className="mt-2 font-display text-3xl font-bold">24°C</p>
            <p className="text-xs text-muted-foreground">Clear skies · perfect sprint weather</p>
          </GlassCard>
        </Reveal>
      </section>

      {/* ---------- Weekly progress charts ---------- */}
      <section aria-label="Weekly progress" className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <GlassCard className="h-full p-6">
            <h2 className="text-base font-semibold">Weekly commits</h2>
            <p className="mb-4 text-xs text-muted-foreground">Last 8 weeks across all repositories</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={WEEKLY_PROGRESS}>
                  <defs>
                    <linearGradient id="fillCommits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Area type="monotone" dataKey="commits" stroke="var(--chart-1)" strokeWidth={2.5} fill="url(#fillCommits)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.08}>
          <GlassCard className="h-full p-6">
            <h2 className="text-base font-semibold">Tasks vs reviews</h2>
            <p className="mb-4 text-xs text-muted-foreground">Delivery throughput per week</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WEEKLY_PROGRESS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltipStyle} cursor={{ fill: "var(--muted)" }} />
                  <Bar dataKey="tasks" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="reviews" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal>
          <GlassCard className="h-full p-6">
            <h2 className="text-base font-semibold">Velocity trend</h2>
            <p className="mb-4 text-xs text-muted-foreground">Completed tasks trending upward</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={WEEKLY_PROGRESS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip {...tooltipStyle} />
                  <Line type="monotone" dataKey="tasks" stroke="var(--chart-4)" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.08}>
          <GlassCard className="h-full p-6">
            <h2 className="text-base font-semibold">Effort distribution</h2>
            <p className="mb-4 text-xs text-muted-foreground">Where the team spends its hours</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={EFFORT_SPLIT} dataKey="value" nameKey="name" innerRadius={52} outerRadius={82} paddingAngle={3}>
                    {EFFORT_SPLIT.map((entry, i) => (
                      <Cell key={entry.name} fill={CHART_COLORS[i % CHART_COLORS.length]} stroke="var(--card)" />
                    ))}
                  </Pie>
                  <Tooltip {...tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2">
              {EFFORT_SPLIT.map((e, i) => (
                <Chip key={e.name}>
                  <span
                    className="mr-1.5 inline-block h-2 w-2 rounded-full"
                    style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                  />
                  {e.name} · {e.value}%
                </Chip>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* ---------- Activity, leaderboard, quote ---------- */}
      <section className="grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <GlassCard className="h-full p-6">
            <h2 className="text-base font-semibold">Recent activity</h2>
            <ul className="mt-4 space-y-3">
              {ACTIVITY.map((a, i) => (
                <motion.li
                  key={a.what}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card/60 p-3"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-xs font-bold text-accent-foreground">
                    {a.who.split(" ").map((n) => n[0]).join("")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{a.who}</p>
                    <p className="truncate text-xs text-muted-foreground">{a.what}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{a.when}</span>
                </motion.li>
              ))}
            </ul>
          </GlassCard>
        </Reveal>

        <div className="space-y-5">
          <Reveal delay={0.05}>
            <GlassCard className="p-6">
              <h2 className="text-base font-semibold">Team leaderboard</h2>
              <div className="mt-4 space-y-4">
                {leaderboard.map((m) => (
                  <Meter key={m.id} label={m.name} value={m.contribution} />
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.1}>
            <GlassCard className="p-6">
              <Quote className="h-5 w-5 text-primary" aria-hidden />
              <p className="mt-3 text-sm leading-relaxed">{QUOTE.text}</p>
              <p className="mt-3 text-xs font-semibold text-muted-foreground">— {QUOTE.author}</p>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
