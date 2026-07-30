import { createFileRoute } from "@tanstack/react-router";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { GlassCard, Meter, PageHeader, Reveal } from "@/components/ui-kit";
import { SKILL_GROUPS } from "@/data/team";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Mission Mavericks" },
      { name: "description", content: "Team capability map across languages, frameworks, databases and cloud." },
      { property: "og:title", content: "Skills — Mission Mavericks" },
      { property: "og:description", content: "Languages, frameworks, databases and cloud proficiency at a glance." },
    ],
  }),
  component: SkillsPage,
});

function SkillsPage() {
  const radarData = SKILL_GROUPS.map((g) => ({
    group: g.group,
    value: Math.round(g.items.reduce((a, b) => a + b.value, 0) / g.items.length),
  }));

  return (
    <div>
      <PageHeader
        eyebrow="Skills"
        title="Capability map"
        description="Aggregate proficiency across the team, refreshed after every sprint retrospective."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-1">
          <GlassCard className="h-full p-6">
            <h2 className="text-base font-semibold">Category balance</h2>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius="72%">
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="group" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                  <Radar dataKey="value" stroke="var(--chart-1)" fill="var(--chart-2)" fillOpacity={0.35} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
          {SKILL_GROUPS.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.06}>
              <GlassCard interactive className="h-full p-6">
                <h2 className="text-base font-semibold">{g.group}</h2>
                <div className="mt-4 space-y-4">
                  {g.items.map((s) => (
                    <Meter key={s.name} label={s.name} value={s.value} />
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
