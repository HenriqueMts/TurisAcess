import type { Metadata } from "next";
import { SignUpForm } from "./sign-up-form";
import type { Role } from "@/lib/profiles";

export const metadata: Metadata = {
  title: "Criar conta",
  description:
    "Crie sua conta na TurisAcess como turista, profissional de acessibilidade ou estabelecimento.",
};

const roles: Role[] = ["turista", "profissional", "estabelecimento"];

export default async function CadastrarPage({
  searchParams,
}: PageProps<"/cadastrar">) {
  const params = await searchParams;
  const requested = String(params?.perfil ?? "estabelecimento");
  const initialRole = (roles as string[]).includes(requested)
    ? (requested as Role)
    : "estabelecimento";

  return <SignUpForm initialRole={initialRole} />;
}
