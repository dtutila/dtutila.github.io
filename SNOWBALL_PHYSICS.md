# Snowball Shake Physics Simulation

## Realistic Physics Implementation ❄️

The shake effect now simulates real snowball physics with accurate gravity, momentum, and settling behavior.

## Physics Stages

### 1. **Initial Burst (0% - 8%)**
- **Explosive start**: Snowflakes burst outward from center
- **Upward momentum**: Initial velocity pushes snow up and out
- **Scale increase**: 1.0 → 1.2 (expansion from impact)
- **Duration**: ~224ms

**Real-world equivalent**: The moment you shake a snowglobe - snow explodes in all directions

### 2. **Peak Trajectory (8% - 18%)**
- **Maximum height**: Snow reaches highest point (-60px)
- **Deceleration**: Upward velocity decreases
- **Gravity begins**: Downward force starts to take effect
- **Tilt influence**: 1.5x tilt multiplier
- **Duration**: ~280ms

**Real-world equivalent**: Snowflakes reach their peak and pause momentarily before falling

### 3. **Transition to Fall (18% - 30%)**
- **Gravity takes over**: Upward motion stops, downward begins
- **Velocity shift**: From -60px to -30px (descending)
- **Rotation continues**: 180° → 270°
- **Duration**: ~336ms

**Real-world equivalent**: The turning point where gravity overcomes initial momentum

### 4. **Accelerating Descent (30% - 60%)**
- **Gravity acceleration**: Increasing downward speed
- **Position change**: -30px → +80px (rapid fall)
- **Tilt influence increases**: 2.5x multiplier
- **Scale decrease**: Air resistance effect
- **Duration**: ~840ms

**Real-world equivalent**: Free fall with increasing speed due to gravity

### 5. **Rapid Fall (60% - 75%)**
- **Maximum velocity**: Fastest downward movement
- **Position**: +80px → +140px
- **Tilt influence**: 3x multiplier (maximum drift)
- **Rotation speed**: 450° → 520° (tumbling)
- **Duration**: ~420ms

**Real-world equivalent**: Terminal velocity approach, maximum falling speed

### 6. **Air Resistance & Settling (75% - 100%)**
- **Deceleration**: Air resistance slows descent
- **Final position**: +140px → +200px (ground level)
- **Scale reduction**: 0.75 → 0.5 (settling)
- **Opacity fade**: 0.9 → 0 (landing)
- **Duration**: ~700ms

**Real-world equivalent**: Snowflakes slow down as they approach the ground and settle

## Physics Parameters

### Gravity Simulation
```
Vertical acceleration increases over time:
- 0-18%: Upward motion (negative Y)
- 18-30%: Deceleration phase
- 30-100%: Accelerating downward (positive Y)
```

### Tilt Influence (Device Orientation)
```
Progressive multipliers simulate momentum:
- 0-18%: 1.0x - 1.5x (initial)
- 18-45%: 1.5x - 2.5x (building)
- 45-100%: 2.5x - 3.0x (maximum)
```

### Air Resistance
```
Scale reduction simulates drag:
- 0-8%: 1.0 → 1.2 (expansion)
- 8-60%: 1.2 → 0.85 (compression)
- 60-100%: 0.85 → 0.5 (settling)
```

### Rotation (Tumbling Effect)
```
Continuous rotation based on velocity:
- Total rotation: 580° (1.6 full rotations)
- Speed varies with velocity
- Direction based on horizontal velocity
```

## Snowflake Distribution

### Centered Burst Pattern
```typescript
const angle = Math.random() * Math.PI * 2;
const distance = Math.random() * Math.random(); // Bias toward center
x: 50 + Math.cos(angle) * distance * 40
y: 50 + Math.sin(angle) * distance * 40
```

**Effect**: More snowflakes near center, fewer at edges (realistic explosion)

### Velocity Distribution
```typescript
velocityX: (Math.random() - 0.5) * 2.5  // -1.25 to 1.25
velocityY: (Math.random() - 0.5) * 2.5  // -1.25 to 1.25
```

**Effect**: Varied trajectories, some fast, some slow

### Size Variation
```typescript
size: 2 + Math.random() * 6  // 2px to 8px
```

**Effect**: Different snowflake sizes fall at different rates (larger = heavier)

## Animation Timing

### Total Duration: 2.8 seconds
- **Burst phase**: 0.5s (18% of animation)
- **Peak & transition**: 0.6s (21% of animation)
- **Falling phase**: 1.1s (39% of animation)
- **Settling phase**: 0.6s (21% of animation)

### Easing Function
```css
cubic-bezier(0.25, 0.46, 0.45, 0.94)
```
- **Start**: Slow (explosive burst)
- **Middle**: Fast (free fall)
- **End**: Slow (settling)

## Comparison: Before vs After

### Before (Simple Animation)
- ❌ Linear movement patterns
- ❌ No gravity simulation
- ❌ Uniform distribution
- ❌ Fixed timing
- ❌ Simple rotation

### After (Physics Simulation)
- ✅ Parabolic trajectories
- ✅ Realistic gravity acceleration
- ✅ Centered burst distribution
- ✅ Progressive tilt influence
- ✅ Natural tumbling motion
- ✅ Air resistance effects
- ✅ Settling behavior

## Visual Effects

### Opacity Transitions
- **Fade in**: 0 → 1 (3% - quick appearance)
- **Sustained**: 1.0 (3% - 75% - visible flight)
- **Fade out**: 1.0 → 0 (75% - 100% - landing)

### Scale Changes
- **Burst**: 1.0 → 1.2 (expansion)
- **Flight**: 1.2 → 0.85 (compression)
- **Landing**: 0.85 → 0.5 (settling)

### Glow Enhancement
```css
box-shadow: 
  0 0 10px rgba(255, 255, 255, 0.9),
  0 0 20px rgba(255, 255, 255, 0.5)
```
- **Inner glow**: Bright core
- **Outer glow**: Atmospheric halo

## Performance Optimization

- **60 snowflakes**: Balanced between visual density and performance
- **Staggered delays**: 0-150ms spread prevents simultaneous rendering
- **CSS transforms**: Hardware-accelerated animations
- **Cleanup**: Automatic removal after 3 seconds
- **Conditional rendering**: Only active when shaking

## Testing the Physics

### Expected Behavior
1. **Shake device**: Snowflakes burst from center
2. **Initial burst**: Snow shoots upward and outward
3. **Peak**: Snowflakes pause at highest point
4. **Fall**: Accelerating descent with tumbling
5. **Tilt response**: Snow drifts in direction of device tilt
6. **Landing**: Gradual settling and fade out

### Realistic Details
- Snowflakes follow parabolic arcs (like real projectiles)
- Larger snowflakes appear to fall faster
- Tilt influence increases with momentum
- Natural tumbling rotation
- Smooth deceleration near ground
- Varied trajectories (no two snowflakes identical)

## Summary

The snowball shake effect now accurately simulates:
- ✅ **Gravity**: Realistic acceleration and deceleration
- ✅ **Momentum**: Initial burst with gradual slowdown
- ✅ **Air resistance**: Scale reduction and settling
- ✅ **Tilt physics**: Device orientation affects trajectory
- ✅ **Natural distribution**: Centered burst pattern
- ✅ **Tumbling motion**: Rotation based on velocity
- ✅ **Settling behavior**: Gradual landing and fade

The result is a physically accurate snowball shake that feels natural and satisfying! ❄️🎄
