"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLenis } from "@/components/providers/LenisContext";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { hostedSites } from "@/data/hostedSites";
import { services } from "@/data/services";
import { Button } from "@/components/Button";
import { HostedSiteModal } from "@/components/HostedSiteModal";
import { ProjectModal } from "@/components/ProjectModal";
import { Reveal, RevealItem } from "@/components/Reveal";

const contentTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

const SITES_PER_PAGE = 6;

export function WorkServicesExplorer() {
  const [activeId, setActiveId] = useState(services[0].id);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);
  const [webPage, setWebPage] = useState(0);
  const lenis = useLenis();

  const totalWebPages = Math.ceil(hostedSites.length / SITES_PER_PAGE);
  const pagedSites = hostedSites.slice(webPage * SITES_PER_PAGE, (webPage + 1) * SITES_PER_PAGE);

  const goToWebPage = (page: number) => {
    setWebPage(page);
    requestAnimationFrame(() => {
      if (lenis) lenis.scrollTo(0, { duration: 0.6 });
      else window.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  const handleTabChange = (id: string) => {
    setActiveId(id);
    setWebPage(0);
    requestAnimationFrame(() => {
      if (lenis) {
        lenis.scrollTo(0, { duration: 0.8 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };
  const [selectedSite, setSelectedSite] = useState<
    (typeof hostedSites)[number] | null
  >(null);

  const activeService = useMemo(
    () => services.find((s) => s.id === activeId) ?? services[0],
    [activeId]
  );

  const isWebDesign = activeService.id === "web-design";

  const relatedProjects = useMemo(() => {
    if (!activeService.projectCategories?.length || isWebDesign) return [];
    return projects.filter((p) =>
      activeService.projectCategories!.includes(p.category)
    );
  }, [activeService, isWebDesign]);

  const portfolioLabel = "Our portfolio";
  const hasPortfolio = isWebDesign || relatedProjects.length > 0;

  return (
    <>
      <Reveal>
        {/* Page intro — full width */}
        <div className="border-b border-white/10 pb-10">
          <p className="text-xs tracking-[0.2em] uppercase text-accent">
            Work & Services
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
            What we deliver and the work to prove it.
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            Select a service to see what we provide and browse projects from
            our portfolio.
          </p>

          {/* Service tabs — stack on very small screens, 3 columns from 480px+ */}
          <div
            className="mt-8 grid grid-cols-1 gap-2 min-[480px]:grid-cols-3 min-[480px]:gap-3"
            role="tablist"
            aria-label="Services"
          >
            {services.map((service) => (
              <button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={activeId === service.id}
                data-cursor="link"
                onClick={() => handleTabChange(service.id)}
                className={`cut-corner px-3 py-3 text-[11px] tracking-[0.08em] uppercase transition text-center min-[480px]:px-4 min-[480px]:text-xs min-[480px]:tracking-[0.1em] ${
                  activeId === service.id
                    ? "bg-accent font-semibold text-bg"
                    : "border border-white/15 text-text/70 hover:border-accent/40"
                }`}
              >
                <span className="min-[480px]:hidden">
                  {service.shortTitle ?? service.title}
                </span>
                <span className="hidden min-[480px]:inline">{service.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active service detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            {...contentTransition}
            className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-16"
          >
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-accent">
                Service
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                {activeService.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted md:text-xl">
                {activeService.summary}
              </p>
              <div className="mt-10">
                <Button href="/about#contact" variant="primary">
                  Get a Quote
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm tracking-[0.15em] uppercase text-text/50">
                Outcomes
              </p>
              <ul className="mt-5 space-y-4 pl-5 list-disc marker:text-accent">
                {activeService.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="text-base leading-relaxed text-text/85 md:text-lg"
                  >
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </Reveal>

      {/* Full-width portfolio — animates in/out so height change is never jarring */}
      <AnimatePresence mode="wait">
        {hasPortfolio && <motion.section
          key={`portfolio-${activeService.id}`}
          className="mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div>
            <p className="text-xs tracking-[0.15em] uppercase text-text/50">
              {portfolioLabel}
            </p>
            {isWebDesign && (
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
                Web design, hosting, and domain purchase start at{" "}
                <span className="font-semibold text-accent">$120/year</span>.
                Every site includes design, hosting, domain setup, SSL, backups,
                and support. Pricing below reflects each project&apos;s scope.
              </p>
            )}

            {isWebDesign ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`web-page-${webPage}`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Reveal stagger className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                      {pagedSites.map((site) => (
                        <RevealItem key={site.slug}>
                          <button
                            type="button"
                            data-cursor="link"
                            onClick={() => setSelectedSite(site)}
                            className="group w-full text-left"
                          >
                            <div className="cut-frame relative aspect-[4/3] overflow-hidden bg-surface">
                              <Image
                                src={site.thumbnail}
                                alt={site.name}
                                fill
                                className={
                                  site.slug === "hialeah-radio-club"
                                    ? "object-contain object-center transition duration-500 group-hover:scale-[1.04]"
                                    : "object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                                }
                                sizes="(max-width: 640px) 100vw, 33vw"
                              />
                              <div className="absolute top-3 right-3 bg-bg/90 px-2.5 py-1 text-xs font-semibold text-accent">
                                ${site.yearlyPrice}/yr
                              </div>
                            </div>
                            <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-white/10 pt-3">
                              <h3 className="font-semibold tracking-tight transition group-hover:text-accent">
                                {site.name}
                              </h3>
                              <span className="text-xs text-text/50">{site.year}</span>
                            </div>
                            <p className="mt-1 text-sm text-text/50">{site.industry}</p>
                          </button>
                        </RevealItem>
                      ))}
                    </Reveal>
                  </motion.div>
                </AnimatePresence>

                {/* Pagination controls */}
                {totalWebPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => goToWebPage(webPage - 1)}
                      disabled={webPage === 0}
                      data-cursor="link"
                      className="cut-corner flex h-10 w-10 items-center justify-center border border-white/15 text-text/60 transition hover:border-accent/50 hover:text-accent disabled:opacity-20 disabled:cursor-not-allowed"
                      aria-label="Previous page"
                    >
                      ←
                    </button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalWebPages }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => goToWebPage(i)}
                          data-cursor="link"
                          className={`flex h-8 w-8 items-center justify-center text-sm font-medium transition ${
                            i === webPage
                              ? "bg-accent text-bg"
                              : "border border-white/15 text-text/50 hover:border-accent/40 hover:text-accent"
                          }`}
                          aria-label={`Page ${i + 1}`}
                          aria-current={i === webPage ? "page" : undefined}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => goToWebPage(webPage + 1)}
                      disabled={webPage === totalWebPages - 1}
                      data-cursor="link"
                      className="cut-corner flex h-10 w-10 items-center justify-center border border-white/15 text-text/60 transition hover:border-accent/50 hover:text-accent disabled:opacity-20 disabled:cursor-not-allowed"
                      aria-label="Next page"
                    >
                      →
                    </button>
                  </div>
                )}
              </>
            ) : relatedProjects.length > 0 ? (
              <Reveal stagger className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((project) => (
                  <RevealItem key={project.slug}>
                    <button
                      type="button"
                      data-cursor="link"
                      onClick={() => setSelectedProject(project)}
                      className="group w-full text-left"
                    >
                      <div className="cut-frame relative aspect-[4/3] overflow-hidden bg-surface flex items-center justify-center">
                        <Image
                          src={project.thumbnail}
                          alt={project.title}
                          fill
                          className="object-contain p-6 transition duration-500 group-hover:scale-[1.04]"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      </div>
                      <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-white/10 pt-3">
                        <h3 className="font-semibold tracking-tight transition group-hover:text-accent">
                          {project.title}
                        </h3>
                        <span className="text-xs text-text/50">
                          {project.year}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-text/50">
                        {project.category}
                      </p>
                    </button>
                  </RevealItem>
                ))}
              </Reveal>
            ) : null}
          </motion.div>
        </motion.section>}
      </AnimatePresence>

      <HostedSiteModal
        site={selectedSite}
        onClose={() => setSelectedSite(null)}
      />
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
