"use client";

import { useState } from "react";
import {
  Copy,
  Check,
  Sparkles,
  Flame,
  Leaf,
  Snowflake,
  MessageSquareText,
  Mic2,
  Crown,
} from "lucide-react";

const variants = {
  smart: {
    label: "الأذكى",
    icon: Crown,
    tone: "اختيار مناسب للموقف",
    written: "فاهم قصدك، بس محتاج توضحها بشكل مباشر عشان ما أفهمش الموضوع غلط.",
    face: "قوله بهدوء: فاهمك، بس وضّح قصدك أكتر عشان أرد عليك صح.",
  },
  strong: {
    label: "أقوى",
    icon: Flame,
    tone: "يثبت حدودك",
    written:
      "لو في حاجة واضحة قولها مباشرة، لأن الكلام بالطريقة دي ممكن يتفهم غلط.",
    face: "قوله بثبات: خلينا واضحين، إيه اللي تقصده بالضبط؟",
  },
  calm: {
    label: "أهدى",
    icon: Leaf,
    tone: "يهدّي الموقف",
    written: "ممكن تكون تقصد حاجة عادية، بس حابب أفهم قصدك قبل ما أحكم.",
    face: "قوله بنبرة هادية: ممكن توضحلي قصدك؟ يمكن أنا فهمت غلط.",
  },
  cold: {
    label: "أبرد",
    icon: Snowflake,
    tone: "يقفل الكلام بهدوء",
    written: "تمام، وصلت فكرتك.",
    face: "قوله بهدوء قصير: تمام، فهمت.",
  },
};

export default function SmartReplyCard({ show = false }) {
  const [selected, setSelected] = useState("smart");
  const [loadingVariant, setLoadingVariant] = useState(false);
  const [copied, setCopied] = useState("");

  if (!show) return null;

  const current = variants[selected];
  const Icon = current.icon;

  const handleSelect = (key) => {
    if (key === selected || loadingVariant) return;

    setLoadingVariant(true);
    setCopied("");

    setTimeout(() => {
      setSelected(key);
      setLoadingVariant(false);
    }, 700);
  };

  const copy = async (text, type) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 1200);
  };

  return (
    <div
      dir="rtl"
      className="mt-2 w-full max-w-6xl animate-result-reveal px-1 pb-20"
    >
      <div className="rounded-[28px] border border-purple-400/30 bg-gradient-to-br from-purple-500/30 via-white/25 to-blue-500/20 p-[1px] shadow-[0_22px_90px_rgba(124,58,237,0.18)] dark:border-purple-500/25 dark:via-white/5">
        <div className="rounded-[27px] border border-[var(--surface-border)] bg-[var(--surface-main)] p-4 backdrop-blur-2xl dark:border-white/10 dark:bg-[#070b1d]/80 sm:p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-[0_0_30px_rgba(168,85,247,0.45)]">
                <Sparkles size={21} />
              </div>

              <div>
                <p className="text-[11px] font-bold text-purple-700 dark:text-purple-300">
                  الخطوة العملية
                </p>
                <h2 className="text-xl font-black text-slate-950 dark:text-white sm:text-2xl">
                  الرد المقترح
                </h2>
              </div>
            </div>

            <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-black text-emerald-700 dark:text-emerald-200">
              جاهز
            </span>
          </div>

          <div className="rounded-[24px] border border-purple-500/25 bg-purple-500/10 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                  <Icon size={18} />
                </div>

                <div>
                  <h3 className="text-base font-black text-slate-950 dark:text-white">
                    {current.label}
                  </h3>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    {loadingVariant ? "جاري تجهيز الصياغة..." : current.tone}
                  </p>
                </div>
              </div>
            </div>

            {loadingVariant ? (
              <ReplySkeleton />
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                <ReplyBox
                  icon={<MessageSquareText size={17} />}
                  title="رسالة جاهزة"
                  text={current.written}
                  copied={copied === "written"}
                  onCopy={() => copy(current.written, "written")}
                />

                <ReplyBox
                  icon={<Mic2 size={17} />}
                  title="إذا بتقوله مباشرة"
                  text={current.face}
                  copied={copied === "face"}
                  onCopy={() => copy(current.face, "face")}
                />
              </div>
            )}
          </div>

          <div className="mt-4">
            <p className="mb-2 text-xs font-bold text-slate-600 dark:text-slate-400">
              جرّب نبرة مختلفة
            </p>

            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {Object.entries(variants).map(([key, item]) => {
                const VariantIcon = item.icon;
                const active = selected === key;

                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    disabled={loadingVariant}
                    className={`
                      flex items-center justify-center gap-2 rounded-2xl border px-3 py-3
                      text-xs font-black transition sm:text-sm cursor-pointer
                      disabled:cursor-not-allowed disabled:opacity-70
                      ${
                        active
                          ? "border-purple-500/45 bg-purple-500/15 text-purple-700 shadow-[0_0_24px_rgba(168,85,247,0.16)] dark:text-purple-200"
                          : "border-[var(--surface-border)] bg-[var(--surface-card)] text-slate-700 hover:border-purple-500/30 hover:bg-purple-500/10 dark:text-slate-300"
                      }
                    `}
                  >
                    <VariantIcon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReplySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="
        rounded-2xl border border-[var(--surface-border)]
        bg-[var(--surface-card)]
        p-4
        dark:border-white/10 dark:bg-white/[0.04]
        min-w-0 overflow-hidden
      "
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="shimmer h-8 w-8 rounded-xl bg-purple-500/15" />
              <div className="shimmer h-4 w-24 sm:w-32 rounded-full bg-white/50 dark:bg-white/10" />
            </div>

            <div className="shimmer h-8 w-12 sm:w-16 rounded-xl bg-purple-500/15" />
          </div>

          <div className="space-y-2 min-w-0 overflow-hidden">
            <div className="shimmer h-3 w-full rounded-full bg-white/50 dark:bg-white/10" />
            <div className="shimmer h-3 w-5/6 rounded-full bg-white/50 dark:bg-white/10" />
            <div className="shimmer h-3 w-2/3 rounded-full bg-white/50 dark:bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ReplyBox({ icon, title, text, copied, onCopy }) {
  return (
    <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10">
            {icon}
          </div>
          <h4 className="text-sm font-black text-slate-950 dark:text-white">
            {title}
          </h4>
        </div>

        <button
          onClick={onCopy}
          className="flex h-8 items-center gap-1.5 rounded-xl border border-purple-500/20 bg-white/35 px-3 text-xs font-black text-purple-700 transition hover:bg-purple-500/10 dark:bg-white/[0.04] dark:text-purple-200 cursor-pointer"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "اتنسخ" : "نسخ"}
        </button>
      </div>

      <p className="text-sm font-bold leading-7 text-slate-900 dark:text-white sm:text-base">
        {text}
      </p>
    </div>
  );
}
