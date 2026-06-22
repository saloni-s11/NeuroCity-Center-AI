import type {
  EnvironmentalMetrics,
  SustainabilityHealthScore,
  SustainabilityPerformance,
} from "@/types/city";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`[sustainabilityApi] ${path} failed: ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const sustainabilityApi = {
  getHealthScore: () => get<SustainabilityHealthScore>("/sustainability/health-score"),
  getEnvironmentalMetrics: () => get<EnvironmentalMetrics>("/sustainability/environmental-metrics"),
  getPerformance: () => get<SustainabilityPerformance>("/sustainability/performance"),
};
