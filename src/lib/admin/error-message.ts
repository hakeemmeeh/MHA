const TEMPORARY_DATABASE_ERROR =
  "The database is temporarily unavailable. Please try again shortly. If this continues, ask the site administrator to check the Supabase project status.";

export function getAdminDataError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error ?? "");

  if (
    /<!doctype|<html|<head|<body|cloudflare|web server is down|error code 52[0-4]|fetch failed|failed to fetch|networkerror/i.test(
      message,
    )
  ) {
    return TEMPORARY_DATABASE_ERROR;
  }

  return message || "Unable to load data. Please try again.";
}
