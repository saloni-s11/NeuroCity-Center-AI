import type {
  CityAlert,
  CityInsight,
  CityMetrics,
  DashboardResponse,
  DashboardSummary,
} from "@/types/city";

// Base URL — override with VITE_API_URL env var for production deployments
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

// ─── Endpoints ───────────────────────────────────────────────────────────────

export const api = {
  /** GET /dashboard — full sector list */
  getDashboard: () => get<DashboardResponse>("/dashboard"),

  /** GET /metrics — city-wide computed metrics */
  getMetrics: () => get<CityMetrics>("/metrics"),

  /** GET /alerts — active alerts generated from sector data */
  getAlerts: () => get<CityAlert[]>("/alerts"),

  /** GET /insights — AI-generated insights from sector data */
  getInsights: () => get<CityInsight[]>("/insights"),

  /** GET /summary — dashboard header summary (health, sustainability, alert count, AI confidence) */
  getSummary: () => get<DashboardSummary>("/summary"),
};
