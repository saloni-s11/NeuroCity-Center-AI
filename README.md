# Technical Documentation 

## 1. Project Overview

### Project Name
**NeuroCity Center AI**

### Tagline
AI-Powered Smart City Command Center & Digital Twin Platform

### Problem Statement
Modern smart cities generate massive amounts of siloed data across traffic, environmental, and infrastructure domains. City planners and emergency responders lack a unified, intelligent interface to monitor real-time health, predict infrastructural bottlenecks, and make rapid, data-driven decisions during critical events.

### Solution
NeuroCity acts as a centralized Urban AI OS. It ingests complex, simulated real-time data to create a living "Digital Twin" of the city. Using an intelligent backend engine, it calculates comprehensive health scores, flags emerging risks, runs predictive "what-if" simulations, and provides an interactive conversational AI Assistant.

---

## 2. Key Features

### Module 1: Dashboard
* Live KPIs (City Health, Active Alerts)
* Sector Health Status
* AI Insights

### Module 2: Digital Twin
* Real-time metrics per sector
* Cross-domain monitoring

### Module 3: Traffic Intelligence
* Congestion Analysis & Heatmaps
* Route Optimization Recommendations
* Predictive Forecast Models

### Module 4: Environmental Monitoring
* AQI Tracking & Pollution Breakdowns
* 14-Day Trends
* Risk Assessment & Hotspots

### Module 5: Sustainability
* Unified City Health Score
* Environmental Metrics (ESG)
* Peer-City Benchmarking

### Module 6: Simulation Engine
* Population Growth scenarios
* EV Adoption impact
* Renewable Energy implementation

### Module 7: AI Narration
* Automated Executive City Briefings
* Prioritized Actionable Recommendations

### Module 8: AI Chat & Assistant
* Keyword-driven NLP engine
* Real-time chat interface for querying city data dynamically

### Module 9: Timeline Engine
* 15-Year Future Projections
* Scenario Comparison
* Milestone generation

---

## 3. Architecture

### Frontend
* React
* TypeScript
* Tailwind CSS
* TanStack Router & Query

### Backend
* FastAPI
* Python
* Pydantic

### Data Flow
```text
User
 ↓
Frontend (React + Vite)
 ↓
FastAPI REST APIs
 ↓
Services Layer (Logic & AI Mock Engines)
 ↓
Data Models (JSON Simulation Store)
 ↓
Response
```

---

## 4. Technology Stack

| Layer           | Technology   |
| --------------- | ------------ |
| Frontend        | React 18     |
| Backend         | FastAPI      |
| Language        | Python / TypeScript |
| Styling         | Tailwind CSS |
| Visualization   | Recharts     |
| Routing/State   | TanStack     |
| Version Control | Git/GitHub   |

---

## 5. Implementation Details

### Frontend
* Component-based architecture
* File-based routing via TanStack Router
* Server-state caching via TanStack Query
* Responsive, dark-mode-first cyberpunk UI

### Backend
* Asynchronous REST APIs using Uvicorn
* Service Layer handling complex cross-domain mathematical aggregations
* Strict typing via Pydantic Models

---

## 6. APIs Used

| Endpoint              | Purpose            |
| --------------------- | ------------------ |
| `/dashboard`          | Aggregate Dashboard Data |
| `/traffic`            | Traffic Analytics & Routing |
| `/environment`        | Environmental Data & AQI |
| `/simulation/run`     | Run Predictive Simulations |
| `/timeline/projections` | Future Forecast Trajectories |
| `/chat`               | Interactive Chat Assistant |
| `/narration`          | Executive AI Summaries |

---

## 7. User Workflow

1. Open Dashboard
2. View high-level City KPIs and Active Alerts
3. Analyze deep-dive metrics via Traffic & Environment tabs
4. Check ESG benchmarking on the Sustainability Score page
5. Run "what-if" policy Simulations (e.g. EV Adoption)
6. Ask the AI Assistant specific operational questions
7. Explore multi-decade planning on the Future Timeline

---

## 8. Challenges & Solutions

| Challenge                 | Solution             |
| ------------------------- | -------------------- |
| Managing Multiple Modules | Highly decoupled Service Architecture |
| Large Data State Mgt.     | TanStack Query for optimal caching |
| Fast NLP Chatbot Querying | Backend rule-based heuristic engine |
| Normalizing Health Scores | Custom weighted algorithms in backend |

---

## 9. Current Limitations

* Operates on static JSON files acting as a simulated database.
* AI Assistant is powered by heuristic/keyword logic rather than a true external LLM (to prioritize speed and reliability for the demo).
* No live hardware/IoT sensor integration.

---

## 10. Future Scope

* Real-time MQTT sensor integration
* Open-source local LLM (like Llama 3) for advanced unstructured conversational querying
* GIS map integration for exact coordinate plotting
* Citizen-facing mobile app for public advisories
* Automated predictive governance tools

---

## 11. Links

Repository Link:
`https://github.com/saloni-s11/NeuroCity.git`

