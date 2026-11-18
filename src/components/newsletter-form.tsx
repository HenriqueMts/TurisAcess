"use client";

import { useActionState } from "react";
import { toast } from "sonner";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/app/actions/newsletter";

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletter, null);

  useEffect(() => {
    if (state?.ok) toast.success("Inscrição confirmada. Obrigado!");
    if (state?.error) toast.error(state.error);
  }, [state]);

  return (
    <form action={action} className="mt-3 flex gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Seu e-mail
      </label>
      <Input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="Seu e-mail"
        className="h-9 border-white/30 bg-white/15 text-white placeholder:text-white/70"
      />
      <Button
        type="submit"
        size="sm"
        disabled={pending}
        className="h-9 bg-white text-brand hover:bg-white/90"
      >
        {pending ? "…" : "Assinar"}
      </Button>
    </form>
  );
}
