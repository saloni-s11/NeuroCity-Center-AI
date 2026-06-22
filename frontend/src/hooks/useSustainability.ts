import { useQuery } from "@tanstack/react-query";
import { sustainabilityApi } from "@/services/sustainabilityApi";

const REFETCH_INTERVAL = 30_000;

export function useHealthScore() {
  return useQuery({
    queryKey: ["sustainability", "health-score"],
    queryFn: sustainabilityApi.getHealthScore,
    refetchInterval: REFETCH_INTERVAL,
  });
}

export function useEnvironmentalMetrics() {
  return useQuery({
    queryKey: ["sustainability", "environmental-metrics"],
    queryFn: sustainabilityApi.getEnvironmentalMetrics,
    refetchInterval: REFETCH_INTERVAL,
  });
}

export function useSustainabilityPerformance() {
  return useQuery({
    queryKey: ["sustainability", "performance"],
    queryFn: sustainabilityApi.getPerformance,
    refetchInterval: REFETCH_INTERVAL,
  });
}
