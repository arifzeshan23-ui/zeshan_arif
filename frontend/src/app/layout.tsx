import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const interSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zeeshan Arif | Generative AI Engineer & Full Stack Developer",
  description:
    "Portfolio of Zeeshan Arif — Generative AI Engineer, AI Automation Developer, Full Stack Developer, and Digital Marketing Specialist. Building cutting-edge AI solutions and exceptional digital experiences.",
  keywords: [
    "Zeeshan Arif",
    "Generative AI Engineer",
    "AI Automation",
    "Full Stack Developer",
    "Digital Marketing",
    "LangChain",
    "FastAPI",
    "Next.js",
    "AI Developer Pakistan",
  ],
  authors: [{ name: "Zeeshan Arif", url: "https://zeeshanarif.com" }],
  openGraph: {
    title: "Zeeshan Arif | Generative AI Engineer & Full Stack Developer",
    description:
      "Building cutting-edge AI solutions, automating workflows, and crafting exceptional digital experiences.",
    type: "website",
    locale: "en_US",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="canonical" href="https://zeeshanarif.com" />
      </head>
      <body className="min-h-full bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
