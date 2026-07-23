"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import type { Locale } from "@/lib/locales";

interface Props {
  dict: Dictionary;
  locale: Locale;
}

// Per-step accent tints (step 1 uses the Hoopr primary orange). Hex form is
// required because the values get an alpha suffix appended (e.g. `${accent}55`).
const ACCENTS = ["#F2711C", "#E8A44A", "#8BD17C"];

const SCREENSHOTS_BY_LOCALE: Record<Locale, string[]> = {
  en: [
    "/screenshots/story-01-position-pick.png",
    "/screenshots/story-02-train.png",
    "/screenshots/story-03-progress.png",
  ],
  pl: [
    "/screenshots/story-01-position-pick-pl.png",
    "/screenshots/story-02-train-pl.png",
    "/screenshots/story-03-progress-pl.png",
  ],
};

export function StickyStory({ dict, locale }: Props) {
  const SCREENSHOTS = SCREENSHOTS_BY_LOCALE[locale];
  const steps = dict.story.steps;
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;
    const compute = () => {
      ticking = false;
      const vCenter = window.innerHeight / 2;
      let bestI = 0;
      let bestDist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - vCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestI = i;
        }
      });
      setActive(bestI);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="relative py-24 lg:py-32 border-y border-white/5 bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="text-xs uppercase tracking-[0.2em] text-primary/80 mb-3">
            {dict.story.eyebrow}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {dict.story.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28 flex justify-center">
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 blur-3xl rounded-[3rem] opacity-60 transition-colors duration-700"
                style={{
                  background: `radial-gradient(closest-side, ${ACCENTS[active]}55, transparent)`,
                }}
              />
              <div className="relative mx-auto w-[260px] sm:w-[300px] aspect-[9/19] rounded-[2.75rem] bg-gradient-to-b from-[#1a1a1f] to-[#0a0a0a] border border-white/25 shadow-2xl shadow-black/50 p-2.5">
                <div className="relative w-full h-full rounded-[2.25rem] overflow-hidden bg-[#111113]">
                  {steps.map((step, i) => (
                    <div
                      key={i}
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{ opacity: i === active ? 1 : 0 }}
                    >
                      <Image
                        src={SCREENSHOTS[i] ?? SCREENSHOTS[0]}
                        alt={step.title}
                        fill
                        sizes="(min-width: 640px) 300px, 260px"
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-24 lg:gap-40 lg:pt-12 lg:pb-24">
            {steps.map((step, i) => {
              const accent = ACCENTS[i] ?? ACCENTS[0];
              return (
                <div
                  key={i}
                  data-index={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  className="transition-opacity duration-500"
                  style={{ opacity: i === active ? 1 : 0.4 }}
                >
                  <div
                    className="text-xs uppercase tracking-[0.2em] mb-3"
                    style={{ color: accent }}
                  >
                    {step.eyebrow}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                    {step.title}
                  </h3>
                  <p className="mt-5 text-lg text-white/65 leading-relaxed max-w-lg">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
