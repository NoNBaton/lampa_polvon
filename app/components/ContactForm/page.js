"use client";

import React, { useState } from "react";

export default function ContactForm() {
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
      // Запрос отправляется на созданный API роут /api/contact
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
    <section className="w-full bg-white py-16 px-6 md:px-12 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Задать вопрос <br /> или обратиться <br /> за услугой
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Имя*"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#f4f4f4] text-sm text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#22c55e] transition-all"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Телефон*"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#f4f4f4] text-sm text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#22c55e] transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#f4f4f4] text-sm text-gray-800 placeholder-gray-400 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#22c55e] transition-all"
              />
            </div>

            <div>
              <textarea
                name="message"
                rows="6"
                placeholder="Ваше сообщение"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[#f4f4f4] text-sm text-gray-800 placeholder-gray-400 rounded-lg p-4 outline-none focus:ring-2 focus:ring-[#22c55e] transition-all resize-none h-full min-h-[148px]"
              ></textarea>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2 text-xs text-gray-500">
            <input
              type="checkbox"
              required
              defaultChecked
              id="privacy"
              className="accent-[#22c55e] w-4 h-4 rounded cursor-pointer"
            />
            <label htmlFor="privacy" className="cursor-pointer">
              Нажав на кнопку, вы соглашаетесь на{" "}
              <a
                href="/privacy-policy"
                className="underline hover:text-gray-800"
              >
                обработку персональных данных
              </a>
            </label>
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-[#00a843] hover:bg-[#008f39] text-white font-medium py-3.5 rounded-lg transition-colors duration-200 text-sm disabled:opacity-50"
          >
            {status === "loading" ? "Отправка..." : "Отправить заявку"}
          </button>

          {status === "success" && (
            <p className="text-xs text-[#00a843] font-medium text-center">
              Заявка успешно отправлена!
            </p>
          )}
          {status === "error" && (
            <p className="text-xs text-red-500 font-medium text-center">
              Ошибка отправки. Проверьте правильность заполнения данных.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
