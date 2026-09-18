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
        desc: "Разрабатываем научно обоснованную концепцию энергоэффективного и эргономичного освещения в зависимости от назначения пространства, создаем эстетически привлекательный светодизайн и комфортные условия для работы и отдыха с учетом характера окружающей среды, а также влияния на эмоции и настроение людей.",
      },
      {
        id: "03.",
        title: "3D-визуализация",
        desc: "Предоставляем варианты полноценной 3D-визуализации проекта для детального согласования всех нюансов и утверждения выбранного электрооборудования и светового сценария.",
      },
      {
        id: "04.",
        title: "Светотехнический проект с подбором оборудования",
        desc: "Подбираем светотехническое оборудование с учетом особенностей объекта, поставленных задач и бюджета, составляем рекомендации по выбору оптимального типа освещения, предлагаем возможные конструктивные решения и способы реализации проекта.\n\nРассчитываем уровень освещенности с учетом ГОСТов и СанПиН в программе DIALux evo от Dial GmbH, подсчитываем необходимое количество элементов освещения и предоставляем детально оформленный проект с диаграммами освещенности.",
      },
      {
        id: "05.",
        title: "Проект системы управления освещением и подбор оборудования",
        desc: "Предлагаем варианты по управлению освещением, подбираем оптимальное оборудование DALI, системы ручного и автоматического управления светом, размещаем расстановку датчиков движения и освещенности, а за счет использов",
      },
      {
        id: "06.",
        title: "Электротехнический проект",
        desc: "Составляем проектную документацию, необходимую для подведения питания на объект и подключения систем управления светом в соответствии с нормами безопасности, рассчитываем нагрузку на сети, подбираем марку, тип и сечение кабеля.\n\nОпределяем комплектацию щитов управления и электропитания, составляем схемы подключения, согласуем спецификацию на электротехнические изделия и выбранные материалы.",
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
        <nav className="flex items-center space-x-2 text-[11px] text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            Главная
          </Link>
          <span>—</span>
          <span className="text-gray-900 font-medium">Услуги</span>
        </nav>

        {/* Заголовок страницы */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">
          Услуги
        </h1>

        {/* Баннер с плашкой Group 659 (693x259px) */}
        <div className="relative w-full h-[320px] sm:h-[400px] rounded-xl overflow-hidden mb-12 bg-gray-900">
          <Image
            src="/lest.jpg"
            alt="Услуги HTL"
            fill
            className="object-cover opacity-85"
            priority
          />

          {/* Плашка справа */}
          <div className="absolute bottom-0 right-0 w-full sm:w-[520px] h-auto sm:h-[180px] bg-white/95 backdrop-blur-sm p-4 sm:p-6 flex flex-col justify-between rounded-tl-[8px]">
            <p className="text-[11px] sm:text-[12px] leading-relaxed text-gray-700">
              Независимо от сложности проекта мы подбираем новейшее
              светотехническое оборудование высокого качества, рассчитанное на{" "}
              <strong className="font-bold text-gray-900">долгосрочную</strong>{" "}
              эксплуатацию.
            </p>
            <p className="text-[11px] sm:text-[12px] text-gray-600 mt-2">
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
        <div className="flex flex-wrap items-center gap-8 border-b border-gray-100 pb-4 mb-8 text-xl sm:text-2xl font-extrabold">
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

        {/* Сетка карточек с точно сохраненными пропорциями из Figma */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {servicesData[activeTab].map((item, index) => (
            <div
              key={index}
              className="bg-[#f7f8f8] p-8 rounded-lg flex flex-col justify-between min-h-[380px]"
            >
              {/* Верхняя часть карточки */}
              <div>
                <span className="text-[12px] font-medium text-[#00a843] block mb-3">
                  {item.id}
                </span>
                <div className="w-full h-[1px] bg-gray-200/60 mb-5" />
                <h3 className="text-base font-bold text-gray-900 leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Нижняя часть карточки с описанием */}
              <p className="text-[11px] text-gray-500 leading-relaxed whitespace-pre-line mt-8">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
