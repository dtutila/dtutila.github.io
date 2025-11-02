import { Github, Linkedin } from "lucide-react";
import { useState, useRef } from "react";

// X (formerly Twitter) icon
const XIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
  >
    <path
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      fill="currentColor"
    />
  </svg>
);

// Farcaster icon - styled to match their actual logo
const FarcasterIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 1000 1000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
  >
    <path
      d="M257.778 155.556H742.222V844.444H671.111V528.889H670.414C662.554 441.677 589.258 373.333 500 373.333C410.742 373.333 337.446 441.677 329.586 528.889H328.889V844.444H257.778V155.556Z"
      fill="currentColor"
    />
    <path
      d="M128.889 253.333L157.778 351.111H182.222V746.667C169.949 746.667 160 756.616 160 768.889V795.556H155.556C143.283 795.556 133.333 805.505 133.333 817.778V844.444H382.222V817.778C382.222 805.505 372.273 795.556 360 795.556H355.556V768.889C355.556 756.616 345.606 746.667 333.333 746.667H306.667V253.333H128.889Z"
      fill="currentColor"
    />
    <path
      d="M871.111 253.333L842.222 351.111H817.778V746.667C830.051 746.667 840 756.616 840 768.889V795.556H844.444C856.717 795.556 866.667 805.505 866.667 817.778V844.444H617.778V817.778C617.778 805.505 627.727 795.556 640 795.556H644.444V768.889C644.444 756.616 654.394 746.667 666.667 746.667H693.333V253.333H871.111Z"
      fill="currentColor"
    />
  </svg>
);

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/dtutila",
    icon: <Github className="h-6 w-6" />,
  },
  {
    name: "X",
    url: "https://x.com/dtutila",
    icon: <XIcon />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/danieltutila",
    icon: <Linkedin className="h-6 w-6" />,
  },
  {
    name: "Farcaster",
    url: "https://warpcast.com/dtutila.eth",
    icon: <FarcasterIcon />,
  },
];

export function SocialLinks() {
  return (
    <div className="flex gap-6">
      {socialLinks.map((link) => (
        <SocialIcon key={link.name} link={link} />
      ))}
    </div>
  );
}

function SocialIcon({ link }: { link: SocialLink }) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative text-muted-foreground transition-colors hover:text-primary"
      aria-label={link.name}
    >
      <div 
        ref={iconRef}
        className="relative inline-block transition-all duration-300"
        style={{
          filter: isHovering 
            ? `drop-shadow(0 0 20px hsla(var(--glow-primary), 0.6)) drop-shadow(0 0 35px hsla(var(--glow-secondary), 0.4)) drop-shadow(0 0 50px hsla(var(--glow-tertiary), 0.3))`
            : 'drop-shadow(0 0 0px transparent)'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Dynamic gradient glow that follows mouse - positioned around the icon */}
        <div 
          className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              hsla(var(--glow-primary), 0.4) 0%, 
              hsla(var(--glow-secondary), 0.3) 30%, 
              hsla(var(--glow-tertiary), 0.2) 60%, 
              transparent 100%)`,
            filter: 'blur(20px)',
          }}
        />
        <div className="relative z-10 transition-transform group-hover:scale-110 group-hover:-translate-y-1">
          {link.icon}
        </div>
      </div>
      <span className="sr-only">{link.name}</span>
    </a>
  );
}
