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
      bio: "A developer & video editor crafting experiences. Passionate about UX, UI and AI, bringing the best it can give to your specific needs.",
    },
    projects: {
      ion: {
        description: "An iOS personal assistant app for life organization.",
        details:
          "iON is an iOS personal assistant built with Swift and SwiftUI. It provides life organization features including tasks, reminders, calendar, AI chat, finances, and shopping lists — powered by AI.",
      },
      terminoted: {
        description: "A simple TUI-based notes & to-do app.",
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
        role: "Video Editor — Multiple Channels",
        period: "2024 – 2025",
        description:
          "Worked as a freelance video editor across several gaming channels under the Prota Games network. Primary channel was Bulky Bacon (Blox Fruits), where I built the editing style and content pipeline from scratch — driving the channel from zero to 200k subscribers and nearly 80M organic views in roughly two months. Also edited for other channels in the network. Onboarded and mentored a second editor, integrated in-video advertising, and leveraged ElevenLabs AI voice generation across the audio pipeline.",
        channels: ["Bulky Bacon ★", "BloxYuki", "Dumbck", "Zoomy", "PlayzKnoxy"],
        tags: ["VVSA", "Watch Time", "Audience Retention", "Link Conversion", "Short-form", "Storytelling", "Mentorship", "ElevenLabs"],
      },
    },
    featuredVideo: {
      label: "",
      heading: "a 1-minute me",
      description: "",
    },
    videos: {
      label: "Creative Work",
      heading: "Video Editing",
      description:
        "Beyond code, I craft visual stories through motion and rhythm — from cinematic edits to short reels. As an AI specialist, I apply cutting-edge AI tools across every stage of the editing process.",
    },
    threed: {
      label: "3D",
      heading: "3D Design",
      description:
        "I use Blender for modeling and rendering — mostly for creative projects that need a three-dimensional touch.",
      skills: [
        { name: "Modeling", desc: "Hard-surface and organic modeling in Blender." },
        { name: "Rendering", desc: "Cycles & EEVEE renders with lighting and materials." },
        { name: "Scene Design", desc: "Composing scenes for visual projects and mockups." },
      ],
    },
    contact: "find me at joaoverona [at] aethertechai (dot) com",
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
        role: "Editor de Vídeo — Múltiplos Canais",
        period: "2024 – 2025",
        description:
          "Trabalhei como editor freelance em vários canais de gaming da rede Prota Games. Canal principal: Bulky Bacon (Blox Fruits), onde construí o estilo de edição e pipeline de conteúdo do zero — levando o canal de zero a 200k inscritos e quase 80M de views orgânicas em dois meses. Também editei para outros canais da rede, treinei um segundo editor, integrei publicidade in-video e usei ElevenLabs para geração de voz com IA.",
        channels: ["Bulky Bacon ★", "BloxYuki", "Dumbck", "Zoomy", "PlayzKnoxy"],
        tags: ["VVSA", "Watch Time", "Retenção de Público", "Conversão de Links", "Short-form", "Storytelling", "Mentoria", "ElevenLabs"],
      },
    },
    featuredVideo: {
      label: "",
      heading: "a 1-minute me",
      description: "",
    },
    videos: {
      label: "Trabalho Criativo",
      heading: "Edição de Vídeo",
      description:
        "Além do código, crio histórias visuais através do movimento e ritmo — de edições cinemáticas a reels curtos. Como especialista em IA, aplico ferramentas de inteligência artificial em todas as etapas do processo de edição.",
    },
    threed: {
      label: "3D",
      heading: "Design 3D",
      description:
        "Uso Blender para modelagem e renderização — principalmente em projetos criativos que precisam de uma dimensão extra.",
      skills: [
        { name: "Modelagem", desc: "Modelagem hard-surface e orgânica no Blender." },
        { name: "Renderização", desc: "Renders com Cycles & EEVEE, iluminação e materiais." },
        { name: "Design de Cenas", desc: "Composição de cenas para projetos visuais e mockups." },
      ],
    },
    contact: "me encontre em joaoverona [at] aethertechai (ponto) com",
    footer: "© 2026 João Verona",
  },
} as const;
