"use client";
import { useResumeStore } from "@/store/resumeStore";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Trash2, Plus } from "lucide-react";

const proficiencyOptions = [
  { value: "Basic", label: "Basic" },
  { value: "Conversational", label: "Conversational" },
  { value: "Fluent", label: "Fluent" },
  { value: "Native", label: "Native" },
];

export default function LanguagesForm() {
  const { data, addLanguage, updateLanguage, removeLanguage } =
    useResumeStore();

  return (
    <div className="flex flex-col gap-3">
      {data.languages.map((lang) => (
        <div key={lang.id} className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              label="Language"
              placeholder="English"
              value={lang.name}
              onChange={(e) =>
                updateLanguage(lang.id, { name: e.target.value })
              }
            />
          </div>
          <div className="w-40">
            <Select
              label="Proficiency"
              options={proficiencyOptions}
              value={lang.proficiency}
              onChange={(e) =>
                updateLanguage(lang.id, {
                  proficiency: e.target.value as typeof lang.proficiency,
                })
              }
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeLanguage(lang.id)}
            className="mb-0.5"
          >
            <Trash2 size={14} className="text-red-400" />
          </Button>
        </div>
      ))}
      <Button variant="secondary" onClick={addLanguage}>
        <Plus size={15} />
        Add Language
      </Button>
    </div>
  );
}
