import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Github, Instagram, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { GlassCard, PageHeader, Reveal } from "@/components/ui-kit";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Mission Mavericks" },
      { name: "description", content: "Get in touch with Mission Mavericks for collaborations, mentorship or hiring." },
      { property: "og:title", content: "Contact — Mission Mavericks" },
      { property: "og:description", content: "Reach the team for collaborations, mentorship or hiring." },
    ],
  }),
  component: ContactPage,
});

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  /** Client-side validation mirroring the server DTO rules. */
  function validate(): Errors {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    else if (form.name.length > 100) e.name = "Name must be under 100 characters";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.length > 1000) e.message = "Message must be under 1000 characters";
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 900)); // simulated POST /api/contact
    setSending(false);
    setForm({ name: "", email: "", message: "" });
    toast.success("Message sent — we'll reply within 24 hours.");
  }

  const field =
    "h-11 w-full rounded-xl border border-border bg-card px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something"
        description="Collaborations, mentorship, sponsorship or hiring — the whole team reads this inbox."
      />

      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <GlassCard className="p-6 sm:p-8">
            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  aria-invalid={!!errors.name}
                  className={field}
                  placeholder="Ada Lovelace"
                />
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  aria-invalid={!!errors.email}
                  className={field}
                  placeholder="you@company.com"
                />
                {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  aria-invalid={!!errors.message}
                  className="w-full rounded-xl border border-border bg-card p-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Tell us what you have in mind…"
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>
              <button
                type="submit"
                disabled={sending}
                className="gradient-brand shadow-glow inline-flex h-12 items-center gap-2 rounded-xl px-6 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send message"} <Send className="h-4 w-4" aria-hidden />
              </button>
            </form>
          </GlassCard>
        </Reveal>

        <div className="space-y-5">
          <Reveal delay={0.06}>
            <GlassCard className="overflow-hidden">
              <iframe
                title="Mission Mavericks location map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.146%2C51.498%2C-0.116%2C51.512&layer=mapnik"
                className="h-56 w-full border-0"
                loading="lazy"
              />
              <div className="flex items-center gap-2 p-5 text-sm">
                <MapPin className="h-4 w-4 text-primary" aria-hidden />
                Innovation Hub, Level 4 — open weekdays 9:00–18:00
              </div>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.12}>
            <GlassCard className="p-6">
              <h2 className="text-base font-semibold">Find us online</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: "GitHub", icon: Github, href: "https://github.com/" },
                  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/" },
                  { label: "Instagram", icon: Instagram, href: "https://instagram.com/" },
                  { label: "Email", icon: Mail, href: "mailto:hello@missionmavericks.dev" },
                ].map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" aria-hidden /> {label}
                  </a>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
