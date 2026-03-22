"use client"

import Sidebar from "@/components/layout/Sidebar";
import "./globals.css";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/ui/MobileNav";
import { useState } from "react";

export default function RootLayout({ children }: any) {
  const [isOpen , setIsOpen] = useState(false);
  return (
    <html>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex h-screen bg-[#F5F5F5] gap-2 p-4">
        <Sidebar />

        {isOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header onToggleSidebar = {() => setIsOpen(true)} />

          <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
        </div>

        <MobileNav />
      </body>
    </html>
  );
}
