"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Импортируем фото для 2-го слайда
import LampaVerh from "../../../public/lampaVerh.png";

const SLIDES = [
  {
    id: "01",
    title: (
      <>
        Дизайнерские <br />
        светильники <br />
        <span className="text-[#22c55e]">OFL DROP</span>
      </>
    ),
    rawTitle: "OFL DROP",
    description:
      "Светильник OFL DROP имеет изящную каплевидную форму и также обладает рядом интересных технических особенностей, выгодно отличающих его от конкурентов.",
    fullDetails: {
      power: "15-24 Вт",
      voltage: "220-240 В",
      colorTemp: "3000K / 4000K",
      material: "Алюминиевый сплав, акрил",
      protection: "IP44",
      features: [
        "Анодированное покрытие корпуса",
        "Высокий индекс цветопередачи CRI > 90",
        "Плавное диммирование (TRIAC / DALI)",
        "Гарантия 5 лет",
      ],
    },
    image: "/lampa.png",
  },
  {
    id: "02",
    title: (
      <>
        Интерьерное <br />
        освещение <br />
        <span className="text-[#22c55e]">OFL LINE</span>
      </>
    ),
    rawTitle: "OFL LINE",
    description:
      "Минималистичные линейные светильники для создания мягкого и равномерного общего освещения в современных интерьерах.",
    fullDetails: {
      power: "30 Вт / м",
      voltage: "24 В / 220 В",
      colorTemp: "2700K - 5000K (Tunable White)",
      material: "Экструдированный алюминий",
      protection: "IP20 / IP54",
      features: [
        "Соединение в непрерывные линии без теневых зон",
        "Матовый рассеиватель из PMMA",
        "Встроенный источник питания",
        "Низкий коэффициент пульсации < 1%",
      ],
    },
    image: LampaVerh,
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: { duration: 0.3, ease: "easeIn" },
  }),
};

export default function Hero() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Состояния для всплывающего меню деталей
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const currentIndex = Math.abs(page % SLIDES.length);
  const currentSlide = SLIDES[currentIndex];

  const paginate = (newDirection) => {
    setImageLoaded(false);
    setImageError(false);
    setPage([page + newDirection, newDirection]);
  };

  return (
    <section
      ref={ref}
      className="relative w-full min-h-[500px] bg-white py-16 px-8 md:px-16 flex items-center justify-center font-sans overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative"
      >
        {/* Номер слайда */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="absolute -top-8 left-0 text-[#22c55e] text-xl font-medium tracking-tight"
          >
            /{currentSlide.id}
          </motion.div>
        </AnimatePresence>

        {/* --- КОНТЕЙНЕР С ФОТО СЛАЙДА --- */}
        <div className="relative w-full aspect-[4/3] md:aspect-square flex items-center justify-center overflow-hidden rounded-xl">
          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0 bg-gray-200 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 font-medium text-sm z-0">
              {imageError ? "Ошибка загрузки фото" : "Загрузка изображения..."}
            </div>
          )}

          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000 || offset.x < -100) {
                  paginate(1);
                } else if (swipe > 10000 || offset.x > 100) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
            >
              <Image
                src={currentSlide.image}
                alt="Светильник"
                fill
                priority
                className={`object-contain select-none transition-opacity duration-200 ${
                  imageLoaded && !imageError ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- ТЕКСТОВОЙ БЛОК --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-start space-y-6"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 uppercase leading-none">
              {currentSlide.title}
            </h1>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md font-normal">
              {currentSlide.description}
            </p>

            <button
              onClick={() => setIsDetailsOpen(true)}
              className="inline-flex items-center space-x-3 text-gray-800 font-medium text-sm hover:text-[#22c55e] transition-colors group cursor-pointer"
            >
              <span className="border-b border-transparent group-hover:border-[#22c55e]">
                Подробнее
              </span>
              <span className="w-7 h-7 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-lg font-bold group-hover:scale-110 transition-transform">
                &#8250;
              </span>
            </button>
          </motion.div>
        </AnimatePresence>

        {/* --- КНОПКИ --- */}
        <div className="absolute right-0 bottom-0 md:-bottom-8 flex space-x-3 p-4 md:p-0 z-20">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
            aria-label="Предыдущий слайд"
            className="w-9 h-9 rounded-full border border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-500 flex items-center justify-center text-xl transition-colors bg-white/80 backdrop-blur-sm cursor-pointer"
          >
            &#8249;
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
            aria-label="Следующий слайд"
            className="w-9 h-9 rounded-full border border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-500 flex items-center justify-center text-xl transition-colors bg-white/80 backdrop-blur-sm cursor-pointer"
          >
            &#8250;
          </motion.button>
        </div>
      </motion.div>

      {/* --- ВЫЕЗЖАЮЩЕЕ МЕНЮ ДЕТАЛЕЙ --- */}
      <AnimatePresence>
        {isDetailsOpen && (
          <>
            {/* Затемнение фона */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Боковая панель с деталями */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between"
            >
              <div>
                {/* Шапка модалки */}
                <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#22c55e]">
                    Детали модели /{currentSlide.id}
                  </span>
                  <button
                    onClick={() => setIsDetailsOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center text-sm font-bold transition-colors cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Название и фото */}
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-gray-900 uppercase">
                    {currentSlide.rawTitle}
                  </h3>
                  <div className="relative w-full h-48 my-4 bg-neutral-50 rounded-xl overflow-hidden flex items-center justify-center">
                    <Image
                      src={currentSlide.image}
                      alt={currentSlide.rawTitle}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {currentSlide.description}
                  </p>
                </div>

                {/* Таблица технических характеристик */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Характеристики
                  </h4>
                  <div className="space-y-2 text-xs text-gray-700">
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-gray-400">Мощность:</span>
                      <span className="font-semibold">
                        {currentSlide.fullDetails.power}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-gray-400">Напряжение:</span>
                      <span className="font-semibold">
                        {currentSlide.fullDetails.voltage}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-gray-400">
                        Цветовая температура:
                      </span>
                      <span className="font-semibold">
                        {currentSlide.fullDetails.colorTemp}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-gray-400">Материал:</span>
                      <span className="font-semibold">
                        {currentSlide.fullDetails.material}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-gray-100">
                      <span className="text-gray-400">Защита:</span>
                      <span className="font-semibold">
                        {currentSlide.fullDetails.protection}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Особенности */}
                <div className="mt-6 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Особенности
                  </h4>
                  <ul className="space-y-1.5">
                    {currentSlide.fullDetails.features.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs text-gray-600"
                      >
                        <span className="text-[#22c55e] font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Кнопка закрытия/заказа */}
              <div className="pt-6 mt-6 border-t border-gray-100">
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className="w-full py-3 bg-[#22c55e] hover:bg-[#16a34a] text-white font-medium text-sm rounded-xl transition-colors cursor-pointer shadow-lg shadow-green-500/20"
                >
                  Закрыть
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
