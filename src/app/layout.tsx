import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NexusFlow — AI-Driven Data Automation Platform",
  description:
    "Automate your data pipelines with intelligent AI agents. Real-time sync, smart transformations, and enterprise-grade reliability.",
  openGraph: {
    title: "NexusFlow — AI-Driven Data Automation Platform",
    description:
      "Automate your data pipelines with intelligent AI agents. Real-time sync, smart transformations, and enterprise-grade reliability.",
    type: "website",
    siteName: "NexusFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexusFlow — AI-Driven Data Automation Platform",
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
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
