import { Award, Languages, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Professional } from "@/lib/catalog";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function ProfessionalCard({ item }: { item: Professional }) {
  return (
    <Card className="group h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="flex h-full flex-col gap-3">
        <div className="flex items-start justify-between">
          <span
            aria-hidden
            className="grid size-11 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-brand"
          >
            {initials(item.name)}
          </span>
          <Badge
            variant="outline"
            className={
              item.available
                ? "border-success/30 bg-success/10 text-success"
                : "text-muted-foreground"
            }
          >
            {item.available ? "Disponível" : "Ocupado"}
          </Badge>
        </div>

        <div>
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-muted-foreground">{item.title}</p>
        </div>

        <p className="flex items-center gap-1 text-sm">
          <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
          <span className="font-medium">{item.rating}</span>
          <span className="text-xs text-muted-foreground">
            ({item.reviews_count})
          </span>
          <span className="ml-auto text-sm font-semibold text-brand">
            R$ {item.hourly_rate}/h
          </span>
        </p>

        <ul className="space-y-1.5 text-xs text-muted-foreground">
          <li className="flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden />
            {item.city}
          </li>
          <li className="flex items-center gap-1.5">
            <Award className="size-3.5" aria-hidden />
            {item.experience} anos de experiência
          </li>
          <li className="flex items-start gap-1.5">
            <Languages className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            <span className="flex flex-wrap gap-1">
              {item.languages.map((language) => (
                <span
                  key={language}
                  className="rounded bg-muted px-1.5 py-0.5 text-[11px] text-foreground"
                >
                  {language}
                </span>
              ))}
            </span>
          </li>
        </ul>

        <ul className="flex flex-wrap gap-1.5">
          {item.certifications.map((certification) => (
            <li key={certification}>
              <Badge variant="secondary" className="text-brand-700">
                {certification}
              </Badge>
            </li>
          ))}
        </ul>

        <div className="mt-auto grid gap-2 pt-2">
          <Button size="lg" className="w-full" disabled={!item.available}>
            {item.available ? "Solicitar serviço" : "Não disponível"}
          </Button>
          <Button variant="outline" size="lg" className="w-full">
            Ver perfil
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
