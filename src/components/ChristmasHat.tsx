import { useTheme } from "@/contexts/ThemeContext";
import { isChristmasSeason } from "@/lib/seasons";

interface ChristmasHatProps {
  isActive: boolean;
  onToggle: () => void;
}

export const ChristmasHat = ({ isActive, onToggle }: ChristmasHatProps) => {
  const { theme } = useTheme();

  // Only show in dark mode during November/December
  if (theme !== "dark" || !isChristmasSeason()) {
    return null;
  }

  return (
    <button
      onClick={onToggle}
      type="button"
      className="control-button"
      aria-pressed={isActive}
      aria-label={`${isActive ? "Disable" : "Enable"} snow effect`}
    >
      <svg
        aria-hidden="true"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300"
      >
        {/* Santa hat */}
        <path
          d="M12 3C12 3 8 6 6 10C4 14 4 16 4 16C4 16 4 18 6 18C8 18 16 18 18 18C20 18 20 16 20 16C20 16 20 14 18 10C16 6 12 3 12 3Z"
          fill={isActive ? "#DC2626" : "#4B5563"}
          className="transition-colors duration-300"
        />
        {/* White trim */}
        <ellipse
          cx="12"
          cy="17"
          rx="8"
          ry="1.5"
          fill={isActive ? "#FFFFFF" : "#6B7280"}
          className="transition-colors duration-300"
        />
        {/* Pom-pom */}
        <circle
          cx="12"
          cy="3"
          r="2"
          fill={isActive ? "#FFFFFF" : "#6B7280"}
          className="transition-colors duration-300"
        />
      </svg>
    </button>
  );
};
