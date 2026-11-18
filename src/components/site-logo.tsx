import Link from "next/link";
import { Accessibility } from "lucide-react";
import { cn } from "@/lib/utils";

export function SiteLogo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-2 rounded-md font-bold tracking-tight",
        className,
      )}
    >
      <span className="grid size-8 place-items-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
        <Accessibility className="size-4.5" aria-hidden />
      </span>
      <span className="text-lg text-brand">TurisAcess</span>
    </Link>
  );
}
