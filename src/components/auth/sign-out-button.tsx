"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signOutAction } from "@/app/(auth)/actions";

export function SignOutButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="ghost" size="sm" className={className}>
            <LogOut aria-hidden />
            Sair
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirmar logout</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja sair da sua conta? Você precisará fazer
            login novamente para acessar as funcionalidades da plataforma.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancelar</Button>} />
          <Button
            variant="destructive"
            disabled={pending}
            onClick={() =>
              startTransition(async () => {
                await signOutAction();
                setOpen(false);
                router.refresh();
              })
            }
          >
            <LogOut aria-hidden />
            {pending ? "Saindo…" : "Sair"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
