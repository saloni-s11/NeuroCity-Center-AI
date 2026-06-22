import { useQuery } from "@tanstack/react-query";
import { trafficApi } from "@/services/trafficApi";

/** Refresh interval — traffic data changes frequently */
const REFETCH_INTERVAL = 30_000;

/** Full overview: corridors + hourly flow + weekly trend */
export function useTrafficOverview() {
  return useQuery({
    queryKey: ["traffic", "overview"],
    queryFn:  trafficApi.getOverview,
    refetchInterval: REFETCH_INTERVAL,
  });
}

/** City-wide KPI metrics */
export function useTrafficKPIs() {
  return useQuery({
    queryKey: ["traffic", "kpis"],
    queryFn:  trafficApi.getKPIs,
    refetchInterval: REFETCH_INTERVAL,
  });
}

/** Congestion hotspot list */
export function useTrafficHotspots() {
  return useQuery({
    queryKey: ["traffic", "hotspots"],
    queryFn:  trafficApi.getHotspots,
    refetchInterval: REFETCH_INTERVAL,
  });
}

/** Route recommendations */
export function useTrafficRoutes() {
  return useQuery({
    queryKey: ["traffic", "routes"],
    queryFn:  trafficApi.getRoutes,
    refetchInterval: REFETCH_INTERVAL,
  });
}

/** Traffic forecast (default 12 h horizon) */
export function useTrafficForecast(hours = 12) {
  return useQuery({
    queryKey: ["traffic", "forecast", hours],
    queryFn:  () => trafficApi.getForecast(hours),
    refetchInterval: REFETCH_INTERVAL,
  });
}
