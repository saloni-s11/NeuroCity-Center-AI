import { useQuery } from "@tanstack/react-query";
import { narrationApi } from "@/services/narrationApi";

const REFETCH_INTERVAL = 30_000;

export function useBriefing() {
  return useQuery({
    queryKey: ["narration", "briefing"],
    queryFn: narrationApi.getBriefing,
    refetchInterval: REFETCH_INTERVAL,
  });
}

export function useRecommendations() {
  return useQuery({
    queryKey: ["narration", "recommendations"],
    queryFn: narrationApi.getRecommendations,
    refetchInterval: REFETCH_INTERVAL,
  });
}
