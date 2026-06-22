from fastapi import APIRouter

from models.city import ChatRequest, ChatResponse
from services.chat_service import process_chat

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def chat_endpoint(request: ChatRequest):
    """
    Process a chat message and return an AI-generated response
    based on real-time city data.
    """
    return process_chat(request.message)
