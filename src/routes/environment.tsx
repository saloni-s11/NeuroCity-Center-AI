import { createFileRoute } from "@tanstack/react-router";
import { CloudRain, Droplets, Leaf, Sun, Wind } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, SectionHeader } from "@/components/neuro/SectionHeader";
import { KpiCard } from "@/components/neuro/KpiCard";

export const Route = createFileRoute("/environment")({
  head: () => ({ meta: [{ title: "Environment · NeuroCity" }] }),
  component: EnvPage,
});

const aqi = Array.from({ length: 14 }, (_, i) => ({ d: `D${i + 1}`, v: Math.round(90 + Math.sin(i / 2) * 25 + Math.random() * 10) }));

const hotspots = [
  { name: "Sector 3 · Industrial", v: 168, c: "var(--color-risk)" },
  { name: "Andheri East", v: 142, c: "var(--color-traffic)" },
  { name: "Mulund West", v: 121, c: "var(--color-traffic)" },
  { name: "Powai", v: 96, c: "var(--color-environment)" },
];

function EnvPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <PageHeader title="Environment" subtitle="Air quality, temperature, emissions, and risk monitoring." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="City AQI" value="118" delta={-3.4} trend={aqi.map((a) => a.v)} icon={Wind} tone="environment" status="Unhealthy" />
        <KpiCard label="Temperature" value="32°" delta={1.6} trend={[28,29,30,31,31,32,32]} icon={Sun} tone="traffic" />
        <KpiCard label="Humidity" value="74%" delta={-2.1} trend={[78,76,75,74,74,73,74]} icon={CloudRain} tone="info" />
        <KpiCard label="Carbon" value="412" unit="ppm" delta={0.4} trend={[408,409,410,411,411,412,412]} icon={Leaf} tone="ai" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        <div className="card-surface p-5">
          <SectionHeader eyebrow="14-day forecast" title="Air quality trend" description="PM2.5 µg/m³ — AI-corrected sensor network." />
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={aqi} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="aq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-environment)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-environment)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }} />
                <Area type="monotone" dataKey="v" stroke="var(--color-environment)" strokeWidth={2.5} fill="url(#aq)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-surface p-5">
          <SectionHeader eyebrow="Today" title="Pollution hotspots" />
          <ul className="mt-4 space-y-3">
            {hotspots.map((h) => (
              <li key={h.name} className="flex items-center justify-between rounded-xl border border-border bg-background/60 p-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ backgroundColor: `color-mix(in oklab, ${h.c} 14%, transparent)`, color: h.c }}>
                    <Droplets className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-sm font-medium">{h.name}</div>
                    <div className="text-[11px] text-muted-foreground">PM2.5</div>
                  </div>
                </div>
                <div className="text-lg font-semibold" style={{ color: h.c }}>{h.v}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { t: "Risk · Heatwave", body: "37°C peak forecast Friday. Elder advisory recommended.", c: "var(--color-risk)" },
          { t: "Risk · PM2.5 spike", body: "Sector 3 to exceed 160 µg/m³ Thursday afternoon.", c: "var(--color-traffic)" },
          { t: "Opportunity", body: "Rain forecast Sunday — AQI to drop to 78.", c: "var(--color-success)" },
        ].map((r) => (
          <div key={r.t} className="card-surface p-5">
            <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: r.c }}>
              {r.t}
            </div>
            <p className="mt-2 text-sm text-foreground">{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
