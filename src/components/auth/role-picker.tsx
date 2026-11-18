"use client";

import { Accessibility, Building2, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Role } from "@/lib/profiles";

export const roleOptions: { value: Role; label: string; icon: typeof Users }[] = [
  { value: "turista", label: "Turista", icon: Accessibility },
  { value: "profissional", label: "Profissional", icon: Users },
  { value: "estabelecimento", label: "Estabelecimento", icon: Building2 },
];

export function RolePicker({
  value,
  onChange,
  name = "role",
}: {
  value: Role;
  onChange: (role: Role) => void;
  name?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium">Tipo de usuário</legend>
      <input type="hidden" name={name} value={value} />
      <div className="grid grid-cols-3 gap-2">
        {roleOptions.map(({ value: option, label, icon: Icon }) => {
          const selected = option === value;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-xs font-medium transition-all duration-200",
                selected
                  ? "border-brand bg-brand text-white shadow-md shadow-brand/25"
                  : "border-border hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand-soft/60",
              )}
            >
              <Icon className="size-4" aria-hidden />
              {label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
