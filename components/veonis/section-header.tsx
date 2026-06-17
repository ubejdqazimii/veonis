import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="display-title mt-3 text-3xl tracking-normal text-[#111827] sm:text-4xl">
        {title}
      </h2>
      {intro ? <p className="mt-5 text-lg leading-8 text-[#5f6368]">{intro}</p> : null}
    </div>
  );
}
