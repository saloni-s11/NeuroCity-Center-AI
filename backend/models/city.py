from pydantic import BaseModel
from typing import List


class Sector(BaseModel):
    sector_id: str
    sector_name: str
    traffic: float
    aqi: float
    energy_usage: float
    population: int
    infrastructure_health: float


class DashboardResponse(BaseModel):
    city: str
    sectors: List[Sector]


class CityMetrics(BaseModel):
    avg_traffic: float
    avg_aqi: float
    total_population: int
    avg_infrastructure_health: float
    total_energy_usage: float
    city_health_score: float
    sustainability_score: float


class Alert(BaseModel):
    sector_id: str
    sector: str
    type: str
    severity: str
    message: str


class Insight(BaseModel):
    title: str
    description: str
    confidence: int
    tag: str


class DashboardSummary(BaseModel):
    city_health: float
    sustainability: float
    active_alerts: int
    ai_confidence: float
    city: str


# ─── Digital Twin models ──────────────────────────────────────────────────────

class Prediction(BaseModel):
    title: str
    description: str
    confidence: int
    tag: str
    horizon: str          # e.g. "Next 2h", "Tomorrow", "This week"


class DigitalTwinMetrics(BaseModel):
    city_health: float
    active_alerts: int
    healthy_sectors: int
    warning_sectors: int
    critical_sectors: int
    total_sectors: int


# ─── Traffic Intelligence models ─────────────────────────────────────────────

class TrafficCorridor(BaseModel):
    id: str
    name: str
    from_: str
    to: str
    sector_id: str
    current_speed_kmh: float
    free_flow_speed_kmh: float
    volume: int
    capacity: int
    incidents: int
    signal_count: int
    congestion_index: float       # 0-100 derived
    congestion_level: str         # Free / Moderate / Heavy / Severe
    delay_minutes: float          # extra travel time vs free-flow


class HourlyFlow(BaseModel):
    hour: str
    volume: int
    avg_speed: float


class WeeklyTrend(BaseModel):
    day: str
    avg_index: float
    peak_hour: str
    incidents: int


class TrafficOverview(BaseModel):
    """GET /traffic — full dataset snapshot"""
    corridors: List[TrafficCorridor]
    hourly_flow: List[HourlyFlow]
    weekly_trend: List[WeeklyTrend]
    data_source: str              # "simulated" | "tomtom" | "here" — future-proof


class TrafficKPIs(BaseModel):
    avg_speed_kmh: float
    congestion_index: float       # city-wide average
    avg_commute_minutes: float
    active_incidents: int
    corridors_severe: int
    corridors_heavy: int
    network_efficiency_pct: float # actual throughput / theoretical max


class TrafficHotspot(BaseModel):
    corridor_id: str
    corridor_name: str
    sector_id: str
    congestion_index: float
    severity: str                 # Severe / Heavy / Moderate
    delay_minutes: float
    volume_to_capacity: float
    incidents: int
    recommendation: str


class RouteRecommendation(BaseModel):
    id: str
    origin: str
    destination: str
    current_route: str
    current_duration_min: float
    recommended_route: str
    recommended_duration_min: float
    time_saving_min: float
    reason: str
    valid_until: str              # "Next 30 min" etc.


class ForecastPoint(BaseModel):
    hour: str
    predicted_volume: int
    predicted_speed: float
    congestion_index: float
    confidence: float


class TrafficForecast(BaseModel):
    generated_at: str
    horizon_hours: int
    points: List[ForecastPoint]
    peak_hour: str
    peak_congestion_index: float
    model: str                   # "simulated_wave" | "ml_v1" — future-proof


# ─── Environment Intelligence models ─────────────────────────────────────────

class PollutionSector(BaseModel):
    """Raw reading from pollution_data.json for one sector."""
    sector_id: str
    sector_name: str
    aqi: float
    pm25: float
    pm10: float
    co2: float
    no2: float
    so2: float
    o3: float
    temperature: float
    humidity: float
    noise_level: float
    wind_speed_kmh: float
    # derived
    aqi_status: str      # Good / Moderate / Unhealthy for Sensitive Groups / Unhealthy / Very Unhealthy / Hazardous


class EnvOverview(BaseModel):
    """GET /environment/overview — city-wide averages."""
    aqi: float
    temperature: float
    humidity: float
    co2: float
    pm25: float
    pm10: float
    noise_level: float
    aqi_status: str
    data_source: str     # "simulated" | future real provider


class EnvHotspot(BaseModel):
    """GET /environment/hotspots — sectors with aqi > 120, sorted desc."""
    sector_id: str
    sector: str
    aqi: float
    pm25: float
    co2: float
    temperature: float
    aqi_status: str
    risk_score: float    # 0-100 composite risk


class EnvTrendPoint(BaseModel):
    """One day's aggregated city data — GET /environment/trends."""
    day: str
    aqi: float
    temperature: float
    humidity: float
    co2: float


class EnvRisk(BaseModel):
    """GET /environment/risks — generated risk alerts."""
    type: str            # Heat Wave / AQI Spike / Carbon / Noise / PM2.5
    severity: str        # Critical / High / Medium / Low
    sector: str          # affected sector name or "City-wide"
    message: str
    value: float         # the triggering metric value
    threshold: float     # the threshold that was crossed


class EnvForecastItem(BaseModel):
    """One forecast insight — GET /environment/forecast."""
    title: str
    description: str
    confidence: int
    tag: str             # AQI / Temperature / CO2 / Humidity / PM2.5
    horizon: str         # Next 24h / Next 3 days / Next 7 days
    type: str            # Risk / Opportunity
