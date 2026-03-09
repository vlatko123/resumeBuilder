"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  dragHandle?: React.ReactNode;
}

export default function SectionAccordion({
  title,
  children,
  defaultOpen = false,
  dragHandle,
}: SectionAccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="flex items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
        {dragHandle && (
          <div className="pl-3 flex items-center">{dragHandle}</div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="flex-1 flex items-center justify-between px-4 py-3 text-left"
        >
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{title}</span>
          {open ? (
            <ChevronUp size={16} className="text-gray-400" />
          ) : (
            <ChevronDown size={16} className="text-gray-400" />
          )}
        </button>
      </div>
      <div
        className={cn(
          "transition-all duration-200",
          open ? "block" : "hidden"
        )}
      >
        <div className="p-4 bg-white dark:bg-gray-900">{children}</div>
      </div>
    </div>
  );
}
