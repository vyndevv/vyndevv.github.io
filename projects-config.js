/* =========================================
   VYNDEV — PROJECTS CONFIGURATION
   =========================================
   Pour ajouter un projet :
   1. Ajoute un objet dans le tableau ci-dessous
   2. Crée la page HTML dans le dossier "projects/"
   3. Mets l'image dans "assets/projects/"
   4. Pour activer la démo : mets les fichiers dans "demos/ton-projet/"
      et renseigne demoUrl: "demos/ton-projet/index.html"
      OU mets une URL externe: demoUrl: "https://monprojet.com"

   Champs disponibles :
   - id          : identifiant unique (kebab-case, sans espaces)
   - titleFr     : titre en français
   - titleEn     : titre en anglais
   - descFr      : description courte en français
   - descEn      : description courte en anglais
   - tech        : tableau des technologies utilisées
   - image       : chemin vers l'image (depuis la racine)
   - page        : chemin vers la page de détail
   - github      : lien GitHub (null si privé/non publié)
   - demoUrl     : URL vers la démo (null = pas de démo)
                   Relative: "demos/mon-projet/index.html"
                   Absolue:  "https://monprojet.com"
                   Local:    "http://localhost:5000" (serveur Flask en local)
   - status      : "active" (en cours) | "completed" (terminé)
   - year        : année du projet (string)
   - featured    : true = apparaît sur la page d'accueil
   ========================================= */

const PROJECTS = [
  {
    id: "fivem-server",
    titleFr: "Serveur FiveM",
    titleEn: "FiveM Server",
    descFr: "Un serveur FiveM entièrement personnalisé avec des scripts et des ressources uniques. En développement depuis plus de 6 mois.",
    descEn: "A fully custom FiveM server with unique scripts and resources. In development for over 6 months.",
    tech: ["Lua", "JavaScript", "SQL"],
    image: "assets/projects/fivem.png",
    page: "projects/fivem.html",
    github: null,
    demoUrl: "https://discord.gg/uJapcvWS",
    status: "active",
    year: "2025",
    featured: true,
  },
  {
    id: "yt-downloader",
    titleFr: "YT Downloader",
    titleEn: "YT Downloader",
    descFr: "Application web ultra-rapide pour télécharger des musiques YouTube en MP3. Version cloud via API, aucune installation nécessaire.",
    descEn: "Ultra-fast web app to download YouTube music as MP3. Cloud version via API, no installation required.",
    tech: ["JavaScript", "API"],
    image: "assets/projects/ytbmusic.png",
    page: "projects/yt-downloader.html",
    github: null,
    demoUrl: "demos/Youtube Music Downloader/index.html",
    status: "completed",
    year: "2024",
    featured: true,
  },
  {
    id: "discord-bot",
    titleFr: "Bot Discord",
    titleEn: "Discord Bot",
    descFr: "Un bot de gestion de serveur Discord en JavaScript avec des commandes de modération et d'utilitaires. En cours de développement.",
    descEn: "A JavaScript Discord server management bot with moderation and utility commands. Currently under development.",
    tech: ["JavaScript", "Node.js"],
    image: "assets/projects/discord.png",
    page: "projects/discord-bot.html",
    github: null,
    demoUrl: null,
    status: "active",
    year: "2025",
    featured: true,
  },
  {
    id: "websites",
    titleFr: "Sites web",
    titleEn: "Websites",
    descFr: "Divers sites web créés pendant mon apprentissage, permettant de développer mes compétences en interfaces utilisateurs.",
    descEn: "Various websites created during my apprenticeship, expanding my skills in building user interfaces.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "assets/projects/website.png",
    page: "projects/websites.html",
    github: null,
    demoUrl: null,
    status: "completed",
    year: "2024",
    featured: false,
  },
  {
    id: "vbackgroundremover",
    titleFr: "vBackgroundRemover",
    titleEn: "vBackgroundRemover",
    descFr: "Outil de suppression de fond d'image en ligne, propulsé par l'IA. Interface minimaliste et traitement rapide.",
    descEn: "Online image background removal tool, powered by AI. Minimalist interface and fast processing.",
    tech: ["HTML", "CSS", "JavaScript", "WASM"],
    image: "assets/projects/background.png",
    page: "projects/vbackgroundremover.html",
    github: null,
    demoUrl: "demos/vBackgroundRemover/index.html",
    status: "completed",
    year: "2026",
    featured: true,
  },
];
