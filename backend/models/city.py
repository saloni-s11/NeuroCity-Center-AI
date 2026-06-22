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


# ─── Sustainability models ────────────────────────────────────────────────────

class SectorHealthDetail(BaseModel):
    """Health score breakdown for a single sector."""
    sector_id: str
    sector_name: str
    health_score: float
    traffic_score: float
    aqi_score: float
    infra_score: float
    energy_score: float
    status: str          # Healthy / Warning / Critical


class SustainabilityHealthScore(BaseModel):
    """GET /sustainability/health-score"""
    overall_score: float
    grade: str                             # A / B / C / D / F
    description: str
    sector_details: List[SectorHealthDetail]
    components: dict                       # weighted breakdown


class EnvironmentalMetrics(BaseModel):
    """GET /sustainability/environmental-metrics"""
    renewable_mix_pct: float
    carbon_footprint: float               # tonnes CO2 equivalent
    carbon_target: float
    water_efficiency_pct: float
    waste_diversion_pct: float
    green_cover_pct: float
    ev_penetration_pct: float
    energy_per_capita: float
    aqi_avg: float
    sustainability_index: float           # composite 0-100


class MonthlyTrend(BaseModel):
    """One month's sustainability data point."""
    month: str
    sustainability_score: float
    environmental: float
    mobility: float
    resource_efficiency: float
    infrastructure: float


class PillarScore(BaseModel):
    """Score for one sustainability pillar."""
    name: str
    score: float
    benchmark: float
    delta: float           # vs benchmark
    trend: str             # improving / stable / declining


class PeerCity(BaseModel):
    """Peer city comparison entry."""
    name: str
    score: float
    rank: int


class SustainabilityPerformance(BaseModel):
    """GET /sustainability/performance"""
    overall_score: float
    trend_12m: List[MonthlyTrend]
    pillars: List[PillarScore]
    peer_comparison: List[PeerCity]
    narrative: str


# ─── Simulation models ───────────────────────────────────────────────────────

class SimulationRequest(BaseModel):
    """POST /simulation/run — request body."""
    scenario: str          # population_growth / ev_adoption / renewable_energy / climate_event
    params: dict           # scenario-specific parameters


class SimulationImpact(BaseModel):
    """One impact metric from a simulation."""
    label: str
    value: float
    unit: str
    delta_pct: float       # % change from baseline
    tone: str              # positive / negative / neutral


class SimulationResult(BaseModel):
    """POST /simulation/run — response."""
    scenario: str
    scenario_label: str
    params: dict
    impacts: List[SimulationImpact]
    narrative: str
    risk_level: str        # Low / Medium / High / Critical
    confidence: int
    recommendations: List[str]


class SimulationPreset(BaseModel):
    """One preset scenario configuration."""
    id: str
    name: str
    description: str
    scenario: str
    params: dict
    tags: List[str]


# ─── Narration models ────────────────────────────────────────────────────────

class TrendExplanation(BaseModel):
    """One trend explained in plain language."""
    metric: str
    direction: str         # rising / falling / stable
    value: float
    explanation: str
    icon_hint: str         # up / down / neutral


class NarrationBriefing(BaseModel):
    """GET /narration/briefing"""
    executive_summary: str
    city_health: float
    timestamp: str
    trends: List[TrendExplanation]
    key_risks: List[str]
    opportunities: List[str]


class NarrationRecommendation(BaseModel):
    """One AI recommendation."""
    id: str
    title: str
    body: str
    priority: str          # Critical / High / Strategic / Policy
    impact: int            # 0-100
    confidence: int        # 0-100
    category: str          # Traffic / Environment / Infrastructure / Energy
    action_type: str       # immediate / short_term / long_term
    estimated_benefit: str


# ─── Timeline models ─────────────────────────────────────────────────────────

class YearData(BaseModel):
    """Projected metrics for one year."""
    year: int
    population_m: float
    infra_score: float
    traffic_index: float
    pollution_index: float
    energy_gw: float
    sustainability_score: float
    ev_pct: float
    renewable_pct: float
    green_cover_pct: float


class TimelineProjection(BaseModel):
    """GET /timeline/projections"""
    start_year: int
    end_year: int
    data: List[YearData]
    narrative: str


class Scenario(BaseModel):
    """One named scenario trajectory."""
    name: str
    description: str
    color: str
    data: List[YearData]


class ScenarioComparison(BaseModel):
    """GET /timeline/scenarios"""
    scenarios: List[Scenario]
    analysis: str


class Milestone(BaseModel):
    """A projected milestone event."""
    year: int
    title: str
    description: str
    category: str          # population / infrastructure / environment / energy
    impact: str            # positive / negative / neutral
    icon_hint: str
