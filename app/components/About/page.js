import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <section
      id="about"
      className="w-full bg-white py-20 px-6 md:px-12 flex flex-col items-center justify-center font-sans scroll-mt-10"
    >
      <div className="max-w-5xl w-full flex flex-col items-center text-center">
        {/* Верхняя ссылка на папку /AboutPage */}
        <Link
          href="/AboutPage"
          className="text-gray-400 text-xs sm:text-sm font-medium tracking-wide uppercase mb-6 inline-block hover:text-gray-900 transition-colors"
        >
          О компании
        </Link>

        {/* Главный заголовок */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-gray-900 leading-tight uppercase max-w-4xl tracking-tight">
          <span className="text-[#22c55e]">HTL</span> — российская компания по
          производству светодиодного освещения, эксперт в области интерьерного и
          уличного освещения
        </h2>

        {/* Описание */}
        <p className="text-gray-500 text-xs sm:text-sm max-w-2xl mt-6 leading-relaxed font-normal">
          Создаём современное высококачественное светотехническое оборудование и
          отдельные комплектующие для освещения интерьеров жилых и коммерческих
          помещений.
        </p>

        {/* Нижняя ссылка-кнопка (тоже ведет на /AboutPage) */}
        <Link
          href="/AboutPage"
          className="inline-flex items-center space-x-2 text-gray-800 text-xs sm:text-sm font-medium mt-6 hover:text-[#22c55e] transition-colors group"
        >
          <span>О компании</span>
          <span className="w-6 h-6 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
            &#8250;
          </span>
        </Link>

        {/* --- КАРТОЧКИ С ЦИФРАМИ --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16">
          <div className="bg-[#f5f5f5] rounded-xl p-8 flex flex-col justify-between items-start text-left min-h-[180px]">
            <span className="text-5xl sm:text-6xl font-light text-gray-900 leading-none">
              8
            </span>
            <span className="text-gray-500 text-xs font-normal mt-8">
              На рынке более 8 лет
            </span>
          </div>

          <div className="bg-[#f5f5f5] rounded-xl p-8 flex flex-col justify-between items-start text-left min-h-[180px]">
            <span className="text-5xl sm:text-6xl font-light text-gray-900 leading-none">
              5
            </span>
            <span className="text-gray-500 text-xs font-normal mt-8">
              Гарантия на продукцию
            </span>
          </div>

          <div className="bg-[#f5f5f5] rounded-xl p-8 flex flex-col justify-between items-start text-left min-h-[180px]">
            <span className="text-5xl sm:text-6xl font-light text-gray-900 leading-none">
              1
            </span>
            <span className="text-gray-500 text-xs font-normal mt-8">
              Доставка от 1 дня
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
