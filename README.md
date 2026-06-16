# Corre com Cristo · Kahal Run

One-page imersiva do movimento **Corre com Cristo**. Conceito: **"A Trilha que Glorifica"** — a página é um percurso de corrida que se desenha conforme você rola e pulsa na cadência do louvor.

Movimento como metáfora: trilha de GPS que se desenha no scroll, tipografia cinética, contador de km (perseverança de Hebreus 12) e um motor de áudio-reativo ("Pace da Fé").

## Rodar

```bash
npm run dev      # desenvolvimento em http://localhost:3000
npm run build    # build de produção
npm start        # servir o build
```

## Onde editar (sem mexer em código)

Quase tudo é controlado por **`lib/site-config.ts`**. Itens marcados com `isPlaceholder: true` precisam do conteúdo real:

| O quê | Onde |
| --- | --- |
| Link do WhatsApp ("Quero correr") | `siteConfig.whatsapp.url` |
| Playlist de louvor (áudio-reativo) | `siteConfig.audio.trackUrl` |
| Agenda de treinos | `schedule` |
| Fotos da galeria (IDs do Google Drive) | `gallery` + `galleryDriveUrl` |
| Versículos do dia | `verses` |
| Testemunhos | `testimonials` |
| Produtos da loja (boné/camiseta) | `products` |
| Pilares | `pillars` |

### Pace da Fé (áudio)

Por padrão o botão "Pace da Fé" toca uma **cadência gerada na hora** (sem arquivo) e tudo pulsa nela. Para usar uma **playlist de louvor real** com áudio-reativo completo:

1. Coloque um `.mp3` em `public/audio/` (ex: `public/audio/louvor.mp3`).
2. Aponte `siteConfig.audio.trackUrl = "/audio/louvor.mp3"`.

> Embed do Spotify não permite análise de áudio (cross-origin), por isso usamos arquivo local.

### Fotos (Google Drive)

A galeria carrega as fotos **direto do CDN do Google** a partir dos IDs dos arquivos no Drive — sem baixar nada para o repositório. Para adicionar/trocar:

1. Pegue o ID do arquivo no Drive (`.../file/d/<ID>/view`).
2. Adicione em `gallery` (`{ id, alt, span }`, onde `span` é `wide | tall | normal`).
3. Atualize `galleryDriveUrl` (pasta) — é o destino do botão "Baixar fotos".

> As fotos são servidas com `referrerPolicy="no-referrer"` (o Google bloqueia hotlink com Referer de outra origem). A pasta precisa estar acessível por link.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind v4 · Motion · Lenis (scroll suave) · Web Audio API. Pronto para deploy na Vercel.

## Acessibilidade

Respeita `prefers-reduced-motion`: quem prefere menos animação recebe a versão calma, sem pulsos nem áudio automático.
