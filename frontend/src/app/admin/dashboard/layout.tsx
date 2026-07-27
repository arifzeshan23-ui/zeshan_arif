"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, removeToken } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/admin/login");
    } else {
      // Verify token is actually valid with the backend
      import("@/lib/api").then(({ default: api }) => {
        api.get("/auth/me").catch(() => {
          removeToken();
          router.replace("/admin/login");
        });
        setAuthed(true);
      });
    }
  }, [router]);

  if (!authed) return null;

  const handleLogout = () => {
    removeToken();
    router.push("/admin/login");
  };

  return (
    <div className="h-screen bg-[#0a0a0f] flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 glass border-b border-white/5 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-full hover:bg-white/5"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden lg:block" />

          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
