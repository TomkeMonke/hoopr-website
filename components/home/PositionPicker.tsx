"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import type { Locale } from "@/lib/locales";
import { FOCUS_CATEGORIES, POSITION_SLUGS, POSITIONS, type PositionSlug } from "@/lib/positions";

interface Props {
  dict: Dictionary;
  locale: Locale;
}

export function PositionPicker({ dict, locale }: Props) {
  const [active, setActive] = useState<PositionSlug>("point-guard");
  const pos = dict.positions[active];
  const data = POSITIONS[active];
  const t = dict.positionPicker;

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-sm uppercase tracking-widest text-primary font-semibold mb-3">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{t.title}</h2>
          <p className="mt-3 text-white/60 text-lg">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {POSITION_SLUGS.map((slug) => {
            const isActive = slug === active;
            const accent = POSITIONS[slug].accent;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => setActive(slug)}
                className={`rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${
                  isActive
                    ? "bg-surface border-transparent shadow-lg"
                    : "bg-surface/40 border-white/5 hover:bg-surface/80"
                }`}
                style={
                  isActive
                    ? { boxShadow: `0 0 0 1px ${accent}66, 0 20px 40px -20px ${accent}66` }
                    : undefined
                }
              >
                <div
                  className="h-8 w-8 rounded-lg mb-3 flex items-center justify-center text-xs font-bold transition-transform"
                  style={{
                    background: `${accent}22`,
                    color: accent,
                    transform: isActive ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {dict.positions[slug].name.charAt(0)}
                </div>
                <div className="font-semibold text-white">{dict.positions[slug].name}</div>
                <div className="text-[11px] font-medium tracking-[0.08em] text-white/45 mt-0.5">
                  {dict.positions[slug].codes}
                </div>
                <div className="text-xs text-white/50 mt-1">{dict.positions[slug].tagline}</div>
              </button>
            );
          })}
        </div>

        <div
          className="rounded-3xl border border-white/5 bg-surface/60 p-6 lg:p-10 grid md:grid-cols-2 gap-10 transition-[background] duration-500"
          style={{
            background: `linear-gradient(180deg, ${data.accent}08 0%, transparent 60%), rgba(20,20,26,0.6)`,
          }}
        >
          <div>
            <h3 className="text-sm uppercase tracking-widest text-white/50 mb-4">
              {t.focusBreakdown}
            </h3>
            <div className="space-y-4">
              {FOCUS_CATEGORIES.map((cat) => {
                const pct = data.focus[cat];
                return (
                  <div key={cat}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-white/80">{t.categoryLabels[cat]}</span>
                      <span className="text-white/60 tabular-nums">{pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                      <div
                        className="bar-shimmer h-full rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${pct}%`, background: data.accent }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div key={active} className="animate-hero-rise" style={{ animationDuration: "500ms" }}>
            <h3 className="text-sm uppercase tracking-widest text-white/50 mb-4">
              {t.sampleDrills}
            </h3>
            <ul className="space-y-2.5">
              {pos.drills.map((drill) => (
                <li
                  key={drill.name}
                  className="flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/5 px-4 py-3"
                >
                  <span className="text-white/90">{drill.name}</span>
                  <span className="text-xs text-white/50 tabular-nums shrink-0 ml-3">
                    {drill.spec}
                  </span>
                </li>
              ))}
            </ul>
            <Link
              href={`/${locale}/training/${active}`}
              className="group btn-shine mt-6 inline-flex items-center gap-2 rounded-xl bg-white text-black font-semibold px-5 py-3 hover:bg-white/90 hover:-translate-y-0.5 transition-all duration-200"
            >
              {t.viewPlan}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
