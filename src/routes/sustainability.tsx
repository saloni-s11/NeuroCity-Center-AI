import { createFileRoute } from "@tanstack/react-router";
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import { PageHeader, SectionHeader } from "@/components/neuro/SectionHeader";

export const Route = createFileRoute("/sustainability")({
  head: () => ({ meta: [{ title: "Sustainability · NeuroCity" }] }),
  component: SustainabilityPage,
});

const scores = [
  { label: "Environmental", v: 82, c: "var(--color-environment)" },
  { label: "Mobility", v: 71, c: "var(--color-traffic)" },
  { label: "Resource efficiency", v: 76, c: "var(--color-info)" },
  { label: "Infrastructure", v: 88, c: "var(--color-infrastructure)" },
];

function Ring({ value, color }: { value: number; color: string }) {
  const data = [{ name: "v", value, fill: color }];
  return (
    <div className="relative h-32 w-32">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart data={data} startAngle={90} endAngle={-270} innerRadius="78%" outerRadius="100%">
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={12} background={{ fill: "var(--color-secondary)" }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div className="text-2xl font-semibold tracking-tight">{value}</div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground">/ 100</div>
        </div>
      </div>
    </div>
  );
}

function SustainabilityPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <PageHeader title="Sustainability" subtitle="A composite view of how the city is performing for its future." />

      <div className="card-surface relative overflow-hidden p-8">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(closest-side, color-mix(in oklab, var(--color-environment) 35%, transparent), transparent)" }}
        />
        <div className="relative flex flex-wrap items-center gap-8">
          <Ring value={79} color="var(--color-environment)" />
          <div className="min-w-0">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Overall sustainability
            </div>
            <h2 className="mt-1 text-3xl font-semibold tracking-tight">Mumbai scores 79 / 100</h2>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Ahead of 62% of comparable megacities. Key opportunity:{" "}
              <span className="text-foreground font-medium">mobility</span> — driven by EV adoption
              lag and last-mile connectivity gaps.
            </p>
          </div>
        </div>
      </div>

      <SectionHeader eyebrow="Pillars" title="Score breakdown" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {scores.map((s) => (
          <div key={s.label} className="card-surface flex flex-col items-center p-5">
            <Ring value={s.v} color={s.c} />
            <div className="mt-3 text-sm font-semibold">{s.label}</div>
            <div className="mt-1 text-[11px] text-muted-foreground">
              vs benchmark {s.v >= 80 ? "+8" : s.v >= 75 ? "+2" : "−4"}
            </div>
          </div>
        ))}
      </div>

      <div className="card-surface p-6">
        <SectionHeader eyebrow="Benchmarks" title="Peer comparison" />
        <div className="mt-4 space-y-3">
          {[
            ["Mumbai", 79, "var(--color-environment)"],
            ["Singapore", 91, "var(--color-info)"],
            ["Copenhagen", 88, "var(--color-success)"],
            ["Bengaluru", 74, "var(--color-traffic)"],
            ["Delhi", 61, "var(--color-risk)"],
          ].map(([n, v, c]) => (
            <div key={n as string}>
              <div className="flex justify-between text-xs">
                <span className="font-medium">{n}</span>
                <span className="text-muted-foreground">{v}/100</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-secondary">
                <div className="h-full rounded-full" style={{ width: `${v}%`, background: c as string }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
