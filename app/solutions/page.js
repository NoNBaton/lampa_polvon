"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Готовые варианты решений
const SOLUTIONS_DATA = [
  {
    id: "offices",
    category: "Офисы и Бизнес-центры",
    title: "Комфортная рабочая среда без зрительного утомления",
    description:
      "Линейные и трековые системы с коэффициентом пульсации менее 1% и высоким индексом цветопередачи. Создают равномерную освещенность рабочих зон.",
    image: "/lampa.png", // Замените на ваши фото интерьеров
    specs: [
      { label: "Уровень освещенности", value: "500 Lux" },
      { label: "Цветовая температура", value: "4000K (Нейтральный)" },
      { label: "Энергосбережение", value: "до 65%" },
    ],
    recommendedProducts: ["OFL LINE", "OFL DROP"],
  },
  {
    id: "retail",
    category: "Ритейл и Шоурумы",
    title: "Акцентная подсветка для привлечения внимания к товарам",
    description:
      "Управляемый направленный свет с узким углом рассеивания. Позволяет выгодно подчеркнуть текстуру, цвет и детали представленных товаров.",
    image: "/lampaVerh.png",
    specs: [
      { label: "Индекс цветопередачи", value: "CRI > 95" },
      { label: "Угол рассеивания", value: "15° - 45°" },
      { label: "Управление", value: "DALI / Bluetooth" },
    ],
    recommendedProducts: ["OFL SPOT", "OFL TRACK"],
  },
  {
    id: "residential",
    category: "Частные интерьеры",
    title: "Уютный и гибкий сценарий для современных квартир",
    description:
      "Скрытая профильная подсветка и дизайнерские подвесные светильники. Поддержка технологии Tunable White для смены атмосферы от теплого вечера к продуктивному дню.",
    image: "/lampa.png",
    specs: [
      { label: "Диапазон света", value: "2700K - 6500K" },
      { label: "Управление", value: "Умный дом / Алиса" },
      { label: "Класс защиты", value: "IP20 / IP44" },
    ],
    recommendedProducts: ["OFL DROP", "OFL STRIP"],
  },
  {
    id: "ho-re-ca",
    category: "Рестораны и Отели",
    title: "Атмосферное освещение с мягким затемнением",
    description:
      "Приглушенный, мягкий теплый свет для создания приватной и комфортной обстановки. Бесшовное интеграция в архитектурные элементы.",
    image: "/lampaVerh.png",
    specs: [
      { label: "Цветовая температура", value: "2400K - 3000K" },
      { label: "Диммирование", value: "TRIAC / 0-10V" },
      { label: "Срок службы", value: "50 000+ часов" },
    ],
    recommendedProducts: ["OFL AMBIENT", "OFL DROP"],
  },
];

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState(SOLUTIONS_DATA[0].id);

  const currentSolution = SOLUTIONS_DATA.find((item) => item.id === activeTab);

  return (
    <main className="w-full bg-white font-sans min-h-screen py-12 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок страницы */}
        <div className="mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#22c55e]">
            Готовые концепции
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 uppercase tracking-tight mt-2">
            Световые решения
          </h1>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mt-4">
            Профессиональные решения по освещению для задач любой сложности: от
            акцентной подсветки торговых площадей до комплексного оснащения
            офисов.
          </p>
        </div>

        {/* Табы переключения категорий */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-gray-100 scrollbar-none">
          {SOLUTIONS_DATA.map((item) => {
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#22c55e] text-white shadow-lg shadow-green-500/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {item.category}
              </button>
            );
          })}
        </div>

        {/* Контент выбранного решения */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSolution.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-neutral-50 rounded-2xl p-6 sm:p-10 border border-gray-100"
          >
            {/* Текстовая информация */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-semibold text-[#22c55e] uppercase tracking-wider">
                  {currentSolution.category}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 leading-tight">
                  {currentSolution.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mt-4">
                  {currentSolution.description}
                </p>
              </div>

              {/* Характеристики решения */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200/60">
                {currentSolution.specs.map((spec, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase">
                      {spec.label}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-800 mt-1">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Рекомендуемое оборудование & Кнопка */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
                <div>
                  <span className="text-xs text-gray-400 block mb-1">
                    Используемые светильники:
                  </span>
                  <div className="flex gap-2">
                    {currentSolution.recommendedProducts.map((prod, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold bg-white px-2.5 py-1 rounded border border-gray-200 text-gray-700"
                      >
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/katolog"
                  className="px-6 py-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-medium text-xs rounded-xl transition-colors shadow-md cursor-pointer"
                >
                  Подобрать оборудование
                </Link>
              </div>
            </div>

            {/* Фото рендер/интерьер */}
            <div className="lg:col-span-6 relative w-full h-72 sm:h-96 rounded-xl overflow-hidden bg-white shadow-inner flex items-center justify-center">
              <Image
                src={currentSolution.image}
                alt={currentSolution.title}
                fill
                className="object-contain p-6"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Блок «Заказать индивидуальный расчет» */}
        <div className="mt-16 bg-[#1c1c1c] rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold">
              Нужен расчет освещенности для вашего объекта?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              Наши инженеры подготовят светотехнический проект в Dialux с
              подбором оборудования под ваш бюджет.
            </p>
          </div>
          <Link
            href="/project-protection"
            className="px-8 py-3.5 bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition-all whitespace-nowrap cursor-pointer shadow-lg shadow-green-500/20"
          >
            Заказать расчет
          </Link>
        </div>
      </div>
    </main>
  );
}
