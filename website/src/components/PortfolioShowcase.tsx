"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { hostedSites } from "@/data/hostedSites";
import { HostedSiteModal } from "@/components/HostedSiteModal";
import { useState } from "react";

// Show all hosted sites + first 2 other projects
const showcaseItems = [
  ...hostedSites.map((s) => ({
    type: "hosted" as const,
    slug: s.slug,
    title: s.name,
    year: s.year,
    category: s.industry,
    thumbnail: s.thumbnail,
    site: s,
  })),
  ...projects
    .filter((p) => p.category !== "Websites")
    .slice(0, 2)
    .map((p) => ({
      type: "project" as const,
      slug: p.slug,
      title: p.title,
      year: p.year,
      category: p.category,
      thumbnail: p.thumbnail,
      site: null,
    })),
];

export function PortfolioShowcase() {
  const [selectedSite, setSelectedSite] = useState<
    (typeof hostedSites)[number] | null
  >(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {showcaseItems.map((item, i) => (
          <motion.div
            key={item.slug}
            className="group relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.1 }}
          >
            {item.type === "hosted" ? (
              <button
                type="button"
                data-cursor="link"
                className="block w-full text-left"
                onClick={() => item.site && setSelectedSite(item.site)}
              >
                <PortfolioCard item={item} />
              </button>
            ) : (
              <Link href={`/work/${item.slug}`} data-cursor="link" className="block">
                <PortfolioCard item={item} />
              </Link>
            )}
          </motion.div>
        ))}
      </div>

      <HostedSiteModal
        site={selectedSite}
        onClose={() => setSelectedSite(null)}
      />
    </>
  );
}

function PortfolioCard({
  item,
}: {
  item: (typeof showcaseItems)[number];
}) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-surface">
      <Image
        src={item.thumbnail}
        alt={item.title}
        fill
        className="object-cover object-top transition duration-700 group-hover:scale-[1.04]"
        sizes="(max-width: 640px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
        <div>
          <h3 className="text-lg font-semibold text-text transition group-hover:text-accent">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-text/50">{item.category}</p>
        </div>
        <span className="shrink-0 text-sm text-text/40">{item.year}</span>
      </div>
    </div>
  );
}
