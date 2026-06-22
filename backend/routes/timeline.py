from fastapi import APIRouter
from typing import List

from models.city import (
    Milestone,
    ScenarioComparison,
    TimelineProjection,
)
from services.timeline_service import (
    get_milestones,
    get_projections,
    get_scenarios,
)

router = APIRouter(prefix="/timeline", tags=["timeline"])


@router.get("/projections", response_model=TimelineProjection)
def timeline_projections():
    """
    Full multi-year projections (2026–2040) for population, infrastructure,
    traffic, pollution, energy, sustainability, EV adoption, renewable mix,
    and green cover. Baseline scenario.
    """
    return get_projections()


@router.get("/scenarios", response_model=ScenarioComparison)
def timeline_scenarios():
    """
    Comparative scenario view: Baseline vs Green Investment vs Climate Stress.
    Each scenario includes full year-by-year metric projections.
    """
    return get_scenarios()


@router.get("/milestones", response_model=List[Milestone])
def timeline_milestones():
    """
    Key projected milestone events on the city timeline.
    Auto-generated from projection data — population, EV, renewable,
    infrastructure, and sustainability targets.
    """
    return get_milestones()
