/**
 * Conteúdo editável do site. Tudo que muda com o tempo (links, agenda,
 * versículos, testemunhos, produtos) vive aqui. Itens marcados com
 * `isPlaceholder` precisam ser trocados pelo conteúdo real.
 *
 * As fotos de produto são importadas como módulo para que o build conheça
 * largura e altura — isso reserva o espaço no layout e evita salto (CLS).
 */

import type { StaticImageData } from "next/image";
import capImage from "@/public/bone-corre.jpg";
import shirtImage from "@/public/camiseta-corre.jpg";

export const siteConfig = {
  name: "Corre com Cristo",
  crew: "Edição 1 - Kahal Run",
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
    urlBuy: "https://chat.whatsapp.com/DyLulSTgpqm1VVE96naMQp?mode=gi_t",
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

// Pastas do Google Drive com todas as fotos de cada edição (botões "Baixar fotos").
export const galleryDriveUrl =
  "https://drive.google.com/drive/folders/1XR3Ma-10mBiBc7BUyODmorJ_-7VuuVJx?usp=sharing";

export const galleryFirstEditionDriveUrl =
  "https://drive.google.com/drive/folders/1BbcPG7wjdaXL2iEUaRFwg9yiWvhkkIXo?usp=sharing";

/**
 * Fotos da 2ª edição (julho/2026) servidas direto do CDN do Google a partir do
 * Drive. Cada `id` é o ID do arquivo no Drive; a galeria monta a miniatura e o
 * link de download. Para adicionar/trocar fotos, basta editar esta lista.
 */
export const gallery = [
  { id: "1SI-QNxL5Bp5P-g3718ALcVmbVp3Ak0C2", alt: "Foto oficial da 2ª edição com a bandeira Corre com Cristo", span: "wide" },
  { id: "1QSaB2F3KJKcKNhksMLVg0X_HCuOF-37M", alt: "Bandeira hasteada durante o aquecimento", span: "normal" },
  { id: "1KNY4T0TWq5HrtqhJkIi-uAitGAq5P60C", alt: "Palavra e oração antes da largada", span: "tall" },
  { id: "1w15ghmEDk0-r_qhEu-ArsL6TDNhMXLfi", alt: "Aquecimento em grupo na pista", span: "normal" },
  { id: "1Ml9iGVxrIF-QU36cTv1-ATsCiiOwe0TF", alt: "Largada da 2ª edição", span: "wide" },
  { id: "1ZpwAsh5-vzx1sVLcAZxN1tTtkU-PLxbD", alt: "Caminhada na faixa de areia", span: "normal" },
  { id: "14ymRuoy_yMRbsn6MzzOUVWP9220ahuff", alt: "Pelotão na orla da praia", span: "normal" },
  { id: "1Qi9IAK64m9r9oMXkIYSWBrMVSlzyboRd", alt: "Casal com a camisa do Corre com Cristo", span: "tall" },
  { id: "1baZ-k1APNEwwLPcOg6WvTuf7NBWham8W", alt: "Família correndo junto na areia", span: "normal" },
  { id: "1lNXyT8a9Qid1iY9wMZuU59n2TEEe6GjX", alt: "Bandeira erguida na praia durante o percurso", span: "wide" },
  { id: "1bS7z_zozBtKNh4VPslucL3gAilGX1337", alt: "Corredores a caminho do final do percurso", span: "normal" },
  { id: "1iOFILrNwDa46RXMmqXawnJZFOcO0ICU5", alt: "Alongamento coletivo antes da corrida", span: "normal" },
  { id: "1R83kUcMyrDrpHLd7svK3RCSaahz38m2Y", alt: "Participantes acenando durante a caminhada", span: "tall" },
] as const;

// TROCAR pelos depoimentos reais dos corredores.
type Testimonial = {
  quote: string;
  author: string;
  isPlaceholder?: boolean;
};

export const testimonials: Testimonial[] = [
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
type Product = {
  name: string;
  variant: string;
  price: string;
  image: StaticImageData;
  alt: string;
  isPlaceholder?: boolean;
};

export const products: Product[] = [
  {
    name: "Boné Corre com Cristo",
    variant: "5-panel · perfurado · dry",
    price: "R$ 49",
    image: capImage,
    alt: "Boné Corre com Cristo, modelo 5-panel perfurado",
    isPlaceholder: true,
  },
  {
    name: "Camiseta Corre com Cristo",
    variant: "Poliester com elastano · tratamento proteção solar",
    price: "R$ 59",
    image: shirtImage,
    alt: "Camiseta Corre com Cristo em poliéster com proteção solar",
    isPlaceholder: true,
  },
] as const;

// TROCAR: percurso real do evento (distância e pontos de cada etapa).
export type CourseStageType = "start" | "praise" | "water" | "prayer" | "finish";

export const course = {
  totalKm: 3.5, // estimativa — confirmar a distância real do trajeto
  approximate: true,
  from: "Emissário Submarino · Santos",
  to: "Canto da Ilha Porchat · São Vicente",
  surface: "pela faixa de areia",
  isPlaceholder: true,
  stages: [
    {
      km: 0,
      title: "Emissário Submarino",
      type: "start" as CourseStageType,
      desc: "Largada na faixa de areia do José Menino, em Santos. Aquecimento e oração antes do primeiro passo.",
    },
    {
      km: 1,
      title: "Ponto de Louvor",
      type: "praise" as CourseStageType,
      desc: "Rumo à divisa, ao pé da Ilha Porchat. Aqui a playlist glorifica a Deus e o pace segue a batida.",
    },
    {
      km: 2,
      title: "Praia do Itararé",
      type: "water" as CourseStageType,
      desc: "Já em São Vicente: hidratação, com o mar de um lado e irmãos do outro.",
    },
    {
      km: 2.7,
      title: "Momento de Oração",
      type: "prayer" as CourseStageType,
      desc: "Olhando para Jesus, renovamos o fôlego do corpo e do espírito.",
    },
    {
      km: 3.5,
      title: "Canto da Ilha Porchat",
      type: "finish" as CourseStageType,
      desc: "Chegada em São Vicente. Celebração, comunhão e gratidão. Maior que a performance é o propósito.",
    },
  ],
} as const;
