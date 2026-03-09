"use client";
import { useResumeStore } from "@/store/resumeStore";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { Trash2, Plus } from "lucide-react";

const levelOptions = [
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
  { value: "Expert", label: "Expert" },
];

export default function SkillsForm() {
  const { data, addSkill, updateSkill, removeSkill } = useResumeStore();

  return (
    <div className="flex flex-col gap-3">
      {data.skills.map((skill) => (
        <div key={skill.id} className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              label="Skill"
              placeholder="React, TypeScript..."
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
            />
          </div>
          <div className="w-36">
            <Select
              label="Level"
              options={levelOptions}
              value={skill.level}
              onChange={(e) =>
                updateSkill(skill.id, {
                  level: e.target.value as typeof skill.level,
                })
              }
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeSkill(skill.id)}
            className="mb-0.5"
          >
            <Trash2 size={14} className="text-red-400" />
          </Button>
        </div>
      ))}
      <Button variant="secondary" onClick={addSkill}>
        <Plus size={15} />
        Add Skill
      </Button>
    </div>
  );
}
