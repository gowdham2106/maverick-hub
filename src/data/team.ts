/**
 * Mission Mavericks Hub — static presentational content.
 * Members, project details, roadmap, documents and gallery are stored in the
 * database; only brand copy and taxonomy live here.
 */

export const BRAND = {
  appName: "Mission Mavericks Hub",
  teamName: "Mission Mavericks",
  projectName: "Claim Shield Plus",
  tagline: "Own the Mission. Be the Maverick. Win Together.",
  taglineLines: ["Own the Mission.", "Be the Maverick.", "Win Together."],
  version: "1.0.0",
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  adminEmail: "admin@missionmavericks.dev",
} as const;

export const TEAM = {
  name: BRAND.teamName,
  tagline: BRAND.tagline,
  subtitle: "Enterprise delivery, Maverick mindset.",
  mission:
    "Build enterprise-grade insurance software that removes friction from real claims workflows — fast, accessible and reliable — while giving every Graduate Trainee a stage to do their best engineering.",
  vision:
    "Become the most trusted delivery collective in the programme, known for products that graduate from a project demo into production systems.",
  values: [
    { title: "Craft over shortcuts", detail: "We review every line and ship what we'd be proud to maintain." },
    { title: "Bias to ship", detail: "A working slice beats a perfect plan. We deploy weekly, always." },
    { title: "Radical clarity", detail: "Written specs, visible metrics, no silent blockers." },
    { title: "Lift the team", detail: "Pairing, mentoring and documentation are part of the definition of done." },
  ],
  techStack: [
    { name: "React", category: "Frontend" },
    { name: "TypeScript", category: "Frontend" },
    { name: "Tailwind CSS", category: "Frontend" },
    { name: "ASP.NET Core Web API", category: "Backend" },
    { name: "Supabase Authentication", category: "Security" },
    { name: "Supabase Database", category: "Database" },
    { name: "Supabase Storage", category: "Storage" },
    { name: "AI Engine", category: "Intelligence" },
    { name: "REST API", category: "Integration" },
  ],
};

/** Responsibility groups shown on the About Team page. */
export const RESPONSIBILITIES: { title: string; people: string[] }[] = [
  {
    title: "Business Analysis Lead",
    people: ["Jijendra Manoharan", "Isha Subash", "Dharani Veerapathiran"],
  },
  { title: "QA Lead", people: ["Desingh Kannan", "Varun Sai Addepalli"] },
  {
    title: "Development Lead",
    people: ["Monisha Murugavel", "Dharun Krishna Manoharan", "Gowdham Gokul"],
  },
  { title: "Data & Analytics Lead", people: ["Dharani Veerapathiran", "Isha Subash"] },
  { title: "Innovation & Presentation Lead", people: ["Pavithra Aruchamy"] },
];

/** Layered runtime architecture for Claim Shield Plus. */
export const ARCHITECTURE = [
  { layer: "React", detail: "Responsive portal, dashboards and role-aware UI." },
  { layer: "ASP.NET Core Web API", detail: "Domain services, claim orchestration and business rules." },
  { layer: "Supabase Authentication", detail: "Session management, password reset and role based access." },
  { layer: "Supabase Database", detail: "Postgres with row level security for every table." },
  { layer: "Supabase Storage", detail: "Documents, evidence media and gallery assets." },
  { layer: "AI Engine", detail: "Document validation, readiness scoring and risk explainability." },
  { layer: "Dashboard", detail: "Operational insight for claims leadership and the delivery team." },
] as const;

export const QUOTE = {
  text: "Excellence is never an accident; it is the result of high intention and intelligent execution.",
  author: "Aristotle",
};

export const WEEKS = [1, 2, 3, 4] as const;

export const DOCUMENT_TYPES = [
  "Weekly Report",
  "Minutes of Meeting",
  "Architecture",
  "Presentation",
  "Screenshots",
  "Demo Video",
] as const;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];

export const GALLERY_CATEGORIES = [
  "Team",
  "Process",
  "Design",
  "Development",
  "Review",
  "Demo",
] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export const GALLERY_ACCEPT = "image/png,image/jpeg,image/webp,video/mp4";
