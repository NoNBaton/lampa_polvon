"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // Загружаем сохраненное избранное при первом открытии сайта
  useEffect(() => {
    const saved = localStorage.getItem("htl_wishlist");
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        console.error("Ошибка при чтении избранного", e);
      }
    }
  }, []);

  // Сохраняем в localStorage при каждом изменении списка
  useEffect(() => {
    localStorage.setItem("htl_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        return [...prev, { ...product, selectedForOrder: true }]; // По умолчанию товар выбран для заказа
      }
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  // Переключение галочки «выбрать для заказа» у конкретного товара
  const toggleSelectForOrder = (id) => {
    setWishlist((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, selectedForOrder: !item.selectedForOrder }
          : item,
      ),
    );
  };

  const isLiked = (id) => wishlist.some((item) => item.id === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        toggleSelectForOrder,
        isLiked,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
