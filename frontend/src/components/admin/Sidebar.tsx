"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  Award,
  Briefcase,
  MessageSquare,
  MessageCircle,
  Settings,
  X,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/dashboard/projects", icon: FolderKanban },
  { label: "Skills", href: "/admin/dashboard/skills", icon: Code2 },
  { label: "Certificates", href: "/admin/dashboard/certificates", icon: Award },
  { label: "Services", href: "/admin/dashboard/services", icon: Briefcase },
  { label: "Testimonials", href: "/admin/dashboard/testimonials", icon: Star },
  { label: "Messages", href: "/admin/dashboard/messages", icon: MessageCircle },
  { label: "Settings", href: "/admin/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-50 h-screen w-64 glass border-r border-white/5 flex flex-col transition-transform duration-300",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <Link href="/admin/dashboard" className="text-xl font-bold gradient-text">
            ZA Admin
          </Link>
          <button onClick={onClose} className="lg:hidden p-1 rounded-full hover:bg-white/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onClose()}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200",
                  active
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted hover:text-foreground hover:bg-white/5"
                )}
              >
                <item.icon className="w-4 h-4 flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-muted hover:text-primary transition-colors"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </aside>
    </>
  );
}
