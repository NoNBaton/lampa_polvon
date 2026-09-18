"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import React, {
  useState,
  useRef,
  useEffect,
  Suspense,
  useCallback,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import styles from "./NavBar.module.css";
import { useWishlist } from "../../context/WishlistContext";

function SearchInputContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  // Синхронизация инпута при изменении параметров URL
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Загрузка истории поиска из localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("search_history");
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {
      console.error("Error loading search history:", e);
    }
  }, []);

  // Сохранение в историю поиска
  const saveToHistory = useCallback((term) => {
    const trimmed = term.trim();
    if (!trimmed) return;

    setHistory((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== trimmed.toLowerCase(),
      );
      const updated = [trimmed, ...filtered].slice(0, 5);
      try {
        localStorage.setItem("search_history", JSON.stringify(updated));
      } catch (e) {
        console.error("Error saving search history:", e);
      }
      return updated;
    });
  }, []);

  // Удаление отдельного элемента из истории
  const removeFromHistory = (e, itemToRemove) => {
    e.stopPropagation();
    setHistory((prev) => {
      const updated = prev.filter((item) => item !== itemToRemove);
      try {
        localStorage.setItem("search_history", JSON.stringify(updated));
      } catch (e) {
        console.error("Error updating search history:", e);
      }
      return updated;
    });
  };

  // Очистка всей истории
  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("search_history");
    } catch (e) {
      console.error("Error clearing search history:", e);
    }
  };

  // Обновление URL при вводе
  const updateUrlQuery = useCallback(
    (term) => {
      const targetPath = pathname.includes("/katolog") ? pathname : "/katolog";
      const params = new URLSearchParams(searchParams.toString());

      if (term.trim()) {
        params.set("search", term);
      } else {
        params.delete("search");
      }

      const queryString = params.toString();
      const newUrl = queryString ? `${targetPath}?${queryString}` : targetPath;

      if (pathname.includes("/katolog")) {
        replace(newUrl, { scroll: false });
      } else if (term.trim()) {
        push(newUrl, { scroll: false });
      }
    },
    [pathname, searchParams, replace, push],
  );

  // Дебаунс для обновления URL
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== (searchParams.get("search") || "")) {
        updateUrlQuery(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, updateUrlQuery, searchParams]);

  // Динамический поиск продуктов через API
  useEffect(() => {
    const rawQuery = searchQuery.trim();
    if (!rawQuery) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/products?search=${encodeURIComponent(rawQuery)}`,
        );
        if (res.ok) {
          const data = await res.json();
          const items = Array.isArray(data) ? data : data.products || [];
          setSearchResults(items.slice(0, 5));
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Закрытие выпадающего блока при клике вне элемента
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Управление с клавиатуры
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : searchResults.length - 1,
      );
    } else if (e.key === "Enter") {
      if (selectedIndex >= 0 && searchResults[selectedIndex]) {
        const item = searchResults[selectedIndex];
        const titleClean = item.title.replace(/\n/g, " ");
        saveToHistory(titleClean);
        setIsOpen(false);
        push(`/katolog/${item.id}`);
      } else if (searchQuery.trim()) {
        saveToHistory(searchQuery);
        setIsOpen(false);
        push(`/katolog?search=${encodeURIComponent(searchQuery.trim())}`);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setIsOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    if (pathname.includes("/katolog")) {
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const hasResults = searchResults.length > 0;
  const showDropdown =
    isOpen &&
    ((searchQuery.trim() === "" && history.length > 0) ||
      (searchQuery.trim() !== "" && (hasResults || isLoading)));

  return (
    <div
      className={`${styles.searchContainer} flex-1 h-full relative flex items-center px-4`}
      ref={searchRef}
    >
      <div className="flex items-center w-full relative">
        {/* Иконка лупы слева */}
        <svg
          className="absolute left-1 w-4 h-4 text-neutral-400 pointer-events-none shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        {/* Инпут с правильным отступом слева (pl-7), чтобы текст не наезжал на лупу при вводе */}
        <input
          type="text"
          placeholder=""
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-7 pr-8 py-1 text-xs bg-transparent border-none outline-none text-neutral-800 placeholder-neutral-400"
        />

        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-1 text-xs text-neutral-400 hover:text-neutral-700 transition-all cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {/* Выпадающий блок поиска / истории */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-neutral-100 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-neutral-100 animate-in fade-in slide-in-from-top-2 duration-200">
          {searchQuery.trim() !== "" ? (
            <div className="p-2">
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-3 py-1 flex justify-between items-center">
                <span>
                  {isLoading
                    ? "Загрузка..."
                    : `Результаты (${searchResults.length})`}
                </span>
                {searchResults.length > 0 && (
                  <Link
                    href={`/katolog?search=${encodeURIComponent(searchQuery)}`}
                    onClick={() => {
                      saveToHistory(searchQuery);
                      setIsOpen(false);
                    }}
                    className="text-[#22c55e] hover:underline font-medium text-[11px] transition-all hover:translate-x-0.5"
                  >
                    Перейти в каталог ›
                  </Link>
                )}
              </div>

              {searchResults.map((product, index) => (
                <Link
                  key={product.id || index}
                  href={`/katolog/${product.id}`}
                  onClick={() => {
                    saveToHistory(product.title.replace(/\n/g, " "));
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-200 ${
                    index === selectedIndex
                      ? "bg-emerald-50/70 translate-x-1"
                      : "hover:bg-neutral-50 hover:translate-x-1"
                  }`}
                >
                  <div className="w-10 h-10 bg-neutral-50 border border-neutral-100 rounded-lg p-1 shrink-0 flex items-center justify-center overflow-hidden group">
                    <img
                      src={product.image || "/placeholder.png"}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-xs font-semibold text-neutral-800 truncate">
                      {product.title?.replace(/\n/g, " ")}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                      {product.power && <span>{product.power} Вт</span>}
                      {product.flux && <span>• {product.flux} Лм</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* Секция истории поиска, если инпут пуст */
            history.length > 0 && (
              <div className="p-2 bg-neutral-50/50">
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-3 py-1 flex justify-between items-center">
                  <span>История поиска</span>
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="hover:text-neutral-700 transition-colors lowercase"
                  >
                    очистить
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 p-1.5">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSearchQuery(item);
                        saveToHistory(item);
                        setIsOpen(true);
                      }}
                      className="flex items-center gap-1.5 bg-white border border-neutral-200 hover:border-[#22c55e] px-2.5 py-1 rounded-full cursor-pointer text-xs text-neutral-700 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow"
                    >
                      <span className="text-neutral-400 text-[10px]">🕒</span>
                      <span className="truncate max-w-[150px]">{item}</span>
                      <button
                        onClick={(e) => removeFromHistory(e, item)}
                        className="text-neutral-400 hover:text-red-500 ml-1 text-[10px] transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function NavBar() {
  const { data: session } = useSession();
  const wishlistContext = useWishlist();
  const wishlist = wishlistContext?.wishlist || [];

  return (
    <header className={styles.header}>
      <div className={styles.topBar} />

      <div className={styles.topRow}>
        <div className={styles.topBarLeft}>
          <button className={styles.langBtn}>EN</button>
          <a href="/catalog.pdf" download className={styles.downloadBtn}>
            Скачать каталог
          </a>
        </div>

        <Suspense
          fallback={
            <div className="flex-1 max-w-3xl mx-4 h-9 bg-neutral-100 rounded-full animate-pulse" />
          }
        >
          <SearchInputContent />
        </Suspense>

        <div className={styles.topBarRight}>
          <Link href="/wishlist" className={styles.iconBtn} title="Избранное">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            {wishlist.length > 0 && (
              <span className={styles.badge}>{wishlist.length}</span>
            )}
          </Link>

          {session ? (
            <div className={styles.userProfile}>
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className={styles.userAvatar}
                />
              ) : (
                <div className={styles.userAvatarFallback}>
                  {session.user?.name
                    ? session.user.name[0].toUpperCase()
                    : "U"}
                </div>
              )}
              <span className={styles.userName}>{session.user?.name}</span>
              <button onClick={() => signOut()} className={styles.logoutBtn}>
                Выйти
              </button>
            </div>
          ) : (
            <button onClick={() => signIn("google")} className={styles.authBtn}>
              Войти
            </button>
          )}
        </div>
      </div>

      <div className={styles.bottomRow}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logoH.png"
            alt="HTL Logo"
            width={60}
            height={40}
            priority
          />
        </Link>

        <nav className={styles.navigation}>
          <Link href="/katolog">Каталог</Link>
          <Link href="/AboutPage">О компании</Link>
          <Link href="/proekt">Портфолио</Link>
          <Link href="/WhereToBuyPage">Где купить?</Link>
          <Link href="/new">Новости</Link>
          <Link href="/contacts">Контакты</Link>
        </nav>

        <a href="tel:+74951251007" className={styles.phone}>
          +7 (495) 125-10-07
        </a>
      </div>
    </header>
  );
}
