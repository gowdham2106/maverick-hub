import { createFileRoute } from "@tanstack/react-router";
import { GlassCard, PageHeader, Reveal } from "@/components/ui-kit";
import { BRAND } from "@/data/team";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Privacy & Terms — Mission Mavericks Hub" },
      {
        name: "description",
        content:
          "Privacy policy and terms of use for the Mission Mavericks Hub delivery portal for Claim Shield Plus.",
      },
      { property: "og:title", content: "Privacy & Terms — Mission Mavericks Hub" },
      { property: "og:description", content: "How Mission Mavericks Hub handles data and portal access." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Legal"
        title="Privacy & Terms"
        description={`How ${BRAND.appName} handles information and portal access.`}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <GlassCard className="h-full p-7">
            <h2 id="privacy" className="font-display text-lg font-bold">Privacy Policy</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                {BRAND.appName} stores only the information required to run the delivery portal: team
                profiles, project documentation, gallery media and an activity history of administrative
                changes.
              </p>
              <p>
                Authentication is handled by the platform's managed authentication service. Passwords are
                never stored by this application, and administrator sessions are held in the browser only.
              </p>
              <p>
                Uploaded files are kept in private storage and served through short-lived links. Access is
                enforced with row level security on every table.
              </p>
            </div>
          </GlassCard>
        </Reveal>

        <Reveal delay={0.06}>
          <GlassCard className="h-full p-7">
            <h2 id="terms" className="font-display text-lg font-bold">Terms of Use</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                This portal documents the internal delivery of {BRAND.projectName}. Content is provided for
                programme review and demonstration purposes.
              </p>
              <p>
                Visitors may view, preview and download published documents and media. Uploading, editing
                and deleting content is restricted to approved administrators.
              </p>
              <p>Version {BRAND.version}.</p>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  );
}
