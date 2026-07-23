import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import { FEATURES } from "@/lib/features";
import { POSITION_SLUGS } from "@/lib/positions";
import { DownloadBadges } from "./DownloadBadges";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: Props) {
  const base = `/${locale}`;
  const showTraining = FEATURES.positionPages;

  return (
    <footer className="mt-32 border-t border-white/5 bg-background/60">
      <div
        className={`mx-auto max-w-7xl px-5 lg:px-8 py-14 grid gap-10 ${
          showTraining ? "md:grid-cols-4" : "md:grid-cols-3"
        }`}
      >
        <div>
          <Link href={base} className="flex items-center mb-5" aria-label="Hoopr">
            <Image
              src="/logo-full.png"
              alt="Hoopr"
              width={660}
              height={207}
              sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, (max-width: 1280px) 144px, (max-width: 1536px) 160px, 176px"
              className="h-8 w-auto sm:h-9 md:h-10 lg:h-11 xl:h-12 2xl:h-[52px] logo-hover"
            />
          </Link>
          <p className="text-sm text-muted mb-5">{dict.footer.download}</p>
          <DownloadBadges labels={dict.common} size="sm" />
        </div>

        {showTraining && (
          <div>
            <h4 className="text-sm font-semibold mb-4">{dict.footer.training}</h4>
            <ul className="space-y-3 text-sm text-muted">
              {POSITION_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`${base}/training/${slug}`}
                    className="link-underline hover:text-white transition-colors"
                  >
                    {dict.positions[slug].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold mb-4">{dict.footer.legal}</h4>
          <ul className="space-y-3 text-sm text-muted">
            <li>
              <Link href={`${base}/privacy`} className="link-underline hover:text-white transition-colors">
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={`${base}/terms`} className="link-underline hover:text-white transition-colors">
                {dict.footer.terms}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">{dict.footer.company}</h4>
          <ul className="space-y-3 text-sm text-muted">
            <li>
              <Link href={`${base}#faq`} className="link-underline hover:text-white transition-colors">
                {dict.footer.faq}
              </Link>
            </li>
            <li>
              <Link href={`${base}/press`} className="link-underline hover:text-white transition-colors">
                {dict.footer.press}
              </Link>
            </li>
            <li>
              <Link href={`${base}/feedback`} className="link-underline hover:text-white transition-colors">
                {dict.footer.feedback}
              </Link>
            </li>
            <li>
              <Link href={`${base}/support`} className="link-underline hover:text-white transition-colors">
                {dict.footer.support}
              </Link>
            </li>
            <li>
              <Link href={`${base}/manage-subscription`} className="link-underline hover:text-white transition-colors">
                {dict.footer.manageSubscription}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-6 text-xs text-muted/70">
          {dict.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
