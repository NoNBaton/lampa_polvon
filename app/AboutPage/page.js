"use client";

import { h1 } from "framer-motion/client";
import React, { useState } from "react";

export default function AboutPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    phone: "",
    volume: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: false });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          region: formData.region,
          volume: formData.volume,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка отправки");
      }

      setStatus({ loading: false, error: "", success: true });
      setFormData({ name: "", region: "", phone: "", volume: "" });
    } catch (err) {
      setStatus({ loading: false, error: err.message, success: false });
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      {/* Верхняя часть / Хлебные крошки и заголовок */}
      <div className="px-6 md:px-16 lg:px-24 pt-12 pb-4">
        {/* Хлебные крошки */}
        <div className="text-xs text-neutral-400 mb-4 tracking-wide">
          Главная — <span className="text-neutral-700">О компании</span>
        </div>

        {/* Заголовок */}
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-neutral-900 mb-8">
          О компании
        </h1>
      </div>

      {/* Баннер-изображение / Видеоинтеграция */}
      <div className="relative w-full h-[350px] md:h-[480px] bg-neutral-900 overflow-hidden mb-20 flex items-center justify-center">
        {!isPlaying ? (
          <>
            <img
              src="/banner-light.png"
              alt="О компании HTL"
              className="w-full h-full object-cover opacity-90 absolute inset-0"
            />
            {/* Зеленая кнопка Play */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute z-10 w-16 h-16 bg-[#22c55e] rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform group cursor-pointer"
            >
              <svg
                className="w-6 h-6 text-white translate-x-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </>
        ) : (
          // <iframe
          //   className="w-full h-full absolute inset-0 z-20"
          //   src="https://www.youtube.com/embed/EcjImKIe5ak?si=UXLsALygBKbt6TK_&autoplay=1"
          //   title="YouTube video player"
          //   frameBorder="0"
          //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          //   referrerPolicy="strict-origin-when-cross-origin"
          //   allowFullScreen
          // ></iframe>
          <h1>2</h1>
        )}
      </div>

      {/* Секция «Что мы предлагаем?» */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Левый заголовок */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900 leading-snug">
              Что мы
              <br />
              предлагаем?
            </h2>
          </div>

          {/* Правый список преимуществ */}
          <div className="lg:col-span-8 divide-y divide-neutral-100">
            {/* Пункт 1 */}
            <div className="py-6 flex items-start gap-6">
              <div className="w-12 h-12 shrink-0 flex items-center justify-center text-[#22c55e]">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-medium text-neutral-900 mb-1">
                  Разработка оборудования
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Выяснение конечных потребностей потребителей и разработка
                  нового осветительного оборудования.
                </p>
              </div>
            </div>

            {/* Пункт 2 */}
            <div className="py-6 flex items-start gap-6">
              <div className="w-12 h-12 shrink-0 flex items-center justify-center text-[#22c55e]">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-medium text-neutral-900 mb-1">
                  Контроль производства
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Тщательный контроль каждого этапа в процессе производства.
                </p>
              </div>
            </div>

            {/* Пункт 3 */}
            <div className="py-6 flex items-start gap-6">
              <div className="w-12 h-12 shrink-0 flex items-center justify-center text-[#22c55e]">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2l10 10-10 10L2 12L12 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-medium text-neutral-900 mb-1">
                  Надежность комплектующих
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Использование комплектующих известных вендоров,
                  энергоэффективность и надежность которых проверена временем.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
