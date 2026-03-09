export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
}

export interface Skill {
  id: string;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: "Basic" | "Conversational" | "Fluent" | "Native";
}

export type TemplateId = "classic" | "modern" | "minimal" | "executive" | "creative";

export interface ModernColor {
  id: string;
  label: string;
  sidebar: string;
  sidebarDark: string;
  accent: string;
  accentLight: string;
  bar: string;
}

export const MODERN_COLORS: ModernColor[] = [
  {
    id: "indigo",
    label: "Indigo",
    sidebar: "#3730a3",
    sidebarDark: "#1e1b4b",
    accent: "#6366f1",
    accentLight: "#e0e7ff",
    bar: "#a5b4fc",
  },
  {
    id: "slate",
    label: "Slate",
    sidebar: "#1e293b",
    sidebarDark: "#0f172a",
    accent: "#64748b",
    accentLight: "#e2e8f0",
    bar: "#94a3b8",
  },
  {
    id: "emerald",
    label: "Emerald",
    sidebar: "#065f46",
    sidebarDark: "#022c22",
    accent: "#059669",
    accentLight: "#d1fae5",
    bar: "#6ee7b7",
  },
  {
    id: "rose",
    label: "Rose",
    sidebar: "#9f1239",
    sidebarDark: "#4c0519",
    accent: "#e11d48",
    accentLight: "#ffe4e6",
    bar: "#fda4af",
  },
  {
    id: "amber",
    label: "Amber",
    sidebar: "#92400e",
    sidebarDark: "#451a03",
    accent: "#d97706",
    accentLight: "#fef3c7",
    bar: "#fcd34d",
  },
  {
    id: "sky",
    label: "Sky",
    sidebar: "#0c4a6e",
    sidebarDark: "#082f49",
    accent: "#0284c7",
    accentLight: "#e0f2fe",
    bar: "#7dd3fc",
  },
  {
    id: "violet",
    label: "Violet",
    sidebar: "#4c1d95",
    sidebarDark: "#2e1065",
    accent: "#7c3aed",
    accentLight: "#ede9fe",
    bar: "#c4b5fd",
  },
];

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  template: TemplateId;
  modernColorId: string;
  sectionOrder: SectionKey[];
}

export type SectionKey =
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "projects"
  | "certifications"
  | "languages";
