"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Accessibility, Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FormSelect } from "@/components/form-select";
import { SiteLogo } from "@/components/site-logo";
import { Reveal } from "@/components/motion/reveal";
import { signUpAction } from "@/app/(auth)/actions";
import type { Role } from "@/lib/profiles";

const establishmentTypes = [
  "Hotel ou Pousada",
  "Restaurante",
  "Museu ou Centro Cultural",
  "Teatro",
  "Shopping",
  "Atração Turística",
  "Centro de Atendimento ao Turista",
];

const specialties = [
  "Intérprete de Libras",
  "Guia Turístico Acessível",
  "Audiodescritor",
  "Consultor em Acessibilidade",
  "Acompanhante de PCD",
  "Instrutor de Mobilidade",
];

const experienceRanges = [
  "Menos de 1 ano",
  "1 a 3 anos",
  "3 a 5 anos",
  "5 a 10 anos",
  "Mais de 10 anos",
];

const accessibilityNeeds = [
  "Deficiência auditiva",
  "Deficiência visual",
  "Mobilidade reduzida",
  "Deficiência intelectual",
  "Neurodivergência",
  "Nenhuma",
];

const tabs: { value: Role; label: string; icon: typeof Users }[] = [
  { value: "estabelecimento", label: "Estabelecimento", icon: Building2 },
  { value: "profissional", label: "Profissional", icon: Users },
  { value: "turista", label: "Turista", icon: Accessibility },
];

const submitLabel: Record<Role, string> = {
  estabelecimento: "Criar conta de estabelecimento",
  profissional: "Criar conta profissional",
  turista: "Criar conta de turista",
};

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
    </div>
  );
}

export function SignUpForm({ initialRole }: { initialRole: Role }) {
  const [state, action, pending] = useActionState(signUpAction, null);
  const [role, setRole] = useState<Role>(initialRole);

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-14 sm:py-20">
      <SiteLogo className="text-2xl" />
      <p className="mt-3 text-sm text-muted-foreground">
        Crie sua conta e faça parte da nossa comunidade inclusiva
      </p>

      <Reveal from="none" scale className="mt-7 w-full">
        <Card>
          <CardHeader>
            <CardTitle>Criar nova conta</CardTitle>
            <CardDescription>
              Escolha o tipo de conta que melhor representa você
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs
              value={role}
              onValueChange={(value) => setRole(value as Role)}
              className="mb-6"
            >
              <TabsList className="h-10 w-full">
                {tabs.map(({ value, label, icon: Icon }) => (
                  <TabsTrigger key={value} value={value} className="gap-1.5">
                    <Icon aria-hidden />
                    <span className="hidden sm:inline">{label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <form action={action} className="space-y-4">
              <input type="hidden" name="role" value={role} />

              {role === "estabelecimento" && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nome da empresa" htmlFor="companyName">
                      <Input
                        id="companyName"
                        name="companyName"
                        required
                        placeholder="Hotel Mar Azul"
                        className="h-10"
                      />
                    </Field>
                    <Field label="CNPJ" htmlFor="cnpj">
                      <Input
                        id="cnpj"
                        name="cnpj"
                        placeholder="00.000.000/0001-00"
                        className="h-10"
                      />
                    </Field>
                    <Field label="E-mail de contato" htmlFor="email">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="contato@hotel.com"
                        className="h-10"
                      />
                    </Field>
                    <Field label="Telefone" htmlFor="phone">
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="(81) 3456-7890"
                        className="h-10"
                      />
                    </Field>
                  </div>
                  <Field
                    label="Tipo de estabelecimento"
                    htmlFor="establishmentType"
                  >
                    <FormSelect
                      id="establishmentType"
                      name="establishmentType"
                      placeholder="Selecione o tipo"
                      options={establishmentTypes}
                    />
                  </Field>
                  <Field label="Endereço" htmlFor="address">
                    <Input
                      id="address"
                      name="address"
                      placeholder="Rua da Praia, 123 - Boa Viagem, Recife/PE"
                      className="h-10"
                    />
                  </Field>
                </>
              )}

              {role === "profissional" && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nome" htmlFor="firstName">
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="Maria"
                        className="h-10"
                      />
                    </Field>
                    <Field label="Sobrenome" htmlFor="lastName">
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Santos"
                        className="h-10"
                      />
                    </Field>
                    <Field label="E-mail" htmlFor="email">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="maria@email.com"
                        className="h-10"
                      />
                    </Field>
                    <Field label="Telefone" htmlFor="phone">
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="(81) 9 9999-9999"
                        className="h-10"
                      />
                    </Field>
                  </div>
                  <Field label="Especialidade principal" htmlFor="specialty">
                    <FormSelect
                      id="specialty"
                      name="specialty"
                      placeholder="Selecione sua especialidade"
                      options={specialties}
                    />
                  </Field>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Anos de experiência"
                      htmlFor="experienceYears"
                    >
                      <FormSelect
                        id="experienceYears"
                        name="experienceYears"
                        placeholder="Selecione"
                        options={experienceRanges}
                      />
                    </Field>
                    <Field label="Localização" htmlFor="city">
                      <Input
                        id="city"
                        name="city"
                        placeholder="Recife, PE"
                        className="h-10"
                      />
                    </Field>
                  </div>
                  <Field label="Certificações" htmlFor="certifications">
                    <Textarea
                      id="certifications"
                      name="certifications"
                      rows={2}
                      placeholder="Liste suas certificações (PROLIBRAS, FENEIS, etc.)"
                    />
                  </Field>
                </>
              )}

              {role === "turista" && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nome completo" htmlFor="fullName">
                      <Input
                        id="fullName"
                        name="fullName"
                        required
                        placeholder="João Silva"
                        className="h-10"
                      />
                    </Field>
                    <Field label="E-mail" htmlFor="email">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="joao@email.com"
                        className="h-10"
                      />
                    </Field>
                    <Field label="Telefone" htmlFor="phone">
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="(81) 9 9999-9999"
                        className="h-10"
                      />
                    </Field>
                    <Field label="Cidade/Estado" htmlFor="city">
                      <Input
                        id="city"
                        name="city"
                        placeholder="São Paulo, SP"
                        className="h-10"
                      />
                    </Field>
                  </div>
                  <Field
                    label="Necessidades de acessibilidade"
                    htmlFor="accessibilityNeeds"
                  >
                    <FormSelect
                      id="accessibilityNeeds"
                      name="accessibilityNeeds"
                      placeholder="Selecione suas necessidades (opcional)"
                      options={accessibilityNeeds}
                    />
                  </Field>
                  <Field label="Interesses turísticos" htmlFor="interests">
                    <Textarea
                      id="interests"
                      name="interests"
                      rows={2}
                      placeholder="Conte-nos sobre seus interesses de viagem (praias, cultura, gastronomia, etc.)"
                    />
                  </Field>
                </>
              )}

              <Field label="Senha" htmlFor="password">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Mínimo 8 caracteres"
                  className="h-10"
                />
              </Field>

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
                {pending ? "Criando conta…" : submitLabel[role]}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/entrar" className="text-brand hover:underline">
                Faça login aqui
              </Link>
            </p>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}
