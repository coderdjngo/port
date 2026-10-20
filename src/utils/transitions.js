import gsap from "gsap";
import { createWaveClipPath } from "./wave";

const PANEL_DURATION = 1.8;
export const CONTENT_ENTER_DELAY = 0.9;

export function playPanelTransition({ from, to, direction, onComplete }) {
  const { innerWidth: width, innerHeight: height } = window;
  const wave = { progress: 0 };

  const applyClip = () => {
    to.style.clipPath = createWaveClipPath({ width, height, direction, progress: wave.progress });
  };

  const cleanUp = () => {
    to.style.clipPath = "";
    gsap.set([from, to], { clearProps: "transform,opacity" });
  };

  applyClip();

  return gsap
    .timeline({
      onComplete: () => {
        cleanUp();
        onComplete();
      },
      onInterrupt: cleanUp,
    })
    .to(wave, { progress: 1, duration: PANEL_DURATION, ease: "sine.inOut", onUpdate: applyClip }, 0)
    .fromTo(to, { scale: 1.05 }, { scale: 1, duration: PANEL_DURATION, ease: "power2.out" }, 0)
    .to(
      from,
      { yPercent: -direction * 14, opacity: 0.35, duration: PANEL_DURATION, ease: "power3.inOut" },
      0,
    );
}

export function playContentEnter(elements, { delay = 0 } = {}) {
  if (!elements.length) return null;

  return gsap.fromTo(
    elements,
    { y: 45, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, delay, stagger: 0.1, ease: "power3.out", overwrite: true },
  );
}
