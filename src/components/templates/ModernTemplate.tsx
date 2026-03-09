import { ResumeData, MODERN_COLORS } from "@/types/resume";
import { formatDate } from "@/lib/utils";

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const {
    personalInfo, summary, experience, education,
    skills, projects, certifications, languages, sectionOrder, modernColorId,
  } = data;

  const color = MODERN_COLORS.find((c) => c.id === modernColorId) ?? MODERN_COLORS[0];

  const leftSections = ["skills", "languages", "certifications"];
  const rightSections = ["summary", "experience", "education", "projects"];
  const leftOrder = sectionOrder.filter((s) => leftSections.includes(s));
  const rightOrder = sectionOrder.filter((s) => rightSections.includes(s));

  const renderLeft = (key: string) => {
    switch (key) {
      case "skills":
        if (!skills.length) return null;
        return (
          <section key="skills" className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: color.bar }}>Skills</h2>
            <div className="flex flex-col gap-2">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between text-xs text-white mb-0.5">
                    <span>{skill.name}</span>
                    <span className="text-[10px]" style={{ color: color.bar }}>{skill.level}</span>
                  </div>
                  <div className="h-1 rounded-full" style={{ background: color.sidebarDark }}>
                    <div
                      className="h-1 rounded-full"
                      style={{
                        background: color.bar,
                        width:
                          skill.level === "Beginner" ? "25%" :
                          skill.level === "Intermediate" ? "50%" :
                          skill.level === "Advanced" ? "75%" : "100%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case "languages":
        if (!languages.length) return null;
        return (
          <section key="languages" className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: color.bar }}>Languages</h2>
            {languages.map((lang) => (
              <div key={lang.id} className="flex justify-between text-xs text-white mb-1">
                <span>{lang.name}</span>
                <span style={{ color: color.bar }}>{lang.proficiency}</span>
              </div>
            ))}
          </section>
        );
      case "certifications":
        if (!certifications.length) return null;
        return (
          <section key="certifications" className="mb-5">
            <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: color.bar }}>Certifications</h2>
            {certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <div className="text-xs text-white font-medium">{cert.name}</div>
                <div className="text-[10px]" style={{ color: color.bar }}>
                  {cert.issuer} {cert.date && `· ${formatDate(cert.date)}`}
                </div>
              </div>
            ))}
          </section>
        );
      default:
        return null;
    }
  };

  const renderRight = (key: string) => {
    switch (key) {
      case "summary":
        if (!summary) return null;
        return (
          <section key="summary" className="mb-5">
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 mb-2 border-b-2"
              style={{ color: color.accent, borderColor: color.accentLight }}
            >
              About Me
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
          </section>
        );
      case "experience":
        if (!experience.length) return null;
        return (
          <section key="experience" className="mb-5">
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 mb-2 border-b-2"
              style={{ color: color.accent, borderColor: color.accentLight }}
            >
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 pl-3 border-l-2" style={{ borderColor: color.accentLight }}>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-gray-900">{exp.position}</span>
                  <span className="text-[10px] text-gray-400">
                    {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="text-xs font-medium mb-1" style={{ color: color.accent }}>{exp.company}</div>
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
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 mb-2 border-b-2"
              style={{ color: color.accent, borderColor: color.accentLight }}
            >
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 pl-3 border-l-2" style={{ borderColor: color.accentLight }}>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-gray-900">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ""}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {formatDate(edu.startDate)} – {edu.current ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="text-xs font-medium" style={{ color: color.accent }}>{edu.school}</div>
                {edu.gpa && <div className="text-[10px] text-gray-500">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </section>
        );
      case "projects":
        if (!projects.length) return null;
        return (
          <section key="projects" className="mb-5">
            <h2
              className="text-xs font-bold uppercase tracking-widest pb-1 mb-2 border-b-2"
              style={{ color: color.accent, borderColor: color.accentLight }}
            >
              Projects
            </h2>
            {projects.map((project) => (
              <div key={project.id} className="mb-3 pl-3 border-l-2" style={{ borderColor: color.accentLight }}>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-bold text-gray-900">{project.name}</span>
                  {project.link && (
                    <span className="text-[10px]" style={{ color: color.accent }}>{project.link}</span>
                  )}
                </div>
                {project.technologies && (
                  <div className="text-[10px] text-gray-500 mb-0.5">{project.technologies}</div>
                )}
                {project.description && (
                  <div className="text-xs text-gray-700 leading-relaxed">{project.description}</div>
                )}
              </div>
            ))}
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white w-full min-h-full flex" style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Left sidebar */}
      <div className="w-[38%] p-6 flex flex-col" style={{ background: color.sidebar }}>
        <div className="mb-6">
          {personalInfo.fullName && (
            <h1 className="text-xl font-bold text-white leading-tight">{personalInfo.fullName}</h1>
          )}
          {personalInfo.jobTitle && (
            <p className="text-xs font-medium uppercase tracking-wider mt-1" style={{ color: color.bar }}>
              {personalInfo.jobTitle}
            </p>
          )}
        </div>

        {/* Contact */}
        <div className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: color.bar }}>Contact</h2>
          <div className="flex flex-col gap-1">
            {personalInfo.email && <span className="text-xs text-white break-all">{personalInfo.email}</span>}
            {personalInfo.phone && <span className="text-xs text-white">{personalInfo.phone}</span>}
            {personalInfo.location && <span className="text-xs text-white">{personalInfo.location}</span>}
            {personalInfo.linkedin && <span className="text-xs break-all" style={{ color: color.bar }}>{personalInfo.linkedin}</span>}
            {personalInfo.website && <span className="text-xs break-all" style={{ color: color.bar }}>{personalInfo.website}</span>}
          </div>
        </div>

        {leftOrder.map((key) => renderLeft(key))}
      </div>

      {/* Right content */}
      <div className="flex-1 p-6">
        {rightOrder.map((key) => renderRight(key))}
      </div>
    </div>
  );
}
