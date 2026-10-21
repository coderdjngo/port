import { useCallback, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { Layer, Ring } from "./styles";

const RING_DELAYS = [0, 0.14, 0.28];
let dropId = 0;

/** 화면 어디를 클릭해도 물방울이 떨어진 듯한 동심원이 퍼진다 */
export function ClickRipple() {
  const [drops, setDrops] = useState([]);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;

    const handlePointerDown = ({ clientX, clientY }) => {
      setDrops((list) => [...list, { id: ++dropId, x: clientX, y: clientY }]);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [reducedMotion]);

  const removeDrop = useCallback((id) => {
    setDrops((list) => list.filter((drop) => drop.id !== id));
  }, []);

  return (
    <Layer aria-hidden="true">
      {drops.map(({ id, x, y }) =>
        RING_DELAYS.map((delay, index) => (
          <Ring
            key={`${id}-${index}`}
            style={{ left: x, top: y }}
            $delay={delay}
            onAnimationEnd={index === RING_DELAYS.length - 1 ? () => removeDrop(id) : undefined}
          />
        )),
      )}
    </Layer>
  );
}
