/** Client-side spam checks for the public contact form (EmailJS). */

export const MIN_FORM_SECONDS = 3;
export const MAX_MESSAGE_LENGTH = 4000;
export const MIN_MESSAGE_LENGTH = 12;
export const MAX_SUBMITS_PER_HOUR = 5;
export const RATE_LIMIT_KEY = "t0l_contact_submits";

export type SpamFailReason = "honeypot" | "too_fast" | "rate_limit" | "content";

export type SpamCheckResult =
  | { ok: true }
  | { ok: false; reason: SpamFailReason };

export function isSilentSpamFailure(reason: SpamFailReason): boolean {
  return reason === "honeypot" || reason === "too_fast";
}

export function checkContactSpam(input: {
  honeypot: string;
  message: string;
  formReadyAt: number;
  now?: number;
}): SpamCheckResult {
  const now = input.now ?? Date.now();

  if (input.honeypot.trim().length > 0) {
    return { ok: false, reason: "honeypot" };
  }

  const elapsedMs = now - input.formReadyAt;
  if (elapsedMs < MIN_FORM_SECONDS * 1000) {
    return { ok: false, reason: "too_fast" };
  }

  if (!isWithinRateLimit(now)) {
    return { ok: false, reason: "rate_limit" };
  }

  const message = input.message.trim();
  if (message.length < MIN_MESSAGE_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, reason: "content" };
  }

  const urlCount = (message.match(/https?:\/\/|www\./gi) ?? []).length;
  if (urlCount > 3) {
    return { ok: false, reason: "content" };
  }

  return { ok: true };
}

function isWithinRateLimit(now: number): boolean {
  if (typeof window === "undefined") return true;

  try {
    const raw = sessionStorage.getItem(RATE_LIMIT_KEY);
    const windowMs = 60 * 60 * 1000;
    const timestamps: number[] = raw ? JSON.parse(raw) : [];
    const recent = timestamps.filter((t) => now - t < windowMs);
    return recent.length < MAX_SUBMITS_PER_HOUR;
  } catch {
    return true;
  }
}

export function recordContactSubmission(now: number = Date.now()): void {
  if (typeof window === "undefined") return;

  try {
    const raw = sessionStorage.getItem(RATE_LIMIT_KEY);
    const windowMs = 60 * 60 * 1000;
    const timestamps: number[] = raw ? JSON.parse(raw) : [];
    const recent = timestamps.filter((t) => now - t < windowMs);
    recent.push(now);
    sessionStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
  } catch {
    // ignore storage errors
  }
}
