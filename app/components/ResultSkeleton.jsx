export default function ResultSkeleton() {
  return (
    <div
      id="analysis-result"
      dir="rtl"
      className="scroll-mt-28 mt-8 w-full max-w-6xl animate-fade-up px-1 pb-10"
    >
      <div
        className="
          rounded-[26px] border p-[1px]
          border-purple-300/40
          bg-gradient-to-br from-purple-400/35 via-white/35 to-blue-400/25
          shadow-[0_12px_36px_rgba(15,23,42,0.10)]
          dark:border-purple-500/25
          dark:from-purple-500/30 dark:via-white/5 dark:to-blue-500/15
          dark:shadow-[0_0_36px_rgba(124,58,237,0.14)]
        "
      >
        <div
          className="
            rounded-[25px] border p-4 backdrop-blur-md
            border-[var(--surface-border)] bg-[var(--surface-main)]
            dark:border-white/10 dark:bg-[#070b1d]/75
            sm:p-5
          "
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="shimmer h-11 w-11 rounded-2xl bg-purple-500/15" />

              <div className="space-y-2">
                <div className="shimmer h-3 w-24 rounded-full bg-purple-500/15" />
                <div className="shimmer h-6 w-36 rounded-full bg-white/50 dark:bg-white/10" />
              </div>
            </div>

            <div className="shimmer h-7 w-16 rounded-full bg-purple-500/15" />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="
                  rounded-2xl border p-4
                  border-slate-200/70 bg-[var(--surface-card)]
                  dark:border-white/10 dark:bg-white/[0.04]
                "
              >
                <div className="mb-3 flex items-center gap-2.5">
                  <div className="shimmer h-8 w-8 rounded-xl bg-purple-500/15" />
                  <div className="shimmer h-4 w-28 rounded-full bg-white/50 dark:bg-white/10" />
                </div>

                <div className="space-y-2">
                  <div className="shimmer h-3 w-full rounded-full bg-white/50 dark:bg-white/10" />
                  <div className="shimmer h-3 w-5/6 rounded-full bg-white/50 dark:bg-white/10" />
                  <div className="shimmer h-3 w-2/3 rounded-full bg-white/50 dark:bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
