import { getSupabaseService } from "@/lib/supabase";

export type VolunteerRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  status: string;
  skills: string[] | null;
  availability: string | null;
  location: string | null;
  interest_area: string | null;
  applied_at: string;
};

export async function fetchVolunteers(limit = 100): Promise<{
  rows: VolunteerRow[];
  error: string | null;
}> {
  const supabase = getSupabaseService();
  if (!supabase) {
    return {
      rows: [],
      error:
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  const { data, error } = await supabase
    .from("volunteers")
    .select(
      "id, name, email, phone, status, skills, availability, location, interest_area, applied_at"
    )
    .order("applied_at", { ascending: false })
    .limit(limit);

  if (error) {
    return { rows: [], error: error.message };
  }

  return { rows: (data ?? []) as VolunteerRow[], error: null };
}
