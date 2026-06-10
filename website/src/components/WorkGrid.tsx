"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { Reveal, RevealItem } from "@/components/Reveal";

const filters = ["All", "Websites", "Apps", "Software"] as const;
type Filter = (typeof filters)[number];

export function WorkGrid() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    return projects.filter((p) => p.category === active);
  }, [active]);

  return (
    <div>
      <div
        className="mb-10 flex flex-wrap gap-3"
        role="tablist"
        aria-label="Filter projects"
      >
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            role="tab"
            aria-selected={active === filter}
            data-cursor="link"
            onClick={() => setActive(filter)}
            className={`cut-corner px-4 py-2 text-xs tracking-[0.15em] uppercase transition ${
              active === filter
                ? "bg-accent text-bg font-semibold"
                : "border border-white/15 text-text/70 hover:border-accent/40"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <Reveal stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <RevealItem key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              data-cursor="link"
              className="group block"
            >
              <div className="cut-frame relative aspect-[4/3] overflow-hidden bg-surface">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 group-hover:shadow-[inset_0_0_60px_rgba(242,210,0,0.08)]" />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-white/10 pt-3">
                <h3 className="font-semibold tracking-tight group-hover:text-accent transition">
                  {project.title}
                </h3>
                <span className="text-xs text-text/50">{project.year}</span>
              </div>
              <p className="mt-1 text-sm text-text/50">{project.category}</p>
            </Link>
          </RevealItem>
        ))}
      </Reveal>
    </div>
  );
}
