import { MAX_RIPPLES, fragmentShader, vertexShader } from "./shaders";

const MAX_PIXEL_RATIO = 1.25;
const RIPPLE_LIFETIME = 4;
const POINTER_EASE = 0.12;
const POINTER_DECAY = 0.95;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`셰이더 컴파일 실패함: ${log}`);
  }
  return shader;
}

function createProgram(gl) {
  const program = gl.createProgram();
  gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, vertexShader));
  gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader));
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`셰이더 프로그램 연결 실패함: ${gl.getProgramInfoLog(program)}`);
  }
  return program;
}

function createFullscreenQuad(gl, program) {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

  const location = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
  return buffer;
}

function createImageTexture(gl, image) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  return texture;
}

/**
 * 이미지 위에 흐르는 물결 · 커스틱 · 파문을 그리는 WebGL 렌더러.
 * WebGL을 쓸 수 없으면 null을 반환한다.
 */
export function createWaterRenderer(canvas, image, { intensity = 1 } = {}) {
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
  if (!gl) return null;

  const program = createProgram(gl);
  gl.useProgram(program);

  const buffer = createFullscreenQuad(gl, program);
  const texture = createImageTexture(gl, image);

  const uniform = (name) => gl.getUniformLocation(program, name);
  const uniforms = {
    resolution: uniform("uResolution"),
    imageSize: uniform("uImageSize"),
    time: uniform("uTime"),
    intensity: uniform("uIntensity"),
    pointer: uniform("uPointer"),
    ripples: uniform("uRipples"),
  };

  gl.uniform2f(uniforms.imageSize, image.naturalWidth, image.naturalHeight);
  gl.uniform1f(uniforms.intensity, intensity);

  const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, energy: 0 };
  const rippleData = new Float32Array(MAX_RIPPLES * 4);
  let ripples = [];
  let time = 0;

  const resize = (width, height) => {
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    canvas.width = Math.max(1, Math.round(width * ratio));
    canvas.height = Math.max(1, Math.round(height * ratio));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
  };

  const setPointer = (x, y) => {
    const movement = Math.hypot(x - pointer.targetX, y - pointer.targetY);
    pointer.targetX = x;
    pointer.targetY = y;
    pointer.energy = Math.min(1, pointer.energy + movement * 8);
  };

  const addRipple = (x, y, strength = 1) => {
    ripples = [...ripples, { x, y, start: time, strength }].slice(-MAX_RIPPLES);
  };

  const updateRipples = () => {
    ripples = ripples.filter(({ start }) => time - start < RIPPLE_LIFETIME);
    rippleData.fill(0);
    ripples.forEach(({ x, y, start, strength }, i) => {
      rippleData.set([x, y, start, strength], i * 4);
    });
    gl.uniform4fv(uniforms.ripples, rippleData);
  };

  const render = (seconds) => {
    time = seconds;
    pointer.x += (pointer.targetX - pointer.x) * POINTER_EASE;
    pointer.y += (pointer.targetY - pointer.y) * POINTER_EASE;
    pointer.energy *= POINTER_DECAY;

    updateRipples();
    gl.uniform1f(uniforms.time, time);
    gl.uniform3f(uniforms.pointer, pointer.x, pointer.y, pointer.energy);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const dispose = () => {
    gl.deleteTexture(texture);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };

  return { resize, setPointer, addRipple, render, dispose };
}
