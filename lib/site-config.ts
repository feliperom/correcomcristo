/**
 * Conteúdo editável do site. Tudo que muda com o tempo (links, agenda,
 * versículos, testemunhos, produtos) vive aqui. Itens marcados com
 * `isPlaceholder` precisam ser trocados pelo conteúdo real.
 */

export const siteConfig = {
  name: "Corre com Cristo",
  crew: "Kahal Run",
  region: "Baixada Santista · SP",
  tagline: "Reino em Movimento",
  verseRef: "Hebreus 12:1-2",
  verseLong:
    "Corramos com perseverança a carreira que nos está proposta, olhando para Jesus.",

  instagram: {
    handle: "@correcomcristo.run",
    url: "https://instagram.com/correcomcristo.run",
  },

  // TROCAR: link do grupo ou número de WhatsApp.
  whatsapp: {
    url: "https://chat.whatsapp.com/DyLulSTgpqm1VVE96naMQp?mode=gi_t",
    isPlaceholder: true,
  },

  /**
   * Áudio do "Pace da Fé". Por padrão o site roda uma cadência sonora
   * gerada na hora (sem arquivo). Para usar uma playlist de louvor real e
   * ter o áudio-reativo completo, coloque um arquivo em /public/audio e
   * aponte `trackUrl` para ele (ex: "/audio/louvor.mp3"). Spotify embed
   * não permite análise de áudio, por isso usamos arquivo local.
   */
  audio: {
    trackUrl: "" as string,
    isPlaceholder: true,
    label: "Pace da Fé",
  },
} as const;

export const pillars = [
  { title: "Louvor", line: "A playlist glorifica a Deus em cada passo." },
  { title: "Comunhão", line: "Irmãos na fé, correndo e crescendo juntos." },
  { title: "Fé", line: "Olhando para Jesus, nossa direção e meta." },
  { title: "Saúde", line: "Corpo, mente e espírito fortalecidos." },
  { title: "Propósito", line: "Maior que a performance é o propósito." },
] as const;

// TROCAR: versículos que entram na rotação do "Versículo do dia".
export const verses = [
  {
    text: "Corramos com perseverança a carreira que nos está proposta, olhando para Jesus.",
    ref: "Hebreus 12:1-2",
  },
  {
    text: "Não sabeis vós que os que correm no estádio, todos, na verdade, correm, mas um só leva o prêmio? Correi de tal maneira que o alcanceis.",
    ref: "1 Coríntios 9:24",
  },
  {
    text: "Os que esperam no Senhor renovarão as suas forças; correrão e não se cansarão.",
    ref: "Isaías 40:31",
  },
  {
    text: "Combati o bom combate, acabei a carreira, guardei a fé.",
    ref: "2 Timóteo 4:7",
  },
] as const;

// TROCAR: dias, horários e pontos de encontro reais.
type ScheduleItem = {
  day: string;
  time: string;
  place: string;
  kind: string;
  isPlaceholder?: boolean;
};

export const schedule: ScheduleItem[] = [
  // {
  //   day: "Domingo",
  //   time: "06h00",
  //   place: "Orla — Ponto de encontro a definir",
  //   kind: "Treino longo + louvor",
  //   isPlaceholder: true,
  // },
  // {
  //   day: "Quarta",
  //   time: "19h30",
  //   place: "Local a definir",
  //   kind: "Corrida intervalada",
  //   isPlaceholder: true,
  // },
  // {
  //   day: "Sábado",
  //   time: "07h00",
  //   place: "Local a definir",
  //   kind: "Caminhada leve · todos os ritmos",
  //   isPlaceholder: true,
  // },
];

// Pasta do Google Drive com todas as fotos (botão "Baixar fotos").
export const galleryDriveUrl =
  "https://drive.google.com/drive/folders/1BbcPG7wjdaXL2iEUaRFwg9yiWvhkkIXo?usp=sharing";

/**
 * Fotos servidas direto do CDN do Google a partir do Drive. Cada `id` é o
 * ID do arquivo no Drive; a galeria monta a miniatura e o link de download.
 * Para adicionar/trocar fotos, basta editar esta lista (id + span).
 */
export const gallery = [
  { id: "16iOqe82sNm_JSvTlm1KJcBUcInSj8YJN", alt: "Corre com Cristo — encontro do grupo", span: "wide" },
  { id: "1glczu00XuAAoNuaGDNXwnc4ZQR8NEWum", alt: "Corredores da Kahal Run", span: "normal" },
  { id: "1A-xTi0t_2lr7DmJoMaM2xwCyr4lEeHTF", alt: "Treino na Baixada Santista", span: "tall" },
  { id: "16Ul9RejDYpVxSQHGIGQxot-0Ycrf4XzC", alt: "Comunhão antes da corrida", span: "normal" },
  { id: "1cLMYD5FHMtUOelY1oTU2rhCVw5neqo9p", alt: "Momento de louvor", span: "wide" },
  { id: "1FMjaGwaYBYIY2NTQihJjjkBjjMTmX8Rg", alt: "Largada do grupo", span: "normal" },
  { id: "1IfyjLAidR8UFtGVNZTDSzWQSmGgh_XNF", alt: "Reino em Movimento", span: "normal" },
  { id: "1ghgGOZAmNg8AyX11a9YefM5QKNPzKWCC", alt: "Corredores na orla", span: "tall" },
  { id: "1_72SEmFFQcRJ7XiEWkPc0vtRv7eK5T-O", alt: "Alegria da caminhada", span: "normal" },
  { id: "1ujIvXgW_NlYD3MYUusl92Bw2_E4UAwEw", alt: "Pace da Fé", span: "wide" },
  { id: "11fyc_CteJlR4hccVmDDdVps-P8-1Kr1a", alt: "Irmãos na fé", span: "normal" },
  { id: "1mmwETRu9dwLvRbFE7LROqyTmZzpkKbK0", alt: "Celebração pós-treino", span: "normal" },
  { id: "1nBixwOvFTVm4vyJyEhKSCGQC6Wf8E694", alt: "Corre com Cristo — Kahal Run", span: "tall" },
] as const;

// TROCAR pelos depoimentos reais dos corredores.
export const testimonials = [
  {
    quote:
      "Eu não iria vir pois não conhecia ninguém. Estava com um problema no joelho mas chegando no Corre com Cristo vi outra vibe, todos no mesmo propósito e meu joelho até melhorou.",
    author: "Angelita Silva",
    isPlaceholder: true,
  },
  {
    quote:
      "Foi uma benção a 1ª edição, tenho certeza que é a primeira de muitas. Organizaçã e mídia foram uma benção, edificou nossas vidas pois aqui teve louvor, oração, presença de Deus",
    author: "Anderson Dutra",
    isPlaceholder: true,
  },
  {
    quote:
      "Foi incrível a 1ª edição do Corre com Cristo, turma super animada e com muita energia, todos louvando a Deus, correndo e caminhando em família e espero que no próximos venham mais pessoas!",
    author: "Allan Nascimento",
    isPlaceholder: true,
  },
] as const;

// TROCAR: produtos, preços e link de compra reais.
export const products = [
  {
    name: "Boné Corre com Cristo",
    variant: "5-panel · perfurado · dry",
    price: "R$ 119",
    href: "",
    isPlaceholder: true,
  },
  {
    name: "Camiseta Corre com Cristo",
    variant: "Dry fit · Kahal Run",
    price: "R$ 89",
    href: "",
    isPlaceholder: true,
  },
] as const;
