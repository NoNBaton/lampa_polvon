import React from "react";

export default function UltimateLoading() {
  return (
    <div className="relative min-h-[70vh] w-full flex flex-col items-center justify-center p-6 font-sans overflow-hidden">
      {/* Задний фоновый градиент с размытием (Glow Effect) */}
      <div className="absolute w-72 h-72 bg-[#22c55e]/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <div className="relative flex flex-col items-center space-y-8 z-10">
        {/* Космическая многослойная система орбит */}
        <div className="relative flex items-center justify-center w-24 h-24">
          {/* Внешнее пульсирующее неоновое кольцо */}
          <div className="absolute inset-0 rounded-full border-2 border-[#22c55e]/20 animate-ping opacity-75" />

          {/* Внешний быстрый спиннер с градиентом */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#22c55e] border-r-[#22c55e]/40 animate-[spin_1s_linear_infinite] shadow-[0_0_15px_rgba(34,197,94,0.3)]" />

          {/* Средний реверсивный спиннер */}
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-[#10b981] border-l-[#10b981]/30 animate-[spin_1.5s_linear_infinite_reverse]" />

          {/* Внутреннее пульсирующее ядро */}
          <div className="w-6 h-6 bg-gradient-to-tr from-[#22c55e] to-[#86efac] rounded-full animate-pulse shadow-[0_0_20px_#22c55e]" />
        </div>

        {/* Текстовый блок */}
        <div className="flex flex-col items-center space-y-2">
          <p className="text-sm font-semibold text-gray-200 tracking-[0.3em] uppercase bg-gradient-to-r from-gray-200 via-[#86efac] to-gray-400 bg-clip-text text-transparent animate-pulse">
            Загрузка системы
          </p>

          {/* Индикатор прогресса в виде точечек */}
          <div className="flex space-x-1.5">
            <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
