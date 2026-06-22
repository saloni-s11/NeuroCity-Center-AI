/**
 * trafficApi.ts
 * Centralised fetch layer for all Traffic Intelligence endpoints.
 * Keep all API calls here — never call fetch() directly from components.
 *
 * Future TomTom/HERE integration: swap out the fetch calls here and
 * the rest of the frontend picks up real data automatically.
 */

import type {
  TrafficForecast,
  TrafficHotspot,
  TrafficKPIs,
  TrafficOverview,
  RouteRecommendation,
} from "@/types/city";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`[trafficApi] ${path} → ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const trafficApi = {
  /** GET /traffic — corridors, hourly flow, weekly trend */
  getOverview:   () => get<TrafficOverview>("/traffic"),

  /** GET /traffic/kpis — city-wide speed, CI, commute, incidents */
  getKPIs:       () => get<TrafficKPIs>("/traffic/kpis"),

  /** GET /traffic/hotspots — congestion hotspot list sorted by severity */
  getHotspots:   () => get<TrafficHotspot[]>("/traffic/hotspots"),

  /** GET /traffic/routes — ranked route alternatives with time savings */
  getRoutes:     () => get<RouteRecommendation[]>("/traffic/routes"),

  /** GET /traffic/forecast?hours=N — wave-model forecast for next N hours */
  getForecast:   (hours = 12) => get<TrafficForecast>(`/traffic/forecast?hours=${hours}`),
};
