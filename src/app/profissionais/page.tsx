import type { Metadata } from "next";
import { ProfessionalCard } from "@/components/cards/professional-card";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/section";
import { getProfessionals } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Profissionais certificados",
  description:
    "Intérpretes de Libras, guias acessíveis, audiodescritores e consultores em acessibilidade certificados.",
};

export default async function ProfissionaisPage() {
  const professionals = await getProfessionals();

  return (
    <Section>
      <SectionHeading
        title="Profissionais Certificados"
        description="Nossa rede de profissionais especializados em acessibilidade e turismo inclusivo, todos com certificações verificadas e avaliações reais de clientes."
      />

      <p className="mb-6 text-sm font-medium">
        {professionals.length} profissionais disponíveis
      </p>

      <Reveal stagger={70} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {professionals.map((item) => (
          <ProfessionalCard key={item.id} item={item} />
        ))}
      </Reveal>
    </Section>
  );
}
