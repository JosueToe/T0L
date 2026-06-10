"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="cut-frame border border-accent/30 bg-surface/40 p-10">
        <p className="text-lg font-semibold text-accent">Message received.</p>
        <p className="mt-2 text-muted">
          Thank you. We will be in touch within 1 business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="text-xs tracking-[0.15em] uppercase text-text/50">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          autoComplete="name"
          className="mt-2 w-full border border-white/15 bg-bg px-4 py-3 text-text outline-none transition focus:border-accent/60"
        />
      </div>
      <div>
        <label htmlFor="email" className="text-xs tracking-[0.15em] uppercase text-text/50">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full border border-white/15 bg-bg px-4 py-3 text-text outline-none transition focus:border-accent/60"
        />
      </div>
      <div>
        <label htmlFor="company" className="text-xs tracking-[0.15em] uppercase text-text/50">
          Company
        </label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          className="mt-2 w-full border border-white/15 bg-bg px-4 py-3 text-text outline-none transition focus:border-accent/60"
        />
      </div>
      <div>
        <label htmlFor="message" className="text-xs tracking-[0.15em] uppercase text-text/50">
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-y border border-white/15 bg-bg px-4 py-3 text-text outline-none transition focus:border-accent/60"
        />
      </div>
      <button
        type="submit"
        data-cursor="link"
        className="cut-corner bg-accent px-8 py-3 text-sm font-semibold tracking-wide text-bg transition hover:brightness-110"
      >
        Send message
      </button>
    </form>
  );
}
