"use client";

import { useEffect, useState } from "react";
import { Info, Moon, Sun, Brain } from "lucide-react";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const darkMode = saved ? saved === "dark" : true;

    document.documentElement.classList.toggle("dark", darkMode);

    requestAnimationFrame(() => {
      setIsDark(darkMode);
      setMounted(true);
    });
  }, []);

  const toggleTheme = () => {
    const next = !isDark;

    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  if (!mounted) return null;

  return (
    <>
      {isDark !== null && (
        <div
          className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-500"
          style={{
            backgroundImage: `url(${
              isDark ? "/images/hero-bg-dark.png" : "/images/hero-bg-light.png"
            })`,
          }}
        />
      )}
      <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
        <nav className="mx-auto flex h-[78px] max-w-6xl flex-row-reverse items-center justify-between rounded-full border border-white/60 bg-white/55 px-4 shadow-[0_20px_70px_rgba(15,23,42,0.18)] backdrop-blur-2xl md:px-7 dark:border-white/10 dark:bg-white/10">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="bg-gradient-to-l from-slate-950 via-purple-600 to-blue-600 bg-clip-text text-xl font-black text-transparent md:text-2xl dark:from-white dark:via-purple-200 dark:to-purple-500">
                افضح نيتك
              </h1>

              <p className="mt-1 text-xs text-slate-600 md:text-sm dark:text-slate-300">
                حلّل. افهم. بذكاء.
              </p>
            </div>

            <div className="relative">
              <Brain size={42} strokeWidth={2.35} className="text-blue-500" />
              <Brain
                size={42}
                strokeWidth={2.35}
                className="absolute inset-0 text-purple-500 [clip-path:inset(0_0_0_50%)]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                onClick={() => setAboutOpen((v) => !v)}
                className="flex h-11 cursor-pointer items-center gap-2 rounded-full border border-purple-500/30 bg-white/35 px-4 text-sm font-bold text-purple-700 backdrop-blur-xl transition hover:bg-purple-500/10 md:h-12 md:px-6 dark:border-purple-500/40 dark:bg-white/5 dark:text-purple-300 dark:hover:bg-purple-500/15"
              >
                <Info size={18} />
                <span className="hidden sm:inline">عن الأداة</span>
              </button>

              <div
                className={`absolute right-0 top-[58px] w-[300px] rounded-3xl border border-[var(--surface-border)] bg-white/80 p-5 text-right shadow-[0_25px_80px_rgba(124,58,237,0.22)] backdrop-blur-2xl transition-all duration-300 dark:border-purple-500/20 dark:bg-[#070b1d]/80 ${
                  aboutOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-3 opacity-0"
                }`}
              >
                <div className="mb-3 flex items-center gap-2 text-purple-600 dark:text-purple-300">
                  <Info size={18} />
                  <h3 className="font-black">عن أداة افضح نيتك</h3>
                </div>

                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">
                  أداة ذكية لتحليل المواقف الاجتماعية، تكشف لك المعنى المحتمل
                  خلف الكلام، وتساعدك تختار الرد الأنسب بدون تسرع.
                </p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[var(--surface-border)] bg-[var(--surface-card)] text-slate-800 backdrop-blur-xl transition hover:border-purple-400 hover:bg-white/70 md:h-12 md:w-12 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-purple-400/50 dark:hover:bg-purple-500/10"
              aria-label="تغيير الوضع"
            >
              {isDark === true ? <Sun size={21} /> : <Moon size={21} />}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
