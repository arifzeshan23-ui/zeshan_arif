"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, Mail, ExternalLink } from "lucide-react";
import TypingText from "@/components/shared/TypingText";
import MagneticButton from "@/components/shared/MagneticButton";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1").replace("/api/v1", "");

const SOCIAL_LINKS = [
  { icon: "GH", label: "GitHub", href: "https://github.com/zeeshanarif" },
  { icon: "LI", label: "LinkedIn", href: "https://linkedin.com/in/zeeshanarif" },
  { icon: "WA", label: "WhatsApp", href: "https://wa.me/923463322480" },
  { icon: "EM", label: "Email", href: "mailto:arifzeshan23@gmail.com" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] } },
};

export default function Hero() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    api.get("/settings").then((res) => {
      if (res.data.data) setSettings(res.data.data);
    }).catch(() => {});
  }, []);

  const profileImage = settings.profile_image;
  const profileName = settings.profile_name || "Zeeshan Arif";
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center hero-gradient overflow-hidden pt-20"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-muted mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for projects
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
            >
              Hi, I&apos;m{" "}
              <span className="gradient-text">{profileName}</span>
            </motion.h1>

            <motion.div variants={itemVariants} className="text-xl sm:text-2xl text-muted mb-2 h-10">
              <TypingText
                words={[
                  "Generative AI Engineer",
                  "AI Automation Developer",
                  "Full Stack Developer",
                  "Digital Marketing Specialist",
                ]}
                speed={80}
                deleteSpeed={50}
                pauseDuration={2000}
                className="text-foreground font-medium"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-muted text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Building cutting-edge AI solutions, automating workflows, and crafting
              exceptional digital experiences. Let&apos;s bring your ideas to life.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <MagneticButton>
                <Button size="lg" className="font-medium" asChild>
                  <a href="#contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Hire Me
                  </a>
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button variant="outline" size="lg" asChild>
                  <a href="/cv/zeeshan-arif-cv.pdf" download>
                    <Download className="w-4 h-4 mr-2" />
                    Download CV
                  </a>
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button variant="ghost" size="lg" asChild>
                  <a href="#contact">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Contact
                  </a>
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={itemVariants}
              className="flex gap-4 mt-8 justify-center lg:justify-start"
            >
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass glass-hover flex items-center justify-center text-xs font-bold text-muted hover:text-primary transition-all duration-300"
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right: Profile Image */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center"
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full gradient-border overflow-hidden">
                {profileImage ? (
                  <img
                    src={`${API_BASE}${profileImage}`}
                    alt={profileName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-accent2/20 flex items-center justify-center">
                    <span className="text-6xl sm:text-7xl font-bold gradient-text">ZA</span>
                  </div>
                )}
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl glass flex items-center justify-center animate-float">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="absolute -bottom-2 -left-4 w-14 h-14 rounded-2xl glass flex items-center justify-center animate-float" style={{ animationDelay: "1s" }}>
                <span className="text-xl">⚡</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-muted" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
