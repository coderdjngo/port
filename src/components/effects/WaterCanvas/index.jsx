import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { createWaterRenderer } from "./createWaterRenderer";
import { Canvas, FallbackImage, Wrapper } from "./styles";

const AMBIENT_DROP_INTERVAL = 2600;

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

const randomBetween = (min, max) => min + Math.random() * (max - min);

/**
 * 배경 이미지를 흐르는 수면처럼 렌더링한다.
 * - playing 동안만 렌더 루프와 인터랙션(커서 잔물결, 클릭 파문, 빗방울)이 동작
 * - WebGL 미지원 / 동작 줄이기 설정 시 정적 이미지로 대체
 */
export function WaterCanvas({ src, playing, intensity = 1 }) {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const [ready, setReady] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return undefined;

    let cancelled = false;

    loadImage(src)
      .then((image) => {
        if (cancelled) return;
        const renderer = createWaterRenderer(canvasRef.current, image, { intensity });
        if (!renderer) return;

        rendererRef.current = renderer;
        setReady(true);
      })
      .catch((error) => console.warn("[WaterCanvas] 물결 이미지 불러오기 실패함, 정적 이미지로 보여줌", error));

    return () => {
      cancelled = true;
      rendererRef.current?.dispose();
      rendererRef.current = null;
      setReady(false);
    };
  }, [src, intensity, reducedMotion]);

  useEffect(() => {
    if (!ready) return undefined;

    const canvas = canvasRef.current;
    const observer = new ResizeObserver(() => {
      rendererRef.current?.resize(canvas.clientWidth, canvas.clientHeight);
    });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, [ready]);

  useEffect(() => {
    if (!ready || !playing) return undefined;

    const renderer = rendererRef.current;
    const canvas = canvasRef.current;

    const toUv = ({ clientX, clientY }) => {
      const rect = canvas.getBoundingClientRect();
      return [(clientX - rect.left) / rect.width, (clientY - rect.top) / rect.height];
    };

    const handlePointerMove = (event) => renderer.setPointer(...toUv(event));
    const handlePointerDown = (event) => renderer.addRipple(...toUv(event), 1);
    const dropRain = () =>
      renderer.addRipple(Math.random(), randomBetween(0.45, 0.95), randomBetween(0.3, 0.6));

    let frameId;
    const loop = (now) => {
      renderer.render(now / 1000);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    const dropTimer = setInterval(dropRain, AMBIENT_DROP_INTERVAL);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      cancelAnimationFrame(frameId);
      clearInterval(dropTimer);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [ready, playing]);

  return (
    <Wrapper aria-hidden="true">
      <FallbackImage src={src} alt="" />
      {!reducedMotion && <Canvas ref={canvasRef} $visible={ready} />}
    </Wrapper>
  );
}
