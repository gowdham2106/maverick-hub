import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Github, Linkedin, Mail, Search } from "lucide-react";
import { Chip, GlassCard, Meter, PageHeader, Reveal } from "@/components/ui-kit";
import { MEMBERS } from "@/data/team";

export const Route = createFileRoute("/members")({
  head: () => ({
    meta: [
      { title: "Team Members — Mission Mavericks" },
      { name: "description", content: "Meet the eight engineers, designers and researchers behind Mission Mavericks." },
      { property: "og:title", content: "Team Members — Mission Mavericks" },
      { property: "og:description", content: "Roles, skills, experience and contribution scores for every member." },
    ],
  }),
  component: MembersPage,
});

const DEPARTMENTS = ["All", "Engineering", "Product", "Design", "Platform", "Research", "Quality"];

function MembersPage() {
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");

  const filtered = useMemo(
    () =>
      MEMBERS.filter(
        (m) =>
          (dept === "All" || m.department === dept) &&
          (m.name.toLowerCase().includes(query.toLowerCase()) ||
            m.role.toLowerCase().includes(query.toLowerCase()) ||
            m.skills.some((s) => s.toLowerCase().includes(query.toLowerCase()))),
      ),
    [query, dept],
  );

  return (
    <div>
      <PageHeader
        eyebrow="Members"
        title="Meet the Mavericks"
        description="Eight specialists, one delivery standard. Filter by department or search for a skill."
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, role or skill"
            aria-label="Search members"
            className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {DEPARTMENTS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDept(d)}
              aria-pressed={dept === d}
              className={
                dept === d
                  ? "gradient-brand rounded-xl px-3.5 py-2 text-xs font-semibold text-primary-foreground"
                  : "rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <p className="font-semibold">No members match that search</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different name, role or skill.</p>
        </GlassCard>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.04}>
              <GlassCard interactive className="h-full overflow-hidden">
                <div
                  className="h-20 w-full"
                  style={{
                    background: `linear-gradient(120deg, oklch(0.62 0.2 ${m.hue}), oklch(0.6 0.2 ${m.hue + 40}))`,
                  }}
                  aria-hidden
                />
                <div className="-mt-9 px-6 pb-6">
                  <span
                    className="grid h-16 w-16 place-items-center rounded-2xl border-4 border-card font-display text-lg font-bold text-primary-foreground"
                    style={{ background: `oklch(0.55 0.2 ${m.hue})` }}
                    aria-hidden
                  >
                    {m.initials}
                  </span>
                  <h2 className="mt-3 text-base font-semibold">{m.name}</h2>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Chip>{m.department}</Chip>
                    <Chip>{m.experience}</Chip>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {m.skills.map((s) => (
                      <Chip key={s} className="border-primary/25 bg-primary/10 text-primary">
                        {s}
                      </Chip>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Meter value={m.contribution} label="Contribution" />
                  </div>
                  <div className="mt-4 flex gap-2">
                    {[
                      { href: m.github, icon: Github, label: `${m.name} on GitHub` },
                      { href: m.linkedin, icon: Linkedin, label: `${m.name} on LinkedIn` },
                      { href: `mailto:${m.email}`, icon: Mail, label: `Email ${m.name}` },
                    ].map(({ href, icon: Icon, label }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        target="_blank"
                        rel="noreferrer"
                        className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Icon className="h-4 w-4" aria-hidden />
                      </a>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
