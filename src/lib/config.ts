// ─────────────────────────────────────────────────────────
//  RRDCH Dental Management System — Global Config
// ─────────────────────────────────────────────────────────

/**
 * Replace this with your real n8n webhook URL when you have it.
 * e.g. "https://your-n8n-instance.com/webhook/abc123"
 */
export const N8N_WEBHOOK_URL = "YOUR_N8N_WEBHOOK_URL_HERE";

export const ROLES = {
  PATIENT: "patient",
  DOCTOR: "doctor",
  ADMIN: "admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/** Role → default redirect after login */
export const ROLE_HOME: Record<Role, string> = {
  patient: "/patient/booking",
  doctor: "/doctor/schedule",
  admin: "/admin/management",
};
