"use client";

import { useEffect, useRef } from "react";
import { animate, onScroll, utils } from "animejs";

export type CountUpProps = {
  to: number;
  /** Casas decimais exibidas. */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Contador numérico que roda quando o número entra na viewport. */
export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1400,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const format = (value: number) =>
      `${prefix}${value.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}${suffix}`;

    if (
      document.visibilityState !== "visible" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.textContent = format(to);
      return;
    }

    const state = { value: 0 };
    el.textContent = format(0);

    const animation = animate(state, {
      value: to,
      duration,
      ease: "out(4)",
      onUpdate: () => {
        el.textContent = format(state.value);
      },
      autoplay: onScroll({ target: el, enter: "end-=20 start", repeat: false }),
    });

    return () => {
      animation.revert();
      utils.set(el, {});
      el.textContent = format(to);
    };
  }, [to, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
