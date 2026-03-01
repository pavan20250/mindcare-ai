import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NeuralCare AI - AI-Powered Behavioral Health Platform",
  description: "Transform behavioral health delivery with intelligent automation and Generative AI. From conversational intake to AI-generated clinical insights, we ensure personalized, efficient care for patients and clinicians.",
  keywords: "behavioral health, AI, mental health, healthcare, DSM-5, clinical insights, patient care, healthcare automation",
  authors: [{ name: "NeuralCare AI" }],
  robots: "index, follow",
  openGraph: {
    title: "NeuralCare AI - AI-Powered Behavioral Health Platform",
    description: "Transform behavioral health delivery with intelligent automation and Generative AI.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuralCare AI - AI-Powered Behavioral Health Platform",
    description: "Transform behavioral health delivery with intelligent automation and Generative AI.",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${plusJakarta.variable} antialiased text-slate-200 min-h-screen font-sans`}>
        {children}
      </body>
    </html>
  );
}
