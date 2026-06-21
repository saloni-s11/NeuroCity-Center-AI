import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  Building2,
  Layers,
  Leaf,
  Maximize2,
  Navigation,
  Sparkles,
  Wind,
  Zap,
} from "lucide-react";
import { PageHeader } from "@/components/neuro/SectionHeader";

export const Route = createFileRoute("/digital-twin")({
  head: () => ({ meta: [{ title: "Digital Twin · NeuroCity" }] }),
  component: DigitalTwinPage,
});

const layers = [
  { id: "traffic", label: "Traffic", color: "var(--color-traffic)", icon: Navigation },
  { id: "pollution", label: "Pollution", color: "var(--color-environment)", icon: Wind },
  { id: "weather", label: "Weather", color: "var(--color-info)", icon: Leaf },
  { id: "infra", label: "Infrastructure", color: "var(--color-infrastructure)", icon: Building2 },
  { id: "utilities", label: "Utilities", color: "var(--color-ai)", icon: Zap },
] as const;

function DigitalTwinPage() {
  const [active, setActive] = useState<string[]>(["traffic", "pollution"]);
  const toggle = (id: string) =>
    setActive((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  return (
    <div className="mx-auto max-w-[1500px]">
      <PageHeader
        title="Digital Twin"
        subtitle="A live 3D representation of the city — every road, sensor, and signal."
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        {/* Map */}
        <div className="relative h-[640px] overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
          <FakeMap activeLayers={active} />

          {/* Floating controls */}
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            <div className="glass-panel rounded-xl p-2 shadow-[var(--shadow-soft)]">
              <div className="px-2 pb-1.5 pt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Layers
              </div>
              <div className="space-y-0.5">
                {layers.map((l) => {
                  const on = active.includes(l.id);
                  return (
                    <button
                      key={l.id}
                      onClick={() => toggle(l.id)}
                      className={[
                        "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors",
                        on ? "bg-foreground/5" : "hover:bg-foreground/5",
                      ].join(" ")}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: on ? l.color : "var(--color-border)" }}
                      />
                      <l.icon className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-medium">{l.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="absolute right-4 top-4 flex items-center gap-2">
            <button className="glass-panel grid h-9 w-9 place-items-center rounded-xl shadow-[var(--shadow-soft)]">
              <Layers className="h-4 w-4" />
            </button>
            <button className="glass-panel grid h-9 w-9 place-items-center rounded-xl shadow-[var(--shadow-soft)]">
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

          <div className="glass-panel absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl px-4 py-2.5 text-xs shadow-[var(--shadow-soft)]">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">Lat 19.0760°, Lon 72.8777°</span>
              <span className="text-muted-foreground">Zoom 12</span>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--color-ai)" }} />
              Streaming · 1.2M data points
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          <div className="card-surface p-5">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Selected region
            </div>
            <div className="mt-1 text-xl font-semibold">Bandra-Kurla Complex</div>
            <div className="mt-1 text-xs text-muted-foreground">Ward H-W · 4.2 km²</div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Metric label="Traffic" value="74" tone="var(--color-traffic)" />
              <Metric label="AQI" value="142" tone="var(--color-environment)" />
              <Metric label="Power" value="312 MW" tone="var(--color-ai)" />
              <Metric label="Water" value="48 ML" tone="var(--color-info)" />
            </div>
          </div>

          <div className="card-surface p-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" style={{ color: "var(--color-ai)" }} />
              <h3 className="text-sm font-semibold">AI Predictions</h3>
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="rounded-lg bg-secondary/60 px-3 py-2">
                <div className="text-xs text-muted-foreground">Next 2h</div>
                Congestion likely to peak at 17:45 with a 19% increase.
              </li>
              <li className="rounded-lg bg-secondary/60 px-3 py-2">
                <div className="text-xs text-muted-foreground">Tomorrow</div>
                AQI expected to drop to <strong>118</strong> after evening rainfall.
              </li>
            </ul>
          </div>

          <div className="card-surface p-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" style={{ color: "var(--color-risk)" }} />
              <h3 className="text-sm font-semibold">Active alerts</h3>
            </div>
            <ul className="mt-3 space-y-2 text-xs">
              {[
                { t: "Signal failure at Kala Nagar", l: "Critical", c: "var(--color-risk)" },
                { t: "Transformer overload — Substation 7", l: "High", c: "var(--color-traffic)" },
                { t: "Pothole reported on Linking Rd", l: "Low", c: "var(--color-info)" },
              ].map((a) => (
                <li key={a.t} className="flex items-start gap-2 rounded-lg border border-border p-2.5">
                  <span
                    className="mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-semibold"
                    style={{ backgroundColor: `color-mix(in oklab, ${a.c} 14%, transparent)`, color: a.c }}
                  >
                    {a.l}
                  </span>
                  <span>{a.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-lg border border-border bg-background/60 p-3">
      <div className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 text-lg font-semibold" style={{ color: tone }}>
        {value}
      </div>
    </div>
  );
}

function FakeMap({ activeLayers }: { activeLayers: string[] }) {
  return (
    <div className="absolute inset-0">
      {/* Base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, color-mix(in oklab, var(--color-info) 18%, var(--color-background)), var(--color-background) 60%)",
        }}
      />
      {/* Grid */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="var(--color-border)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.6" />

        {/* Roads */}
        <g stroke="color-mix(in oklab, var(--color-foreground) 25%, transparent)" strokeWidth="2" fill="none">
          <path d="M 0 200 Q 300 180 500 240 T 1000 200" />
          <path d="M 100 0 Q 180 200 220 400 T 260 700" />
          <path d="M 700 0 Q 660 200 720 400 T 760 700" />
          <path d="M 0 480 Q 400 460 700 520 T 1200 500" />
        </g>

        {/* Traffic heat */}
        {activeLayers.includes("traffic") && (
          <g>
            {[
              [220, 220, 70],
              [520, 250, 90],
              [720, 410, 60],
              [380, 500, 80],
            ].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} fill="var(--color-traffic)" opacity="0.18" />
            ))}
          </g>
        )}

        {/* Pollution */}
        {activeLayers.includes("pollution") && (
          <g>
            {[
              [600, 180, 100],
              [820, 520, 80],
              [180, 380, 70],
            ].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} fill="var(--color-environment)" opacity="0.16" />
            ))}
          </g>
        )}

        {/* Infra dots */}
        {activeLayers.includes("infra") &&
          Array.from({ length: 16 }).map((_, i) => (
            <circle
              key={i}
              cx={80 + (i * 73) % 900}
              cy={80 + (i * 137) % 520}
              r="3"
              fill="var(--color-infrastructure)"
            />
          ))}

        {/* Utilities */}
        {activeLayers.includes("utilities") &&
          Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              x={120 + (i * 110) % 800}
              y={120 + (i * 90) % 460}
              width="8"
              height="8"
              fill="var(--color-ai)"
              opacity="0.8"
            />
          ))}

        {/* Selected pin */}
        <g>
          <circle cx="540" cy="320" r="20" fill="var(--color-ai)" opacity="0.15">
            <animate attributeName="r" values="14;26;14" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.25;0;0.25" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="540" cy="320" r="6" fill="var(--color-foreground)" />
        </g>
      </svg>
    </div>
  );
}
