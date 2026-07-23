import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { isLocale } from "@/lib/locales";
import { BRAND } from "@/lib/brand";

export const alt = "Hoopr - football training that knows your position";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COPY = {
  en: {
    headline: "Stop playing.\nStart dominating.",
    sub: "Football training that knows your position.",
  },
  pl: {
    headline: "Przestań tylko grać.\nZacznij dominować.",
    sub: "Trening piłkarski pod twoją pozycję.",
  },
} as const;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const copy = isLocale(locale) ? COPY[locale] : COPY.en;

  const logoData = await readFile(
    join(process.cwd(), "public", "logo-full.png"),
    "base64",
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            `radial-gradient(1200px 800px at 80% -10%, rgba(${BRAND.primaryRgb},0.22), transparent 60%), radial-gradient(1000px 700px at -10% 20%, rgba(${BRAND.primaryRgb},0.14), transparent 60%), #0a0a0a`,
          color: "#eaeaef",
          padding: "72px 88px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <img src={logoSrc} width={280} alt="" style={{ display: "block" }} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.0,
              whiteSpace: "pre-wrap",
              color: "white",
            }}
          >
            {copy.headline}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 32,
              color: "rgba(234,234,239,0.65)",
              letterSpacing: "-0.01em",
            }}
          >
            {copy.sub}
          </div>
          <div
            style={{
              marginTop: 36,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                height: 4,
                width: 64,
                background: BRAND.primary,
                borderRadius: 999,
              }}
            />
            <div
              style={{
                fontSize: 22,
                color: "rgba(234,234,239,0.55)",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              getdrillr.app
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
