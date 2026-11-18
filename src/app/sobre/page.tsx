import type { Metadata } from "next";
import Link from "next/link";
import {
  Globe2,
  Handshake,
  Heart,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { Section, SectionHeading } from "@/components/section";
import { getPlatformStats } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "A IncluTur conecta profissionais de acessibilidade a estabelecimentos turísticos. Conheça a missão, visão, valores e o roadmap da TurisAcess.",
};

const pillars = [
  {
    icon: Target,
    title: "Missão",
    text: "Transformar o turismo em Pernambuco por meio de soluções tecnológicas que valorizem a cultura local, ampliem a acessibilidade e promovam experiências mais humanas, inclusivas e inteligentes.",
  },
  {
    icon: Globe2,
    title: "Visão",
    text: "Ser referência em inovação acessível no turismo pernambucano, criando uma tecnologia que inspire um modelo de hospitalidade mais justo, conectado e democrático, com potencial de expansão para outras regiões do Brasil.",
  },
  {
    icon: Heart,
    title: "Valores",
    text: "Inclusão · Tecnologia a serviço das pessoas · Hospitalidade inclusiva · Inovação responsável · Colaboração.",
  },
];

const problems = [
  "Barreiras de acessibilidade em destinos turísticos.",
  "Falta de profissionais capacitados no momento certo.",
  "Experiência incompleta para turistas com deficiência.",
];

const solutions = [
  "Plataforma que conecta profissionais de acessibilidade a estabelecimentos turísticos.",
  "Produção de roteiros adaptados e inclusivos.",
  "Relatórios estratégicos que apoiam políticas de inclusão.",
];

const revenue = [
  { title: "Taxa de intermediação", text: "Percentual sobre cada serviço de acessibilidade contratado pelo app." },
  { title: "Planos de assinatura", text: "Pacotes mensais para estabelecimentos com descontos, relatórios avançados e prioridade no atendimento." },
  { title: "Consultoria em roteiros acessíveis", text: "Serviços especializados para órgãos públicos e empresas privadas." },
  { title: "Parcerias institucionais", text: "Apoio de governos e organizações via subsídios, editais e incentivos à inovação." },
];

const roadmap = [
  {
    phase: "Fase 1 — Validação do modelo",
    year: "2025",
    items: [
      "Lançamento do MVP do aplicativo.",
      "Testes com intérpretes de Libras e estabelecimentos parceiros no Recife.",
      "Ajustes de interface e funcionalidades conforme feedback inicial.",
    ],
  },
  {
    phase: "Fase 2 — Expansão regional",
    year: "2026",
    items: [
      "Inclusão de novos profissionais (guias especializados, acompanhantes para PCDs).",
      "Campanhas de marketing focadas em turismo inclusivo.",
      "Ampliação da rede para outros destinos de Pernambuco.",
    ],
  },
  {
    phase: "Fase 3 — Consolidação nacional",
    year: "2029",
    items: [
      "Expansão para outros estados brasileiros.",
      "Recomendações personalizadas de roteiros.",
      "Ecossistema de parcerias com redes hoteleiras e órgãos públicos.",
    ],
  },
];

const sdgs = [
  { code: "ODS 8", icon: TrendingUp, title: "Trabalho decente e crescimento econômico" },
  { code: "ODS 9", icon: Lightbulb, title: "Indústria, inovação e infraestrutura" },
  { code: "ODS 10", icon: Users, title: "Redução das desigualdades" },
  { code: "ODS 17", icon: Handshake, title: "Parcerias e meios de implementação" },
];

export default async function SobrePage() {
  const stats = await getPlatformStats();

  return (
    <>
      <section className="hero-surface">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <Reveal>
            <Badge variant="secondary" className="text-brand">
              Startup IncluTur
            </Badge>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              <span className="text-brand">Sobre o </span>
              <span className="text-brand-deep">TurisAcess</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              A IncluTur conecta profissionais de acessibilidade a
              estabelecimentos turísticos. Começamos pela oferta de intérpretes
              de Libras sob demanda em museus, hotéis, restaurantes e centros de
              atendimento, e desenvolvemos roteiros turísticos acessíveis para
              pessoas com mobilidade reduzida, deficiência visual, auditiva ou
              outras necessidades.
            </p>
          </Reveal>
        </div>
      </section>

      <Section>
        <Reveal stagger={110} className="grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="h-full text-center">
              <CardContent className="flex h-full flex-col items-center gap-3">
                <span className="grid size-12 place-items-center rounded-full bg-brand-soft text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h2 className="font-semibold">{title}</h2>
                <p className="text-sm text-muted-foreground">{text}</p>
              </CardContent>
            </Card>
          ))}
        </Reveal>
      </Section>

      <Section className="bg-muted/40">
        <Reveal className="grid gap-6 lg:grid-cols-2">
          <Card className="h-full">
            <CardContent>
              <h2 className="text-lg font-semibold text-destructive">
                Problemática
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {problems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-destructive" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="h-full">
            <CardContent>
              <h2 className="text-lg font-semibold text-brand">
                Solução: IncluTur
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {solutions.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>
      </Section>

      <Section>
        <SectionHeading accent={false} title="Impacto em números" />
        <Reveal className="grid grid-cols-2 gap-8 rounded-3xl border bg-card p-8 lg:grid-cols-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-brand">
              <CountUp to={stats.professionals} suffix="+" />
            </p>
            <p className="text-sm text-muted-foreground">
              Profissionais cadastrados
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-brand">
              <CountUp to={stats.establishments} suffix="+" />
            </p>
            <p className="text-sm text-muted-foreground">
              Estabelecimentos parceiros
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-brand">
              <CountUp to={stats.reviews} />
            </p>
            <p className="text-sm text-muted-foreground">
              Avaliações registradas
            </p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-brand">
              <CountUp to={stats.rating} decimals={1} suffix="/5" />
            </p>
            <p className="text-sm text-muted-foreground">Nota média da rede</p>
          </div>
        </Reveal>
      </Section>

      <Section className="bg-muted/40">
        <SectionHeading accent={false} title="Modelo de receita" />
        <Reveal stagger={80} className="grid gap-6 sm:grid-cols-2">
          {revenue.map((item) => (
            <Card key={item.title} className="h-full">
              <CardContent>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </Reveal>
      </Section>

      <Section>
        <SectionHeading accent={false} title="Roadmap" />
        <Reveal stagger={110} className="grid gap-6 lg:grid-cols-3">
          {roadmap.map((phase) => (
            <Card key={phase.phase} className="h-full">
              <CardContent>
                <Badge variant="secondary" className="text-brand">
                  {phase.year}
                </Badge>
                <h3 className="mt-3 font-semibold">{phase.phase}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {phase.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </Reveal>
      </Section>

      <Section className="bg-muted/40">
        <SectionHeading accent={false} title="ODS alinhados" />
        <Reveal stagger={80} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sdgs.map(({ code, icon: Icon, title }) => (
            <Card key={code} className="h-full">
              <CardContent className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Badge>{code}</Badge>
                  <Icon className="size-4.5 text-brand" aria-hidden />
                </div>
                <h3 className="text-sm font-semibold">{title}</h3>
              </CardContent>
            </Card>
          ))}
        </Reveal>
      </Section>

      <Section className="pb-20">
        <Reveal
          scale
          className="rounded-3xl bg-brand-soft/70 p-10 text-center ring-1 ring-brand/15"
        >
          <h2 className="text-2xl font-bold sm:text-3xl">Fale com a gente</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Quer levar acessibilidade para o seu estabelecimento ou fazer parte
            da rede de profissionais? Estamos em Recife, Pernambuco.
          </p>
          <ul className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-brand" aria-hidden /> (81) 3456-7890
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-brand" aria-hidden />{" "}
              contato@turisacess.com.br
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 text-brand" aria-hidden /> Recife, PE
            </li>
          </ul>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="h-11 px-5"
              render={<Link href="/cadastrar">Criar conta</Link>}
            />
            <Button
              variant="outline"
              size="lg"
              className="h-11 px-5"
              render={<Link href="/buscar">Explorar a plataforma</Link>}
            />
          </div>
        </Reveal>
      </Section>
    </>
  );
}
