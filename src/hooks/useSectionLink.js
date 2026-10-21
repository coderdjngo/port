import { useCallback } from "react";
import { useFullpage } from "../contexts/FullpageContext";


export function useSectionLink(target, { onNavigate } = {}) {
  const { goToId } = useFullpage();

  const onClick = useCallback(
    (event) => {
      event.preventDefault();
      if (onNavigate) onNavigate(target);
      else goToId(target);
    },
    [goToId, onNavigate, target],
  );

  return { href: `#${target}`, onClick };
}
