"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { animate, utils } from "animejs";

/**
 * Transição entre páginas: o conteúdo entra com fade + leve subida sempre que
 * a rota muda, e uma barra fina de progresso corre no topo.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const contentRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    const content = contentRef.current;
    const bar = barRef.current;
    if (!content) return;

    const skip =
      document.visibilityState !== "visible" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (skip) {
      utils.set(content, { opacity: 1, translateY: 0, filter: "blur(0px)" });
      first.current = false;
      return;
    }

    if (bar && !first.current) {
      utils.set(bar, { scaleX: 0, opacity: 1 });
      animate(bar, {
        scaleX: [0, 1],
        duration: 520,
        ease: "out(4)",
        onComplete: () => animate(bar, { opacity: 0, duration: 220 }),
      });
    }
    first.current = false;

    const animation = animate(content, {
      opacity: [0, 1],
      translateY: [10, 0],
      filter: ["blur(6px)", "blur(0px)"],
      duration: 480,
      ease: "out(3)",
    });

    return () => {
      animation.revert();
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={barRef}
        aria-hidden
        className="fixed inset-x-0 top-0 z-100 h-0.5 origin-left bg-brand opacity-0"
      />
      <div ref={contentRef} className="flex min-h-0 flex-1 flex-col">
        {children}
      </div>
    </>
  );
}
