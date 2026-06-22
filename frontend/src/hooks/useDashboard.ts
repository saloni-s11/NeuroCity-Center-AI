import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

// Refetch interval for live feel (30 seconds)
const REFETCH_INTERVAL = 30_000;

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: api.getDashboard,
    refetchInterval: REFETCH_INTERVAL,
  });
}

export function useMetrics() {
  return useQuery({
    queryKey: ["metrics"],
    queryFn: api.getMetrics,
    refetchInterval: REFETCH_INTERVAL,
  });
}

export function useAlerts() {
  return useQuery({
    queryKey: ["alerts"],
    queryFn: api.getAlerts,
    refetchInterval: REFETCH_INTERVAL,
  });
}

export function useInsights() {
  return useQuery({
    queryKey: ["insights"],
    queryFn: api.getInsights,
    refetchInterval: REFETCH_INTERVAL,
  });
}

export function useSummary() {
  return useQuery({
    queryKey: ["summary"],
    queryFn: api.getSummary,
    refetchInterval: REFETCH_INTERVAL,
  });
}
