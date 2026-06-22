import { useQuery } from "@tanstack/react-query";
import { digitalTwinApi } from "@/services/digitalTwinApi";

/** Refresh every 20 seconds for the operational Digital Twin view */
const REFETCH_INTERVAL = 20_000;

/** Full sector list for the map and inspection panel */
export function useDigitalTwinSectors() {
  return useQuery({
    queryKey: ["digital-twin", "sectors"],
    queryFn: digitalTwinApi.getSectors,
    refetchInterval: REFETCH_INTERVAL,
  });
}

/** Header KPI metrics: health score, alert count, sector breakdown */
export function useDigitalTwinMetrics() {
  return useQuery({
    queryKey: ["digital-twin", "metrics"],
    queryFn: digitalTwinApi.getMetrics,
    refetchInterval: REFETCH_INTERVAL,
  });
}

/** AI operational predictions with time horizons */
export function useDigitalTwinPredictions() {
  return useQuery({
    queryKey: ["digital-twin", "predictions"],
    queryFn: digitalTwinApi.getPredictions,
    refetchInterval: REFETCH_INTERVAL,
  });
}

/** Active alerts — authoritative source for Digital Twin alert panel */
export function useDigitalTwinAlerts() {
  return useQuery({
    queryKey: ["digital-twin", "alerts"],
    queryFn: digitalTwinApi.getAlerts,
    refetchInterval: REFETCH_INTERVAL,
  });
}
