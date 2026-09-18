"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroImg from "../../public/foto.png"; // Импортируем вашу картинку
import PrivacyModal from "../components/PrivacyModal/page";

export default function DesignersPage() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Состояние формы и отправки в Telegram через /api/contact
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans text-[#1a1a1a] animate-fade-in">
      {/* Верхний контентный блок */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-20">
        {/* Хлебные крошки */}
        <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-600 transition-colors">
            Главная
          </Link>
          <span>—</span>
          <span className="text-gray-900 font-medium">
            Дизайнерам и архитекторам
          </span>
        </nav>

        {/* Заголовок страницы */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-12">
          Дизайнерам и архитекторам
        </h1>

        {/* Картинка + Текст */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Изображение */}
          <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[420px] rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
            <Image
              src="/foto.png"
              alt="Дизайнерам и архитекторам"
              width={840}
              height={600}
              className="w-full h-auto object-cover rounded-2xl"
              priority
            />
          </div>

          {/* Правая колонка с описанием */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Мы предлагаем особые условия сотрудничества для архитекторов и
              дизайнеров
            </h2>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Мы помогаем воплотить в жизнь различные идеи и концепты в области
              освещения архитектурным бюро, дизайнерам и строителям.
            </p>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Конструкторы и инженеры нашей компании помогут создать светильники
              по Вашему авторскому дизайну и оборудование любой сложности под
              задачи клиента.
            </p>

            <div className="pt-4">
              <button
                onClick={() => {
                  const formElement = document.getElementById("contact-form");
                  formElement?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-[#00a843] hover:bg-[#008f39] hover:scale-105 active:scale-95 text-white text-sm font-medium px-8 py-3.5 rounded-lg transition-all duration-200 shadow-sm cursor-pointer"
              >
                Заказать звонок
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Тёмный блок "Напишите нам" */}
      <section
        id="contact-form"
        className="bg-[#1a1a1a] text-white py-16 sm:py-20"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Заголовок слева */}
            <div className="lg:col-span-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Напишите нам
              </h2>
            </div>

            {/* Форма справа */}
            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Левая колонка полей */}
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Имя*"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#f5f5f5] text-gray-900 placeholder-gray-400 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#00a843] transition-all"
                    />
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="Телефон*"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#f5f5f5] text-gray-900 placeholder-gray-400 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#00a843] transition-all"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#f5f5f5] text-gray-900 placeholder-gray-400 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#00a843] transition-all"
                    />
                  </div>

                  {/* Текстовое поле сообщения */}
                  <div>
                    <textarea
                      name="message"
                      rows="5"
                      placeholder="Ваше сообщение"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full h-full bg-[#f5f5f5] text-gray-900 placeholder-gray-400 rounded-lg p-4 text-sm outline-none focus:ring-2 focus:ring-[#00a843] transition-all resize-none min-h-[148px]"
                    ></textarea>
                  </div>
                </div>

                {/* Галочка согласия с политикой конфиденциальности */}
                <div className="flex items-center space-x-2 pt-2 text-xs text-gray-400">
                  <input
                    type="checkbox"
                    required
                    defaultChecked
                    id="privacy"
                    className="accent-[#00a843] w-4 h-4 rounded cursor-pointer"
                  />
                  <label htmlFor="privacy" className="cursor-pointer">
                    Нажав на кнопку, вы соглашаетесь на{" "}
                    <button
                      type="button"
                      onClick={() => setIsPrivacyOpen(true)}
                      className="text-[#00a843] underline hover:text-[#008f39] transition-colors cursor-pointer"
                    >
                      обработку персональных данных
                    </button>
                  </label>
                </div>

                {/* Кнопка отправки */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-[#00a843] hover:bg-[#008f39] hover:scale-[1.01] active:scale-[0.99] text-white font-medium py-4 rounded-lg transition-all duration-200 text-sm disabled:opacity-50 cursor-pointer"
                  >
                    {status === "loading" ? "Отправка..." : "Отправить заявку"}
                  </button>
                </div>

                {/* Сообщения о статусе отправки */}
                {status === "success" && (
                  <p className="text-xs text-[#00a843] font-medium text-center pt-2">
                    Заявка успешно отправлена!
                  </p>
                )}
                {status === "error" && (
                  <p className="text-xs text-red-500 font-medium text-center pt-2">
                    Ошибка отправки. Проверьте правильность заполнения данных.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Модальное окно */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </main>
  );
}
