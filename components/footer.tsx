"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 py-12 mt-20 bg-gradient-to-b from-white to-[#f5f5ff] bg-[url('/images/background-pattern.png')] bg-repeat">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl text-[#4f46e5]">AdMuseAI</span>
            </Link>
            <p className="text-zinc-500 mt-2 text-sm">
              AI-powered ad creative generation
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-medium text-zinc-900 mb-2">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#how-it-works"
                    className="text-sm text-zinc-500 hover:text-[#4f46e5] transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#examples"
                    className="text-sm text-zinc-500 hover:text-[#4f46e5] transition-colors"
                  >
                    Examples
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-sm text-zinc-500 hover:text-[#4f46e5] transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-medium text-zinc-900 mb-2">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#faq"
                    className="text-sm text-zinc-500 hover:text-[#4f46e5] transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:support@admuseai.com"
                    className="text-sm text-zinc-500 hover:text-[#4f46e5] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-zinc-500 hover:text-[#4f46e5] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-zinc-500 hover:text-[#4f46e5] transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="border-t border-zinc-200 mt-8 pt-8 text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} AdMuseAI. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link
              href="/privacy"
              className="hover:text-[#4f46e5] transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              href="/terms"
              className="hover:text-[#4f46e5] transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
