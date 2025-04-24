"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100"
      style={
        {
          boxShadow:
            "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
          "--tw-shadow":
            "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
          "--tw-shadow-colored":
            "0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color)",
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mr-2">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-xl">AdMuseAI</span>
          </div>
        </Link>
        <nav className="flex items-center space-x-8">
          <Link
            href="/#how-it-works"
            className="text-lg font-medium text-zinc-500 hover:text-indigo-600 transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/#examples"
            className="text-lg font-medium text-zinc-500 hover:text-indigo-600 transition-colors"
          >
            Examples
          </Link>
          <Link
            href="/#pricing"
            className="text-lg font-medium text-zinc-500 hover:text-indigo-600 transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/#faq"
            className="text-lg font-medium text-zinc-500 hover:text-indigo-600 transition-colors"
          >
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}
