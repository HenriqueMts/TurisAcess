"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export const navLinks = [
  { href: "/", label: "Início" },
  { href: "/buscar", label: "Buscar" },
  { href: "/servicos", label: "Serviços" },
  { href: "/profissionais", label: "Profissionais" },
  { href: "/estabelecimentos", label: "Estabelecimentos" },
  { href: "/sobre", label: "Sobre" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function DesktopNav() {
  const pathname = usePathname();
  return (
    <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          aria-current={isActive(pathname, link.href) ? "page" : undefined}
          className={cn(
            "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive(pathname, link.href)
              ? "text-brand"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {link.label}
          <span
            className={cn(
              "absolute inset-x-3 -bottom-px h-0.5 origin-left rounded-full bg-brand transition-transform duration-300",
              isActive(pathname, link.href) ? "scale-x-100" : "scale-x-0",
            )}
          />
        </Link>
      ))}
    </nav>
  );
}

export function MobileNav({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // O sheet fecha ao navegar; sem efeito, direto no clique.
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu aria-hidden />
            <span className="sr-only">Abrir menu</span>
          </Button>
        }
      />
      <SheetContent side="right" className="w-[300px]">
        <SheetHeader>
          <SheetTitle>Navegação</SheetTitle>
        </SheetHeader>
        <nav aria-label="Principal (móvel)" className="flex flex-col gap-1 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className={cn(
                "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                isActive(pathname, link.href)
                  ? "bg-brand-soft text-brand"
                  : "hover:bg-muted",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/buscar"
            onClick={close}
            className="mt-2 flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted"
          >
            <Search className="size-4" aria-hidden />
            Busca avançada
          </Link>
        </nav>
        <div className="mt-4 flex flex-col gap-2 px-4" onClick={close}>
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
