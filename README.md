# TurisAcess

Plataforma que conecta intérpretes de Libras e profissionais de acessibilidade
a estabelecimentos turísticos em Pernambuco — projeto da startup **IncluTur**.

Construída a partir do protótipo da equipe no Figma Make, com Next.js, shadcn/ui,
anime.js e Neon (Postgres + Auth).

## Stack

| Camada    | Escolha |
|-----------|---------|
| Framework | Next.js 16 (App Router, Turbopack) + React 19 |
| UI        | shadcn/ui (Base UI) + Tailwind CSS v4 |
| Animação  | anime.js v4 (scroll reveal, contadores, transição de página) |
| Banco     | Neon Postgres (`@neondatabase/serverless`) |
| Auth      | Neon Auth — Managed Better Auth (`@neon/auth`) |
| Deploy    | Vercel |

## Rodando localmente

```bash
npm install
npx neon@latest deploy     # provisiona Postgres + Auth e escreve o .env.local
npm run db:setup           # schema + catálogo (24 estabelecimentos, 6 profissionais)
npm run db:demo            # contas de demonstração e dados dos painéis
npm run dev
```

`npx neon@latest deploy` não gera `NEON_AUTH_COOKIE_SECRET`. Adicione no
`.env.local` uma string de pelo menos 32 caracteres:

```bash
node -e "console.log('NEON_AUTH_COOKIE_SECRET=' + require('crypto').randomBytes(32).toString('base64'))"
```

### Contas de demonstração

| E-mail | Perfil | Senha |
|--------|--------|-------|
| turista@demo.com | Turista | `turisacess2026` |
| profissional@demo.com | Profissional | `turisacess2026` |
| hotel@demo.com | Estabelecimento | `turisacess2026` |

## Telas

- `/` — landing: hero, serviços, como funciona, profissionais, estabelecimentos
  parceiros, impacto, ODS, por que Pernambuco
- `/buscar` — busca avançada com filtros (categoria, recursos de acessibilidade,
  nota mínima) sobre dados reais do Postgres
- `/estabelecimentos`, `/profissionais`, `/servicos`, `/sobre`
- `/entrar`, `/cadastrar` — Neon Auth, com os três perfis
- `/painel/turista`, `/painel/profissional`, `/painel/estabelecimento`

## Banco

`db/schema.sql` define `profiles`, `services`, `establishments`,
`professionals`, `bookings`, `favorites`, `reviews` e `newsletter_subscribers`.
Usuários e sessões ficam no schema `neon_auth`, gerenciado pelo Neon.

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. Copie as variáveis do `.env.local` para as Environment Variables do projeto
   (incluindo `NEON_AUTH_COOKIE_SECRET`).
3. Build command e output são os padrões do Next.js.

Convenções de código em [CLAUDE.md](CLAUDE.md).
