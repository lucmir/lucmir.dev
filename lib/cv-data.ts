export const profile = {
  name: "Lucas Cunha",
  tagline: "Building AI agents and the cloud infrastructure they run on",
  subtitle:
    "Senior Engineer with 15+ years across cloud, AI/MCP, and identity. Currently leading DevOps and infrastructure at Civic Technologies.",
  location: "Belo Horizonte, Brazil",
  email: "luccmir@gmail.com",
  links: {
    github: "https://github.com/lucmir",
    linkedin: "https://www.linkedin.com/in/lucmir",
  },
  cvUrl: "/LucasCunha_cv.pdf",
} as const;

export const about = {
  paragraphs: [
    "I build production AI agents and the cloud infrastructure they run on. Today I lead DevOps and infrastructure at Civic Technologies — including the Civic MCP, a security control plane that connects AI agents to 95+ enterprise tools with guardrails, audit logging, and secure credential management.",
    "Before the AI focus, I spent 15+ years building and operating large-scale distributed systems: full-stack engineering across identity, payments, and on-chain credentials; cloud architecture on AWS with Kubernetes, Terraform, and GitOps; observability and incident response at scale.",
    "BSc + MSc in Computer Science from UFMG. Comfortable in TypeScript, Node.js, Python, React, and Next.js — and increasingly, in writing the agents that write the code.",
  ],
} as const;

export type ExperienceItem = {
  company: string;
  role: string;
  duration: string;
  location?: string;
  bullets: string[];
  stack?: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Civic Technologies",
    role: "DevOps & Infrastructure Lead",
    duration: "Apr 2025 — Present",
    location: "Belo Horizonte, Brazil",
    bullets: [
      "Lead infrastructure, DevOps, observability, analytics pipelines, and scalability across all Civic products",
      "Operate AWS at scale: EKS, EC2, Lambda, DynamoDB, S3, CloudWatch, Kinesis — across dev, staging, and production",
      "Run Kubernetes (EKS) clusters with automated scaling and GitOps-driven deployments",
      "Build CI/CD pipelines and infrastructure-as-code (CloudFormation, Docker, GitHub Actions)",
      "Own end-to-end observability — New Relic, CloudWatch, Grafana, Prometheus, distributed tracing — and incident response",
      "Drive cloud cost optimization, capacity planning, and production reliability",
    ],
  },
  {
    company: "Civic Technologies",
    role: "Full Stack Engineer",
    duration: "Nov 2018 — Apr 2025",
    location: "Belo Horizonte, Brazil",
    bullets: [
      "Civic MCP (AI): built an AI agent security control plane using MCP to connect agents to 95+ enterprise tools, with guardrails, audit logging, and secure credential management",
      "Civic Auth: complete identity and authentication platform (OAuth 2.0, OIDC) on Next.js + React",
      "Civic Pass: on-chain identity credentials on Solana and EVM chains — scaled to 1M+ passes issued",
      "Civic Wallet: APIs for crypto wallet and payments (Node.js, Serverless, AWS)",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "React",
      "Next.js",
      "AWS",
      "Kubernetes",
      "Docker",
      "Solana",
      "Serverless",
      "Vercel",
      "Lambda",
    ],
  },
  {
    company: "ThoughtWorks",
    role: "Developer Consultant",
    duration: "Jun 2016 — Nov 2018",
    location: "Greater Belo Horizonte",
    bullets: [
      "Designed and implemented a Digital Platform for API management (API Gateway/Kong, Ruby on Rails, Node.js, GCP, Kubernetes) — enabling secure, scalable API consumption across teams",
      "Developed a Staffing System (Ruby on Rails, React/Redux, AWS)",
      "Team technical leadership: coordinated development, drove architectural decisions, mentored team members",
    ],
  },
  {
    company: "Imaginie",
    role: "Software Engineer",
    duration: "Mar 2015 — Jun 2016",
    bullets: [
      "Designed and maintained a web application for distance education (Python/Django + AngularJS)",
      "Built a mobile app in Ionic + AngularJS",
      "Owned deployment, monitoring, and CI/CD (AWS, Docker, Ansible, New Relic)",
    ],
  },
  {
    company: "Samba Tech",
    role: "Software Engineer",
    duration: "Jan 2011 — Feb 2015",
    bullets: [
      "Built an Online Video Platform (Java/Spring MVC) and a distance education application (Python, Django, JavaScript)",
      "Owned infrastructure automation, deployment pipelines, monitoring, and platform design (AWS, Nagios, Graphite, Fabric, New Relic)",
    ],
  },
  {
    company: "Samba Tech",
    role: "Software Developer Intern",
    duration: "Jan 2010 — Dec 2010",
    bullets: [],
  },
  {
    company: "Universidade Federal de Minas Gerais",
    role: "Undergraduate Researcher",
    duration: "Jan 2008 — Dec 2009",
    bullets: [],
  },
];

export const skills = {
  topTier: [
    "Claude Agent SDK",
    "Model Context Protocol (MCP)",
    "AI Agents",
    "Claude API",
    "Prompt Engineering",
    "RAG",
  ],
  foundation: [
    {
      group: "Languages",
      items: ["TypeScript", "JavaScript", "Python", "Node.js", "Java", "Ruby"],
    },
    {
      group: "Frameworks",
      items: ["Next.js", "React", "Express.js", "Django", "Spring MVC"],
    },
    {
      group: "Cloud & Infra",
      items: [
        "AWS",
        "EKS",
        "Lambda",
        "DynamoDB",
        "S3",
        "CloudFormation",
        "Terraform",
        "GCP",
        "Vercel",
      ],
    },
    {
      group: "DevOps",
      items: ["Kubernetes", "Docker", "GitHub Actions", "GitOps", "CI/CD"],
    },
    {
      group: "Observability",
      items: [
        "Prometheus",
        "Grafana",
        "New Relic",
        "CloudWatch",
        "Distributed Tracing",
      ],
    },
    {
      group: "Other",
      items: [
        "Microservices",
        "REST APIs",
        "OAuth 2.0 / OIDC",
        "Solana",
        "EVM chains",
      ],
    },
  ],
} as const;

export const certifications = [
  "Claude Certified Architect — Foundations",
  "Building with the Claude API",
  "Claude Code in Action",
  "Introduction to Model Context Protocol",
  "Introduction to Agent Skills",
] as const;

export const education = [
  {
    school: "Universidade Federal de Minas Gerais (UFMG)",
    degree: "Master's degree",
    field: "Computer Science",
    duration: "2011 — 2013",
  },
  {
    school: "Universidade Federal de Minas Gerais (UFMG)",
    degree: "Bachelor's degree",
    field: "Computer Science",
    duration: "2007 — 2010",
  },
] as const;

export const languages = [
  { name: "English", level: "Professional Working" },
  { name: "Portuguese", level: "Native" },
] as const;
