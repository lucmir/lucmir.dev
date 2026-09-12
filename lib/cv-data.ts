export const profile = {
  name: "Lucas Cunha",
  tagline:
    "Ships products end to end: UI, APIs, data, AI agents, and the cloud platform they run on",
  subtitle:
    "Senior full-stack engineer with 15+ years shipping products in TypeScript, React/Next.js, and Node.js, from identity and payments to LLM agents. Currently building AI products at Civic Technologies.",
  location: "Belo Horizonte, Brazil",
  email: "lucascmir@gmail.com",
  links: {
    github: "https://github.com/lucmir",
    linkedin: "https://www.linkedin.com/in/lucmir",
  },
  cvUrl: "/LucasCunha_cv.pdf",
  stats: ["15+ years", "5 companies", "CS BSc + MSc"],
} as const;

export const about = {
  paragraphs: [
    "I build products end to end: the UI, the APIs, the data model, and the AI agents behind them. Today I'm a senior full-stack engineer at Civic Technologies. I build Civic MCP, a security control plane connecting AI agents to 95+ enterprise tools with guardrails, audit logging, and secure credential management; and Bryn, a signal-based GTM product where LLM agents identify company visitors and act on intent signals in real time.",
    "Before the AI focus, I spent 15+ years shipping full-stack products: a complete identity and authentication platform on Next.js and React, on-chain credentials that scaled past 1M issued, wallet and payment APIs on Node.js, an API-management platform, and video and e-learning platforms. I also own the path to production, so the AWS platform, deploys, and observability underneath my products are mine too.",
    "BSc + MSc in Computer Science from UFMG. Comfortable in TypeScript, Node.js, Python, React, and Next.js, and increasingly in writing the agents that write the code.",
  ],
  currently:
    "Building Civic MCP and Bryn at Civic: LLM agent workflows, the product surfaces around them, and the cloud platform they run on. Exploring advanced agent patterns and skill design.",
} as const;

export type ExperienceItem = {
  company: string;
  monogram: string;
  logo?: string;
  role: string;
  duration: string;
  location?: string;
  bullets: string[];
  stack?: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "Civic Technologies",
    monogram: "CT",
    logo: "/logo-civic.png",
    role: "Senior Full-Stack Engineer",
    duration: "Apr 2025 — Present",
    location: "Belo Horizonte, Brazil",
    bullets: [
      "Civic MCP (AI): build and operate an AI agent security control plane on Model Context Protocol (TypeScript, Node.js), connecting agents to 95+ enterprise tools with guardrails, audit logging, and secure credential management",
      "Bryn (AI): full-stack build of a signal-based GTM product: Next.js/React front end, Node.js services, and a PostgreSQL data model, where LLM-powered agents identify company visitors, enrich and score intent signals, and trigger automated plays into Slack and CRM",
      "Bryn enrichment pipeline: design and ship the agent orchestration that combines LLM calls with third-party data providers, with evaluation and observability built in",
      "Analytics pipeline: own the Kinesis → Lambda → Redshift pipeline that powers product usage reporting",
      "Also lead infrastructure across Civic products (AWS/EKS, GitOps, CI/CD, observability, incident response), so every feature ships with the full deploy and reliability story",
    ],
    stack: [
      "TypeScript",
      "Node.js",
      "Next.js",
      "React",
      "PostgreSQL",
      "Claude Agent SDK",
      "MCP",
      "AWS",
      "Redshift",
    ],
  },
  {
    company: "Civic Technologies",
    monogram: "CT",
    logo: "/logo-civic.png",
    role: "Full Stack Engineer",
    duration: "Nov 2018 — Apr 2025",
    location: "Belo Horizonte, Brazil",
    bullets: [
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
    monogram: "TW",
    logo: "/logo-thoughtworks.png",
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
    monogram: "Im",
    logo: "/logo-imaginie.png",
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
    monogram: "ST",
    logo: "/logo-sambatech.png",
    role: "Software Engineer",
    duration: "Jan 2011 — Feb 2015",
    bullets: [
      "Built an Online Video Platform (Java/Spring MVC) and a distance education application (Python, Django, JavaScript)",
      "Owned infrastructure automation, deployment pipelines, monitoring, and platform design (AWS, Nagios, Graphite, Fabric, New Relic)",
    ],
  },
  {
    company: "Samba Tech",
    monogram: "ST",
    logo: "/logo-sambatech.png",
    role: "Software Developer Intern",
    duration: "Jan 2010 — Dec 2010",
    bullets: [],
  },
  {
    company: "Universidade Federal de Minas Gerais",
    monogram: "UF",
    logo: "/logo-ufmg.svg",
    role: "Undergraduate Researcher",
    duration: "Jan 2008 — Dec 2009",
    bullets: [],
  },
];

export type Skill = { name: string; highlight?: boolean };
export type SkillGroup = { name: string; items: Skill[] };

export const skills: SkillGroup[] = [
  {
    name: "Languages",
    items: [
      { name: "TypeScript", highlight: true },
      { name: "JavaScript", highlight: true },
      { name: "Node.js", highlight: true },
      { name: "Python", highlight: true },
      { name: "Bash" },
      { name: "Java" },
      { name: "Ruby" },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React", highlight: true },
      { name: "Next.js", highlight: true },
      { name: "Tailwind CSS", highlight: true },
      { name: "State management", highlight: true },
      { name: "Accessibility" },
      { name: "Web performance" },
      { name: "Redux" },
    ],
  },
  {
    name: "Backend & APIs",
    items: [
      { name: "Hono", highlight: true },
      { name: "Express", highlight: true },
      { name: "REST APIs", highlight: true },
      { name: "Event-driven (Kafka, SNS/SQS, EventBridge)", highlight: true },
      { name: "Serverless", highlight: true },
      { name: "Microservices" },
      { name: "Django" },
      { name: "FastAPI" },
      { name: "Ruby on Rails" },
      { name: "API Gateway / Kong" },
    ],
  },
  {
    name: "Data",
    items: [
      { name: "PostgreSQL", highlight: true },
      { name: "Redis", highlight: true },
      { name: "DynamoDB", highlight: true },
      { name: "Redshift" },
      { name: "MongoDB" },
    ],
  },
  {
    name: "Testing",
    items: [
      { name: "TDD", highlight: true },
      { name: "Vitest / Jest", highlight: true },
      { name: "Playwright" },
      { name: "Automated testing" },
    ],
  },
  {
    name: "AI & Agents",
    items: [
      { name: "Claude Agent SDK", highlight: true },
      { name: "Model Context Protocol (MCP)", highlight: true },
      { name: "AI Agents", highlight: true },
      { name: "Claude API", highlight: true },
      { name: "Prompt Engineering", highlight: true },
      { name: "RAG / Embeddings" },
      { name: "Vector DBs" },
    ],
  },
  {
    name: "Cloud & Platform",
    items: [
      { name: "AWS", highlight: true },
      { name: "Vercel", highlight: true },
      { name: "Docker", highlight: true },
      { name: "CI/CD", highlight: true },
      { name: "Kubernetes (EKS)" },
      { name: "GitOps" },
      { name: "CloudFormation / Terraform" },
      { name: "Grafana / Prometheus" },
      { name: "OpenTelemetry" },
    ],
  },
  {
    name: "Identity & Web3",
    items: [
      { name: "OAuth 2.0 / OIDC", highlight: true },
      { name: "JWT", highlight: true },
      { name: "Solana" },
      { name: "EVM chains" },
    ],
  },
  {
    name: "Engineering Practice",
    items: [
      { name: "System Design", highlight: true },
      { name: "API Design", highlight: true },
      { name: "Agile / Scrum", highlight: true },
      { name: "Technical Leadership", highlight: true },
      { name: "Mentoring", highlight: true },
      { name: "Code Review", highlight: true },
      { name: "Architecture Reviews", highlight: true },
      { name: "Cross-team Collaboration", highlight: true },
      { name: "Technical Documentation", highlight: true },
    ],
  },
];

export type Certification = {
  name: string;
  image: string;
  verifyUrl: string;
  featured?: boolean;
};

export const certifications: Certification[] = [
  {
    name: "Claude Certified Architect — Foundations",
    image: "/cert-claude-architect.jpg",
    verifyUrl:
      "https://www.credly.com/badges/a4c6bbba-52ff-4639-a26d-52d3d967477a/linked_in_profile",
    featured: true,
  },
  {
    name: "Building with the Claude API",
    image: "/cert-claude-api.jpg",
    verifyUrl: "https://verify.skilljar.com/c/tucskw4odr9j",
  },
  {
    name: "Claude Code in Action",
    image: "/cert-claude-code-in-action.jpg",
    verifyUrl: "https://verify.skilljar.com/c/doafui6gzfvh",
  },
  {
    name: "Introduction to Model Context Protocol",
    image: "/cert-intro-mcp.jpg",
    verifyUrl: "https://verify.skilljar.com/c/u28t79x6qq36",
  },
  {
    name: "Introduction to Agent Skills",
    image: "/cert-intro-agent-skills.jpg",
    verifyUrl: "https://verify.skilljar.com/c/6mhuiuidkkv6",
  },
  {
    name: "Claude with Amazon Bedrock",
    image: "/cert-claude-bedrock.jpg",
    verifyUrl: "https://verify.skilljar.com/c/4snqgtfcp4b6",
  },
];

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
