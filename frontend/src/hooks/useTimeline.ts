import { useQuery } from "@tanstack/react-query";
import { timelineApi } from "@/services/timelineApi";

// Timeline projections and scenarios only need to be fetched once per session
// as they project into the future and don't change frequently.
const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export function useProjections() {
  return useQuery({
    queryKey: ["timeline", "projections"],
    queryFn: timelineApi.getProjections,
    staleTime: STALE_TIME,
  });
}

export function useScenarios() {
  return useQuery({
    queryKey: ["timeline", "scenarios"],
    queryFn: timelineApi.getScenarios,
    staleTime: STALE_TIME,
  });
}

export function useMilestones() {
  return useQuery({
    queryKey: ["timeline", "milestones"],
    queryFn: timelineApi.getMilestones,
    staleTime: STALE_TIME,
  });
}
