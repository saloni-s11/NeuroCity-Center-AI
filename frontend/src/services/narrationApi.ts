import type {
  NarrationBriefing,
  NarrationRecommendation,
} from "@/types/city";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`[narrationApi] ${path} failed: ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const narrationApi = {
  getBriefing: () => get<NarrationBriefing>("/narration/briefing"),
  getRecommendations: () => get<NarrationRecommendation[]>("/narration/recommendations"),
};
