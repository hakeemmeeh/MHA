import { getSupabaseService } from "@/lib/supabase";

export type DonorRow = {
  id: string;
  name: string;
  email: string | null;
  organization: string | null;
  donor_type: string;
  status: string;
  total_given: number;
  currency: string;
  last_gift_at: string | null;
  country: string | null;
  created_at: string;
};

export async function fetchDonors(limit = 100): Promise<{
  rows: DonorRow[];
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
    .from("donors")
    .select(
      "id, name, email, organization, donor_type, status, total_given, currency, last_gift_at, country, created_at"
    )
    .order("total_given", { ascending: false })
    .limit(limit);

  if (error) {
    return { rows: [], error: error.message };
  }

  return { rows: (data ?? []) as DonorRow[], error: null };
}
