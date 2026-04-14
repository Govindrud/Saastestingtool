export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shield shape for security/reliability */}
      <path
        d="M50 5L85 20V45C85 65 70 80 50 95C30 80 15 65 15 45V20L50 5Z"
        fill="url(#gradient1)"
        stroke="currentColor"
        strokeWidth="2"
      />

      {/* Checkmark for testing/validation */}
      <path
        d="M35 48L44 57L65 36"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Circuit-like lines for tech/automation */}
      <circle cx="30" cy="30" r="3" fill="white" opacity="0.6" />
      <circle cx="70" cy="30" r="3" fill="white" opacity="0.6" />
      <circle cx="50" cy="75" r="3" fill="white" opacity="0.6" />

      <defs>
        <linearGradient id="gradient1" x1="15" y1="5" x2="85" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function LogoWithText({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Logo className="w-10 h-10" />
      <div>
        <div className="font-bold text-xl tracking-tight text-foreground">QualityForge</div>
        <div className="text-xs text-muted-foreground">Enterprise Testing Platform</div>
      </div>
    </div>
  );
}
