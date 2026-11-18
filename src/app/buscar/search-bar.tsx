"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <form
      className="flex flex-col gap-2 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const next = new URLSearchParams(params.toString());
        const q = String(data.get("q") ?? "").trim();
        const local = String(data.get("local") ?? "").trim();
        if (q) next.set("q", q);
        else next.delete("q");
        if (local) next.set("local", local);
        else next.delete("local");
        router.replace(`/buscar?${next.toString()}`, { scroll: false });
      }}
    >
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <label htmlFor="q" className="sr-only">
          Buscar estabelecimentos, serviços ou profissionais
        </label>
        <Input
          id="q"
          name="q"
          defaultValue={params.get("q") ?? ""}
          placeholder="Buscar estabelecimentos, serviços ou profissionais…"
          className="h-11 pl-9"
        />
      </div>
      <div className="relative sm:w-64">
        <MapPin
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <label htmlFor="local" className="sr-only">
          Localização
        </label>
        <Input
          id="local"
          name="local"
          defaultValue={params.get("local") ?? ""}
          placeholder="Localização (ex: Recife, Olinda…)"
          className="h-11 pl-9"
        />
      </div>
      <Button type="submit" size="lg" className="h-11 px-6">
        <Search aria-hidden />
        Buscar
      </Button>
    </form>
  );
}
