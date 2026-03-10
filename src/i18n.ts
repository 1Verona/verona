export type Lang = "en" | "pt";

export const t = {
  en: {
    nav: {
      creator: "CREATOR",
      langToggle: "PT",
    },
    hero: {
      welcome: "Welcome",
      heading: "Hi, I'm Verona",
      bio: "A developer & video editor crafting experiences. Passionate about UX, UI and AI. Bringing the best AI can give to your specific needs.",
    },
    projects: {
      ion: {
        description: "An iOS personal assistant app for life organization.",
        details:
          "iON is an iOS personal assistant built with Swift and SwiftUI. It provides life organization features including tasks, reminders, calendar, AI chat, finances, and shopping lists — powered by AI.",
      },
      terminoted: {
        description: "A simple TUI-based notes & to-do app for the terminal.",
        details:
          "Terminoted is a terminal sticky notes and to-do application. Installable via Homebrew.",
      },
      comingSoon: {
        title: "Coming Soon",
        description: "Something new is being built. Stay tuned.",
        details: "More details coming soon.",
      },
      viewOnGithub: "View on GitHub",
    },
    experience: {
      label: "Experience",
      heading: "Where I've Worked",
      protaGames: {
        role: "Lead Video Editor — Bulky Bacon · Prota Games",
        period: "2023 – 2024",
        description:
          "As the main editor of Bulky Bacon, a Blox Fruits-focused gaming channel under Prota Games, I built the channel's editing style from the ground up. In roughly two months we reached 200k subscribers and nearly 80 million organic views by crafting high-retention edits and an engaged community. I also onboarded and mentored a second editor, teaching audience-retention techniques and narrative flow. Alongside organic content, I integrated subtle in-video ads across multiple videos.",
        tags: ["VVSA", "Watch Time", "Audience Retention", "Link Conversion", "Short-form", "Storytelling", "Mentorship"],
      },
    },
    videos: {
      label: "Creative Work",
      heading: "Video Editing",
      description:
        "Beyond code, I craft visual stories through motion and rhythm — from cinematic edits to short reels.",
    },
    footer: "© 2026 João Verona",
  },
  pt: {
    nav: {
      creator: "CRIADOR",
      langToggle: "EN",
    },
    hero: {
      welcome: "Bem-vindo",
      heading: "Olá, sou o Verona",
      bio: "Desenvolvedor & editor de vídeo que cria experiências únicas. Apaixonado por UX, UI e IA. Trazendo o melhor que a IA pode oferecer para as suas necessidades.",
    },
    projects: {
      ion: {
        description: "Um app assistente pessoal para iOS voltado para organização de vida.",
        details:
          "iON é um assistente pessoal para iOS desenvolvido com Swift e SwiftUI. Oferece recursos de organização pessoal como tarefas, lembretes, calendário, chat com IA, finanças e listas de compras — com IA integrada.",
      },
      terminoted: {
        description: "Um app de notas e tarefas baseado em TUI para o terminal.",
        details:
          "Terminoted é um aplicativo de notas e tarefas para o terminal. Instalável via Homebrew.",
      },
      comingSoon: {
        title: "Em Breve",
        description: "Algo novo está sendo construído. Fique ligado.",
        details: "Mais detalhes em breve.",
      },
      viewOnGithub: "Ver no GitHub",
    },
    experience: {
      label: "Experiência",
      heading: "Onde Trabalhei",
      protaGames: {
        role: "Editor Principal — Bulky Bacon · Prota Games",
        period: "2023 – 2024",
        description:
          "Como editor principal do Bulky Bacon, canal focado em Blox Fruits sob a Prota Games, construí o estilo de edição do canal do zero. Em cerca de dois meses atingimos 200k inscritos e quase 80 milhões de visualizações orgânicas, criando uma comunidade ativa por meio de edições de alta retenção. Também integrei e treinei um segundo editor, ensinando técnicas de retenção de público e construção de narrativa. Paralelamente ao conteúdo orgânico, implementei anúncios sutis em múltiplos vídeos.",
        tags: ["VVSA", "Watch Time", "Retenção de Público", "Conversão de Links", "Short-form", "Storytelling", "Mentoria"],
      },
    },
    videos: {
      label: "Trabalho Criativo",
      heading: "Edição de Vídeo",
      description:
        "Além do código, crio histórias visuais através do movimento e ritmo — de edições cinemáticas a reels curtos.",
    },
    footer: "© 2026 João Verona",
  },
} as const;
