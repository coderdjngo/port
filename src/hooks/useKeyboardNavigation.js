import { useEffect } from "react";
import { useLatest } from "./useLatest";

const FORM_TAGS = ["INPUT", "TEXTAREA", "SELECT"];

export function useKeyboardNavigation({ onStep, onFirst, onLast, isLocked }) {
  const handlers = useLatest({ onStep, onFirst, onLast, isLocked });

  useEffect(() => {
    const keyActions = {
      ArrowDown: () => handlers.current.onStep(1),
      PageDown: () => handlers.current.onStep(1),
      ArrowUp: () => handlers.current.onStep(-1),
      PageUp: () => handlers.current.onStep(-1),
      Home: () => handlers.current.onFirst(),
      End: () => handlers.current.onLast(),
    };

    const handleKeyDown = (event) => {
      if (handlers.current.isLocked()) return;

      const tag = document.activeElement?.tagName;
      if (FORM_TAGS.includes(tag)) return;
  
      if (tag === "BUTTON" && ["ArrowUp", "ArrowDown"].includes(event.key)) return;

      const action = keyActions[event.key];
      if (!action) return;

      event.preventDefault();
      action();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handlers]);
}
