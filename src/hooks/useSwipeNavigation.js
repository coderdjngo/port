import { useEffect } from "react";
import { useLatest } from "./useLatest";

const MIN_DISTANCE = 55;
const MAX_DURATION_MS = 1000;
const VERTICAL_RATIO = 1.25;

export function useSwipeNavigation({ onStep, isLocked }) {
  const handlers = useLatest({ onStep, isLocked });

  useEffect(() => {
    let start = null;

    const handleStart = (event) => {
      const touch = event.changedTouches[0];
      start = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    };

    const handleEnd = (event) => {
      if (!start || handlers.current.isLocked()) return;

      const touch = event.changedTouches[0];
      const dx = start.x - touch.clientX;
      const dy = start.y - touch.clientY;
      const elapsed = Date.now() - start.time;
      start = null;

      const isVerticalSwipe =
        Math.abs(dy) >= MIN_DISTANCE &&
        Math.abs(dy) >= Math.abs(dx) * VERTICAL_RATIO &&
        elapsed <= MAX_DURATION_MS;

      if (isVerticalSwipe) handlers.current.onStep(dy > 0 ? 1 : -1);
    };

    document.addEventListener("touchstart", handleStart, { passive: true });
    document.addEventListener("touchend", handleEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", handleStart);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [handlers]);
}
