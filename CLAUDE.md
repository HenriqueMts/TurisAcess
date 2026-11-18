# TurisAcess — regras do projeto

Plataforma que conecta profissionais de acessibilidade (intérpretes de Libras,
guias acessíveis, audiodescritores, consultores) a estabelecimentos turísticos
em Pernambuco. Startup **IncluTur** — ver `IncluTur.pdf` na raiz.

O design de referência é o protótipo no Figma Make
(`Plataforma TurisAcess`). Qualquer tela nova deve seguir a identidade dele.

## Regras obrigatórias

1. **UI é sempre shadcn/ui.** Nenhum componente de interface escrito à mão
   quando existe equivalente em <https://ui.shadcn.com/>. Antes de criar um
   componente, rode `npx shadcn@latest add <componente>`. Componentes próprios
   só para composições (cards de domínio, seções), sempre montados em cima dos
   primitivos de `src/components/ui`.
   - O registry está em modo **Base UI** (`style: base-nova`): composição usa a
     prop `render={<Link .../>}`, não `asChild`.
2. **Animações são sempre anime.js v4** (<https://animejs.com/>), nunca CSS
   keyframes ad-hoc nem outra lib de motion. Os primitivos ficam em
   `src/components/motion`:
   - `<Reveal>` — entrada ao rolar (`onScroll`), com `stagger` opcional;
   - `<CountUp>` — contadores numéricos;
   - `<PageTransition>` — transição entre rotas;
   - `<ScrollProgress>` — barra de progresso de leitura.
   Thresholds de `onScroll` usam a sintaxe `"<container> <target>"`
   (ex.: `enter: "end-=60 start"`). `"bottom ... top"` **não** funciona.
3. **Banco é Neon Postgres** via `@neondatabase/serverless` (`src/lib/db.ts`).
   Nada de ORM. SQL direto em `src/lib/catalog.ts`, `profiles.ts`, `painel.ts`.
4. **Auth é Neon Auth** (Managed Better Auth, pacote `@neon/auth`).
   Configuração em `src/lib/auth/server.ts`; handler em
   `src/app/api/auth/[...path]/route.ts`. Usuários vivem no schema `neon_auth`;
   o perfil de domínio (papel, telefone, certificações) fica em `public.profiles`.
5. **Acessibilidade não é opcional** — é o produto. Toda tela precisa de:
   foco visível, `aria-label` em botões só com ícone, contraste adequado,
   `prefers-reduced-motion` respeitado, e conteúdo visível mesmo sem animação.
6. **Textos em português do Brasil.**

## Comandos

```bash
npm run dev        # servidor de desenvolvimento
npm run build      # build de produção
npm run db:setup   # cria o schema e popula o catálogo
npm run db:demo    # cria as contas de demonstração e dados dos painéis
npx eslint .       # lint
```

## Variáveis de ambiente

`.env.local` é gerado por `npx neon@latest deploy`, exceto
`NEON_AUTH_COOKIE_SECRET`, que é local (mín. 32 caracteres).

```
DATABASE_URL, DATABASE_URL_UNPOOLED
NEON_BRANCH, NEON_BRANCH_ID, NEON_FUNCTION_HOST_SUFFIX
NEON_AUTH_BASE_URL, NEON_AUTH_JWKS_URL
NEON_AUTH_COOKIE_SECRET
```

## Contas de demonstração

`turista@demo.com`, `profissional@demo.com`, `hotel@demo.com` —
senha `turisacess2026`. São dados de teste; não usar em produção real.
