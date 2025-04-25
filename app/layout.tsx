import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

const OG_IMAGE_PATH = "/images/og-image.png";
const OG_IMAGE_TWITTER_PATH = "/images/og-twitter.png";

export const metadata: Metadata = {
  title: "AdMuseAI - AI-Powered Ad Creative Generator",
  description:
    "Generate professional-quality ad creatives instantly with AI. Upload your product, add a prompt, and get stunning ad visuals. No design skills needed, no login required. Just $2.99 per creative.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/admuse.png",
  },
  keywords: [
    "AI ad generator",
    "ad creative generator",
    "AI marketing",
    "automated ad creation",
    "digital advertising",
    "AI advertising",
    "ad design tool",
    "marketing creative",
    "product advertising",
    "AI-powered ads",
  ],
  authors: [{ name: "AdMuseAI" }],
  creator: "AdMuseAI",
  publisher: "AdMuseAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://admuseai.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "AdMuseAI - Generate Professional Ad Creatives Instantly with AI",
    description:
      "Transform your product images into stunning ad creatives with AI. Professional results in seconds, no design skills needed. Just $2.99 per creative.",
    url: "https://admuseai.com",
    siteName: "AdMuseAI",
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: "AdMuseAI - AI-Powered Ad Creative Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Generate Professional Ad Creatives Instantly with AI | AdMuseAI",
    description:
      "Create stunning ad creatives for your products using AI. Upload images, add a prompt, and get professional results in seconds. No design skills needed.",
    images: [OG_IMAGE_TWITTER_PATH],
    creator: "@admuseai",
    site: "@admuseai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://admuseai.com",
  },
  // verification: {
  //   google: "your-google-site-verification",
  //   // Add other verification tokens as needed:
  //   // bing: "your-bing-verification",
  //   // yandex: "your-yandex-verification",
  // },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#4f46e5" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
