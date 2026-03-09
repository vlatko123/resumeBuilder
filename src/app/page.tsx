import Link from "next/link";
import { Zap, Download, Layout } from "lucide-react";
import HomeNav from "@/components/HomeNav";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col">
      <HomeNav />

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <Zap size={12} />
          Free · No sign-up required
        </div>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight max-w-2xl mb-4">
          Build a beautiful resume{" "}
          <span className="text-indigo-600">in minutes</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mb-8">
          Fill in your details, pick a template, and export a pixel-perfect PDF.
          Your data stays in your browser — no account needed.
        </p>
        <Link
          href="/builder"
          className="bg-indigo-600 text-white font-semibold px-8 py-4 rounded-xl hover:bg-indigo-700 transition text-lg shadow-lg shadow-indigo-200"
        >
          Create My Resume →
        </Link>
      </section>

      {/* Features */}
      <section className="border-t border-gray-100 dark:border-gray-800 py-16 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950 rounded-xl flex items-center justify-center">
              <Layout size={20} className="text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">3 Professional Templates</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Classic, Modern, and Minimal — each crafted to impress recruiters.
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950 rounded-xl flex items-center justify-center">
              <Zap size={20} className="text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Live Preview</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              See your resume update in real-time as you type.
            </p>
          </div>
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950 rounded-xl flex items-center justify-center">
              <Download size={20} className="text-indigo-600" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Export to PDF</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Download a high-quality PDF ready to send to employers.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 dark:border-gray-800 py-6 text-center text-xs text-gray-400 dark:text-gray-600">
        © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
      </footer>
    </div>
  );
}
