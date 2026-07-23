import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/locales";
import type { Dictionary } from "@/app/[locale]/dictionaries";
import { DownloadBadges } from "./DownloadBadges";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: Props) {
  const base = `/${locale}`;
  const nav = [
    { href: base, label: dict.nav.home },
    { href: `${base}#faq`, label: dict.nav.faq },
    { href: `${base}/press`, label: dict.nav.press },
    { href: `${base}/feedback`, label: dict.nav.feedback },
    { href: `${base}/support`, label: dict.nav.support },
    { href: `${base}/manage-subscription`, label: dict.nav.manageSubscription },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/5">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 h-14 sm:h-16 lg:h-[72px] xl:h-20 2xl:h-24 flex items-center justify-between gap-6">
        <Link href={base} className="flex items-center shrink-0" aria-label="Hoopr">
          <Image
            src="/logo-full.png"
            alt="Hoopr"
            width={660}
            height={207}
            priority
            sizes="(max-width: 640px) 96px, (max-width: 1024px) 112px, (max-width: 1280px) 128px, (max-width: 1536px) 144px, 160px"
            className="h-7 w-auto sm:h-8 md:h-9 lg:h-10 xl:h-11 2xl:h-12 logo-hover"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm lg:text-[15px] text-white/70">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher current={locale} />
          <div className="hidden lg:block">
            <DownloadBadges labels={dict.common} size="sm" />
          </div>
          <MobileNav nav={nav} />
        </div>
      </div>
    </header>
  );
}
