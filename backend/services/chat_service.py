import json
import os
from typing import List

from models.city import ChatResponse, Sector

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

def process_chat(message: str) -> ChatResponse:
    message_lower = message.lower()
    sectors = _load_sectors()
    pollution = _load_pollution()
    
    # 1. Traffic insights
    if "traffic" in message_lower or "congestion" in message_lower:
        avg_traffic = _avg([s.traffic for s in sectors])
        worst_traffic = max(sectors, key=lambda s: s.traffic)
        reply = (f"The city's average traffic index is currently {avg_traffic}. "
                 f"The most congested area is {worst_traffic.sector_name} with an index of {worst_traffic.traffic}. "
                 f"I recommend exploring adaptive signal timing in {worst_traffic.sector_name} to alleviate this.")
        return ChatResponse(reply=reply)
        
    # 2. Air quality / Environment insights
    if "air" in message_lower or "aqi" in message_lower or "pollution" in message_lower or "environment" in message_lower:
        avg_aqi = _avg([s.aqi for s in sectors])
        worst_aqi = max(sectors, key=lambda s: s.aqi)
        reply = (f"The city-wide average AQI is {avg_aqi}. "
                 f"Currently, {worst_aqi.sector_name} has the worst air quality at {worst_aqi.aqi} AQI. "
                 f"{'Consider issuing health advisories.' if avg_aqi > 100 else 'Air quality is within acceptable limits for most sectors.'}")
        return ChatResponse(reply=reply)
        
    # 3. Infrastructure insights
    if "infrastructure" in message_lower or "health" in message_lower or "maintenance" in message_lower:
        avg_infra = _avg([s.infrastructure_health for s in sectors])
        worst_infra = min(sectors, key=lambda s: s.infrastructure_health)
        reply = (f"Overall infrastructure health is at {avg_infra}%. "
                 f"The {worst_infra.sector_name} requires the most attention, currently at {worst_infra.infrastructure_health}%. "
                 f"Scheduling preventive maintenance there could prevent service disruptions.")
        return ChatResponse(reply=reply)
        
    # 4. Energy insights
    if "energy" in message_lower or "power" in message_lower:
        total_energy = sum(s.energy_usage for s in sectors)
        highest_energy = max(sectors, key=lambda s: s.energy_usage)
        reply = (f"Total city energy usage is {round(total_energy, 1)} units. "
                 f"{highest_energy.sector_name} is the top consumer using {highest_energy.energy_usage} units. "
                 f"Monitoring peak loads in this sector is highly recommended.")
        return ChatResponse(reply=reply)
        
    # 5. Risk / Alerts / Invest
    if "risk" in message_lower or "alert" in message_lower or "critical" in message_lower or "invest" in message_lower:
        critical_sectors = [s for s in sectors if s.traffic > 85 or s.aqi > 150 or s.infrastructure_health < 60]
        if critical_sectors:
            names = ", ".join(s.sector_name for s in critical_sectors)
            reply = (f"I am tracking critical risks in {len(critical_sectors)} sector(s): {names}. "
                     "These areas require immediate intervention or investment for traffic, air quality, or infrastructure issues.")
        else:
            worst_infra = min(sectors, key=lambda s: s.infrastructure_health)
            reply = (f"Currently, there are no critical risks detected. All systems are operating within normal parameters. "
                     f"However, for long-term investment, consider infrastructure upgrades in {worst_infra.sector_name}.")
        return ChatResponse(reply=reply)

    # 6. Future / Simulation
    if "future" in message_lower or "scenario" in message_lower or "simulation" in message_lower or "happen" in message_lower or "ev" in message_lower:
        reply = ("I can run simulations for future scenarios, such as increasing EV adoption or adding green cover. "
                 "If EV adoption reaches 60%, our models project an 18% decrease in overall AQI and a significant reduction in noise levels in urban corridors.")
        return ChatResponse(reply=reply)
        
    # 7. Fallback / General
    avg_traffic = _avg([s.traffic for s in sectors])
    avg_aqi = _avg([s.aqi for s in sectors])
    reply = (f"I'm monitoring NeuroCity in real-time. Currently, average traffic is {avg_traffic} and AQI is {avg_aqi}. "
             "You can ask me specific questions about traffic, air quality, infrastructure, energy, or risks.")
    return ChatResponse(reply=reply)
