import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Image as ImageIcon } from "lucide-react";
import { Chip, GlassCard, PageHeader, Reveal } from "@/components/ui-kit";
import { GALLERY } from "@/data/team";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Mission Mavericks" },
      { name: "description", content: "Photos, certificates and moments from the Mission Mavericks journey." },
      { property: "og:title", content: "Gallery — Mission Mavericks" },
      { property: "og:description", content: "Demo days, build sprints, certificates and award nights." },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [active, setActive] = useState<(typeof GALLERY)[number] | null>(null);

  return (
    <div>
      <PageHeader
        eyebrow="Gallery"
        title="Moments worth keeping"
        description="Demo days, whiteboards at 2am, and the certificates that came after."
      />

      {/* Masonry via CSS columns */}
      <div className="columns-1 gap-5 sm:columns-2 xl:columns-3 [&>*]:mb-5">
        {GALLERY.map((g, i) => (
          <Reveal key={g.id} delay={i * 0.04} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setActive(g)}
              className="hover-lift group relative block w-full overflow-hidden rounded-3xl text-left focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                height: g.span === "tall" ? 340 : 220,
                background: `linear-gradient(140deg, oklch(0.62 0.19 ${g.hue}), oklch(0.5 0.2 ${g.hue + 50}))`,
              }}
              aria-label={`Open ${g.title}`}
            >
              <span className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/20" aria-hidden />
              <ImageIcon className="absolute right-4 top-4 h-5 w-5 text-primary-foreground/70" aria-hidden />
              <span className="absolute bottom-4 left-4 right-4">
                <Chip className="border-transparent bg-background/80 text-foreground">{g.tag}</Chip>
                <span className="mt-2 block font-display text-lg font-bold text-primary-foreground">{g.title}</span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-foreground/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <GlassCard className="overflow-hidden">
                <div
                  className="h-72 w-full"
                  style={{
                    background: `linear-gradient(140deg, oklch(0.62 0.19 ${active.hue}), oklch(0.5 0.2 ${active.hue + 50}))`,
                  }}
                  aria-hidden
                />
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <h2 className="text-lg font-semibold">{active.title}</h2>
                    <Chip className="mt-2">{active.tag}</Chip>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    aria-label="Close preview"
                    className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card"
                  >
                    <X className="h-5 w-5" aria-hidden />
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
