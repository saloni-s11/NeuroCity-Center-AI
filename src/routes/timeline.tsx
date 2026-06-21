import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader } from "@/components/neuro/SectionHeader";

export const Route = createFileRoute("/timeline")({
  head: () => ({ meta: [{ title: "Timeline Explorer · NeuroCity" }] }),
  component: TimelinePage,
});

const YEARS = Array.from({ length: 10 }, (_, i) => 2026 + i);

function projection(year: number) {
  const t = (year - 2026) / 9;
  return {
    population: Math.round(20.4 + t * 6.8),
    infra: Math.round(72 + t * 18),
    traffic: Math.round(62 + t * 16 - t * t * 12),
    pollution: Math.round(120 - t * 28 + t * t * 8),
    energy: Math.round(42 + t * 24),
  };
}

function TimelinePage() {
  const [year, setYear] = useState(2030);
  const data = useMemo(() => YEARS.map((y) => ({ y, ...projection(y) })), []);
  const v = projection(year);

  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <PageHeader title="Timeline Explorer" subtitle="Drag the timeline. Watch the city of tomorrow take shape." />

      <div className="card-surface p-6">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Viewing year</div>
            <div className="mt-1 text-5xl font-semibold tracking-tight">{year}</div>
          </div>
          <div className="text-right text-xs text-muted-foreground">
            Scenario: Baseline · Climate + Investment
          </div>
        </div>

        <div className="mt-6">
          <input
            type="range"
            min={2026}
            max={2035}
            step={1}
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full accent-foreground"
          />
          <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
            {YEARS.map((y) => (
              <span key={y} className={y === year ? "font-semibold text-foreground" : ""}>
                {y}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          <Stat label="Population" value={`${v.population}M`} tone="var(--color-infrastructure)" />
          <Stat label="Infra score" value={`${v.infra}`} tone="var(--color-success)" />
          <Stat label="Traffic idx" value={`${v.traffic}`} tone="var(--color-traffic)" />
          <Stat label="Pollution" value={`${v.pollution}`} tone="var(--color-environment)" />
          <Stat label="Energy" value={`${v.energy} GW`} tone="var(--color-ai)" />
        </div>
      </div>

      <div className="card-surface p-6">
        <h3 className="text-sm font-semibold">Long-term projection · 2026 → 2035</h3>
        <div className="mt-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 6, right: 6, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-ai)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-ai)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="tt" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-traffic)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--color-traffic)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="y" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10, fontSize: 12 }} />
              <Area type="monotone" dataKey="infra" stroke="var(--color-ai)" strokeWidth={2.5} fill="url(#tp)" name="Infra" />
              <Area type="monotone" dataKey="traffic" stroke="var(--color-traffic)" strokeWidth={2.5} fill="url(#tt)" name="Traffic" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-4">
      <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight" style={{ color: tone }}>{value}</div>
    </div>
  );
}
