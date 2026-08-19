import { useState, useRef } from "react";

const GitHubIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M12 .7A11.5 11.5 0 0 0 8.36 23.1c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.1-.75.4-1.26.74-1.55-2.57-.3-5.27-1.29-5.27-5.69 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.75.81 1.2 1.84 1.2 3.1 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.06.79 2.14v3.27c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
  </svg>
);

// X (formerly Twitter) icon
const XIcon = () => (
  <svg
    aria-hidden="true"
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
    aria-hidden="true"
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
    icon: <GitHubIcon />,
  },
  {
    name: "X",
    url: "https://x.com/dtutila",
    icon: <XIcon />,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/danieltutila",
    icon: <LinkedInIcon />,
  },
  {
    name: "Farcaster",
    url: "https://warpcast.com/dtutila.eth",
    icon: <FarcasterIcon />,
  },
];

export function SocialLinks() {
  return (
    <nav className="flex gap-2 sm:gap-3" aria-label="Social profiles">
      {socialLinks.map((link) => (
        <SocialIcon key={link.name} link={link} />
      ))}
    </nav>
  );
}

function SocialIcon({ link }: { link: SocialLink }) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const iconRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
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
      className="group relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      aria-label={`Visit ${link.name} profile (opens in a new tab)`}
    >
      <span
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
        <span className="relative z-10 block transition-transform group-hover:-translate-y-1 group-hover:scale-110">
          {link.icon}
        </span>
      </span>
    </a>
  );
}
