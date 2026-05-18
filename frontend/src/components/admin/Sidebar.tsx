import Link from "next/link";
import {
  Handshake,
  Heart,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import { mhaLogoOnDarkClass } from "@/lib/brand";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/donors", label: "Donors", icon: Heart },
  { href: "/admin/partners", label: "Partners", icon: Handshake },
  { href: "/admin/volunteers", label: "Volunteers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-full w-64 flex-col bg-navy-dark px-4 py-8 text-white md:flex">
      <Link href="/" className="mb-10 block w-fit">
        <Image
          src="/images/mha-logo.png"
          alt="MHA"
          width={535}
          height={378}
          quality={85}
          sizes="240px"
          className={cn("h-12 w-auto", mhaLogoOnDarkClass)}
        />
      </Link>
      <nav className="flex flex-1 flex-col gap-1">
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-inter text-sm text-white/60 transition hover:bg-navy hover:text-white"
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {l.label}
            </Link>
          );
        })}
      </nav>
      <p className="border-t border-white/10 pt-4 font-inter text-xs text-white/40">
        CRM preview — connect Supabase for live data.
      </p>
    </aside>
  );
}
