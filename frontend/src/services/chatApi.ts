import { ChatRequest, ChatResponse } from "../types/city";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function sendChatMessage(message: string): Promise<ChatResponse> {
  const res = await fetch(`${BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });
  
  if (!res.ok) {
    throw new Error(`API /chat failed: ${res.status} ${res.statusText}`);
  }
  
  return res.json() as Promise<ChatResponse>;
}
