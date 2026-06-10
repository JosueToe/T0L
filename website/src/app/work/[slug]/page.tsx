import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  projects,
  getProjectBySlug,
  getAdjacentProject,
} from "@/data/projects";
import { Reveal } from "@/components/Reveal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.overview.problem,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getAdjacentProject(slug);

  return (
    <article>
      <section className="relative aspect-[16/9] w-full bg-surface md:aspect-[21/9]">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
        <div className="absolute right-0 bottom-0 left-0 mx-auto max-w-7xl px-6 pb-12 lg:px-10">
          <p className="text-xs tracking-[0.2em] uppercase text-accent">
            {project.category}
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-2 text-text/60">{project.year}</p>
          {project.siteUrl && (
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="mt-4 inline-flex text-sm tracking-wide text-accent hover:underline"
            >
              Visit live site →
            </a>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-sm tracking-[0.15em] uppercase text-text/50">
                Problem
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                {project.overview.problem}
              </p>
            </div>
            <div>
              <h2 className="text-sm tracking-[0.15em] uppercase text-text/50">
                Solution
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                {project.overview.solution}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight">Gallery</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {project.gallery.map((src) => (
              <div
                key={src}
                className="cut-frame relative aspect-[4/3] overflow-hidden bg-surface"
              >
                <Image
                  src={src}
                  alt={`${project.title} gallery`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-20 border-t border-white/10 pt-16">
          <h2 className="text-2xl font-semibold tracking-tight">Results</h2>
          <ul className="mt-6 list-disc space-y-4 pl-5 marker:text-accent">
            {project.results.map((result) => (
              <li key={result} className="leading-relaxed text-muted">
                {result}
              </li>
            ))}
          </ul>
        </Reveal>

        {next && (
          <Reveal className="mt-20 border-t border-white/10 pt-12">
            <p className="text-xs tracking-[0.2em] uppercase text-text/50">
              Next project
            </p>
            <Link
              href={`/work/${next.slug}`}
              data-cursor="link"
              className="group mt-4 inline-block"
            >
              <span className="text-2xl font-semibold tracking-tight group-hover:text-accent transition md:text-3xl">
                {next.title}
              </span>
              <span className="ml-4 text-sm text-text/50">
                {next.year} · {next.category}
              </span>
            </Link>
          </Reveal>
        )}
      </div>
    </article>
  );
}
