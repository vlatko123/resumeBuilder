import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, certifications, languages, sectionOrder } = data;

  const renderSection = (key: string) => {
    switch (key) {
      case "summary":
        if (!summary) return null;
        return (
          <section key="summary" className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
              Summary
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
          </section>
        );
      case "experience":
        if (!experience.length) return null;
        return (
          <section key="experience" className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-gray-900">{exp.position}</span>
                  <span className="text-xs text-gray-500">
                    {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="text-xs text-gray-600 font-medium mb-1">{exp.company}</div>
                {exp.description && (
                  <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</div>
                )}
              </div>
            ))}
          </section>
        );
      case "education":
        if (!education.length) return null;
        return (
          <section key="education" className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-gray-900">{edu.degree}{edu.field ? ` in ${edu.field}` : ""}</span>
                  <span className="text-xs text-gray-500">
                    {formatDate(edu.startDate)} – {edu.current ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="text-xs text-gray-600 font-medium">{edu.school}</div>
                {edu.gpa && <div className="text-xs text-gray-500">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </section>
        );
      case "skills":
        if (!skills.length) return null;
        return (
          <section key="skills" className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span key={skill.id} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                  {skill.name} {skill.level !== "Intermediate" && `· ${skill.level}`}
                </span>
              ))}
            </div>
          </section>
        );
      case "projects":
        if (!projects.length) return null;
        return (
          <section key="projects" className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
              Projects
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-gray-900">{project.name}</span>
                  {project.link && <span className="text-xs text-blue-600">{project.link}</span>}
                </div>
                {project.technologies && (
                  <div className="text-xs text-gray-500 mb-0.5">{project.technologies}</div>
                )}
                {project.description && (
                  <div className="text-xs text-gray-700 leading-relaxed">{project.description}</div>
                )}
              </div>
            ))}
          </section>
        );
      case "certifications":
        if (!certifications.length) return null;
        return (
          <section key="certifications" className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
              Certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline mb-1.5">
                <div>
                  <span className="text-xs font-semibold text-gray-800">{cert.name}</span>
                  {cert.issuer && <span className="text-xs text-gray-500"> · {cert.issuer}</span>}
                </div>
                <span className="text-xs text-gray-500">{formatDate(cert.date)}</span>
              </div>
            ))}
          </section>
        );
      case "languages":
        if (!languages.length) return null;
        return (
          <section key="languages" className="mb-5">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-800 border-b border-gray-300 pb-1 mb-2">
              Languages
            </h2>
            <div className="flex flex-wrap gap-3">
              {languages.map((lang) => (
                <span key={lang.id} className="text-xs text-gray-700">
                  <span className="font-medium">{lang.name}</span> · {lang.proficiency}
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
    <div className="bg-white w-full min-h-full p-10 font-serif" style={{ fontFamily: "Georgia, serif" }}>
      {/* Header */}
      <header className="mb-6 text-center">
        {personalInfo.fullName && (
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{personalInfo.fullName}</h1>
        )}
        {personalInfo.jobTitle && (
          <p className="text-sm text-gray-600 mt-0.5">{personalInfo.jobTitle}</p>
        )}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-0.5 mt-2 text-xs text-gray-500">
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
