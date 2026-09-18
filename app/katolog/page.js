"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import ProductDetail from "../components/ProductDetail";

const CATEGORIES = {
  business: [
    { id: "all", label: "Все", count: 50 },
    { id: "office", label: "Офисные", count: 12 },
    { id: "linear", label: "Линейные", count: 10 },
    { id: "magistral", label: "Магистральные", count: 9 },
    { id: "downlights", label: "Даунлайты", count: 7 },
    { id: "school", label: "Школьные", count: 6 },
    { id: "medical", label: "Медицинские", count: 3 },
    { id: "zhkh", label: "ЖКХ и парковки", count: 2 },
  ],
};

const FigmaDesignImages = Array.from(
  { length: 18 },
  (_, i) => `/lam${i === 0 ? "" : i + 1}.png`,
);

const ALL_PRODUCTS = Array.from({ length: 50 }, (_, i) => {
  const id = i + 1;
  const types = ["Встроенный", "Накладной", "Подвесной"];
  const ips = ["IP-20", "IP-40", "IP-54", "IP-65"];
  const temps = ["3000", "4000", "5000", "2700-6500"];
  const emergencies = ["Да", "Нет"];
  const cris = ["70 и ниже", "80", "90"];
  const controls = ["DALI", "1-10V"];
  const filterCats = [
    "linear",
    "office",
    "magistral",
    "downlights",
    "school",
    "medical",
    "zhkh",
  ];

  return {
    id,
    title: `Линейный светодиодный светильник Optima OFL-${3000 + id * 10}`,
    category: i % 2 === 0 ? "Линейные" : "Даунлайты",
    status: "Есть в наличии",
    price: "Цена по запросу",
    image: FigmaDesignImages[i % FigmaDesignImages.length],
    type: types[i % types.length],
    power: 20 + (i % 30),
    flux: 3000 + ((i * 45) % 2200),
    ip: ips[i % ips.length],
    temp: temps[i % temps.length],
    emergency: emergencies[i % emergencies.length],
    cri: cris[i % cris.length],
    control: controls[i % controls.length],
    filterCat: filterCats[i % filterCats.length],
    buyLink: "/where-to-buy",
  };
});

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const searchQuery = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const searchRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("по типу");
  const [perPage] = useState("64");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);

  const [filters, setFilters] = useState({
    mounting: [],
    powerMin: 10,
    powerMax: 60,
    fluxMin: 2000,
    fluxMax: 6000,
    ip: [],
    temp: [],
    emergency: [],
    cri: [],
    control: [],
  });

  // Загрузка истории поиска из localStorage при монтировании
  useEffect(() => {
    try {
      const saved = localStorage.getItem("search_history");
      if (saved) {
        setSearchHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveToHistory = (query) => {
    if (!query.trim()) return;
    const updated = [
      query,
      ...searchHistory.filter(
        (item) => item.toLowerCase() !== query.toLowerCase(),
      ),
    ].slice(0, 5); // Храним последние 5 запросов
    setSearchHistory(updated);
    try {
      localStorage.setItem("search_history", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const removeFromHistory = (e, queryToRemove) => {
    e.stopPropagation();
    const updated = searchHistory.filter((item) => item !== queryToRemove);
    setSearchHistory(updated);
    try {
      localStorage.setItem("search_history", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const clearHistory = () => {
    setSearchHistory([]);
    try {
      localStorage.removeItem("search_history");
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    const trimmed = searchInput.trim();
    if (trimmed) {
      saveToHistory(trimmed);
    }
    const params = new URLSearchParams(searchParams.toString());
    if (trimmed) {
      params.set("search", trimmed);
    } else {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSelectSuggestion = (product) => {
    setSelectedProject(product);
    setShowSuggestions(false);
  };

  const handleSelectHistoryItem = (historyQuery) => {
    setSearchInput(historyQuery);
    setShowSuggestions(false);
    saveToHistory(historyQuery);
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", historyQuery);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCheckboxChange = (categoryKey, value) => {
    setFilters((prev) => {
      const list = prev[categoryKey];
      if (list.includes(value)) {
        return {
          ...prev,
          [categoryKey]: list.filter((item) => item !== value),
        };
      } else {
        return { ...prev, [categoryKey]: [...list, value] };
      }
    });
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      mounting: [],
      powerMin: 10,
      powerMax: 60,
      fluxMin: 2000,
      fluxMax: 6000,
      ip: [],
      temp: [],
      emergency: [],
      cri: [],
      control: [],
    });
    setActiveCategory("all");
    setCurrentPage(1);
  };

  const resetSearch = () => {
    setSearchInput("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Фильтрация подсказок (теперь регистронезависимая)
  const suggestions = searchInput.trim()
    ? ALL_PRODUCTS.filter((item) =>
        item.title.toLowerCase().includes(searchInput.trim().toLowerCase()),
      ).slice(0, 5)
    : [];

  const filteredProducts = ALL_PRODUCTS.filter((item) => {
    if (searchQuery) {
      const cleanTitle = item.title.toLowerCase();
      const terms = searchQuery.trim().toLowerCase().split(/\s+/);
      const matchesSearch = terms.every(
        (term) =>
          cleanTitle.includes(term) ||
          item.power.toString().includes(term) ||
          item.flux.toString().includes(term),
      );
      if (!matchesSearch) return false;
    }
    if (activeCategory !== "all" && item.filterCat !== activeCategory)
      return false;
    if (filters.mounting.length > 0 && !filters.mounting.includes(item.type))
      return false;
    if (filters.ip.length > 0 && !filters.ip.includes(item.ip)) return false;
    if (filters.temp.length > 0 && !filters.temp.includes(item.temp))
      return false;
    if (
      filters.emergency.length > 0 &&
      !filters.emergency.includes(item.emergency)
    )
      return false;
    if (filters.cri.length > 0 && !filters.cri.includes(item.cri)) return false;
    if (filters.control.length > 0 && !filters.control.includes(item.control))
      return false;
    if (item.power < filters.powerMin || item.power > filters.powerMax)
      return false;
    if (item.flux < filters.fluxMin || item.flux > filters.fluxMax)
      return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "по типу") return a.type.localeCompare(b.type);
    if (sortBy === "по мощности") return a.power - b.power;
    if (sortBy === "по световому потоку") return a.flux - b.flux;
    return 0;
  });

  const itemsPerPage = Number(perPage);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#22c55e] selection:text-white">
      {/* Поисковая строка в стиле Navbar */}
      <div className="border-b border-neutral-100 px-6 md:px-12 py-4 bg-white">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div ref={searchRef} className="relative flex-1 max-w-xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Поиск светильников..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full bg-[#f8f9fa] text-neutral-800 placeholder-neutral-400 border border-neutral-200/80 rounded-full pl-10 pr-10 py-2.5 text-xs focus:outline-none focus:border-neutral-300 focus:bg-white transition-all shadow-sm"
              />
              <span className="absolute left-3.5 top-3 text-neutral-400 text-xs">
                🔍
              </span>
              {searchInput && (
                <button
                  type="button"
                  onClick={resetSearch}
                  className="absolute right-3.5 top-2.5 text-neutral-400 hover:text-neutral-700 text-xs transition-colors"
                >
                  ✕
                </button>
              )}
            </form>

            {/* Выпадающий блок с историей и результатами */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                {/* Если в инпуте пусто, показываем историю поиска */}
                {!searchInput.trim() ? (
                  <div className="p-3">
                    {searchHistory.length > 0 ? (
                      <>
                        <div className="flex items-center justify-between px-2 pb-2 text-[11px] text-neutral-400 border-b border-neutral-100">
                          <span>История поиска</span>
                          <button
                            type="button"
                            onClick={clearHistory}
                            className="hover:text-neutral-700 transition-colors"
                          >
                            Очистить
                          </button>
                        </div>
                        <div className="pt-1">
                          {searchHistory.map((item, index) => (
                            <div
                              key={index}
                              onClick={() => handleSelectHistoryItem(item)}
                              className="flex items-center justify-between px-3 py-2 hover:bg-neutral-50 rounded-lg cursor-pointer text-xs text-neutral-700 transition-colors group"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-neutral-300">🕒</span>
                                <span className="group-hover:text-neutral-900">
                                  {item}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => removeFromHistory(e, item)}
                                className="text-neutral-300 hover:text-neutral-600 px-1"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="py-4 text-center text-xs text-neutral-400">
                        История поиска пуста
                      </div>
                    )}
                  </div>
                ) : (
                  /* Если введен текст, показываем подсказки или статус "Ничего не найдено" */
                  <div>
                    <div className="px-4 py-2 border-b border-neutral-100 text-[11px] text-neutral-400 uppercase tracking-wider">
                      {suggestions.length > 0
                        ? `Результаты (${suggestions.length})`
                        : "Ничего не найдено"}
                    </div>
                    {suggestions.length > 0 ? (
                      suggestions.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectSuggestion(item)}
                          className="p-3 hover:bg-neutral-50 cursor-pointer flex items-center gap-3 border-b border-neutral-100 last:border-none transition-colors group"
                        >
                          <div className="w-9 h-9 relative flex-shrink-0 bg-neutral-100 rounded-lg overflow-hidden border border-neutral-200/60">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              unoptimized
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="overflow-hidden">
                            <p className="text-xs font-medium text-neutral-800 truncate group-hover:text-neutral-900">
                              {item.title}
                            </p>
                            <p className="text-[10px] text-neutral-400">
                              {item.power} Вт • {item.flux} Лм
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="py-6 text-center text-xs text-neutral-400">
                        По вашему запросу ничего не найдено
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {searchQuery && (
            <div className="text-xs text-neutral-500 flex items-center gap-3 bg-neutral-100 px-3.5 py-1.5 rounded-full border border-neutral-200/60">
              <span>
                Найдено:{" "}
                <strong className="text-neutral-900">
                  {filteredProducts.length}
                </strong>
              </span>
              <button
                onClick={resetSearch}
                className="text-[#22c55e] hover:underline transition-colors cursor-pointer font-medium"
              >
                Сбросить
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8 grid grid-cols-1 lg:grid-cols-4 gap-12">
        <aside className="lg:col-span-1 space-y-8 pr-4 border-r border-neutral-100">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider mb-4">
              Каталог
            </h2>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.business.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setCurrentPage(1);
                    }}
                    className={`flex items-center justify-between w-full py-1 text-left cursor-pointer transition-colors ${
                      activeCategory === cat.id
                        ? "text-[#22c55e] font-medium"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className="text-neutral-400">{cat.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-neutral-200 pt-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider">
                Фильтр
              </h3>
              <button
                onClick={resetFilters}
                className="text-neutral-400 hover:text-neutral-900 cursor-pointer text-xs font-medium"
              >
                Сбросить ⟲
              </button>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-neutral-900 mb-3">
                Тип монтажа
              </h4>
              {["Встроенный", "Накладной", "Подвесной"].map((type) => (
                <label
                  key={type}
                  className="flex items-center justify-between text-xs text-neutral-600 py-1 cursor-pointer"
                >
                  <span>{type}</span>
                  <input
                    type="checkbox"
                    checked={filters.mounting.includes(type)}
                    onChange={() => handleCheckboxChange("mounting", type)}
                    className="w-4 h-4 rounded border-neutral-300 accent-[#22c55e] cursor-pointer"
                  />
                </label>
              ))}
            </div>

            <div>
              <h4 className="text-xs font-semibold text-neutral-900 mb-2">
                Мощность, Вт
              </h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={filters.powerMin}
                  onChange={(e) =>
                    setFilters((p) => ({
                      ...p,
                      powerMin: Number(e.target.value),
                    }))
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 rounded px-2 py-1 text-xs"
                  placeholder="От"
                />
                <span className="text-neutral-400 text-xs">—</span>
                <input
                  type="number"
                  value={filters.powerMax}
                  onChange={(e) =>
                    setFilters((p) => ({
                      ...p,
                      powerMax: Number(e.target.value),
                    }))
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 rounded px-2 py-1 text-xs"
                  placeholder="До"
                />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-neutral-900 mb-2">
                Световой поток, Лм
              </h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={filters.fluxMin}
                  onChange={(e) =>
                    setFilters((p) => ({
                      ...p,
                      fluxMin: Number(e.target.value),
                    }))
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 rounded px-2 py-1 text-xs"
                  placeholder="От"
                />
                <span className="text-neutral-400 text-xs">—</span>
                <input
                  type="number"
                  value={filters.fluxMax}
                  onChange={(e) =>
                    setFilters((p) => ({
                      ...p,
                      fluxMax: Number(e.target.value),
                    }))
                  }
                  className="w-full bg-neutral-50 border border-neutral-200 rounded px-2 py-1 text-xs"
                  placeholder="До"
                />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-neutral-900 mb-3">
                Степень защиты (IP)
              </h4>
              {["IP-20", "IP-40", "IP-54", "IP-65"].map((ip) => (
                <label
                  key={ip}
                  className="flex items-center justify-between text-xs text-neutral-600 py-1 cursor-pointer"
                >
                  <span>{ip}</span>
                  <input
                    type="checkbox"
                    checked={filters.ip.includes(ip)}
                    onChange={() => handleCheckboxChange("ip", ip)}
                    className="w-4 h-4 rounded border-neutral-300 accent-[#22c55e] cursor-pointer"
                  />
                </label>
              ))}
            </div>

            <div>
              <h4 className="text-xs font-semibold text-neutral-900 mb-3">
                Цветовая температура, K
              </h4>
              {["3000", "4000", "5000", "2700-6500"].map((temp) => (
                <label
                  key={temp}
                  className="flex items-center justify-between text-xs text-neutral-600 py-1 cursor-pointer"
                >
                  <span>{temp} K</span>
                  <input
                    type="checkbox"
                    checked={filters.temp.includes(temp)}
                    onChange={() => handleCheckboxChange("temp", temp)}
                    className="w-4 h-4 rounded border-neutral-300 accent-[#22c55e] cursor-pointer"
                  />
                </label>
              ))}
            </div>

            <div>
              <h4 className="text-xs font-semibold text-neutral-900 mb-3">
                Аварийный блок (БАП)
              </h4>
              {["Да", "Нет"].map((val) => (
                <label
                  key={val}
                  className="flex items-center justify-between text-xs text-neutral-600 py-1 cursor-pointer"
                >
                  <span>{val}</span>
                  <input
                    type="checkbox"
                    checked={filters.emergency.includes(val)}
                    onChange={() => handleCheckboxChange("emergency", val)}
                    className="w-4 h-4 rounded border-neutral-300 accent-[#22c55e] cursor-pointer"
                  />
                </label>
              ))}
            </div>

            <div>
              <h4 className="text-xs font-semibold text-neutral-900 mb-3">
                CRI
              </h4>
              {["70 и ниже", "80", "90"].map((cri) => (
                <label
                  key={cri}
                  className="flex items-center justify-between text-xs text-neutral-600 py-1 cursor-pointer"
                >
                  <span>{cri}</span>
                  <input
                    type="checkbox"
                    checked={filters.cri.includes(cri)}
                    onChange={() => handleCheckboxChange("cri", cri)}
                    className="w-4 h-4 rounded border-neutral-300 accent-[#22c55e] cursor-pointer"
                  />
                </label>
              ))}
            </div>

            <div>
              <h4 className="text-xs font-semibold text-neutral-900 mb-3">
                Управление
              </h4>
              {["DALI", "1-10V"].map((control) => (
                <label
                  key={control}
                  className="flex items-center justify-between text-xs text-neutral-600 py-1 cursor-pointer"
                >
                  <span>{control}</span>
                  <input
                    type="checkbox"
                    checked={filters.control.includes(control)}
                    onChange={() => handleCheckboxChange("control", control)}
                    className="w-4 h-4 rounded border-neutral-300 accent-[#22c55e] cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-4 mb-8 text-xs">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-neutral-400">Сортировка:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-medium text-neutral-900 cursor-pointer outline-none"
                >
                  <option>по типу</option>
                  <option>по мощности</option>
                  <option>по световому потоку</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded ${
                  viewMode === "grid"
                    ? "text-[#22c55e] bg-neutral-100"
                    : "text-neutral-400"
                }`}
              >
                ⊞
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded ${
                  viewMode === "list"
                    ? "text-[#22c55e] bg-neutral-100"
                    : "text-neutral-400"
                }`}
              >
                ☰
              </button>
            </div>
          </div>

          {paginatedProducts.length === 0 ? (
            <div className="py-20 text-center text-neutral-400 text-sm">
              Ничего не найдено по вашему запросу.
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProject(product)}
                  className="group cursor-pointer bg-white border border-neutral-100 rounded-xl p-4 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="relative bg-[#fafafa] rounded-lg overflow-hidden border border-neutral-100 w-full h-64 mb-4">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      unoptimized
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium block mb-1 text-[#22c55e]">
                      {product.status}
                    </span>
                    <h3 className="text-xs font-medium text-neutral-900 leading-snug mb-3">
                      {product.title}
                    </h3>
                    <div className="text-[10px] text-neutral-400 space-y-0.5 mb-3">
                      <p>Мощность: {product.power} Вт</p>
                      <p>Поток: {product.flux} Лм</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                    <span className="text-xs font-semibold text-neutral-900">
                      {product.price}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-[#22c55e] text-white flex items-center justify-center text-xs font-bold">
                      ›
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProductDetail
            product={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function BusinessCatalog50() {
  return (
    <Suspense
      fallback={
        <div className="p-12 text-center text-neutral-400">Загрузка...</div>
      }
    >
      <CatalogContent />
    </Suspense>
  );
}
