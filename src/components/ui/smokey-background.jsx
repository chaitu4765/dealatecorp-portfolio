import { useEffect, useRef } from "react";

const vertexSource = `
  attribute vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

// Adapted from the supplied component, with a transparent blue glow.
const fragmentSource = `
  precision mediump float;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec2 iMouse;
  void main() {
    vec2 uv = (2.0 * gl_FragCoord.xy - iResolution) / min(iResolution.x, iResolution.y);
    vec2 mouse = 2.0 * iMouse - 1.0;
    float time = iTime * 0.3;
    for (float i = 1.0; i < 8.0; i++) {
      uv.x += 0.5 / i * cos(i * 2.0 * uv.y + time + mouse.x * 3.1415);
      uv.y += 0.5 / i * cos(i * 2.0 * uv.x + time + mouse.y * 3.1415);
    }
    float glow = 1.0 - smoothstep(0.2, 0.9, abs(sin(uv.x + uv.y + time)));
    gl_FragColor = vec4(vec3(0.32, 0.64, 0.94) * glow * 0.5, glow * 0.5);
  }
`;

export function SmokeyBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas.parentElement;
    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
    if (!gl) return;
    const shaders = [];
    let program;
    let buffer;
    const dispose = () => {
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      shaders.forEach((shader) => gl.deleteShader(shader));
    };
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
    };
    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    program = gl.createProgram();
    if (!vertex || !fragment || !program) {
      dispose();
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      dispose();
      return;
    }
    gl.useProgram(program);
    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const resolution = gl.getUniformLocation(program, "iResolution");
    const time = gl.getUniformLocation(program, "iTime");
    const mouse = gl.getUniformLocation(program, "iMouse");
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0.5, y: 0.5 };
    let frame;
    let lost = false;
    const start = performance.now();
    const draw = () => {
      if (lost) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(
        1,
        Math.min(2048, Math.round(host.clientWidth * ratio)),
      );
      const height = Math.max(
        1,
        Math.min(2048, Math.round(host.clientHeight * ratio)),
      );
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
      gl.uniform2f(resolution, width, height);
      gl.uniform1f(
        time,
        preference.matches ? 0 : (performance.now() - start) / 1000,
      );
      gl.uniform2f(mouse, pointer.x, pointer.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    const tick = () => {
      draw();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      if (document.hidden || lost) return;
      draw();
      if (!preference.matches) frame = requestAnimationFrame(tick);
    };
    const move = (event) => {
      if (preference.matches) return;
      const rect = host.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = 1 - (event.clientY - rect.top) / rect.height;
    };
    const leave = () => {
      pointer.x = pointer.y = 0.5;
    };
    const contextLost = () => {
      lost = true;
      cancelAnimationFrame(frame);
    };
    const sizes = new ResizeObserver(draw);
    sizes.observe(host);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    canvas.addEventListener("webglcontextlost", contextLost);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    sync();
    return () => {
      cancelAnimationFrame(frame);
      sizes.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("webglcontextlost", contextLost);
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", sync);
      dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="smokey-background"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
