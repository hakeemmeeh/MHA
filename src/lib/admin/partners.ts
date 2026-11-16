import { getSupabaseService } from "@/lib/supabase";
import { getAdminDataError } from "@/lib/admin/error-message";

export type PartnerRow = {
  id: string;
  name: string;
  partner_type: string;
  status: string;
  contact_name: string | null;
  contact_email: string | null;
  focus_areas: string[] | null;
  mou_signed_at: string | null;
  country: string | null;
  created_at: string;
};

export async function fetchPartners(limit = 100): Promise<{
  rows: PartnerRow[];
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

  try {
    const { data, error } = await supabase
      .from("partners")
      .select(
        "id, name, partner_type, status, contact_name, contact_email, focus_areas, mou_signed_at, country, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) return { rows: [], error: getAdminDataError(error) };
    return { rows: (data ?? []) as PartnerRow[], error: null };
  } catch (error) {
    return { rows: [], error: getAdminDataError(error) };
  }
}
