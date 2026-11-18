import Link from "next/link";
import { Accessibility, Mail, MapPin, Phone } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from "@/components/social-icons";
import { NewsletterForm } from "@/components/newsletter-form";

const columns = [
  {
    title: "Serviços",
    links: [
      { label: "Interpretação em Libras", href: "/servicos" },
      { label: "Roteiros Acessíveis", href: "/servicos" },
      { label: "Consultoria", href: "/servicos" },
      { label: "Agendamentos", href: "/painel/turista" },
      { label: "Certificações", href: "/profissionais" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Central de Ajuda", href: "/sobre" },
      { label: "Como Funciona", href: "/#como-funciona" },
      { label: "Termos de Uso", href: "/sobre" },
      { label: "Política de Privacidade", href: "/sobre" },
      { label: "Contato", href: "/sobre" },
    ],
  },
];

const socials = [
  { label: "Facebook", icon: FacebookIcon, href: "https://facebook.com" },
  { label: "Instagram", icon: InstagramIcon, href: "https://instagram.com" },
  { label: "LinkedIn", icon: LinkedinIcon, href: "https://linkedin.com" },
  { label: "YouTube", icon: YoutubeIcon, href: "https://youtube.com" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-brand text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold">
            <span className="grid size-8 place-items-center rounded-full bg-white/20">
              <Accessibility className="size-4.5" aria-hidden />
            </span>
            TurisAcess
          </div>
          <p className="mt-4 max-w-xs text-sm text-white/85">
            Conectando acessibilidade ao turismo em Pernambuco. Criando
            experiências verdadeiramente inclusivas.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full bg-white/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/30"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-semibold">{column.title}</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-white/85">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="text-sm font-semibold">Contato</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/85">
            <li className="flex items-center gap-2">
              <Phone className="size-4" aria-hidden /> (81) 3456-7890
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4" aria-hidden /> contato@turisacess.com.br
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                Recife, Pernambuco
                <br />
                Brasil
              </span>
            </li>
          </ul>

          <h2 className="mt-6 text-sm font-semibold">Newsletter</h2>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/85 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} TurisAcess. Todos os direitos reservados.</p>
          <div className="flex gap-5">
            <Link href="/sobre" className="hover:underline">
              Acessibilidade
            </Link>
            <Link href="/sobre" className="hover:underline">
              Cookies
            </Link>
            <Link href="/sobre" className="hover:underline">
              LGPD
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
