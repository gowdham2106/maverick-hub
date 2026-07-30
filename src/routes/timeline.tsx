import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { CheckCircle2, Circle } from "lucide-react";
import { GlassCard, PageHeader } from "@/components/ui-kit";
import { TIMELINE } from "@/data/team";

export const Route = createFileRoute("/timeline")({
  head: () => ({
    meta: [
      { title: "Timeline — Mission Mavericks" },
      { name: "description", content: "From idea to deployment: the Mission Mavericks delivery timeline." },
      { property: "og:title", content: "Timeline — Mission Mavericks" },
      { property: "og:description", content: "Idea, research, planning, development, testing, deployment." },
    ],
  }),
  component: TimelinePage,
});

function TimelinePage() {
  return (
    <div>
      <PageHeader
        eyebrow="Timeline"
        title="Idea to deployment"
        description="Seven phases, eleven months, three products in production."
      />

      <div className="relative">
        <div className="gradient-brand absolute left-4 top-0 h-full w-[3px] rounded-full opacity-40 md:left-1/2 md:-translate-x-1/2" aria-hidden />
        <ol className="space-y-6">
          {TIMELINE.map((t, i) => (
            <motion.li
              key={t.phase}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative pl-12 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:text-right"}`}
            >
              <span
                className={`absolute top-6 grid h-7 w-7 place-items-center rounded-full border-4 border-background ${
                  t.done ? "gradient-brand" : "bg-muted"
                } left-1 ${i % 2 ? "md:-left-3.5" : "md:left-auto md:-right-3.5"}`}
                aria-hidden
              >
                {t.done ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />
                ) : (
                  <Circle className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </span>
              <GlassCard className="p-6">
                <div className="flex flex-wrap items-baseline gap-2 md:justify-inherit">
                  <h2 className="text-base font-semibold">{t.phase}</h2>
                  <span className="text-xs text-muted-foreground">{t.date}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t.detail}</p>
              </GlassCard>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
