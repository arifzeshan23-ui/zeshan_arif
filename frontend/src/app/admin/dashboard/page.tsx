"use client";

import { useEffect, useState } from "react";
import { FolderKanban, Code2, Award, MessageCircle } from "lucide-react";
import api from "@/lib/api";
import { motion } from "framer-motion";

const STATS = [
  { label: "Projects", key: "projects", icon: FolderKanban },
  { label: "Skills", key: "skills", icon: Code2 },
  { label: "Certificates", key: "certificates", icon: Award },
  { label: "Messages", key: "messages", icon: MessageCircle },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function load() {
      try {
        const [proj, skills, certs, msgs] = await Promise.all([
          api.get("/projects?limit=1"),
          api.get("/skills?limit=1"),
          api.get("/certificates?limit=1"),
          api.get("/contact/messages?limit=1"),
        ]);
        setCounts({
          projects: proj.data.total || 0,
          skills: skills.data.total || 0,
          certificates: certs.data.total || 0,
          messages: msgs.data.total || 0,
        });
      } catch {
        setCounts({ projects: 0, skills: 0, certificates: 0, messages: 0 });
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted text-sm">Overview of your portfolio content</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-6"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold gradient-text">
              {counts[stat.key] ?? "—"}
            </p>
            <p className="text-sm text-muted mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-muted">
          Use the sidebar to manage your content: projects, skills, certificates,
          services, testimonials, and messages.
        </p>
        <p className="text-sm text-muted mt-2">
          Everything you update here will reflect on your live portfolio.
        </p>
      </div>
    </div>
  );
}
