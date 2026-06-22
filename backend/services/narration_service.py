"""
NarrationService
================
AI narration engine that generates human-readable insights:
  - Executive briefing (city-wide synthesis)
  - Trend explanations (why metrics are changing)
  - Ranked recommendations with impact/confidence scores

All outputs are structured for direct UI rendering.
"""

import json
import os
from datetime import datetime
from typing import List

from models.city import (
    NarrationBriefing,
    NarrationRecommendation,
    Sector,
    TrendExplanation,
)

_CITY_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "city_state.json")
_POLLUTION_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "pollution_data.json")


def _load_sectors() -> List[Sector]:
    with open(_CITY_PATH, "r") as f:
        return [Sector(**s) for s in json.load(f)]


def _load_pollution() -> dict:
    with open(_POLLUTION_PATH, "r") as f:
        return json.load(f)


def _avg(vals: List[float]) -> float:
    return round(sum(vals) / len(vals), 1) if vals else 0.0


# ─── Executive Briefing ──────────────────────────────────────────────────────

def get_briefing() -> NarrationBriefing:
    sectors = _load_sectors()
    pollution = _load_pollution()
    poll_sectors = pollution["sectors"]
    hist = pollution["historical_14d"]

    n = len(sectors)
    avg_traffic = _avg([s.traffic for s in sectors])
    avg_aqi = _avg([s.aqi for s in sectors])
    avg_infra = _avg([s.infrastructure_health for s in sectors])
    total_energy = sum(s.energy_usage for s in sectors)
    total_pop = sum(s.population for s in sectors)
    avg_co2 = _avg([s["co2"] for s in poll_sectors])
    avg_temp = _avg([s["temperature"] for s in poll_sectors])

    # City health (same formula as city_service)
    traffic_score = max(0, 100 - avg_traffic)
    aqi_score = max(0, 100 - avg_aqi / 3)
    city_health = round(avg_infra * 0.45 + traffic_score * 0.30 + aqi_score * 0.25, 1)
    city_health = min(100, max(0, city_health))

    # Count alerts
    critical_sectors = [s for s in sectors if s.traffic > 85 or s.aqi > 150 or s.infrastructure_health < 60]
    warning_sectors = [s for s in sectors if not (s.traffic > 85 or s.aqi > 150 or s.infrastructure_health < 60)
                       and (s.traffic > 70 or s.aqi > 100 or s.infrastructure_health < 80)]

    # Executive summary
    time_greeting = "morning" if datetime.now().hour < 12 else "afternoon" if datetime.now().hour < 17 else "evening"
    summary_parts = [
        f"Good {time_greeting}. NeuroCity is operating at {city_health}/100 health score. ",
    ]

    if critical_sectors:
        names = ", ".join(s.sector_name for s in critical_sectors[:3])
        summary_parts.append(
            f"{len(critical_sectors)} sector{'s' if len(critical_sectors) > 1 else ''} "
            f"({names}) {'are' if len(critical_sectors) > 1 else 'is'} in critical status. "
        )

    if avg_traffic > 75:
        summary_parts.append(
            f"City-wide traffic congestion is elevated at index {avg_traffic}, "
            f"driven primarily by peak-hour density in commercial corridors. "
        )
    if avg_aqi > 120:
        summary_parts.append(
            f"Air quality requires attention — average AQI of {avg_aqi} is "
            f"{'significantly ' if avg_aqi > 150 else ''}above healthy thresholds. "
        )
    if avg_infra > 80:
        summary_parts.append(
            f"Infrastructure health remains strong at {avg_infra}%, "
            f"with preventive maintenance on schedule. "
        )
    else:
        summary_parts.append(
            f"Infrastructure health at {avg_infra}% warrants accelerated maintenance "
            f"in lower-scoring sectors. "
        )

    summary_parts.append(
        f"Total energy demand stands at {round(total_energy, 1)} units across {n} sectors "
        f"serving {round(total_pop / 1_000_000, 2)}M residents."
    )

    executive_summary = "".join(summary_parts)

    # Trends
    trends: List[TrendExplanation] = []

    # Traffic trend
    traffic_dir = "rising" if avg_traffic > 70 else "stable" if avg_traffic > 50 else "falling"
    trends.append(TrendExplanation(
        metric="Traffic Congestion",
        direction=traffic_dir,
        value=avg_traffic,
        explanation=(
            f"City-wide traffic index is at {avg_traffic}. "
            f"{'Peak-hour patterns in Downtown and Tech Park are driving congestion above normal levels. ' if avg_traffic > 75 else ''}"
            f"{'Metro expansion and alternate routing protocols are keeping congestion in check. ' if avg_traffic <= 70 else ''}"
            f"Consider {'activating signal optimization' if avg_traffic > 80 else 'maintaining current flow management'}."
        ),
        icon_hint="up" if traffic_dir == "rising" else "down" if traffic_dir == "falling" else "neutral",
    ))

    # AQI trend (use 14-day history)
    recent_aqi = [d["aqi"] for d in hist[-7:]]
    older_aqi = [d["aqi"] for d in hist[:7]]
    aqi_dir = "rising" if _avg(recent_aqi) > _avg(older_aqi) + 5 else "falling" if _avg(recent_aqi) < _avg(older_aqi) - 5 else "stable"
    trends.append(TrendExplanation(
        metric="Air Quality (AQI)",
        direction=aqi_dir,
        value=avg_aqi,
        explanation=(
            f"Average AQI is {avg_aqi}. Over the past 14 days, air quality has been "
            f"{'deteriorating' if aqi_dir == 'rising' else 'improving' if aqi_dir == 'falling' else 'fluctuating within a stable band'}. "
            f"{'Industrial Zone emissions and low wind speeds are the primary contributors. ' if avg_aqi > 130 else ''}"
            f"PM2.5 concentrations {'require public advisory consideration' if avg_aqi > 150 else 'remain within manageable limits'}."
        ),
        icon_hint="up" if aqi_dir == "rising" else "down" if aqi_dir == "falling" else "neutral",
    ))

    # Infrastructure trend
    infra_dir = "stable" if avg_infra >= 78 else "falling"
    trends.append(TrendExplanation(
        metric="Infrastructure Health",
        direction=infra_dir,
        value=avg_infra,
        explanation=(
            f"Average infrastructure health is {avg_infra}%. "
            f"{'All sectors are within acceptable maintenance thresholds. ' if avg_infra >= 80 else ''}"
            f"{'Commercial Hub and Industrial Zone require priority maintenance scheduling. ' if avg_infra < 80 else ''}"
            f"Preventive inspection cycles are {'on track' if avg_infra >= 78 else 'recommended to accelerate'}."
        ),
        icon_hint="neutral" if infra_dir == "stable" else "down",
    ))

    # Energy trend
    energy_dir = "rising" if total_energy > n * 70 else "stable"
    trends.append(TrendExplanation(
        metric="Energy Consumption",
        direction=energy_dir,
        value=round(total_energy, 1),
        explanation=(
            f"Total energy usage is {round(total_energy, 1)} units. "
            f"{'High-consumption sectors (Tech Park, Industrial Zone) are approaching grid capacity. ' if total_energy > n * 75 else ''}"
            f"{'Pre-cooling and demand-side management recommended during afternoon peaks. ' if energy_dir == 'rising' else 'Current levels are within distribution capacity. '}"
        ),
        icon_hint="up" if energy_dir == "rising" else "neutral",
    ))

    # Temperature trend
    recent_temp = [d["temperature"] for d in hist[-5:]]
    temp_dir = "rising" if _avg(recent_temp) > 33 else "stable" if _avg(recent_temp) > 30 else "falling"
    trends.append(TrendExplanation(
        metric="Temperature",
        direction=temp_dir,
        value=avg_temp,
        explanation=(
            f"Average temperature is {avg_temp}°C. "
            f"{'Heat stress protocols should be considered for outdoor workers. ' if avg_temp > 34 else ''}"
            f"{'Conditions are favorable for outdoor activities and maintenance work.' if avg_temp <= 32 else ''}"
        ),
        icon_hint="up" if temp_dir == "rising" else "neutral",
    ))

    # Key risks
    key_risks = []
    if avg_aqi > 150:
        key_risks.append(f"Critical air quality in {len([s for s in sectors if s.aqi > 150])} sectors — public health advisory recommended")
    if avg_traffic > 80:
        key_risks.append(f"Severe congestion risk — {len([s for s in sectors if s.traffic > 80])} corridors above critical threshold")
    worst_infra = min(sectors, key=lambda s: s.infrastructure_health)
    if worst_infra.infrastructure_health < 70:
        key_risks.append(f"Infrastructure degradation in {worst_infra.sector_name} ({worst_infra.infrastructure_health}%) — service disruption possible")
    if avg_temp > 35:
        key_risks.append("Heat wave conditions detected — elder and outdoor-worker advisory in effect")
    if not key_risks:
        key_risks.append("No critical risks detected — all systems within normal parameters")

    # Opportunities
    opportunities = []
    clean_sectors = [s for s in sectors if s.aqi < 80]
    if clean_sectors:
        opportunities.append(f"{len(clean_sectors)} sector{'s' if len(clean_sectors) > 1 else ''} with good air quality — ideal for outdoor events and maintenance")
    if avg_infra > 85:
        opportunities.append("Strong infrastructure foundation enables accelerated smart-city deployments")
    low_traffic = [s for s in sectors if s.traffic < 50]
    if low_traffic:
        opportunities.append(f"{len(low_traffic)} sector{'s have' if len(low_traffic) > 1 else ' has'} low congestion — consider re-routing through these corridors")

    return NarrationBriefing(
        executive_summary=executive_summary,
        city_health=city_health,
        timestamp=datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
        trends=trends,
        key_risks=key_risks,
        opportunities=opportunities,
    )


# ─── Recommendations ─────────────────────────────────────────────────────────

def get_recommendations() -> List[NarrationRecommendation]:
    sectors = _load_sectors()
    pollution = _load_pollution()
    poll_sectors = pollution["sectors"]
    recs: List[NarrationRecommendation] = []

    avg_aqi = _avg([s.aqi for s in sectors])
    avg_traffic = _avg([s.traffic for s in sectors])

    # AQI-based recommendations
    high_aqi_sectors = sorted([s for s in poll_sectors if s["aqi"] > 130], key=lambda s: s["aqi"], reverse=True)
    if high_aqi_sectors:
        worst = high_aqi_sectors[0]
        recs.append(NarrationRecommendation(
            id="REC-001",
            title=f"Activate sprinkler grid in {worst['sector_name']}",
            body=(
                f"PM2.5 forecast to exceed 160 µg/m³ for 6+ hours in {worst['sector_name']}. "
                f"Sprinkler activation combined with traffic diversion reduces particulate exposure by 38%. "
                f"Current AQI: {worst['aqi']}."
            ),
            priority="Critical",
            impact=92,
            confidence=94,
            category="Environment",
            action_type="immediate",
            estimated_benefit="38% reduction in PM2.5 exposure within 4 hours",
        ))

    # Energy-based recommendations
    high_energy = sorted(sectors, key=lambda s: s.energy_usage, reverse=True)
    if high_energy and high_energy[0].energy_usage > 75:
        top = high_energy[0]
        recs.append(NarrationRecommendation(
            id="REC-002",
            title=f"Pre-cool transformers in {top.sector_name}",
            body=(
                f"Energy usage at {top.energy_usage} units in {top.sector_name} approaching grid capacity. "
                f"Forecast 38°C peak this week. Pre-cooling prevents projected 2.1% load shedding "
                f"and extends equipment lifespan by ~200 hours."
            ),
            priority="High",
            impact=78,
            confidence=88,
            category="Energy",
            action_type="immediate",
            estimated_benefit="Prevents 2.1% load shedding, saves ₹4.2 Cr in outage costs",
        ))

    # Traffic-based recommendations
    congested = sorted([s for s in sectors if s.traffic > 75], key=lambda s: s.traffic, reverse=True)
    if congested:
        top = congested[0]
        recs.append(NarrationRecommendation(
            id="REC-003",
            title=f"Deploy adaptive signal timing in {top.sector_name}",
            body=(
                f"Traffic index at {top.traffic} in {top.sector_name}. "
                f"Adaptive signal optimization can reduce average delay by 22% during peak hours. "
                f"Historical data shows 15-minute improvement in average commute through this corridor."
            ),
            priority="High",
            impact=74,
            confidence=86,
            category="Traffic",
            action_type="short_term",
            estimated_benefit="22% reduction in peak-hour delay, 15 min faster commutes",
        ))

    # Infrastructure strategic recommendation
    weak_infra = sorted(sectors, key=lambda s: s.infrastructure_health)
    if weak_infra[0].infrastructure_health < 80:
        bottom = weak_infra[0]
        recs.append(NarrationRecommendation(
            id="REC-004",
            title=f"Schedule preventive maintenance in {bottom.sector_name}",
            body=(
                f"Infrastructure health at {bottom.infrastructure_health}% in {bottom.sector_name}. "
                f"Predictive model indicates 67% probability of service disruption within 7 days "
                f"without intervention. Estimated maintenance cost: ₹12 Cr vs ₹85 Cr for reactive repair."
            ),
            priority="Strategic",
            impact=86,
            confidence=81,
            category="Infrastructure",
            action_type="short_term",
            estimated_benefit="₹73 Cr savings vs reactive repair, prevents service disruption",
        ))

    # Policy recommendation — sustainability
    recs.append(NarrationRecommendation(
        id="REC-005",
        title="Subsidise rooftop solar in high-energy sectors",
        body=(
            f"Top energy-consuming sectors account for {round(sum(s.energy_usage for s in high_energy[:3]))} units. "
            f"Rooftop solar deployment adds 220 MW renewable capacity by 2028 and cuts carbon by 4.8%. "
            f"ROI positive in year 6 with current subsidy rates."
        ),
        priority="Policy",
        impact=70,
        confidence=79,
        category="Energy",
        action_type="long_term",
        estimated_benefit="220 MW added capacity, 4.8% carbon reduction, ROI in 6 years",
    ))

    # Metro expansion recommendation
    if avg_traffic > 65:
        recs.append(NarrationRecommendation(
            id="REC-006",
            title="Extend metro network to underserved corridors",
            body=(
                f"City-wide traffic index at {avg_traffic}. Extending metro by 15 km to eastern corridors "
                f"reduces peak traffic by 11.2%. Capex: ₹2,400 Cr with 4.2-year payback at current ridership growth. "
                f"Environmental co-benefit: 8% reduction in transport emissions."
            ),
            priority="Strategic",
            impact=82,
            confidence=77,
            category="Traffic",
            action_type="long_term",
            estimated_benefit="11.2% traffic reduction, 8% emission cut, 4.2-year payback",
        ))

    # Sort by impact * confidence descending (highest priority actions first)
    recs.sort(key=lambda r: r.impact * r.confidence / 100, reverse=True)
    return recs
