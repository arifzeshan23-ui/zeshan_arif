"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MessageSquare, MessageCircle, Globe, GitBranch, Phone, Check } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import MagneticButton from "@/components/shared/MagneticButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";

const CONTACT_LINKS = [
  { label: "Email", href: "mailto:arifzeshan23@gmail.com", icon: MessageSquare, value: "arifzeshan23@gmail.com" },
  { label: "WhatsApp", href: "https://wa.me/923463322480", icon: MessageCircle, value: "+92 346 3322480" },
  { label: "LinkedIn", href: "https://linkedin.com/in/zeeshanarif", icon: Globe, value: "Zeeshan Arif" },
  { label: "GitHub", href: "https://github.com/zeeshanarif", icon: GitBranch, value: "zeeshanarif" },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/contact", formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      alert("Failed to send message. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <Badge variant="primary" className="mb-4">Get In Touch</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Let&apos;s <span className="gradient-text">Work Together</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Have a project in mind? Let&apos;s discuss how I can help bring your ideas to life
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection direction="left">
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Name</label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Subject</label>
                <Input
                  placeholder="Project idea, collaboration, ..."
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Message</label>
                <Textarea
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
              </div>
              <MagneticButton>
                <Button type="submit" size="lg" className="w-full" disabled={sending}>
                  {submitted ? (
                    <><Check className="w-4 h-4 mr-2" /> Message Sent!</>
                  ) : sending ? (
                    <><Send className="w-4 h-4 mr-2" /> Sending...</>
                  ) : (
                    <><Send className="w-4 h-4 mr-2" /> Send Message</>
                  )}
                </Button>
              </MagneticButton>
            </form>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection direction="right" className="space-y-4">
            {CONTACT_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 glass rounded-2xl p-5 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <link.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted">{link.label}</p>
                  <p className="font-medium">{link.value}</p>
                </div>
                <Phone className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
              </motion.a>
            ))}

            <div className="glass rounded-2xl p-6 mt-4">
              <p className="text-sm text-muted mb-1">Availability</p>
              <p className="font-medium">Mon - Sat, 9:00 AM - 6:00 PM</p>
              <p className="text-sm text-muted mt-1">Response time: within 24 hours</p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
