"use client";
import { useResumeStore } from "@/store/resumeStore";
import ClassicTemplate from "@/components/templates/ClassicTemplate";
import ModernTemplate from "@/components/templates/ModernTemplate";
import MinimalTemplate from "@/components/templates/MinimalTemplate";
import ExecutiveTemplate from "@/components/templates/ExecutiveTemplate";
import CreativeTemplate from "@/components/templates/CreativeTemplate";
export default function ResumePreview() {
  const { data } = useResumeStore();

  const Template =
    { classic: ClassicTemplate, modern: ModernTemplate, minimal: MinimalTemplate, executive: ExecutiveTemplate, creative: CreativeTemplate }[data.template] ??
    ClassicTemplate;

  return (
    <div
      id="resume-preview"
      className="w-full shadow-xl rounded-sm overflow-hidden bg-white"
    >
      <Template data={data} />
    </div>
  );
}
