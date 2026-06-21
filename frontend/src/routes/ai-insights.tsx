import { createFileRoute } from "@tanstack/react-router";
import { Brain, ShieldAlert, Sparkles, TrendingUp } from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/neuro/SectionHeader";

export const Route = createFileRoute("/ai-insights")({
  head: () => ({ meta: [{ title: "AI Insights · NeuroCity" }] }),
  component: AIPage,
});

const recs = [
  {
    title: "Activate sprinkler grid in Sector 3",
    body: "PM2.5 forecast to exceed 160 µg/m³ for 6 hours. Sprinklers + traffic diversion reduce exposure by 38%.",
    priority: "Critical",
    impact: 92,
    confidence: 94,
    tone: "var(--color-risk)",
    icon: ShieldAlert,
  },
  {
    title: "Pre-cool transformers T-44 to T-49",
    body: "Forecast 38°C peak Thursday. Pre-cooling prevents projected 2.1% load shedding.",
    priority: "High",
    impact: 78,
    confidence: 88,
    tone: "var(--color-traffic)",
    icon: TrendingUp,
  },
  {
    title: "Extend Blue Line metro to Whitefield",
    body: "Capex ₹2,400 Cr · Reduces peak traffic by 11.2% · 4.2-year payback at current ridership growth.",
    priority: "Strategic",
    impact: 86,
    confidence: 81,
    tone: "var(--color-ai)",
    icon: Brain,
  },
  {
    title: "Subsidise rooftop solar in H-Ward",
    body: "Adds 220 MW renewable capacity by 2028 and cuts carbon by 4.8%. ROI positive in year 6.",
    priority: "Policy",
    impact: 70,
    confidence: 79,
    tone: "var(--color-environment)",
    icon: Sparkles,
  },
];

function AIPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <PageHeader title="AI Insights" subtitle="Ranked recommendations from the urban reasoning engine." />

      <div className="grid gap-4 md:grid-cols-2">
        {recs.map((r) => (
          <article key={r.title} className="card-surface p-6">
            <div className="flex items-center justify-between">
              <span
                className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold"
                style={{ backgroundColor: `color-mix(in oklab, ${r.tone} 14%, transparent)`, color: r.tone }}
              >
                <r.icon className="h-3 w-3" /> {r.priority}
              </span>
              <span className="text-[11px] text-muted-foreground">Updated 8m ago</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold leading-snug">{r.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Meter label="Impact" value={r.impact} color={r.tone} />
              <Meter label="Confidence" value={r.confidence} color="var(--color-ai)" />
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs hover:bg-secondary">
                Dismiss
              </button>
              <button className="rounded-lg bg-foreground px-3 py-1.5 text-xs font-semibold text-background hover:opacity-90">
                Approve action
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="card-surface p-6">
        <SectionHeader eyebrow="Narrative engine" title="Executive briefing" description="Charts translated into plain language for decision makers." />
        <div className="mt-4 space-y-3">
          {[
            "Air quality is expected to worsen in northern districts over the next seven days, with PM2.5 likely to peak Thursday afternoon.",
            "Traffic congestion around the commercial district is likely due to construction activity coinciding with morning commuter patterns.",
            "If current EV adoption continues, the city is on track to displace 9.4% of fossil-fuel vehicle-kilometers by 2028.",
          ].map((s) => (
            <div key={s} className="rounded-xl border border-border bg-background/60 px-4 py-3 text-sm leading-relaxed">
              {s}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Meter({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-[11px] text-muted-foreground">
        <span>{label}</span>
        <span className="font-mono">{value}</span>
      </div>
      <div className="mt-1 h-1.5 rounded-full bg-secondary">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}
