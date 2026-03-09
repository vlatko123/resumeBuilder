import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";

export default function ExecutiveTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, sectionOrder } = data;

  const renderSection = (key: string) => {
    switch (key) {
      case "summary":
        if (!summary) return null;
        return (
          <section key="summary" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Profile
            </h2>
            <p className="text-xs text-gray-600 leading-relaxed">{summary}</p>
          </section>
        );
      case "experience":
        if (!experience.length) return null;
        return (
          <section key="experience" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">
              Professional Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-0.5">
                  <div>
                    <div className="text-sm font-bold text-gray-900">{exp.position}</div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{exp.company}</div>
                  </div>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap mt-0.5">
                    {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-xs text-gray-600 leading-relaxed whitespace-pre-line mt-1">{exp.description}</div>
                )}
              </div>
            ))}
          </section>
        );
      case "education":
        if (!education.length) return null;
        return (
          <section key="education" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 flex justify-between items-start">
                <div>
                  <div className="text-sm font-bold text-gray-900">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                  </div>
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{edu.school}</div>
                  {edu.gpa && <div className="text-xs text-gray-400 mt-0.5">GPA: {edu.gpa}</div>}
                </div>
                <span className="text-[10px] text-gray-400 whitespace-nowrap mt-0.5">
                  {formatDate(edu.startDate)} – {edu.current ? "Present" : formatDate(edu.endDate)}
                </span>
              </div>
            ))}
          </section>
        );
      case "skills":
        if (!skills.length) return null;
        return (
          <section key="skills" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-[10px] font-medium text-gray-700 border border-gray-300 px-2 py-0.5 rounded-sm"
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
          <section key="projects" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">
              Projects
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold text-gray-900">{project.name}</span>
                  {project.link && <span className="text-[10px] text-gray-400">{project.link}</span>}
                </div>
                {project.technologies && (
                  <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{project.technologies}</div>
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
          <section key="certifications" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline mb-1.5">
                <div>
                  <span className="text-xs font-semibold text-gray-800">{cert.name}</span>
                  {cert.issuer && <span className="text-xs text-gray-500"> · {cert.issuer}</span>}
                </div>
                <span className="text-[10px] text-gray-400">{formatDate(cert.date)}</span>
              </div>
            ))}
          </section>
        );
      case "languages":
        if (!languages.length) return null;
        return (
          <section key="languages" className="mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">
              Languages
            </h2>
            <div className="flex flex-wrap gap-4">
              {languages.map((lang) => (
                <span key={lang.id} className="text-xs text-gray-600">
                  <span className="font-semibold">{lang.name}</span>
                  <span className="text-gray-400"> · {lang.proficiency}</span>
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
      {/* Header Banner */}
      <header className="bg-gray-900 text-white px-10 py-8">
        {personalInfo.fullName && (
          <h1 className="text-2xl font-bold tracking-tight text-white">{personalInfo.fullName}</h1>
        )}
        {personalInfo.jobTitle && (
          <p className="text-sm text-gray-300 mt-1 font-medium tracking-wide">{personalInfo.jobTitle}</p>
        )}
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3 text-[11px] text-gray-400">
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
