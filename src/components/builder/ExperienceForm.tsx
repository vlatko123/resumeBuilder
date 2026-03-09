"use client";
import { useResumeStore } from "@/store/resumeStore";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { Trash2, Plus } from "lucide-react";

export default function ExperienceForm() {
  const { data, addExperience, updateExperience, removeExperience } =
    useResumeStore();

  return (
    <div className="flex flex-col gap-4">
      {data.experience.map((exp, index) => (
        <div
          key={exp.id}
          className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Position {index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeExperience(exp.id)}
            >
              <Trash2 size={14} className="text-red-400" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Company"
              placeholder="Acme Corp"
              value={exp.company}
              onChange={(e) =>
                updateExperience(exp.id, { company: e.target.value })
              }
            />
            <Input
              label="Position"
              placeholder="Software Engineer"
              value={exp.position}
              onChange={(e) =>
                updateExperience(exp.id, { position: e.target.value })
              }
            />
            <Input
              label="Start Date"
              type="month"
              value={exp.startDate}
              onChange={(e) =>
                updateExperience(exp.id, { startDate: e.target.value })
              }
            />
            <div className="flex flex-col gap-1">
              <Input
                label="End Date"
                type="month"
                value={exp.endDate}
                disabled={exp.current}
                onChange={(e) =>
                  updateExperience(exp.id, { endDate: e.target.value })
                }
              />
              <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.current}
                  onChange={(e) =>
                    updateExperience(exp.id, { current: e.target.checked })
                  }
                  className="rounded"
                />
                Currently working here
              </label>
            </div>
          </div>
          <Textarea
            label="Description"
            placeholder="• Developed and maintained...&#10;• Led a team of...&#10;• Improved performance by..."
            rows={4}
            value={exp.description}
            onChange={(e) =>
              updateExperience(exp.id, { description: e.target.value })
            }
          />
        </div>
      ))}
      <Button variant="secondary" onClick={addExperience}>
        <Plus size={15} />
        Add Experience
      </Button>
    </div>
  );
}
