// app/components/IntentFirstResult.jsx
"use client";

import {
  FileText,
  Radar,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  X,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

export default function IntentFirstResult({ show = false }) {
  if (!show) return null;

  const signals = ["ردود مقتضبة", "تجنّب واضح", "لا مبادرة", "غموض"];

  const mistakes = [
    "لا تطارد الطرف الآخر بالأسئلة",
    "لا تبرر موقفك بسرعة",
    "لا تبالغ في تفسير كل كلمة",
  ];

  return (
    <div
      id="analysis-result"
      dir="rtl"
      className="scroll-mt-28 mt-8 w-full max-w-6xl animate-result-reveal px-1"
    >
      <div
        className="
          rounded-[26px] border p-[1px]
          border-purple-300/40
          bg-gradient-to-br from-purple-400/35 via-white/35 to-blue-400/25
          shadow-[0_18px_70px_rgba(15,23,42,0.12)]

          dark:border-purple-500/25
          dark:from-purple-500/30 dark:via-white/5 dark:to-blue-500/15
          dark:shadow-[0_0_80px_rgba(124,58,237,0.18)]
        "
      >
        <div
          className="
            rounded-[25px] border p-4 backdrop-blur-2xl
            border-[var(--surface-border)] bg-[var(--surface-main)]
            dark:border-white/10 dark:bg-[#070b1d]/75
            sm:p-5
          "
        >
          {/* Header */}
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-[0_0_28px_rgba(168,85,247,0.45)]">
                <Sparkles size={21} />
              </div>

              <div>
                <p className="text-[11px] font-bold text-purple-700 dark:text-purple-300">
                  نتيجة التحليل
                </p>

                <h2 className="text-xl font-black text-slate-950 dark:text-white sm:text-2xl">
                  فهم الموقف
                </h2>
              </div>
            </div>

            <span className="rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1.5 text-[11px] font-bold text-purple-700 dark:text-purple-200">
              مبدئي
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <ResultBlock
              icon={<FileText size={17} />}
              title="وش الصورة الكاملة؟"
              highlight
            >
              الشخص لا يعطي تفاعلًا واضحًا، وردوده تبدو قصيرة أو غير حاسمة، مما
              يجعل الموقف محتاج قراءة هادئة قبل أي رد.
            </ResultBlock>

            <ResultBlock icon={<Radar size={17} />} title="إيش اللي واضح هنا؟ ">
              <div className="flex flex-wrap gap-2">
                {signals.map((item) => (
                  <span
                    key={item}
                    className="
                      rounded-full border border-purple-500/25 bg-purple-500/10
                      px-3 py-1.5 text-[11px] font-bold text-purple-700
                      dark:text-purple-200 sm:text-xs
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </ResultBlock>

            <MistakesBlock mistakes={mistakes} />

            <StrategyBlock />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultBlock({ icon, title, children, highlight = false }) {
  return (
    <div
      className={`
        rounded-2xl border p-4
        ${
          highlight
            ? "border-purple-500/25 bg-purple-500/10"
            : "border-slate-200/70 bg-[var(--surface-card)] dark:border-white/10 dark:bg-white/[0.04]"
        }
      `}
    >
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-700 dark:text-purple-300">
          {icon}
        </div>

        <h3 className="text-sm font-black text-slate-950 dark:text-white sm:text-base">
          {title}
        </h3>
      </div>

      <div className="text-xs leading-6 text-slate-700 dark:text-slate-300 sm:text-sm">
        {children}
      </div>
    </div>
  );
}

function MistakesBlock({ mistakes }) {
  return (
    <div
      className="
        relative overflow-hidden rounded-2xl border p-4
        border-rose-400/30 bg-rose-500/10
        shadow-[0_0_35px_rgba(244,63,94,0.10)]
        dark:border-rose-400/25 dark:bg-rose-500/10
      "
    >
      <div className="absolute -left-10 -top-10 h-28 w-28 rounded-full bg-rose-500/20 blur-[45px]" />

      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/15 text-rose-500 dark:text-rose-300">
            <ShieldAlert size={18} />
          </div>

          <h3 className="text-sm font-black text-rose-700 dark:text-rose-200 sm:text-base">
            انتبه لا تسوي كذا
          </h3>
        </div>

        <div className="space-y-2.5">
          {mistakes.map((item) => (
            <div
              key={item}
              className="
                flex items-start gap-2 rounded-xl border border-rose-400/20
                bg-white/35 p-2.5 dark:bg-white/[0.04]
              "
            >
              <X size={15} className="mt-1 shrink-0 text-rose-500" />
              <p className="text-xs font-bold leading-6 text-rose-800 dark:text-rose-100 sm:text-sm">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StrategyBlock() {
  return (
    <div
      className="
        relative overflow-hidden rounded-2xl border p-4
        border-emerald-400/30 bg-emerald-500/10
        shadow-[0_0_35px_rgba(16,185,129,0.12)]
        dark:border-emerald-400/25 dark:bg-emerald-500/10
      "
    >
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-500/20 blur-[45px]" />

      <div className="relative z-10">
        <div className="mb-3 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
            <Lightbulb size={18} />
          </div>

          <h3 className="text-sm font-black text-emerald-700 dark:text-emerald-200 sm:text-base">
            وش الحركة الأذكى؟
          </h3>
        </div>

        <div className="rounded-xl border border-emerald-400/20 bg-white/35 p-3 dark:bg-white/[0.04]">
          <div className="flex items-start gap-2">
            <CheckCircle2
              size={17}
              className="mt-1 shrink-0 text-emerald-500"
            />
            <p className="text-xs font-bold leading-6 text-emerald-900 dark:text-emerald-100 sm:text-sm">
              حافظ على هدوءك، قلّل اندفاعك، وخلي ردك قصير وواثق لحد ما الطرف
              الآخر يوضح موقفه الحقيقي.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
