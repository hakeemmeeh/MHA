"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  async function logout() {
    await fetch("/api/admin-login", { method: "DELETE" });
    router.replace("/admin-login");
  }
  return (
    <button
      onClick={logout}
      className="flex items-center gap-1.5 font-inter text-sm font-medium text-text-muted transition hover:text-navy"
    >
      <LogOut className="h-4 w-4" aria-hidden />
      Sign out
    </button>
  );
}
