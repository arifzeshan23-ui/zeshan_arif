"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/api";

interface TestimonialItem {
  id: number;
  client_name: string;
  client_role?: string;
  client_company?: string;
  client_image?: string;
  content: string;
  rating: number;
  order: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    api.get("/testimonials?limit=100")
      .then((res) => setTestimonials(res.data.data || []))
      .catch(() => {});
  }, []);

  const next = useCallback(() => {
    if (testimonials.length === 0) return;
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    if (testimonials.length === 0) return;
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, testimonials.length]);

  if (testimonials.length === 0) return null;

  const t = testimonials[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <Badge variant="primary" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Feedback from clients I&apos;ve worked with on various projects
          </p>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto relative">
          <div className="glass rounded-2xl p-8 sm:p-12 min-h-[280px] relative overflow-hidden">
            <Quote className="absolute top-4 left-4 w-12 h-12 text-primary/10" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-center"
              >
                <p className="text-base sm:text-lg text-muted leading-relaxed mb-6 italic">
                  &ldquo;{t.content}&rdquo;
                </p>

                <div className="flex justify-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-2 text-lg font-bold">
                  {t.client_name.charAt(0)}
                </div>
                <h4 className="font-semibold">{t.client_name}</h4>
                <p className="text-sm text-muted">
                  {t.client_role}{t.client_role && t.client_company ? ", " : ""}{t.client_company}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-primary w-6" : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
