import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { BRAND } from "@/data/team";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border bg-card/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <div className="min-w-0">
              <p className="font-display font-bold">{BRAND.teamName}</p>
              <p className="text-xs text-muted-foreground">{BRAND.projectName}</p>
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{BRAND.tagline}</p>
        </div>

        </div>

      <div className="mx-auto mt-6 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {BRAND.teamName}. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/legal" hash="privacy" className="hover:text-foreground">
            Privacy Policy
          </Link>
          <Link to="/legal" hash="terms" className="hover:text-foreground">
            Terms
          </Link>
          <span>Version {BRAND.version}</span>
        </div>
      </div>
    </footer>
  );
}
