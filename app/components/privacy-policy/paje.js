import React from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white py-16 px-6 md:px-12 font-sans text-gray-800">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-medium text-gray-500 hover:text-[#22c55e] transition-colors mb-8"
        >
          <span>&#8249;</span>
          <span>На главную</span>
        </Link>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
          Политика конфиденциальности
        </h1>

        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-gray-600">
          <p>
            Настоящая Политика конфиденциальности персональных данных (далее —
            Политика конфиденциальности) действует в отношении всей информации,
            которую данный сайт может получить о Пользователе во время
            использования сайта.
          </p>

          <h2 className="text-xl font-bold text-gray-900 pt-4">
            1. Сбор и использование информации
          </h2>
          <p>
            Мы собираем только те персональные данные, которые вы предоставляете
            добровольно при регистрации, подписке на рассылку или заполнении
            форм обратной связи (например, имя, номер телефона, адрес
            электронной почты).
          </p>

          <h2 className="text-xl font-bold text-gray-900 pt-4">
            2. Цели обработки данных
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Предоставление доступа к сервисам и каталогу продукции.</li>
            <li>
              Связь с Пользователем, включая направление уведомлений и запросов.
            </li>
            <li>Улучшение качества обслуживания и работы сайта.</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 pt-4">
            3. Защита персональных данных
          </h2>
          <p>
            Мы принимаем необходимые организационные и технические меры для
            защиты персональной информации Пользователя от неправомерного или
            случайного доступа, уничтожения, изменения, блокирования,
            копирования и распространения.
          </p>
        </div>
      </div>
    </main>
  );
}
