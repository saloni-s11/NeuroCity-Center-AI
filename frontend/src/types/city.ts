// ─── Sector status helpers ────────────────────────────────────────────────────
// Mirrors Python sector_status_label() logic exactly.

export type SectorStatus = "Healthy" | "Warning" | "Critical";

export function getSectorStatus(sector: Sector): SectorStatus {
  if (sector.traffic > 85 || sector.aqi > 150 || sector.infrastructure_health < 60)
    return "Critical";
  if (sector.traffic > 70 || sector.aqi > 100 || sector.infrastructure_health < 80)
    return "Warning";
  return "Healthy";
}

export const STATUS_COLORS: Record<SectorStatus, string> = {
  Healthy:  "var(--color-success)",
  Warning:  "var(--color-traffic)",
  Critical: "var(--color-risk)",
};

// ─── Sector ──────────────────────────────────────────────────────────────────

export interface Sector {
  sector_id: string;
  sector_name: string;
  traffic: number;
  aqi: number;
  energy_usage: number;
  population: number;
  infrastructure_health: number;
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export interface DashboardResponse {
  city: string;
  sectors: Sector[];
}

// ─── Metrics ─────────────────────────────────────────────────────────────────

export interface CityMetrics {
  avg_traffic: number;
  avg_aqi: number;
  total_population: number;
  avg_infrastructure_health: number;
  total_energy_usage: number;
  city_health_score: number;
  sustainability_score: number;
}

// ─── Alerts ──────────────────────────────────────────────────────────────────

export type AlertSeverity = "Critical" | "High" | "Medium" | "Low";
export type AlertType = "Traffic" | "Pollution" | "Infrastructure";

export interface CityAlert {
  sector_id: string;
  sector: string;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
}

// ─── Insights (Dashboard executive summaries) ────────────────────────────────

export type InsightTag =
  | "Traffic"
  | "Environment"
  | "Infrastructure"
  | "Energy"
  | "City Health"
  | "Scenario";

export interface CityInsight {
  title: string;
  description: string;
  confidence: number;
  tag: InsightTag;
}

// ─── Predictions (Digital Twin operational forecasts) ────────────────────────

export type PredictionTag =
  | "Traffic"
  | "Environment"
  | "Infrastructure"
  | "Energy"
  | "City Health";

export interface CityPrediction {
  title: string;
  description: string;
  confidence: number;
  tag: PredictionTag;
  horizon: string; // e.g. "Next 2h", "Tomorrow"
}

// ─── Summary ─────────────────────────────────────────────────────────────────

export interface DashboardSummary {
  city: string;
  city_health: number;
  sustainability: number;
  active_alerts: number;
  ai_confidence: number;
}

// ─── Digital Twin Metrics ─────────────────────────────────────────────────────

export interface DigitalTwinMetrics {
  city_health: number;
  active_alerts: number;
  healthy_sectors: number;
  warning_sectors: number;
  critical_sectors: number;
  total_sectors: number;
}

// ─── Traffic Intelligence ─────────────────────────────────────────────────────

export type CongestionLevel = "Free" | "Moderate" | "Heavy" | "Severe";

export interface TrafficCorridor {
  id: string;
  name: string;
  from_: string;
  to: string;
  sector_id: string;
  current_speed_kmh: number;
  free_flow_speed_kmh: number;
  volume: number;
  capacity: number;
  incidents: number;
  signal_count: number;
  congestion_index: number;
  congestion_level: CongestionLevel;
  delay_minutes: number;
}

export interface HourlyFlow {
  hour: string;
  volume: number;
  avg_speed: number;
}

export interface WeeklyTrend {
  day: string;
  avg_index: number;
  peak_hour: string;
  incidents: number;
}

export interface TrafficOverview {
  corridors: TrafficCorridor[];
  hourly_flow: HourlyFlow[];
  weekly_trend: WeeklyTrend[];
  data_source: string;
}

export interface TrafficKPIs {
  avg_speed_kmh: number;
  congestion_index: number;
  avg_commute_minutes: number;
  active_incidents: number;
  corridors_severe: number;
  corridors_heavy: number;
  network_efficiency_pct: number;
}

export interface TrafficHotspot {
  corridor_id: string;
  corridor_name: string;
  sector_id: string;
  congestion_index: number;
  severity: CongestionLevel;
  delay_minutes: number;
  volume_to_capacity: number;
  incidents: number;
  recommendation: string;
}

export interface RouteRecommendation {
  id: string;
  origin: string;
  destination: string;
  current_route: string;
  current_duration_min: number;
  recommended_route: string;
  recommended_duration_min: number;
  time_saving_min: number;
  reason: string;
  valid_until: string;
}

export interface ForecastPoint {
  hour: string;
  predicted_volume: number;
  predicted_speed: number;
  congestion_index: number;
  confidence: number;
}

export interface TrafficForecast {
  generated_at: string;
  horizon_hours: number;
  points: ForecastPoint[];
  peak_hour: string;
  peak_congestion_index: number;
  model: string;
}

// ─── Environment Intelligence ─────────────────────────────────────────────────

export type AqiStatus =
  | "Good"
  | "Moderate"
  | "Unhealthy for Sensitive Groups"
  | "Unhealthy"
  | "Very Unhealthy"
  | "Hazardous";

export interface PollutionSector {
  sector_id: string;
  sector_name: string;
  aqi: number;
  pm25: number;
  pm10: number;
  co2: number;
  no2: number;
  so2: number;
  o3: number;
  temperature: number;
  humidity: number;
  noise_level: number;
  wind_speed_kmh: number;
  aqi_status: AqiStatus;
}

export interface EnvOverview {
  aqi: number;
  temperature: number;
  humidity: number;
  co2: number;
  pm25: number;
  pm10: number;
  noise_level: number;
  aqi_status: AqiStatus;
  data_source: string;
}

export interface EnvHotspot {
  sector_id: string;
  sector: string;
  aqi: number;
  pm25: number;
  co2: number;
  temperature: number;
  aqi_status: AqiStatus;
  risk_score: number;
}

export interface EnvTrendPoint {
  day: string;
  aqi: number;
  temperature: number;
  humidity: number;
  co2: number;
}

export interface EnvRisk {
  type: string;
  severity: string;
  sector: string;
  message: string;
  value: number;
  threshold: number;
}

export interface EnvForecastItem {
  title: string;
  description: string;
  confidence: number;
  tag: string;
  horizon: string;
  type: "Risk" | "Opportunity";
}
