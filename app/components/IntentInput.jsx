"use client";

import { useEffect, useRef, useState } from "react";
import {
  Lightbulb,
  PencilLine,
  Sparkles,
  Mic,
  Square,
  Loader2,
  UserRound,
} from "lucide-react";

export default function IntentInput({
  onRelationshipChange,
  setShowResult,
  setLoadingResult,
}) {
  const [relationship, setRelationship] = useState("");
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMicSupported, setIsMicSupported] = useState(false);

  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);

  const maxLength = 1000;

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    requestAnimationFrame(() => {
      setIsMicSupported(Boolean(SpeechRecognition));
    });
  }, []);

  const stopMic = () => {
    clearTimeout(silenceTimerRef.current);
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setListening(false);
  };

  const handleMic = () => {
    if (!isMicSupported) {
      alert("المتصفح لا يدعم التسجيل الصوتي. جرّب Chrome.");
      return;
    }

    if (listening) {
      stopMic();
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "ar-EG";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setListening(true);

      silenceTimerRef.current = setTimeout(() => {
        stopMic();
      }, 5000);
    };

    recognition.onresult = (event) => {
      clearTimeout(silenceTimerRef.current);

      silenceTimerRef.current = setTimeout(() => {
        stopMic();
      }, 5000);

      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += transcript + " ";
        }
      }

      if (finalText.trim()) {
        setText((prev) => `${prev} ${finalText}`.trim());
      }
    };

    recognition.onerror = () => {
      stopMic();
    };

    recognition.onend = () => {
      clearTimeout(silenceTimerRef.current);
      recognitionRef.current = null;
      setListening(false);
    };

    recognition.start();
  };

  const handleAnalyze = () => {
    if (!text.trim() || !relationship.trim() || loading) return;

    stopMic();

    setLoading(true);
    setLoadingResult(true);
    setShowResult(false);
    setTimeout(() => {
      document
        .getElementById("analysis-result")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    setTimeout(() => {
      setLoading(false);
      setLoadingResult(false);
      setShowResult(true);
    }, 1800);
  };
  return (
    <div dir="rtl" className="w-full max-w-6xl px-1 sm:px-0">
      <div
        className="
          animate-fade-up w-full rounded-[22px] border p-4 backdrop-blur-2xl
          border-slate-200/70 bg-[var(--surface-main)]
          shadow-[0_0_80px_rgba(168,85,247,0.12)]
          sm:rounded-[28px] sm:p-6
          dark:border-white/10 dark:bg-[#070b1d]/50
          dark:shadow-[0_0_90px_rgba(124,58,237,0.18)]
        "
      >
        <div className="mb-4 flex items-center justify-between sm:mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-300">
              <PencilLine size={20} />
            </div>

            <h3 className="text-lg font-black text-slate-900 dark:text-white sm:text-2xl">
              اكتب الموقف هنا
            </h3>
          </div>

          <button
            onClick={handleMic}
            disabled={!isMicSupported || loading}
            className={`
              relative flex h-12 w-12 items-center justify-center rounded-2xl
              transition-all duration-300
              cursor-pointer disabled:cursor-not-allowed disabled:opacity-50
              ${
                listening
                  ? "bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)]"
                  : "bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-[0_0_28px_rgba(168,85,247,0.45)]"
              }
            `}
          >
            {listening && (
              <span className="absolute inset-0 animate-ping rounded-2xl bg-red-400/40" />
            )}

            {listening ? <Square size={18} /> : <Mic size={20} />}
          </button>
        </div>

        <div className="mb-4">
          <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
            <UserRound size={17} className="text-purple-500" />
            علاقتك بالشخص
          </label>

          <input
            type="text"
            value={relationship}
            disabled={loading}
            onChange={(e) => {
              setRelationship(e.target.value);
              onRelationshipChange(e.target.value);
            }}
            placeholder="مثال: صاحب، زميل، مدير، حبيب، قريب..."
            className="
              h-12 w-full rounded-2xl border bg-[var(--surface-card)] px-4 text-sm font-medium
              text-slate-900 outline-none placeholder:text-slate-400
              border-slate-300/70 transition
              focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/15
              disabled:opacity-60
              dark:border-white/10 dark:bg-[#080d20]/45
              dark:text-white dark:placeholder:text-slate-500
            "
          />
        </div>

        <div
          className="
            relative rounded-[20px] border transition-all duration-500
            border-slate-300/70 bg-[var(--surface-card)]
            dark:border-white/10 dark:bg-[#080d20]/45
          "
        >
          <textarea
            value={text}
            maxLength={maxLength}
            disabled={loading}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAnalyze();
              }
            }}
            placeholder={
              listening
                ? "أنا أسمعك... احكي الموقف"
                : "اكتب ما حدث أو ما قيل..."
            }
            className="
              min-h-[135px] w-full resize-none bg-transparent
              p-4 text-base leading-7 text-slate-900 outline-none
              placeholder:text-slate-400 disabled:opacity-60
              sm:min-h-[190px] sm:p-6 sm:text-lg sm:leading-8
              dark:text-white dark:placeholder:text-slate-500
            "
          />

          <div className="absolute bottom-4 left-4 text-xs font-medium text-slate-500 dark:text-slate-400">
            {text.length} / {maxLength}
          </div>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
          <button
            onClick={handleAnalyze}
            disabled={loading || !text.trim() || !relationship.trim()}
            className="
              flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl
              bg-gradient-to-l from-blue-500 via-purple-500 to-fuchsia-600
              px-8 text-lg font-black text-white
              shadow-[0_0_35px_rgba(168,85,247,0.38)]
              transition hover:scale-[1.02]
              disabled:cursor-not-allowed disabled:opacity-60
              md:w-[320px]
            "
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                جاري التحليل
              </>
            ) : (
              <>
                <Sparkles size={20} />
                حلّل النية
              </>
            )}
          </button>

          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <Lightbulb size={18} />
            <span>كلما زادت التفاصيل، كان التحليل أدق.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
