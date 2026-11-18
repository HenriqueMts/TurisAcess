"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { animate, createTimeline, stagger } from "animejs";
import {
  Accessibility,
  Award,
  Building2,
  CalendarClock,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/motion/count-up";

const stats = [
  { icon: Users, value: 150, suffix: "+", label: "Profissionais" },
  { icon: MapPin, value: 80, suffix: "+", label: "Estabelecimentos" },
  { icon: Star, value: 4.9, decimals: 1, label: "Avaliação" },
  { icon: ShieldCheck, value: 100, suffix: "%", label: "Certificados" },
];

export function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.querySelectorAll<HTMLElement>("[data-hero]").forEach((node) => {
        node.style.opacity = "1";
      });
      return;
    }

    const timeline = createTimeline({ defaults: { ease: "out(3)" } })
      .add("[data-hero='title'] > span", {
        opacity: [0, 1],
        translateY: [26, 0],
        duration: 800,
        delay: stagger(90),
      })
      .add(
        "[data-hero='text']",
        { opacity: [0, 1], translateY: [16, 0], duration: 600 },
        "-=500",
      )
      .add(
        "[data-hero='cta'] > *",
        { opacity: [0, 1], translateY: [14, 0], duration: 500, delay: stagger(70) },
        "-=400",
      )
      .add(
        "[data-hero='stat']",
        { opacity: [0, 1], translateY: [14, 0], duration: 500, delay: stagger(70) },
        "-=350",
      )
      .add(
        "[data-hero='art']",
        { opacity: [0, 1], scale: [0.94, 1], duration: 900 },
        "-=900",
      )
      .add(
        "[data-hero='float']",
        { opacity: [0, 1], translateY: [18, 0], duration: 600, delay: stagger(140) },
        "-=350",
      );

    // Flutuação contínua e discreta dos cartões sobre a imagem.
    const floaters = animate("[data-hero='float']", {
      translateY: [0, -8, 0],
      duration: 4200,
      delay: stagger(600),
      loop: true,
      ease: "inOut(2)",
    });

    return () => {
      timeline.revert();
      floaters.revert();
    };
  }, []);

  return (
    <section ref={root} className="hero-surface overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <h1
            data-hero="title"
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]"
          >
            <span className="block text-brand opacity-0">
              Conectando Acessibilidade ao
            </span>
            <span className="block text-brand opacity-0">
              Turismo em <span className="text-brand-deep">Pernambuco</span>
            </span>
          </h1>

          <p
            data-hero="text"
            className="mt-5 max-w-xl text-base text-muted-foreground opacity-0 sm:text-lg"
          >
            Plataforma que conecta intérpretes de Libras e profissionais de
            acessibilidade a estabelecimentos turísticos, criando experiências
            verdadeiramente inclusivas.
          </p>

          <div data-hero="cta" className="mt-7 flex flex-wrap gap-3">
            <Button
              size="lg"
              className="h-11 px-5 opacity-0"
              render={
                <Link href="/cadastrar?perfil=estabelecimento">
                  <Building2 aria-hidden />
                  Sou Estabelecimento
                </Link>
              }
            />
            <Button
              variant="outline"
              size="lg"
              className="h-11 px-5 opacity-0"
              render={
                <Link href="/cadastrar?perfil=profissional">
                  <Award aria-hidden />
                  Sou Profissional
                </Link>
              }
            />
            <Button
              variant="secondary"
              size="lg"
              className="h-11 px-5 opacity-0"
              render={
                <Link href="/cadastrar?perfil=turista">
                  <Accessibility aria-hidden />
                  Sou Turista
                </Link>
              }
            />
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map(({ icon: Icon, value, suffix, decimals, label }) => (
              <div key={label} data-hero="stat" className="text-center opacity-0">
                <Icon className="mx-auto size-5 text-brand" aria-hidden />
                <dd className="mt-2 text-2xl font-bold text-brand">
                  <CountUp to={value} suffix={suffix} decimals={decimals ?? 0} />
                </dd>
                <dt className="text-xs text-muted-foreground">{label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div
            data-hero="art"
            className="relative aspect-4/3 overflow-hidden rounded-3xl bg-brand-soft opacity-0 shadow-2xl shadow-brand/15"
          >
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=70"
              alt="Grupo diverso de visitantes aproveitando um passeio turístico acessível"
              fill
              priority
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>

          <div
            data-hero="float"
            className="absolute -top-4 right-2 flex items-center gap-2 rounded-xl bg-background/95 px-3 py-2 opacity-0 shadow-lg ring-1 ring-border/60 backdrop-blur"
          >
            <ShieldCheck className="size-5 text-brand" aria-hidden />
            <span className="text-xs leading-tight">
              <strong className="block font-semibold">Certificação</strong>
              <span className="text-muted-foreground">Verificada</span>
            </span>
          </div>

          <div
            data-hero="float"
            className="absolute -bottom-5 left-2 flex items-center gap-2 rounded-xl bg-background/95 px-3 py-2 opacity-0 shadow-lg ring-1 ring-border/60 backdrop-blur"
          >
            <CalendarClock className="size-5 text-brand" aria-hidden />
            <span className="text-xs leading-tight">
              <strong className="block font-semibold">Agendamento rápido</strong>
              <span className="text-muted-foreground">Em minutos</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
