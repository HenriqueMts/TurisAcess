import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Accessibility,
  CalendarCheck,
  Camera,
  Heart,
  MapPin,
  Plus,
  Route,
  Star,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Reveal } from "@/components/motion/reveal";
import { StatTile } from "@/components/painel/stat-tile";
import { getCurrentUser } from "@/lib/auth/server";
import { getProfile } from "@/lib/profiles";
import {
  formatDateTime,
  getBookings,
  getFavorites,
  getUserReviews,
  getUserStats,
  statusTone,
} from "@/lib/painel";

export const metadata: Metadata = { title: "Painel do turista" };

const roteiros = [
  { name: "Roteiro Acessível - 3 dias em Recife", progress: 7, total: 12, next: "Casa da Cultura", level: "Fácil" },
  { name: "Praias Acessíveis de PE", progress: 2, total: 8, next: "Praia dos Carneiros", level: "Moderado" },
];

const recommendations = [
  { tag: "Novidade", title: "Museu interativo com realidade virtual", text: "Tecnologia de ponta com recursos de acessibilidade", kind: "Museu" },
  { tag: "Promoção", title: "Tour noturno pelo Recife Antigo", text: "20% off para reservas até esta semana", kind: "Tour" },
  { tag: "Para você", title: "Workshop de artesanato adaptado", text: "Baseado no seu interesse em cultura local", kind: "Workshop" },
];

export default async function PainelTuristaPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar");

  const [profile, bookings, favorites, reviews, stats] = await Promise.all([
    getProfile(user.id),
    getBookings(user.id),
    getFavorites(user.id),
    getUserReviews(user.id),
    getUserStats(user.id),
  ]);

  const upcoming = bookings.filter((b) => b.status !== "concluido");
  const past = bookings.filter((b) => b.status === "concluido");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Reveal className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand">
            Bem-vindo de volta! 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Pronto para sua próxima experiência acessível em Pernambuco,{" "}
            {profile?.full_name ?? user.name}?
          </p>
        </div>
        <Button
          size="lg"
          className="h-11 px-5"
          render={
            <Link href="/buscar">
              <Plus aria-hidden />
              Nova experiência
            </Link>
          }
        />
      </Reveal>

      <Reveal
        stagger={70}
        className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
      >
        <StatTile icon={Camera} value={stats.bookings} label="Experiências" />
        <StatTile icon={Heart} value={stats.favorites} label="Favoritos" />
        <StatTile icon={Route} value={roteiros.length} label="Roteiros" />
        <StatTile icon={Star} value={stats.avg_rating} decimals={1} label="Avaliação" />
        <StatTile icon={TrendingUp} value={stats.reviews} label="Avaliações" />
        <StatTile icon={Accessibility} value={95} suffix="%" label="Acessibilidade" />
      </Reveal>

      <Tabs defaultValue="visao" className="mt-8">
        <TabsList className="h-10 w-full">
          <TabsTrigger value="visao">Visão geral</TabsTrigger>
          <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
          <TabsTrigger value="experiencias">Experiências</TabsTrigger>
          <TabsTrigger value="recomendacoes">Recomendações</TabsTrigger>
        </TabsList>

        <TabsContent value="visao" className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardContent>
              <h2 className="flex items-center gap-2 font-semibold">
                <CalendarCheck className="size-4.5 text-brand" aria-hidden />
                Próximos agendamentos
              </h2>
              <ul className="mt-4 space-y-3">
                {upcoming.length === 0 && (
                  <li className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                    Você ainda não tem agendamentos.
                  </li>
                )}
                {upcoming.map((booking) => (
                  <li
                    key={booking.id}
                    className="flex gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    {booking.establishment_image && (
                      <Image
                        src={booking.establishment_image}
                        alt=""
                        width={56}
                        height={56}
                        className="size-14 shrink-0 rounded-md object-cover"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {booking.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {booking.professional_name}
                      </p>
                      <p className="mt-1 text-xs text-brand">
                        {formatDateTime(booking.scheduled_at)}
                      </p>
                    </div>
                    <Badge variant="outline" className={statusTone[booking.status]}>
                      {booking.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="flex items-center gap-2 font-semibold">
                <Heart className="size-4.5 text-brand" aria-hidden />
                Seus favoritos
              </h2>
              <ul className="mt-4 space-y-3">
                {favorites.length === 0 && (
                  <li className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                    Nenhum favorito salvo ainda.
                  </li>
                )}
                {favorites.map((favorite) => (
                  <li key={favorite.id} className="flex items-center gap-3">
                    <Image
                      src={favorite.image_url}
                      alt=""
                      width={44}
                      height={44}
                      className="size-11 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {favorite.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {favorite.category} · ⭐ {favorite.rating}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="flex items-center gap-2 font-semibold">
                <Route className="size-4.5 text-brand" aria-hidden />
                Roteiros em andamento
              </h2>
              <ul className="mt-4 space-y-4">
                {roteiros.map((roteiro) => (
                  <li key={roteiro.name}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{roteiro.name}</span>
                      <span className="text-muted-foreground">
                        {roteiro.progress}/{roteiro.total}
                      </span>
                    </div>
                    <Progress
                      value={(roteiro.progress / roteiro.total) * 100}
                      className="mt-2"
                    />
                    <p className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span>Próximo: {roteiro.next}</span>
                      <span>{roteiro.level}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="flex items-center gap-2 font-semibold">
                <Star className="size-4.5 text-brand" aria-hidden />
                Experiências recentes
              </h2>
              <ul className="mt-4 space-y-3">
                {past.length === 0 && (
                  <li className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                    Suas experiências concluídas aparecerão aqui.
                  </li>
                )}
                {past.map((booking) => (
                  <li key={booking.id} className="rounded-lg border p-3">
                    <p className="text-sm font-medium">{booking.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.establishment_name} ·{" "}
                      {formatDateTime(booking.scheduled_at)}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agendamentos" className="mt-6">
          <Card>
            <CardContent>
              <h2 className="font-semibold">Seus agendamentos</h2>
              <p className="text-sm text-muted-foreground">
                Gerencie suas próximas experiências acessíveis
              </p>
              <ul className="mt-5 space-y-4">
                {bookings.length === 0 && (
                  <li className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                    Nenhum agendamento por aqui ainda.{" "}
                    <Link href="/buscar" className="text-brand hover:underline">
                      Explore a plataforma
                    </Link>
                    .
                  </li>
                )}
                {bookings.map((booking) => (
                  <li
                    key={booking.id}
                    className="flex flex-wrap gap-4 rounded-xl border p-4"
                  >
                    {booking.establishment_image && (
                      <Image
                        src={booking.establishment_image}
                        alt=""
                        width={64}
                        height={64}
                        className="size-16 rounded-lg object-cover"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{booking.title}</p>
                        <Badge
                          variant="outline"
                          className={statusTone[booking.status]}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {booking.professional_name}
                      </p>
                      <p className="mt-1 flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <span>{formatDateTime(booking.scheduled_at)}</span>
                        {booking.establishment_city && (
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3.5" aria-hidden />
                            {booking.establishment_city}
                          </span>
                        )}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">
                          Ver detalhes
                        </Button>
                        <Button variant="outline" size="sm">
                          Reagendar
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experiencias" className="mt-6">
          <Card>
            <CardContent>
              <h2 className="font-semibold">Suas experiências</h2>
              <p className="text-sm text-muted-foreground">
                Reviva seus momentos especiais e compartilhe suas avaliações
              </p>
              <ul className="mt-5 space-y-4">
                {reviews.length === 0 && (
                  <li className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                    Você ainda não avaliou nenhuma experiência.
                  </li>
                )}
                {reviews.map((review) => (
                  <li key={review.id} className="rounded-xl border p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{review.establishment_name}</p>
                      <p aria-label={`${review.rating} de 5`}>
                        {"★".repeat(review.rating)}
                        <span className="text-muted-foreground/40">
                          {"★".repeat(5 - review.rating)}
                        </span>
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground italic">
                      “{review.comment}”
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recomendacoes" className="mt-6">
          <Card>
            <CardContent>
              <h2 className="flex items-center gap-2 font-semibold">
                <TrendingUp className="size-4.5 text-brand" aria-hidden />
                Recomendações personalizadas
              </h2>
              <p className="text-sm text-muted-foreground">
                Baseadas no seu perfil e experiências anteriores
              </p>
              <ul className="mt-5 space-y-3">
                {recommendations.map((item) => (
                  <li
                    key={item.title}
                    className="flex flex-wrap items-center gap-3 rounded-xl border-l-4 border-brand bg-muted/40 p-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.text}
                      </p>
                      <p className="mt-1 text-xs text-brand">{item.kind}</p>
                    </div>
                    <Badge variant="secondary">{item.tag}</Badge>
                    <Button size="sm" render={<Link href="/buscar">Ver mais</Link>} />
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Reveal stagger={80} className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Accessibility, title: "Configurar acessibilidade", text: "Personalize suas preferências de acessibilidade" },
          { icon: Route, title: "Criar roteiro", text: "Monte seu roteiro personalizado e acessível" },
          { icon: Plus, title: "Explorar mais", text: "Descubra novos estabelecimentos e experiências" },
        ].map(({ icon: Icon, title, text }) => (
          <Card
            key={title}
            className="text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <CardContent>
              <Icon className="mx-auto size-6 text-brand" aria-hidden />
              <h3 className="mt-2 font-semibold">{title}</h3>
              <p className="text-xs text-muted-foreground">{text}</p>
            </CardContent>
          </Card>
        ))}
      </Reveal>
    </div>
  );
}
