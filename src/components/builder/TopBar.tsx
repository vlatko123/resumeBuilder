"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useResumeStore } from "@/store/resumeStore";
import { TemplateId, MODERN_COLORS } from "@/types/resume";
import Button from "@/components/ui/Button";
import { Download, Upload, RotateCcw, FileText, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { exportToPdf } from "@/lib/exportPdf";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    LemonSqueezy?: any;
    createLemonSqueezy?: () => void;
  }
}

const templates: { id: TemplateId; label: string }[] = [
  { id: "classic", label: "Classic" },
  { id: "modern", label: "Modern" },
  { id: "minimal", label: "Minimal" },
  { id: "executive", label: "Executive" },
  { id: "creative", label: "Creative" },
];

export default function TopBar() {
  const { data, setTemplate, setModernColor, importData, resetData } = useResumeStore();
  const { theme, toggle } = useTheme();
  const [paying, setPaying] = useState(false);
  const searchParams = useSearchParams();

  // Auto-trigger PDF export after successful payment redirect
  useEffect(() => {
    if (searchParams.get("paid") === "true") {
      const name = data.personalInfo.fullName || "resume";
      exportToPdf("resume-preview", name);
      // Clean up the URL
      const url = new URL(window.location.href);
      url.searchParams.delete("paid");
      window.history.replaceState({}, "", url.toString());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load Lemon Squeezy embed script once
  useEffect(() => {
    if (document.getElementById("lemon-squeezy-script")) return;
    const script = document.createElement("script");
    script.id = "lemon-squeezy-script";
    script.src = "https://app.lemonsqueezy.com/js/lemon.js";
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  const handleExport = async () => {
    setPaying(true);
    try {
      // Create a checkout session
      const res = await fetch("/api/checkout", { method: "POST" });
      const { url, error } = await res.json();

      if (error || !url) {
        alert("Could not create checkout. Please try again.");
        setPaying(false);
        return;
      }

      let paymentSucceeded = false;

      // Set up Lemon Squeezy event handler to trigger PDF after payment
      window.LemonSqueezy?.Setup?.({
        eventHandler: async (event: { event: string }) => {
          if (event.event === "Checkout.Success") {
            paymentSucceeded = true;
            await new Promise((r) => setTimeout(r, 500));
            const name = data.personalInfo.fullName || "resume";
            await exportToPdf("resume-preview", name);
            setPaying(false);
          }
        },
      });

      // Open checkout as overlay
      window.LemonSqueezy?.Url?.Open?.(url);

      // Detect overlay close (cancel) via MutationObserver — LS has no close event
      setTimeout(() => {
        const observer = new MutationObserver(() => {
          const lsFrame = document.querySelector('iframe[src*="lemonsqueezy.com"]');
          if (!lsFrame) {
            if (!paymentSucceeded) setPaying(false);
            observer.disconnect();
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }, 800);
    } catch {
      alert("Something went wrong. Please try again.");
      setPaying(false);
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target?.result as string);
          importData(parsed);
        } catch {
          alert("Invalid JSON file.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleReset = () => {
    if (confirm("Reset all data? This cannot be undone.")) {
      resetData();
    }
  };

  return (
    <header className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-4 sticky top-0 z-10">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mr-2 hover:opacity-75 transition">
        <FileText size={20} className="text-indigo-600" />
        <span className="font-bold text-gray-900 dark:text-white text-sm">ResumeBuilder</span>
      </Link>

      {/* Template Switcher */}
      <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
              data.template === t.id
                ? "bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Color picker — only visible when Modern is selected */}
      {data.template === "modern" && (
        <div className="flex items-center gap-1.5 pl-3 border-l border-gray-200 dark:border-gray-700">
          {MODERN_COLORS.map((c) => (
            <button
              key={c.id}
              title={c.label}
              onClick={() => setModernColor(c.id)}
              className="w-5 h-5 rounded-full transition-transform hover:scale-110 focus:outline-none"
              style={{
                background: c.sidebar,
                boxShadow:
                  data.modernColorId === c.id
                    ? `0 0 0 2px white, 0 0 0 3.5px ${c.sidebar}`
                    : "none",
              }}
            />
          ))}
        </div>
      )}

      <div className="ml-auto flex items-center gap-2">
        {/* Theme toggle */}
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

        <Button variant="ghost" size="sm" onClick={handleImportJson}>
          <Upload size={14} />
          Import
        </Button>
        <Button variant="ghost" size="sm" onClick={handleExportJson}>
          <Download size={14} />
          Save JSON
        </Button>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <RotateCcw size={14} />
          Reset
        </Button>
        <Button variant="primary" size="sm" onClick={handleExport} disabled={paying}>
          <Download size={14} />
          {paying ? "Opening checkout..." : "Export PDF · $2.99"}
        </Button>
      </div>
    </header>
  );
}
