import { useEffect, useState } from "react";
import castle from "@/assets/castle.svg";

interface Bolt {
  id: number;
  main: string;
  branches: string[];
}

interface Pt {
  x: number;
  y: number;
}

// Midpoint displacement: recursively split the segment, jittering each
// midpoint with decreasing amplitude -> fractal jaggedness like a real bolt
const subdivide = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  disp: number,
  pts: Pt[]
) => {
  if (disp < 5) {
    pts.push({ x: x1, y: y1 });
    return;
  }
  const midX = (x0 + x1) / 2 + (Math.random() - 0.5) * disp;
  const midY = (y0 + y1) / 2 + (Math.random() - 0.5) * disp * 0.35;
  subdivide(x0, y0, midX, midY, disp / 2, pts);
  subdivide(midX, midY, x1, y1, disp / 2, pts);
};

const buildChannel = (
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  disp: number
): Pt[] => {
  const pts: Pt[] = [{ x: x0, y: y0 }];
  subdivide(x0, y0, x1, y1, disp, pts);
  return pts;
};

const toPath = (pts: Pt[]) =>
  `M${pts.map((p) => `${p.x} ${p.y}`).join(" L")}`;

const generateBolt = (w: number, h: number): Bolt => {
  const startX = w * (0.15 + Math.random() * 0.7);
  const length = h * (0.55 + Math.random() * 0.35);
  const endX = startX + (Math.random() - 0.5) * w * 0.15;

  const mainPts = buildChannel(startX, -10, endX, length, length / 3.5);

  // 2-4 branches splitting off the main channel at an angle, fractal too
  const branches: string[] = [];
  const branchCount = 2 + Math.floor(Math.random() * 3);
  for (let b = 0; b < branchCount; b++) {
    const from =
      mainPts[Math.floor(mainPts.length * (0.25 + Math.random() * 0.55))];
    const dir = Math.random() < 0.5 ? -1 : 1;
    const bLen = length * (0.2 + Math.random() * 0.25);
    const branchPts = buildChannel(
      from.x,
      from.y,
      from.x + dir * bLen * (0.5 + Math.random() * 0.5),
      from.y + bLen,
      bLen / 2.5
    );
    branches.push(toPath(branchPts));
  }

  return { id: Date.now(), main: toPath(mainPts), branches };
};

export const LightningEffect = () => {
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [bolt, setBolt] = useState<Bolt | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const schedule = () => {
      // Strike every 2.5 - 7.5 seconds
      timeout = setTimeout(() => {
        if (cancelled) {
          return;
        }
        setBolt(generateBolt(window.innerWidth, window.innerHeight));
        // Bolt + flash animations last ~0.75s, then clear and reschedule
        timeout = setTimeout(() => {
          setBolt(null);
          if (!cancelled) {
            schedule();
          }
        }, 800);
      }, 2500 + Math.random() * 5000);
    };

    schedule();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    >
      {bolt && (
        <div key={bolt.id}>
          {/* Sky flash - the whole sky lights up and dies out */}
          <div
            className="absolute inset-0 animate-lightning-sky"
            style={{
              background:
                "linear-gradient(180deg, rgba(230, 240, 255, 0.22) 0%, rgba(230, 240, 255, 0.06) 60%, transparent 100%)",
            }}
          />
          {/* Castle silhouette - only visible while the sky is lit.
              object-contain: never crop the tower's spires */}
          <img
            src={castle}
            alt=""
            className="absolute bottom-0 left-0 w-full h-[70vh] object-contain object-bottom animate-castle-reveal"
          />
          {/* The bolt, strobing like a real strike. Layered strokes:
              wide soft glow -> mid corona -> thin white-hot core */}
          <svg className="absolute inset-0 w-full h-full animate-lightning-bolt">
            <g
              style={{
                filter:
                  "drop-shadow(0 0 8px rgba(190, 215, 255, 0.8)) drop-shadow(0 0 22px rgba(140, 180, 255, 0.5))",
              }}
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path
                d={bolt.main}
                stroke="rgba(170, 205, 255, 0.35)"
                strokeWidth={8}
              />
              {bolt.branches.map((branch, i) => (
                <path
                  key={`glow-${i}`}
                  d={branch}
                  stroke="rgba(170, 205, 255, 0.3)"
                  strokeWidth={4}
                />
              ))}
              <path
                d={bolt.main}
                stroke="rgba(215, 232, 255, 0.6)"
                strokeWidth={3.5}
              />
              {bolt.branches.map((branch, i) => (
                <path
                  key={`mid-${i}`}
                  d={branch}
                  stroke="rgba(215, 232, 255, 0.5)"
                  strokeWidth={2}
                />
              ))}
              <path d={bolt.main} stroke="#FFFFFF" strokeWidth={1.8} />
              {bolt.branches.map((branch, i) => (
                <path
                  key={`core-${i}`}
                  d={branch}
                  stroke="#FFFFFF"
                  strokeWidth={1}
                  opacity={0.85}
                />
              ))}
            </g>
          </svg>
        </div>
      )}
    </div>
  );
};
