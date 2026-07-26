"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Code2, Users, Award, TrendingUp, Star } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Badge } from "@/components/ui/badge";

function Counter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center">
      <motion.div
        className="text-4xl sm:text-5xl font-bold gradient-text mb-1"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.span>
        {suffix}
      </motion.div>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}

const ACHIEVEMENTS = [
  { value: 8, suffix: "+", label: "Projects Completed", icon: Briefcase },
  { value: 16, suffix: "+", label: "Technologies Used", icon: Code2 },
  { value: 10, suffix: "+", label: "Happy Clients", icon: Users },
  { value: 95, suffix: "%", label: "Client Satisfaction", icon: Star },
];

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <Badge variant="primary" className="mb-4">Achievements</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Impact by the <span className="gradient-text">Numbers</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Quantifiable results from real-world project delivery
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {ACHIEVEMENTS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <Counter value={item.value} suffix={item.suffix} label={item.label} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
