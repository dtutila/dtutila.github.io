import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SocialLinks } from "@/components/SocialLinks";
import logoFallback from "@/assets/logo-fallback.jpg";
import logoWebp from "@/assets/logo.webp";
import { useState, useRef, lazy, Suspense } from "react";
import { EasterEggProvider } from "@/contexts/EasterEggContext";
import { useEasterEgg } from "@/contexts/EasterEggState";
import { SnowballShakeEffect } from "@/components/SnowballShakeEffect";
import { ShakePermissionButton } from "@/components/ShakePermissionButton";
import { useDeviceShake } from "@/hooks/useDeviceShake";

// Seasonal effects are code-split and fetched only when their season activates
const SnowEffect = lazy(() =>
  import("@/components/SnowEffect").then((m) => ({ default: m.SnowEffect }))
);
const SantaHatOverlay = lazy(() =>
  import("@/components/SantaHatOverlay").then((m) => ({ default: m.SantaHatOverlay }))
);
const PumpkinOverlay = lazy(() =>
  import("@/components/PumpkinOverlay").then((m) => ({ default: m.PumpkinOverlay }))
);
const BatsEffect = lazy(() =>
  import("@/components/BatsEffect").then((m) => ({ default: m.BatsEffect }))
);
const LightningEffect = lazy(() =>
  import("@/components/LightningEffect").then((m) => ({ default: m.LightningEffect }))
);

const IndexContent = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const { isSnowActive, isHalloweenActive } = useEasterEgg();
  const { isShaking, requestPermission, permissionGranted, requiresPermission, tilt } = useDeviceShake(isSnowActive);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  return (
    <>
      <Suspense fallback={null}>
        {isSnowActive && <SnowEffect tilt={tilt} />}
        {isHalloweenActive && <BatsEffect />}
        {isHalloweenActive && <LightningEffect />}
      </Suspense>
      {isSnowActive && <SnowballShakeEffect isShaking={isShaking} tilt={tilt} />}
      {isSnowActive && (
        <ShakePermissionButton
          requestPermission={requestPermission}
          permissionGranted={permissionGranted}
          requiresPermission={requiresPermission}
        />
      )}
      <div className="page-shell">
        <Header />

      <main id="main-content" tabIndex={-1} className="safe-inline container relative z-10 mx-auto flex flex-1 items-center justify-center pb-20 pt-20 outline-none sm:pb-24 sm:pt-24">
        <div className="hero-content max-w-3xl text-center animate-in fade-in duration-1000">
          <div className="profile-spacing flex justify-center">
            <div className="relative">
              <Suspense fallback={null}>
                {isSnowActive && <SantaHatOverlay isActive />}
                {isHalloweenActive && <PumpkinOverlay isActive />}
              </Suspense>
              <div 
                ref={logoRef}
                className="profile-avatar relative overflow-hidden rounded-full border-4 border-primary transition-shadow duration-300"
                style={{ 
                  background: 'var(--gradient-primary)',
                  boxShadow: isHovering 
                    ? `0 0 60px hsla(var(--glow-primary), 0.6), 0 0 100px hsla(var(--glow-secondary), 0.4), 0 0 140px hsla(var(--glow-tertiary), 0.3)`
                    : '0 0 30px hsla(var(--glow-primary), 0.3), 0 0 50px hsla(var(--glow-secondary), 0.2)'
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
              {/* Dynamic gradient glow that follows mouse */}
              <div 
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
                    hsla(var(--glow-primary), 0.4) 0%, 
                    hsla(var(--glow-secondary), 0.3) 30%, 
                    hsla(var(--glow-tertiary), 0.2) 60%, 
                    transparent 100%)`,
                  filter: 'blur(20px)',
                }}
              />
              <picture>
                <source srcSet={logoWebp} type="image/webp" />
                <img
                  src={logoFallback}
                  alt="Illustrated portrait of dtutila"
                  width="400"
                  height="400"
                  fetchPriority="high"
                  className="relative z-10 h-full w-full object-cover"
                />
              </picture>
              </div>
            </div>
          </div>

          <h1 className="hero-title mb-3 text-5xl font-bold tracking-tight text-foreground sm:mb-4 sm:text-6xl md:text-7xl">
            dtutila
          </h1>
          
          <p className="hero-subtitle mb-4 text-xl font-semibold text-muted-foreground sm:mb-6 sm:text-3xl">
            Software Engineer
          </p>

          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </div>
      </main>

        <Footer />
      </div>
    </>
  );
};

const Index = () => {
  return (
    <EasterEggProvider>
      <IndexContent />
    </EasterEggProvider>
  );
};

export default Index;
