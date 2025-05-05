"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { CreditProvider } from "@/context/CreditContext";
import { Inter } from "next/font/google";
import ProtectedRoute from "@/components/ProtectedRoute";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { CreditDisplay } from "@/components/CreditDisplay";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const ProtectedRouteWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <AuthProvider>
      <CreditProvider>
        <TooltipProvider>
          {isLoginPage ? (
            children
          ) : (
            <ProtectedRoute>
              <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-1 overflow-hidden">
                  <header className="border-b bg-white shadow-lg h-16 flex items-center justify-end px-6">
                    <CreditDisplay />
                  </header>
                  <main className="flex-1 overflow-auto p-6">{children}</main>
                </div>
              </div>
            </ProtectedRoute>
          )}
        </TooltipProvider>
      </CreditProvider>
    </AuthProvider>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#4f46e5" />
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        /> */}
      </head>
      <body className={inter.className}>
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <ProtectedRouteWrapper>{children}</ProtectedRouteWrapper>
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
