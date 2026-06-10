import Link from "next/link";
import { navLinks, siteConfig } from "@/data/site";
import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <BrandLogo size="footer" className="mb-6" />
            <p className="max-w-md text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-[0.2em] uppercase text-text/50">
              Navigate
            </p>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-cursor="link"
                    className="text-sm text-text/80 hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-[0.2em] uppercase text-text/50">
              Contact
            </p>
            <p className="text-sm text-text/80">
              <a
                href={`mailto:${siteConfig.email}`}
                data-cursor="link"
                className="hover:text-accent"
              >
                {siteConfig.email}
              </a>
            </p>
            <p className="mt-2 text-sm text-text/80">{siteConfig.phone}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-8 text-xs text-text/40 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          <span>IT Services · Web · Software · Apps</span>
        </div>
      </div>
    </footer>
  );
}
