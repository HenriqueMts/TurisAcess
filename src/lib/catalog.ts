import "server-only";
import { sql } from "@/lib/db";

export type Establishment = {
  id: number;
  slug: string;
  name: string;
  category: string;
  city: string;
  description: string;
  image_url: string;
  rating: string;
  reviews_count: number;
  price_label: string;
  distance_km: string;
  verified: boolean;
  open_now: boolean;
  phone: string | null;
  accessibility: string[];
  amenities: string[];
};

export type Professional = {
  id: number;
  slug: string;
  name: string;
  title: string;
  city: string;
  rating: string;
  reviews_count: number;
  experience: number;
  hourly_rate: number;
  available: boolean;
  languages: string[];
  certifications: string[];
};

export type Service = {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  popular: boolean;
};

export async function getServices() {
  return (await sql`
    select * from services order by sort_order
  `) as Service[];
}

export async function getEstablishments(options?: {
  limit?: number;
  query?: string;
  categories?: string[];
  accessibility?: string[];
  minRating?: number;
  sort?: "relevance" | "rating" | "distance" | "price";
}) {
  const {
    limit = 100,
    query = "",
    categories = [],
    accessibility = [],
    minRating = 0,
    sort = "relevance",
  } = options ?? {};

  const rows = (await sql`
    select * from establishments
    where (${query} = '' or name ilike ${"%" + query + "%"} or description ilike ${"%" + query + "%"} or city ilike ${"%" + query + "%"})
      and (cardinality(${categories}::text[]) = 0 or category = any(${categories}::text[]))
      and (cardinality(${accessibility}::text[]) = 0 or accessibility && ${accessibility}::text[])
      and rating >= ${minRating}
    order by
      case when ${sort} = 'rating' then rating end desc nulls last,
      case when ${sort} = 'distance' then distance_km end asc nulls last,
      case when ${sort} = 'relevance' then reviews_count end desc nulls last,
      rating desc
    limit ${limit}
  `) as Establishment[];

  return rows;
}

export async function getEstablishmentCategories() {
  const rows = (await sql`
    select category, count(*)::int as total
    from establishments group by category order by total desc
  `) as { category: string; total: number }[];
  return rows;
}

export async function getAccessibilityFeatures() {
  const rows = (await sql`
    select distinct unnest(accessibility) as feature
    from establishments order by feature
  `) as { feature: string }[];
  return rows.map((r) => r.feature);
}

export async function getProfessionals(options?: {
  limit?: number;
  query?: string;
}) {
  const { limit = 100, query = "" } = options ?? {};
  return (await sql`
    select * from professionals
    where (${query} = '' or name ilike ${"%" + query + "%"} or title ilike ${"%" + query + "%"})
    order by rating desc, reviews_count desc
    limit ${limit}
  `) as Professional[];
}

export async function getPlatformStats() {
  const [row] = (await sql`
    select
      (select count(*)::int from professionals)   as professionals,
      (select count(*)::int from establishments)  as establishments,
      (select coalesce(round(avg(rating), 1), 0)::float from establishments) as rating,
      (select coalesce(sum(reviews_count), 0)::int from establishments)      as reviews
  `) as { professionals: number; establishments: number; rating: number; reviews: number }[];
  return row;
}
