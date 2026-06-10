import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MainShell } from "@/components/MainShell";
import { SiteProviders } from "@/components/providers/SiteProviders";
import { siteConfig } from "@/data/site";
import {
  defaultDescription,
  defaultTitle,
  jsonLdOrganization,
  jsonLdWebSite,
  openGraphDefaults,
  seoKeywords,
  siteUrl,
} from "@/data/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: defaultDescription,
  keywords: seoKeywords,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
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
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    ...openGraphDefaults,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-bg text-text">
        <JsonLd data={[jsonLdOrganization, jsonLdWebSite]} />
        <SiteProviders>
          <Header />
          <MainShell>{children}</MainShell>
        </SiteProviders>
      </body>
    </html>
  );
}
