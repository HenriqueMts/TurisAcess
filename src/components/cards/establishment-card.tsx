import Image from "next/image";
import {
  Accessibility as AccessibilityIcon,
  Globe,
  Heart,
  MapPin,
  Phone,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Establishment } from "@/lib/catalog";

export function EstablishmentCard({
  item,
  showAmenities = true,
}: {
  item: Establishment;
  showAmenities?: boolean;
}) {
  return (
    <Card className="group gap-0 overflow-hidden py-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-16/10 overflow-hidden bg-muted">
        <Image
          src={item.image_url}
          alt=""
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          aria-label={`Favoritar ${item.name}`}
          className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-background/85 text-muted-foreground backdrop-blur transition-colors hover:text-destructive"
        >
          <Heart className="size-4" aria-hidden />
        </button>
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="text-brand">
            {item.category}
          </Badge>
          <span className="flex items-center gap-1 text-sm font-medium">
            <Star className="size-3.5 fill-amber-400 text-amber-400" aria-hidden />
            {item.rating}
            <span className="text-xs font-normal text-muted-foreground">
              ({item.reviews_count})
            </span>
          </span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold leading-snug">{item.name}</h3>
          <span className="shrink-0 text-sm font-semibold text-brand">
            {item.price_label}
          </span>
        </div>

        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5" aria-hidden />
          {item.city}
          <span aria-hidden>•</span>
          {item.distance_km} km
        </p>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {item.description}
        </p>

        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium">
            <AccessibilityIcon className="size-3.5 text-brand" aria-hidden />
            Recursos de acessibilidade
          </p>
          <ul className="flex flex-wrap gap-1.5">
            {item.accessibility.slice(0, 3).map((feature) => (
              <li key={feature}>
                <Badge variant="outline" className="font-normal">
                  {feature}
                </Badge>
              </li>
            ))}
            {item.accessibility.length > 3 && (
              <li>
                <Badge variant="outline" className="font-normal">
                  +{item.accessibility.length - 3} mais
                </Badge>
              </li>
            )}
          </ul>
        </div>

        {showAmenities && item.amenities.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {item.amenities.slice(0, 4).map((amenity) => (
              <li
                key={amenity}
                className="rounded-md bg-brand-soft px-2 py-0.5 text-[11px] text-brand-700"
              >
                {amenity}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between pt-1 text-xs text-muted-foreground">
          {item.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="size-3.5" aria-hidden />
              {item.phone}
            </span>
          )}
          <Globe className="size-3.5" aria-hidden />
        </div>

        <div className="grid gap-2">
          <Button size="lg" className="w-full">
            Solicitar serviço
          </Button>
          <Button variant="outline" size="lg" className="w-full">
            Ver detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
