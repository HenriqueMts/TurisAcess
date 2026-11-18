import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Award,
  BookOpen,
  CalendarDays,
  ChartColumn,
  CircleCheck,
  Clock,
  DollarSign,
  FileText,
  MessageCircle,
  Settings,
  Star,
  TriangleAlert,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/motion/reveal";
import { StatTile } from "@/components/painel/stat-tile";
import { getCurrentUser } from "@/lib/auth/server";
import { formatDateTime, getBookings, getUserStats, statusTone } from "@/lib/painel";

export const metadata: Metadata = { title: "Painel do profissional" };

const quickActions = [
  { icon: CalendarDays, label: "Agenda" },
  { icon: Award, label: "Certificações" },
  { icon: Clock, label: "Histórico" },
  { icon: DollarSign, label: "Financeiro" },
  { icon: BookOpen, label: "Aprender" },
  { icon: MessageCircle, label: "Chat" },
  { icon: FileText, label: "Relatórios" },
  { icon: Settings, label: "Configurações" },
];

const goals = [
  { label: "Receita da semana", value: 2850, target: 3000, format: (v: number) => `R$ ${v.toLocaleString("pt-BR")}` },
  { label: "Serviços realizados", value: 8, target: 10, format: (v: number) => String(v) },
  { label: "Avaliação média", value: 4.8, target: 4.5, format: (v: number) => `${v} ⭐` },
  { label: "Taxa de resposta", value: 93, target: 90, format: (v: number) => `${v}%` },
];

const requests = [
  { title: "Audiodescrição - Teatro Santa Isabel", org: "Teatro Santa Isabel", urgency: "alta", deadline: "Responder em 2h", price: 280, people: 120, when: "25/01 · 19:30 - 21:30", text: "Peça teatral com necessidade de audiodescrição para deficientes visuais." },
  { title: "Guia Turístico - Porto de Galinhas", org: "Agência Turismo PE", urgency: "média", deadline: "Responder em 1 dia", price: 520, people: 6, when: "28/01 · 08:00 - 17:00", text: "Tour completo com família que possui criança cadeirante." },
  { title: "Interpretação - Palestra UFPE", org: "Universidade Federal de PE", urgency: "baixa", deadline: "Responder em 3 dias", price: 200, people: 80, when: "30/01 · 14:00 - 16:00", text: "Palestra sobre sustentabilidade para estudantes." },
];

const urgencyTone: Record<string, string> = {
  alta: "border-destructive/30 bg-destructive/10 text-destructive",
  média: "border-warning/30 bg-warning/10 text-warning",
  baixa: "border-success/30 bg-success/10 text-success",
};

const certifications = [
  { name: "PROLIBRAS", issuer: "MEC", status: "válido", until: "15/12/2026" },
  { name: "Guia de Turismo", issuer: "EMBRATUR-PE", status: "válido", until: "20/06/2026" },
  { name: "Primeiros Socorros", issuer: "Cruz Vermelha", status: "expirando", until: "10/02/2026" },
];

const topServices = [
  { label: "Interpretação em Libras", count: 45 },
  { label: "Guia Turístico Acessível", count: 32 },
  { label: "Audiodescrição", count: 28 },
  { label: "Orientação e Mobilidade", count: 18 },
  { label: "Curso de Libras", count: 12 },
];

export default async function PainelProfissionalPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar");

  const [bookings, stats] = await Promise.all([
    getBookings(user.id),
    getUserStats(user.id),
  ]);

  const today = bookings.filter((b) => b.status !== "cancelado");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Reveal className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand">
            Bem-vindo ao seu dashboard! 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie seus serviços e acompanhe sua performance como profissional
            de acessibilidade
          </p>
        </div>
        <Button
          size="lg"
          className="h-11 px-5"
          render={
            <Link href="/painel/profissional">
              <CalendarDays aria-hidden />
              Ver agenda completa
            </Link>
          }
        />
      </Reveal>

      <Reveal
        stagger={50}
        className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8"
      >
        {quickActions.map(({ icon: Icon, label }) => (
          <button
            key={label}
            type="button"
            className="rounded-xl bg-brand-soft/60 px-3 py-4 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-brand-soft"
          >
            <Icon className="mx-auto size-4.5 text-brand" aria-hidden />
            <span className="mt-1.5 block text-xs font-medium">{label}</span>
          </button>
        ))}
      </Reveal>

      <Reveal
        stagger={60}
        className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8"
      >
        <StatTile icon={Users} value={stats.bookings || 156} label="Serviços" />
        <StatTile icon={DollarSign} value={stats.revenue || 8750} prefix="R$ " label="Este mês" />
        <StatTile icon={Star} value={4.8} decimals={1} label="Avaliação" />
        <StatTile icon={CircleCheck} value={96} suffix="%" label="Conclusão" />
        <StatTile icon={Clock} value={2} suffix="h" label="Resposta" />
        <StatTile icon={Users} value={23} label="Clientes" />
        <StatTile icon={Award} value={certifications.length} label="Certificações" />
        <StatTile icon={TriangleAlert} value={1} label="Expirando" />
      </Reveal>

      <Tabs defaultValue="visao" className="mt-8">
        <TabsList className="h-10 w-full">
          <TabsTrigger value="visao">Visão geral</TabsTrigger>
          <TabsTrigger value="hoje">Hoje</TabsTrigger>
          <TabsTrigger value="solicitacoes">Solicitações</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="visao" className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent>
              <h2 className="flex items-center gap-2 font-semibold">
                <ChartColumn className="size-4.5 text-brand" aria-hidden />
                Metas da semana
              </h2>
              <ul className="mt-5 space-y-4">
                {goals.map((goal) => (
                  <li key={goal.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span>{goal.label}</span>
                      <span className="text-muted-foreground">
                        {goal.format(goal.value)} / {goal.format(goal.target)}
                      </span>
                    </div>
                    <Progress
                      value={Math.min(100, (goal.value / goal.target) * 100)}
                      className="mt-2"
                    />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="flex items-center gap-2 font-semibold">
                <Award className="size-4.5 text-brand" aria-hidden />
                Certificações
              </h2>
              <ul className="mt-5 space-y-3">
                {certifications.map((certification) => (
                  <li
                    key={certification.name}
                    className="flex items-center justify-between gap-3 rounded-lg border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{certification.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {certification.issuer}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className={
                          certification.status === "válido"
                            ? "border-success/30 bg-success/10 text-success"
                            : "border-warning/30 bg-warning/10 text-warning"
                        }
                      >
                        {certification.status}
                      </Badge>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {certification.until}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardContent>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-2 font-semibold">
                    <BookOpen className="size-4.5 text-brand" aria-hidden />
                    Desenvolvimento profissional
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Continue aprendendo e aprimorando suas habilidades
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Ver cursos
                </Button>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                  { value: "3", label: "Cursos concluídos" },
                  { value: "67h", label: "Horas de estudo" },
                  { value: "3", label: "Certificados" },
                  { value: "15", label: "Dias consecutivos" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-brand-soft/50 p-4 text-center"
                  >
                    <dd className="text-xl font-bold text-brand">{item.value}</dd>
                    <dt className="text-xs text-muted-foreground">
                      {item.label}
                    </dt>
                  </div>
                ))}
              </dl>

              <div className="mt-5 rounded-xl border p-4">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium">
                      Fundamentos de Turismo Acessível
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Módulo 7 de 10: Tecnologias Assistivas em Turismo
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-brand">70%</p>
                    <p className="text-xs text-muted-foreground">
                      2h 30min restantes
                    </p>
                  </div>
                </div>
                <Progress value={70} className="mt-3" />
                <Button size="sm" className="mt-3">
                  Continuar estudando
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hoje" className="mt-6">
          <Card>
            <CardContent>
              <h2 className="font-semibold">Agenda de hoje</h2>
              <p className="text-sm text-muted-foreground">
                Seus compromissos confirmados na plataforma
              </p>
              <ul className="mt-5 space-y-4">
                {today.length === 0 && (
                  <li className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                    Nenhum compromisso agendado.
                  </li>
                )}
                {today.map((booking) => (
                  <li key={booking.id} className="rounded-xl border p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{booking.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {booking.establishment_name}
                        </p>
                        <Badge
                          variant="outline"
                          className={`mt-2 ${statusTone[booking.status]}`}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-brand">
                          R$ {booking.price}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(booking.scheduled_at)}
                        </p>
                      </div>
                    </div>
                    {booking.notes && (
                      <p className="mt-3 rounded-lg bg-brand-soft/60 px-3 py-2 text-xs">
                        <strong>Observações:</strong> {booking.notes}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        Ver detalhes
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle aria-hidden />
                        Chat
                      </Button>
                      <Button variant="outline" size="sm">
                        Navegação
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solicitacoes" className="mt-6">
          <Card>
            <CardContent>
              <h2 className="font-semibold">Solicitações de serviço</h2>
              <p className="text-sm text-muted-foreground">
                Gerencie as solicitações recebidas e responda rapidamente
              </p>
              <ul className="mt-5 space-y-4">
                {requests.map((request) => (
                  <li key={request.title} className="rounded-xl border p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium">{request.title}</p>
                          <Badge
                            variant="outline"
                            className={urgencyTone[request.urgency]}
                          >
                            Urgência {request.urgency}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {request.org}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {request.text}
                        </p>
                        <p className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
                          <span>{request.when}</span>
                          <span>{request.people} pessoas</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-brand">
                          R$ {request.price}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {request.deadline}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button size="sm">Aceitar</Button>
                      <Button variant="destructive" size="sm">
                        Recusar
                      </Button>
                      <Button variant="outline" size="sm">
                        Ver detalhes
                      </Button>
                      <Button variant="outline" size="sm">
                        Negociar
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent>
              <h2 className="font-semibold">Serviços mais realizados</h2>
              <p className="text-sm text-muted-foreground">
                Baseado nos últimos 30 dias
              </p>
              <ul className="mt-5 space-y-4">
                {topServices.map((service) => (
                  <li key={service.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span>{service.label}</span>
                      <span className="text-muted-foreground">
                        {service.count} vezes
                      </span>
                    </div>
                    <Progress
                      value={(service.count / topServices[0].count) * 100}
                      className="mt-2"
                    />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="font-semibold">Indicadores</h2>
              <dl className="mt-5 grid grid-cols-2 gap-4">
                {[
                  { label: "Serviços realizados", value: "156", hint: "+18% este mês" },
                  { label: "Receita mensal", value: "R$ 8.750", hint: "+22% vs mês anterior" },
                  { label: "Avaliação média", value: "4.8", hint: "+0,3 de clientes satisfeitos" },
                  { label: "Taxa de conclusão", value: "96%", hint: "+2% de serviços com sucesso" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border p-4">
                    <dd className="text-xl font-bold">{item.value}</dd>
                    <dt className="text-sm">{item.label}</dt>
                    <p className="text-xs text-success">{item.hint}</p>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
