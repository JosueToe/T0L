"use client";

import Image from "next/image";
import { clientLogos } from "@/data/clients";
import { Reveal, RevealItem } from "@/components/Reveal";

interface PartnerGridProps {
  compact?: boolean;
}

export function PartnerGrid({ compact = false }: PartnerGridProps) {
  return (
    <Reveal
      stagger
      className={`grid gap-4 ${
        compact
          ? "grid-cols-2 sm:grid-cols-3"
          : "grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-4"
      }`}
    >
      {clientLogos.map((client) => (
        <RevealItem
          key={client.src}
          className={`flex items-center justify-center border border-white/5 bg-surface/60 transition hover:border-accent/20 hover:shadow-[0_0_30px_rgba(242,210,0,0.06)] ${
            compact ? "h-24 p-5" : "h-32 rounded-sm p-6"
          }`}
        >
          <Image
            src={client.src}
            alt={client.alt}
            width={160}
            height={80}
            className="max-h-full w-auto max-w-full object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
          />
        </RevealItem>
      ))}
    </Reveal>
  );
}
