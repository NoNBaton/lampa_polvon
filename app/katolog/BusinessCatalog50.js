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

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

  // Загрузка истории поиска
  useEffect(() => {
    try {
      const saved = localStorage.getItem("search_history");
      if (saved) setHistory(JSON.parse(saved));
    } catch (e) {
      console.error("Error loading search history:", e);
    }
  }, []);

  // Сохранение в историю
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
        console.error(e);
      }
      return updated;
    });
  }, []);

  // Удаление из истории
  const removeFromHistory = (e, itemToRemove) => {
    e.stopPropagation();
    setHistory((prev) => {
      const updated = prev.filter((item) => item !== itemToRemove);
      try {
        localStorage.setItem("search_history", JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem("search_history");
    } catch (e) {
      console.error(e);
    }
  };

  // Обновление URL
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== (searchParams.get("search") || "")) {
        updateUrlQuery(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, updateUrlQuery, searchParams]);

  // ЖИВОЙ ПОИСК ЧЕРЕЗ API С ДЕБАУНСОМ
  useEffect(() => {
    const rawQuery = searchQuery.trim();
    if (!rawQuery) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
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
    }, 150); // Быстрый живой отклик

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Управление клавиатурой (стрелки и ввод)
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

  // Закрытие по клику вне компонента
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`${styles.searchContainer} flex-1 max-w-3xl mx-4 relative`}
      ref={searchRef}
    >
      <div className="flex items-center w-full relative group">
        <input
          type="text"
          placeholder="Поиск светильников..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className="peer w-full pl-10 pr-9 py-2.5 text-xs bg-neutral-50/80 focus:bg-white border border-neutral-200 focus:border-[#22c55e] rounded-full outline-none transition-all duration-300 shadow-sm focus:shadow-lg focus:shadow-emerald-500/10 transform focus:-translate-y-0.5 focus:scale-[1.005]"
        />

        <svg
          className="absolute left-3.5 w-4 h-4 text-neutral-400 peer-focus:text-[#22c55e] transition-colors duration-300 pointer-events-none"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3.5 text-xs text-neutral-400 hover:text-neutral-700 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {/* Выпадающий блок живого поиска и истории */}
      {isOpen && (searchQuery.trim() !== "" || history.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md border border-neutral-100 rounded-2xl shadow-2xl z-50 overflow-hidden divide-y divide-neutral-100 animate-in fade-in slide-in-from-top-2 duration-200">
          {searchQuery.trim() !== "" ? (
            <div className="p-2">
              <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-3 py-1 flex justify-between items-center">
                <span>
                  {isLoading
                    ? "Ищем..."
                    : `Результаты живого поиска (${searchResults.length})`}
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
                    Смотреть все ›
                  </Link>
                )}
              </div>

              {searchResults.length > 0
                ? searchResults.map((product, index) => (
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
                  ))
                : !isLoading && (
                    <div className="p-4 text-center">
                      <p className="text-xs text-neutral-500">
                        Ничего не найдено
                      </p>
                    </div>
                  )}
            </div>
          ) : (
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
