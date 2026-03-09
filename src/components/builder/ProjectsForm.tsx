"use client";
import { useResumeStore } from "@/store/resumeStore";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { Trash2, Plus } from "lucide-react";

export default function ProjectsForm() {
  const { data, addProject, updateProject, removeProject } = useResumeStore();

  return (
    <div className="flex flex-col gap-4">
      {data.projects.map((project, index) => (
        <div
          key={project.id}
          className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Project {index + 1}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeProject(project.id)}
            >
              <Trash2 size={14} className="text-red-400" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Project Name"
              placeholder="My Awesome App"
              value={project.name}
              onChange={(e) =>
                updateProject(project.id, { name: e.target.value })
              }
            />
            <Input
              label="Technologies"
              placeholder="React, Node.js, PostgreSQL"
              value={project.technologies}
              onChange={(e) =>
                updateProject(project.id, { technologies: e.target.value })
              }
            />
            <div className="col-span-2">
              <Input
                label="Link (optional)"
                placeholder="github.com/you/project"
                value={project.link}
                onChange={(e) =>
                  updateProject(project.id, { link: e.target.value })
                }
              />
            </div>
          </div>
          <Textarea
            label="Description"
            placeholder="Describe what the project does and your contributions..."
            rows={3}
            value={project.description}
            onChange={(e) =>
              updateProject(project.id, { description: e.target.value })
            }
          />
        </div>
      ))}
      <Button variant="secondary" onClick={addProject}>
        <Plus size={15} />
        Add Project
      </Button>
    </div>
  );
}
