import { createFileRoute } from "@tanstack/react-router";
import { Activity, Clock, Navigation, Route as RouteIcon } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, SectionHeader } from "@/components/neuro/SectionHeader";
import { KpiCard } from "@/components/neuro/KpiCard";

export const Route = createFileRoute("/traffic")({
  head: () => ({ meta: [{ title: "Traffic Intelligence · NeuroCity" }] }),
  component: TrafficPage,
});

const peakHour = Array.from({ length: 24 }, (_, h) => ({
  h: `${h}:00`,
  v: Math.round(20 + 40 * Math.exp(-Math.pow((h - 9) / 3, 2)) + 50 * Math.exp(-Math.pow((h - 18) / 2.5, 2)) + Math.random() * 6),
}));

const bottlenecks = [
  { name: "Western Express Hwy ↔ Bandra", load: 92, eta: "+18 min" },
  { name: "Eastern Freeway · Wadala", load: 84, eta: "+12 min" },
  { name: "Sion Junction", load: 78, eta: "+9 min" },
  { name: "LBS Marg · Ghatkopar", load: 71, eta: "+7 min" },
];

function TrafficPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <PageHeader title="Traffic Intelligence" subtitle="Real-time congestion, peak analysis, and recommended reroutes." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Average speed" value="28" unit="km/h" delta={-4.1} trend={[32,30,29,29,28,27,28,28]} icon={Activity} tone="traffic" />
        <KpiCard label="Congestion index" value="62" delta={3.2} trend={[55,57,58,60,61,62,62]} icon={Navigation} tone="risk" />
        <KpiCard label="Avg commute" value="42" unit="min" delta={2.1} trend={[38,39,40,41,41,42,42]} icon={Clock} tone="ai" />
        <KpiCard label="Active reroutes" value="14" delta={12} trend={[6,8,9,10,12,13,14]} icon={RouteIcon} tone="info" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="card-surface p-5">
          <SectionHeader eyebrow="Today" title="Peak hour analysis" description="Vehicles flow rate across all monitored corridors." />
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHour} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="h" stroke="var(--color-muted-foreground)" fontSize={10} tickLine={false} axisLine={false} interval={2} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }} />
                <Bar dataKey="v" fill="var(--color-traffic)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-surface p-5">
          <SectionHeader eyebrow="Bottlenecks" title="Top congested corridors" />
          <ul className="mt-4 space-y-3">
            {bottlenecks.map((b) => (
              <li key={b.name} className="rounded-xl border border-border bg-background/60 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{b.name}</span>
                  <span className="text-xs text-muted-foreground">{b.eta}</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${b.load}%`,
                      background: "linear-gradient(90deg, var(--color-traffic), var(--color-risk))",
                    }}
                  />
                </div>
                <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
                  <span>Load</span>
                  <span>{b.load}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card-surface p-5">
        <SectionHeader eyebrow="AI" title="Recommended alternate routes" description="Generated for the next 60 minutes." />
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            { from: "Andheri", to: "BKC", save: "−14 min", via: "via JVLR & Santacruz Link" },
            { from: "Thane", to: "Dadar", save: "−9 min", via: "via Eastern Freeway" },
            { from: "Worli", to: "Lower Parel", save: "−6 min", via: "via Annie Besant Rd" },
          ].map((r) => (
            <div key={r.from + r.to} className="rounded-xl border border-border bg-background/60 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">
                  {r.from} → {r.to}
                </span>
                <span
                  className="rounded-md px-2 py-0.5 text-xs font-semibold"
                  style={{
                    backgroundColor: "color-mix(in oklab, var(--color-success) 14%, transparent)",
                    color: "var(--color-success)",
                  }}
                >
                  {r.save}
                </span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{r.via}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
