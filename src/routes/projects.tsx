import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExternalLink, Github, Search } from "lucide-react";
import { Chip, GlassCard, Meter, PageHeader, Reveal } from "@/components/ui-kit";
import { PROJECTS } from "@/data/team";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Mission Mavericks" },
      { name: "description", content: "Products built by Mission Mavericks: stacks, status, progress and owners." },
      { property: "og:title", content: "Projects — Mission Mavericks" },
      { property: "og:description", content: "Eight products from incident tooling to offline-first field apps." },
    ],
  }),
  component: ProjectsPage,
});

const FILTERS = ["All", "Live", "In Progress", "Planning"] as const;
const PAGE_SIZE = 6;

const STATUS_STYLES: Record<string, string> = {
  Live: "border-success/30 bg-success/15 text-success",
  "In Progress": "border-warning/30 bg-warning/15 text-warning",
  Planning: "border-border bg-secondary text-muted-foreground",
};

function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return PROJECTS.filter(
      (p) =>
        (filter === "All" || p.status === filter) &&
        (p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.stack.some((s) => s.toLowerCase().includes(q))),
    );
  }, [query, filter]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div>
      <PageHeader
        eyebrow="Projects"
        title="What we've shipped"
        description="From hackathon prototypes to production deployments — every project with its stack, owner and progress."
      />

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search projects or technologies"
            aria-label="Search projects"
            className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setFilter(f);
                setPage(1);
              }}
              aria-pressed={filter === f}
              className={
                filter === f
                  ? "gradient-brand rounded-xl px-3.5 py-2 text-xs font-semibold text-primary-foreground"
                  : "rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <p className="font-semibold">No projects found</p>
          <p className="mt-1 text-sm text-muted-foreground">Adjust your search or clear the status filter.</p>
        </GlassCard>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <GlassCard interactive className="flex h-full flex-col overflow-hidden">
                <div
                  className="relative h-32"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.6 0.2 ${p.hue}), oklch(0.55 0.21 ${p.hue + 45}))`,
                  }}
                  aria-hidden
                >
                  <span className="absolute bottom-3 left-5 font-display text-xl font-extrabold text-primary-foreground">
                    {p.title}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-2">
                    <Chip className={STATUS_STYLES[p.status]}>{p.status}</Chip>
                    <span className="text-xs text-muted-foreground">{p.timeline}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Meter value={p.progress} label="Progress" />
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">Owner · {p.owner}</p>
                  <div className="mt-auto flex gap-2 pt-4">
                    <a
                      href="https://github.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary"
                    >
                      <Github className="h-4 w-4" aria-hidden /> GitHub
                    </a>
                    <a
                      href="https://github.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="gradient-brand inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl text-xs font-semibold text-primary-foreground"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden /> Live Demo
                    </a>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      )}

      {pages > 1 && (
        <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={current === n ? "page" : undefined}
              className={
                current === n
                  ? "gradient-brand h-10 w-10 rounded-xl text-sm font-semibold text-primary-foreground"
                  : "h-10 w-10 rounded-xl border border-border bg-card text-sm font-medium text-muted-foreground hover:text-foreground"
              }
            >
              {n}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
