from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.dashboard import router as dashboard_router
from routes.digital_twin import router as digital_twin_router
from routes.traffic import router as traffic_router
from routes.environment import router as environment_router

app = FastAPI(
    title="NeuroCity AI Backend",
    description="Real-time city command center API powering the NeuroCity digital twin dashboard.",
    version="2.0.0",
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
    return {"message": "NeuroCity Backend Running", "version": "2.0.0"}


# Dashboard routes: /dashboard, /metrics, /alerts, /insights, /summary
app.include_router(dashboard_router)

# Digital Twin routes: /digital-twin, /digital-twin/metrics, /digital-twin/predictions
app.include_router(digital_twin_router)

# Traffic Intelligence routes: /traffic, /traffic/kpis, /traffic/hotspots,
#                               /traffic/routes, /traffic/forecast
app.include_router(traffic_router)

# Environment Intelligence routes: /environment/overview, /hotspots, /trends, /risks, /forecast
app.include_router(environment_router)
