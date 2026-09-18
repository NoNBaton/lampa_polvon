"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("design");

  const servicesData = {
    design: [
      {
        id: "01.",
        title: "Аудит",
        desc: "Исследуем объекты на любой стадии, проводим электротехнические и светотехнические измерения, предпроектные изыскания и формулируем задачи для проектирования.",
      },
      {
        id: "02.",
        title: "Концепция освещения",
        desc: "Разрабатываем научно обоснованную концепцию энергоэффективного и эргономичного освещения в зависимости от назначения пространства, создаем эстетически привлекательный светодизайн и комфортные условия для работы и отдыха.",
      },
      {
        id: "03.",
        title: "3D-визуализация",
        desc: "Предоставляем варианты полноценной 3D-визуализации проекта для детального согласования всех нюансов и утверждения выбранного электрооборудования и светового сценария.",
      },
      {
        id: "04.",
        title: "Светотехнический проект с подбором оборудования",
        desc: "Подбираем светотехническое оборудование с учетом особенностей объекта, поставленных задач и бюджета. Рассчитываем уровень освещенности с учетом ГОСТов и СанПиН в программе DIALux.",
      },
      {
        id: "05.",
        title: "Проект системы управления освещением и подбор оборудования",
        desc: "Предлагаем варианты по управлению освещением, подбираем оптимальное оборудование DALI, системы ручного и автоматического управления светом, размещаем датчики движения и освещенности.",
      },
      {
        id: "06.",
        title: "Электротехнический проект",
        desc: "Составляем проектную документацию, необходимую для подведения питания на объект и подключения систем управления светом в соответствии с нормами безопасности. Определяем комплектацию щитов управления.",
      },
    ],
    selection: [
      {
        id: "01.",
        title: "Анализ спецификации",
        desc: "Изучаем имеющийся проект и подбираем аналоговое или оригинальное оборудование по оптимальным ценам.",
      },
      {
        id: "02.",
        title: "Поставка образцов",
        desc: "Предоставляем тестовые образцы светильников для примерки на объекте и проверки световых характеристик.",
      },
      {
        id: "03.",
        title: "Спецзаказ оборудования",
        desc: "Производство и подбор оборудования нестандартных габаритов, цветов и конфигураций под задачи заказчика.",
      },
    ],
    mounting: [
      {
        id: "01.",
        title: "Шеф-монтаж",
        desc: "Контроль выполнения монтажных работ сторонними специалистами в строгом соответствии с проектом.",
      },
      {
        id: "02.",
        title: "Монтажные и пусконаладочные работы",
        desc: "Профессиональный монтаж светильников, прокладка кабелей, сборка щитов и настройка систем управления.",
      },
      {
        id: "03.",
        title: "Гарантийное обслуживание",
        desc: "Сервисное и гарантийное сопровождение установленного оборудования на протяжении всего срока эксплуатации.",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white font-sans text-[#1a1a1a]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20">
        {/* Хлебные крошки */}
        <nav className="flex items-center space-x-2 text-[11px] text-gray-400 mb-4">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            Главная
          </Link>
          <span>—</span>
          <span className="text-gray-900 font-medium">Услуги</span>
        </nav>

        {/* Заголовок страницы */}
        <h1 className="text-3xl sm:text-[32px] font-bold tracking-tight mb-6 leading-none">
          Услуги
        </h1>

        {/* Баннер с точно выверенными пропорциями */}
        <div className="relative w-full h-[260px] sm:h-[320px] rounded-[10px] overflow-hidden mb-10 bg-black">
          <Image
            src="/public/lest.jpg" // Прямой путь к файлу из папки public
            alt="Услуги HTL"
            fill
            className="object-cover opacity-90"
            priority
          />
          {/* Плашка точно с размером Group 659 (693x259px на десктопе) */}
          <div className="absolute bottom-0 right-0 w-full sm:w-[693px] h-full sm:h-[259px] bg-white/95 backdrop-blur-sm p-6 sm:p-8 flex flex-col justify-between rounded-tl-[8px]">
            <p className="text-xs sm:text-[13px] leading-relaxed text-gray-700">
              Независимо от сложности проекта мы подбираем новейшее
              светотехническое оборудование высокого качества, рассчитанное на{" "}
              <strong className="font-bold text-gray-900">долгосрочную</strong>{" "}
              эксплуатацию.
            </p>
            <p className="text-xs sm:text-[13px] text-gray-600">
              Узнайте больше по телефону:{" "}
              <a
                href="tel:+74951251007"
                className="font-bold text-gray-900 hover:text-[#00a843] transition-colors"
              >
                +7 (495) 125-10-07
              </a>
            </p>
          </div>
        </div>

        {/* Переключатель вкладок */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 border-b border-gray-100 pb-3 mb-8 text-xl sm:text-[22px] font-bold">
          <button
            onClick={() => setActiveTab("design")}
            className={`transition-colors cursor-pointer ${
              activeTab === "design"
                ? "text-gray-900 underline decoration-[#00a843] decoration-2 underline-offset-8"
                : "text-gray-300 hover:text-gray-500"
            }`}
          >
            Проектирование
          </button>
          <button
            onClick={() => setActiveTab("selection")}
            className={`transition-colors cursor-pointer ${
              activeTab === "selection"
                ? "text-gray-900 underline decoration-[#00a843] decoration-2 underline-offset-8"
                : "text-gray-300 hover:text-gray-500"
            }`}
          >
            Подбор оборудования
          </button>
          <button
            onClick={() => setActiveTab("mounting")}
            className={`transition-colors cursor-pointer ${
              activeTab === "mounting"
                ? "text-gray-900 underline decoration-[#00a843] decoration-2 underline-offset-8"
                : "text-gray-300 hover:text-gray-500"
            }`}
          >
            Монтажные работы
          </button>
        </div>

        {/* Сетка карточек */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {servicesData[activeTab].map((item, index) => (
            <div
              key={index}
              className="bg-[#f7f8f8] p-6 rounded-xl flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <span className="text-[11px] font-semibold text-[#00a843] block mb-2">
                  {item.id}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
