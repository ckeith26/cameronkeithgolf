# Footer Golf Animation

## Summary

Animated stick figure golfer in the footer that swings, hits a ball into a hole, and celebrates. Loops continuously.

## Placement

Thin strip (~60px) below existing footer content, spanning full width. Ground line with golfer on left, flag/hole on right.

## Animation Sequence (loops)

1. **Swing** — golfer's arms rotate to swing club (~0.5s)
2. **Ball flight** — arc trajectory from golfer to hole, 1-2 bounces near the cup (~1.5s)
3. **Hole-in** — ball drops into cup (~0.2s)
4. **Celebrate** — arms up, small vertical jumps (~1s)
5. **Pause** — rest before loop restarts (~2s)

## SVG Elements

- Stick figure: circle head, line body, two line arms, two line legs (~50px tall)
- Golf club: line extending from hands
- Ball: small circle (~4px)
- Hole: small rectangle with flag pole and triangle flag
- Ground: thin horizontal line

## Style

Muted color matching `text-foreground-subtle`. Subtle, not flashy.

## Technical Approach

- New `GolfAnimation.tsx` component in `src/components/layout/`
- SVG with Framer Motion (`motion.circle`, `motion.line`, `motion.g`)
- Single responsive SVG viewBox
- Rendered inside Footer below existing content
- No new dependencies (Framer Motion already installed)
