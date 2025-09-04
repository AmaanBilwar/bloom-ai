"use client";

import FlowEditor from "@/components/FlowEditor";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Link from "next/link";

export default function FlowPage() {
  return (
    <ProtectedRoute>
      <div className="w-full h-screen relative">
        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3 shadow-sm">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              Bloom AI
            </h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
        {/* Bloom AI */}
        <div className="w-full h-full pt-12">
          <FlowEditor />
        </div>
      </div>
    </ProtectedRoute>
  );
}
