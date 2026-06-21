import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Play, RotateCcw, Sparkles } from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/neuro/SectionHeader";

export const Route = createFileRoute("/simulations")({
  head: () => ({ meta: [{ title: "Simulations · NeuroCity" }] }),
  component: SimPage,
});

function SimPage() {
  const [pop, setPop] = useState(15);
  const [ev, setEv] = useState(35);
  const [metro, setMetro] = useState(20);
  const [renew, setRenew] = useState(40);
  const [climate, setClimate] = useState(30);
  const [budget, setBudget] = useState(50);

  const results = useMemo(() => {
    const traffic = Math.round(60 + pop * 0.8 - ev * 0.4 - metro * 0.6);
    const aqi = Math.round(120 + pop * 0.6 - ev * 0.5 - renew * 0.4 + climate * 0.3);
    const energy = Math.round(4.2 * (1 + pop / 100) * (1 + ev / 200));
    const carbon = Math.round(420 - renew * 1.2 - ev * 0.6 + pop * 0.3);
    const budgetImpact = Math.round(budget * 1.4 + metro * 0.7);
    const stress = Math.round(50 + pop * 0.7 + climate * 0.4 - metro * 0.3);
    return { traffic, aqi, energy, carbon, budgetImpact, stress };
  }, [pop, ev, metro, renew, climate, budget]);

  const reset = () => {
    setPop(15); setEv(35); setMetro(20); setRenew(40); setClimate(30); setBudget(50);
  };

  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <PageHeader
        title="Scenario simulator"
        subtitle="Model the future of the city. Adjust the levers and watch the impacts update live."
        action={
          <div className="flex items-center gap-2">
            <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium hover:bg-secondary">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background hover:opacity-90">
              <Play className="h-3.5 w-3.5" /> Run simulation
            </button>
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
        <div className="card-surface p-6">
          <SectionHeader eyebrow="Control panel" title="Levers" />
          <div className="mt-5 space-y-5">
            <Slider label="Population growth" value={pop} setValue={setPop} unit="%" />
            <Slider label="EV adoption" value={ev} setValue={setEv} unit="%" />
            <Slider label="Metro expansion" value={metro} setValue={setMetro} unit="km" />
            <Slider label="Renewable energy" value={renew} setValue={setRenew} unit="%" />
            <Slider label="Climate stress" value={climate} setValue={setClimate} unit="idx" />
            <Slider label="Infra investment" value={budget} setValue={setBudget} unit="₹Cr" />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Green city 2030", "Mega-event surge", "Monsoon resilience", "EV-first"].map((p) => (
              <button key={p} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground">
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-surface p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" style={{ color: "var(--color-ai)" }} />
              <h3 className="text-sm font-semibold">Predicted impact</h3>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
              <ImpactCard label="Traffic index" value={results.traffic} suffix="" tone="var(--color-traffic)" />
              <ImpactCard label="AQI" value={results.aqi} suffix="" tone="var(--color-environment)" />
              <ImpactCard label="Energy demand" value={results.energy} suffix=" GW" tone="var(--color-ai)" />
              <ImpactCard label="Carbon" value={results.carbon} suffix=" ppm" tone="var(--color-info)" />
              <ImpactCard label="Budget" value={results.budgetImpact} suffix=" ₹Cr" tone="var(--color-infrastructure)" />
              <ImpactCard label="Population stress" value={results.stress} suffix="" tone="var(--color-risk)" />
            </div>
          </div>

          <div className="card-surface p-6">
            <h3 className="text-sm font-semibold">AI narrative</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              With <strong className="text-foreground">{pop}%</strong> population growth and{" "}
              <strong className="text-foreground">{ev}%</strong> EV adoption, the city absorbs{" "}
              <strong className="text-foreground">{results.energy} GW</strong> peak demand. Metro
              expansion of <strong className="text-foreground">{metro} km</strong> reduces commute
              times by ~{Math.max(0, Math.round(metro * 0.4))}%, while renewables at{" "}
              <strong className="text-foreground">{renew}%</strong> bring carbon down to{" "}
              <strong className="text-foreground">{results.carbon} ppm</strong>. Overall outlook:{" "}
              <span style={{ color: results.stress > 75 ? "var(--color-risk)" : "var(--color-success)" }}>
                {results.stress > 75 ? "high stress, intervention required" : "manageable, on path"}
              </span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, setValue, unit }: { label: string; value: number; setValue: (n: number) => void; unit: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="font-mono text-xs text-muted-foreground">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="mt-2 w-full accent-foreground"
      />
    </div>
  );
}

function ImpactCard({ label, value, suffix, tone }: { label: string; value: number; suffix: string; tone: string }) {
  return (
    <div className="rounded-xl border border-border bg-background/60 p-4 transition-all">
      <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight" style={{ color: tone }}>
        {value}
        <span className="text-sm text-muted-foreground">{suffix}</span>
      </div>
    </div>
  );
}
