import { useState } from "react";
import { createPortal } from "react-dom";
import ReactConfetti from "react-confetti";

interface ConfettiPortalProps {
  show?: boolean;
}

export default function ConfettiPortal({ show = false }: ConfettiPortalProps) {
  const [windowDimensions] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1000,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  }));

  if (typeof window === "undefined") return null;

  return createPortal(
    show && (
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999 }}
      >
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      </div>
    ),
    document.body
  );
}
