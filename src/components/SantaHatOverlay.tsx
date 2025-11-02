interface SantaHatOverlayProps {
  isActive: boolean;
}

export const SantaHatOverlay = ({ isActive }: SantaHatOverlayProps) => {
  if (!isActive) {
    return null;
  }

  return (
    <div className="absolute -top-16 -right-8 w-32 h-32 pointer-events-none z-20 animate-in fade-in duration-500">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{
          filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))',
        }}
      >
        {/* Main hat body - floppy curved shape */}
        <path
          d="M 60 120 Q 55 90 60 70 Q 65 50 75 35 Q 85 20 100 15 Q 115 12 130 18 Q 145 25 155 40 Q 165 55 170 75 Q 175 95 180 120"
          fill="#DC2626"
        />
        
        {/* Hat shadow/fold on left side */}
        <path
          d="M 60 120 Q 58 95 62 75 Q 66 55 75 40 Q 80 30 88 23 L 85 28 Q 77 40 72 55 Q 68 75 65 95 Q 63 110 62 120 Z"
          fill="#991B1B"
          opacity="0.4"
        />
        
        {/* Hat highlight on right side */}
        <path
          d="M 130 20 Q 140 24 150 35 Q 158 48 163 65 Q 166 80 168 100"
          stroke="#EF4444"
          strokeWidth="3"
          opacity="0.5"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Curved tip fold */}
        <ellipse
          cx="165"
          cy="85"
          rx="12"
          ry="18"
          fill="#B91C1C"
          opacity="0.6"
          transform="rotate(-25 165 85)"
        />
        
        {/* White fluffy trim at bottom */}
        <ellipse
          cx="120"
          cy="120"
          rx="65"
          ry="12"
          fill="#FFFFFF"
        />
        
        {/* Trim texture - fluffy appearance */}
        <ellipse
          cx="120"
          cy="118"
          rx="62"
          ry="10"
          fill="#F9FAFB"
        />
        
        {/* Trim shadow underneath */}
        <ellipse
          cx="120"
          cy="125"
          rx="60"
          ry="6"
          fill="#E5E7EB"
          opacity="0.6"
        />
        
        {/* White pom-pom at tip */}
        <circle
          cx="175"
          cy="95"
          r="15"
          fill="#FFFFFF"
        />
        
        {/* Pom-pom texture/highlights */}
        <circle
          cx="172"
          cy="92"
          r="6"
          fill="#F9FAFB"
          opacity="0.8"
        />
        <circle
          cx="178"
          cy="96"
          r="4"
          fill="#F3F4F6"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};
