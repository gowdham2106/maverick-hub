import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Instagram, Mail, Rocket } from "lucide-react";
import { TEAM } from "@/data/team";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border bg-card/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="gradient-brand grid h-9 w-9 shrink-0 place-items-center rounded-xl">
              <Rocket className="h-4 w-4 text-primary-foreground" aria-hidden />
            </span>
            <p className="font-display font-bold">{TEAM.name}</p>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{TEAM.tagline}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {[
            { label: "GitHub", icon: Github, href: "https://github.com/" },
            { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/" },
            { label: "Instagram", icon: Instagram, href: "https://instagram.com/" },
            { label: "Email", icon: Mail, href: "mailto:hello@missionmavericks.dev" },
          ].map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden />
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Mission Mavericks. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/settings" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link to="/settings" className="hover:text-foreground">
            Terms
          </Link>
          <Link to="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
