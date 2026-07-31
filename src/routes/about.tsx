import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart, Layers, Linkedin, Mail, Users } from "lucide-react";
import {
  Chip,
  EmptyState,
  ErrorState,
  GlassCard,
  PageHeader,
  Reveal,
  Skeleton,
} from "@/components/ui-kit";
import { RESPONSIBILITIES, TEAM } from "@/data/team";
import { useMembers, type MemberRow } from "@/hooks/use-portal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Team — Mission Mavericks Hub" },
      {
        name: "description",
        content:
          "Leadership, the nine-person core team, responsibilities and the technology stack behind Claim Shield Plus.",
      },
      { property: "og:title", content: "About the Team — Mission Mavericks Hub" },
      { property: "og:description", content: "Meet the Mission Mavericks leadership and core team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function Avatar({ member, size = 64 }: { member: MemberRow; size?: number }) {
  if (member.photo_url) {
    return (
      <img
        src={member.photo_url}
        alt={`${member.name} profile photo`}
        width={size}
        height={size}
        loading="lazy"
        className="shrink-0 rounded-2xl object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      aria-hidden
      className="grid shrink-0 place-items-center rounded-2xl font-display font-bold text-primary-foreground"
      style={{
        width: size,
        height: size,
        fontSize: size / 2.8,
        background: `linear-gradient(140deg, oklch(0.62 0.19 ${member.hue}), oklch(0.5 0.2 ${member.hue + 50}))`,
      }}
    >
      {member.initials ?? member.name.slice(0, 2).toUpperCase()}
    </span>
  );
}

function MemberCard({ member }: { member: MemberRow }) {
  return (
    <GlassCard interactive className="flex h-full flex-col gap-4 p-6">
      <div className="flex items-center gap-4">
        <Avatar member={member} />
        <div className="min-w-0">
          <p className="truncate font-display text-base font-bold">{member.name}</p>
          <p className="truncate text-sm text-primary">{member.role}</p>
          {member.department && (
            <Chip className="mt-2">{member.department}</Chip>
          )}
        </div>
      </div>
      <div className="mt-auto flex flex-wrap gap-2">
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary"
            aria-label={`Email ${member.name}`}
          >
            <Mail className="h-4 w-4" aria-hidden /> Email
          </a>
        )}
        {member.linkedin_url && (
          <a
            href={member.linkedin_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary"
            aria-label={`${member.name} on LinkedIn`}
          >
            <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
          </a>
        )}
      </div>
    </GlassCard>
  );
}

function AboutPage() {
  const members = useMembers();
  const leadership = members.data?.filter((m) => m.member_group === "leadership") ?? [];
  const core = members.data?.filter((m) => m.member_group === "core") ?? [];

  return (
    <div>
      <PageHeader
        eyebrow="About the team"
        title="Mission Mavericks"
        description={TEAM.mission}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {[
          { icon: Target, title: "Mission", body: TEAM.mission },
          { icon: Eye, title: "Vision", body: TEAM.vision },
          {
            icon: Heart,
            title: "How we work",
            body: TEAM.values.map((v) => v.title).join(" · "),
          },
        ].map((c, i) => (
          <Reveal key={c.title} delay={i * 0.05}>
            <GlassCard interactive className="h-full p-7">
              <span className="gradient-brand grid h-11 w-11 place-items-center rounded-2xl">
                <c.icon className="h-5 w-5 text-primary-foreground" aria-hidden />
              </span>
              <h2 className="mt-4 text-lg font-semibold">{c.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <h2 className="mb-4 mt-10 flex items-center gap-2 text-lg font-semibold">
        <Users className="h-5 w-5 text-primary" aria-hidden /> Leadership
      </h2>
      {members.isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="rounded-3xl" style={{ height: 168 }} />
          ))}
        </div>
      ) : members.isError ? (
        <ErrorState message="The team directory could not be loaded." onRetry={() => members.refetch()} />
      ) : leadership.length === 0 ? (
        <EmptyState title="No leadership records" description="Leadership profiles have not been added yet." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.05}>
              <MemberCard member={m} />
            </Reveal>
          ))}
        </div>
      )}

      <h2 className="mb-4 mt-10 flex items-center gap-2 text-lg font-semibold">
        <Users className="h-5 w-5 text-primary" aria-hidden /> Core team
      </h2>
      {members.isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="rounded-3xl" style={{ height: 168 }} />
          ))}
        </div>
      ) : core.length === 0 ? (
        <EmptyState title="No members yet" description="Core team profiles have not been added yet." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {core.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.04}>
              <MemberCard member={m} />
            </Reveal>
          ))}
        </div>
      )}

      <h2 className="mb-4 mt-10 flex items-center gap-2 text-lg font-semibold">
        <Layers className="h-5 w-5 text-primary" aria-hidden /> Responsibilities
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {RESPONSIBILITIES.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.04}>
            <GlassCard interactive className="h-full p-6">
              <h3 className="font-display text-base font-bold">{r.title}</h3>
              <ul className="mt-3 space-y-2">
                {r.people.map((p) => (
                  <li key={p} className="text-sm text-muted-foreground">
                    {p}
                  </li>
                ))}
              </ul>
            </GlassCard>
          </Reveal>
        ))}
      </div>

      <h2 className="mb-4 mt-10 flex items-center gap-2 text-lg font-semibold">
        <Layers className="h-5 w-5 text-primary" aria-hidden /> Technology stack
      </h2>
      <Reveal>
        <GlassCard className="flex flex-wrap gap-2 p-6">
          {TEAM.techStack.map((t) => (
            <Chip key={t.name} className="px-3 py-1.5 text-xs">
              {t.name} · {t.category}
            </Chip>
          ))}
        </GlassCard>
      </Reveal>
    </div>
  );
}
