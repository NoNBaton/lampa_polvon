"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ThemeInverter({ children }) {
  const containerRef = useRef(null);

  // Отслеживаем прогресс скролла внутри этой секции/обертки
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Плавный переход фона: от чисто белого (#ffffff) к черному (#0a0a0a)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#ffffff", "#121212", "#0a0a0a"],
  );

  // Плавный переход цвета текста: от темно-серого/черного (#171717) к белому (#ffffff)
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#171717", "#e5e5e5", "#ffffff"],
  );

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor, color: textColor }}
      className="relative transition-colors duration-100"
    >
      {children}
    </motion.div>
  );
}
