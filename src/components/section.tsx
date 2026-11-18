import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  description,
  align = "center",
  accent = true,
}: {
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  accent?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10",
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
      )}
    >
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight sm:text-4xl",
          accent && "text-brand",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-muted-foreground">{description}</p>
      )}
    </Reveal>
  );
}
