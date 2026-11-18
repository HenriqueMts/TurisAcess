import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  CalendarDays,
  ChartColumn,
  Phone,
  Plus,
  Search,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/motion/reveal";
import { StatTile } from "@/components/painel/stat-tile";
import { ProfessionalCard } from "@/components/cards/professional-card";
import { getCurrentUser } from "@/lib/auth/server";
import { getProfile } from "@/lib/profiles";
import { getProfessionals } from "@/lib/catalog";
import { formatDateTime, getBookings, statusTone } from "@/lib/painel";

export const metadata: Metadata = { title: "Painel do estabelecimento" };

const monthStats = [
  { label: "Total de agendamentos", value: "47" },
  { label: "Serviços concluídos", value: "42" },
  { label: "Taxa de cancelamento", value: "10,6%" },
  { label: "Avaliação média", value: "4,8/5,0" },
];

const topRequested = [
  { label: "Interpretação em Libras", share: 65 },
  { label: "Guia Turístico Acessível", share: 25 },
  { label: "Consultoria em Acessibilidade", share: 10 },
];

export default async function PainelEstabelecimentoPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar");

  const [profile, bookings, professionals] = await Promise.all([
    getProfile(user.id),
    getBookings(user.id),
    getProfessionals({ limit: 3 }),
  ]);

  const name = profile?.company_name ?? profile?.full_name ?? user.name;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Reveal className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Painel do <span className="text-brand">{name}</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie seus serviços de acessibilidade
          </p>
        </div>
        <Badge variant="secondary" className="text-brand">
          Estabelecimento
        </Badge>
      </Reveal>

      <Tabs defaultValue="visao" className="mt-8">
        <TabsList className="h-10 w-full">
          <TabsTrigger value="visao">Visão geral</TabsTrigger>
          <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
          <TabsTrigger value="profissionais">Profissionais</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="visao" className="mt-6">
          <Reveal stagger={70} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile
              icon={CalendarDays}
              value={bookings.length || 3}
              label="Agendamentos hoje"
            />
            <StatTile icon={Users} value={12} label="Profissionais ativos" />
            <StatTile icon={Star} value={4.8} decimals={1} label="Avaliação média" />
            <StatTile icon={TrendingUp} value={94} suffix="%" label="Taxa de satisfação" />
          </Reveal>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent>
                <h2 className="font-semibold">Ações rápidas</h2>
                <p className="text-sm text-muted-foreground">
                  Acesso rápido às funcionalidades principais
                </p>
                <div className="mt-4 grid gap-2">
                  <Button
                    size="lg"
                    className="h-11 w-full justify-start"
                    render={
                      <Link href="/buscar">
                        <Plus aria-hidden />
                        Novo agendamento
                      </Link>
                    }
                  />
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-11 w-full justify-start"
                    render={
                      <Link href="/profissionais">
                        <Search aria-hidden />
                        Buscar profissionais
                      </Link>
                    }
                  />
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-11 w-full justify-start"
                    render={
                      <Link href="/painel/estabelecimento">
                        <CalendarDays aria-hidden />
                        Ver calendário completo
                      </Link>
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h2 className="font-semibold">Próximos agendamentos</h2>
                <p className="text-sm text-muted-foreground">
                  Seus próximos compromissos
                </p>
                <ul className="mt-4 space-y-3">
                  {bookings.length === 0 && (
                    <li className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                      Nenhum agendamento registrado ainda.
                    </li>
                  )}
                  {bookings.map((booking) => (
                    <li
                      key={booking.id}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      <span
                        aria-hidden
                        className="grid size-9 place-items-center rounded-full bg-brand-soft text-xs font-semibold text-brand"
                      >
                        {(booking.professional_name ?? "TA")
                          .split(" ")
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join("")}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {booking.professional_name ?? booking.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(booking.scheduled_at)}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={statusTone[booking.status]}
                      >
                        {booking.status}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agendamentos" className="mt-6">
          <Card>
            <CardContent>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-semibold">Agendamentos</h2>
                <Button size="sm" render={<Link href="/buscar"><Plus aria-hidden />Novo agendamento</Link>} />
              </div>
              <ul className="mt-5 space-y-3">
                {bookings.length === 0 && (
                  <li className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                    Nenhum agendamento ainda. Busque um profissional para
                    começar.
                  </li>
                )}
                {bookings.map((booking) => (
                  <li
                    key={booking.id}
                    className="flex flex-wrap items-center gap-3 rounded-xl border p-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">
                        {booking.professional_name ?? booking.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDateTime(booking.scheduled_at)} ·{" "}
                        {booking.duration_min} min
                      </p>
                    </div>
                    <Badge variant="outline" className={statusTone[booking.status]}>
                      {booking.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Phone aria-hidden />
                      Contatar
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profissionais" className="mt-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Profissionais disponíveis</h2>
            <Button
              size="sm"
              render={
                <Link href="/profissionais">
                  <Search aria-hidden />
                  Buscar novos profissionais
                </Link>
              }
            />
          </div>
          <Reveal stagger={80} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {professionals.map((professional) => (
              <ProfessionalCard key={professional.id} item={professional} />
            ))}
          </Reveal>
        </TabsContent>

        <TabsContent value="relatorios" className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent>
              <h2 className="flex items-center gap-2 font-semibold">
                <ChartColumn className="size-4.5 text-brand" aria-hidden />
                Estatísticas do mês
              </h2>
              <dl className="mt-5 divide-y">
                {monthStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between py-2.5 text-sm"
                  >
                    <dt className="text-muted-foreground">{stat.label}</dt>
                    <dd className="font-semibold">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="font-semibold">Serviços mais solicitados</h2>
              <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
              <ul className="mt-5 space-y-4">
                {topRequested.map((service) => (
                  <li key={service.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span>{service.label}</span>
                      <span className="text-muted-foreground">
                        {service.share}%
                      </span>
                    </div>
                    <Progress value={service.share} className="mt-2" />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
