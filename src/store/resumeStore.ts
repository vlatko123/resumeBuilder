import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ResumeData,
  PersonalInfo,
  WorkExperience,
  Education,
  Skill,
  Project,
  Certification,
  Language,
  TemplateId,
  SectionKey,
} from "@/types/resume";
import { nanoid } from "@/lib/utils";

const defaultData: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  template: "classic",
  modernColorId: "indigo",
  sectionOrder: [
    "summary",
    "experience",
    "education",
    "skills",
    "projects",
    "certifications",
    "languages",
  ],
};

interface ResumeStore {
  data: ResumeData;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  setSummary: (summary: string) => void;
  setTemplate: (template: TemplateId) => void;
  setModernColor: (colorId: string) => void;
  setSectionOrder: (order: SectionKey[]) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<WorkExperience>) => void;
  removeExperience: (id: string) => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Skills
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  // Projects
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;

  // Certifications
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  // Languages
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  // Import / Export
  importData: (data: ResumeData) => void;
  resetData: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: defaultData,

      setPersonalInfo: (info) =>
        set((state) => ({
          data: {
            ...state.data,
            personalInfo: { ...state.data.personalInfo, ...info },
          },
        })),

      setSummary: (summary) =>
        set((state) => ({ data: { ...state.data, summary } })),

      setTemplate: (template) =>
        set((state) => ({ data: { ...state.data, template } })),

      setModernColor: (modernColorId) =>
        set((state) => ({ data: { ...state.data, modernColorId } })),

      setSectionOrder: (sectionOrder) =>
        set((state) => ({ data: { ...state.data, sectionOrder } })),

      addExperience: () =>
        set((state) => ({
          data: {
            ...state.data,
            experience: [
              ...state.data.experience,
              {
                id: nanoid(),
                company: "",
                position: "",
                startDate: "",
                endDate: "",
                current: false,
                description: "",
              },
            ],
          },
        })),

      updateExperience: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            experience: state.data.experience.filter((e) => e.id !== id),
          },
        })),

      addEducation: () =>
        set((state) => ({
          data: {
            ...state.data,
            education: [
              ...state.data.education,
              {
                id: nanoid(),
                school: "",
                degree: "",
                field: "",
                startDate: "",
                endDate: "",
                current: false,
                gpa: "",
              },
            ],
          },
        })),

      updateEducation: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.map((e) =>
              e.id === id ? { ...e, ...data } : e
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            education: state.data.education.filter((e) => e.id !== id),
          },
        })),

      addSkill: () =>
        set((state) => ({
          data: {
            ...state.data,
            skills: [
              ...state.data.skills,
              { id: nanoid(), name: "", level: "Intermediate" },
            ],
          },
        })),

      updateSkill: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.map((s) =>
              s.id === id ? { ...s, ...data } : s
            ),
          },
        })),

      removeSkill: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            skills: state.data.skills.filter((s) => s.id !== id),
          },
        })),

      addProject: () =>
        set((state) => ({
          data: {
            ...state.data,
            projects: [
              ...state.data.projects,
              {
                id: nanoid(),
                name: "",
                description: "",
                technologies: "",
                link: "",
              },
            ],
          },
        })),

      updateProject: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.map((p) =>
              p.id === id ? { ...p, ...data } : p
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            projects: state.data.projects.filter((p) => p.id !== id),
          },
        })),

      addCertification: () =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: [
              ...state.data.certifications,
              { id: nanoid(), name: "", issuer: "", date: "", link: "" },
            ],
          },
        })),

      updateCertification: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.map((c) =>
              c.id === id ? { ...c, ...data } : c
            ),
          },
        })),

      removeCertification: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            certifications: state.data.certifications.filter(
              (c) => c.id !== id
            ),
          },
        })),

      addLanguage: () =>
        set((state) => ({
          data: {
            ...state.data,
            languages: [
              ...state.data.languages,
              { id: nanoid(), name: "", proficiency: "Fluent" },
            ],
          },
        })),

      updateLanguage: (id, data) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.map((l) =>
              l.id === id ? { ...l, ...data } : l
            ),
          },
        })),

      removeLanguage: (id) =>
        set((state) => ({
          data: {
            ...state.data,
            languages: state.data.languages.filter((l) => l.id !== id),
          },
        })),

      importData: (data) => set({ data }),

      resetData: () => set({ data: defaultData }),
    }),
    { name: "resume-builder-data" }
  )
);
