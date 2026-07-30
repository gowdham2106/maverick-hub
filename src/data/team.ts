/**
 * Mission Mavericks — static team content.
 * Document data lives in the database; everything here is presentational content.
 */

export const TEAM = {
  name: "Mission Mavericks",
  tagline: "One Team. One Mission. One Standard—Excellence.",
  subtitle: "Innovating Today. Building Tomorrow.",
  mission:
    "Build enterprise-grade software that removes friction from real insurance workflows — fast, accessible and reliable — while giving every member a stage to do their best engineering.",
  vision:
    "Become the most trusted student-founded engineering collective, known for products that graduate from hackathon demos into production systems.",
  values: [
    { title: "Craft over shortcuts", detail: "We review every line and ship what we'd be proud to maintain." },
    { title: "Bias to ship", detail: "A working slice beats a perfect plan. We deploy weekly, always." },
    { title: "Radical clarity", detail: "Written specs, visible metrics, no silent blockers." },
    { title: "Lift the team", detail: "Pairing, mentoring and documentation are part of the definition of done." },
  ],
  journey: [
    { phase: "Idea", date: "Week 0", detail: "Nine students, one whiteboard and a broken motor-claims workflow worth fixing." },
    { phase: "Research", date: "Week 1", detail: "Interviews with claim handlers, surveyors and policyholders across two insurers." },
    { phase: "Planning", date: "Week 2", detail: "Architecture decision records, API contracts and a shared design system." },
    { phase: "Development", date: "Week 3 — current", detail: "Weekly release train, reviewed pull requests and documented sprints." },
    { phase: "Testing", date: "Week 5", detail: "Automated regression suite, AI evaluation set and an accessibility audit." },
    { phase: "Deployment", date: "Week 6", detail: "Cloud rollout with observability dashboards and a demo-ready environment." },
  ],
  mentor: {
    name: "Dr. Anitha Ramesh",
    title: "Faculty Mentor · Department of Computer Science",
    focus: "Applied AI, Software Architecture & Research Methodology",
    quote:
      "Mission Mavericks treat a hackathon like a product cycle — research first, decisions documented, and every claim in the demo backed by evidence.",
    initials: "AR",
  },
  techStack: [
    { name: "ASP.NET Core 8", category: "Backend" },
    { name: "Entity Framework Core", category: "Backend" },
    { name: "SQL Server", category: "Database" },
    { name: "JWT Authentication", category: "Security" },
    { name: "REST API", category: "Integration" },
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "Azure AI", category: "Intelligence" },
  ],
};

export type Member = {
  id: string;
  name: string;
  role: string;
  initials: string;
  hue: number;
};

export const MEMBERS: Member[] = [
  { id: "m1", name: "Aarav Mehta", role: "Team Lead · Full Stack", initials: "AM", hue: 264 },
  { id: "m2", name: "Sara Iqbal", role: "Frontend Engineer", initials: "SI", hue: 300 },
  { id: "m3", name: "Daniel Okoye", role: "Backend Engineer", initials: "DO", hue: 210 },
  { id: "m4", name: "Mei Lin Chen", role: "AI / Data Engineer", initials: "MC", hue: 162 },
  { id: "m5", name: "Luca Moretti", role: "Cloud & DevOps", initials: "LM", hue: 330 },
  { id: "m6", name: "Priya Nair", role: "Product Designer", initials: "PN", hue: 24 },
  { id: "m7", name: "Noah Berg", role: "QA & Automation", initials: "NB", hue: 96 },
  { id: "m8", name: "Zoya Rahman", role: "Business Analyst", initials: "ZR", hue: 240 },
  { id: "m9", name: "Ibrahim Khan", role: "Documentation Lead", initials: "IK", hue: 285 },
];

export const PROJECT = {
  title: "Motor Claims Intelligence Hub (MCIH)",
  category: "AI Powered Insurance Claims Platform",
  status: "In Development",
  duration: "Hackathon Project",
  progress: 62,
  currentPhase: "Development",
  problem:
    "Motor insurance claims often take longer because customer information, vehicle history, policy details, and supporting documents are scattered across multiple systems. Manual verification increases processing time and leads to inconsistent claim decisions.",
  solution:
    "Motor Claims Intelligence Hub (MCIH) is an AI-powered platform that unifies vehicle, policy, and claim information into one intelligent dashboard. It assists customers in preparing claims, validates required documents, analyzes claim completeness, evaluates risk, and recommends claim decisions with explainable insights.",
  features: [
    "360° Vehicle Profile",
    "Claim Preparation Assistant",
    "AI Document Validation",
    "Claim Readiness Score",
    "Risk Assessment",
    "Intelligent Decision Recommendation",
    "Claims Dashboard",
  ],
  outcomes: [
    "Faster claim processing",
    "Better document quality",
    "Reduced manual effort",
    "Improved decision consistency",
    "Better customer experience",
  ],
  technologies: [
    "ASP.NET Core 8",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Entity Framework Core",
    "SQL Server",
    "JWT Authentication",
    "Azure AI",
    "REST API",
  ],
};

export type TimelinePhase = {
  phase: string;
  state: "done" | "current" | "upcoming";
  detail: string;
};

export const PROJECT_TIMELINE: TimelinePhase[] = [
  { phase: "Idea", state: "done", detail: "Problem framing around fragmented motor claim data and slow settlements." },
  { phase: "Research", state: "done", detail: "Stakeholder interviews, competitor review and AI feasibility study." },
  { phase: "Planning", state: "done", detail: "Scope, data model, API contracts and sprint plan agreed and documented." },
  { phase: "Development", state: "current", detail: "Building the claims dashboard, document validation and scoring services." },
  { phase: "Testing", state: "upcoming", detail: "Functional, integration and AI accuracy testing with sample claim sets." },
  { phase: "Deployment", state: "upcoming", detail: "Cloud deployment, demo environment and final documentation handover." },
];

export const GALLERY = [
  { id: "g1", title: "Kick-off workshop", tag: "Process", span: "tall", hue: 264 },
  { id: "g2", title: "Claims workflow whiteboard", tag: "Process", span: "short", hue: 300 },
  { id: "g3", title: "Mentor review session", tag: "Mentorship", span: "short", hue: 210 },
  { id: "g4", title: "Sprint planning board", tag: "Planning", span: "tall", hue: 162 },
  { id: "g5", title: "Design system review", tag: "Design", span: "short", hue: 330 },
  { id: "g6", title: "Build night", tag: "Development", span: "tall", hue: 24 },
  { id: "g7", title: "Pair programming", tag: "Development", span: "short", hue: 96 },
  { id: "g8", title: "Demo rehearsal", tag: "Event", span: "short", hue: 240 },
];

export const QUOTE = {
  text: "Excellence is never an accident; it is the result of high intention and intelligent execution.",
  author: "Aristotle",
};

export const WEEKS = [1, 2, 3, 4] as const;

export const DOCUMENT_TYPES = ["Minutes of Meeting", "Weekly Report"] as const;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];
