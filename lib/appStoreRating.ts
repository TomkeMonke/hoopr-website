import "server-only";

const APP_STORE_ID = "6761615321";
// Storefronts where Hoopr has ratings today; the iTunes lookup API has no
// worldwide aggregate, so we weight the ones that matter by rating count.
const STOREFRONTS = ["pl", "us"] as const;
// Shown when the lookup fails or returns no ratings, so the homepage never
// renders without a rating.
const FALLBACK_RATING = 4.7;
const REVALIDATE_SECONDS = 60 * 60 * 12;

interface StorefrontRating {
  rating: number;
  count: number;
}

async function fetchStorefront(country: string): Promise<StorefrontRating | null> {
  const res = await fetch(
    `https://itunes.apple.com/lookup?id=${APP_STORE_ID}&country=${country}`,
    { next: { revalidate: REVALIDATE_SECONDS } },
  );
  if (!res.ok) return null;
  const data = await res.json();
  const app = data?.results?.[0];
  const rating = Number(app?.averageUserRating);
  const count = Number(app?.userRatingCount);
  if (!Number.isFinite(rating) || rating <= 0) return null;
  if (!Number.isFinite(count) || count <= 0) return null;
  return { rating, count };
}

/**
 * Live App Store rating as a count-weighted average across storefronts,
 * rounded to one decimal (e.g. 4.8). Cached via ISR for 12 hours.
 */
export async function getAppStoreRating(): Promise<number> {
  try {
    const storefronts = (
      await Promise.all(STOREFRONTS.map((c) => fetchStorefront(c).catch(() => null)))
    ).filter((s): s is StorefrontRating => s !== null);
    if (storefronts.length === 0) return FALLBACK_RATING;
    const totalCount = storefronts.reduce((sum, s) => sum + s.count, 0);
    const weighted =
      storefronts.reduce((sum, s) => sum + s.rating * s.count, 0) / totalCount;
    return Math.min(5, Math.round(weighted * 10) / 10);
  } catch {
    return FALLBACK_RATING;
  }
}
