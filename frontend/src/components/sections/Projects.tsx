"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, GitBranch } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import type { Project } from "@/types";

const CATEGORIES = [
  { id: "all", label: "All Projects" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web" },
  { id: "automation", label: "Automation" },
  { id: "marketing", label: "Marketing" },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    api.get("/projects?limit=100")
      .then((res) => setProjects(res.data.data || []))
      .catch(() => {});
  }, []);

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category?.slug === activeCategory);

  return (
    <section id="projects" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <Badge variant="primary" className="mb-4">Portfolio</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Real-world projects showcasing my expertise in AI, automation, and full-stack development
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

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="glass rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 via-accent/10 to-accent2/10 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                    {project.category?.slug === "ai" ? "🤖" : project.category?.slug === "web" ? "🌐" : "⚡"}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-sm font-medium">Click to view details</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px]">
                      {project.category?.name}
                    </Badge>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-2 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech_stack?.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-muted border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {(project.tech_stack?.length ?? 0) > 3 && (
                      <span className="text-[10px] text-muted">
                        +{project.tech_stack!.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedProject?.title}</DialogTitle>
              <DialogDescription>
                {selectedProject?.category?.name && (
                  <Badge variant="primary" className="mt-1">
                    {selectedProject.category.name}
                  </Badge>
                )}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <p className="text-muted leading-relaxed">{selectedProject?.description}</p>

              <div>
                <h4 className="text-sm font-semibold mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject?.tech_stack?.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                {selectedProject?.github_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer">
                      <GitBranch className="w-4 h-4 mr-2" />
                            GitHub
                    </a>
                  </Button>
                )}
                {selectedProject?.live_url && (
                  <Button size="sm" asChild>
                    <a href={selectedProject.live_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
