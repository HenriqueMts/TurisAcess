"use server";

import { sql } from "@/lib/db";

export type NewsletterState = { ok?: boolean; error?: string } | null;

export async function subscribeNewsletter(
  _prev: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { error: "Informe um e-mail válido." };
  }

  try {
    await sql`
      insert into newsletter_subscribers (email) values (${email})
      on conflict (email) do nothing
    `;
    return { ok: true };
  } catch {
    return { error: "Não foi possível salvar sua inscrição. Tente de novo." };
  }
}
