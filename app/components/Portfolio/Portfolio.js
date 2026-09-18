"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { id: "all", label: "Все (45)" },
  { id: "street", label: "Уличное (6)" },
  { id: "industrial", label: "Промышленное (20)" },
  { id: "interior", label: "Интерьерное (1)" },
  { id: "retail", label: "Ритейл (15)" },
  { id: "medical", label: "Медицинское (3)" },
];

const PROJECTS = [
  {
    id: 1,
    category: "Уличное",
    title: "Lorem ipsum dolor\nsit amet consectetur",
    description:
      "Полное описание проекта: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/coff.png",
    filter: "street",
  },
  {
    id: 2,
    category: "Промышленное",
    title: "Consec tetur\nadipiscing elit",
    description:
      "Полное описание проекта: Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/offis.png",
    filter: "industrial",
  },
  {
    id: 3,
    category: "Интерьерное",
    title: "Sed do eiusmod\ntempor incididunt",
    description:
      "Полное описание проекта: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/chil.png",
    filter: "interior",
  },
  {
    id: 4,
    category: "Ритейл",
    title: "Labore et dolore\nmagna aliqua",
    description: "Полное описание проекта: Labore et dolore magna aliqua.",
    image: "/ts.png",
    filter: "retail",
  },
  {
    id: 5,
    category: "Медицинское",
    title: "Ut enim ad minim\nveniam quis",
    description:
      "Полное описание проекта: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/gori.png",
    filter: "medical",
  },
  {
    id: 6,
    category: "Уличное",
    title: "Duis aute irure\ndolor in reprehenderit",
    description:
      "Полное описание проекта: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    image: "/news-4.png",
    filter: "street",
  },
  {
    id: 7,
    category: "Промышленное",
    title: "Excepteur sint\noccaecat cupidatat",
    description:
      "Полное описание проекта: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "/news-5.png",
    filter: "industrial",
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollContainerRef = useRef(null);

  const scrollBy = (offset) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.filter === activeFilter);

  return (
    <section className="w-full py-16 px-6 md:px-16 lg:px-24 bg-white font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Шапка секции */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
            Портфолио
          </h2>
          <Link
            href="/proekt"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-900 hover:text-[#22c55e] transition-colors group w-fit relative z-20 cursor-pointer"
          >
            <span>Все проекты</span>
            <span className="w-6 h-6 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-xs font-bold group-hover:scale-105 transition-transform">
              &#8250;
            </span>
          </Link>
        </div>

        {/* Фильтры и стрелки скролла */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 border-b border-neutral-100 pb-4">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none pb-2 lg:pb-0 text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`whitespace-nowrap pb-1 transition-colors cursor-pointer ${
                  activeFilter === cat.id
                    ? "text-[#22c55e] font-medium border-b-2 border-[#22c55e]"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => scrollBy(-500)}
              aria-label="Назад"
              className="w-9 h-9 rounded-full border border-neutral-200 text-neutral-400 hover:text-neutral-900 hover:border-neutral-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              &#8249;
            </button>
            <button
              onClick={() => scrollBy(500)}
              aria-label="Вперед"
              className="w-9 h-9 rounded-full border border-neutral-200 text-neutral-400 hover:text-neutral-900 hover:border-neutral-400 flex items-center justify-center transition-colors cursor-pointer"
            >
              &#8250;
            </button>
          </div>
        </div>

        {/* Контейнер с горизонтальным скроллом */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="relative shrink-0 w-[350px] md:w-[480px] h-[380px] md:h-[440px] rounded-xl overflow-hidden snap-start bg-neutral-100 flex items-end p-6 md:p-8 group cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  alt={project.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  fill
                  src={project.image}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="relative z-10 bg-white rounded-lg p-6 md:p-8 w-[85%] shadow-xl flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] text-neutral-400 tracking-wide block mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-sm md:text-base font-medium text-neutral-900 leading-snug whitespace-pre-line mb-6">
                    {project.title}
                  </h3>
                </div>

                <span className="inline-flex items-center gap-3 text-xs font-medium text-neutral-900 group-hover:text-[#22c55e] transition-colors w-fit">
                  <span className="border-b border-transparent group-hover:border-[#22c55e]">
                    Подробнее
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-xs font-bold group-hover:scale-105 transition-transform">
                    &#8250;
                  </span>
                </span>
              </motion.div>
            </div>
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
