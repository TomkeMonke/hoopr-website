interface Props {
  children?: React.ReactNode;
  className?: string;
  variant?: "primary" | "accent";
}

export function PhoneFrame({ children, className = "", variant = "primary" }: Props) {
  const glowColor =
    variant === "accent"
      ? "rgba(var(--accent-rgb), 0.35)"
      : "rgba(var(--primary-rgb), 0.35)";

  return (
    <div className={`relative animate-float ${className}`}>
      {/* Glow */}
      <div
        className="absolute inset-0 -z-10 blur-3xl rounded-[3rem] opacity-60"
        style={{ background: `radial-gradient(closest-side, ${glowColor}, transparent)` }}
      />
      {/* Frame */}
      <div className="relative mx-auto w-[280px] sm:w-[300px] md:w-[320px] aspect-[9/19] rounded-[2.75rem] bg-gradient-to-b from-[#1a1a1f] to-[#0a0a0a] border border-white/25 shadow-2xl shadow-black/50 p-2.5">
        <div className="relative w-full h-full rounded-[2.25rem] overflow-hidden bg-[#0a0a0a]">
          {/* Screen content */}
          <div className="absolute inset-0">{children ?? <PhonePlaceholder variant={variant} />}</div>
        </div>
      </div>
    </div>
  );
}

function PhonePlaceholder({ variant }: { variant: "primary" | "accent" }) {
  const accent = variant === "accent" ? "var(--accent)" : "var(--primary)";
  const accentGlow =
    variant === "accent"
      ? "rgba(var(--accent-rgb), 0.13)"
      : "rgba(var(--primary-rgb), 0.13)";
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-6 text-center"
         style={{
           background: `radial-gradient(120% 80% at 50% 0%, ${accentGlow}, transparent 60%), #0a0a0a`,
         }}>
      <div className="h-14 w-14 rounded-2xl flex items-center justify-center text-2xl font-bold"
           style={{ background: accent, color: "#0a0a0a" }}>
        H
      </div>
      <div className="text-xs uppercase tracking-widest text-white/40">Hoopr screen</div>
      <div className="text-sm text-white/60 max-w-[180px]">App screenshot will appear here</div>
    </div>
  );
}
