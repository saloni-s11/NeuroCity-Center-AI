import { useQuery, useMutation } from "@tanstack/react-query";
import { simulationApi } from "@/services/simulationApi";
import type { SimulationRequest, SimulationResult } from "@/types/city";

export function useSimulationPresets() {
  return useQuery({
    queryKey: ["simulation", "presets"],
    queryFn: simulationApi.getPresets,
    staleTime: Infinity, // Presets don't change
  });
}

export function useRunSimulation() {
  return useMutation({
    mutationFn: (req: SimulationRequest) => simulationApi.runSimulation(req),
  });
}
