import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, sectionOrder } = data;

  const accent = "#7c3aed"; // violet accent

  const renderSection = (key: string) => {
    switch (key) {
      case "summary":
        if (!summary) return null;
        return (
          <section key="summary" className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-4 rounded-full" style={{ background: accent }} />
              <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>About</h2>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed pl-4">{summary}</p>
          </section>
        );
      case "experience":
        if (!experience.length) return null;
        return (
          <section key="experience" className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-4 rounded-full" style={{ background: accent }} />
              <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>Experience</h2>
            </div>
            <div className="pl-4">
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4 relative pl-4 border-l-2 border-gray-100">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full" style={{ background: accent }} />
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-bold text-gray-900">{exp.position}</div>
                      <div className="text-xs font-medium text-gray-500">{exp.company}</div>
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2 mt-0.5">
                      {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  {exp.description && (
                    <div className="text-xs text-gray-600 leading-relaxed whitespace-pre-line mt-1">{exp.description}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      case "education":
        if (!education.length) return null;
        return (
          <section key="education" className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-4 rounded-full" style={{ background: accent }} />
              <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>Education</h2>
            </div>
            <div className="pl-4">
              {education.map((edu) => (
                <div key={edu.id} className="mb-3 relative pl-4 border-l-2 border-gray-100">
                  <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full" style={{ background: accent }} />
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                      </div>
                      <div className="text-xs text-gray-500">{edu.school}</div>
                      {edu.gpa && <div className="text-[10px] text-gray-400">GPA: {edu.gpa}</div>}
                    </div>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2 mt-0.5">
                      {formatDate(edu.startDate)} – {edu.current ? "Present" : formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case "skills":
        if (!skills.length) return null;
        return (
          <section key="skills" className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-4 rounded-full" style={{ background: accent }} />
              <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>Skills</h2>
            </div>
            <div className="flex flex-wrap gap-1.5 pl-4">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-full text-white"
                  style={{ background: accent }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        );
      case "projects":
        if (!projects.length) return null;
        return (
          <section key="projects" className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-1 h-4 rounded-full" style={{ background: accent }} />
              <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>Projects</h2>
            </div>
            <div className="pl-4">
              {projects.map((project) => (
                <div key={project.id} className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-gray-900">{project.name}</span>
                    {project.technologies && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded text-white" style={{ background: accent + "99" }}>
                        {project.technologies}
                      </span>
                    )}
                  </div>
                  {project.link && <div className="text-[10px] text-gray-400 mb-0.5">{project.link}</div>}
                  {project.description && (
                    <div className="text-xs text-gray-600 leading-relaxed">{project.description}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );
      case "certifications":
        if (!certifications.length) return null;
        return (
          <section key="certifications" className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-4 rounded-full" style={{ background: accent }} />
              <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>Certifications</h2>
            </div>
            <div className="pl-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline mb-1.5">
                  <div>
                    <span className="text-xs font-semibold text-gray-800">{cert.name}</span>
                    {cert.issuer && <span className="text-xs text-gray-500"> · {cert.issuer}</span>}
                  </div>
                  <span className="text-[10px] text-gray-400">{formatDate(cert.date)}</span>
                </div>
              ))}
            </div>
          </section>
        );
      case "languages":
        if (!languages.length) return null;
        return (
          <section key="languages" className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-4 rounded-full" style={{ background: accent }} />
              <h2 className="text-xs font-bold uppercase tracking-widest" style={{ color: accent }}>Languages</h2>
            </div>
            <div className="flex flex-wrap gap-3 pl-4">
              {languages.map((lang) => (
                <span key={lang.id} className="text-xs text-gray-600">
                  <span className="font-semibold text-gray-800">{lang.name}</span> · {lang.proficiency}
                </span>
              ))}
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white w-full min-h-full" style={{ fontFamily: "'Arial', sans-serif" }}>
      {/* Header */}
      <header className="px-10 pt-8 pb-6" style={{ borderBottom: `3px solid ${accent}` }}>
        {personalInfo.fullName && (
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">{personalInfo.fullName}</h1>
        )}
        {personalInfo.jobTitle && (
          <p className="text-sm font-semibold mt-0.5" style={{ color: accent }}>{personalInfo.jobTitle}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2 text-[11px] text-gray-500">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Body */}
      <div className="px-10 py-7">
        {sectionOrder.map((key) => renderSection(key))}
      </div>
    </div>
  );
}
