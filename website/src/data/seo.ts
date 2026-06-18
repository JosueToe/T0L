import { siteConfig } from "./site";

/** Canonical production URL — used for metadataBase, sitemap, and JSON-LD */
export const siteUrl = "https://www.t0ltech.com";

export const seoKeywords = [
  // IT support — Miami & South Florida
  "IT support Miami",
  "IT services Miami",
  "IT company Miami",
  "managed IT Miami",
  "IT support South Florida",
  "on-site IT support Miami",
  "computer repair Miami",
  "network support Miami-Dade",
  "help desk Miami",
  "IT support Hialeah",
  "IT support Coral Gables",
  "IT support Fort Lauderdale",
  "IT support Broward County",
  "IT support Palm Beach County",
  "IT support Florida",
  // IT support — United States
  "IT support United States",
  "remote IT support USA",
  "managed IT services USA",
  // Web development — local
  "web development Miami",
  "web design Miami",
  "website development South Florida",
  "web design South Florida",
  "custom website Miami",
  "web development Hialeah",
  "web design Fort Lauderdale",
  "web hosting Miami",
  "website design Broward",
  // Web development — national
  "web development United States",
  "custom web design USA",
  "business website development USA",
  // Software development — local
  "software development Miami",
  "custom software development South Florida",
  "mobile app development Miami",
  "app development South Florida",
  "software company Miami",
  "custom software Florida",
  // Software development — national
  "software development United States",
  "custom software development USA",
  "mobile app development USA",
  "enterprise software development USA",
  // Brand
  siteConfig.name,
  "T0L tech",
  "T0L LLC Miami",
];

export const defaultTitle = "TOL Tech";

export const defaultDescription =
  "T0L LLC provides IT support, web development, and custom software development in Miami, South Florida, and across the United States. On-site IT from $100/hr in Miami-Dade, Broward, and Palm Beach. Web design and hosting from $120/year. Custom software and mobile apps nationwide.";

export const openGraphDefaults = {
  title: "T0L LLC | IT Support, Web & Software Development | Miami, South Florida & USA",
  description: defaultDescription,
  siteName: siteConfig.name,
  locale: "en_US",
  type: "website" as const,
};

export const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteUrl}/#organization`,
  name: siteConfig.name,
  url: siteUrl,
  email: siteConfig.email,
  telephone: "+1-786-333-5331",
  description: defaultDescription,
  areaServed: [
    { "@type": "City", name: "Miami", containedInPlace: { "@type": "State", name: "Florida" } },
    { "@type": "AdministrativeArea", name: "Miami-Dade County" },
    { "@type": "AdministrativeArea", name: "Broward County" },
    { "@type": "AdministrativeArea", name: "Palm Beach County" },
    { "@type": "State", name: "Florida" },
    { "@type": "Country", name: "United States" },
  ],
  serviceType: [
    "IT Support",
    "Managed IT Services",
    "Web Design",
    "Web Development",
    "Custom Software Development",
    "Mobile App Development",
  ],
  knowsAbout: [
    "IT support",
    "network security",
    "web development",
    "software development",
    "mobile applications",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: siteConfig.email,
    telephone: "+1-786-333-5331",
    areaServed: ["US", "FL"],
    availableLanguage: "English",
  },
};

export const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteConfig.name,
  url: siteUrl,
  description: defaultDescription,
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en-US",
};
