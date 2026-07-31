import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Download, Film, Image as ImageIcon, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import {
  Chip,
  EmptyState,
  ErrorState,
  GlassCard,
  PageHeader,
  Reveal,
  Skeleton,
} from "@/components/ui-kit";
import { GALLERY_ACCEPT, GALLERY_CATEGORIES } from "@/data/team";
import { useAdmin } from "@/hooks/use-admin";
import { useGallery, type GalleryRow } from "@/hooks/use-portal";
import { supabase } from "@/integrations/supabase/client";
import { getMediaUrls } from "@/lib/documents.functions";
import { logActivity } from "@/lib/activity";
import { useDebounced } from "@/hooks/use-debounced";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Mission Mavericks Hub" },
      {
        name: "description",
        content: "Photos, screenshots and demo videos from the Claim Shield Plus delivery journey.",
      },
      { property: "og:title", content: "Gallery — Mission Mavericks Hub" },
      { property: "og:description", content: "Moments from the Claim Shield Plus build." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-card px-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <GlassCard className="max-h-[90vh] w-full max-w-md overflow-auto p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="font-display text-lg font-bold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-xl border border-border"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        {children}
      </GlassCard>
    </div>
  );
}

function GalleryPage() {
  const { isAdmin, session } = useAdmin();
  const gallery = useGallery();
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [rawQuery, setRawQuery] = useState("");
  const query = useDebounced(rawQuery, 250);
  const [category, setCategory] = useState<string>("All");
  const [active, setActive] = useState<GalleryRow | null>(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState<GalleryRow | null>(null);
  const [visible, setVisible] = useState(12);

  const items = gallery.data ?? [];

  useEffect(() => {
    const paths = items.map((i) => i.file_path);
    if (paths.length === 0) return;
    let cancelled = false;
    getMediaUrls({ data: { paths, bucket: "gallery" } })
      .then((res) => {
        if (!cancelled) setUrls(res.urls);
      })
      .catch(() => toast.error("Some media could not be loaded"));
    return () => {
      cancelled = true;
    };
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return items.filter(
      (g) =>
        (category === "All" || g.category === category) &&
        (g.title.toLowerCase().includes(q) || (g.description ?? "").toLowerCase().includes(q)),
    );
  }, [items, query, category]);

  const paged = filtered.slice(0, visible);

  async function remove(item: GalleryRow) {
    if (!window.confirm(`Delete “${item.title}”?`)) return;
    const { error } = await supabase.from("gallery_items").delete().eq("id", item.id);
    if (error) return toast.error(error.message);
    await supabase.storage.from("gallery").remove([item.file_path]);
    await logActivity("Gallery Deleted", item.title, undefined, session?.user.email);
    toast.success("Media deleted");
    gallery.refetch();
  }

  return (
    <div>
      <PageHeader
        eyebrow="Gallery"
        title="Moments worth keeping"
        description="Build sprints, design reviews, screenshots and demo recordings."
        action={
          isAdmin ? (
            <button
              type="button"
              onClick={() => setUploading(true)}
              className="gradient-brand inline-flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-primary-foreground"
            >
              <Plus className="h-4 w-4" aria-hidden /> Upload media
            </button>
          ) : undefined
        }
      />

      <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            value={rawQuery}
            onChange={(e) => setRawQuery(e.target.value)}
            placeholder="Search gallery"
            aria-label="Search gallery"
            className={`${inputClass} pl-9`}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["All", ...GALLERY_CATEGORIES] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={
                category === c
                  ? "gradient-brand rounded-xl px-3.5 py-2 text-xs font-semibold text-primary-foreground"
                  : "rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
              }
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {gallery.isLoading ? (
        <div className="columns-1 gap-5 sm:columns-2 xl:columns-3 [&>*]:mb-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="rounded-3xl" style={{ height: i % 2 ? 340 : 220 }} />
          ))}
        </div>
      ) : gallery.isError ? (
        <ErrorState message="The gallery could not be loaded." onRetry={() => gallery.refetch()} />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Nothing in the gallery yet"
          description={
            isAdmin
              ? "Upload the first photo, screenshot or demo video."
              : "Photos and videos will appear here once the team uploads them."
          }
        />
      ) : (
        <>
          <div className="columns-1 gap-5 sm:columns-2 xl:columns-3 [&>*]:mb-5">
            {paged.map((g, i) => {
              const url = urls[g.file_path];
              return (
                <Reveal key={g.id} delay={Math.min(i, 8) * 0.04} className="break-inside-avoid">
                  <GlassCard className="group relative overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setActive(g)}
                      className="block w-full text-left focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`Open ${g.title}`}
                    >
                      {g.media_type === "video" ? (
                        <div className="grid h-56 w-full place-items-center bg-secondary/60">
                          <Film className="h-8 w-8 text-primary" aria-hidden />
                        </div>
                      ) : url ? (
                        <img
                          src={url}
                          alt={g.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <Skeleton className="w-full rounded-none" style={{ height: 220 }} />
                      )}
                      <span className="block p-4">
                        <Chip>{g.category}</Chip>
                        <span className="mt-2 block font-display text-base font-bold">{g.title}</span>
                        {g.uploaded_by_name && (
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {g.uploaded_by_name} · {new Date(g.created_at).toLocaleDateString()}
                          </span>
                        )}
                      </span>
                    </button>
                    {isAdmin && (
                      <div className="absolute right-3 top-3 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setEditing(g)}
                          aria-label={`Edit ${g.title}`}
                          className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card/90 hover:text-primary"
                        >
                          <Pencil className="h-4 w-4" aria-hidden />
                        </button>
                        <button
                          type="button"
                          onClick={() => remove(g)}
                          aria-label={`Delete ${g.title}`}
                          className="grid h-9 w-9 place-items-center rounded-xl border border-destructive/30 bg-card/90 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                    )}
                  </GlassCard>
                </Reveal>
              );
            })}
          </div>

          {visible < filtered.length && (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + 12)}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-semibold transition-colors hover:border-primary/40 hover:text-primary"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}

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
                {active.media_type === "video" ? (
                  <video src={urls[active.file_path]} controls className="max-h-[70vh] w-full bg-black" />
                ) : (
                  <img
                    src={urls[active.file_path]}
                    alt={active.title}
                    className="max-h-[70vh] w-full object-contain"
                  />
                )}
                <div className="flex flex-wrap items-start justify-between gap-4 p-6">
                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold">{active.title}</h2>
                    {active.description && (
                      <p className="mt-1 text-sm text-muted-foreground">{active.description}</p>
                    )}
                    <Chip className="mt-2">{active.category}</Chip>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={urls[active.file_path]}
                      download={active.file_name}
                      className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-semibold hover:border-primary/40 hover:text-primary"
                    >
                      <Download className="h-4 w-4" aria-hidden /> Download
                    </a>
                    <button
                      type="button"
                      onClick={() => setActive(null)}
                      aria-label="Close preview"
                      className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-card"
                    >
                      <X className="h-5 w-5" aria-hidden />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {uploading && (
        <UploadModal
          onClose={() => setUploading(false)}
          onDone={() => gallery.refetch()}
          actor={session?.user.email ?? null}
          userId={session?.user.id ?? null}
        />
      )}
      {editing && (
        <EditModal
          item={editing}
          onClose={() => setEditing(null)}
          onDone={() => gallery.refetch()}
          actor={session?.user.email ?? null}
        />
      )}
    </div>
  );
}

function UploadModal({
  onClose,
  onDone,
  actor,
  userId,
}: {
  onClose: () => void;
  onDone: () => void;
  actor: string | null;
  userId: string | null;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string>(GALLERY_CATEGORIES[0]);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return toast.error("Choose a file");
    if (file.size > 50 * 1024 * 1024) return toast.error("File must be under 50 MB");
    setBusy(true);
    const path = `${category.toLowerCase()}/${Date.now()}-${file.name.replace(/[^A-Za-z0-9_.-]/g, "_")}`;
    const up = await supabase.storage.from("gallery").upload(path, file, { contentType: file.type });
    if (up.error) {
      setBusy(false);
      return toast.error(up.error.message);
    }
    const { error } = await supabase.from("gallery_items").insert({
      title: title.trim(),
      description: description.trim() || null,
      category,
      file_path: path,
      file_name: file.name,
      file_size: file.size,
      mime_type: file.type,
      media_type: file.type.startsWith("video/") ? "video" : "image",
      uploaded_by: userId,
      uploaded_by_name: actor,
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    await logActivity("Gallery Uploaded", title.trim(), category, actor);
    toast.success("Media uploaded");
    onDone();
    onClose();
  }

  return (
    <Modal title="Upload media" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <input
          required
          maxLength={150}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          aria-label="Title"
          className={inputClass}
        />
        <input
          maxLength={300}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          aria-label="Description"
          className={inputClass}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Category"
          className={inputClass}
        >
          {GALLERY_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          type="file"
          required
          accept={GALLERY_ACCEPT}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          aria-label="Media file"
          className="w-full rounded-xl border border-border bg-card p-2.5 text-sm"
        />
        {previewUrl &&
          (file?.type.startsWith("video/") ? (
            <video src={previewUrl} controls className="max-h-56 w-full rounded-2xl" />
          ) : (
            <img src={previewUrl} alt="Upload preview" className="max-h-56 w-full rounded-2xl object-contain" />
          ))}
        <button
          type="submit"
          disabled={busy}
          className="gradient-brand h-11 w-full rounded-xl text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Uploading…" : "Upload"}
        </button>
      </form>
    </Modal>
  );
}

function EditModal({
  item,
  onClose,
  onDone,
  actor,
}: {
  item: GalleryRow;
  onClose: () => void;
  onDone: () => void;
  actor: string | null;
}) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description ?? "");
  const [category, setCategory] = useState(item.category);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase
      .from("gallery_items")
      .update({ title: title.trim(), description: description.trim() || null, category })
      .eq("id", item.id);
    setBusy(false);
    if (error) return toast.error(error.message);
    await logActivity("Gallery Updated", title.trim(), category, actor);
    toast.success("Media updated");
    onDone();
    onClose();
  }

  return (
    <Modal title="Edit media" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        <input
          required
          maxLength={150}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Title"
          className={inputClass}
        />
        <input
          maxLength={300}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          aria-label="Description"
          className={inputClass}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Category"
          className={inputClass}
        >
          {GALLERY_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={busy}
          className="gradient-brand h-11 w-full rounded-xl text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {busy ? "Saving…" : "Save changes"}
        </button>
      </form>
    </Modal>
  );
}
