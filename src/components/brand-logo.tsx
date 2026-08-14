import { cn } from "@/lib/utils";

/**
 * SignalForge AI brand mark — a signal bolt forged inside a rounded square.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sf-logo-bg" x1="4" y1="3" x2="28" y2="29" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
        <linearGradient id="sf-logo-bolt" x1="16" y1="6" x2="16" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DBEAFE" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="8.5" fill="url(#sf-logo-bg)" />
      <rect x="1" y="1" width="30" height="30" rx="8.5" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <path
        d="M17.8 6.5 9.2 17.6h5.4l-1.6 7.9 8.8-11.4h-5.5l1.5-7.6Z"
        fill="url(#sf-logo-bolt)"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Signal arcs */}
      <path
        d="M23.5 9.2a10.5 10.5 0 0 1 0 13.6"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M21.2 11.6a6.8 6.8 0 0 1 0 8.8"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandLogo({
  className,
  showWordmark = true,
  onClick,
}: {
  className?: string;
  showWordmark?: boolean;
  onClick?: () => void;
}) {
  return (
    <span
      onClick={onClick}
      className={cn("inline-flex select-none items-center gap-2.5", onClick && "cursor-pointer", className)}
    >
      <LogoMark className="size-8" />
      {showWordmark && (
        <span className="text-[17px] font-bold tracking-tight text-white">
          SignalForge<span className="text-[#3b82f6]"> AI</span>
        </span>
      )}
    </span>
  );
}
