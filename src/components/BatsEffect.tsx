import { useEffect, useRef, useState } from "react";

const BAT_COUNT = 20;
const BATMAN_SIZE = 56;
const FLEE_RADIUS = 160; // px - pointer distance that scares bats away

interface BatFlight {
  x: number;
  y: number;
  heading: number; // radians, 0 = flying right
  speed: number; // px/s cruise speed
  phase: number; // vertical wobble offset
  fleeX: number; // decaying flee impulse
  fleeY: number;
  fleeing: boolean;
}

const randomBat = (): BatFlight => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight * 0.8,
  heading: Math.random() < 0.5 ? 0 : Math.PI,
  speed: 50 + Math.random() * 40,
  phase: Math.random() * Math.PI * 2,
  fleeX: 0,
  fleeY: 0,
  fleeing: false,
});

export const BatsEffect = () => {
  const [reducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [sizes] = useState(() =>
    Array.from({ length: BAT_COUNT }, () => 27 + Math.random() * 27) // 27-54px
  );
  const batRefs = useRef<Array<HTMLDivElement | null>>([]);
  const flights = useRef<BatFlight[]>([]);
  const pointer = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    // Regular bats + the single batman bat
    flights.current = Array.from({ length: sizes.length + 1 }, () => randomBat());

    const onMouseMove = (e: MouseEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        pointer.current = { x: touch.clientX, y: touch.clientY };
      }
    };
    const onTouchEnd = () => {
      pointer.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const w = window.innerWidth;
      const h = window.innerHeight;

      flights.current.forEach((bat, i) => {
        const el = batRefs.current[i];
        if (!el) {
          return;
        }

        // Wander: random heading drift, biased back toward horizontal flight
        bat.heading += (Math.random() - 0.5) * 4 * dt;
        const horizontal = Math.cos(bat.heading) >= 0 ? 0 : Math.PI;
        let diff = horizontal - bat.heading;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        bat.heading += diff * 1.5 * dt;

        // Flee from the pointer (mouse or touch)
        const dx = bat.x - pointer.current.x;
        const dy = bat.y - pointer.current.y;
        const dist = Math.hypot(dx, dy);
        const fleeing = dist < FLEE_RADIUS;
        if (fleeing && dist > 0.1) {
          const force = (1 - dist / FLEE_RADIUS) * 900;
          bat.fleeX += (dx / dist) * force * dt;
          bat.fleeY += (dy / dist) * force * dt;
        }
        const decay = Math.max(0, 1 - 2.5 * dt);
        bat.fleeX *= decay;
        bat.fleeY *= decay;

        // Cruise velocity + sinusoidal vertical wobble + flee impulse
        const vx = Math.cos(bat.heading) * bat.speed + bat.fleeX;
        const vy =
          Math.sin(bat.heading) * bat.speed * 0.6 +
          Math.sin(now * 0.004 + bat.phase) * 25 +
          bat.fleeY;
        bat.x += vx * dt;
        bat.y += vy * dt;

        // Wrap around screen edges
        if (bat.x < -80) bat.x = w + 80;
        else if (bat.x > w + 80) bat.x = -80;
        if (bat.y < -80) bat.y = h + 80;
        else if (bat.y > h + 80) bat.y = -80;

        // Flap faster while fleeing
        if (fleeing !== bat.fleeing) {
          bat.fleeing = fleeing;
          el.style.setProperty("--flap-duration", fleeing ? "0.16s" : "0.45s");
        }

        el.style.transform = `translate3d(${bat.x}px, ${bat.y}px, 0)`;
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [reducedMotion, sizes]);

  if (reducedMotion) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[5] overflow-hidden"
      aria-hidden="true"
    >
      {sizes.map((size, i) => (
        <div
          key={i}
          ref={(el) => {
            batRefs.current[i] = el;
          }}
          className="absolute top-0 left-0 will-change-transform"
        >
          <svg
            width={size}
            height={size * 0.56}
            viewBox="0 0 64 36"
            fill="#050508"
            style={{ filter: "drop-shadow(0 0 4px hsla(var(--accent), 0.45))" }}
          >
            <g className="bat-wing bat-wing-left">
              <path d="M32 16 C26 6 14 2 4 6 C9 9 10 13 8 17 C13 16 17 18 19 23 C23 18 27 17 32 18 Z" />
            </g>
            <g className="bat-wing bat-wing-right">
              <path d="M32 16 C38 6 50 2 60 6 C55 9 54 13 56 17 C51 16 47 18 45 23 C41 18 37 17 32 18 Z" />
            </g>
            {/* Body */}
            <ellipse cx="32" cy="19" rx="3.5" ry="6" />
            {/* Ears */}
            <path d="M28.5 14 L29.5 8.5 L31.5 13 Z" />
            <path d="M35.5 14 L34.5 8.5 L32.5 13 Z" />
          </svg>
        </div>
      ))}

      {/* The one and only batman bat */}
      <div
        ref={(el) => {
          batRefs.current[sizes.length] = el;
        }}
        className="absolute top-0 left-0 will-change-transform"
      >
        <svg
          width={BATMAN_SIZE}
          height={BATMAN_SIZE * 0.5}
          viewBox="44 65 955 476"
          fill="#A16207"
        >
          <path d="M692.199 102.8l-.199-.3-.2-.3-.3-.2-.301-.2-.199-.3-.2-.3-.3-.2-.301-.2-.199-.3-.2-.3-.3-.2-.301-.2-.199-.3-.2-.3-.3-.2-.301-.2-.199-.3-.2-.3-.3-.2-.301-.2-.199-.3h4l2 .5 2 .5 34 9.5c22.666 6.333 44 13.5 64 21.5s37.267 15.9 51.8 23.7c14.467 7.866 27.6 15.866 39.399 24 11.867 8.2 22.533 16.533 32 25 9.533 8.533 18.134 17.8 25.801 27.8 7.666 10 13.666 19.333 18 28 4.333 8.667 7.5 17.333 9.5 26s2.833 17.333 2.5 26c-.334 8.666-1.834 17.666-4.5 27-2.667 9.334-6.334 18.666-11 28-4.667 9.334-10.5 18.666-17.5 28s-14.4 17.934-22.2 25.8c-7.867 7.8-18.3 16.367-31.3 25.7s-26.667 17.833-41 25.5c-14.334 7.667-30.334 14.833-48 21.5-17.667 6.667-28 10.5-31 11.5s-5.167 1.667-6.5 2l-2 .5-1.5.5-1.5.5-1.5.5-1.5.5-1 .3-1 .2v-2l1-.2 1-.3.199-.3.301-.2.3-.2.2-.3.199-.3.301-.2.3-.2.2-.3.199-.3.301-.2.3-.2.2-.3.199-.3.301-.2.3-.2c.133-.2.6-.733 1.399-1.6.867-.8 5.533-6.267 14-16.4 8.533-10.2 15.533-20.533 21-31 5.533-10.533 9.301-20.467 11.301-29.8 2-9.334 2.666-17.334 2-24-.667-6.666-2.167-12.5-4.5-17.5-2.334-5-5.268-9.1-8.801-12.3-3.467-3.134-7.699-5.7-12.699-7.7s-11.5-3-19.5-3-17 1.666-27 5-20.167 8.166-30.5 14.5c-10.334 6.334-19.834 13.166-28.5 20.5l-13 11-.2.3-.3.2-.301.2-.199.3-1.5.3-1.5.2-.2-1c-.2-.666-2.634-4.334-7.3-11-4.667-6.666-9.233-11.6-13.7-14.8-4.533-3.134-8.967-4.866-13.3-5.2-4.334-.334-9.167.834-14.5 3.5-5.334 2.666-10 6-14 10s-9.667 11.166-17 21.5c-7.334 10.333-17.733 27.934-31.2 52.8L523.5 503l-.5 1-.5 1-.5 1-.5 1-.5 1-.5 1-.5-1-.5-1-.5-1-.5-1-.301-.2-.199-.3-.2-.3-.3-.2-.5-1c-.334-.667-5.334-10.167-15-28.5-9.667-18.333-18.5-34-26.5-47s-15.233-23.1-21.7-30.3c-6.533-7.134-12.134-12.034-16.8-14.7-4.667-2.666-9-4.166-13-4.5s-7-.166-9 .5-5.167 2.666-9.5 6c-4.334 3.334-8.667 8.434-13 15.3L386 410l-1.5-.2-1.5-.3-.2-.3-.3-.2-.301-.2-.199-.3-13-11c-8.667-7.334-18.167-14.166-28.5-20.5-10.334-6.334-19.667-11-28-14-8.334-3-16-4.834-23-5.5s-13.5-.334-19.5 1-10.834 3.1-14.5 5.3c-3.667 2.134-5.5 3.534-5.5 4.2s-.334 1-1 1c-.667 0-2.4 2.5-5.2 7.5-2.867 5-4.8 9.834-5.8 14.5s-1.167 11-.5 19c.666 8 2.666 16.667 6 26 3.333 9.333 8.166 18.833 14.5 28.5 6.333 9.667 12.733 18.1 19.2 25.3 6.533 7.134 9.866 10.8 10 11l.3.2.3.2.2.3.2.3.3.2.3.2.2.3.2.3.3.2.3.2.2.3.2.3.3.2.3.2.2.3 1 .3 1 .2v2l-1-.2-1-.3-1.5-.5-1.5-.5-1.5-.5-1.5-.5-1.5-.5c-1-.333-4.834-1.5-11.5-3.5-6.667-2-18.5-6.5-35.5-13.5s-32.167-14.167-45.5-21.5c-13.334-7.333-25.5-15-36.5-23s-20.434-15.9-28.3-23.7a280.521 280.521 0 0 1-22-25 199.702 199.702 0 0 1-18-28c-5.134-9.866-9.034-19.634-11.7-29.3-2.667-9.666-4.167-19-4.5-28-.334-9 .5-17.667 2.5-26s5.333-17.167 10-26.5c4.666-9.333 10.899-18.934 18.7-28.8 7.866-9.8 16.966-19.2 27.3-28.2 10.333-9 20.833-17.167 31.5-24.5 10.666-7.333 23.5-15 38.5-23s32.666-16 53-24c20.333-8 41.333-15 63-21l32.5-9 2-.5 2-.5h4l-.2.3-.3.2-.301.2-.199.3-.2.3-.3.2-.301.2-.199.3-.2.3-.3.2-.301.2-.199.3-.2.3-.3.2-.301.2-.199.3-.2.3-.3.2-.301.2-.199.3-.2.3-.3.2-.301.2-.199.3-10.2 12.3c-6.867 8.134-12.134 15.867-15.8 23.2-3.667 7.333-6.167 13.667-7.5 19-1.334 5.333-1.834 10.833-1.5 16.5.333 5.667 1.732 11.233 4.199 16.7 2.533 5.533 5.301 10.133 8.301 13.8s7.833 7.667 14.5 12c6.666 4.333 14.5 8 23.5 11s19.5 4.5 31.5 4.5 20.333-1.167 25-3.5c4.666-2.333 8.933-5.066 12.8-8.2 3.8-3.2 8.033-8.3 12.7-15.3 4.666-7 8.666-14.833 12-23.5 3.333-8.667 5.833-25.667 7.5-51 1.666-25.333 3.066-40.934 4.199-46.8 1.2-5.8 4.4-3.8 9.601 6 5.133 9.866 8.267 16.633 9.399 20.3 1.2 3.667 4.967 4.9 11.301 3.7 6.333-1.134 14.166-1.534 23.5-1.2 9.333.333 16 .934 20 1.8 4 .8 7.6-2.8 10.8-10.8 3.133-8 6.366-14.833 9.7-20.5 3.333-5.667 6 .833 8 19.5s3.333 34.333 4 47c.666 12.667 2.666 23.333 6 32 3.333 8.667 7.1 16.066 11.3 22.2 4.133 6.2 8.033 11.133 11.7 14.8 3.666 3.667 8.166 6.833 13.5 9.5 5.333 2.667 14 4 26 4s22.5-1.5 31.5-4.5 16.333-6.333 22-10c5.666-3.667 10.566-7.733 14.699-12.2 4.2-4.533 7.467-9.633 9.801-15.3 2.333-5.667 3.5-12 3.5-19s-1.167-13.833-3.5-20.5c-2.334-6.667-5.834-13.667-10.5-21-4.667-7.333-9.167-13.5-13.5-18.5-4.334-5-6.6-7.566-6.801-7.7z" />
        </svg>
      </div>
    </div>
  );
};
