import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Brain,
  Building2,
  Droplets,
  Gauge,
  Leaf,
  Sparkles,
  TrendingUp,
  Users,
  Wind,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { KpiCard } from "@/components/neuro/KpiCard";
import { SectionHeader } from "@/components/neuro/SectionHeader";

interface Sector {
  sector_id: string;
  sector_name: string;
  traffic: number;
  aqi: number;
  energy_usage: number;
  population: number;
  infrastructure_health: number;
}

interface DashboardResponse {
  city: string;
  sectors: Sector[];
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview · NeuroCity" },
      { name: "description", content: "Executive overview of city health, sustainability, and AI insights." },
    ],
  }),
  component: OverviewPage,
});

const trafficTrend = Array.from({ length: 24 }, (_, i) =>
  Math.round(40 + 30 * Math.sin(i / 3) + Math.random() * 6),
);

const cityTrend = [
  { t: "Mon", health: 82, sust: 71 },
  { t: "Tue", health: 84, sust: 72 },
  { t: "Wed", health: 83, sust: 74 },
  { t: "Thu", health: 86, sust: 75 },
  { t: "Fri", health: 85, sust: 77 },
  { t: "Sat", health: 87, sust: 78 },
  { t: "Sun", health: 86, sust: 79 },
];

const insights = [
  {
    title: "Traffic congestion projected to rise 14% in Downtown",
    body: "Construction on MG Road combined with commuter peaks will worsen midweek congestion. Reroute via Ring Road for relief.",
    tone: "var(--color-traffic)",
    tag: "Traffic",
    confidence: 92,
  },
  {
    title: "Air quality deterioration expected in Sector 3",
    body: "PM2.5 forecast to exceed 95 µg/m³ on Thursday. Recommend issuing advisory and activating sprinkler grid.",
    tone: "var(--color-environment)",
    tag: "Environment",
    confidence: 88,
  },
  {
    title: "Metro expansion could cut congestion by 11%",
    body: "Simulated extension of the Blue Line to Whitefield reduces peak-hour vehicle inflow by an estimated 11.2%.",
    tone: "var(--color-ai)",
    tag: "Scenario",
    confidence: 81,
  },
];

function OverviewPage() {
  const [dashboardData, setDashboardData] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch("http://localhost:8000/dashboard")
      .then((res) => res.json())
      .then((data) => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return (
      <div className="p-10">
        Loading NeuroCity...
      </div>
    );
  }

  const avgTraffic = dashboardData
    ? Math.round(
        dashboardData.sectors.reduce(
          (sum, sector) => sum + sector.traffic,
          0
        ) / dashboardData.sectors.length
      )
    : 0;

  const avgAQI = dashboardData
    ? Math.round(
        dashboardData.sectors.reduce(
          (sum, sector) => sum + sector.aqi,
          0
        ) / dashboardData.sectors.length
      )
    : 0;

  console.log(dashboardData);
  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      {/* Welcome */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8 shadow-[var(--shadow-soft)]">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--color-ai) 35%, transparent), transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--color-info) 30%, transparent), transparent)",
          }}
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Tuesday · 21 June 2026
            </div>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
              Good morning, City Administrator
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
              Mumbai is operating at <span className="font-medium text-foreground">86 / 100</span>{" "}
              health. Three opportunities and one risk require your attention today.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatPill
                label="City Health"
                value="86"
                tone="var(--color-success)"
                icon={Gauge}
              />
              <StatPill
                label="Sustainability"
                value="79"
                tone="var(--color-environment)"
                icon={Leaf}
              />
              <StatPill
                label="Active Alerts"
                value="7"
                tone="var(--color-risk)"
                icon={AlertTriangle}
              />
              <StatPill
                label="AI Confidence"
                value="94%"
                tone="var(--color-ai)"
                icon={Sparkles}
              />
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background/60 p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-medium">City vital signs</div>
              <div className="text-[11px] text-muted-foreground">Past 7 days</div>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cityTrend} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-ai)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-ai)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gs" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-environment)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="var(--color-environment)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="t" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} domain={[60, 100]} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  />
                  <Area type="monotone" dataKey="health" stroke="var(--color-ai)" strokeWidth={2} fill="url(#gh)" name="Health" />
                  <Area type="monotone" dataKey="sust" stroke="var(--color-environment)" strokeWidth={2} fill="url(#gs)" name="Sustainability" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <section className="space-y-4">
        <SectionHeader
          eyebrow="Live signals"
          title="City performance"
          description="Real-time indicators across mobility, environment, and infrastructure."
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KpiCard label="Traffic Index" value={String(avgTraffic)} delta={4.2} trend={trafficTrend} icon={Activity} tone="traffic" status="Moderate" />
          <KpiCard label="AQI" value={String(avgAQI)} delta={-3.1} trend={[120,124,118,115,119,121,118,114,118]} icon={Wind} tone="environment" status="Unhealthy" />
          <KpiCard label="Energy Demand" value="4.2" unit="GW" delta={2.8} trend={[3.8,3.9,4.0,4.1,4.0,4.2,4.2,4.3,4.2]} icon={Zap} tone="ai" status="Peak" />
          <KpiCard label="Water Usage" value="612" unit="ML" delta={-1.4} trend={[640,634,628,625,620,618,615,612]} icon={Droplets} tone="info" status="Normal" />
          <KpiCard label="Infra Health" value="91%" delta={0.6} trend={[88,89,90,90,91,91,91,92,91]} icon={Building2} tone="success" status="Stable" />
          <KpiCard label="Population Δ" value="1.8%" delta={0.3} trend={[1.5,1.55,1.6,1.65,1.7,1.75,1.78,1.8]} icon={Users} tone="infrastructure" status="Forecast" />
        </div>
      </section>

      {/* AI Insights */}
      <section className="space-y-4">
        <SectionHeader
          eyebrow="AI Urban Intelligence"
          title="What the city is telling you"
          description="Generated insights ranked by impact and confidence."
          action={
            <button className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-secondary">
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          }
        />
        <div className="grid gap-4 lg:grid-cols-3">
          {insights.map((i) => (
            <article
              key={i.title}
              className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]"
            >
              <div
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: i.tone }}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="grid h-7 w-7 place-items-center rounded-lg"
                    style={{
                      backgroundColor: `color-mix(in oklab, ${i.tone} 15%, transparent)`,
                      color: i.tone,
                    }}
                  >
                    <Brain className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    {i.tag}
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground">{i.confidence}% conf.</span>
              </div>
              <h3 className="mt-3 text-base font-semibold leading-snug">{i.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.body}</p>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
                <span className="text-muted-foreground">Generated 12m ago</span>
                <button className="font-medium text-foreground hover:underline">Investigate →</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Forecast strip */}
      <section className="grid gap-4 lg:grid-cols-3">
        <div className="card-surface p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Forecast
              </div>
              <h3 className="mt-1 text-lg font-semibold">7-day energy demand projection</h3>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-foreground" /> Actual
              <span className="ml-3 h-2 w-2 rounded-full" style={{ background: "var(--color-ai)" }} /> Forecast
            </div>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={Array.from({ length: 14 }, (_, i) => ({
                  d: `D${i + 1}`,
                  actual: i < 7 ? 3.8 + Math.sin(i) * 0.3 + 0.2 * i / 7 : null,
                  forecast: i >= 6 ? 4.0 + Math.sin(i) * 0.3 + 0.18 * (i - 6) : null,
                }))}
                margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
              >
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }} />
                <Legend wrapperStyle={{ display: "none" }} />
                <Line type="monotone" dataKey="actual" stroke="var(--color-foreground)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="forecast" stroke="var(--color-ai)" strokeDasharray="5 4" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-surface p-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Top recommendations</h3>
          </div>
          <ul className="mt-3 space-y-3">
            {[
              { p: "High", t: "Deploy water sprinklers in Sector 3 by 06:00", c: "var(--color-risk)" },
              { p: "Med", t: "Reroute 14 BEST bus lines via Ring Road", c: "var(--color-traffic)" },
              { p: "Med", t: "Pre-cool substations ahead of 38°C peak", c: "var(--color-ai)" },
              { p: "Low", t: "Schedule pothole repair on AB Road", c: "var(--color-infrastructure)" },
            ].map((r) => (
              <li key={r.t} className="flex items-start gap-3 rounded-lg border border-border bg-background/60 p-3">
                <span
                  className="mt-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-semibold"
                  style={{ backgroundColor: `color-mix(in oklab, ${r.c} 15%, transparent)`, color: r.c }}
                >
                  {r.p}
                </span>
                <span className="text-sm">{r.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

function StatPill({
  label,
  value,
  tone,
  icon: Icon,
}: {
  label: string;
  value: string;
  tone: string;
  icon: typeof Gauge;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span
          className="grid h-7 w-7 place-items-center rounded-lg"
          style={{
            backgroundColor: `color-mix(in oklab, ${tone} 14%, transparent)`,
            color: tone,
          }}
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
        <span className="text-[11px] font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}
