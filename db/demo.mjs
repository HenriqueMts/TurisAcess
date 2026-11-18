// Cria as 3 contas de demonstração no Neon Auth e popula agenda/favoritos
// para cada painel. Uso: npm run db:demo
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });
config({ path: ".env", quiet: true });

const sql = neon(process.env.DATABASE_URL);
const authBase = process.env.NEON_AUTH_BASE_URL;
const PASSWORD = "turisacess2026";

const accounts = [
  {
    email: "turista@demo.com",
    name: "Ana Turista",
    role: "turista",
    profile: {
      phone: "(81) 9 9999-1111",
      city: "São Paulo, SP",
      accessibility_needs: ["Deficiência auditiva"],
      interests: "Praias acessíveis, museus e gastronomia regional.",
    },
  },
  {
    email: "profissional@demo.com",
    name: "Maria Santos",
    role: "profissional",
    profile: {
      phone: "(81) 9 9999-2222",
      city: "Recife, PE",
      specialty: "Intérprete de Libras",
      experience_years: "5 a 10 anos",
      certifications: ["PROLIBRAS", "FENEIS", "Pedagogia"],
    },
  },
  {
    email: "hotel@demo.com",
    name: "Hotel Mar Azul",
    role: "estabelecimento",
    profile: {
      phone: "(81) 3456-7890",
      city: "Recife, PE",
      company_name: "Hotel Mar Azul",
      cnpj: "12.345.678/0001-90",
      address: "Av. Boa Viagem, 1200 - Recife/PE",
      establishment_type: "Hotel ou Pousada",
    },
  },
];

async function ensureUser(account) {
  const existing = await sql`
    select id from neon_auth."user" where email = ${account.email} limit 1
  `;
  if (existing.length) return existing[0].id;

  const response = await fetch(`${authBase}/sign-up/email`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost:3000",
    },
    body: JSON.stringify({
      email: account.email,
      password: PASSWORD,
      name: account.name,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `sign-up falhou para ${account.email}: ${response.status} ${await response.text()}`,
    );
  }

  const rows = await sql`
    select id from neon_auth."user" where email = ${account.email} limit 1
  `;
  if (!rows.length) throw new Error(`usuário ${account.email} não apareceu no banco`);
  return rows[0].id;
}

function at(daysFromNow, hour) {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  date.setHours(hour, 0, 0, 0);
  return date.toISOString();
}

async function main() {
  if (!authBase) throw new Error("NEON_AUTH_BASE_URL ausente no .env.local");

  const ids = {};
  for (const account of accounts) {
    const id = await ensureUser(account);
    ids[account.role] = id;
    const p = account.profile;
    await sql`
      insert into profiles (
        user_id, role, full_name, phone, city, accessibility_needs, interests,
        specialty, experience_years, certifications,
        company_name, cnpj, address, establishment_type
      ) values (
        ${id}, ${account.role}, ${account.name}, ${p.phone ?? null}, ${p.city ?? null},
        ${p.accessibility_needs ?? []}, ${p.interests ?? null},
        ${p.specialty ?? null}, ${p.experience_years ?? null}, ${p.certifications ?? []},
        ${p.company_name ?? null}, ${p.cnpj ?? null}, ${p.address ?? null},
        ${p.establishment_type ?? null}
      )
      on conflict (user_id) do update set
        role = excluded.role, full_name = excluded.full_name, phone = excluded.phone,
        city = excluded.city, accessibility_needs = excluded.accessibility_needs,
        interests = excluded.interests, specialty = excluded.specialty,
        experience_years = excluded.experience_years, certifications = excluded.certifications,
        company_name = excluded.company_name, cnpj = excluded.cnpj,
        address = excluded.address, establishment_type = excluded.establishment_type
    `;
    console.log(`✔ conta ${account.email} (${account.role})`);
  }

  const userIds = Object.values(ids);
  await sql`delete from bookings  where user_id = any(${userIds}::text[])`;
  await sql`delete from favorites where user_id = any(${userIds}::text[])`;
  await sql`delete from reviews   where user_id = any(${userIds}::text[])`;

  const agenda = [
    [ids.turista, "instituto-ricardo-brennand", "joao-silva", "Tour guiado - Instituto Ricardo Brennand", at(3, 14), 180, "confirmado", 450, "Grupo de pessoas com deficiência visual. Foco em arte medieval."],
    [ids.turista, "teatro-santa-isabel", "maria-santos", "Interpretação em Libras - Teatro Santa Isabel", at(5, 19), 150, "pendente", 300, "Peça teatral com interpretação simultânea."],
    [ids.turista, "centro-historico-olinda", "ana-costa", "Tour acessível - Centro Histórico de Olinda", at(-20, 9), 240, "concluido", 380, null],
    [ids.turista, "restaurante-leite", "pedro-oliveira", "Jantar inclusivo - Restaurante Leite", at(-26, 20), 120, "concluido", 220, null],

    [ids.profissional, "hotel-atlante-plaza", "maria-santos", "Interpretação em Libras - Hotel Atlante Plaza", at(0, 9), 120, "confirmado", 300, "Reunião com investidores. Vocabulário técnico necessário."],
    [ids.profissional, "instituto-ricardo-brennand", "maria-santos", "Tour guiado - Instituto Ricardo Brennand", at(0, 14), 180, "confirmado", 450, "Grupo de pessoas com deficiência visual. Foco em arte medieval."],
    [ids.profissional, "museu-do-frevo", "maria-santos", "Audiodescrição - Museu do Frevo", at(2, 10), 120, "pendente", 280, null],

    [ids.estabelecimento, null, "maria-santos", "Intérprete de Libras - recepção", at(1, 14), 120, "confirmado", 300, null],
    [ids.estabelecimento, null, "joao-silva", "Guia turístico acessível - city tour", at(2, 9), 240, "pendente", 520, null],
    [ids.estabelecimento, null, "ana-costa", "Consultoria em acessibilidade", at(4, 16), 60, "confirmado", 150, null],
  ];

  for (const [userId, estSlug, proSlug, title, when, duration, status, price, notes] of agenda) {
    const establishmentId = estSlug
      ? (await sql`select id from establishments where slug = ${estSlug}`)[0]?.id ?? null
      : null;
    const professionalId =
      (await sql`select id from professionals where slug = ${proSlug}`)[0]?.id ?? null;

    await sql`
      insert into bookings
        (user_id, establishment_id, professional_id, title, scheduled_at, duration_min, status, price, notes)
      values (
        ${userId}, ${establishmentId}, ${professionalId},
        ${title}, ${when}, ${duration}, ${status}, ${price}, ${notes}
      )
    `;
  }

  for (const slug of ["hotel-atlante-plaza", "museu-do-frevo", "porto-de-galinhas", "teatro-santa-isabel"]) {
    await sql`
      insert into favorites (user_id, establishment_id)
      values (${ids.turista}, (select id from establishments where slug = ${slug}))
      on conflict do nothing
    `;
  }

  await sql`
    insert into reviews (user_id, author_name, establishment_id, rating, comment)
    values
      (${ids.turista}, 'Ana Turista', (select id from establishments where slug = 'centro-historico-olinda'), 5,
       'Experiência incrível! O guia foi muito atencioso e conhecia bem a história local.'),
      (${ids.turista}, 'Ana Turista', (select id from establishments where slug = 'restaurante-leite'), 4,
       'Cardápio em braile excelente. Ambiente muito acessível.')
  `;

  console.log("✔ agenda, favoritos e avaliações de demonstração criados");
  console.log(`   senha das contas demo: ${PASSWORD}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
