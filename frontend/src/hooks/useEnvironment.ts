import { useQuery } from "@tanstack/react-query";
import { environmentApi } from "@/services/environmentApi";

const REFETCH_INTERVAL = 30_000;

/** City-wide averages: AQI, temperature, humidity, CO₂ */
export function useEnvOverview() {
  return useQuery({
    queryKey:  ["environment", "overview"],
    queryFn:   environmentApi.getOverview,
    refetchInterval: REFETCH_INTERVAL,
  });
}

/** Pollution hotspot sectors (AQI > 120) */
export function useEnvHotspots() {
  return useQuery({
    queryKey:  ["environment", "hotspots"],
    queryFn:   environmentApi.getHotspots,
    refetchInterval: REFETCH_INTERVAL,
  });
}

/** 14-day historical trend data */
export function useEnvTrends() {
  return useQuery({
    queryKey:  ["environment", "trends"],
    queryFn:   environmentApi.getTrends,
    refetchInterval: REFETCH_INTERVAL,
  });
}

/** Environmental risk alerts */
export function useEnvRisks() {
  return useQuery({
    queryKey:  ["environment", "risks"],
    queryFn:   environmentApi.getRisks,
    refetchInterval: REFETCH_INTERVAL,
  });
}

/** AI forecast and opportunity cards */
export function useEnvForecast() {
  return useQuery({
    queryKey:  ["environment", "forecast"],
    queryFn:   environmentApi.getForecast,
    refetchInterval: REFETCH_INTERVAL,
  });
}
