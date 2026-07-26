import { Heart } from "lucide-react";

const FOOTER_LINKS = {
  Quick: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  Services: [
    { label: "AI Solutions", href: "#services" },
    { label: "AI Automation", href: "#services" },
    { label: "Web Development", href: "#services" },
    { label: "Digital Marketing", href: "#services" },
  ],
  Social: [
    { label: "GitHub", href: "https://github.com/zeeshanarif" },
    { label: "LinkedIn", href: "https://linkedin.com/in/zeeshanarif" },
    { label: "WhatsApp", href: "https://wa.me/923463322480" },
    { label: "Email", href: "mailto:arifzeshan23@gmail.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <a href="#hero" className="text-2xl font-bold gradient-text block mb-4">
              ZA.
            </a>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Generative AI Engineer & Full Stack Developer building intelligent solutions
              for the modern web.
            </p>
            <p className="text-sm text-muted">
              <span className="text-foreground">Email:</span>{" "}
              <a href="mailto:arifzeshan23@gmail.com" className="hover:text-primary transition-colors">
                arifzeshan23@gmail.com
              </a>
            </p>
            <p className="text-sm text-muted">
              <span className="text-foreground">Phone:</span>{" "}
              <a href="https://wa.me/923463322480" className="hover:text-primary transition-colors">
                +92 346 3322480
              </a>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.Quick.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.Services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.Social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Zeeshan Arif. All rights reserved.
          </p>
          <p className="text-sm text-muted flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> using Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
