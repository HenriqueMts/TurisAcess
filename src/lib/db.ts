import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let client: NeonQueryFunction<false, false> | null = null;

/**
 * Cliente SQL da Neon (HTTP, serverless-friendly), criado sob demanda.
 *
 * A criação é preguiçosa de propósito: durante o `next build` as variáveis de
 * ambiente podem não estar presentes, e nesse caso o build não deve quebrar —
 * só a requisição que realmente precisa do banco.
 */
export const sql: NeonQueryFunction<false, false> = ((
  ...args: Parameters<NeonQueryFunction<false, false>>
) => {
  if (!client) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL não definido. Rode `npx neon@latest deploy` localmente, ou configure a variável no ambiente de deploy.",
      );
    }
    client = neon(connectionString);
  }
  return client(...args);
}) as NeonQueryFunction<false, false>;
