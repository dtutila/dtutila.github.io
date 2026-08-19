import { useTheme } from "@/contexts/ThemeContext";
import { isHalloweenSeason } from "@/lib/seasons";

interface HalloweenPumpkinProps {
  isActive: boolean;
  onToggle: () => void;
}

export const HalloweenPumpkin = ({ isActive, onToggle }: HalloweenPumpkinProps) => {
  const { theme } = useTheme();

  // Only show in dark mode during October
  if (theme !== "dark" || !isHalloweenSeason()) {
    return null;
  }

  const bodyColor = isActive ? "#EA580C" : "#4B5563";
  const faceColor = isActive ? "#FDE047" : "#6B7280";

  return (
    <button
      onClick={onToggle}
      type="button"
      className="control-button"
      aria-pressed={isActive}
      aria-label={`${isActive ? "Disable" : "Enable"} Halloween effect`}
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
        {/* Stem */}
        <path
          d="M11 5.5C10.8 3.8 11.6 2.6 13 2C12.6 3 12.8 4 13.2 5.5H11Z"
          fill={isActive ? "#4D7C0F" : "#6B7280"}
          className="transition-colors duration-300"
        />
        {/* Pumpkin body */}
        <ellipse
          cx="12"
          cy="14.5"
          rx="9.5"
          ry="7.5"
          fill={bodyColor}
          className="transition-colors duration-300"
        />
        {/* Carved face */}
        <g fill={faceColor} className="transition-colors duration-300">
          <path d="M6.5 13L8.5 10.2L10.5 13Z" />
          <path d="M13.5 13L15.5 10.2L17.5 13Z" />
          <path d="M12 13.8L10.9 15.8L13.1 15.8Z" />
          <path d="M6.8 17.2C8.6 19.6 15.4 19.6 17.2 17.2C15.8 18 14.8 17.2 14.2 17.9C13.6 17.2 12.4 17.2 11.8 17.9C11.2 17.2 10.2 18 9.8 17.4C9.2 18 8 18 6.8 17.2Z" />
        </g>
      </svg>
    </button>
  );
};
