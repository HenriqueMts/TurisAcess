import type { Metadata } from "next";
import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { EstablishmentCard } from "@/components/cards/establishment-card";
import { ProfessionalCard } from "@/components/cards/professional-card";
import { Reveal } from "@/components/motion/reveal";
import {
  getAccessibilityFeatures,
  getEstablishmentCategories,
  getEstablishments,
  getProfessionals,
} from "@/lib/catalog";
import { Filters } from "./filters";
import { SearchBar } from "./search-bar";

export const metadata: Metadata = {
  title: "Busca avançada",
  description:
    "Encontre estabelecimentos e profissionais de acessibilidade em Pernambuco.",
};

function asArray(value: string | string[] | undefined) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export default async function BuscarPage({
  searchParams,
}: PageProps<"/buscar">) {
  const params = await searchParams;
  const query = String(params?.q ?? "");
  const local = String(params?.local ?? "");
  const categories = asArray(params?.categoria);
  const features = asArray(params?.recurso);
  const minRating = Number(params?.nota ?? 0) || 0;

  const [establishments, professionals, allCategories, allFeatures] =
    await Promise.all([
      getEstablishments({
        query: [query, local].filter(Boolean).join(" ").trim(),
        categories,
        accessibility: features,
        minRating,
      }),
      getProfessionals({ query }),
      getEstablishmentCategories(),
      getAccessibilityFeatures(),
    ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-bold text-brand">Busca Avançada</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Encontre estabelecimentos e profissionais de acessibilidade em
          Pernambuco
        </p>
      </Reveal>

      <Reveal delay={80} className="mt-6">
        <Suspense fallback={<Skeleton className="h-11 w-full" />}>
          <SearchBar />
        </Suspense>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
        <Suspense fallback={<Skeleton className="h-96 w-full rounded-2xl" />}>
          <Filters categories={allCategories} features={allFeatures} />
        </Suspense>

        <Tabs defaultValue="estabelecimentos">
          <TabsList className="h-10">
            <TabsTrigger value="estabelecimentos" className="px-4">
              Estabelecimentos
              <Badge variant="secondary">{establishments.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="profissionais" className="px-4">
              Profissionais
              <Badge variant="secondary">{professionals.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="estabelecimentos" className="mt-5">
            {establishments.length === 0 ? (
              <p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
                Nenhum estabelecimento encontrado com esses filtros.
              </p>
            ) : (
              <Reveal
                stagger={60}
                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {establishments.map((item) => (
                  <EstablishmentCard key={item.id} item={item} />
                ))}
              </Reveal>
            )}
          </TabsContent>

          <TabsContent value="profissionais" className="mt-5">
            {professionals.length === 0 ? (
              <p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
                Nenhum profissional encontrado.
              </p>
            ) : (
              <Reveal
                stagger={60}
                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {professionals.map((item) => (
                  <ProfessionalCard key={item.id} item={item} />
                ))}
              </Reveal>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
