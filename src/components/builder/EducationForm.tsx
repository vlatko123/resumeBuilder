"use client";
import { useResumeStore } from "@/store/resumeStore";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Trash2, Plus } from "lucide-react";

export default function EducationForm() {
  const { data, addEducation, updateEducation, removeEducation } =
    useResumeStore();

  return (
    <div className="flex flex-col gap-4">
      {data.education.map((edu, index) => (
        <div
          key={edu.id}
          className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Education {index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeEducation(edu.id)}
            >
              <Trash2 size={14} className="text-red-400" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <Input
                label="School / University"
                placeholder="MIT"
                value={edu.school}
                onChange={(e) =>
                  updateEducation(edu.id, { school: e.target.value })
                }
              />
            </div>
            <Input
              label="Degree"
              placeholder="Bachelor of Science"
              value={edu.degree}
              onChange={(e) =>
                updateEducation(edu.id, { degree: e.target.value })
              }
            />
            <Input
              label="Field of Study"
              placeholder="Computer Science"
              value={edu.field}
              onChange={(e) =>
                updateEducation(edu.id, { field: e.target.value })
              }
            />
            <Input
              label="Start Date"
              type="month"
              value={edu.startDate}
              onChange={(e) =>
                updateEducation(edu.id, { startDate: e.target.value })
              }
            />
            <div className="flex flex-col gap-1">
              <Input
                label="End Date"
                type="month"
                value={edu.endDate}
                disabled={edu.current}
                onChange={(e) =>
                  updateEducation(edu.id, { endDate: e.target.value })
                }
              />
              <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={edu.current}
                  onChange={(e) =>
                    updateEducation(edu.id, { current: e.target.checked })
                  }
                  className="rounded"
                />
                Currently studying
              </label>
            </div>
            <Input
              label="GPA (optional)"
              placeholder="3.8"
              value={edu.gpa}
              onChange={(e) =>
                updateEducation(edu.id, { gpa: e.target.value })
              }
            />
          </div>
        </div>
      ))}
      <Button variant="secondary" onClick={addEducation}>
        <Plus size={15} />
        Add Education
      </Button>
    </div>
  );
}
