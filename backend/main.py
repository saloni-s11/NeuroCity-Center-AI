from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import json

app = FastAPI(
    title="NeuroCity AI Backend"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "NeuroCity Backend Running"
    }

@app.get("/dashboard")
def dashboard():

    with open("data/city_state.json", "r") as file:
        sectors = json.load(file)

    return {
        "city": "NeuroCity",
        "sectors": sectors
    }