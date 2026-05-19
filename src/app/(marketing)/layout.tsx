import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen min-w-0 flex-col">
      <Navbar />
      <main className="relative isolate flex min-h-0 min-w-0 flex-1 flex-col overflow-x-hidden shadow-[inset_0_0_140px_rgba(13,26,46,0.09)] motion-reduce:shadow-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
