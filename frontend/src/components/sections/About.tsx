"use client";

import { motion } from "framer-motion";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Badge } from "@/components/ui/badge";

const TIMELINE = [
  { year: "2024", title: "Started AI Journey", description: "Began exploring Generative AI, LLMs, and building intelligent agents." },
  { year: "2025", title: "Professional Projects", description: "Completed 7-8 real-world projects in AI, automation, and full-stack development." },
  { year: "Present", title: "Active Development", description: "Currently building AI solutions and digital platforms for clients worldwide." },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <Badge variant="primary" className="mb-4">About Me</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Passionate About{" "}
            <span className="gradient-text">AI & Innovation</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            I&apos;m a Generative AI Engineer and Full Stack Developer with expertise in building
            intelligent systems that solve real-world problems. My work spans AI agents,
            automation, RAG systems, and modern web applications.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <AnimatedSection direction="left" className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6">Career Overview</h3>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                With 5+ months of professional experience, I&apos;ve completed 7-8 real-world
                projects spanning Generative AI, AI Automation, Full Stack Development, and
                Digital Marketing.
              </p>
              <p>
                I specialize in LangChain, RAG systems, prompt engineering, and LLM integration,
                building powerful AI solutions that drive results. On the development side, I
                work with Python, FastAPI, Next.js, and MySQL to create robust applications.
              </p>
              <p>
                I&apos;m also experienced in digital marketing including SEO, Meta Ads, and
                Google Ads — giving me a unique blend of technical and marketing skills.
              </p>
            </div>
          </AnimatedSection>

          {/* Timeline */}
          <AnimatedSection direction="right">
            <div className="relative pl-8 border-l border-white/10 space-y-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="absolute -left-[33px] w-6 h-6 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-xs font-mono text-primary mb-1 block">{item.year}</span>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
