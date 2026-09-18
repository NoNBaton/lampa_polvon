"use client";

import React, { useEffect, useState } from "react";

export default function PrivacyModal({ isOpen, onClose }) {
  const [shouldRender, setShouldRender] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Обработка анимации и закрытия по нажатию клавиши ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      setShouldRender(true);
      // Блокируем прокрутку основного сайта
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      const timer = setTimeout(() => setAnimate(true), 10);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      setAnimate(false);
      // Возвращаем прокрутку страницы обратно
      document.body.style.overflow = "unset";

      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[80vh] flex flex-col relative shadow-2xl transform transition-all duration-300 ease-out ${
          animate
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          aria-label="Закрыть окно"
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          &#10005;
        </button>

        <h3
          id="privacy-modal-title"
          className="text-2xl font-bold text-gray-900 mb-4 tracking-tight pr-8"
        >
          Политика конфиденциальности
        </h3>

        <div className="overflow-y-auto pr-2 space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
          <p>
            Настоящая Политика конфиденциальности персональных данных действует
            в отношении всей информации, которую данный сайт может получить о
            Пользователе.
          </p>
          <h4 className="font-bold text-gray-900 text-sm sm:text-base">
            1. Сбор данных
          </h4>
          <p>
            Мы собираем только те данные, которые вы предоставляете добровольно
            (имя, телефон, email) для обратной связи и оформления заказов.
          </p>
          <h4 className="font-bold text-gray-900 text-sm sm:text-base">
            2. Безопасность
          </h4>
          <p>
            Мы не передаем ваши персональные данные третьим лицам, за
            исключением случаев, предусмотренных законодательством.
          </p>
        </div>
      </div>
    </div>
  );
}
