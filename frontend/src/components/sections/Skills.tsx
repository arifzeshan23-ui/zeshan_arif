"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

interface SkillItem {
  id: number;
  name: string;
  icon?: string;
  category?: string;
  proficiency: number;
  order: number;
}

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI & ML" },
  { id: "development", label: "Development" },
  { id: "marketing", label: "Marketing" },
];

export default function Skills() {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    api.get("/skills?limit=100")
      .then((res) => setSkills(res.data.data || []))
      .catch(() => {});
  }, []);

  const filtered = activeCategory === "all"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <Badge variant="primary" className="mb-4">Skills & Expertise</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Technologies I{" "}
            <span className="gradient-text">Work With</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            A comprehensive toolkit spanning AI, development, and digital marketing
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-5 py-2 rounded-full text-sm transition-all duration-300",
                activeCategory === cat.id
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "glass text-muted hover:text-foreground hover:bg-white/10"
              )}
            >
              {cat.label}
            </button>
          ))}
        </AnimatedSection>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 group hover:border-primary/30 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{skill.icon || "⚡"}</div>
              <h3 className="font-medium text-sm mb-1">{skill.name}</h3>
              <p className="text-xs text-muted mb-3 capitalize">{skill.category}</p>
              <div className="relative h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                  viewport={{ once: true }}
                />
              </div>
              <span className="text-xs text-muted mt-1 block text-right font-mono">
                {skill.proficiency}%
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
