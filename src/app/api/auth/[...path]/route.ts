import { getAuth } from "@/lib/auth/server";

type Context = { params: Promise<{ path: string[] }> };
type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// O handler é resolvido por requisição: no build as variáveis do Neon Auth
// podem não existir e `createNeonAuth` lançaria durante a coleta de páginas.
function proxy(method: Method) {
  return (request: Request, context: Context) =>
    getAuth().handler()[method](request, context);
}

export const GET = proxy("GET");
export const POST = proxy("POST");
export const PUT = proxy("PUT");
export const PATCH = proxy("PATCH");
export const DELETE = proxy("DELETE");
