"use client";

import emailjs from "@emailjs/browser";
import { FormEvent, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import { emailJsConfig, isEmailJsConfigured } from "@/lib/emailjs";
import {
  checkContactSpam,
  isSilentSpamFailure,
  MAX_MESSAGE_LENGTH,
  MIN_FORM_SECONDS,
  recordContactSubmission,
} from "@/lib/contactFormSpam";

const inputClass =
  "mt-2 w-full border border-white/15 bg-bg/80 px-4 py-3.5 text-base text-text outline-none transition placeholder:text-text/30 focus:border-accent/70 focus:bg-bg focus:shadow-[0_0_0_1px_rgba(242,210,0,0.25)]";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const formReadyAt = useRef(Date.now());
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    formReadyAt.current = Date.now();
    const timer = window.setTimeout(
      () => setCanSubmit(true),
      MIN_FORM_SECONDS * 1000
    );
    return () => window.clearTimeout(timer);
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current || status === "sending") return;

    const formData = new FormData(formRef.current);
    const name = String(formData.get("from_name") ?? "").trim();
    const email = String(formData.get("from_email") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim() || "Not provided";
    const message = String(formData.get("message") ?? "").trim();
    const honeypot = String(formData.get("company_website") ?? "");

    const spam = checkContactSpam({
      honeypot,
      message,
      formReadyAt: formReadyAt.current,
    });

    if (!spam.ok) {
      if (isSilentSpamFailure(spam.reason)) {
        formRef.current.reset();
        setStatus("success");
        return;
      }

      setErrorMessage(
        spam.reason === "rate_limit"
          ? "Too many messages sent recently. Please try again later or email us directly."
          : "Please check your message and try again."
      );
      setStatus("error");
      return;
    }

    if (!isEmailJsConfigured()) {
      setErrorMessage(
        "Email is not configured yet. Add your EmailJS keys to .env.local or email us directly."
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      await emailjs.send(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        {
          from_name: name,
          from_email: email,
          company,
          message,
          reply_to: email,
          to_email: siteConfig.email,
          subject: `New contact form submission from ${name}`,
        },
        { publicKey: emailJsConfig.publicKey }
      );
      formRef.current.reset();
      recordContactSubmission();
      setStatus("success");
    } catch {
      setErrorMessage(
        "Something went wrong sending your message. Please try again or email us directly."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="cut-frame border border-accent/40 bg-surface/60 p-10 text-center md:p-12">
        <p className="text-2xl font-bold tracking-tight text-accent">
          Message received.
        </p>
        <p className="mx-auto mt-4 max-w-sm text-lg leading-relaxed text-text/85">
          Thank you. We will be in touch within 1 business day.
        </p>
        <button
          type="button"
          data-cursor="link"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-semibold tracking-wide text-accent underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="relative cut-frame space-y-6 border border-white/10 bg-surface/50 p-8 md:p-10"
      noValidate
    >
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-accent">
          Send a message
        </p>
        <p className="mt-2 text-sm leading-relaxed text-text/60">
          IT support, web design, software, or something else. Tell us what you
          need and we will follow up quickly.
        </p>
      </div>

      {/* Honeypot — hidden from users, bots often fill this */}
      <div
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="from_name"
            className="text-xs font-semibold tracking-[0.15em] uppercase text-text/50"
          >
            Name
          </label>
          <input
            id="from_name"
            name="from_name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="from_email"
            className="text-xs font-semibold tracking-[0.15em] uppercase text-text/50"
          >
            Email
          </label>
          <input
            id="from_email"
            name="from_email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="company"
          className="text-xs font-semibold tracking-[0.15em] uppercase text-text/50"
        >
          Company
        </label>
        <input
          id="company"
          name="company"
          autoComplete="organization"
          placeholder="Optional"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-xs font-semibold tracking-[0.15em] uppercase text-text/50"
        >
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          minLength={12}
          maxLength={MAX_MESSAGE_LENGTH}
          placeholder="What are you looking to build or fix?"
          className={`${inputClass} resize-y min-h-[140px]`}
        />
      </div>

      {status === "error" && errorMessage && (
        <p className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-200">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending" || !canSubmit}
        data-cursor="link"
        className="cut-corner w-full bg-accent px-8 py-4 text-base font-semibold tracking-wide text-bg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
