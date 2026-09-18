"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "../context/WishlistContext";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist, toggleSelectForOrder } =
    useWishlist();

  const [activeTab, setActiveTab] = useState("wishlist");
  const [deliverySubTab, setDeliverySubTab] = useState("delivery");
  const [loading, setLoading] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState({
    orderId: null,
    items: [],
    name: "",
    phone: "",
    region: "",
    confirmedPrice: null,
    status: "pending",
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    region: "",
  });

  // Загружаем сохраненные данные заказа при монтировании
  useEffect(() => {
    const savedOrder = localStorage.getItem("lastOrderDetails");
    if (savedOrder) {
      try {
        setLastOrderDetails(JSON.parse(savedOrder));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Периодический опрос сервера на предмет подтверждения цены из Telegram
  useEffect(() => {
    if (!lastOrderDetails?.orderId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `/api/contact?orderId=${lastOrderDetails.orderId}`,
        );
        if (res.ok) {
          const data = await res.json();
          if (data.price && data.price !== lastOrderDetails.confirmedPrice) {
            const updatedDetails = {
              ...lastOrderDetails,
              confirmedPrice: data.price,
              status: "confirmed",
            };
            setLastOrderDetails(updatedDetails);
            localStorage.setItem(
              "lastOrderDetails",
              JSON.stringify(updatedDetails),
            );
          }
        }
      } catch (e) {
        console.error("Ошибка при проверке статуса заказа:", e);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [lastOrderDetails]);

  const selectedItems = wishlist.filter(
    (item) => item.selectedForOrder !== false,
  );

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert("Выберите хотя бы один товар для заказа!");
      return;
    }
    if (!formData.name || !formData.phone) {
      alert("Пожалуйста, заполните имя и телефон.");
      return;
    }

    setLoading(true);

    const itemsDescription = selectedItems
      .map(
        (item, index) =>
          `${index + 1}. Модель: ${item.title} (Монтаж: ${item.type}, Мощность: ${item.power} Вт${item.selectedHeight ? `, Высота: ${item.selectedHeight}` : ""})`,
      )
      .join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          region: formData.region || "Не указан",
          volume: `Заказ из избранного (${selectedItems.length} шт.):\n${itemsDescription}`,
        }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Сервер вернул не JSON");
      }

      const result = await response.json();

      if (response.ok) {
        const orderData = {
          orderId: result.orderId,
          items: [...selectedItems],
          name: formData.name,
          phone: formData.phone,
          region: formData.region || "Не указан",
          confirmedPrice: null,
          status: "pending",
        };

        setLastOrderDetails(orderData);
        localStorage.setItem("lastOrderDetails", JSON.stringify(orderData));

        clearWishlist();
        setFormData({ name: "", phone: "", region: "" });
        setDeliverySubTab("delivery");
      } else {
        alert(`Ошибка: ${result.error || "Не удалось отправить заказ"}`);
      }
    } catch (err) {
      console.error(err);
      alert("Произошла ошибка при отправке запроса.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white max-w-6xl w-full mx-auto px-6 py-10 font-sans">
      {/* Главные вкладки страницы */}
      <div className="flex items-center gap-6 mb-8 border-b border-neutral-200 pb-4">
        <button
          onClick={() => setActiveTab("wishlist")}
          className={`text-xl font-medium transition-colors cursor-pointer ${
            activeTab === "wishlist"
              ? "text-neutral-900 border-b-2 border-[#22c55e] pb-1"
              : "text-neutral-400 hover:text-neutral-600"
          }`}
        >
          Избранное ({wishlist.length})
        </button>
        <button
          onClick={() => setActiveTab("delivery")}
          className={`text-xl font-medium transition-colors cursor-pointer ${
            activeTab === "delivery"
              ? "text-neutral-900 border-b-2 border-[#22c55e] pb-1"
              : "text-neutral-400 hover:text-neutral-600"
          }`}
        >
          Оплата и доставка
        </button>
      </div>

      {/* ВКЛАДКА ИЗБРАННОГО */}
      {activeTab === "wishlist" && (
        <>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b border-neutral-100 pb-4 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Избранное</h1>
              <p className="text-xs text-neutral-500 mt-1">
                Товары, которые вы сохранили ({wishlist.length})
              </p>
            </div>

            {wishlist.length > 0 && (
              <button
                onClick={clearWishlist}
                className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors cursor-pointer"
              >
                Очистить всё
              </button>
            )}
          </div>

          {wishlist.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-400 text-sm mb-4">
                В избранном пока ничего нет
              </p>
              <Link
                href="/katolog"
                className="inline-block px-6 py-3 bg-[#22c55e] text-white text-xs font-medium rounded-xl hover:bg-[#1ea34d] transition-colors shadow-md shadow-green-500/20"
              >
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlist.map((product) => {
                  const isSelected = product.selectedForOrder !== false;

                  return (
                    <div
                      key={product.id}
                      className={`bg-[#f8f9fa] rounded-2xl p-4 flex flex-col justify-between relative group border transition-all ${
                        isSelected
                          ? "border-[#22c55e] shadow-sm"
                          : "border-neutral-200 opacity-60"
                      }`}
                    >
                      <label className="absolute top-3 left-3 z-10 flex items-center gap-2 cursor-pointer bg-white/80 backdrop-blur-xs px-2 py-1 rounded-lg shadow-xs">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectForOrder(product.id)}
                          className="w-4 h-4 accent-[#22c55e] cursor-pointer"
                        />
                        <span className="text-[10px] font-medium text-neutral-700">
                          В заказ
                        </span>
                      </label>

                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-sm text-neutral-400 hover:text-red-500 flex items-center justify-center transition-colors cursor-pointer"
                        title="Удалить"
                      >
                        ✕
                      </button>

                      <div className="relative w-full h-48 mb-4 flex items-center justify-center p-2 mt-4">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          unoptimized
                          className="object-contain mix-blend-multiply"
                        />
                      </div>

                      <div>
                        <h3 className="text-xs font-bold text-neutral-900 line-clamp-2 mb-2">
                          {product.title}
                        </h3>
                        <div className="text-[11px] text-neutral-500 space-y-0.5 mb-2">
                          {product.selectedHeight && (
                            <p className="text-[#22c55e] font-semibold">
                              Высота: {product.selectedHeight}
                            </p>
                          )}
                          <p>Монтаж: {product.type}</p>
                          <p>Мощность: {product.power} Вт</p>
                        </div>
                        {product.price && (
                          <p className="text-sm font-bold text-neutral-900 mb-4">
                            {product.price} руб.
                          </p>
                        )}
                      </div>

                      <Link
                        href="/WhereToBuyPage"
                        className="w-full py-2.5 bg-neutral-900 text-white rounded-xl text-xs font-medium text-center hover:bg-neutral-800 transition-colors"
                      >
                        Где купить
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Форма оформления прямо во вкладке Избранное */}
              {selectedItems.length > 0 && (
                <div className="bg-[#f8f9fa] border border-neutral-200 rounded-2xl p-6 md:p-8 mt-10">
                  <h3 className="text-lg font-bold text-neutral-900 mb-6">
                    Оформить выбранные товары ({selectedItems.length})
                  </h3>

                  <div className="mb-6 space-y-2 bg-white p-4 rounded-xl border border-neutral-200">
                    <p className="text-xs font-semibold text-neutral-700 mb-2">
                      Выбранные модели:
                    </p>
                    {selectedItems.map((item, idx) => (
                      <div
                        key={item.id}
                        className="text-xs text-neutral-600 flex items-center justify-between border-b border-neutral-100 pb-1 last:border-none"
                      >
                        <span className="font-medium text-neutral-900">
                          {idx + 1}. {item.title}
                        </span>
                        <div className="flex items-center gap-4">
                          <span className="text-neutral-400">
                            Монтаж: {item.type}, Мощность: {item.power} Вт
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={handleConfirmOrder}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <input
                      type="text"
                      placeholder="Имя получателя"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#22c55e]"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Номер телефона"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#22c55e]"
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="py-3 bg-[#22c55e] text-white rounded-xl text-xs font-medium hover:bg-[#1ea34d] transition-colors shadow-md shadow-green-500/20 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? "Отправка..." : "Подтвердить заказ"}
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* ВКЛАДКА ДОСТАВКА И ОПЛАТА */}
      {activeTab === "delivery" && (
        <div className="py-4">
          <div className="flex items-center gap-10 mb-10 border-b border-neutral-100 pb-6 overflow-x-auto">
            <button
              onClick={() => setDeliverySubTab("delivery")}
              className={`text-3xl md:text-4xl font-light tracking-tight transition-colors cursor-pointer whitespace-nowrap ${
                deliverySubTab === "delivery"
                  ? "text-[#22c55e] font-normal"
                  : "text-neutral-300 hover:text-neutral-500"
              }`}
            >
              Доставка ({lastOrderDetails.items.length})
            </button>
            <button
              onClick={() => setDeliverySubTab("pickup")}
              className={`text-3xl md:text-4xl font-light tracking-tight transition-colors cursor-pointer whitespace-nowrap ${
                deliverySubTab === "pickup"
                  ? "text-neutral-900 font-normal"
                  : "text-neutral-300 hover:text-neutral-500"
              }`}
            >
              Самовывоз
            </button>
            <button
              onClick={() => setDeliverySubTab("payment")}
              className={`text-3xl md:text-4xl font-light tracking-tight transition-colors cursor-pointer whitespace-nowrap ${
                deliverySubTab === "payment"
                  ? "text-neutral-900 font-normal"
                  : "text-neutral-300 hover:text-neutral-500"
              }`}
            >
              Оплата
            </button>
          </div>

          {/* 1. Отображение оформленного заказа в подвкладке "Доставка" */}
          {deliverySubTab === "delivery" && (
            <div className="space-y-6">
              <div className="bg-[#f8f9fa] border border-neutral-200 rounded-2xl p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 border-b border-neutral-200 pb-4 gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">
                      Детали доставки
                    </h3>
                    {lastOrderDetails.orderId && (
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Заказ #{lastOrderDetails.orderId}
                      </p>
                    )}
                  </div>

                  {lastOrderDetails.items.length > 0 && (
                    <div>
                      {lastOrderDetails.status === "confirmed" ? (
                        <span className="text-xs text-[#22c55e] font-semibold bg-green-50 px-3 py-1 rounded-full border border-green-200">
                          Заказ подтверждён ✓
                        </span>
                      ) : (
                        <span className="text-xs text-amber-600 font-semibold bg-amber-50 px-3 py-1 rounded-full border border-amber-200 animate-pulse">
                          Ожидает расчета цены в Telegram ⏳
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {lastOrderDetails.items.length === 0 ? (
                  <p className="text-neutral-400 text-sm py-10 text-center">
                    Вы ещё не оформили ни одного заказа. Перейдите в раздел{" "}
                    <button
                      onClick={() => setActiveTab("wishlist")}
                      className="text-[#22c55e] underline cursor-pointer"
                    >
                      Избранное
                    </button>
                    , чтобы сделать заказ.
                  </p>
                ) : (
                  <div>
                    {/* Информация о получателе и итоговой цене */}
                    <div className="mb-6 bg-white p-4 rounded-xl border border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-neutral-400">
                          Имя получателя:
                        </p>
                        <p className="text-sm font-semibold text-neutral-900">
                          {lastOrderDetails.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400">
                          Телефон получателя:
                        </p>
                        <p className="text-sm font-semibold text-neutral-900">
                          {lastOrderDetails.phone}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-neutral-400">
                          Итоговая стоимость:
                        </p>
                        <p className="text-sm font-bold text-[#22c55e]">
                          {lastOrderDetails.confirmedPrice
                            ? `${lastOrderDetails.confirmedPrice} руб.`
                            : "Расчитывается..."}
                        </p>
                      </div>
                    </div>

                    {/* Список товаров в заказе */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {lastOrderDetails.items.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white border border-neutral-200 rounded-2xl p-4 flex flex-col justify-between shadow-xs"
                        >
                          <div className="relative w-full h-40 mb-3 flex items-center justify-center p-2">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              unoptimized
                              className="object-contain mix-blend-multiply"
                            />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-neutral-900 line-clamp-2 mb-1">
                              Модель: {item.title}
                            </h4>
                            <div className="text-[11px] text-neutral-500 space-y-0.5 mb-3">
                              {item.selectedHeight && (
                                <p className="text-[#22c55e] font-semibold">
                                  Высота: {item.selectedHeight}
                                </p>
                              )}
                              <p>Монтаж: {item.type}</p>
                              <p>Мощность: {item.power} Вт</p>
                            </div>
                          </div>
                          <div
                            className={`text-[10px] p-2 rounded-lg text-center font-medium ${
                              lastOrderDetails.status === "confirmed"
                                ? "bg-green-50 text-[#22c55e]"
                                : "bg-neutral-100 text-neutral-500"
                            }`}
                          >
                            {lastOrderDetails.status === "confirmed"
                              ? "Согласовано"
                              : "В обработке"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 2. Самовывоз */}
          {deliverySubTab === "pickup" && (
            <div className="bg-[#f8f9fa] border border-neutral-200 rounded-2xl p-8 text-neutral-700 text-sm space-y-3">
              <p className="font-semibold text-neutral-900 text-base">
                Адрес пункта самовывоза:
              </p>
              <p>г. Москва, промышленная зона, складской комплекс №4.</p>
              <p className="text-xs text-neutral-500 pt-2">
                Время работы: Пн-Пт с 9:00 до 18:00. Бесплатно для любых сумм
                заказа.
              </p>
            </div>
          )}

          {/* 3. Оплата */}
          {deliverySubTab === "payment" && (
            <div className="bg-[#f8f9fa] border border-neutral-200 rounded-2xl p-8 text-neutral-700 text-sm space-y-3">
              <p className="font-semibold text-neutral-900 text-base">
                Доступные способы оплаты:
              </p>
              <ul className="list-disc list-inside space-y-1 text-neutral-600 text-xs">
                <li>Безналичный расчет для юридических лиц</li>
                <li>Оплата банковской картой онлайн</li>
                <li>Оплата по выставленному счету</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
