import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/server";

// O painel sempre depende da sessão: nada aqui pode ser prerenderizado.
export const dynamic = "force-dynamic";

export default async function PainelLayout({
  children,
}: LayoutProps<"/painel">) {
  const user = await getCurrentUser();
  if (!user) redirect("/entrar");
  return <>{children}</>;
}
