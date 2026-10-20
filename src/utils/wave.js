const TAU = Math.PI * 2;

/**
 * 진행도(progress)에 따라 화면을 물결 경계로 채우는 clip-path 경로를 만듬
 * direction 1: 아래에서 위로 차오름 / -1: 위에서 아래로 내려옴
 */
const WAVE_HEIGHT_RATIO = 0.06;
const MAX_WAVE_HEIGHT = 60;
const MAIN_WAVES = 0.75;
const SUB_WAVES = 1.6;

export function createWaveClipPath({ width, height, progress, direction, segments = 48 }) {
  const amplitude = Math.sin(Math.PI * progress) * Math.min(height * WAVE_HEIGHT_RATIO, MAX_WAVE_HEIGHT);
  const level = direction > 0 ? height * (1 - progress) : height * progress;
  const phase = progress * Math.PI * 1.2;
  const edgeY = direction > 0 ? height : 0;

  const points = Array.from({ length: segments + 1 }, (_, i) => {
    const ratio = i / segments;
    const y =
      level +
      amplitude * Math.sin(ratio * TAU * MAIN_WAVES + phase) +
      amplitude * 0.2 * Math.sin(ratio * TAU * SUB_WAVES - phase * 1.3);
    return `L${(ratio * width).toFixed(1)},${y.toFixed(1)}`;
  });

  return `path("M0,${edgeY} ${points.join(" ")} L${width},${edgeY} Z")`;
}

/**
 * 끊김 없이 반복되는 사인파 SVG path (viewBox 기준 너비 = width * 2)
 */
export function createLoopingWavePath({ width, height, amplitude, waves = 2 }) {
  const totalWidth = width * 2;
  const steps = 120;
  const baseline = height / 2;

  const points = Array.from({ length: steps + 1 }, (_, i) => {
    const x = (i / steps) * totalWidth;
    const y = baseline + Math.sin((x / width) * TAU * waves) * amplitude;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return `M${points.join(" L")} L${totalWidth},${height} L0,${height} Z`;
}
