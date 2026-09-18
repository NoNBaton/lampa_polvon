"use client";

import React, { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  {
    id: 1,
    title: "HTL BUSINESS",
    href: "/catalog/business",
    description: "Профессиональное освещение для офисов и бизнес-центров.",
  },
  {
    id: 2,
    title: "HTL ARCHITECTURAL",
    href: "/catalog/architectural",
    description: "Архитектурная подсветка фасадов и мостов.",
  },
  {
    id: 3,
    title: "HTL OUTDOOR",
    href: "/catalog/outdoor",
    description: "Уличное и парковое светодиодное освещение.",
  },
  {
    id: 4,
    title: "HTL RETAIL",
    href: "/catalog/retail",
    description: "Свет для торговых сетей и магазинов.",
  },
  {
    id: 5,
    title: "HTL HOME (DIY)",
    href: "/catalog/home",
    description: "Бытовые светильники для дома.",
  },
  {
    id: 6,
    title: "HTL EMERGENCY",
    href: "/catalog/emergency",
    description: "Аварийное и эвакуационное освещение.",
  },
  {
    id: 7,
    title: "HTL PRODUCTION",
    href: "/catalog/production",
    description: "Промышленные светильники для цехов и складов.",
  },
  {
    id: 8,
    title: "HTL INTERIOR",
    href: "/catalog/interior",
    description: "Дизайнерские решения для интерьера.",
  },
];

export default function Categories() {
  const [activeId, setActiveId] = useState(null);

  const toggleCategory = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 flex flex-col items-center justify-center font-sans">
      <div className="max-w-6xl w-full">
        {/* Заголовок и ссылка в каталог */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Категории продукции
          </h2>

          <Link
            href="/katolog"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-[#22c55e] text-xs sm:text-sm font-medium transition-colors group"
          >
            <span>Перейти в каталог</span>
            <span className="w-6 h-6 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
              &#8250;
            </span>
          </Link>
        </div>

        {/* Сетка карточек с фиксированной высотой h-[380px] sm:h-[420px] */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((item) => {
            const isOpen = activeId === item.id;

            return (
              <div
                key={item.id}
                onClick={() => toggleCategory(item.id)}
                className={`bg-[#f5f5f5] hover:bg-[#ebebeb] rounded-xl p-5 h-[380px] sm:h-[420px] cursor-pointer flex flex-col justify-between items-center transition-all duration-300 group relative overflow-hidden ${
                  isOpen ? "ring-2 ring-[#22c55e] bg-[#f0fdf4]" : ""
                }`}
              >
                {/* Контейнер заголовка и информации */}
                <div className="flex-1 w-full flex flex-col items-start justify-start pt-2 overflow-hidden">
                  {/* Заголовок */}
                  <span
                    className={`text-xs sm:text-sm font-semibold tracking-wider text-gray-800 uppercase select-none transition-all duration-300 ${
                      isOpen
                        ? "rotate-0 [writing-mode:horizontal-tb] text-left w-full mb-3 text-[#22c55e]"
                        : "[writing-mode:vertical-rl] rotate-180 self-center"
                    }`}
                  >
                    {item.title}
                  </span>

                  {/* Описание без кнопки "Подробнее" */}
                  <div
                    className={`w-full text-left transition-all duration-300 ${
                      isOpen
                        ? "opacity-100 max-h-60"
                        : "opacity-0 max-h-0 pointer-events-none"
                    }`}
                  >
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Зеленая кнопка со стрелкой */}
                <div
                  className={`w-6 h-6 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-xs font-bold transition-transform duration-300 ${
                    isOpen ? "rotate-90 scale-110" : "group-hover:scale-110"
                  }`}
                >
                  &#8250;
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
