"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function Filters({
  categories,
  features,
}: {
  categories: { category: string; total: number }[];
  features: string[];
}) {
  const router = useRouter();
  const params = useSearchParams();

  const selectedCategories = params.getAll("categoria");
  const selectedFeatures = params.getAll("recurso");
  const minRating = Number(params.get("nota") ?? 0);

  const push = useCallback(
    (next: URLSearchParams) => {
      router.replace(`/buscar?${next.toString()}`, { scroll: false });
    },
    [router],
  );

  const toggle = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    const current = next.getAll(key);
    next.delete(key);
    for (const item of current) {
      if (item !== value) next.append(key, item);
    }
    if (!current.includes(value)) next.append(key, value);
    push(next);
  };

  const setRating = (value: number) => {
    const next = new URLSearchParams(params.toString());
    if (value === minRating) next.delete("nota");
    else next.set("nota", String(value));
    push(next);
  };

  return (
    <aside className="rounded-2xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Filtros</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.replace("/buscar", { scroll: false })}
        >
          Limpar todos
        </Button>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-sm font-medium">Avaliação mínima</p>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              aria-label={`${value} estrelas ou mais`}
              aria-pressed={value <= minRating}
              onClick={() => setRating(value)}
              className="rounded p-0.5 transition-transform hover:scale-110"
            >
              <Star
                className={cn(
                  "size-5",
                  value <= minRating
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/40",
                )}
                aria-hidden
              />
            </button>
          ))}
        </div>
      </div>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-medium">
          Recursos de acessibilidade
        </legend>
        <div className="max-h-52 space-y-2 overflow-y-auto pr-1">
          {features.map((feature) => (
            <Label
              key={feature}
              className="flex items-center gap-2 text-sm font-normal"
            >
              <Checkbox
                checked={selectedFeatures.includes(feature)}
                onCheckedChange={() => toggle("recurso", feature)}
              />
              {feature}
            </Label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-medium">Categorias</legend>
        <div className="flex flex-wrap gap-1.5">
          {categories.map(({ category, total }) => {
            const active = selectedCategories.includes(category);
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => toggle("categoria", category)}
                className="rounded-md transition-transform hover:scale-105"
              >
                <Badge variant={active ? "default" : "outline"}>
                  {category}
                  <span className="ml-1 opacity-70">{total}</span>
                </Badge>
              </button>
            );
          })}
        </div>
      </fieldset>
    </aside>
  );
}
