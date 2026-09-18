"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function NightScrollEffect({ children }) {
  const containerRef = useRef(null);

  // Отслеживаем скролл внутри этого контейнера
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Плавное изменение фона от белого (#ffffff) к глубокому черному (#0b0f19)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    ["#ffffff", "#f1f5f9", "#1e293b", "#0b0f19"],
  );

  // Плавное появление и движение луны при скролле
  const moonY = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -50]);
  const moonOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0, 1, 1]);
  const moonScale = useTransform(scrollYProgress, [0, 0.5], [0.5, 1]);

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative min-h-screen transition-colors duration-200 overflow-hidden"
    >
      {/* Элемент Луны / Ночного неба */}
      <motion.div
        style={{
          y: moonY,
          opacity: moonOpacity,
          scale: moonScale,
        }}
        className="fixed top-12 right-12 md:right-24 w-24 h-24 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-neutral-200 to-white shadow-[0_0_50px_rgba(255,255,255,0.4)] pointer-events-none z-0 flex items-center justify-center overflow-hidden"
      >
        {/* Текстура кратеров луны (необязательно) */}
        <div className="absolute w-6 h-6 bg-neutral-300/40 rounded-full top-6 left-8 blur-[1px]" />
        <div className="absolute w-4 h-4 bg-neutral-300/30 rounded-full bottom-8 right-10 blur-[1px]" />
      </motion.div>

      {/* Весь остальной контент страницы поверх анимации */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
