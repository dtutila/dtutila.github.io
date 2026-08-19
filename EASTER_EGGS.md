# Easter Eggs

Hidden and semi-hidden interactive features on the site. State for most of
these lives in `src/contexts/EasterEggContext.tsx`, which wraps the Index page.

## 1. Falling brand text

- **Trigger:** Hover the "dtutila" brand link in the header — **light mode only**.
- **Effect:** The link turns invisible and a duplicate falls the full height of
  the viewport, spinning 900° with three decaying bounces
  (`fall-and-bounce` keyframes, `src/index.css:231`), then fades out. The text
  comes to rest in the footer until you move the mouse away and the state resets.
- **Files:** `src/components/Header.tsx`, `src/components/Footer.tsx`
- **State:** `isDropped` / `triggerDrop` in `EasterEggContext`.

## 2. Christmas season auto-mode

- **Trigger:** Visit during **November or December** with **dark mode** active
  (the default theme).
- **Effect:** Snow mode activates automatically: falling snow, a Santa hat on
  the logo, twinkling Christmas lights under the header, snow accumulation on
  the footer, and the shake effect. The shared theme context toggles the mode
  live when the user changes theme.
- **Files:** `src/contexts/EasterEggContext.tsx`
- **Details:** See `CHRISTMAS_SEASON_BEHAVIOR.md`.

## 3. Halloween season auto-mode

- **Trigger:** Visit between **October 1 and November 2** with **dark mode**
  active.
- **Effect:** A jack-o'-lantern pumpkin appears perched on the logo (with an
  orange glow), bats with flapping wings fly randomly across the background
  (they flee from the mouse cursor or your finger on touch devices, including
  one yellow Batman-logo bat), random white lightning bolts strike in the
  background every few seconds with a strobing bolt and sky flash — each
  strike also reveals a black castle-and-mountains silhouette at the bottom
  of the screen for as long as the sky stays lit — and a
  pumpkin toggle button shows up in the header to switch the mode manually.
  Auto-activates from the same shared theme context as Christmas mode.
- **Files:** `src/contexts/EasterEggContext.tsx`,
  `src/components/PumpkinOverlay.tsx`, `src/components/HalloweenPumpkin.tsx`,
  `src/components/BatsEffect.tsx`, `src/components/LightningEffect.tsx`,
  `src/assets/pumpkin.svg`, `src/assets/castle.svg`

## 4. Santa hat toggle

- **Trigger:** Click the Santa-hat button in the header (only rendered during
  Christmas season + dark mode).
- **Effect:** Manually toggles snow mode on/off (`isSnowActive`).
- **Files:** `src/components/ChristmasHat.tsx`

## 5. Shake-to-snowball

- **Trigger:** Shake a mobile device while snow mode is active. On iOS 13+ an
  "Enable Shake Effect" button appears first to request motion permission.
- **Effect:** 60 snowflakes burst from the center of the screen with a 6-stage
  physics animation (explosion → peak → gravity fall → air resistance →
  settle → fade) over 2.8s, then clean up after 3s.
- **Files:** `src/hooks/useDeviceShake.ts`,
  `src/components/SnowballShakeEffect.tsx`,
  `src/components/ShakePermissionButton.tsx`
- **Details:** See `SNOWBALL_PHYSICS.md` and `SHAKE_EFFECT_COMPATIBILITY.md`.

## 6. Tilt-steered snow

- **Trigger:** Tilt a mobile device while snow is falling.
- **Effect:** Falling flakes drift horizontally based on device
  tilt (normalized ±1 from accelerometer data).
- **Files:** `src/components/SnowEffect.tsx`, `src/hooks/useDeviceShake.ts`

## 7. Footer snow accumulation

- **Trigger:** Automatic while snow mode is active.
- **Effect:** A wavy SVG snow drift sits on top of the footer; falling flakes
  stop at the dynamic viewport height minus 60px so they appear to land in it.
- **Files:** `src/components/SnowAccumulation.tsx`

## Interactive touches (not hidden, but delightful)

- **Mouse-tracking glow:** The hero logo has a radial glow that follows the
  cursor, plus a hover box-shadow glow (`src/pages/Index.tsx`).
- **Social icon glow:** Social icons get a drop-shadow glow that follows the
  mouse (`src/components/SocialLinks.tsx`).

## What does NOT exist

No Konami code, no secret key combos, no click counters, no sounds, no hidden
routes, and no console art. The site is a single static page.
