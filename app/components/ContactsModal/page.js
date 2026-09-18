"use client";

import React, { useEffect, useState } from "react";

export default function ContactsModal({ isOpen, onClose }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Небольшая задержка для запуска плавного появления (fade-in)
      const timer = setTimeout(() => setAnimate(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
      // Задержка перед размонтированием, чтобы анимация успела проиграться назад (fade-out)
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Контент модального окна */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl p-8 max-w-md w-full relative shadow-2xl transform transition-all duration-300 ease-out ${
          animate
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* Кнопка закрытия (крестик) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          &#10005;
        </button>

        <h3 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">
          Контакты
        </h3>

        <div className="space-y-5">
          {/* Телефон */}
          <div className="border-b border-gray-100 pb-3">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Телефон
            </span>
            <a
              href="tel:+74951251007"
              className="text-lg font-bold text-gray-900 hover:text-[#22c55e] transition-colors"
            >
              +7 (495) 125-10-07
            </a>
          </div>

          {/* Почта */}
          <div className="border-b border-gray-100 pb-3">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Почта
            </span>
            <a
              href="mailto:INFO@H-T-L.RU"
              className="text-lg font-bold text-gray-900 hover:text-[#22c55e] transition-colors"
            >
              INFO@H-T-L.RU
            </a>
          </div>

          {/* Адрес */}
          <div className="border-b border-gray-100 pb-3">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Адрес
            </span>
            <p className="text-sm font-medium text-gray-700">
              г. Москва, ул. Примерная, д. 10, стр. 1
            </p>
          </div>

          {/* Instagram */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-3">
              Социальные сети
            </span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 px-5 py-3 rounded-2xl bg-gray-50 hover:bg-[#22c55e] hover:text-white transition-all duration-200 text-gray-900 font-medium group shadow-sm hover:shadow-md"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="group-hover:scale-110 transition-transform"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span className="text-sm">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
