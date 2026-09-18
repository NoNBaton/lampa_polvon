"use client";

import React from "react";
import Link from "next/link";
// Подключаем компонент формы контактов из папки components
import ContactForm from "../ContactForm/page";

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 pt-10 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-6">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            Главная
          </Link>
          <span>—</span>
          <span className="text-gray-900 font-medium">Контакты</span>
        </nav>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-12">
          Контакты
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-12">
          <div>
            <span className="text-[11px] font-medium text-gray-400 block mb-1">
              Телефон
            </span>
            <a
              href="tel:+74951251007"
              className="text-sm font-bold hover:text-[#22c55e] transition-colors"
            >
              +7 (495) 125-10-07
            </a>
          </div>
          <div>
            <span className="text-[11px] font-medium text-gray-400 block mb-1">
              Электронная почта
            </span>
            <a
              href="mailto:info@h-t-l.ru"
              className="text-sm font-bold hover:text-[#22c55e] transition-colors"
            >
              info@h-t-l.ru
            </a>
          </div>
          <div>
            <span className="text-[11px] font-medium text-gray-400 block mb-1">
              Сервисный центр
            </span>
            <a
              href="mailto:service@h-t-l.ru"
              className="text-sm font-bold hover:text-[#22c55e] transition-colors"
            >
              service@h-t-l.ru
            </a>
          </div>
          <div>
            <span className="text-[11px] font-medium text-gray-400 block mb-1">
              Дилерский центр
            </span>
            <a
              href="mailto:cooperation@h-t-l.ru"
              className="text-sm font-bold hover:text-[#22c55e] transition-colors"
            >
              cooperation@h-t-l.ru
            </a>
          </div>
          <div>
            <span className="text-[11px] font-medium text-gray-400 block mb-1">
              Центральный офис
            </span>
            <p className="text-sm font-bold">
              г. Москва, 2-ой Рощинский проезд, д. 8
            </p>
          </div>
          <div>
            <span className="text-[11px] font-medium text-gray-400 block mb-1">
              Склад
            </span>
            <p className="text-sm font-bold">
              г. Москва, Нагорный проезд, д. 7 стр. 13
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-[500px] md:h-[600px] bg-gray-100 border-t border-gray-200 relative overflow-hidden">
        <iframe
          title="Карта проезда"
          src="https://yandex.ru/map-widget/v1/?ll=69.2401%2C41.2995&z=12&pt=69.2401,41.2995,pm2rdm"
          className="w-full h-full border-0"
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </div>

      {/* Вызов компонента формы */}
      <ContactForm />
    </main>
  );
}
