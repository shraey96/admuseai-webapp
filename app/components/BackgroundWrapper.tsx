import { ReactNode } from "react";

interface BackgroundWrapperProps {
  children: ReactNode;
  variant?: "default" | "gradient" | "dots" | "waves";
  className?: string;
}

const baseStyles = "relative";

const variants = {
  default: "bg-white",
  gradient: "bg-gradient-to-b from-[#f5f5ff] to-white",
  dots: "bg-[radial-gradient(#e0e0ff_1px,transparent_1px)] [background-size:20px_20px]",
  waves: "bg-[url('/images/background-pattern.png')] bg-repeat bg-opacity-50",
};

const beforeStyles = {
  default: "",
  gradient:
    "before:absolute before:inset-0 before:bg-[url('/images/background-pattern.png')] before:bg-repeat before:opacity-[0.03]",
  dots: "before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:to-white/50",
  waves:
    "before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-50/10 before:via-transparent before:to-blue-50/10",
};

export default function BackgroundWrapper({
  children,
  variant = "default",
  className = "",
}: BackgroundWrapperProps) {
  return (
    <div
      className={`${baseStyles} ${variants[variant]} ${beforeStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
