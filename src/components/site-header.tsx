import Link from "next/link";
import { Bell, LogIn, Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteLogo } from "@/components/site-logo";
import { DesktopNav, MobileNav } from "@/components/site-nav";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { getCurrentUser } from "@/lib/auth/server";
import { getProfile, painelPath, type Role } from "@/lib/profiles";

const roleLabel: Record<Role, string> = {
  turista: "Turista",
  profissional: "Profissional",
  estabelecimento: "Estabelecimento",
};

const roleCta: Record<Role, string> = {
  turista: "Meus favoritos",
  profissional: "Minha agenda",
  estabelecimento: "Gerenciar serviços",
};

export async function SiteHeader() {
  const user = await getCurrentUser();
  const profile = user ? await getProfile(user.id) : null;
  const role: Role = profile?.role ?? "turista";

  return (
    <>
      {user && (
        <div className="bg-success/10 px-4 py-1.5 text-center text-xs text-success">
          <span
            className="mr-1.5 inline-block size-1.5 rounded-full bg-success align-middle"
            aria-hidden
          />
          Conectado como {profile?.full_name ?? user.name} • {roleLabel[role]}
        </div>
      )}

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/65">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <SiteLogo />

          <div className="flex-1">
            <DesktopNav />
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              render={
                <Link href="/buscar">
                  <Search aria-hidden />
                  Busca avançada
                </Link>
              }
            />

            {user ? (
              <>
                <Button variant="ghost" size="icon" className="relative" render={
                  <Link href={painelPath[role]} aria-label="Notificações">
                    <Bell aria-hidden />
                    <Badge className="absolute -top-1 -right-1 size-4 justify-center rounded-full p-0 text-[10px]">
                      2
                    </Badge>
                  </Link>
                } />
                <Button
                  size="sm"
                  render={<Link href={painelPath[role]}>{roleCta[role]}</Link>}
                />
                <SignOutButton />
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  render={
                    <Link href="/entrar">
                      <LogIn aria-hidden />
                      Entrar
                    </Link>
                  }
                />
                <Button
                  size="sm"
                  render={
                    <Link href="/cadastrar">
                      <UserPlus aria-hidden />
                      Cadastrar
                    </Link>
                  }
                />
              </>
            )}
          </div>

          <MobileNav>
            {user ? (
              <>
                <Button
                  className="w-full"
                  render={<Link href={painelPath[role]}>{roleCta[role]}</Link>}
                />
                <SignOutButton className="w-full" />
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="w-full"
                  render={<Link href="/entrar">Entrar</Link>}
                />
                <Button
                  className="w-full"
                  render={<Link href="/cadastrar">Cadastrar</Link>}
                />
              </>
            )}
          </MobileNav>
        </div>
      </header>
    </>
  );
}
