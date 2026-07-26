"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink, FileText } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import api from "@/lib/api";
import type { Certificate } from "@/types";

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selected, setSelected] = useState<Certificate | null>(null);

  useEffect(() => {
    api.get("/certificates?limit=100")
      .then((res) => setCertificates(res.data.data || []))
      .catch(() => {});
  }, []);

  return (
    <section id="certificates" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <Badge variant="primary" className="mb-4">Certifications</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            My <span className="gradient-text">Credentials</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Professional certifications demonstrating expertise across AI and development
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-6 text-center group cursor-pointer hover:border-primary/30 transition-all duration-300"
              onClick={() => setSelected(cert)}
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-sm mb-1 line-clamp-2">{cert.title}</h3>
              <p className="text-xs text-muted mb-1">{cert.issuer}</p>
              <p className="text-[10px] text-muted/60">{cert.issue_date}</p>
            </motion.div>
          ))}
        </div>

        <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selected?.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge>{selected?.issuer}</Badge>
                <span className="text-xs text-muted">{selected?.issue_date}</span>
              </div>
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-primary/10 via-accent/10 to-accent2/10 flex items-center justify-center">
                <FileText className="w-16 h-16 text-primary/40" />
              </div>
              {selected?.credential_url && (
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={selected.credential_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Verify Credential
                  </a>
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
