import type { Metadata } from "next";
import { EstablishmentCard } from "@/components/cards/establishment-card";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/section";
import { getEstablishments } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Estabelecimentos parceiros",
  description:
    "Rede de estabelecimentos turísticos acessíveis em Pernambuco na plataforma TurisAcess.",
};

export default async function EstabelecimentosPage() {
  const establishments = await getEstablishments({ sort: "rating" });

  return (
    <Section>
      <SectionHeading
        title="Estabelecimentos Parceiros"
        description={`Explore nossa rede com mais de ${establishments.length} estabelecimentos em Pernambuco que oferecem experiências verdadeiramente acessíveis e inclusivas para todos os visitantes.`}
      />

      <p className="mb-6 text-sm font-medium">
        {establishments.length} estabelecimentos encontrados
      </p>

      <Reveal stagger={60} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {establishments.map((item) => (
          <EstablishmentCard key={item.id} item={item} />
        ))}
      </Reveal>
    </Section>
  );
}
