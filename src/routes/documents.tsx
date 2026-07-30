import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Download, Eye, FileText, Loader2, LogIn, LogOut, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Chip, GlassCard, PageHeader, Reveal } from "@/components/ui-kit";
import { DOCUMENT_TYPES, WEEKS, type DocumentType } from "@/data/team";
import { useAdmin } from "@/hooks/use-admin";
import { supabase } from "@/integrations/supabase/client";
import { getDocumentUrl } from "@/lib/documents.functions";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — Mission Mavericks" },
      { name: "description", content: "Weekly reports and minutes of meeting for the Motor Claims Intelligence Hub." },
      { property: "og:title", content: "Documents — Mission Mavericks" },
      { property: "og:description", content: "Weekly reports and MOM, organised by week." },
    ],
  }),
  component: DocumentsPage,
});

type Doc = {
  id: string;
  week_number: number;
  document_type: string;
  title: string;
  description: string | null;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string | null;
  uploaded_by_name: string | null;
  uploaded_date: string;
};

function formatSize(bytes: number) {
  if (!bytes) return "—";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** i).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

function Modal({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
      <GlassCard className={`w-full ${wide ? "max-w-4xl" : "max-w-md"} max-h-[90vh] overflow-auto p-6`}>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-display text-lg font-bold">{title}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-xl border border-border">
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        {children}
      </GlassCard>
    </div>
  );
}

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-card px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function DocumentsPage() {
  const { isAdmin, email } = useAdmin();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [week, setWeek] = useState<number | "All">("All");
  const [type, setType] = useState<DocumentType | "All">("All");
  const [login, setLogin] = useState(false);
  const [form, setForm] = useState<Doc | null>(null);
  const [creating, setCreating] = useState(false);
  const [preview, setPreview] = useState<{ doc: Doc; url: string } | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("week_number", { ascending: true })
      .order("uploaded_date", { ascending: false });
    if (error) toast.error(error.message);
    setDocs((data as Doc[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return docs.filter(
      (d) =>
        (week === "All" || d.week_number === week) &&
        (type === "All" || d.document_type === type) &&
        (d.title.toLowerCase().includes(q) || (d.description ?? "").toLowerCase().includes(q)),
    );
  }, [docs, query, week, type]);

  async function openDoc(doc: Doc, download = false) {
    try {
      const { url } = await getDocumentUrl({ data: { path: doc.file_path, download } });
      if (download) {
        window.location.href = url;
      } else {
        setPreview({ doc, url });
      }
    } catch {
      toast.error("Could not open this document");
    }
  }

  async function remove(doc: Doc) {
    if (!window.confirm(`Delete “${doc.title}”?`)) return;
    const { error } = await supabase.from("documents").delete().eq("id", doc.id);
    if (error) return toast.error(error.message);
    await supabase.storage.from("documents").remove([doc.file_path]);
    toast.success("Document deleted");
    load();
  }

  return (
    <div>
      <PageHeader
        eyebrow="Documents"
        title="Weekly reports & minutes of meeting"
        description="Every week's documentation in one place — searchable, previewable and downloadable."
        action={
          <div className="flex gap-2">
            {isAdmin && (
              <button
                type="button"
                onClick={() => setCreating(true)}
                className="gradient-brand inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-primary-foreground"
              >
                <Plus className="h-4 w-4" aria-hidden /> Upload
              </button>
            )}
            <button
              type="button"
              onClick={async () => {
                if (isAdmin) {
                  await supabase.auth.signOut();
                  toast.success("Signed out");
                } else setLogin(true);
              }}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
            >
              {isAdmin ? <LogOut className="h-4 w-4" aria-hidden /> : <LogIn className="h-4 w-4" aria-hidden />}
              {isAdmin ? "Sign out" : "Admin login"}
            </button>
          </div>
        }
      />

      {isAdmin && email && (
        <p className="mb-4 text-xs text-primary">Signed in as {email} · admin access enabled</p>
      )}

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents"
            aria-label="Search documents"
            className={`${inputClass} pl-9`}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["All", ...WEEKS] as const).map((w) => (
            <button
              key={String(w)}
              type="button"
              onClick={() => setWeek(w as number | "All")}
              aria-pressed={week === w}
              className={
                week === w
                  ? "gradient-brand rounded-xl px-3.5 py-2 text-xs font-semibold text-primary-foreground"
                  : "rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
              }
            >
              {w === "All" ? "All weeks" : `Week ${w}`}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {(["All", ...DOCUMENT_TYPES] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t as DocumentType | "All")}
              aria-pressed={type === t}
              className={
                type === t
                  ? "gradient-brand rounded-xl px-3.5 py-2 text-xs font-semibold text-primary-foreground"
                  : "rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
              }
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <GlassCard className="grid place-items-center p-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" aria-hidden />
        </GlassCard>
      ) : filtered.length === 0 ? (
        <GlassCard className="p-12 text-center">
          <p className="font-semibold">No documents yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {isAdmin ? "Upload the first weekly report or MOM." : "Documents will appear here once the team uploads them."}
          </p>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {filtered.map((d, i) => (
            <Reveal key={d.id} delay={i * 0.03}>
              <GlassCard className="flex flex-wrap items-center gap-4 p-4">
                <span className="gradient-brand grid h-12 w-12 shrink-0 place-items-center rounded-2xl">
                  <FileText className="h-5 w-5 text-primary-foreground" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{d.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatSize(d.file_size)} · {new Date(d.uploaded_date).toLocaleDateString()}
                    {d.uploaded_by_name ? ` · ${d.uploaded_by_name}` : ""}
                  </p>
                  {d.description && <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">{d.description}</p>}
                </div>
                <Chip>Week {d.week_number}</Chip>
                <Chip>{d.document_type}</Chip>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openDoc(d)}
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-semibold hover:border-primary/40 hover:text-primary"
                  >
                    <Eye className="h-4 w-4" aria-hidden /> View
                  </button>
                  <button
                    type="button"
                    onClick={() => openDoc(d, true)}
                    className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-semibold hover:border-primary/40 hover:text-primary"
                  >
                    <Download className="h-4 w-4" aria-hidden /> Download
                  </button>
                  {isAdmin && (
                    <>
                      <button
                        type="button"
                        onClick={() => setForm(d)}
                        aria-label={`Edit ${d.title}`}
                        className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card hover:border-primary/40 hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(d)}
                        aria-label={`Delete ${d.title}`}
                        className="grid h-10 w-10 place-items-center rounded-xl border border-destructive/30 bg-card text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </>
                  )}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      )}

      {login && <LoginModal onClose={() => setLogin(false)} />}
      {creating && <UploadModal onClose={() => setCreating(false)} onDone={load} />}
      {form && <EditModal doc={form} onClose={() => setForm(null)} onDone={load} />}
      {preview && (
        <Modal wide title={preview.doc.title} onClose={() => setPreview(null)}>
          <DocumentPreview url={preview.url} mime={preview.doc.mime_type} />
        </Modal>
      )}
    </div>
  );
}

function DocumentPreview({ url, mime }: { url: string; mime: string | null }) {
  if (mime?.startsWith("image/")) return <img src={url} alt="Document preview" className="w-full rounded-2xl" />;
  const office = mime && /word|presentation|sheet|officedocument/.test(mime);
  const src = office ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}` : url;
  return <iframe src={src} title="Document preview" className="h-[70vh] w-full rounded-2xl border border-border" />;
}

function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Signed in as admin");
    onClose();
  }

  return (
    <Modal title="Admin login" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" className={inputClass} />
        <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" aria-label="Password" className={inputClass} />
        <button type="submit" disabled={busy} className="gradient-brand h-11 w-full rounded-xl text-sm font-semibold text-primary-foreground disabled:opacity-60">
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <p className="text-center text-xs text-muted-foreground">Only approved team admins can upload or edit documents.</p>
      </form>
    </Modal>
  );
}

function UploadModal({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const { session } = useAdmin();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [week, setWeek] = useState(1);
  const [type, setType] = useState<DocumentType>("Weekly Report");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return toast.error("Choose a file");
    if (file.size > 20 * 1024 * 1024) return toast.error("File must be under 20 MB");
    setBusy(true);
    const path = `week-${week}/${Date.now()}-${file.name.replace(/[^A-Za-z0-9_.-]/g, "_")}`;
    const up = await supabase.storage.from("documents").upload(path, file, { contentType: file.type });
    if (up.error) {
      setBusy(false);
      return toast.error(up.error.message);
    }
    const { error } = await supabase.from("documents").insert({
      title: title.trim(),
      description: description.trim() || null,
      week_number: week,
      document_type: type,
      file_name: file.name,
      file_path: path,
      file_size: file.size,
      mime_type: file.type,
      uploaded_by: session?.user.id ?? null,
      uploaded_by_name: session?.user.email ?? null,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Document uploaded");
    onDone();
    onClose();
  }

  return (
    <Modal title="Upload document" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <input required maxLength={150} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" aria-label="Title" className={inputClass} />
        <input maxLength={300} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (optional)" aria-label="Description" className={inputClass} />
        <div className="grid grid-cols-2 gap-3">
          <select value={week} onChange={(e) => setWeek(Number(e.target.value))} aria-label="Week" className={inputClass}>
            {WEEKS.map((w) => (
              <option key={w} value={w}>{`Week ${w}`}</option>
            ))}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value as DocumentType)} aria-label="Document type" className={inputClass}>
            {DOCUMENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <input type="file" required onChange={(e) => setFile(e.target.files?.[0] ?? null)} aria-label="File" className="w-full rounded-xl border border-border bg-card p-2.5 text-sm" />
        <button type="submit" disabled={busy} className="gradient-brand h-11 w-full rounded-xl text-sm font-semibold text-primary-foreground disabled:opacity-60">
          {busy ? "Uploading…" : "Upload"}
        </button>
      </form>
    </Modal>
  );
}

function EditModal({ doc, onClose, onDone }: { doc: Doc; onClose: () => void; onDone: () => void }) {
  const [title, setTitle] = useState(doc.title);
  const [description, setDescription] = useState(doc.description ?? "");
  const [week, setWeek] = useState(doc.week_number);
  const [type, setType] = useState(doc.document_type);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase
      .from("documents")
      .update({
        title: title.trim(),
        description: description.trim() || null,
        week_number: week,
        document_type: type,
        modified_date: new Date().toISOString(),
      })
      .eq("id", doc.id);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("Document updated");
    onDone();
    onClose();
  }

  return (
    <Modal title="Edit document" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <input required maxLength={150} value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Title" className={inputClass} />
        <input maxLength={300} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" aria-label="Description" className={inputClass} />
        <div className="grid grid-cols-2 gap-3">
          <select value={week} onChange={(e) => setWeek(Number(e.target.value))} aria-label="Week" className={inputClass}>
            {WEEKS.map((w) => (
              <option key={w} value={w}>{`Week ${w}`}</option>
            ))}
          </select>
          <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Document type" className={inputClass}>
            {DOCUMENT_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={busy} className="gradient-brand h-11 w-full rounded-xl text-sm font-semibold text-primary-foreground disabled:opacity-60">
          {busy ? "Saving…" : "Save changes"}
        </button>
      </form>
    </Modal>
  );
}
