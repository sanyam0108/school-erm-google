import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppTopbar } from "@/components/app-topbar";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "School ERP SaaS",
  description: "Modern cloud-based Student Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f0f0f0]`}
      >
        <TooltipProvider>
          {/* Top Navigation replacing Sidebar */}
          <AppTopbar />
          {/* Main workspace matching the style of old windows apps */}
          <main className="w-full h-[calc(100vh-32px)] overflow-hidden bg-[url('/bg-placeholder.png')] bg-cover bg-center">
             <div className="w-full h-full p-1 bg-white/90 backdrop-blur-sm overflow-auto border-t">
               {children}
             </div>
          </main>
        </TooltipProvider>
      </body>
    </html>
  );
}
