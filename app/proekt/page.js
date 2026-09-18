"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { id: "all", label: "Все (9)" },
  { id: "street", label: "Уличное (3)" },
  { id: "industrial", label: "Промышленное (3)" },
  { id: "interior", label: "Интерьерное (1)" },
  { id: "retail", label: "Ритейл (1)" },
  { id: "medical", label: "Медицинское (1)" },
];

const PROJECTS = [
  {
    id: 1,
    category: "Уличное",
    title: "Офис\nРочдельская ул.",
    description:
      "Полное описание проекта: Офис на Рочдельской улице. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
    image: "/coff.png",
    filter: "street",
  },
  {
    id: 2,
    category: "Медицинское",
    title:
      "ГБУЗ Городская поликлиника № 52,\nфилиал №1- г. Москва, ул. Ряжская д. 13",
    description:
      "Полное описание проекта: ГБУЗ Городская поликлиника № 52. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
    image: "/offis.png",
    filter: "medical",
  },
  {
    id: 3,
    category: "Медицинское",
    title:
      "«Детская городская поликлиника №122\nДепартамента здравоохранения Москвы»",
    description:
      "Полное описание проекта: Детская городская поликлиника №122. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
    image: "/chil.png",
    filter: "medical",
  },
  {
    id: 4,
    category: "Ритейл",
    title: "Лужники-Фудkort-\nМосмаркет",
    description:
      "Полное описание проекта: Лужники-Фудkort-Мосмаркет. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
    image: "/ts.png",
    filter: "retail",
  },
  {
    id: 5,
    category: "Интерьерное",
    title: "Офис компании\nVOGT MEDICAL",
    description:
      "Полное описание проекта: Офис компании VOGT MEDICAL. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
    image: "/gori.png",
    filter: "interior",
  },
  {
    id: 6,
    category: "Уличное",
    title: "Тюбинг парк\nГорького",
    description:
      "Полное описание проекта: Тюбинг парк Горького. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
    image: "/ulik.png",
    filter: "street",
  },
  {
    id: 7,
    category: "Промышленное",
    title: "X5 Retail Group, складской\nлогистический комплекс г. Кинель",
    description:
      "Полное описание проекта: X5 Retail Group. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
    image: "/off.png",
    filter: "industrial",
  },
  {
    id: 8,
    category: "Промышленное",
    title: "Региональный склад фармацевтической\nкомпании ПУЛЬС г. Краснодар",
    description:
      "Полное описание проекта: Склад фармацевтической компании ПУЛЬС. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
    image: "/coff.png",
    filter: "industrial",
  },
  {
    id: 9,
    category: "Промышленное",
    title: "Светодиодная подсветка\nв супермаркетах Перекресток",
    description:
      "Полное описание проекта: Светодиодная подсветка в супермаркетах Перекресток. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua.",
    image: "/offis.png",
    filter: "industrial",
  },
];

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.filter === activeFilter);

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-20 bg-white font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Заголовок */}
        <h2 className="text-3xl md:text-4xl font-light text-neutral-900 mb-8">
          Проекты
        </h2>

        {/* Фильтры в строку */}
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-none pb-4 mb-12 text-xs md:text-sm border-b border-neutral-100">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`whitespace-nowrap pb-2 transition-colors cursor-pointer ${
                activeFilter === cat.id
                  ? "text-[#22c55e] font-medium border-b-2 border-[#22c55e]"
                  : "text-neutral-400 hover:text-neutral-900"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Сетка проектов 3 в ряд */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedProject(project)}
              className="flex flex-col group cursor-pointer"
            >
              {/* Картинка карточки */}
              <div className="relative w-full h-[240px] md:h-[260px] rounded-lg overflow-hidden bg-neutral-100 mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Категория */}
              <span className="text-[11px] text-neutral-400 tracking-wide mb-1.5">
                {project.category}
              </span>

              {/* Название */}
              <h3 className="text-sm font-medium text-neutral-900 leading-snug whitespace-pre-line mb-3 min-h-[40px]">
                {project.title}
              </h3>

              {/* Описание */}
              <p className="text-xs text-neutral-500 leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Кнопка Читать */}
              <span className="inline-flex items-center gap-2 text-xs font-medium text-neutral-900 group-hover:text-[#22c55e] transition-colors group/link mt-auto w-fit">
                <span>Читать</span>
                <span className="w-5 h-5 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-[10px] font-bold group-hover/link:scale-105 transition-transform">
                  &#8250;
                </span>
              </span>
            </motion.div>
          ))}
        </div>

        {/* Модальное окно при нажатии на карточку */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl relative flex flex-col md:flex-row max-h-[90vh]"
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer"
                >
                  ✕
                </button>

                <div className="relative w-full md:w-1/2 h-64 md:h-auto min-h-[250px]">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-8 md:w-1/2 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-[#22c55e] font-medium tracking-wide block mb-2">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-xl font-medium text-neutral-900 leading-snug whitespace-pre-line mb-4">
                      {selectedProject.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
