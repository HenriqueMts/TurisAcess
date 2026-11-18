import "server-only";
import { sql } from "@/lib/db";

export type BookingRow = {
  id: number;
  title: string;
  scheduled_at: string;
  duration_min: number;
  status: "pendente" | "confirmado" | "concluido" | "cancelado";
  price: number;
  notes: string | null;
  establishment_name: string | null;
  establishment_city: string | null;
  establishment_image: string | null;
  professional_name: string | null;
};

export async function getBookings(userId: string) {
  return (await sql`
    select
      b.id, b.title, b.scheduled_at, b.duration_min, b.status, b.price, b.notes,
      e.name as establishment_name,
      e.city as establishment_city,
      e.image_url as establishment_image,
      p.name as professional_name
    from bookings b
    left join establishments e on e.id = b.establishment_id
    left join professionals  p on p.id = b.professional_id
    where b.user_id = ${userId}
    order by b.scheduled_at
  `) as BookingRow[];
}

export async function getFavorites(userId: string) {
  return (await sql`
    select e.id, e.name, e.category, e.rating, e.image_url
    from favorites f
    join establishments e on e.id = f.establishment_id
    where f.user_id = ${userId}
    order by e.rating desc
  `) as {
    id: number;
    name: string;
    category: string;
    rating: string;
    image_url: string;
  }[];
}

export async function getUserReviews(userId: string) {
  return (await sql`
    select r.id, r.rating, r.comment, r.created_at, e.name as establishment_name
    from reviews r
    left join establishments e on e.id = r.establishment_id
    where r.user_id = ${userId}
    order by r.created_at desc
  `) as {
    id: number;
    rating: number;
    comment: string;
    created_at: string;
    establishment_name: string | null;
  }[];
}

export async function getUserStats(userId: string) {
  const [row] = (await sql`
    select
      (select count(*)::int from bookings  where user_id = ${userId})                          as bookings,
      (select count(*)::int from bookings  where user_id = ${userId} and status = 'concluido') as completed,
      (select count(*)::int from favorites where user_id = ${userId})                          as favorites,
      (select count(*)::int from reviews   where user_id = ${userId})                          as reviews,
      (select coalesce(round(avg(rating), 1), 0)::float from reviews where user_id = ${userId}) as avg_rating,
      (select coalesce(sum(price), 0)::int from bookings where user_id = ${userId} and status <> 'cancelado') as revenue
  `) as {
    bookings: number;
    completed: number;
    favorites: number;
    reviews: number;
    avg_rating: number;
    revenue: number;
  }[];
  return row;
}

export function formatDateTime(value: string) {
  return new Date(value).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const statusTone: Record<BookingRow["status"], string> = {
  confirmado: "border-success/30 bg-success/10 text-success",
  pendente: "border-warning/30 bg-warning/10 text-warning",
  concluido: "border-brand/30 bg-brand-soft text-brand-700",
  cancelado: "border-destructive/30 bg-destructive/10 text-destructive",
};
