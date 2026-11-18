import "server-only";
import { sql } from "@/lib/db";

export type Role = "turista" | "profissional" | "estabelecimento";

export type Profile = {
  user_id: string;
  role: Role;
  full_name: string;
  phone: string | null;
  city: string | null;
  accessibility_needs: string[];
  interests: string | null;
  specialty: string | null;
  experience_years: string | null;
  certifications: string[];
  company_name: string | null;
  cnpj: string | null;
  address: string | null;
  establishment_type: string | null;
};

/**
 * Id do usuário pelo e-mail, lido direto do schema do Neon Auth.
 * Usado logo após sign-in/sign-up, quando o cookie de sessão ainda não voltou
 * para o servidor e `getSession()` pode responder com a sessão anterior.
 */
export async function getUserIdByEmail(email: string): Promise<string | null> {
  const rows = (await sql`
    select id from neon_auth."user" where email = ${email} limit 1
  `) as { id: string }[];
  return rows[0]?.id ?? null;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const rows = (await sql`
    select * from profiles where user_id = ${userId}
  `) as Profile[];
  return rows[0] ?? null;
}

export async function upsertProfile(
  profile: Omit<Profile, "accessibility_needs" | "certifications"> & {
    accessibility_needs?: string[];
    certifications?: string[];
  },
) {
  await sql`
    insert into profiles (
      user_id, role, full_name, phone, city, accessibility_needs, interests,
      specialty, experience_years, certifications,
      company_name, cnpj, address, establishment_type
    ) values (
      ${profile.user_id}, ${profile.role}, ${profile.full_name}, ${profile.phone},
      ${profile.city}, ${profile.accessibility_needs ?? []}, ${profile.interests},
      ${profile.specialty}, ${profile.experience_years}, ${profile.certifications ?? []},
      ${profile.company_name}, ${profile.cnpj}, ${profile.address}, ${profile.establishment_type}
    )
    on conflict (user_id) do update set
      role = excluded.role,
      full_name = excluded.full_name,
      phone = excluded.phone,
      city = excluded.city,
      accessibility_needs = excluded.accessibility_needs,
      interests = excluded.interests,
      specialty = excluded.specialty,
      experience_years = excluded.experience_years,
      certifications = excluded.certifications,
      company_name = excluded.company_name,
      cnpj = excluded.cnpj,
      address = excluded.address,
      establishment_type = excluded.establishment_type
  `;
}

export const painelPath: Record<Role, string> = {
  turista: "/painel/turista",
  profissional: "/painel/profissional",
  estabelecimento: "/painel/estabelecimento",
};
