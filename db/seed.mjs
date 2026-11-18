// Cria o schema e popula o catálogo da TurisAcess.
// Uso: npm run db:setup
import { readFile } from "node:fs/promises";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

config({ path: ".env.local", quiet: true });
config({ path: ".env", quiet: true });

const sql = neon(process.env.DATABASE_URL);

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1080&q=70`;

const services = [
  {
    slug: "interpretacao-libras",
    title: "Interpretação em Libras",
    description:
      "Intérpretes certificados para museus, hotéis, restaurantes e eventos turísticos",
    icon: "languages",
    popular: true,
  },
  {
    slug: "roteiros-acessiveis",
    title: "Roteiros Acessíveis",
    description:
      "Desenvolvimento de roteiros turísticos adaptados para mobilidade reduzida",
    icon: "map-pin",
    popular: false,
  },
  {
    slug: "consultoria-acessibilidade",
    title: "Consultoria em Acessibilidade",
    description:
      "Orientação para estabelecimentos se tornarem mais inclusivos",
    icon: "accessibility",
    popular: false,
  },
];

const establishments = [
  ["hotel-atlante-plaza", "Hotel Atlante Plaza", "Hotéis e Pousadas", "Boa Viagem, Recife", "Hotel de luxo à beira-mar com excelente infraestrutura de acessibilidade e serviços especializados em turismo inclusivo.", "1566073771259-6a8506099945", 4.7, 892, "R$ 280", 2.5, "(81) 3302-3333", ["Intérprete de Libras", "Sinalização Tátil", "Quartos Acessíveis", "Elevador Adaptado"], ["Spa", "Restaurante", "Bar", "Wi-Fi"]],
  ["instituto-ricardo-brennand", "Instituto Ricardo Brennand", "Museus e Cultura", "Várzea, Recife", "Museu com acervo impressionante e totalmente adaptado, oferecendo visitas guiadas em Libras e audiodescrição.", "1554907984-15263bfd63bd", 4.9, 2134, "R$ 25", 8.2, "(81) 2121-0365", ["Audiodescrição", "Intérprete de Libras", "Rampa de Acesso", "Material Tátil"], ["Loja", "Café", "Jardins", "Estacionamento"]],
  ["restaurante-leite", "Restaurante Leite", "Restaurantes", "Recife Antigo", "Restaurante histórico e tradicional de Recife com cardápio em braile e estrutura totalmente acessível.", "1517248135467-4c7edcad34c4", 4.8, 1456, "R$ 120", 5.1, "(81) 3224-7977", ["Cardápio em Braile", "Rampa de Acesso", "Banheiros Adaptados"], ["Ar Condicionado", "Estacionamento", "Wi-Fi", "Vista Histórica"]],
  ["porto-de-galinhas", "Porto de Galinhas", "Atrações Turísticas", "Ipojuca, PE", "Famosa praia com piscinas naturais, oferecendo passeios adaptados e infraestrutura de acessibilidade.", "1507525428034-b723cf961d3e", 4.8, 5623, "R$ 50", 45.8, "(81) 3552-1480", ["Passeios Adaptados", "Cadeira de Rodas Especial", "Guia Especializado"], ["Restaurantes", "Pousadas", "Mergulho", "Passeios"]],
  ["museu-do-frevo", "Museu do Frevo", "Museus e Cultura", "Recife Antigo", "Museu interativo dedicado ao frevo com tecnologia assistiva e experiências sensoriais adaptadas.", "1541961017774-22349e4a1262", 4.7, 856, "R$ 15", 5.5, "(81) 3355-9500", ["Tecnologia Assistiva", "Audioguia", "Piso Tátil", "Intérprete de Libras"], ["Loja", "Café", "Elevador", "Auditório"]],
  ["beach-class-suites", "Beach Class Suítes", "Hotéis e Pousadas", "Boa Viagem, Recife", "Hotel com suítes espaçosas e totalmente equipado com recursos de acessibilidade premium.", "1520250497591-112f2f40a3f4", 4.6, 1023, "R$ 320", 2.8, "(81) 3464-8600", ["Elevador com Braile", "Quartos Acessíveis", "Piscina com Rampa"], ["Rooftop", "Piscina", "Restaurante", "Valet"]],
  ["centro-historico-olinda", "Centro Histórico de Olinda", "Atrações Turísticas", "Olinda, PE", "Patrimônio Mundial da UNESCO com ruas adaptadas e pontos turísticos acessíveis.", "1588416936097-41850ab3d86d", 4.6, 1834, "Gratuito", 15.2, "(81) 3305-1060", ["Rampas de Acesso", "Roteiros Adaptados", "Guias Especializados"], ["Ateliês", "Restaurantes", "Museus", "Igrejas"]],
  ["teatro-santa-isabel", "Teatro Santa Isabel", "Teatros", "Centro, Recife", "Teatro histórico com apresentações acessíveis, interpretação em Libras e audiodescrição.", "1507924538820-ede94a04019d", 4.6, 1247, "R$ 40", 4.8, "(81) 3355-6789", ["Intérprete de Libras", "Audiodescrição", "Assentos Adaptados"], ["Bar", "Estacionamento", "Ar Condicionado"]],
  ["boa-viagem-hotel", "Boa Viagem Hotel", "Hotéis e Pousadas", "Boa Viagem, Recife", "Hotel 4 estrelas com vista para o mar, totalmente acessível com rampas, elevadores e quartos para PCDs.", "1551882547-ff40c63fe5fa", 4.5, 1247, "R$ 200", 2.1, "(81) 3465-8888", ["Rampa de Acesso", "Elevador Adaptado", "Quartos Acessíveis"], ["Wi-Fi", "Piscina", "Restaurante", "Academia"]],
  ["oficina-do-sabor", "Oficina do Sabor", "Restaurantes", "Olinda, PE", "Restaurante de culinária regional com ambiente aconchegante e totalmente adaptado para pessoas com deficiência.", "1414235077428-338989a2e8c0", 4.5, 773, "R$ 80", 14.1, "(81) 3429-3331", ["Rampa de Acesso", "Mesa Adaptada", "Banheiros Acessíveis"], ["Jardim", "Música ao Vivo", "Wi-Fi", "Terraço"]],
  ["museu-do-estado", "Museu do Estado", "Museus e Cultura", "Recife", "Museu histórico com exposições acessíveis e visitas guiadas inclusivas.", "1545239351-ef35f43d514b", 4.5, 678, "R$ 10", 6.4, "(81) 3355-2200", ["Audioguia", "Material Tátil", "Rampa de Acesso"], ["Loja", "Biblioteca", "Auditório"]],
  ["shopping-recife", "Shopping Recife", "Shopping e Comércio", "Boa Viagem, Recife", "Shopping center com completa infraestrutura de acessibilidade e serviços especializados.", "1519567241046-7f570eee3ce6", 4.5, 2947, "Gratuito", 3.4, "(81) 3464-6000", ["Elevador Adaptado", "Banheiro Família", "Cadeira de Rodas"], ["Cinema", "Praça de Alimentação", "Estacionamento", "Wi-Fi"]],
  ["recife-antigo", "Recife Antigo", "Bairros Históricos", "Recife", "Bairro histórico com ruas adaptadas, museus acessíveis e rica vida cultural inclusiva.", "1593113630400-ea4288922497", 4.5, 2890, "Gratuito", 5.3, "(81) 3355-8000", ["Calçadas Adaptadas", "Pontos de Apoio", "Sinalização Inclusiva"], ["Museus", "Restaurantes", "Bares", "Centro Cultural"]],
  ["hotel-jangadeiro", "Hotel Jangadeiro", "Hotéis e Pousadas", "Jaboatão dos Guararapes, PE", "Hotel familiar com praia privativa e estrutura completa de acessibilidade para toda a família.", "1571003123894-1f0594d2b5d9", 4.4, 743, "R$ 180", 12.4, "(81) 3341-2200", ["Cadeira Anfíbia", "Rampa para Praia", "Quartos Adaptados"], ["Praia Privativa", "Piscina", "Restaurante", "Kids Club"]],
  ["bargaco", "Bargaço", "Restaurantes", "Boa Viagem, Recife", "Tradicional casa de frutos do mar com infraestrutura completa de acessibilidade e menu adaptado.", "1559339352-11d035aa65de", 4.4, 1134, "R$ 100", 2.1, "(81) 3465-1847", ["Rampa de Acesso", "Banheiros Adaptados", "Estacionamento Acessível"], ["Vista para o Mar", "Ar Condicionado", "Valet", "Terraço"]],
  ["marco-zero", "Marco Zero do Recife", "Atrações Turísticas", "Recife Antigo", "Praça histórica no coração do Recife Antigo, com piso regular e amplo espaço para circulação.", "1518638150340-f706e86654de", 4.4, 2156, "Gratuito", 5.4, "(81) 3355-8100", ["Piso Regular", "Sinalização Tátil", "Rampa de Acesso"], ["Eventos", "Artesanato", "Passeio de Catamarã"]],
  ["cafe-cultural", "Café Cultural", "Cafés", "Olinda, PE", "Café artesanal em casarão histórico adaptado, com cardápio em braile e atendimento em Libras.", "1554118811-1e0d58224f24", 4.4, 567, "R$ 25", 14.6, "(81) 3429-1120", ["Cardápio em Braile", "Atendimento em Libras", "Rampa de Acesso"], ["Wi-Fi", "Livros", "Terraço"]],
  ["pousada-quatro-cantos", "Pousada dos Quatro Cantos", "Hotéis e Pousadas", "Olinda, PE", "Pousada charmosa em casarão colonial adaptado, no coração do Centro Histórico de Olinda.", "1566073771259-6a8506099945", 4.3, 567, "R$ 150", 15.0, "(81) 3429-0220", ["Quartos Acessíveis", "Rampa de Acesso", "Banheiro Adaptado"], ["Café da Manhã", "Jardim", "Wi-Fi"]],
  ["parque-da-jaqueira", "Parque da Jaqueira", "Parques", "Graças, Recife", "Parque urbano com trilhas adaptadas e equipamentos de exercício acessíveis.", "1441974231531-c6227db76b6e", 4.5, 2134, "Gratuito", 7.2, "(81) 3355-7000", ["Trilhas Adaptadas", "Banheiro Adaptado", "Estacionamento PCD"], ["Ciclovia", "Quadras", "Playground"]],
  ["mercado-sao-jose", "Mercado São José", "Atrações Turísticas", "São José, Recife", "Mercado histórico com produtos regionais e arquitetura em ferro do século XIX.", "1555529669-e69e7aa0ba9a", 4.1, 1456, "R$ 5", 6.3, "(81) 3355-6300", ["Rampa de Acesso", "Estacionamento PCD", "Banheiro Adaptado"], ["Artesanato", "Comidas Típicas", "Ervas"]],
  ["aquario-de-recife", "Aquário de Recife", "Atrações Turísticas", "Brasília Teimosa, Recife", "Aquário com túnel subaquático e experiências sensoriais adaptadas.", "1544551763-46a013bb70d5", 4.2, 1876, "R$ 35", 4.2, "(81) 3355-4400", ["Audiodescrição", "Material Tátil", "Elevador Acessível"], ["Loja", "Café", "Auditório"]],
  ["teatro-do-parque", "Teatro do Parque", "Teatros", "Graças, Recife", "Teatro moderno com tecnologia assistiva e programação inclusiva.", "1503095396549-807759245b35", 4.4, 432, "R$ 25", 7.5, "(81) 3355-3300", ["Audiodescrição", "Intérprete de Libras", "Assentos Adaptados"], ["Bar", "Estacionamento"]],
  ["memorial-luiz-gonzaga", "Memorial Luiz Gonzaga", "Museus e Cultura", "Exu, PE", "Memorial do Rei do Baião com acervo musical e exposições interativas.", "1510915361894-db8b60106cb1", 4.7, 876, "R$ 5", 520.0, "(87) 3881-1000", ["Audiodescrição", "Material Tátil", "Rampa de Acesso"], ["Loja", "Café", "Auditório"]],
  ["fortaleza-cinco-pontas", "Fortaleza das Cinco Pontas", "Atrações Turísticas", "São José, Recife", "Fortaleza histórica do século XVII com museu e vista panorâmica.", "1564501049412-61c2a3083791", 4.1, 367, "R$ 3", 6.7, "(81) 3355-6700", ["Rampa de Acesso", "Material Adaptado", "Guia Especializado"], ["Museu", "Mirante", "Jardins"]],
];

const professionals = [
  ["maria-santos", "Maria Santos", "Intérprete de Libras • Pedagoga", "Recife, PE", 4.9, 127, 8, 90, true, ["Libras", "Português"], ["PROLIBRAS", "FENEIS", "Pedagogia"]],
  ["joao-silva", "João Silva", "Guia Turístico Acessível", "Olinda, PE", 4.8, 94, 5, 70, true, ["Libras", "Português", "Inglês"], ["CADASTUR", "PROLIBRAS"]],
  ["ana-costa", "Ana Costa", "Consultora em Acessibilidade • Poliglota", "Recife, PE", 5.0, 156, 12, 150, false, ["Libras", "Português", "Inglês", "Espanhol", "Francês"], ["ABNT", "PROLIBRAS", "FENEIS"]],
  ["pedro-oliveira", "Pedro Oliveira", "Intérprete de Libras • Audiodescritor", "Jaboatão, PE", 4.7, 82, 4, 80, true, ["Libras", "Português"], ["PROLIBRAS", "Audiodescrição"]],
  ["carolina-lima", "Carolina Lima", "Guia Turístico Acessível", "Recife, PE", 4.9, 203, 7, 60, true, ["Libras", "Português", "Inglês"], ["CADASTUR", "Guia Especializado"]],
  ["roberto-santos", "Roberto Santos", "Consultor em Acessibilidade", "Recife, PE", 5.0, 203, 10, 120, false, ["Português", "Libras"], ["ABNT NBR 9050", "Consultoria PCD"]],
];

async function main() {
  console.log("→ aplicando schema…");
  const schema = await readFile(new URL("./schema.sql", import.meta.url), "utf8");
  // neon() HTTP não aceita múltiplos statements num único template: usa transaction.
  const statements = schema
    .split(/;\s*$/m)
    .map((s) =>
      s
        .split(/\r?\n/)
        .filter((line) => !line.trim().startsWith("--"))
        .join("\n")
        .trim(),
    )
    .filter(Boolean);
  for (const statement of statements) {
    await sql.query(statement);
  }

  console.log("→ limpando catálogo…");
  await sql`truncate reviews, favorites, bookings restart identity cascade`;
  await sql`truncate establishments, professionals, services restart identity cascade`;

  console.log("→ inserindo serviços…");
  for (const [i, s] of services.entries()) {
    await sql`
      insert into services (slug, title, description, icon, popular, sort_order)
      values (${s.slug}, ${s.title}, ${s.description}, ${s.icon}, ${s.popular}, ${i})
    `;
  }

  console.log("→ inserindo estabelecimentos…");
  for (const e of establishments) {
    const [slug, name, category, city, description, photo, rating, reviews, price, distance, phone, accessibility, amenities] = e;
    await sql`
      insert into establishments
        (slug, name, category, city, description, image_url, rating, reviews_count,
         price_label, distance_km, phone, accessibility, amenities)
      values
        (${slug}, ${name}, ${category}, ${city}, ${description}, ${img(photo)}, ${rating}, ${reviews},
         ${price}, ${distance}, ${phone}, ${accessibility}, ${amenities})
    `;
  }

  console.log("→ inserindo profissionais…");
  for (const p of professionals) {
    const [slug, name, title, city, rating, reviews, experience, rate, available, languages, certifications] = p;
    await sql`
      insert into professionals
        (slug, name, title, city, rating, reviews_count, experience, hourly_rate, available, languages, certifications)
      values
        (${slug}, ${name}, ${title}, ${city}, ${rating}, ${reviews}, ${experience}, ${rate}, ${available}, ${languages}, ${certifications})
    `;
  }

  console.log("→ inserindo avaliações…");
  await sql`
    insert into reviews (user_id, author_name, establishment_id, rating, comment)
    values
      ('seed', 'Maria Silva', (select id from establishments where slug = 'hotel-atlante-plaza'), 5,
       'Excelente profissional. Muito atenciosa e competente. Comunicação clara e precisa.'),
      ('seed', 'João Santos', (select id from establishments where slug = 'museu-do-frevo'), 5,
       'Audiodescrição muito detalhada e envolvente. Experiência incrível!'),
      ('seed', 'Museu da História de PE', (select id from establishments where slug = 'instituto-ricardo-brennand'), 5,
       'Desde que passamos a usar o TurisAcess, nosso museu recebe muito mais visitantes com deficiência auditiva.')
  `;

  const [{ count: e }] = await sql`select count(*)::int as count from establishments`;
  const [{ count: p }] = await sql`select count(*)::int as count from professionals`;
  const [{ count: s }] = await sql`select count(*)::int as count from services`;
  console.log(`✔ pronto: ${e} estabelecimentos, ${p} profissionais, ${s} serviços`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
