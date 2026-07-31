import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const pathSchema = z
  .string()
  .min(1)
  .max(300)
  .regex(/^[A-Za-z0-9/_.-]+$/, "Invalid file path");

const bucketSchema = z.enum(["documents", "gallery"]);

const singleSchema = z.object({
  path: pathSchema,
  bucket: bucketSchema.default("documents"),
  download: z.boolean().optional(),
});

const manySchema = z.object({
  paths: z.array(pathSchema).min(1).max(120),
  bucket: bucketSchema.default("gallery"),
});

const TTL_SECONDS = 60 * 30;

/**
 * Returns a short-lived signed URL for a file in a private bucket.
 * Documents and gallery media are public reading material for the portal, so
 * this endpoint is intentionally unauthenticated but strictly read-only.
 */
export const getDocumentUrl = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => singleSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed, error } = await supabaseAdmin.storage
      .from(data.bucket)
      .createSignedUrl(data.path, TTL_SECONDS, data.download ? { download: true } : undefined);

    if (error || !signed) throw new Error(error?.message ?? "Could not create document link");
    return { url: signed.signedUrl };
  });

/** Batch-signs media paths so the gallery can render in a single round trip. */
export const getMediaUrls = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => manySchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed, error } = await supabaseAdmin.storage
      .from(data.bucket)
      .createSignedUrls(data.paths, TTL_SECONDS);

    if (error || !signed) throw new Error(error?.message ?? "Could not create media links");

    const urls: Record<string, string> = {};
    for (const item of signed) {
      if (item.path && item.signedUrl) urls[item.path] = item.signedUrl;
    }
    return { urls };
  });
