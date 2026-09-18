"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ProjectProtectionPage() {
  const [openAccordion, setOpenAccordion] = useState(0);

  const accordionItems = [
    {
      title: "Сотрудничество по зарегистрированному проекту",
      content: [
        "приоритетные сроки поставки продукции;",
        "возможность предоставления специальных условий в рамках проекта;",
        "оказание технической и информационной поддержки",
      ],
    },
    {
      title: "Для защиты проекта",
      content: [
        "предоставить информацию о клиенте и объекте;",
        "согласовать технические характеристики оборудования;",
        "заполнить и отправить формализованную заявку.",
      ],
    },
    {
      title: "Комплекс работ для защиты проекта",
      content: [
        "аудит и подбор оборудования под задачи заказчика;",
        "расчет бюджета и резервирование позиций на складе;",
        "сопровождение на всех этапах сделки.",
      ],
    },
  ];

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-white font-sans text-[#1a1a1a] animate-fade-in">
      {/* Контентная часть */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-24">
        {/* Хлебные крошки */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-8 transition-opacity duration-500">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            Главная
          </Link>
          <span>—</span>
          <span className="text-gray-900 font-medium">Защита проекта</span>
        </nav>

        {/* Заголовок и описание */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          <h1 className="lg:col-span-6 text-4xl sm:text-5xl font-extrabold tracking-tight transition-transform duration-500">
            Защита проекта
          </h1>
          <p className="lg:col-span-6 text-xs sm:text-sm text-gray-600 leading-relaxed pt-2">
            HTL заинтересована в установлении долгосрочных взаимовыгодных
            отношений со своими контрагентами и предлагает своим дилерам услугу
            по защите проектов, которая закрепляет специальные условия по
            проекту за участвующим в нем контрагентом-поставщиком оборудования
            HTL.
          </p>
        </div>

        {/* Сетка: левая и правая части */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Левая колонка */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              <span className="text-[#00a843]">6 месяцев</span> - базовый срок{" "}
              <br className="hidden sm:inline" />
              защиты проекта
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              В зависимости от статуса работ по проекту и проведенной
              контрагентом работы по продвижению продукции «HTL» возможно
              продление сроков защиты, а также представление дополнительных
              проектных скидок
            </p>

            <div className="pt-6">
              <button
                onClick={() => alert("Форма заказа звонка")}
                className="bg-[#00a843] hover:bg-[#008f39] hover:scale-105 active:scale-95 text-white text-sm font-medium px-8 py-3.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Заказать звонок
              </button>
            </div>
          </div>

          {/* Правая колонка — Аккордеон с плавной анимацией высоты */}
          <div className="lg:col-span-7 bg-[#f5f5f5] rounded-2xl p-6 sm:p-10 space-y-2">
            {accordionItems.map((item, index) => {
              const isOpen = openAccordion === index;
              return (
                <div
                  key={index}
                  className="border-b border-gray-300 last:border-b-0 py-4"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between text-left group transition-colors"
                  >
                    <span
                      className={`text-sm sm:text-base font-bold transition-colors duration-200 ${
                        isOpen
                          ? "text-[#00a843]"
                          : "text-gray-900 group-hover:text-[#00a843]"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="ml-4 flex-shrink-0 text-[#00a843]">
                      <svg
                        className={`w-4 h-4 transform transition-transform duration-300 ease-in-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* Контейнер с плавной развёрткой по высоте */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-4"
                        : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <ul className="space-y-2 text-xs sm:text-sm text-gray-600 pl-4 list-disc marker:text-[#00a843]">
                        {item.content.map((point, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
