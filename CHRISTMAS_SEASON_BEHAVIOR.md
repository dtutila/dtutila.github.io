# Christmas Season Behavior

## Auto-Activation Logic ✅

The Christmas effects are **only active by default during November and December** in dark mode.

### Date Detection
```typescript
const isChristmasSeason = () => {
  const month = new Date().getMonth();
  return month === 10 || month === 11; // November (10) or December (11)
};
```
 
### Behavior by Month

#### ❄️ November & December (Christmas Season)
**Auto-activated on page load:**
- ✅ Falling snow effect
- ✅ Santa hat on circle image
- ✅ Christmas lights (twinkling)
- ✅ Snow accumulation on footer
- ✅ Shake effect enabled
- ✅ Tilt-responsive snow

**Requirements:**
- Must be in **dark mode**
- Santa hat toggle button visible in header
- User can toggle off if desired

#### 🚫 January - October (Non-Christmas Season)
**Not activated:**
- ❌ No snow effect
- ❌ No Santa hat button visible
- ❌ No Christmas lights
- ❌ No Christmas features at all

**Why:**
- `isChristmasSeason()` returns `false`
- ChristmasHat component returns `null` (not rendered)
- EasterEggContext does not auto-activate snow

## Implementation Details

### 1. EasterEggContext (`/src/contexts/EasterEggContext.tsx`)
```typescript
useEffect(() => {
  if (isChristmasSeason()) {
    setIsSnowActive(true);  // Auto-activate during Nov/Dec
  }
}, []);
```
- Runs once on mount
- Only sets `isSnowActive` to `true` if current month is 10 or 11

### 2. ChristmasHat Component (`/src/components/ChristmasHat.tsx`)
```typescript
useEffect(() => {
  const currentMonth = new Date().getMonth();
  const isChristmas = currentMonth === 10 || currentMonth === 11;
  setIsChristmasSeason(isChristmas);
}, []);

if (!isDarkMode || !isChristmasSeason) {
  return null;  // Don't render outside Nov/Dec or in light mode
}
```
- Checks month on mount
- Only renders if:
  - Dark mode is active
  - Current month is November or December

### 3. All Christmas Components
All Christmas-related components check `isSnowActive` from context:
- `SnowEffect` - Falling snow
- `ChristmasLights` - Twinkling lights
- `SantaHatOverlay` - Hat on circle
- `SnowAccumulation` - Footer snow
- `SnowballShakeEffect` - Shake animation

## Testing

### Test November/December Behavior
```javascript
// In browser console, temporarily change date
const originalDate = Date;
global.Date = class extends Date {
  getMonth() {
    return 10; // November
  }
};
// Reload page - Christmas effects should auto-activate
```

### Test Other Months
```javascript
// In browser console
global.Date = class extends Date {
  getMonth() {
    return 5; // June
  }
};
// Reload page - No Christmas effects, button not visible
```

## User Experience

### During Christmas Season (Nov/Dec)
1. User visits site in dark mode
2. Snow automatically starts falling
3. Santa hat appears on circle
4. Christmas lights twinkle in header
5. Snow accumulates on footer
6. User can shake device for burst effect
7. User can toggle off via Santa hat button

### Outside Christmas Season (Jan-Oct)
1. User visits site
2. No Christmas effects visible
3. No Santa hat button in header
4. Normal site experience
5. No performance impact from Christmas code

## Performance Notes

- **Date check**: Runs once on mount, minimal overhead
- **Conditional rendering**: Christmas components not rendered outside season
- **No memory leaks**: All effects properly cleaned up
- **Lazy loading**: Effects only active when needed

## Summary

✅ **Christmas effects ONLY active during November and December**  
✅ **Auto-activated on page load during season**  
✅ **Requires dark mode**  
✅ **User can toggle off**  
✅ **Completely hidden outside season**  
✅ **No performance impact when inactive**
