import { getSupabaseService } from "@/lib/supabase";

export type DashboardStats = {
  new_inquiries: number;
  total_inquiries: number;
  total_donors: number;
  active_donors: number;
  active_partners: number;
  total_volunteers: number;
  active_volunteers: number;
  total_raised: number;
};

const EMPTY: DashboardStats = {
  new_inquiries: 0,
  total_inquiries: 0,
  total_donors: 0,
  active_donors: 0,
  active_partners: 0,
  total_volunteers: 0,
  active_volunteers: 0,
  total_raised: 0,
};

export async function fetchDashboardStats(): Promise<{
  stats: DashboardStats;
  error: string | null;
}> {
  const supabase = getSupabaseService();
  if (!supabase) {
    return {
      stats: EMPTY,
      error:
        "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  const { data, error } = await supabase
    .from("dashboard_stats")
    .select("*")
    .single();

  if (error) {
    return { stats: EMPTY, error: error.message };
  }

  return { stats: (data ?? EMPTY) as DashboardStats, error: null };
}
