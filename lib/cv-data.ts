export const profile = {
  name: "Lucas Cunha",
  tagline: "Building AI agents and the cloud infrastructure they run on",
  subtitle:
    "Senior full-stack engineer with 15+ years across product, cloud, AI/MCP, and identity. Currently building AI agents at Civic Technologies, where I also lead DevOps and infrastructure.",
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
    "I build production AI agents and the cloud infrastructure they run on. Today I'm a full-stack engineer and DevOps lead at Civic Technologies. I build Civic MCP, a security control plane connecting AI agents to 95+ enterprise tools with guardrails, audit logging, and secure credential management; and Bryn, a signal-based GTM product where LLM agents identify company visitors and act on intent signals in real time.",
    "Before the AI focus, I spent 15+ years building and operating large-scale distributed systems: full-stack engineering across identity, payments, and on-chain credentials; cloud architecture on AWS with Kubernetes, Terraform, and GitOps; observability and incident response at scale.",
    "BSc + MSc in Computer Science from UFMG. Comfortable in TypeScript, Node.js, Python, React, and Next.js, and increasingly in writing the agents that write the code.",
  ],
  currently:
    "Building Civic MCP and Bryn at Civic, alongside leading DevOps and infrastructure. Shipping LLM agent workflows, exploring advanced agent patterns and skill design.",
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
    role: "Full-Stack Engineer & DevOps Lead",
    duration: "Apr 2025 — Present",
    location: "Belo Horizonte, Brazil",
    bullets: [
      "Civic MCP (AI): build and operate an AI agent security control plane using MCP to connect agents to 95+ enterprise tools, with guardrails, audit logging, and secure credential management",
      "Bryn (AI): build a signal-based GTM product where LLM-powered agents identify company visitors, enrich and score intent signals, and trigger automated plays into Slack and CRM",
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
    name: "Cloud & Infra",
    items: [
      { name: "AWS", highlight: true },
      { name: "EKS", highlight: true },
      { name: "Kubernetes", highlight: true },
      { name: "Docker", highlight: true },
      { name: "CI/CD", highlight: true },
      { name: "GitHub Actions", highlight: true },
      { name: "Helm", highlight: true },
      { name: "Vercel", highlight: true },
      { name: "Redshift", highlight: true },
      { name: "CloudFront", highlight: true },
      { name: "RDS", highlight: true },
      { name: "WAF", highlight: true },
      { name: "Lambda", highlight: true },
      { name: "DynamoDB", highlight: true },
      { name: "S3", highlight: true },
      { name: "CloudFormation", highlight: true },
      { name: "EC2", highlight: true },
      { name: "Kinesis" },
      { name: "Terraform" },
      { name: "GitOps" },
      { name: "GCP" },
    ],
  },
  {
    name: "Languages",
    items: [
      { name: "TypeScript", highlight: true },
      { name: "JavaScript", highlight: true },
      { name: "Node.js", highlight: true },
      { name: "Python", highlight: true },
      { name: "Bash", highlight: true },
      { name: "Java" },
      { name: "Ruby" },
    ],
  },
  {
    name: "Frameworks",
    items: [
      { name: "Next.js", highlight: true },
      { name: "React", highlight: true },
      { name: "Express", highlight: true },
      { name: "Django", highlight: true },
      { name: "Tailwind CSS" },
      { name: "FastAPI" },
      { name: "Flask" },
      { name: "Hono" },
      { name: "Fastify" },
      { name: "Ruby on Rails" },
      { name: "Spring MVC" },
    ],
  },
  {
    name: "Observability",
    items: [
      { name: "Prometheus", highlight: true },
      { name: "Grafana", highlight: true },
      { name: "New Relic", highlight: true },
      { name: "CloudWatch", highlight: true },
      { name: "OpenTelemetry", highlight: true },
      { name: "Distributed tracing (Jaeger, Tempo)" },
      { name: "Loki" },
      { name: "Datadog" },
    ],
  },
  {
    name: "Architecture & APIs",
    items: [
      { name: "Microservices", highlight: true },
      { name: "REST APIs", highlight: true },
      { name: "Event-driven (Kafka, SNS/SQS, EventBridge)", highlight: true },
      { name: "API Gateway / Kong" },
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
      { name: "Incident Response", highlight: true },
      { name: "Architecture Reviews", highlight: true },
      { name: "Cross-team Collaboration", highlight: true },
      { name: "Technical Documentation", highlight: true },
      { name: "Cost Optimization" },
      { name: "Capacity Planning" },
      { name: "On-call" },
      { name: "TDD" },
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
