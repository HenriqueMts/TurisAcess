import type { Metadata } from "next";
import Link from "next/link";
import {
  Accessibility,
  CalendarCheck,
  ChartColumn,
  Clock,
  CreditCard,
  Languages,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/section";
import { getServices } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Interpretação em Libras, roteiros acessíveis e consultoria em acessibilidade para o turismo em Pernambuco.",
};

const icons: Record<string, typeof Languages> = {
  languages: Languages,
  "map-pin": MapPin,
  accessibility: Accessibility,
};

const included = [
  { icon: CalendarCheck, title: "Agendamento rápido", text: "Solicite e receba confirmação em poucos minutos." },
  { icon: CreditCard, title: "Pagamento integrado", text: "Pague pelo atendimento direto na plataforma." },
  { icon: ChartColumn, title: "Relatórios", text: "Indicadores de uso e satisfação em tempo real." },
  { icon: ShieldCheck, title: "Certificação verificada", text: "Todos os profissionais têm credenciais validadas." },
  { icon: Clock, title: "Disponibilidade 24/7", text: "Profissionais nos horários em que você precisa." },
  { icon: Sparkles, title: "Avaliação mútua", text: "Reputação construída por quem contrata e quem atende." },
];

export default async function ServicosPage() {
  const services = await getServices();

  return (
    <>
      <Section>
        <SectionHeading
          title="Nossos Serviços"
          description="Conectamos profissionais qualificados em acessibilidade com estabelecimentos turísticos que desejam oferecer experiências verdadeiramente inclusivas."
        />
        <Reveal stagger={110} className="grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = icons[service.icon] ?? Sparkles;
            return (
              <Card
                key={service.id}
                className="relative h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
              >
                {service.popular && (
                  <Badge className="absolute -top-2.5 left-5">Mais popular</Badge>
                )}
                <CardContent className="flex h-full flex-col gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h2 className="text-lg font-semibold">{service.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <Button
                    size="lg"
                    className="mt-auto w-full"
                    render={<Link href="/buscar">Solicitar serviço</Link>}
                  />
                </CardContent>
              </Card>
            );
          })}
        </Reveal>
      </Section>

      <Section className="bg-muted/40">
        <SectionHeading
          accent={false}
          title="O que está incluso em todos os serviços"
        />
        <Reveal stagger={70} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {included.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="h-full">
              <CardContent className="flex gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </Reveal>
      </Section>
    </>
  );
}
