export type SkillGroup = {
  name: string;
  skills: string[];
};

export const PROFILE = {
  name: "Abdulmalik Bajandouh",
  role: "AI Product Builder",
  bio: "I'm Abdulmalik Bajandouh, an AI product builder from Saudi Arabia.\n\nI graduated with Honors from Umm Al-Qura University, and I taught myself to build complete products around AI — from the model all the way to the interface people actually use.\n\nToday I'm fully focused on building AI products and intelligent agents: turning LLMs and automation into tools that solve real problems. What drives me is taking a bold idea all the way to something real, useful, and genuinely helpful.",
  education: "B.Sc. in Data Science",
  university: "Umm Al-Qura University",
  location: "Saudi Arabia",
  tags: ["AI Products", "AI Agents", "Full Stack", "Automation"],
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: "Frontend Development",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    name: "Backend & Systems",
    skills: [
      "Python",
      "Node.js",
      "Java",
      "REST APIs",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "Docker",
      "Git",
      "Auth.js",
      "CI/CD",
    ],
  },
  {
    name: "AI & Fullstack Engineering",
    skills: [
      "LLM Providers (Gemini, Claude, ChatGPT)",
      "Prompt Engineering",
      "RAG",
      "Embeddings",
      "Tool Calling",
      "Vercel AI SDK",
      "AI Agents",
      "Automation",
      "Vector Databases (Pinecone, Weaviate)",
      "LangChain",
      "Hugging Face",
      "Fine-tuning (LoRA/QLoRA)",
      "MCP",
      "Groq",
      "Scikit-learn",
      "Pandas",
    ],
  },
  {
    name: "Soft Skills",
    skills: ["Communication", "Problem-Solving", "Adaptability", "Learning Agility", "Teamwork", "Focus"],
  },
];

export type Project = {
  title: string;
  category: "AI / ML" | "AI App" | "Full-Stack";
  featured?: boolean;
  tagline: string;
  description: string;
  techStack: string[];
  links?: { name: string; url: string }[];
  coverImage: { src: string; alt: string };
  images: { src: string; alt: string }[];
};

export const PROJECTS: Project[] = [
  {
    title: "VitaVision",
    category: "AI / ML",
    featured: true,
    tagline: "End-to-end ML platform detecting nutrient deficiencies",
    description:
      "VitaVision is my flagship. It's an end-to-end machine-learning platform that reads blood-test data and predicts deficiencies across 12 vitamins and minerals. I took it the whole way — cleaning and engineering a large NHANES dataset, training and tuning a Random Forest model, then wrapping it in a clean, bilingual (Arabic/English) web app so anyone can actually use it, not just data scientists. It's the project that turned me from someone who analyzes data into someone who ships AI products: I built every layer myself, from the data pipeline to the interface.",
    techStack: [
      "Python",
      "Scikit-learn",
      "Random Forest",
      "ML Pipeline",
      "Pandas",
      "EDA",
      "Data Engineering",
      "Streamlit",
      "Model Deployment",
    ],
    links: [{ name: "View on GitHub", url: "https://github.com/ABDULMALIK0001/VitaVision_Project" }],
    coverImage: { src: "/projects/vitavision-logo.svg", alt: "VitaVision project logo" },
    images: [
      { src: "/projects/vitavision-1.png", alt: "VitaVision welcome screen" },
      { src: "/projects/vitavision-2.png", alt: "VitaVision analysis results" },
    ],
  },
  {
    title: "AI Resume Analyzer",
    category: "AI App",
    tagline: "Instant AI résumé feedback with rewrites & ATS check",
    description:
      "Job hunting made me build this one. You upload your résumé as a PDF and, in seconds, an AI gives you an honest score, an ATS-readiness check, and concrete rewrite suggestions — the actual improved lines, not vague advice. Under the hood it parses the PDF, sends the text to Gemini with a strict structured-output schema, and renders it all as a clean report. It's a small tool with a real use — I run my own résumé through it.",
    techStack: [
      "Next.js",
      "TypeScript",
      "LLM",
      "Gemini",
      "Structured Output (JSON schema)",
      "Prompt Engineering",
      "PDF Parsing",
      "REST API",
      "Tailwind CSS",
    ],
    links: [{ name: "View on GitHub", url: "https://github.com/ABDULMALIK0001/ai-resume-analyzer" }],
    coverImage: { src: "/projects/resume-analyzer-logo.svg", alt: "AI Resume Analyzer project logo" },
    images: [
      { src: "/projects/resume-analyzer-landing.png", alt: "AI Resume Analyzer — upload page" },
      { src: "/projects/resume-analyzer-results-analysis.png", alt: "AI Resume Analyzer — strengths & gaps" },
    ],
  },
  {
    title: "Chat with your PDF",
    category: "AI App",
    tagline: "Advanced RAG chat with citations, reranking & query rewriting",
    description:
      "This is my proper deep-dive into RAG. You drop in any PDF and chat with it — but instead of naively stuffing everything into the prompt, it runs a real retrieval pipeline: it chunks and embeds the document, retrieves the most relevant passages, reranks them with a second model, rewrites follow-up questions into standalone queries, and streams the answer back with inline citations that point to the exact page. It handles Arabic and English too. Building it taught me the parts of RAG that actually matter in production.",
    techStack: [
      "Next.js",
      "RAG",
      "Embeddings",
      "Vector Search",
      "Reranking",
      "Query Rewriting",
      "Streaming",
      "Citations",
      "Gemini",
    ],
    links: [{ name: "View on GitHub", url: "https://github.com/ABDULMALIK0001/chat-with-pdf" }],
    coverImage: { src: "/projects/chat-with-pdf-logo.svg", alt: "Chat with your PDF project logo" },
    images: [
      { src: "/projects/chat-with-pdf-landing.png", alt: "Chat with your PDF — upload page" },
      { src: "/projects/chat-with-pdf-chat-response.png", alt: "Chat with your PDF — AI response with citations" },
    ],
  },
  {
    title: "JobTrack",
    category: "Full-Stack",
    tagline: "Dockerized job-application tracker (Kanban)",
    description:
      "JobTrack is my full-stack, backend-heavy project — a Dockerized job-application tracker with a drag-and-drop Kanban board (Wishlist → Applied → Interview → Offer). I built the whole stack: authentication with Auth.js (email + GitHub), a PostgreSQL database through Prisma, Redis for rate-limiting and caching, and the entire thing containerized with Docker Compose plus a CI pipeline. This is where I wanted to prove I can build and run real infrastructure, not just call an API — and I use it to track my own job search.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Auth.js",
      "Server Actions",
      "Rate Limiting",
      "Docker",
      "Docker Compose",
      "CI/CD",
    ],
    links: [{ name: "View on GitHub", url: "https://github.com/ABDULMALIK0001/jobtrack" }],
    coverImage: { src: "/projects/jobtrack-logo.svg", alt: "JobTrack project logo" },
    images: [
      { src: "/projects/jobtrack-dashboard.png", alt: "JobTrack Kanban application dashboard" },
    ],
  },
];

export type ExperienceEntry = {
  kind: "education";
  title: string;
  org: string;
  period: string;
  detail?: string;
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    kind: "education",
    title: "B.Sc. in Data Science",
    org: "Umm Al-Qura University, Makkah",
    period: "2026",
    detail: "Graduated with Honors.",
  },
];

export const CONTACT = {
  email: "abdulmalik.bajandouh@gmail.com",
  whatsapp: "+966 54 976 0581",
  linkedin: "https://www.linkedin.com/in/abdulmalik-bajanduh/",
  github: "https://github.com/ABDULMALIK0001",
};

export const RESUME_URL = "/resume.pdf";

export const FUN_BLURB =
  "Outside of code, I’m a big gamer — it’s how I unwind, and it’s also where my curiosity about how digital worlds are built first began. I’m the kind of person who dives into late-night rabbit holes, exploring every new AI tool as soon as it launches. What keeps me motivated is the same thing that drew me to this field in the first place: turning a bold idea into something real, useful, and meaningful for people.";
