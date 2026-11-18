-- TurisAcess — esquema de aplicação (Neon Postgres)
-- Usuários/sessões vivem no schema `neon_auth` gerenciado pelo Neon Auth.
-- Aqui ficam apenas os dados de domínio da plataforma.

create table if not exists profiles (
  user_id              text primary key,
  role                 text not null check (role in ('turista', 'profissional', 'estabelecimento')),
  full_name            text not null,
  phone                text,
  city                 text,
  -- turista
  accessibility_needs  text[] not null default '{}',
  interests            text,
  -- profissional
  specialty            text,
  experience_years     text,
  certifications       text[] not null default '{}',
  -- estabelecimento
  company_name         text,
  cnpj                 text,
  address              text,
  establishment_type   text,
  created_at           timestamptz not null default now()
);

create table if not exists services (
  id          serial primary key,
  slug        text unique not null,
  title       text not null,
  description text not null,
  icon        text not null,
  popular     boolean not null default false,
  sort_order  int not null default 0
);

create table if not exists establishments (
  id             serial primary key,
  slug           text unique not null,
  name           text not null,
  category       text not null,
  city           text not null,
  description    text not null,
  image_url      text not null,
  rating         numeric(2,1) not null default 0,
  reviews_count  int not null default 0,
  price_label    text not null default 'Gratuito',
  distance_km    numeric(4,1) not null default 0,
  verified       boolean not null default true,
  open_now       boolean not null default true,
  phone          text,
  accessibility  text[] not null default '{}',
  amenities      text[] not null default '{}'
);

create table if not exists professionals (
  id             serial primary key,
  slug           text unique not null,
  name           text not null,
  title          text not null,
  city           text not null,
  rating         numeric(2,1) not null default 0,
  reviews_count  int not null default 0,
  experience     int not null default 0,
  hourly_rate    int not null default 0,
  available      boolean not null default true,
  languages      text[] not null default '{}',
  certifications text[] not null default '{}'
);

create table if not exists bookings (
  id               serial primary key,
  user_id          text not null,
  establishment_id int references establishments (id) on delete set null,
  professional_id  int references professionals (id) on delete set null,
  service_id       int references services (id) on delete set null,
  title            text not null,
  scheduled_at     timestamptz not null,
  duration_min     int not null default 60,
  status           text not null default 'pendente' check (status in ('pendente', 'confirmado', 'concluido', 'cancelado')),
  price            int not null default 0,
  notes            text,
  created_at       timestamptz not null default now()
);

create index if not exists bookings_user_idx on bookings (user_id, scheduled_at desc);

create table if not exists favorites (
  user_id          text not null,
  establishment_id int not null references establishments (id) on delete cascade,
  created_at       timestamptz not null default now(),
  primary key (user_id, establishment_id)
);

create table if not exists reviews (
  id               serial primary key,
  user_id          text not null,
  author_name      text not null,
  establishment_id int references establishments (id) on delete cascade,
  professional_id  int references professionals (id) on delete cascade,
  rating           int not null check (rating between 1 and 5),
  comment          text not null,
  created_at       timestamptz not null default now(),
  constraint reviews_target_check check (num_nonnulls(establishment_id, professional_id) = 1)
);

create table if not exists newsletter_subscribers (
  email      text primary key,
  created_at timestamptz not null default now()
);
