"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/data/site";
import { usePathname } from "next/navigation";

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/work")
    return pathname === "/work" || pathname.startsWith("/work/");
  if (href === "/about")
    return pathname === "/about" || pathname.startsWith("/about");
  return pathname === href;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-bg/55 backdrop-blur-md transition-colors duration-300"
      >
        <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 lg:px-10">
          {/* Logo */}
          <Link
            href="/"
            data-cursor="link"
            className="relative z-[60] shrink-0"
          >
            <Image
              src="/brand/logo-wordmark.png"
              alt="T0L LLC"
              width={140}
              height={42}
              className="h-8 w-auto md:h-9"
              priority
            />
          </Link>

          {/* Center nav — desktop */}
          <nav
            className="header-pill-nav hidden items-center lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => {
              const active = isNavActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor="link"
                  className={`px-4 py-2 text-sm font-medium tracking-wide transition ${
                    active
                      ? "bg-accent text-bg"
                      : "text-text/75 hover:text-text"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA + mobile toggle */}
          <div className="relative z-[60] flex shrink-0 items-center gap-3">
            <Link
              href="/about#contact"
              data-cursor="link"
              className="header-cta-pill hidden border border-white/25 px-5 py-2.5 text-sm font-medium text-text transition hover:border-accent hover:text-accent sm:inline-flex"
            >
              Contact us
            </Link>

            <button
              type="button"
              data-cursor="link"
              onClick={() => setOpen((v) => !v)}
              className="border border-white/20 px-4 py-2 text-xs font-medium tracking-[0.15em] uppercase text-text/90 lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col bg-bg"
          >
            <motion.nav
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.4 }}
              className="flex flex-1 flex-col justify-center gap-6 px-10 pt-20"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    data-cursor="link"
                    className="text-4xl font-semibold tracking-tight text-text hover:text-accent md:text-6xl"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/about#contact"
                data-cursor="link"
                className="mt-8 inline-flex w-fit bg-accent px-6 py-3 text-sm font-semibold text-bg"
                onClick={() => setOpen(false)}
              >
                Contact us
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
