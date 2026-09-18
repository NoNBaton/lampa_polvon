"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedNews, setSelectedNews] = useState(null);

  const categories = [
    { id: "all", label: "Все", count: 9 },
    { id: "street", label: "Уличное", count: 2 },
    { id: "industrial", label: "Промышленное", count: 2 },
    { id: "interior", label: "Интерьерное", count: 2 },
    { id: "retail", label: "Ритейл", count: 2 },
    { id: "medical", label: "Медицинское", count: 1 },
  ];

  const newsData = [
    {
      id: 1,
      category: "street",
      date: "17/10/22",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing (Уличное)",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
      fullText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/news-1.png",
    },
    {
      id: 2,
      category: "industrial",
      date: "17/10/22",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing (Промышленное)",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
      fullText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/news-2.png",
    },
    {
      id: 3,
      category: "interior",
      date: "17/10/22",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing (Интерьерное)",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
      fullText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/news-3.png",
    },
    {
      id: 4,
      category: "retail",
      date: "17/10/22",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing (Ритейл)",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
      fullText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/news-4.png",
    },
    {
      id: 5,
      category: "medical",
      date: "17/10/22",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing (Медицинское)",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
      fullText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/news-5.png",
    },
    {
      id: 6,
      category: "street",
      date: "17/10/22",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing (Уличное 2)",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
      fullText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/news-6.png",
    },
    {
      id: 7,
      category: "industrial",
      date: "17/10/22",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing (Промышленное 2)",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
      fullText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/news-7.png",
    },
    {
      id: 8,
      category: "interior",
      date: "17/10/22",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing (Интерьерное 2)",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
      fullText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/news-8.png",
    },
    {
      id: 9,
      category: "retail",
      date: "17/10/22",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing (Ритейл 2)",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
      fullText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      image: "/news-9.png",
    },
  ];

  // Фильтрация новостей
  const filteredNews =
    activeCategory === "all"
      ? newsData
      : newsData.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-white font-sans text-[#1a1a1a]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* Хлебные крошки */}
        <nav className="flex items-center space-x-2 text-[11px] text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            Главная
          </Link>
          <span>—</span>
          <span className="text-gray-900 font-medium">Новости</span>
        </nav>

        {/* Заголовок */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">
          Новости
        </h1>

        {/* Фильтры / Категории */}
        <div className="flex flex-wrap items-center gap-6 mb-10 text-[12px]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`relative transition-colors cursor-pointer flex items-center gap-1 pb-1 ${
                activeCategory === cat.id
                  ? "text-[#00a843] font-semibold"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px]">({cat.count})</span>

              {/* Анимированная полоса подчеркивания активного фильтра */}
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="activeFilterBorder"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00a843]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Сетка новостей с анимацией переключения */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10 min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredNews.map((item) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedNews(item)}
                className="flex flex-col group cursor-pointer"
              >
                {/* Картинка */}
                <div className="relative w-full h-[220px] rounded-lg overflow-hidden mb-4 bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Дата */}
                <span className="text-[11px] text-gray-300 mb-2 block">
                  {item.date}
                </span>

                {/* Заголовок новости */}
                <h3 className="text-sm font-bold text-gray-900 mb-3 leading-snug group-hover:text-[#00a843] transition-colors">
                  {item.title}
                </h3>

                {/* Описание */}
                <p className="text-[11px] text-gray-400 leading-relaxed mb-4 line-clamp-3">
                  {item.desc}
                </p>

                {/* Кнопка "Читать" */}
                <div className="mt-auto flex items-center gap-2 text-[11px] text-gray-900 font-medium">
                  <span>Читать</span>
                  <span className="w-5 h-5 rounded-full bg-[#00a843] flex items-center justify-center text-white text-[10px] leading-none group-hover:translate-x-1 transition-transform">
                    ›
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Анимированное модальное окно */}
      <AnimatePresence>
        {selectedNews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNews(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto cursor-default shadow-2xl"
            >
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
              <span className="text-[11px] text-gray-400 block mb-2">
                {selectedNews.date}
              </span>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {selectedNews.title}
              </h2>
              <div className="relative w-full h-[260px] rounded-lg overflow-hidden mb-6 bg-gray-100">
                <Image
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mb-6">
                {selectedNews.fullText}
              </p>
              <button
                onClick={() => setSelectedNews(null)}
                className="bg-[#00a843] text-white px-6 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#008f39] transition-colors cursor-pointer"
              >
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
