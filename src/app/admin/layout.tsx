import Link from "next/link";
import { AdminSidebar } from "@/components/admin/Sidebar";
import { LogoutButton } from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy-50">
      <nav className="flex gap-1 overflow-x-auto border-b border-white/10 bg-navy-dark px-3 py-3 text-white md:hidden">
        {[
          ["/admin", "Home"],
          ["/admin/inquiries", "Inquiries"],
          ["/admin/donors", "Donors"],
          ["/admin/partners", "Partners"],
          ["/admin/volunteers", "Volunteers"],
          ["/admin/content/stories", "Stories"],
          ["/admin/content/news", "News"],
          ["/admin/content/blog", "Insights"],
          ["/admin/content/videos", "Videos"],
          ["/admin/settings", "Settings"],
        ].map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className="shrink-0 rounded-full bg-white/10 px-3 py-1.5 font-inter text-xs"
          >
            {label}
          </Link>
        ))}
      </nav>
      <AdminSidebar />
      <div className="md:ml-64">
        <header className="sticky top-0 z-20 border-b border-border bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="font-inter text-sm text-text-muted">Admin</p>
            <div className="flex items-center gap-5">
              <Link href="/" className="font-inter text-sm font-medium text-navy hover:underline">
                View site
              </Link>
              <LogoutButton />
            </div>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
