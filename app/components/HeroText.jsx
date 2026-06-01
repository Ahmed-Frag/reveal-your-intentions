export default function HeroText() {
  return (
    <div dir="rtl" className="animate-fade-up mb-12 max-w-4xl text-center">
      <h2 className="text-4xl font-black leading-[1.2] tracking-tight text-slate-950 sm:text-5xl md:text-7xl dark:text-white">
        افهم{" "}
        <span className="bg-gradient-to-l from-blue-600 via-purple-600 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(168,85,247,0.25)] dark:from-fuchsia-500 dark:via-purple-300 dark:to-blue-200 dark:drop-shadow-[0_0_12px_rgba(216,180,254,0.55)]">
          وش يقصد
        </span>{" "}
        فعلًا؟
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-slate-700 sm:text-xl md:text-2xl dark:text-slate-300">
        حلّل أي موقف، واكتشف الرسالة الحقيقية
        <br />
        قبل ما تختار ردك.
      </p>
    </div>
  );
}
