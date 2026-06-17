import { CheckCircle, Landmark, LineChart, ShieldCheck } from "lucide-react";

type CoverVisualProps = {
  label?: string;
};

export function CoverVisual({ label = "Veonis 360°" }: CoverVisualProps) {
  return (
    <div className="cover-visual" aria-hidden="true">
      <div className="cover-visual__grid" />
      <div className="cover-visual__panel cover-visual__panel--main">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-semibold uppercase tracking-normal text-[#939598]">
            {label}
          </span>
          <span className="rounded-full bg-[#c63d4d]/10 px-3 py-1 text-xs font-semibold text-[#c63d4d]">
            Analyse
          </span>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3">
          {[
            { icon: ShieldCheck, label: "Absicherung" },
            { icon: Landmark, label: "Vorsorge" },
            { icon: LineChart, label: "Anlagen" },
            { icon: CheckCircle, label: "Struktur" },
          ].map((item) => (
            <div className="rounded-2xl border border-[#e6e2dc] bg-white/85 p-4 shadow-sm" key={item.label}>
              <item.icon className="size-5 text-[#c63d4d]" />
              <p className="mt-3 text-sm font-semibold text-[#111827]">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 h-2 overflow-hidden rounded-full bg-[#f1f1ef]">
          <div className="h-full w-3/4 rounded-full bg-[#c63d4d]" />
        </div>
      </div>
      <div className="cover-visual__panel cover-visual__panel--small">
        <p className="text-sm font-semibold text-[#111827]">Gesamtbild</p>
        <p className="mt-2 text-xs leading-5 text-[#6b7280]">
          Versicherungen, Vorsorge, Hypotheken, Steuern und Anlagen in einer Übersicht.
        </p>
      </div>
    </div>
  );
}
