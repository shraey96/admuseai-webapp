"use client";

import * as React from "react";
import { createContext, useContext, useState } from "react";

type ToastVariant = "default" | "destructive" | "success";

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextType {
  toast: (props: ToastProps) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([]);

  const toast = (props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...props, id }]);

    // Auto-dismiss toast
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, props.duration || 5000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded-md shadow-lg max-w-md ${
              t.variant === "destructive"
                ? "bg-red-100 text-red-800 border-l-4 border-red-600"
                : t.variant === "success"
                ? "bg-green-100 text-green-800 border-l-4 border-green-600"
                : "bg-white text-gray-800 border-l-4 border-indigo-600"
            } animate-in fade-in slide-in-from-right-5 duration-300`}
          >
            {t.title && <h4 className="font-medium mb-1">{t.title}</h4>}
            {t.description && <p className="text-sm">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export const toast = (props: ToastProps) => {
  console.warn(
    "You're using the toast function outside of a component. It will not display a toast. Use the useToast hook instead."
  );
  console.info("Toast would have shown:", props);
};
