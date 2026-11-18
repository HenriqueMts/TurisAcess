import "server-only";
import { createNeonAuth } from "@neon/auth/next/server";

/** Neon Auth (Managed Better Auth). Sessões ficam no schema `neon_auth`. */
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});

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
    const { data } = await auth.getSession();
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
