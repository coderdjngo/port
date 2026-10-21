import { createLoopingWavePath } from "../../../utils/wave";
import { WaveLayer, WaveSvg, Waves } from "./styles";

const VIEW_WIDTH = 1440;
const VIEW_HEIGHT = 120;

/** 뒤쪽일수록 느리고 옅게: 겹쳐진 파도가 서로 다른 속도로 흐른다 */
const LAYERS = [
  { amplitude: 18, waves: 2, duration: 22, opacity: 0.05, offset: 0 },
  { amplitude: 13, waves: 3, duration: 16, opacity: 0.07, offset: 14 },
  { amplitude: 9, waves: 4, duration: 11, opacity: 0.1, offset: 30 },
].map((layer) => ({
  ...layer,
  path: createLoopingWavePath({
    width: VIEW_WIDTH,
    height: VIEW_HEIGHT,
    amplitude: layer.amplitude,
    waves: layer.waves,
  }),
}));

export function FlowingWaves({ color = "#a4d4ef", height = 120 }) {
  return (
    <Waves aria-hidden="true" $height={height}>
      {LAYERS.map(({ path, duration, opacity, offset }) => (
        <WaveLayer key={duration} $duration={duration} $offset={offset}>
          <WaveSvg viewBox={`0 0 ${VIEW_WIDTH * 2} ${VIEW_HEIGHT}`} preserveAspectRatio="none">
            <path d={path} fill={color} fillOpacity={opacity} />
          </WaveSvg>
        </WaveLayer>
      ))}
    </Waves>
  );
}
