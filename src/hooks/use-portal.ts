import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type MemberRow = {
  id: string;
  name: string;
  role: string;
  department: string | null;
  email: string | null;
  linkedin_url: string | null;
  photo_url: string | null;
  initials: string | null;
  hue: number;
  member_group: string;
  responsibilities: string[];
  sort_order: number;
};

export type ProjectRow = {
  id: string;
  name: string;
  category: string;
  status: string;
  progress: number;
  current_phase: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  outcomes: string[];
  business_benefits: string[];
  business_impact: string;
  updated_at: string;
};

export type RoadmapRow = {
  id: string;
  week_number: number;
  title: string;
  focus_items: string[];
  deliverables: string[];
  progress: number;
  status: string;
  updated_at: string;
};

export type ActivityRow = {
  id: string;
  action: string;
  entity: string;
  details: string | null;
  actor_name: string | null;
  created_at: string;
};

export type DocumentRow = {
  id: string;
  week_number: number;
  document_type: string;
  title: string;
  description: string | null;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string | null;
  version: string;
  uploaded_by_name: string | null;
  uploaded_date: string;
  modified_date: string;
};

export type GalleryRow = {
  id: string;
  title: string;
  category: string;
  description: string | null;
  file_path: string;
  file_name: string;
  file_size: number;
  mime_type: string | null;
  media_type: string;
  uploaded_by_name: string | null;
  created_at: string;
};

function unwrap<T>(result: { data: unknown; error: { message: string } | null }): T {
  if (result.error) throw new Error(result.error.message);
  return (result.data ?? []) as T;
}

export function useMembers() {
  return useQuery({
    queryKey: ["members"],
    queryFn: async () =>
      unwrap<MemberRow[]>(
        await supabase.from("members").select("*").order("member_group").order("sort_order"),
      ),
  });
}

export function useProject() {
  return useQuery({
    queryKey: ["project"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("project_details")
        .select("*")
        .eq("is_active", true)
        .order("created_at")
        .limit(1)
        .maybeSingle();
      if (error) throw new Error(error.message);
      return (data ?? null) as ProjectRow | null;
    },
  });
}

export function useRoadmap() {
  return useQuery({
    queryKey: ["roadmap"],
    queryFn: async () =>
      unwrap<RoadmapRow[]>(
        await supabase.from("roadmap_weeks").select("*").order("week_number"),
      ),
  });
}

export function useActivity(limit = 8) {
  return useQuery({
    queryKey: ["activity", limit],
    queryFn: async () =>
      unwrap<ActivityRow[]>(
        await supabase
          .from("activity_logs")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(limit),
      ),
  });
}

export function useDocuments() {
  return useQuery({
    queryKey: ["documents"],
    queryFn: async () =>
      unwrap<DocumentRow[]>(
        await supabase
          .from("documents")
          .select("*")
          .order("week_number")
          .order("uploaded_date", { ascending: false }),
      ),
  });
}

export function useGallery() {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async () =>
      unwrap<GalleryRow[]>(
        await supabase.from("gallery_items").select("*").order("created_at", { ascending: false }),
      ),
  });
}

export function useCounts() {
  return useQuery({
    queryKey: ["counts"],
    queryFn: async () => {
      const [docs, gallery] = await Promise.all([
        supabase.from("documents").select("id", { count: "exact", head: true }),
        supabase.from("gallery_items").select("id", { count: "exact", head: true }),
      ]);
      return { documents: docs.count ?? 0, gallery: gallery.count ?? 0 };
    },
  });
}
