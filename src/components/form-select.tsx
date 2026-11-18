"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Select do shadcn/ui com placeholder e integração nativa com <form>
 * (o Base UI gera o input oculto a partir de `name`).
 */
export function FormSelect({
  name,
  placeholder,
  options,
  defaultValue = null,
  id,
}: {
  name: string;
  placeholder: string;
  options: string[];
  defaultValue?: string | null;
  id?: string;
}) {
  const items = Object.fromEntries(options.map((option) => [option, option]));

  return (
    <Select name={name} items={items} defaultValue={defaultValue}>
      <SelectTrigger id={id} className="h-10 w-full">
        <SelectValue>
          {(value: string | null) => value ?? placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
