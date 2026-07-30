import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  path: z
    .string()
    .min(1)
    .max(300)
    .regex(/^[A-Za-z0-9/_.-]+$/, "Invalid file path"),
  download: z.boolean().optional(),
});

/**
 * Returns a short-lived signed URL for a document in the private `documents`
 * bucket. Documents are public reading material for the team portfolio, so this
 * endpoint is intentionally unauthenticated but strictly read-only.
 */
export const getDocumentUrl = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed, error } = await supabaseAdmin.storage
      .from("documents")
      .createSignedUrl(data.path, 60 * 30, data.download ? { download: true } : undefined);

    if (error || !signed) throw new Error(error?.message ?? "Could not create document link");
    return { url: signed.signedUrl };
  });
