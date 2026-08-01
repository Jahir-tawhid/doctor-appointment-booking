import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.warn(
    "RESEND_API_KEY is not set. Email sending will fail until you add it to .env.local",
  );
}

export const resend = new Resend(apiKey);

export function getFromAddress(): string {
  return (
    process.env.RESEND_FROM ?? "Doctor Appointment <onboarding@resend.dev>"
  );
}
