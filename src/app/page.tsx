import Link from "next/link";
import {
  Accessibility,
  ChartColumn,
  Building2,
  CalendarCheck,
  Clock,
  CreditCard,
  Globe2,
  Handshake,
  Heart,
  Landmark,
  Languages,
  Lightbulb,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Hero } from "@/components/home/hero";
import { Section, SectionHeading } from "@/components/section";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { ProfessionalCard } from "@/components/cards/professional-card";
import { getProfessionals, getServices } from "@/lib/catalog";

const serviceIcons: Record<string, typeof Languages> = {
  languages: Languages,
  "map-pin": MapPin,
  accessibility: Accessibility,
};

const howItWorks = [
  {
    icon: CalendarCheck,
    title: "Agendamento rápido",
    text: "Solicite serviços e receba confirmação em poucos minutos",
  },
  {
    icon: CreditCard,
    title: "Pagamento integrado",
    text: "Pague pelo atendimento diretamente no aplicativo",
  },
  {
    icon: ChartColumn,
    title: "Acompanhamento",
    text: "Monitore indicadores de uso e satisfação em tempo real",
  },
  {
    icon: ShieldCheck,
    title: "Certificação verificada",
    text: "Todos os profissionais têm certificações validadas",
  },
  {
    icon: Clock,
    title: "Disponibilidade 24/7",
    text: "Profissionais disponíveis nos horários que você precisa",
  },
];

const partnerCategories = [
  { icon: Landmark, label: "Museus", count: "15+", text: "Exposições acessíveis com interpretação em Libras" },
  { icon: Building2, label: "Hotéis", count: "25+", text: "Recepção e serviços acessíveis para todos os hóspedes" },
  { icon: UtensilsCrossed, label: "Restaurantes", count: "30+", text: "Cardápios acessíveis e atendimento inclusivo" },
  { icon: MapPin, label: "CAT's", count: "8+", text: "Centros de Atendimento ao Turista acessíveis" },
];

const whyUs = [
  { icon: Users, title: "Amplie seu público", text: "Atenda visitantes com deficiência auditiva e outras necessidades específicas", kpi: "+40% visitantes" },
  { icon: Heart, title: "Melhore sua reputação", text: "Seja reconhecido como um estabelecimento verdadeiramente inclusivo", kpi: "4,8/5 satisfação" },
  { icon: TrendingUp, title: "Aumente sua receita", text: "Estabelecimentos acessíveis têm maior fidelização de clientes", kpi: "+25% receita" },
  { icon: ShieldCheck, title: "Certificação de qualidade", text: "Receba selos de acessibilidade e reconhecimento oficial", kpi: "Selo oficial" },
];

const pillars = [
  {
    icon: Target,
    title: "Nossa Missão",
    text: "Transformar o turismo em Pernambuco por meio de soluções tecnológicas que valorizem a cultura local, ampliem a acessibilidade e promovam experiências mais humanas, inclusivas e inteligentes.",
  },
  {
    icon: Globe2,
    title: "Nossa Visão",
    text: "Ser referência em inovação acessível no turismo pernambucano, criando uma tecnologia que inspire um modelo de hospitalidade mais justo, conectado e democrático, com potencial de expansão para outras regiões do Brasil.",
  },
  {
    icon: Heart,
    title: "Nossos Valores",
    text: "Inclusão, tecnologia a serviço das pessoas, hospitalidade inclusiva, inovação responsável e colaboração — sempre com compromisso com a acessibilidade comunicacional e física.",
  },
];

const sdgs = [
  { code: "ODS 8", icon: TrendingUp, title: "Trabalho Decente e Crescimento Econômico", text: "Geramos renda para profissionais qualificados em acessibilidade" },
  { code: "ODS 9", icon: Lightbulb, title: "Indústria, Inovação e Infraestrutura", text: "Promovemos inovação tecnológica no setor de turismo acessível" },
  { code: "ODS 10", icon: Users, title: "Redução das Desigualdades", text: "Facilitamos o acesso ao turismo para pessoas com deficiência" },
  { code: "ODS 17", icon: Handshake, title: "Parcerias e Meios de Implementação", text: "Fortalecemos parcerias entre estabelecimentos e profissionais" },
];

export default async function HomePage() {
  const [services, professionals] = await Promise.all([
    getServices(),
    getProfessionals({ limit: 4 }),
  ]);

  return (
    <>
      <Hero />

      {/* Serviços */}
      <Section id="servicos">
        <SectionHeading
          title="Nossos Serviços"
          description="Conectamos profissionais qualificados em acessibilidade com estabelecimentos turísticos que desejam oferecer experiências verdadeiramente inclusivas."
        />
        <Reveal stagger={110} className="grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon] ?? Sparkles;
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
                  <h3 className="text-lg font-semibold">{service.title}</h3>
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

      {/* Como funciona */}
      <Section id="como-funciona" className="py-0">
        <Reveal className="rounded-3xl border bg-card p-8 sm:p-12">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Como Funciona a Plataforma
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {howItWorks.map(({ icon: Icon, title, text }) => (
              <li key={title} className="text-center">
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-brand-soft text-brand transition-transform duration-300 hover:scale-110">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-3 text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>

      {/* CTA estabelecimento */}
      <Section>
        <Reveal
          scale
          className="rounded-3xl bg-gradient-to-br from-brand-soft to-background p-10 text-center ring-1 ring-brand/15"
        >
          <h2 className="text-2xl font-bold sm:text-3xl">
            Pronto para tornar seu estabelecimento mais acessível?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Junte-se a mais de 80 estabelecimentos em Pernambuco que já oferecem
            experiências inclusivas através da nossa plataforma.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="h-11 px-5"
              render={
                <Link href="/cadastrar?perfil=estabelecimento">
                  Cadastrar estabelecimento
                </Link>
              }
            />
            <Button
              variant="outline"
              size="lg"
              className="h-11 px-5"
              render={<Link href="/sobre">Falar com especialista</Link>}
            />
          </div>
        </Reveal>
      </Section>

      {/* Profissionais */}
      <Section id="profissionais" className="bg-muted/40">
        <SectionHeading
          title="Profissionais Certificados"
          description="Nossa rede de profissionais especializados em acessibilidade e turismo inclusivo, todos com certificações verificadas e avaliações reais de clientes."
        />
        <Reveal stagger={90} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {professionals.map((professional) => (
            <ProfessionalCard key={professional.id} item={professional} />
          ))}
        </Reveal>
        <Reveal delay={120} className="mt-8 text-center">
          <Button
            variant="outline"
            size="lg"
            className="h-11 px-5"
            render={<Link href="/profissionais">Ver todos os profissionais</Link>}
          />
        </Reveal>
      </Section>

      {/* CTA profissional */}
      <Section>
        <Reveal
          scale
          className="rounded-3xl bg-gradient-to-br from-brand-soft to-background p-10 text-center ring-1 ring-brand/15"
        >
          <h2 className="text-2xl font-bold sm:text-3xl">
            É um profissional de acessibilidade?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Junte-se à nossa rede de profissionais certificados e conecte-se com
            estabelecimentos que valorizam a inclusão. Defina sua
            disponibilidade, valores e construa sua reputação.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="h-11 px-5"
              render={
                <Link href="/cadastrar?perfil=profissional">
                  Cadastrar como profissional
                </Link>
              }
            />
            <Button
              variant="outline"
              size="lg"
              className="h-11 px-5"
              render={<Link href="/sobre">Saiba mais</Link>}
            />
          </div>
        </Reveal>
      </Section>

      {/* Estabelecimentos parceiros */}
      <Section id="estabelecimentos">
        <SectionHeading
          title="Estabelecimentos Parceiros"
          description="Mais de 80 estabelecimentos turísticos em Pernambuco já utilizam nossa plataforma para oferecer experiências verdadeiramente inclusivas."
        />
        <Reveal className="mb-8 text-center">
          <Button
            variant="outline"
            size="lg"
            className="h-11 px-5"
            render={
              <Link href="/estabelecimentos">Ver todos os estabelecimentos</Link>
            }
          />
        </Reveal>
        <Reveal stagger={90} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {partnerCategories.map(({ icon: Icon, label, count, text }) => (
            <Card
              key={label}
              className="h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <CardContent className="flex h-full flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 font-semibold">
                    <Icon className="size-4.5 text-brand" aria-hidden />
                    {label}
                  </span>
                  <Badge variant="secondary" className="text-brand">
                    {count}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{text}</p>
              </CardContent>
            </Card>
          ))}
        </Reveal>
      </Section>

      {/* Por que escolher */}
      <Section className="bg-muted/40">
        <Reveal className="rounded-3xl border bg-card p-8 sm:p-12">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Por que escolher o TurisAcess?
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map(({ icon: Icon, title, text, kpi }) => (
              <div key={title} className="text-center">
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-brand-soft text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-3 text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{text}</p>
                <Badge variant="secondary" className="mt-3 text-brand">
                  {kpi}
                </Badge>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Depoimento */}
      <Section>
        <Reveal className="grid gap-8 rounded-3xl bg-brand-soft/70 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr]">
          <blockquote>
            <h2 className="text-xl font-bold sm:text-2xl">
              &ldquo;Transformamos nossa experiência de visitação&rdquo;
            </h2>
            <p className="mt-4 text-sm text-muted-foreground italic">
              &ldquo;Desde que passamos a usar o TurisAcess, nosso museu recebe
              muito mais visitantes com deficiência auditiva. A qualidade dos
              intérpretes é excepcional e o sistema de agendamento é muito
              prático. Recomendamos para todos os estabelecimentos que querem
              ser verdadeiramente inclusivos.&rdquo;
            </p>
            <footer className="mt-5 flex items-center gap-3">
              <span
                aria-hidden
                className="grid size-10 place-items-center rounded-full bg-brand text-sm font-semibold text-white"
              >
                MH
              </span>
              <span className="text-sm">
                <strong className="block">Museu da História de PE</strong>
                <span className="text-muted-foreground">Cliente desde 2023</span>
              </span>
            </footer>
          </blockquote>

          <div className="grid grid-cols-2 gap-4 self-center">
            <div className="rounded-2xl bg-background p-5 text-right">
              <p className="text-3xl font-bold text-brand">
                <CountUp to={300} suffix="%" />
              </p>
              <p className="text-xs text-muted-foreground">
                Aumento de visitantes PCD
              </p>
            </div>
            <div className="rounded-2xl bg-background p-5 text-right">
              <p className="text-3xl font-bold text-brand">
                <CountUp to={4.9} decimals={1} />
              </p>
              <p className="text-xs text-muted-foreground">Avaliação média</p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Sobre */}
      <Section id="sobre" className="bg-muted/40">
        <SectionHeading
          title="Sobre o TurisAcess"
          description="Nascemos da necessidade de resolver uma lacuna recorrente no setor do turismo: a ausência de recursos e profissionais especializados quando visitantes com deficiência chegam para desfrutar de experiências turísticas."
        />
        <Reveal stagger={110} className="grid gap-6 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, text }) => (
            <Card key={title} className="h-full text-center">
              <CardContent className="flex h-full flex-col items-center gap-3">
                <span className="grid size-12 place-items-center rounded-full bg-brand-soft text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </CardContent>
            </Card>
          ))}
        </Reveal>

        <Reveal className="mt-10 rounded-3xl border bg-card p-8 sm:p-12">
          <h3 className="text-center text-xl font-bold sm:text-2xl">
            Nosso impacto em números
          </h3>
          <dl className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { value: 150, suffix: "+", label: "Profissionais cadastrados", hint: "Intérpretes e consultores certificados" },
              { value: 80, suffix: "+", label: "Estabelecimentos atendidos", hint: "Museus, hotéis, restaurantes e CAT's" },
              { value: 2500, suffix: "+", label: "Experiências realizadas", hint: "Atendimentos e consultorias realizadas" },
              { value: 4.9, decimals: 1, suffix: "/5", label: "Satisfação dos clientes", hint: "Avaliação média da plataforma" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <dd className="text-3xl font-bold text-brand">
                  <CountUp
                    to={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                </dd>
                <dt className="mt-1 text-sm font-medium">{stat.label}</dt>
                <p className="text-xs text-muted-foreground">{stat.hint}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      {/* ODS */}
      <Section>
        <SectionHeading
          accent={false}
          title="Alinhamento com os Objetivos de Desenvolvimento Sustentável"
          description="O TurisAcess contribui diretamente para o alcance de 4 dos 17 Objetivos de Desenvolvimento Sustentável da ONU, promovendo impacto social e ambiental positivo."
        />
        <Reveal stagger={90} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sdgs.map(({ code, icon: Icon, title, text }) => (
            <Card key={code} className="h-full transition-shadow hover:shadow-lg">
              <CardContent className="flex h-full flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Badge>{code}</Badge>
                  <Icon className="size-4.5 text-brand" aria-hidden />
                </div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="text-xs text-muted-foreground">{text}</p>
              </CardContent>
            </Card>
          ))}
        </Reveal>
      </Section>

      {/* Pernambuco */}
      <Section className="pb-20">
        <Reveal className="rounded-3xl bg-brand-soft/70 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Por que começamos em Pernambuco?
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-muted-foreground">
            Pernambuco possui um rico patrimônio cultural e turístico, sendo um
            dos principais destinos do Nordeste brasileiro. O estado tem grande
            potencial para liderar o movimento de turismo inclusivo no país,
            combinando tradição, inovação e impacto social.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { icon: Landmark, title: "Rica cultura", text: "Patrimônio histórico e cultural únicos" },
              { icon: Heart, title: "Hospitalidade", text: "Tradição em receber bem os visitantes" },
              { icon: Lightbulb, title: "Inovação", text: "Ecossistema de inovação e tecnologia" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <span className="mx-auto grid size-12 place-items-center rounded-full bg-background text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>
    </>
  );
}
