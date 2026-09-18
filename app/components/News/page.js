"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Newss from "../../../public/News.png";

const FEATURED_NEWS = {
  id: 1,
  date: "17/10/22",
  title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
  description:
    "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  fullText:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  image: Newss,
};

const SIDE_NEWS = [
  {
    id: 2,
    date: "17/10/22",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    description:
      "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    fullText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 3,
    date: "17/10/22",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    description:
      "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    fullText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 4,
    date: "17/10/22",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing",
    description:
      "“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    fullText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

export default function New() {
  const [selectedNews, setSelectedNews] = useState(null);

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12 flex flex-col items-center justify-center font-sans">
      <div className="max-w-6xl w-full">
        {/* Заголовок и ссылка "Все новости" */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Новости и события
          </h2>

          <Link
            href="/new"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-[#00a843] text-xs sm:text-sm font-medium transition-colors group"
          >
            <span>Все новости</span>
            <span className="w-6 h-6 rounded-full bg-[#00a843] text-white flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
              &#8250;
            </span>
          </Link>
        </div>

        {/* Сетка новостей */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Главная новость (слева) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedNews(FEATURED_NEWS)}
            className="lg:col-span-7 flex flex-col cursor-pointer group"
          >
            <div className="relative w-full h-[280px] sm:h-[360px] rounded-2xl overflow-hidden mb-6 bg-gray-100">
              <Image
                src={FEATURED_NEWS.image}
                alt={FEATURED_NEWS.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <span className="text-gray-400 text-xs font-medium mb-2">
              {FEATURED_NEWS.date}
            </span>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-4 group-hover:text-[#00a843] transition-colors">
              {FEATURED_NEWS.title}
            </h3>

            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
              {FEATURED_NEWS.description}
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNews(FEATURED_NEWS);
              }}
              className="inline-flex items-center space-x-2 text-gray-700 hover:text-[#00a843] text-xs font-medium transition-colors group self-start cursor-pointer"
            >
              <span>Читать</span>
              <span className="w-5 h-5 rounded-full bg-[#00a843] text-white flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform">
                &#8250;
              </span>
            </button>
          </motion.div>

          {/* Список правых новостей */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-gray-100">
            {SIDE_NEWS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelectedNews(item)}
                className={`flex flex-col cursor-pointer group ${
                  index === 0 ? "pb-8" : "py-8"
                }`}
              >
                <span className="text-gray-400 text-xs font-medium mb-2">
                  {item.date}
                </span>

                <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-[#00a843] transition-colors">
                  {item.title}
                </h4>

                <p className="text-gray-500 text-xs leading-relaxed mb-4 font-normal">
                  {item.description}
                </p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNews(item);
                  }}
                  className="inline-flex items-center space-x-2 text-gray-700 hover:text-[#00a843] text-xs font-medium transition-colors group self-start cursor-pointer"
                >
                  <span>Читать</span>
                  <span className="w-5 h-5 rounded-full bg-[#00a843] text-white flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform">
                    &#8250;
                  </span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
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
              className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto cursor-default shadow-2xl"
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
              {selectedNews.image && (
                <div className="relative w-full h-[260px] rounded-xl overflow-hidden mb-6 bg-gray-100">
                  <Image
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
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
    </section>
  );
}
