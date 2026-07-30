import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, FileText, Search } from "lucide-react";
import { Chip, GlassCard, PageHeader, Reveal } from "@/components/ui-kit";
import { DOCUMENTS } from "@/data/team";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — Mission Mavericks" },
      { name: "description", content: "Reports, architecture docs, presentations and audits from the team." },
      { property: "og:title", content: "Documents — Mission Mavericks" },
      { property: "og:description", content: "Charters, architecture overviews, technical reports and audits." },
    ],
  }),
  component: DocumentsPage,
});

function DocumentsPage() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => DOCUMENTS.filter((d) => d.name.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <div>
      <PageHeader
        eyebrow="Documents"
        title="Everything, written down"
        description="Reports, architecture decisions and presentations — searchable and downloadable."
      />

      <div className="relative mb-6 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documents"
          aria-label="Search documents"
          className="h-11 w-full rounded-xl border border-border bg-card pl-9 pr-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {filtered.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <p className="font-semibold">No documents found</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a shorter search term.</p>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {filtered.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.04}>
              <GlassCard className="flex flex-wrap items-center gap-4 p-4">
                <span className="gradient-brand grid h-12 w-12 shrink-0 place-items-center rounded-2xl">
                  <FileText className="h-5 w-5 text-primary-foreground" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{d.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {d.size} · updated {d.updated}
                  </p>
                </div>
                <Chip>{d.type}</Chip>
                <button
                  type="button"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 text-xs font-semibold transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <Download className="h-4 w-4" aria-hidden /> Download
                </button>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
