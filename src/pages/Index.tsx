import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SocialLinks } from "@/components/SocialLinks";
import logo from "@/assets/logo.png";
import { useState, useRef } from "react";
import { EasterEggProvider, useEasterEgg } from "@/contexts/EasterEggContext";
import { SnowEffect } from "@/components/SnowEffect";

const IndexContent = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const { isSnowActive } = useEasterEgg();

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
      {isSnowActive && <SnowEffect />}
      <main className="min-h-screen bg-gradient-to-b from-background to-background transition-colors" style={{ background: 'var(--gradient-background)' }}>
        <Header />

      <div className="container mx-auto flex min-h-screen items-center justify-center px-6 py-20">
        <div className="max-w-3xl text-center animate-in fade-in duration-1000">
          <div className="mb-8 flex justify-center">
            <div 
              ref={logoRef}
              className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-primary transition-all duration-300"
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
              <img 
                src={logo} 
                alt="Logo" 
                className="w-full h-full object-cover relative z-10"
              />
            </div>
          </div>

          <h1 className="mb-4 text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
            dtutila
          </h1>
          
          <h2 className="mb-6 text-2xl font-semibold text-muted-foreground sm:text-3xl">
            Software Engineer
          </h2>
          
          

          <div className="flex justify-center">
            <SocialLinks />
          </div>
        </div>
      </div>

        <Footer />
      </main>
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
