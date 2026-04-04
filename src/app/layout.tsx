import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { AuthProvider } from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "KNR Tech — Premium Digital Agency",
  description:
    "KNR Tech builds high-performance websites and digital experiences that help brands grow globally. Web development, UI/UX design, SEO, AI automation and more.",
  keywords: "web development, UI UX design, SEO, digital agency, ecommerce, AI automation, brand identity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative text-white overflow-x-hidden bg-transparent">

        {/* ===== GLOBAL BACKGROUND SYSTEM ===== */}

        {/* Base Gradient */}
        <div className="fixed inset-0 -z-50 bg-gradient-to-b from-[#06140f] via-[#04110c] to-[#020805]" />

        {/* Animated Green Blobs */}
        <div className="fixed inset-0 -z-40 pointer-events-none overflow-hidden">
          <div className="absolute w-[1000px] h-[1000px] bg-primary opacity-15 blur-[300px] rounded-full top-[-400px] left-[-400px] animate-blob1" />
          <div className="absolute w-[800px] h-[800px] bg-primary opacity-10 blur-[300px] rounded-full bottom-[-400px] right-[-400px] animate-blob2" />
        </div>

        {/* Grid Overlay */}
        <div className="fixed inset-0 -z-30 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* ===== Client Layout Wrapper (Navbar, Cursor, Animations, Footer) ===== */}
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>

      </body>
    </html>
  );
}