import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "NexusFlow - AI-Driven Data Automation Platform",
  description:
    "Automate your data pipelines with intelligent AI agents. Real-time sync, smart transformations, and enterprise-grade reliability.",
  openGraph: {
    title: "NexusFlow - AI-Driven Data Automation Platform",
    description:
      "Automate your data pipelines with intelligent AI agents. Real-time sync, smart transformations, and enterprise-grade reliability.",
    type: "website",
    siteName: "NexusFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusFlow - AI-Driven Data Automation Platform",
    description:
      "Automate your data pipelines with intelligent AI agents. Real-time sync, smart transformations, and enterprise-grade reliability.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
