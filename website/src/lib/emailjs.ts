/** EmailJS public config — set in .env.local (see .env.example). */
export const emailJsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
};

export function isEmailJsConfigured(): boolean {
  return Boolean(
    emailJsConfig.serviceId &&
      emailJsConfig.templateId &&
      emailJsConfig.publicKey
  );
}
