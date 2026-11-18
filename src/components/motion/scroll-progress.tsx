"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll } from "animejs";

/** Barra de progresso de leitura, sincronizada com o scroll da página. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animation = animate(el, {
      scaleX: [0, 1],
      ease: "linear",
      autoplay: onScroll({
        target: document.documentElement,
        enter: "top top",
        leave: "bottom bottom",
        sync: 0.25,
      }),
    });

    return () => {
      animation.revert();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-90 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-brand to-brand-deep"
    />
  );
}
