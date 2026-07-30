/**
 * Mission Mavericks — realistic dummy data.
 * In production these shapes map 1:1 to the REST payloads
 * (GET /api/members, /api/projects, /api/skills, ...).
 */

export const TEAM = {
  name: "Mission Mavericks",
  tagline: "One Team. One Mission. One Standard—Excellence.",
  subtitle: "Innovating Today. Building Tomorrow.",
  mission:
    "Ship software that removes friction from real workflows — fast, accessible and reliable — while giving every member a stage to do their best engineering.",
  vision:
    "Become the most trusted student-founded engineering collective, known for products that graduate from hackathon demos into production systems.",
  values: [
    { title: "Craft over shortcuts", detail: "We review every line and ship what we'd be proud to maintain." },
    { title: "Bias to ship", detail: "A working slice beats a perfect plan. We deploy weekly, always." },
    { title: "Radical clarity", detail: "Written specs, visible metrics, no silent blockers." },
    { title: "Lift the team", detail: "Pairing, mentoring and documentation are part of the definition of done." },
  ],
};

export type Member = {
  id: string;
  name: string;
  role: string;
  department: string;
  initials: string;
  skills: string[];
  github: string;
  linkedin: string;
  email: string;
  contribution: number;
  experience: string;
  hue: number;
};

export const MEMBERS: Member[] = [
  {
    id: "m1",
    name: "Aarav Mehta",
    role: "Team Lead · Full Stack",
    department: "Engineering",
    initials: "AM",
    skills: ["C#", ".NET", "React", "Azure"],
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "aarav@missionmavericks.dev",
    contribution: 96,
    experience: "4 yrs",
    hue: 264,
  },
  {
    id: "m2",
    name: "Sara Iqbal",
    role: "Frontend Engineer",
    department: "Product",
    initials: "SI",
    skills: ["TypeScript", "React", "Tailwind", "Motion"],
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "sara@missionmavericks.dev",
    contribution: 91,
    experience: "3 yrs",
    hue: 300,
  },
  {
    id: "m3",
    name: "Daniel Okoye",
    role: "Backend Engineer",
    department: "Engineering",
    initials: "DO",
    skills: ["ASP.NET Core", "EF Core", "SQL Server"],
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "daniel@missionmavericks.dev",
    contribution: 88,
    experience: "3 yrs",
    hue: 200,
  },
  {
    id: "m4",
    name: "Mei Lin Chen",
    role: "Data & ML",
    department: "Research",
    initials: "MC",
    skills: ["Python", "PostgreSQL", "Pandas", "MLflow"],
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "mei@missionmavericks.dev",
    contribution: 84,
    experience: "2 yrs",
    hue: 162,
  },
  {
    id: "m5",
    name: "Luca Moretti",
    role: "Cloud & DevOps",
    department: "Platform",
    initials: "LM",
    skills: ["Docker", "Azure", "GitHub Actions", "K8s"],
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "luca@missionmavericks.dev",
    contribution: 82,
    experience: "5 yrs",
    hue: 330,
  },
  {
    id: "m6",
    name: "Priya Nair",
    role: "Product Designer",
    department: "Design",
    initials: "PN",
    skills: ["Figma", "Design Systems", "Prototyping"],
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "priya@missionmavericks.dev",
    contribution: 79,
    experience: "4 yrs",
    hue: 24,
  },
  {
    id: "m7",
    name: "Noah Berg",
    role: "QA & Automation",
    department: "Quality",
    initials: "NB",
    skills: ["Playwright", "xUnit", "CI"],
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "noah@missionmavericks.dev",
    contribution: 74,
    experience: "2 yrs",
    hue: 96,
  },
  {
    id: "m8",
    name: "Zoya Rahman",
    role: "Mobile Engineer",
    department: "Product",
    initials: "ZR",
    skills: ["React Native", "TypeScript", "Expo"],
    github: "https://github.com/",
    linkedin: "https://linkedin.com/",
    email: "zoya@missionmavericks.dev",
    contribution: 71,
    experience: "2 yrs",
    hue: 220,
  },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  status: "Live" | "In Progress" | "Planning";
  progress: number;
  owner: string;
  timeline: string;
  hue: number;
};

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "AtlasOps",
    description: "Incident command center that turns alert noise into a single ranked action queue.",
    stack: ["ASP.NET Core", "React", "SQL Server", "SignalR"],
    status: "Live",
    progress: 100,
    owner: "Aarav Mehta",
    timeline: "Jan – Apr 2026",
    hue: 264,
  },
  {
    id: "p2",
    title: "PulseGrid",
    description: "Realtime energy telemetry dashboard for campus micro-grids with anomaly alerts.",
    stack: ["React", "Recharts", "Python", "Azure"],
    status: "In Progress",
    progress: 72,
    owner: "Mei Lin Chen",
    timeline: "Mar – Aug 2026",
    hue: 300,
  },
  {
    id: "p3",
    title: "Lexicon",
    description: "Retrieval-augmented study assistant that cites every answer back to source pages.",
    stack: ["TypeScript", "PostgreSQL", "Node", "OpenAI"],
    status: "In Progress",
    progress: 58,
    owner: "Sara Iqbal",
    timeline: "Feb – Sep 2026",
    hue: 200,
  },
  {
    id: "p4",
    title: "Relaykit",
    description: "Drop-in webhook gateway with signed delivery, replay and per-tenant rate limits.",
    stack: ["C#", "EF Core", "Docker", "Redis"],
    status: "Live",
    progress: 100,
    owner: "Daniel Okoye",
    timeline: "Sep – Dec 2025",
    hue: 162,
  },
  {
    id: "p5",
    title: "Northstar CRM",
    description: "Lightweight CRM for student ventures — pipelines, reminders and revenue forecasts.",
    stack: ["React", ".NET", "SQL Server"],
    status: "Planning",
    progress: 18,
    owner: "Priya Nair",
    timeline: "Jul – Dec 2026",
    hue: 330,
  },
  {
    id: "p6",
    title: "Trailmark",
    description: "Offline-first field survey app syncing geotagged inspections when signal returns.",
    stack: ["React Native", "Expo", "MongoDB"],
    status: "In Progress",
    progress: 44,
    owner: "Zoya Rahman",
    timeline: "Apr – Nov 2026",
    hue: 24,
  },
  {
    id: "p7",
    title: "Sentinel QA",
    description: "Visual-regression bot that comments screenshot diffs directly on pull requests.",
    stack: ["Playwright", "Node", "GitHub Actions"],
    status: "Live",
    progress: 100,
    owner: "Noah Berg",
    timeline: "Oct 2025 – Feb 2026",
    hue: 96,
  },
  {
    id: "p8",
    title: "Harbor Deploy",
    description: "One-command preview environments for every branch with cost guardrails.",
    stack: ["Docker", "K8s", "Azure", "Go"],
    status: "Planning",
    progress: 12,
    owner: "Luca Moretti",
    timeline: "Aug 2026 – Jan 2027",
    hue: 220,
  },
];

export const SKILL_GROUPS = [
  {
    group: "Languages",
    items: [
      { name: "C#", value: 92 },
      { name: "TypeScript", value: 90 },
      { name: "JavaScript", value: 88 },
      { name: "Python", value: 80 },
      { name: "SQL", value: 85 },
      { name: "HTML / CSS", value: 94 },
    ],
  },
  {
    group: "Frameworks",
    items: [
      { name: ".NET / ASP.NET Core", value: 91 },
      { name: "React", value: 93 },
      { name: "Node.js", value: 78 },
      { name: "Angular", value: 62 },
    ],
  },
  {
    group: "Databases",
    items: [
      { name: "SQL Server", value: 89 },
      { name: "PostgreSQL", value: 76 },
      { name: "MongoDB", value: 68 },
    ],
  },
  {
    group: "Cloud & DevOps",
    items: [
      { name: "Azure", value: 84 },
      { name: "AWS", value: 66 },
      { name: "Docker", value: 81 },
    ],
  },
];

export const WEEKLY_PROGRESS = [
  { week: "W1", commits: 62, tasks: 18, reviews: 12 },
  { week: "W2", commits: 84, tasks: 24, reviews: 16 },
  { week: "W3", commits: 71, tasks: 21, reviews: 14 },
  { week: "W4", commits: 108, tasks: 33, reviews: 22 },
  { week: "W5", commits: 96, tasks: 29, reviews: 19 },
  { week: "W6", commits: 132, tasks: 38, reviews: 26 },
  { week: "W7", commits: 118, tasks: 31, reviews: 24 },
  { week: "W8", commits: 147, tasks: 42, reviews: 30 },
];

export const EFFORT_SPLIT = [
  { name: "Frontend", value: 34 },
  { name: "Backend", value: 28 },
  { name: "Data / ML", value: 16 },
  { name: "DevOps", value: 12 },
  { name: "Design & QA", value: 10 },
];

export const TIMELINE = [
  { phase: "Idea", date: "Aug 2025", detail: "Six students, one whiteboard and a list of workflows worth fixing.", done: true },
  { phase: "Research", date: "Sep 2025", detail: "38 user interviews across campus labs and two startup incubators.", done: true },
  { phase: "Planning", date: "Oct 2025", detail: "Architecture decision records, API contracts and a shared design system.", done: true },
  { phase: "Development", date: "Nov 2025 – Mar 2026", detail: "Weekly release train; 1,400+ commits and 260 reviewed pull requests.", done: true },
  { phase: "Testing", date: "Apr 2026", detail: "Automated regression suite at 87% coverage plus an accessibility audit.", done: true },
  { phase: "Deployment", date: "May 2026", detail: "Blue-green rollout to production with observability dashboards.", done: true },
  { phase: "Completed", date: "Jun 2026", detail: "Three products live, two in active iteration, retro published.", done: false },
];

export const ACHIEVEMENTS = [
  { title: "National Hack Summit — Winner", org: "HackSummit 2026", detail: "1st of 214 teams for AtlasOps incident triage.", icon: "trophy" as const },
  { title: "Azure Student Challenge — Runner Up", org: "Microsoft, 2025", detail: "Cloud-native architecture and cost efficiency award.", icon: "cloud" as const },
  { title: "Best UI/UX Award", org: "DesignJam 2026", detail: "PulseGrid recognised for realtime data clarity.", icon: "sparkles" as const },
  { title: "Open Source Milestone", org: "GitHub", detail: "Relaykit crossed 2.4k stars and 60 contributors.", icon: "star" as const },
  { title: "Certified: AZ-204", org: "Microsoft", detail: "Five members certified as Azure Developer Associate.", icon: "badge" as const },
  { title: "Campus Innovation Grant", org: "University Fund", detail: "$25k awarded to scale Lexicon to three faculties.", icon: "award" as const },
];

export const HACKATHONS = [
  { name: "HackSummit", year: "2026", result: "Winner", teams: 214 },
  { name: "CodeStorm", year: "2026", result: "Top 5", teams: 180 },
  { name: "Azure Student Challenge", year: "2025", result: "Runner Up", teams: 96 },
  { name: "DesignJam", year: "2026", result: "Best UI/UX", teams: 74 },
  { name: "OpenData Sprint", year: "2025", result: "Finalist", teams: 130 },
];

export const GALLERY = [
  { id: "g1", title: "Demo day, main stage", tag: "Event", span: "tall", hue: 264 },
  { id: "g2", title: "Architecture whiteboard", tag: "Process", span: "short", hue: 300 },
  { id: "g3", title: "48h build sprint", tag: "Hackathon", span: "short", hue: 200 },
  { id: "g4", title: "AZ-204 certificates", tag: "Certificate", span: "tall", hue: 162 },
  { id: "g5", title: "Design system review", tag: "Design", span: "short", hue: 330 },
  { id: "g6", title: "Winner announcement", tag: "Award", span: "tall", hue: 24 },
  { id: "g7", title: "Pair programming night", tag: "Process", span: "short", hue: 96 },
  { id: "g8", title: "Mentor roundtable", tag: "Event", span: "short", hue: 220 },
];

export const DOCUMENTS = [
  { id: "d1", name: "Mission Mavericks — Team Charter", type: "PDF", size: "820 KB", updated: "12 Jun 2026" },
  { id: "d2", name: "AtlasOps Architecture Overview", type: "PDF", size: "2.4 MB", updated: "04 Jun 2026" },
  { id: "d3", name: "PulseGrid Technical Report", type: "DOCX", size: "1.1 MB", updated: "28 May 2026" },
  { id: "d4", name: "HackSummit Final Presentation", type: "PPTX", size: "6.8 MB", updated: "19 May 2026" },
  { id: "d5", name: "API Contract v3", type: "PDF", size: "540 KB", updated: "11 May 2026" },
  { id: "d6", name: "Accessibility Audit Results", type: "PDF", size: "310 KB", updated: "02 May 2026" },
];

export const ACTIVITY = [
  { who: "Sara Iqbal", what: "merged PR #482 · glass sidebar polish", when: "12m ago" },
  { who: "Daniel Okoye", what: "deployed Relaykit v2.3 to production", when: "1h ago" },
  { who: "Mei Lin Chen", what: "added anomaly model to PulseGrid", when: "3h ago" },
  { who: "Noah Berg", what: "raised coverage to 87% on Sentinel QA", when: "6h ago" },
  { who: "Luca Moretti", what: "cut preview env cost by 31%", when: "yesterday" },
];

export const QUOTE = {
  text: "Excellence is never an accident; it is the result of high intention and intelligent execution.",
  author: "Aristotle",
};
