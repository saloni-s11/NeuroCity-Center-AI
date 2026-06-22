from fastapi import APIRouter
from typing import List

from models.city import (
    NarrationBriefing,
    NarrationRecommendation,
)
from services.narration_service import (
    get_briefing,
    get_recommendations,
)

router = APIRouter(prefix="/narration", tags=["narration"])


@router.get("/briefing", response_model=NarrationBriefing)
def narration_briefing():
    """
    Executive briefing with AI-generated city-wide synthesis,
    trend explanations in plain language, key risks, and opportunities.
    """
    return get_briefing()


@router.get("/recommendations", response_model=List[NarrationRecommendation])
def narration_recommendations():
    """
    Ranked AI recommendations with impact/confidence scores,
    priority levels, and estimated benefits.
    Sorted by composite impact × confidence score (highest first).
    """
    return get_recommendations()
