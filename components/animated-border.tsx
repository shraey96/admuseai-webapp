"use client";

import { useState, useEffect } from "react";
import { ReactNode } from "react";

interface AnimatedBorderProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedBorder({
  children,
  className = "",
}: AnimatedBorderProps) {
  const [borderRotation, setBorderRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBorderRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute -inset-0.5 rounded-2xl z-0"
        style={{
          background: `conic-gradient(from ${borderRotation}deg at 50% 50%, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.4) 25%, rgba(99, 102, 241, 0.1) 50%, rgba(99, 102, 241, 0.4) 75%, rgba(99, 102, 241, 0.1) 100%)`,
          filter: "blur(8px)",
          opacity: 0.7,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
