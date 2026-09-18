"use client";

import React, { useEffect, useState } from "react";

export default function PreloaderWrapper() {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const handleComplete = () => {
      setTimeout(() => {
        setIsLoading(false); // Полный розжиг

        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => setShouldRender(false), 700);
        }, 800);
      }, 400);
    };

    if (document.readyState === "complete") {
      handleComplete();
    } else {
      window.addEventListener("load", handleComplete);
      return () => window.removeEventListener("load", handleComplete);
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#070808] flex items-center justify-center transition-all duration-700 ease-in-out select-none ${
        isFadingOut
          ? "opacity-0 scale-110 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
    >
      <style jsx global>{`
        /* Мягкий разогрев филаментных нитей */
        @keyframes filamentWarmup {
          0%,
          100% {
            opacity: 0.3;
            stroke: #15803d;
            filter: drop-shadow(0 0 2px rgba(34, 197, 94, 0.2));
          }
          50% {
            opacity: 0.95;
            stroke: #22c55e;
            filter: drop-shadow(0 0 18px rgba(34, 197, 94, 0.8))
              drop-shadow(0 0 35px rgba(34, 197, 94, 0.4));
          }
        }

        /* Волна свечения от цоколя к верху */
        @keyframes pulseGlow {
          0%,
          100% {
            transform: scale(0.85);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.25);
            opacity: 0.45;
          }
        }

        .animate-filament {
          animation: filamentWarmup 1.4s infinite ease-in-out;
        }

        .animate-pulse-glow {
          animation: pulseGlow 2.2s infinite ease-in-out;
        }

        /* Мощный розжиг при 100% загрузке */
        .edison-powered-on {
          color: #86efac !important;
          stroke: #4ade80 !important;
          filter: drop-shadow(0 0 20px #22c55e) drop-shadow(0 0 50px #22c55e)
            drop-shadow(0 0 90px #15803d);
          transform: scale(1.12);
        }
      `}</style>

      {/* Неоновая аура Эдисона */}
      <div className="absolute w-80 h-80 rounded-full bg-[#22c55e] blur-[130px] pointer-events-none transition-all duration-1000 animate-pulse-glow opacity-25" />

      <div className="relative flex flex-col items-center gap-7 z-10">
        <div className="relative flex items-center justify-center">
          {/* SVG Лампы Эдисона */}
          <svg
            className={`w-28 h-28 transition-all duration-700 ease-out ${
              isLoading ? "text-neutral-700" : "edison-powered-on"
            }`}
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Стеклянный купол (Колба Эдисона) */}
            <path
              d="M20 38C15 32 14 22 20 14C26 6 38 6 44 14C50 22 49 32 44 38C40 43 38 46 38 50H26C26 46 24 43 20 38Z"
              className={`transition-colors duration-500 ${
                isLoading ? "stroke-neutral-600" : "stroke-[#86efac]"
              }`}
            />

            {/* Внутренние филаментные спирали */}
            <path
              d="M28 48V30L32 20L36 30V48"
              className={`transition-all duration-300 ${
                isLoading ? "animate-filament" : "stroke-[#ffffff] stroke-[2.5]"
              }`}
            />
            <path
              d="M32 20L27 26M32 20L37 26"
              className={`transition-all duration-300 ${
                isLoading ? "animate-filament" : "stroke-[#ffffff] stroke-[2]"
              }`}
            />

            {/* Цоколь лампы */}
            <path d="M26 54H38" className="stroke-neutral-500" />
            <path d="M28 58H36" className="stroke-neutral-600" />
            <path d="M30 61H34" className="stroke-neutral-700" />

            {/* Вспышка лучей при включении */}
            {!isLoading && (
              <g className="stroke-[#86efac] stroke-[2] animate-pulse">
                <line x1="32" y1="2" x2="32" y2="6" />
                <line x1="10" y1="12" x2="13" y2="15" />
                <line x1="54" y1="12" x2="51" y2="15" />
                <line x1="4" y1="26" x2="8" y2="26" />
                <line x1="60" y1="26" x2="56" y2="26" />
              </g>
            )}
          </svg>

          {/* Летающие искорки при готовности */}
          {!isLoading && (
            <div className="absolute inset-0 pointer-events-none">
              <span className="absolute top-1 left-4 w-2 h-2 bg-green-300 rounded-full animate-ping" />
              <span className="absolute bottom-6 right-3 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="absolute top-8 right-2 w-2 h-2 bg-white rounded-full animate-ping" />
            </div>
          )}
        </div>

        {/* Текстовый блок и аккуратная полоса загрузки */}
        <div className="flex flex-col items-center gap-2.5">
          <p className="text-neutral-400 text-[11px] tracking-[0.3em] uppercase font-semibold">
            {isLoading ? (
              <span className="inline-flex items-center gap-1.5">
                Накаливание
                <span className="w-1 h-1 bg-[#22c55e] rounded-full animate-ping" />
              </span>
            ) : (
              <span className="text-[#22c55e] font-bold drop-shadow-[0_0_12px_rgba(34,197,94,0.9)]">
                Каталог Готов
              </span>
            )}
          </p>

          <div className="w-36 h-[2px] bg-neutral-800/80 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className={`h-full bg-[#22c55e] transition-all duration-700 ease-out rounded-full ${
                isLoading
                  ? "w-3/4 animate-pulse"
                  : "w-full shadow-[0_0_15px_#22c55e]"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
