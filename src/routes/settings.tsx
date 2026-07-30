import { createFileRoute } from "@tanstack/react-router";
import { Bell, Lock, Moon, Palette, Shield, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { GlassCard, PageHeader, Reveal } from "@/components/ui-kit";
import { useTheme } from "@/hooks/use-theme";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Mission Mavericks" },
      { name: "description", content: "Appearance, notification and access preferences for the team workspace." },
      { property: "og:title", content: "Settings — Mission Mavericks" },
      { property: "og:description", content: "Appearance, notifications and access preferences." },
    ],
  }),
  component: SettingsPage,
});

function Row({
  icon: Icon,
  title,
  detail,
  control,
}: {
  icon: React.ElementType;
  title: string;
  detail: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 border-b border-border py-4 last:border-0">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
        <Icon className="h-[18px] w-[18px]" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{detail}</p>
      </div>
      {control}
    </div>
  );
}

function SettingsPage() {
  const { theme, toggle } = useTheme();

  return (
    <div>
      <PageHeader
        eyebrow="Settings"
        title="Workspace preferences"
        description="Appearance, notifications and access controls for the Mission Mavericks dashboard."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal>
          <GlassCard className="p-6">
            <h2 className="mb-2 text-base font-semibold">Appearance</h2>
            <Row
              icon={theme === "dark" ? Moon : Sun}
              title="Dark mode"
              detail="Switch between the light and dark palette."
              control={<Switch checked={theme === "dark"} onCheckedChange={toggle} aria-label="Toggle dark mode" />}
            />
            <Row
              icon={Palette}
              title="Reduced motion"
              detail="Minimise animated transitions across pages."
              control={<Switch aria-label="Toggle reduced motion" />}
            />
          </GlassCard>
        </Reveal>

        <Reveal delay={0.06}>
          <GlassCard className="p-6">
            <h2 className="mb-2 text-base font-semibold">Notifications</h2>
            <Row
              icon={Bell}
              title="Deployment alerts"
              detail="Notify me when a project ships to production."
              control={<Switch defaultChecked aria-label="Toggle deployment alerts" />}
            />
            <Row
              icon={Shield}
              title="Weekly digest"
              detail="Monday summary of commits, reviews and blockers."
              control={<Switch defaultChecked aria-label="Toggle weekly digest" />}
            />
            <Row
              icon={Lock}
              title="Admin-only documents"
              detail="Restrict document uploads to admin role members."
              control={<Switch aria-label="Toggle admin-only documents" />}
            />
          </GlassCard>
        </Reveal>
      </div>
    </div>
  );
}
