import type {
  SimulationPreset,
  SimulationRequest,
  SimulationResult,
} from "@/types/city";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`[simulationApi] ${path} failed: ${res.statusText}`);
  return res.json() as Promise<T>;
}

async function post<T>(path: string, body: any): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`[simulationApi] POST ${path} failed: ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const simulationApi = {
  getPresets: () => get<SimulationPreset[]>("/simulation/presets"),
  runSimulation: (req: SimulationRequest) => post<SimulationResult>("/simulation/run", req),
};
