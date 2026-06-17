import type { ProcessStep } from "@/lib/veonis-content";

type ProcessTimelineProps = {
  steps: ProcessStep[];
};

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      {steps.map((step, index) => (
        <article className="relative rounded-3xl border border-[#e6e2dc] bg-white p-6" key={step.title}>
          <span className="flex size-10 items-center justify-center rounded-full bg-[#c63d4d] text-sm font-semibold text-white">
            {index + 1}
          </span>
          <h3 className="mt-6 text-lg font-semibold text-[#111827]">{step.title}</h3>
          <p className="mt-3 text-sm leading-6 text-[#5f6368]">{step.text}</p>
        </article>
      ))}
    </div>
  );
}
