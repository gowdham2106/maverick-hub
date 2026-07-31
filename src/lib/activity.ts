import { supabase } from "@/integrations/supabase/client";

export type ActivityAction =
  | "Document Uploaded"
  | "Document Updated"
  | "Document Deleted"
  | "Gallery Uploaded"
  | "Gallery Updated"
  | "Gallery Deleted"
  | "Roadmap Updated"
  | "Project Updated"
  | "Admin Logged In";

/**
 * Appends an entry to the activity feed shown on the dashboard.
 * Only administrators are allowed to write, so failures are silently ignored
 * for visitors and never block the primary action.
 */
export async function logActivity(
  action: ActivityAction,
  entity: string,
  details?: string,
  actorName?: string | null,
) {
  await supabase.from("activity_logs").insert({
    action,
    entity,
    details: details ?? null,
    actor_name: actorName ?? null,
  });
}
