/** Real client websites hosted/designed via HostIT — synced from HostIT/src/components/PortfolioGrid.tsx */

export interface HostedSite {
  slug: string;
  name: string;
  industry: string;
  url: string;
  description: string;
  thumbnail: string;
  hostitAsset: string;
  year: string;
  featured?: boolean;
  yearlyPrice: number;
  monthlyPrice: number;
  features: string[];
  stripePaymentLink: string;
}

export const hostedSites: HostedSite[] = [
  {
    slug: "rsg-mechanics",
    name: "RSG Mechanics",
    industry: "Automotive",
    url: "https://rsgmechanics.com",
    description:
      "Professional mobile auto repair service website with service scheduling and location-based services.",
    thumbnail: "/projects/hosted/rsg-mechanics.png",
    hostitAsset: "rsg-mechanics-screenshot.png",
    year: "2025",
    featured: true,
    yearlyPrice: 120,
    monthlyPrice: 10,
    features: [
      "Premium Hosting Included",
      "SSL Certificate",
      "Daily Backups",
      "24/7 Support",
      "CDN Performance",
    ],
    stripePaymentLink: "https://buy.stripe.com/cNi00jc1Cc913Ws6QCdIA03",
  },
  {
    slug: "tg-telecomm",
    name: "TG Telecomm",
    industry: "Telecommunications",
    url: "https://tgtelecomm.com/",
    description:
      "Professional telecommunications website with business connectivity services and fast support.",
    thumbnail: "/projects/hosted/tg-telecomm.png",
    hostitAsset: "c340eeba-5ce9-4d41-a0b5-520415d2c714.png",
    year: "2025",
    featured: true,
    yearlyPrice: 120,
    monthlyPrice: 10,
    features: [
      "99.9% Uptime Guarantee",
      "Advanced Security",
      "Email Hosting",
      "Domain Management",
      "Performance Monitoring",
    ],
    stripePaymentLink: "https://buy.stripe.com/7sY28r5De4Gzdx27UGdIA05",
  },
  {
    slug: "sololaunch",
    name: "SoloLaunch",
    industry: "Technology",
    url: "https://sololaunch.app",
    description:
      "AI-powered startup builder with complete business foundation tools and branding.",
    thumbnail: "/projects/hosted/sololaunch.png",
    hostitAsset: "963bc961-02a9-421f-824b-2d95a0546f0b.png",
    year: "2025",
    featured: true,
    yearlyPrice: 240,
    monthlyPrice: 20,
    features: [
      "Cloud Hosting",
      "Auto-scaling",
      "Git Integration",
      "Staging Environment",
      "API Management",
    ],
    stripePaymentLink: "https://buy.stripe.com/5kQeVd6Hia0T3Ws7UGdIA04",
  },
  {
    slug: "paladin-mma",
    name: "Paladin MMA",
    industry: "MMA Academy",
    url: "https://paladinmma.com",
    description:
      "MMA Academy in Miami/Hialeah offering specialized programs for all ages and fitness levels.",
    thumbnail: "/projects/hosted/paladin-mma.png",
    hostitAsset: "paladin-mma-screenshot.png",
    year: "2024",
    yearlyPrice: 120,
    monthlyPrice: 10,
    features: [
      "Lightning-fast Loading",
      "Mobile Optimized",
      "SEO Optimized",
      "Analytics Dashboard",
      "Regular Updates",
    ],
    stripePaymentLink: "https://buy.stripe.com/4gMaEX8Pqfld78E7UGdIA06",
  },
  {
    slug: "black-car-service-miami",
    name: "Black Car Service Miami",
    industry: "Transportation",
    url: "https://bayharborblackcarservice.com",
    description:
      "Premium black car service for airport transfers, executive transport, and special occasions in Miami.",
    thumbnail: "/projects/hosted/black-car-service-miami.png",
    hostitAsset: "black-car-service-miami-screenshot.png",
    year: "2024",
    yearlyPrice: 145,
    monthlyPrice: 12.08,
    features: [
      "Premium Hosting Included",
      "SSL Certificate",
      "Daily Backups",
      "24/7 Support",
      "CDN Performance",
    ],
    stripePaymentLink: "https://buy.stripe.com/00waEX9Tu5KD1Ok4IudIA07",
  },
  {
    slug: "nu-al-andalusia",
    name: "Nu Al Andalusia",
    industry: "Government Services",
    url: "https://nualandalusia.com/",
    description:
      "Innovative government services provider with comprehensive solutions and consulting.",
    thumbnail: "/projects/hosted/nu-al-andalusia.png",
    hostitAsset: "nu-al-andalusia-screenshot.png",
    year: "2024",
    yearlyPrice: 275,
    monthlyPrice: 22.92,
    features: [
      "Domain Management",
      "Web Creation & Design",
      "Premium Hosting",
      "SSL Certificate",
      "Daily Backups",
      "24/7 Support",
      "CDN Performance",
    ],
    stripePaymentLink: "https://buy.stripe.com/6oU4gzghS3Cv50wej4dIA08",
  },
  {
    slug: "hialeah-radio-club",
    name: "Hialeah Radio Club",
    industry: "Amateur Radio",
    url: "https://hialeahradioclub.com",
    description:
      "Community hub for the Hialeah Radio Club with events, licensing resources, and member information for amateur radio operators in the Miami area.",
    thumbnail: "/projects/hosted/hialeah-radio-club.png",
    hostitAsset: "hialeahradioclubwebshot.png",
    year: "2025",
    yearlyPrice: 145,
    monthlyPrice: 12.08,
    features: [
      "Premium Hosting Included",
      "SSL Certificate",
      "Daily Backups",
      "24/7 Support",
      "CDN Performance",
    ],
    stripePaymentLink: "https://buy.stripe.com/9B66oHc1Cc91eB64IudIA09",
  },
];

export function getHostedSiteBySlug(slug: string): HostedSite | undefined {
  return hostedSites.find((s) => s.slug === slug);
}
