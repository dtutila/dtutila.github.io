import { Github, Linkedin } from "lucide-react";

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
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative text-muted-foreground transition-colors hover:text-accent"
          aria-label={link.name}
        >
          <div className="transition-transform group-hover:scale-110 group-hover:-translate-y-1">
            {link.icon}
          </div>
          <span className="sr-only">{link.name}</span>
        </a>
      ))}
    </div>
  );
}
