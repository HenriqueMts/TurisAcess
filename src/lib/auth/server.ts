import "server-only";
import { createNeonAuth } from "@neon/auth/next/server";

type NeonAuth = ReturnType<typeof createNeonAuth>;

let instance: NeonAuth | null = null;

/**
 * Neon Auth (Managed Better Auth). Sessões ficam no schema `neon_auth`.
 *
 * Criado sob demanda: `createNeonAuth` valida `cookies.secret` na hora da
 * chamada, e durante o `next build` as variáveis de ambiente podem não estar
 * disponíveis. Falhar aqui quebraria a coleta de páginas do build inteiro.
 */
export function getAuth(): NeonAuth {
  if (!instance) {
    const baseUrl = process.env.NEON_AUTH_BASE_URL;
    const secret = process.env.NEON_AUTH_COOKIE_SECRET;

    if (!baseUrl || !secret) {
      throw new Error(
        "Neon Auth não configurado: defina NEON_AUTH_BASE_URL e NEON_AUTH_COOKIE_SECRET (mínimo 32 caracteres).",
      );
    }

    instance = createNeonAuth({ baseUrl, cookies: { secret } });
  }
  return instance;
}

export type SessionUser = {
  id: string;
  email: string;
  name: string;
};

/**
 * Usuário logado, ou null. Só engole erros da própria sessão — o sinal de
 * renderização dinâmica do Next precisa subir, senão a rota é prerenderizada
 * sem cookies e o usuário aparece como deslogado no build.
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const { data } = await getAuth().getSession();
    if (!data?.user) return null;
    return {
      id: data.user.id,
      email: data.user.email,
      name: data.user.name ?? data.user.email,
    };
  } catch (error) {
    const digest = (error as { digest?: string })?.digest;
    if (typeof digest === "string" && digest.startsWith("DYNAMIC_SERVER_USAGE")) {
      throw error;
    }
    return null;
  }
}
