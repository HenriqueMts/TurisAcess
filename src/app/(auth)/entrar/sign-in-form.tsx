"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SiteLogo } from "@/components/site-logo";
import { RolePicker } from "@/components/auth/role-picker";
import { Reveal } from "@/components/motion/reveal";
import { signInAction } from "@/app/(auth)/actions";
import type { Role } from "@/lib/profiles";

const demoAccounts: { email: string; role: Role }[] = [
  { email: "turista@demo.com", role: "turista" },
  { email: "profissional@demo.com", role: "profissional" },
  { email: "hotel@demo.com", role: "estabelecimento" },
];

export const DEMO_PASSWORD = "turisacess2026";

export function SignInForm() {
  const [state, action, pending] = useActionState(signInAction, null);
  const [role, setRole] = useState<Role>("turista");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-14 sm:py-20">
      <SiteLogo className="text-2xl" />
      <p className="mt-3 text-sm text-muted-foreground">
        Acesse sua conta para continuar
      </p>

      <Reveal from="none" scale className="mt-7 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Entrar na sua conta</CardTitle>
            <CardDescription>
              Digite suas credenciais para acessar a plataforma
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form action={action} className="space-y-4">
              <RolePicker value={role} onChange={setRole} />

              <div className="space-y-1.5">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="seu@email.com"
                    className="h-10 pl-9"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock
                    className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden
                  />
                  <Input
                    id="password"
                    name="password"
                    type={show ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    placeholder="Sua senha"
                    className="h-10 pr-10 pl-9"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShow((v) => !v)}
                    aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {show ? (
                      <EyeOff className="size-4" aria-hidden />
                    ) : (
                      <Eye className="size-4" aria-hidden />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-sm font-normal">
                  <Checkbox name="remember" /> Lembrar de mim
                </Label>
                <Link
                  href="/entrar"
                  className="text-sm text-brand hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              {state?.error && (
                <p
                  role="alert"
                  className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive"
                >
                  {state.error}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={pending}
                className="h-11 w-full"
              >
                <LogIn aria-hidden />
                {pending ? "Entrando…" : "Entrar"}
              </Button>
            </form>

            <Separator className="my-6" />

            <p className="mb-2 text-center text-xs font-medium text-muted-foreground">
              Contas de demonstração
            </p>
            <ul className="divide-y rounded-lg border">
              {demoAccounts.map((account) => (
                <li
                  key={account.email}
                  className="flex items-center justify-between gap-2 px-3 py-2 text-sm"
                >
                  <span className="truncate">{account.email}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setRole(account.role);
                      setEmail(account.email);
                      setPassword(DEMO_PASSWORD);
                    }}
                  >
                    Usar
                  </Button>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link href="/cadastrar" className="text-brand hover:underline">
                Cadastre-se aqui
              </Link>
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
