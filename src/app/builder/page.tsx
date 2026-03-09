import { Suspense } from "react";
import TopBar from "@/components/builder/TopBar";
import BuilderSidebar from "@/components/builder/BuilderSidebar";
import ResumePreview from "@/components/preview/ResumePreview";

export const metadata = {
  title: "Builder — ResumeBuilder",
};

export default function BuilderPage() {
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <Suspense fallback={null}>
        <TopBar />
      </Suspense>
      <div className="flex flex-1 overflow-hidden">
        <BuilderSidebar />
        {/* Preview area */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-950 p-8">
          <div className="max-w-[794px] mx-auto">
            <ResumePreview />
          </div>
        </main>
      </div>
    </div>
  );
}
