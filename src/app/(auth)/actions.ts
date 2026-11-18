"use server";

import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth/server";
import {
  getProfile,
  getUserIdByEmail,
  painelPath,
  upsertProfile,
  type Role,
} from "@/lib/profiles";

export type AuthState = { error?: string } | null;

const roles: Role[] = ["turista", "profissional", "estabelecimento"];

function readRole(formData: FormData): Role {
  const value = String(formData.get("role") ?? "turista");
  return (roles as string[]).includes(value) ? (value as Role) : "turista";
}

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function list(formData: FormData, key: string) {
  return formData
    .getAll(key)
    .map(String)
    .map((v) => v.trim())
    .filter(Boolean);
}

export async function signInAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = text(formData, "email");
  const password = text(formData, "password");

  if (!email || !password) {
    return { error: "Informe e-mail e senha." };
  }

  const { error } = await getAuth().signIn.email({ email, password });
  if (error) {
    return { error: "E-mail ou senha incorretos." };
  }

  const userId = await getUserIdByEmail(email);
  const profile = userId ? await getProfile(userId) : null;
  redirect(painelPath[profile?.role ?? readRole(formData)]);
}

export async function signUpAction(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const role = readRole(formData);
  const email = text(formData, "email");
  const password = text(formData, "password");

  const name =
    role === "estabelecimento"
      ? text(formData, "companyName")
      : role === "profissional"
        ? [text(formData, "firstName"), text(formData, "lastName")]
            .filter(Boolean)
            .join(" ")
        : text(formData, "fullName");

  if (!email || !password || !name) {
    return { error: "Preencha nome, e-mail e senha." };
  }
  if (password.length < 8) {
    return { error: "A senha precisa ter no mínimo 8 caracteres." };
  }

  const { error } = await getAuth().signUp.email({ email, name, password });
  if (error) {
    return {
      error:
        "Não foi possível criar a conta. Esse e-mail já pode estar cadastrado.",
    };
  }

  const userId = await getUserIdByEmail(email);
  if (!userId) {
    return { error: "Conta criada, mas não foi possível carregar o perfil." };
  }

  await upsertProfile({
    user_id: userId,
    role,
    full_name: name,
    phone: text(formData, "phone"),
    city: text(formData, "city"),
    accessibility_needs: list(formData, "accessibilityNeeds"),
    interests: text(formData, "interests"),
    specialty: text(formData, "specialty"),
    experience_years: text(formData, "experienceYears"),
    certifications: list(formData, "certifications"),
    company_name: text(formData, "companyName"),
    cnpj: text(formData, "cnpj"),
    address: text(formData, "address"),
    establishment_type: text(formData, "establishmentType"),
  });

  redirect(painelPath[role]);
}

export async function signOutAction() {
  await getAuth().signOut();
}
