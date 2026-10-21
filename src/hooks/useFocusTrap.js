import { useEffect } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useFocusTrap(refs, active) {
  useEffect(() => {
    if (!active) return undefined;

    const getFocusable = () =>
      refs.flatMap(({ current }) => {
        if (!current) return [];
        return current.matches(FOCUSABLE) ? [current] : [...current.querySelectorAll(FOCUSABLE)];
      });

    const handleKeyDown = (event) => {
      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
    // refs 배열은 렌더마다 새로 만들어지므로 active 변화에만 반응
  }, [active]);
}
