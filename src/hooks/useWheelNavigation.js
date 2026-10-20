import { useEffect } from "react";
import { useLatest } from "./useLatest";

const GESTURE_GAP_MS = 180;
const DELTA_THRESHOLD = 35;

export function useWheelNavigation({ onStep, isLocked }) {
  const handlers = useLatest({ onStep, isLocked });

  useEffect(() => {
    let lastTime = 0;
    let lastDirection = 0;
    let accumulated = 0;

    const handleWheel = (event) => {
      if (handlers.current.isLocked()) return;
      event.preventDefault();

      const direction = Math.sign(event.deltaY);
      if (!direction) return;

      const now = performance.now();
      if (now - lastTime > GESTURE_GAP_MS || direction !== lastDirection) accumulated = 0;

      lastTime = now;
      lastDirection = direction;
      accumulated += Math.abs(event.deltaY);

      if (accumulated >= DELTA_THRESHOLD) {
        accumulated = 0;
        handlers.current.onStep(direction);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handlers]);
}
