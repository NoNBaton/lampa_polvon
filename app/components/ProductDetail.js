"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetail({ product, onClose }) {
  if (!product) return null;

  const { toggleWishlist, isLiked } = useWishlist();
  const liked = isLiked ? isLiked(product.id) : false;

  // Стейт для управления выбором модификации
  const [selectedHeight, setSelectedHeight] = useState("50 мм");
  const [isModifying, setIsModifying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative flex flex-col md:flex-row my-auto"
      >
        {/* Кнопка лайка (избранного) */}
        <button
          onClick={() =>
            toggleWishlist && toggleWishlist({ ...product, selectedHeight })
          }
          className={`absolute top-4 right-16 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            liked
              ? "bg-red-50 text-red-500"
              : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
          }`}
          title="В избранное"
        >
          {liked ? "♥" : "♡"}
        </button>

        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-neutral-100 text-neutral-700 flex items-center justify-center hover:bg-neutral-200 cursor-pointer transition-colors"
        >
          ✕
        </button>

        {/* Левая часть: изображение */}
        <div className="relative w-full md:w-1/2 min-h-[350px] bg-[#f8f9fa] flex items-center justify-center p-8">
          <Image
            src={product.image}
            alt={product.title || "Изображение товара"}
            fill
            className="object-contain p-8 mix-blend-multiply"
          />
        </div>

        {/* Правая часть: описание и характеристики */}
        <div className="p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 leading-snug whitespace-pre-line mb-3">
              {product.title}
            </h2>
            <p className="text-xs text-neutral-500 mb-6 leading-relaxed">
              Дает мягкое рассеянное освещение, которое достигается благодаря
              опаловому рассеивателю, выполненному из стабилизированного
              поликарбоната, не желтеющего от UV-излучения. Корпус светильника
              выполняется из анодированного алюминиевого профиля с возможной
              высотой 50 или 90 мм.
            </p>

            {/* Блок выбора модификации */}
            <AnimatePresence>
              {isModifying && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden"
                >
                  <span className="text-xs font-bold text-neutral-900 block mb-2">
                    Выберите высоту профиля:
                  </span>
                  <div className="flex gap-3">
                    {["50 мм", "90 мм"].map((height) => (
                      <button
                        key={height}
                        onClick={() => setSelectedHeight(height)}
                        className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          selectedHeight === height
                            ? "bg-neutral-900 text-white shadow-sm"
                            : "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        {height}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mb-6">
              <span className="text-xs font-bold text-neutral-900 block mb-2">
                Основные опции:
              </span>
              <ul className="space-y-1 text-xs text-neutral-600">
                <li>• Управление по протоколу DALI</li>
                <li>• Управление 0-10V</li>
                <li>
                  • Система TUNABLE WHITE 2700-6500K (смена диапазона свечения
                  от теплого до холодного)
                </li>
                <li>• Оснащение блоком аварийного питания</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-neutral-100 text-xs mb-6">
              <div>
                <span className="text-neutral-400 block mb-1">Монтаж:</span>
                <span className="font-semibold text-neutral-900">
                  {product.type || "—"}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block mb-1">Мощность:</span>
                <span className="font-semibold text-neutral-900">
                  {product.power ? `${product.power} Вт` : "—"}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block mb-1">
                  Световой поток:
                </span>
                <span className="font-semibold text-neutral-900">
                  {product.flux ? `${product.flux} Лм` : "—"}
                </span>
              </div>
              <div>
                <span className="text-neutral-400 block mb-1">Защита IP:</span>
                <span className="font-semibold text-neutral-900">
                  {product.ip || "—"}
                </span>
              </div>
              <div className="col-span-2 pt-2 border-t border-neutral-100 flex justify-between items-center">
                <span className="text-neutral-400">Выбранная модификация:</span>
                <span className="font-bold text-[#22c55e]">
                  {selectedHeight}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsModifying(!isModifying)}
              className="flex-1 py-3 px-4 border border-neutral-300 rounded-xl font-medium text-xs text-neutral-900 hover:border-neutral-900 transition-colors cursor-pointer text-center bg-white"
            >
              {isModifying ? "Закрыть выбор" : "Выбор модификации"}
            </button>
            <Link
              href="/where-to-buy"
              className="flex-1 py-3 px-4 bg-[#22c55e] text-white rounded-xl font-medium text-xs hover:bg-[#1ea34d] transition-colors text-center shadow-md shadow-green-500/20"
            >
              Где купить?
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
