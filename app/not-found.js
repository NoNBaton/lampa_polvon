"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function NotFound() {
  const canvasRef = useRef(null);
  const [show404, setShow404] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    // 1. Рисуем стартовый экран
    ctx.fillStyle = "#050b07";
    ctx.fillRect(0, 0, width, height);

    // Больше точек отправки трещин для паутины по всему экрану
    const cracks = [];
    const centers = [
      { x: 0, y: 0 },
      { x: width, y: 0 },
      { x: 0, y: height },
      { x: width, y: height },
      { x: width / 2, y: 0 },
      { x: width / 2, y: height },
      { x: 0, y: height / 2 },
      { x: width, y: height / 2 },
      { x: width / 2, y: height / 2 },
    ];

    centers.forEach((start) => {
      // От каждого центра пускаем по 2 ветки трещин
      for (let b = 0; b < 2; b++) {
        let current = { ...start };
        const path = [{ ...current }];
        const steps = 18 + Math.floor(Math.random() * 12);
        const targetX = width / 2 + (Math.random() - 0.5) * (width * 0.8);
        const targetY = height / 2 + (Math.random() - 0.5) * (height * 0.8);

        for (let i = 0; i < steps; i++) {
          current.x +=
            (targetX - current.x) * (1 / (steps - i)) +
            (Math.random() - 0.5) * 80;
          current.y +=
            (targetY - current.y) * (1 / (steps - i)) +
            (Math.random() - 0.5) * 80;
          path.push({ ...current });
        }
        cracks.push(path);
      }
    });

    let step = 0;
    let animationFrame;

    // Анимация прорисовки трещин
    const drawCracksAnimation = () => {
      ctx.fillStyle = "#050b07";
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "#15803d";
      ctx.lineWidth = 1.5;

      cracks.forEach((path) => {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i <= Math.min(step, path.length - 1); i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.stroke();
      });

      step++;

      if (step < 30) {
        animationFrame = requestAnimationFrame(drawCracksAnimation);
      } else {
        setTimeout(startShardsFalling, 200);
      }
    };

    // 2. Распад на более мелкие блоки / кубики
    let shardAnimFrame;
    const startShardsFalling = () => {
      // Увеличили количество колонок и рядов, чтобы кубики были заметно меньше
      const cols = 28;
      const rows = 18;
      const colWidth = width / cols;
      const rowHeight = height / rows;

      const shards = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          shards.push({
            x: c * colWidth,
            y: r * rowHeight,
            w: colWidth + 0.5,
            h: rowHeight + 0.5,
            vx: (c - cols / 2) * (Math.random() * 0.3 + 0.1),
            vy: Math.random() * 2 - 3,
            rotation: 0,
            vRot: (Math.random() - 0.5) * 0.08,
            gravity: 0.5 + Math.random() * 0.5,
          });
        }
      }

      const renderShards = () => {
        ctx.fillStyle = "#050b07";
        ctx.fillRect(0, 0, width, height);

        let activeShards = 0;

        shards.forEach((s) => {
          if (s.y < height + 100) {
            s.vy += s.gravity;
            s.x += s.vx;
            s.y += s.vy;
            s.rotation += s.vRot;
            activeShards++;

            ctx.save();
            ctx.translate(s.x + s.w / 2, s.y + s.h / 2);
            ctx.rotate(s.rotation);

            ctx.fillStyle = "#091c10";
            ctx.fillRect(-s.w / 2, -s.h / 2, s.w, s.h);

            ctx.strokeStyle = "#22c55e";
            ctx.lineWidth = 1;
            ctx.strokeRect(-s.w / 2, -s.h / 2, s.w, s.h);

            ctx.restore();
          }
        });

        if (activeShards === 0) {
          setTimeout(() => {
            setShow404(true);
          }, 100);
        } else {
          shardAnimFrame = requestAnimationFrame(renderShards);
        }
      };

      renderShards();
    };

    drawCracksAnimation();

    return () => {
      cancelAnimationFrame(animationFrame);
      cancelAnimationFrame(shardAnimFrame);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050b07] text-[#22c55e] p-4 font-mono overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ${
          show404 ? "opacity-0" : "opacity-100"
        }`}
      />

      <div
        className={`relative z-10 flex flex-col items-center text-center transition-all duration-700 transform ${
          show404
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-75 translate-y-10 pointer-events-none"
        }`}
      >
        <h1
          className="text-[25vw] md:text-[14rem] font-black text-[#22c55e] leading-none tracking-widest animate-pulse"
          style={{
            fontFamily: '"Courier New", Courier, monospace',
            textShadow: "8px 8px 0px #093818, -3px -3px 0px #000",
          }}
        >
          404
        </h1>

        <div className="p-5 bg-black border-4 border-[#22c55e] my-6 shadow-[8px_8px_0px_0px_#15803d] max-w-md text-left space-y-2">
          <div className="flex items-center justify-between border-b border-[#22c55e]/30 pb-2">
            <span className="text-xs font-bold text-[#86efac] uppercase tracking-widest">
              [ SYSTEM_COLLAPSED ]
            </span>
            <span className="w-2.5 h-2.5 bg-[#22c55e] animate-ping" />
          </div>
          <p className="text-sm font-bold text-[#86efac] tracking-wide">
            &gt; СТРУКТУРА ПОЛНОСТЬЮ РАССЫПАЛАСЬ.
          </p>
          <p className="text-xs text-gray-400">
            Все элементы интерфейса обрушились. Код страницы не найден.
          </p>
        </div>

        <Link
          href="/"
          className="px-8 py-4 bg-[#22c55e] text-black font-extrabold text-sm uppercase tracking-widest shadow-[6px_6px_0px_0px_#093818] hover:shadow-[2px_2px_0px_0px_#093818] hover:bg-[#86efac] active:translate-x-1 active:translate-y-1 transition-all"
          style={{ fontFamily: '"Courier New", Courier, monospace' }}
        >
          [ REBUILD / НА ГЛАВНУЮ ]
        </Link>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e0a_2px,transparent_2px),linear-gradient(to_bottom,#22c55e0a_2px,transparent_2px)] bg-[size:2rem_2rem] pointer-events-none" />
    </div>
  );
}
