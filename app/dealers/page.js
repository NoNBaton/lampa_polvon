"use client";

import React from "react";
import Link from "next/link";

export default function DealersPage() {
  const advantages = [
    {
      id: "01.",
      title: "Персональная скидка",
      desc: "Размер персональной скидки зависит от ежемесячного объема закупок",
    },
    {
      id: "02.",
      title: "Резерв продукции",
      desc: "Резерв запаса готовой продукции на складе определяется с учетом потребностей",
    },
    {
      id: "03.",
      title: "Право приоритета",
      desc: "Приоритетное право на получение новой или нестандартной продукции",
    },
    {
      id: "04.",
      title: "Поощрение активности",
      desc: "Заявки на получение товаров от конечных потребителей перенаправляем самым активным региональным дилерам при условии выполнения ежемесячных объемов закупок",
    },
    {
      id: "05.",
      title: "Информационная поддержка",
      desc: "Информационно-рекламную и маркетинговую поддержку",
    },
    {
      id: "06.",
      title: "Обеспечение продукцией",
      desc: "Обеспечение каталогами, буклетами и образцами продукции",
    },
    {
      id: "07.",
      title: "Корпоративное обучение",
      desc: "Обучение на курсах для менеджеров",
    },
    {
      id: "08.",
      title: "Поддержка в торгах",
      desc: "Поддержку при участии в торгах и тендерах",
    },
    {
      id: "09.",
      title: "Мотивация",
      desc: "Участие в стимулирующих мероприятиях для менеджеров",
    },
  ];

  const steps = [
    {
      number: "01",
      text: "Скачать анкету Дилера HTL и отправить ее на электронную почту:",
      email: "cooperation@h-t-l.ru",
    },
    {
      number: "02",
      text: "Приложить заявку на первую партию светильников с указанием реквизитов организации",
    },
    {
      number: "03",
      text: "После получения документов наши менеджеры свяжутся с Вами и обсудят условия сотрудничества",
    },
  ];

  return (
    <main className="min-h-screen bg-white font-sans text-[#1a1a1a] animate-fade-in">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-24">
        {/* Хлебные крошки */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            Главная
          </Link>
          <span>—</span>
          <span className="text-gray-900 font-medium">Дилерам</span>
        </nav>

        {/* Заголовок и подзаголовок */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Дилерам
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 max-w-xl leading-relaxed">
            Преимущества дилеров, которые занимаются поставками продукции
            торговой марки HTL в России и в странах таможенного союза
          </p>
        </div>

        {/* Сетка преимуществ (9 карточек) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {advantages.map((item, index) => (
            <div
              key={index}
              className="bg-[#f7f8f8] p-6 sm:p-8 rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div>
                <span className="text-xs font-semibold text-[#00a843] block mb-3">
                  {item.id}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Блок "Как стать официальным дилером?" */}
        <div className="bg-[#f7f8f8] rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Заголовок и кнопка слева */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight">
                Как стать <br />
                официальным <br />
                дилером?
              </h2>

              <div>
                <button
                  onClick={() => alert("Форма заказа звонка")}
                  className="bg-[#00a843] hover:bg-[#008f39] hover:scale-105 active:scale-95 text-white text-sm font-medium px-8 py-3.5 rounded-lg transition-all duration-200 shadow-sm"
                >
                  Заказать звонок
                </button>
              </div>
            </div>

            {/* Шаги справа */}
            <div className="lg:col-span-7 space-y-8">
              <p className="text-xs text-gray-400 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-200">
                {/* Шаг 1 */}
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-bold text-[#00a843]">
                      {steps[0].number}
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {steps[0].text}{" "}
                      <a
                        href={`mailto:${steps[0].email}`}
                        className="font-bold text-gray-900 hover:text-[#00a843] transition-colors"
                      >
                        {steps[0].email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Шаг 2 */}
                <div className="space-y-2">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-lg font-bold text-[#00a843]">
                      {steps[1].number}
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {steps[1].text}
                    </p>
                  </div>
                </div>
              </div>

              {/* Шаг 3 */}
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-baseline space-x-2 max-w-md">
                  <span className="text-lg font-bold text-[#00a843]">
                    {steps[2].number}
                  </span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {steps[2].text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
