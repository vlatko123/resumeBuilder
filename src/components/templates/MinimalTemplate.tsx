import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, sectionOrder } = data;

  const renderSection = (key: string) => {
    switch (key) {
      case "summary":
        if (!summary) return null;
        return (
          <section key="summary" className="mb-6">
            <p className="text-xs text-gray-600 leading-loose">{summary}</p>
          </section>
        );
      case "experience":
        if (!experience.length) return null;
        return (
          <section key="experience" className="mb-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 grid grid-cols-[1fr_auto] gap-x-4">
                <div>
                  <div className="text-sm font-semibold text-gray-900">{exp.position}</div>
                  <div className="text-xs text-gray-500 mb-1">{exp.company}</div>
                  {exp.description && (
                    <div className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{exp.description}</div>
                  )}
                </div>
                <div className="text-[10px] text-gray-400 text-right whitespace-nowrap pt-0.5">
                  {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                </div>
              </div>
            ))}
          </section>
        );
      case "education":
        if (!education.length) return null;
        return (
          <section key="education" className="mb-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 grid grid-cols-[1fr_auto] gap-x-4">
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {edu.degree}{edu.field ? `, ${edu.field}` : ""}
                  </div>
                  <div className="text-xs text-gray-500">{edu.school}</div>
                  {edu.gpa && <div className="text-xs text-gray-400">GPA {edu.gpa}</div>}
                </div>
                <div className="text-[10px] text-gray-400 text-right whitespace-nowrap pt-0.5">
                  {formatDate(edu.startDate)} – {edu.current ? "Present" : formatDate(edu.endDate)}
                </div>
              </div>
            ))}
          </section>
        );
      case "skills":
        if (!skills.length) return null;
        return (
          <section key="skills" className="mb-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">
              Skills
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">
              {skills.map((s) => s.name).filter(Boolean).join(" · ")}
            </p>
          </section>
        );
      case "projects":
        if (!projects.length) return null;
        return (
          <section key="projects" className="mb-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">
              Projects
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-gray-900">{project.name}</span>
                  {project.technologies && (
                    <span className="text-[10px] text-gray-400">{project.technologies}</span>
                  )}
                </div>
                {project.link && (
                  <div className="text-[10px] text-gray-400 mb-0.5">{project.link}</div>
                )}
                {project.description && (
                  <div className="text-xs text-gray-600 leading-relaxed">{project.description}</div>
                )}
              </div>
            ))}
          </section>
        );
      case "certifications":
        if (!certifications.length) return null;
        return (
          <section key="certifications" className="mb-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">
              Certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline mb-1.5">
                <span className="text-xs text-gray-700">
                  {cert.name}{cert.issuer && ` — ${cert.issuer}`}
                </span>
                <span className="text-[10px] text-gray-400">{formatDate(cert.date)}</span>
              </div>
            ))}
          </section>
        );
      case "languages":
        if (!languages.length) return null;
        return (
          <section key="languages" className="mb-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-3">
              Languages
            </h2>
            <p className="text-xs text-gray-600">
              {languages.map((l) => `${l.name} (${l.proficiency})`).join(" · ")}
            </p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white w-full min-h-full px-12 py-10" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      {/* Header */}
      <header className="mb-8 pb-6 border-b border-gray-100">
        {personalInfo.fullName && (
          <h1 className="text-3xl font-light text-gray-900 tracking-tight mb-0.5">{personalInfo.fullName}</h1>
        )}
        {personalInfo.jobTitle && (
          <p className="text-sm text-gray-500">{personalInfo.jobTitle}</p>
        )}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-3 text-[11px] text-gray-400">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {sectionOrder.map((key) => renderSection(key))}
    </div>
  );
}
