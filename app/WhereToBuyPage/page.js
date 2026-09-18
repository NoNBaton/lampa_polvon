import React from "react";
import Image from "next/image";

export default function WhereToBuyPage() {
  const partners = [
    { name: "Macquarie University", logo: "/mac.png" }, // Путь из папки public указывается сразу с слеша
    { name: "Glovo", logo: "/glo.png" }, // Замените на реальные пути к вашим картинкам
    { name: "Fernco", logo: "/fer.png" },
    { name: "Covic", logo: "/cov.png" },
    { name: "Edah", logo: "/eda.png" },
    { name: "TB Wood's", logo: "/tb.png" },
    { name: "DWR Media", logo: "/dwr.png" },
    { name: "The WorkSource", logo: "/the.png" },
    { name: "Noviant", logo: "/novi.png" },
    { name: "Exxon", logo: "/expn.png" },
    { name: "Techno Clean", logo: "/tech.png" },
    { name: "König", logo: "/kon.png" },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans px-6 md:px-16 lg:px-24 py-10">
      {/* Хлебные крошки */}
      <div className="text-xs text-neutral-400 mb-6 tracking-wide">
        Главная — <span className="text-neutral-700">Где купить?</span>
      </div>

      {/* Заголовок и описание */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-6">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900">
          Где купить?
        </h1>
        <p className="text-xs md:text-sm text-neutral-500 max-w-sm leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      {/* Сетка логотипов (4 колонки х 3 ряда) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="bg-[#f9f9f9] border border-neutral-100 rounded-sm h-36 flex items-center justify-center p-6 hover:shadow-sm transition-all duration-200 group relative overflow-hidden"
          >
            <img
              src={partner.logo} // Исправлено с partner.img на partner.logo
              alt={partner.name}
              className="max-h-12 max-w-[80%]  object-contain filter grayscale opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
