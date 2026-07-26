"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Badge } from "@/components/ui/badge";

const EXPRIENCE = [
  {
    period: "2025 - Present",
    role: "Generative AI Engineer",
    company: "Freelance / Self-Employed",
    description: "Building AI agents, RAG systems, and automation solutions for diverse clients. Developing full-stack applications with modern tech stacks.",
  },
  {
    period: "2025 - Present",
    role: "AI Automation Developer",
    company: "Freelance",
    description: "Designing and implementing AI-powered automation workflows, integrating LLMs, and building intelligent data processing pipelines.",
  },
  {
    period: "2025 - Present",
    role: "Full Stack Developer",
    company: "Freelance",
    description: "Creating responsive web applications using Next.js, FastAPI, and MySQL. Delivering production-ready solutions with clean architecture.",
  },
  {
    period: "2025 - Present",
    role: "Digital Marketing Specialist",
    company: "Freelance",
    description: "Managing Meta Ads, Google Ads, and SEO campaigns. Driving measurable results through data-driven marketing strategies.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <Badge variant="primary" className="mb-4">Experience</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Hands-on experience delivering real-world AI and development solutions
          </p>
        </AnimatedSection>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-accent2 opacity-30" />

          <div className="space-y-12">
            {EXPRIENCE.map((item, i) => (
              <motion.div
                key={item.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-1 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  />
                </div>

                <div className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300">
                  <span className="text-xs font-mono text-primary mb-1 block">
                    {item.period}
                  </span>
                  <h3 className="text-lg font-semibold mb-1">{item.role}</h3>
                  <p className="text-sm text-accent mb-3">{item.company}</p>
                  <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
