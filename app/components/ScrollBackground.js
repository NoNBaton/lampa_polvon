"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollBackground({ children }) {
  const containerRef = useRef(null);

  // Отслеживаем скролл внутри этого контейнера
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Плавное переключение цветов фона в зависимости от прогресса скролла (от 0 до 1)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["#ffffff", "#f8fafc", "#f1f5f9", "#0f172a"], // Можешь поменять цвета на свои
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor }}
      className="transition-colors duration-500"
    >
      {children}
    </motion.div>
  );
}
