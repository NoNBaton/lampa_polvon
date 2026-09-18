"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ContactsModal from "../ContactsModal/page";
import PrivacyModal from "../PrivacyModal/page";

export default function Footer() {
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-[#1c1c1c] text-white font-sans pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Верхняя часть подвала */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            {/* 1. Логотип и социальные сети */}
            <div className="flex flex-col space-y-6">
              <Link href="/" className="inline-block relative w-36 h-10">
                <Image
                  src="/logoP.png"
                  alt="HTL Logo"
                  fill
                  className="object-contain object-left  ml-5"
                  priority
                />
              </Link>

              <div className="flex items-center space-x-3">
                {/* Instagram */}
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-colors"
                  aria-label="Instagram"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-colors"
                  aria-label="Facebook"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="#"
                  className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-300 hover:text-white hover:border-white transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* 2. Клиентам */}
            <div className="flex flex-col space-y-3">
              <h4 className="text-sm font-semibold text-white mb-2">
                Клиентам
              </h4>
              <Link
                href="/katolog"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Продукция
              </Link>
              <Link
                href="/solutions"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Решения
              </Link>
              <Link
                href="/services"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Услуги
              </Link>
              <Link
                href="/WhereToBuyPage"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Где купить?
              </Link>
              <Link
                href="/designers-and-architects"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Дизайнерам и архитекторам
              </Link>
              <Link
                href="/dealers"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Дилерам
              </Link>
              <Link
                href="/project-protection"
                className="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Защита проекта
              </Link>

              {/* Скачивание каталога */}
              <a
                href="/catalog.pdf"
                download="catalog.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-[#22c55e] transition-colors cursor-pointer flex items-center gap-1"
              >
                Скачать каталог
              </a>
            </div>

            {/* 3. О компании */}
            <div className="flex flex-col justify-between">
              <div className="flex flex-col space-y-3">
                <h4 className="text-sm font-semibold text-white mb-2">
                  О компании
                </h4>
                <Link
                  href="/proekt"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Портфолио
                </Link>
                <Link
                  href="/new"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Новости и события
                </Link>

                {/* Кнопка открытия контактов */}
                <button
                  onClick={() => setIsContactsOpen(true)}
                  className="text-xs text-gray-400 hover:text-white transition-colors text-left cursor-pointer"
                >
                  Контакты
                </button>
              </div>

              <div className="mt-8">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">
                  Телефон
                </span>
                <a
                  href="tel:+74951251007"
                  className="text-lg font-medium text-white hover:text-[#22c55e] transition-colors"
                >
                  +7 (495) 125-10-07
                </a>
              </div>
            </div>

            {/* 4. Помощь */}
            <div className="flex flex-col justify-between">
              <div className="flex flex-col space-y-3">
                <h4 className="text-sm font-semibold text-white mb-2">
                  Помощь
                </h4>
                <Link
                  href="/wishlist"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Оплата и доставка
                </Link>
                <Link
                  href="/garantiya-i-servis"
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Гарантия и сервис
                </Link>
              </div>

              <div className="mt-8">
                <span className="text-[10px] text-gray-500 uppercase block mb-1">
                  Почта
                </span>
                <a
                  href="mailto:INFO@H-T-L.RU"
                  className="text-lg font-medium text-white hover:text-[#22c55e] transition-colors"
                >
                  INFO@H-T-L.RU
                </a>
              </div>
            </div>
          </div>

          {/* Нижняя строчка */}
          <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
            {/* Кнопка открытия политики конфиденциальности */}
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="hover:text-gray-300 transition-colors text-left cursor-pointer"
            >
              Политика конфиденциальности
            </button>
            <div>
              Сайт сделан в{" "}
              <span className="font-bold text-gray-300">FINIK</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Модальное окно контактов */}
      <ContactsModal
        isOpen={isContactsOpen}
        onClose={() => setIsContactsOpen(false)}
      />

      {/* Модальное окно политики конфиденциальности */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </>
  );
}
