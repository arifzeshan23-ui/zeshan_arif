"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Brain, Zap, Code, Globe, BarChart3, Search, Megaphone } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";

interface ServiceItem {
  id: number;
  title: string;
  description?: string;
  icon?: string;
  features?: string[];
  order: number;
}

const ICON_MAP: Record<string, any> = {
  Brain, Zap, Code, Globe, BarChart3, Search, Megaphone,
};

const FALLBACK_ICON = Code;

export default function Services() {
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    api.get("/services?limit=100")
      .then((res) => setServices(res.data.data || []))
      .catch(() => {});
  }, []);

  return (
    <section id="services" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <Badge variant="primary" className="mb-4">Services</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What I <span className="gradient-text">Deliver</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            End-to-end solutions spanning AI, development, and digital marketing
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const IconComp = ICON_MAP[service.icon || ""] || FALLBACK_ICON;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <IconComp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {(service.features || []).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted">
                      <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
