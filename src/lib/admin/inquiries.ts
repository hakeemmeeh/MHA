import { getSupabaseService } from "@/lib/supabase";
import { getAdminDataError } from "@/lib/admin/error-message";

export type InquiryRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  inquiry_type: string;
  message: string;
  status: string;
  created_at: string;
};

export async function fetchInquiries(limit = 100): Promise<{
  rows: InquiryRow[];
  error: string | null;
}> {
  const supabase = getSupabaseService();
  if (!supabase) {
    return {
      rows: [],
      error: "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  try {
    const { data, error } = await supabase
      .from("inquiries")
      .select("id, name, email, phone, inquiry_type, message, status, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) return { rows: [], error: getAdminDataError(error) };
    return { rows: (data ?? []) as InquiryRow[], error: null };
  } catch (error) {
    return { rows: [], error: getAdminDataError(error) };
  }
}
