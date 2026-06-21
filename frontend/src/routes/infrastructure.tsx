import { createFileRoute } from "@tanstack/react-router";
import { Building2, Droplets, Wrench, Zap } from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/neuro/SectionHeader";

export const Route = createFileRoute("/infrastructure")({
  head: () => ({ meta: [{ title: "Infrastructure · NeuroCity" }] }),
  component: InfraPage,
});

const systems = [
  { name: "Road network", health: 88, icon: Building2, c: "var(--color-infrastructure)" },
  { name: "Power grid", health: 94, icon: Zap, c: "var(--color-ai)" },
  { name: "Water distribution", health: 81, icon: Droplets, c: "var(--color-info)" },
  { name: "Public transit", health: 90, icon: Building2, c: "var(--color-environment)" },
  { name: "Telecom", health: 96, icon: Zap, c: "var(--color-success)" },
  { name: "Waste mgmt.", health: 73, icon: Wrench, c: "var(--color-traffic)" },
];

function InfraPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-8">
      <PageHeader title="Infrastructure" subtitle="Asset health, utility performance, and maintenance pipeline." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {systems.map((s) => (
          <div key={s.name} className="card-surface p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ backgroundColor: `color-mix(in oklab, ${s.c} 14%, transparent)`, color: s.c }}>
                  <s.icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground">Last audit · 2d ago</div>
                </div>
              </div>
              <div className="text-2xl font-semibold" style={{ color: s.c }}>{s.health}%</div>
            </div>
            <div className="mt-4 h-1.5 rounded-full bg-secondary">
              <div className="h-full rounded-full" style={{ width: `${s.health}%`, background: s.c }} />
            </div>
            <div className="mt-3 flex justify-between text-[11px] text-muted-foreground">
              <span>Target 95%</span>
              <span>{s.health >= 90 ? "Stable" : s.health >= 80 ? "Watch" : "Action"}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card-surface p-5">
        <SectionHeader eyebrow="Pipeline" title="Maintenance alerts" />
        <table className="mt-4 w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <th className="py-2 font-medium">Asset</th>
              <th className="py-2 font-medium">Issue</th>
              <th className="py-2 font-medium">Priority</th>
              <th className="py-2 font-medium">ETA</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Transformer T-47 · Sion", "Overheating", "High", "6h", "var(--color-risk)"],
              ["Pump Station 12", "Pressure drop", "Med", "1d", "var(--color-traffic)"],
              ["Streetlight grid F-3", "12 nodes offline", "Med", "1d", "var(--color-traffic)"],
              ["Bridge B-09 · Mahim", "Joint inspection", "Low", "1w", "var(--color-info)"],
            ].map(([a, b, p, e, c]) => (
              <tr key={a as string} className="border-t border-border">
                <td className="py-3 font-medium">{a}</td>
                <td className="py-3 text-muted-foreground">{b}</td>
                <td className="py-3">
                  <span className="rounded-md px-2 py-0.5 text-[11px] font-semibold" style={{ backgroundColor: `color-mix(in oklab, ${c} 14%, transparent)`, color: c as string }}>
                    {p}
                  </span>
                </td>
                <td className="py-3 text-muted-foreground">{e}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
