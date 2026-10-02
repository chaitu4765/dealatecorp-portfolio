import { useEffect, useRef } from "react";

export function LogoShader() {
  const canvas = useRef(null);
  useEffect(() => {
    const el = canvas.current,
      gl = el.getContext("webgl", { alpha: true });
    if (!gl) return;
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };
    const vertex = compile(
      gl.VERTEX_SHADER,
      "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}",
    );
    const fragment = compile(
      gl.FRAGMENT_SHADER,
      `precision mediump float;uniform float t;uniform vec2 mouse;uniform float energy;
void main(){vec2 p=(gl_FragCoord.xy/768.-.5)*2.;float r=length(p);float a=atan(p.y,p.x);float focus=exp(-length(p-mouse)*1.8);float wave=sin(a*5.+t*1.4+r*12.+dot(p,mouse)*9.)*.5+.5;float ripple=sin(r*26.-t*5.-focus*8.)*.5+.5;float radius=.66+wave*.09*energy+focus*.045;float ring=exp(-pow((r-radius)*15.,2.));float halo=exp(-pow((r-radius-.12)*5.,2.))*(.18+.25*energy);vec3 col=mix(vec3(.34,.43,.54),vec3(.68,.79,.88),wave*.75+focus*.25);col+=vec3(.76,.82,.9)*ripple*focus*.32;float alpha=ring*(.68+.32*energy)+halo;gl_FragColor=vec4(col*alpha,alpha);}`,
    );
    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }
    gl.useProgram(program);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const p = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(p);
    gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);
    const time = gl.getUniformLocation(program, "t"),
      mouse = gl.getUniformLocation(program, "mouse"),
      energyUniform = gl.getUniformLocation(program, "energy");
    el.width = 768;
    el.height = 768;
    gl.viewport(0, 0, 768, 768);
    let frame = 0,
      visible = true,
      x = 0,
      y = 0,
      targetX = 0,
      targetY = 0,
      energy = 0.25,
      targetEnergy = 0.25,
      previousX = 0,
      previousY = 0;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const draw = (stamp = 0) => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      energy += (targetEnergy - energy) * 0.09;
      targetEnergy = Math.max(0.22, targetEnergy * 0.975);
      gl.uniform1f(time, motion.matches ? 0 : stamp / 1000);
      gl.uniform2f(mouse, x, y);
      gl.uniform1f(energyUniform, motion.matches ? 0.22 : energy);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (visible && !document.hidden && !motion.matches)
        frame = requestAnimationFrame(draw);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      draw();
    };
    const move = (e) => {
      if (motion.matches) return;
      const b = el.getBoundingClientRect();
      targetX = ((e.clientX - b.left) / b.width - 0.5) * 2;
      targetY = (0.5 - (e.clientY - b.top) / b.height) * 2;
      const speed = Math.hypot(targetX - previousX, targetY - previousY);
      targetEnergy = Math.min(1.8, 0.65 + speed * 8);
      previousX = targetX;
      previousY = targetY;
      const brand = el.closest(".logo-shader");
      const rect = brand.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      brand.style.setProperty("--logo-x", `${px * 100}%`);
      brand.style.setProperty("--logo-y", `${py * 100}%`);
      brand.style.setProperty("--logo-tilt-x", `${py * -16}deg`);
      brand.style.setProperty("--logo-tilt-y", `${px * 16}deg`);
      brand.style.setProperty("--logo-shift-x", `${px * 8}px`);
      brand.style.setProperty("--logo-shift-y", `${py * 8}px`);
    };
    const parent = el.closest(".department-constellation");
    parent?.addEventListener("pointermove", move);
    const leave = () => {
      targetX = 0;
      targetY = 0;
      targetEnergy = 0.25;
      const brand = el.closest(".logo-shader");
      brand?.style.setProperty("--logo-tilt-x", "0deg");
      brand?.style.setProperty("--logo-tilt-y", "0deg");
      brand?.style.setProperty("--logo-shift-x", "0px");
      brand?.style.setProperty("--logo-shift-y", "0px");
    };
    parent?.addEventListener("pointerleave", leave);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      restart();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", restart);
    motion.addEventListener("change", restart);
    draw();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      parent?.removeEventListener("pointermove", move);
      parent?.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", restart);
      motion.removeEventListener("change", restart);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);
  return (
    <div className="logo-shader">
      <canvas ref={canvas} aria-hidden="true" />
      <div className="logo-shader__core">
        <img src="/assets/icons/dc-logo.png" alt="Dealatecorp" />
      </div>
      <span>ONE CONNECTED VISION</span>
    </div>
  );
}
