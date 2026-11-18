import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CountUp } from "@/components/motion/count-up";

export function StatTile({
  icon: Icon,
  value,
  label,
  decimals = 0,
  prefix,
  suffix,
}: {
  icon: LucideIcon;
  value: number;
  label: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="py-1 text-center">
        <Icon className="mx-auto size-5 text-brand" aria-hidden />
        <p className="mt-2 text-2xl font-bold">
          <CountUp
            to={value}
            decimals={decimals}
            prefix={prefix}
            suffix={suffix}
          />
        </p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
