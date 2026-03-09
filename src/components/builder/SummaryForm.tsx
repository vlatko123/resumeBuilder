"use client";
import { useResumeStore } from "@/store/resumeStore";
import Textarea from "@/components/ui/Textarea";

export default function SummaryForm() {
  const { data, setSummary } = useResumeStore();

  return (
    <Textarea
      label="Professional Summary"
      placeholder="Write a short summary about yourself, your experience and career goals..."
      rows={5}
      value={data.summary}
      onChange={(e) => setSummary(e.target.value)}
    />
  );
}
