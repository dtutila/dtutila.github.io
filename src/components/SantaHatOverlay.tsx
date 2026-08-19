import santaHat from "@/assets/santa-hat.webp";
import santaHatFallback from "@/assets/image.png";

interface SantaHatOverlayProps {
  isActive: boolean;
}

export const SantaHatOverlay = ({ isActive }: SantaHatOverlayProps) => {
  if (!isActive) {
    return null;
  }

  return (
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 pointer-events-none z-20 animate-in fade-in duration-500">
      <picture>
        <source srcSet={santaHat} type="image/webp" />
        <img
          src={santaHatFallback}
          alt=""
          aria-hidden="true"
          width="1024"
          height="1024"
          className="h-full w-full object-contain"
          style={{
            filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.3))',
            transform: 'rotate(-10deg) translateX(8px) scale(1.1)',
            backgroundColor: 'transparent',
            mixBlendMode: 'normal',
          }}
        />
      </picture>
    </div>
  );
};
