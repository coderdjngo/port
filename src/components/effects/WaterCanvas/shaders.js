export const MAX_RIPPLES = 8;

export const vertexShader = /* glsl */ `
  attribute vec2 aPosition;
  varying vec2 vUv;

  void main() {
    // vUv.y = 0 이 화면 위쪽 (이미지 행 순서와 동일)
    vUv = vec2(aPosition.x * 0.5 + 0.5, 0.5 - aPosition.y * 0.5);
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
  #else
    precision mediump float;
  #endif

  #define MAX_RIPPLES ${MAX_RIPPLES}
  #define TAU 6.28318530718

  varying vec2 vUv;

  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageSize;
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uPointer;                 // xy: uv 좌표, z: 움직임 에너지
  uniform vec4 uRipples[MAX_RIPPLES];    // xy: uv 좌표, z: 시작 시간, w: 세기

  // background-size: cover 와 같은 이미지 좌표
  vec2 coverUv(vec2 uv) {
    float screenRatio = uResolution.x / uResolution.y;
    float imageRatio = uImageSize.x / uImageSize.y;
    vec2 scale = screenRatio > imageRatio
      ? vec2(1.0, imageRatio / screenRatio)
      : vec2(screenRatio / imageRatio, 1.0);
    return clamp((uv - 0.5) * scale + 0.5, 0.001, 0.999);
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.03;
      amplitude *= 0.5;
    }
    return value;
  }

  // 수면 아래로 일렁이는 빛(커스틱)
  float caustic(vec2 uv, float time) {
    vec2 p = mod(uv * TAU, TAU) - 250.0;
    vec2 i = p;
    float c = 1.0;
    float inten = 0.005;
    for (int n = 0; n < 4; n++) {
      float t = time * (1.0 - (3.5 / float(n + 1)));
      i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
      c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
    }
    c /= 4.0;
    c = 1.17 - pow(c, 1.4);
    return pow(abs(c), 8.0);
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 p = vec2(vUv.x * aspect, vUv.y);
    float t = uTime;

    // 1) 끊임없이 흐르는 물결 왜곡
    vec2 flowPoint = p * vec2(2.2, 3.4) + vec2(t * 0.06, -t * 0.11);
    float n1 = fbm(flowPoint);
    float n2 = fbm(flowPoint * 1.7 + vec2(-t * 0.08, t * 0.05) + n1);
    vec2 flow = (vec2(n1, n2) - 0.5) * 0.028 * uIntensity;
    flow.y += sin(p.x * 9.0 + t * 1.2 + n1 * 5.0) * 0.0025 * uIntensity;

    // 2) 커서를 따라 번지는 잔물결
    vec2 toPointer = p - vec2(uPointer.x * aspect, uPointer.y);
    float pointerDist = length(toPointer) + 0.0001;
    vec2 ripple = toPointer / pointerDist
      * sin(pointerDist * 55.0 - t * 6.0)
      * exp(-pointerDist * 7.0) * 0.008 * uPointer.z;

    // 3) 클릭 / 빗방울 파문
    for (int i = 0; i < MAX_RIPPLES; i++) {
      vec4 drop = uRipples[i];
      if (drop.w <= 0.0) continue;

      float age = t - drop.z;
      vec2 delta = p - vec2(drop.x * aspect, drop.y);
      float dist = length(delta) + 0.0001;
      float front = dist - age * 0.35;
      float ring = exp(-pow(front * 14.0, 2.0));
      float wave = sin(front * 70.0) * ring * exp(-age * 1.1) * drop.w;
      ripple += delta / dist * wave * 0.018;
    }

    vec3 color = texture2D(uTexture, coverUv(vUv + flow + ripple)).rgb;

    float luminance = dot(color, vec3(0.299, 0.587, 0.114));
    float light = caustic(p * 2.6 + flow * 18.0, t * 0.5);
    color += vec3(0.62, 0.84, 1.0) * light * 0.2 * uIntensity * (0.35 + luminance);
    color += vec3(0.8, 0.93, 1.0) * length(ripple) * 6.0;

    gl_FragColor = vec4(color, 1.0);
  }
`;
