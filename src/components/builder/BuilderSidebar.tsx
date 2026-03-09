"use client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { SectionKey } from "@/types/resume";
import SectionAccordion from "./SectionAccordion";
import PersonalInfoForm from "./PersonalInfoForm";
import SummaryForm from "./SummaryForm";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";
import CertificationsForm from "./CertificationsForm";
import LanguagesForm from "./LanguagesForm";

const sectionConfig: Record<SectionKey, { title: string; Component: React.ComponentType }> = {
  summary: { title: "Professional Summary", Component: SummaryForm },
  experience: { title: "Work Experience", Component: ExperienceForm },
  education: { title: "Education", Component: EducationForm },
  skills: { title: "Skills", Component: SkillsForm },
  projects: { title: "Projects", Component: ProjectsForm },
  certifications: { title: "Certifications", Component: CertificationsForm },
  languages: { title: "Languages", Component: LanguagesForm },
};

function DraggableSection({ id }: { id: SectionKey }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const { title, Component } = sectionConfig[id];

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
      }}
    >
      <SectionAccordion
        title={title}
        dragHandle={
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 touch-none p-0.5"
            aria-label="Drag to reorder"
          >
            <GripVertical size={14} />
          </button>
        }
      >
        <Component />
      </SectionAccordion>
    </div>
  );
}

export default function BuilderSidebar() {
  const { data, setSectionOrder } = useResumeStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = data.sectionOrder.indexOf(active.id as SectionKey);
      const newIndex = data.sectionOrder.indexOf(over.id as SectionKey);
      setSectionOrder(arrayMove(data.sectionOrder, oldIndex, newIndex));
    }
  };

  return (
    <aside className="w-[400px] min-w-[340px] h-[calc(100vh-56px)] overflow-y-auto bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-700 flex flex-col gap-2 p-4">
      <SectionAccordion title="Personal Information" defaultOpen>
        <PersonalInfoForm />
      </SectionAccordion>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={data.sectionOrder} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-2">
            {data.sectionOrder.map((key) => (
              <DraggableSection key={key} id={key} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </aside>
  );
}
