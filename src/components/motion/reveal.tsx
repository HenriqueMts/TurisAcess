"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { animate, onScroll, stagger } from "animejs";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 32 },
  right: { x: -32 },
  none: {},
};

function skipAnimation() {
  if (typeof window === "undefined") return true;
  // Aba em segundo plano congela o rAF: melhor mostrar o conteúdo já pronto
  // do que deixá-lo invisível até o usuário voltar.
  if (document.visibilityState !== "visible") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export type RevealProps = {
  children: ReactNode;
  /** Direção de entrada. */
  from?: Direction;
  /** Atraso inicial, em ms. */
  delay?: number;
  duration?: number;
  /** Anima os filhos diretos em cascata em vez do container. */
  stagger?: number | false;
  /** Leve zoom de entrada. */
  scale?: boolean;
  className?: string;
  as?: ElementType;
};

/**
 * Revela conteúdo quando ele entra na viewport (anime.js + onScroll).
 * O estado inicial (opacity: 0) vem do CSS via `data-reveal`, então não há
 * flash de conteúdo antes da hidratação.
 */
export function Reveal({
  children,
  from = "up",
  delay = 0,
  duration = 700,
  stagger: staggerMs = false,
  scale = false,
  className,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (skipAnimation()) {
      el.style.opacity = "1";
      el.style.willChange = "auto";
      el.removeAttribute("data-reveal");
      return;
    }

    const offset = offsets[from];
    const targets: Element[] =
      staggerMs !== false ? Array.from(el.children) : [el];

    if (staggerMs !== false) {
      // O container some do fluxo de animação; quem anima são os filhos.
      el.style.opacity = "1";
      for (const child of targets) {
        (child as HTMLElement).style.opacity = "0";
      }
    }

    const animation = animate(targets, {
      opacity: [0, 1],
      ...(offset.y !== undefined ? { translateY: [offset.y, 0] } : {}),
      ...(offset.x !== undefined ? { translateX: [offset.x, 0] } : {}),
      ...(scale ? { scale: [0.96, 1] } : {}),
      duration,
      delay:
        staggerMs !== false
          ? stagger(staggerMs as number, { start: delay })
          : delay,
      ease: "out(3)",
      autoplay: onScroll({ target: el, enter: "end-=60 start", repeat: false }),
      onComplete: () => {
        // Solta a camada de composição e o estado inicial do CSS: depois de
        // revelado o elemento é conteúdo normal.
        el.removeAttribute("data-reveal");
        el.style.willChange = "auto";
        for (const child of targets) {
          (child as HTMLElement).style.willChange = "auto";
        }
      },
    });

    return () => {
      animation.revert();
    };
  }, [from, delay, duration, staggerMs, scale]);

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
