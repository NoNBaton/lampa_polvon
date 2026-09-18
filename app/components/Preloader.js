"use client";

import React, { useEffect, useState } from "react";

export default function Preloader({ isLoading }) {
  const [shouldRender, setShouldRender] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsFadingOut(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0d0d0d] flex items-center justify-center transition-all duration-600 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Стили анимации мигания и яркого свечения */}
      <style jsx global>{`
        @keyframes lampBlink {
          0% {
            color: #333333;
            filter: drop-shadow(0 0 0px rgba(34, 197, 94, 0));
          }
          50% {
            color: #22c55e;
            filter: drop-shadow(0 0 15px rgba(34, 197, 94, 0.6));
          }
          100% {
            color: #15803d;
            filter: drop-shadow(0 0 3px rgba(34, 197, 94, 0.2));
          }
        }
        .animate-lamp-blink {
          animation: lampBlink 1.2s infinite alternate ease-in-out;
        }
        .lamp-glow {
          color: #22c55e !important;
          filter: drop-shadow(0 0 20px #22c55e) drop-shadow(0 0 45px #22c55e);
        }
      `}</style>

      <div className="flex flex-col items-center gap-4">
        <svg
          className={`w-20 h-20 transition-all duration-500 ease-out ${
            isLoading ? "animate-lamp-blink scale-100" : "lamp-glow scale-110"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {/* Лучи свечения */}
          <path
            d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
            className={`transition-opacity duration-500 ${
              isLoading ? "opacity-30" : "opacity-100"
            }`}
          />
          {/* Корпус лампы */}
          <path d="M9 21h6m-4 0v-2m-2.83-3.17a6 6 0 1 1 9.66 0C13.88 16.88 13 18 13 19H11c0-1-.88-2.12-1.83-3.17z" />
        </svg>

        <p className="text-neutral-400 text-xs tracking-widest uppercase font-medium">
          {isLoading ? "Загрузка каталога..." : "Готово!"}
        </p>
      </div>
    </div>
  );
}
