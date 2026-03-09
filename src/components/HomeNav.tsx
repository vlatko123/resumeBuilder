"use client";
import Link from "next/link";
import { FileText, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function HomeNav() {
  const { theme, toggle } = useTheme();

  return (
    <nav className="h-14 border-b border-gray-100 dark:border-gray-800 flex items-center px-8">
      <div className="flex items-center gap-2">
        <FileText size={20} className="text-indigo-600" />
        <span className="font-bold text-gray-900 dark:text-white">ResumeBuilder</span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <button
          onClick={toggle}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition relative overflow-hidden"
          title="Toggle theme"
        >
          <span className={`absolute theme-icon ${theme === "light" ? "theme-icon-visible" : "theme-icon-enter"}`}>
            <Moon size={16} className="text-gray-600" />
          </span>
          <span className={`absolute theme-icon ${theme === "dark" ? "theme-icon-visible" : "theme-icon-enter"}`}>
            <Sun size={16} className="text-yellow-400" />
          </span>
        </button>
        <Link
          href="/builder"
          className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Start Building
        </Link>
      </div>
    </nav>
  );
}
