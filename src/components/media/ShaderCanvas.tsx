"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Full-bleed WebGL "liquid satin" background.
 * Domain-warped simplex noise, lit like folded fabric, nudged by the cursor.
 * Renders at reduced resolution (it's soft by nature), pauses off-screen,
 * and freezes on a single frame for reduced-motion users.
 */

const VERT = /* glsl */ `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += a * snoise(p);
    p = r * p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float s = min(uRes.x, uRes.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / s;
  vec2 m = (uMouse * uRes - 0.5 * uRes) / s;
  float t = uTime * 0.04;

  // cursor influence
  vec2 dm = p - m;
  float mInf = exp(-dot(dm, dm) * 2.2) * (0.5 + 0.5 * uHover);

  // domain warp: large, slow folds
  vec2 base = p * 0.52 + vec2(0.0, t * 0.5);
  vec2 q = vec2(fbm(base + vec2(0.0, t)), fbm(base + vec2(5.2, 1.3) - t * 0.7));
  q += dm * mInf * 0.75;
  vec2 w = base + 1.05 * q + vec2(t * 0.3, -t * 0.2);

  // height field + finite-difference normal => satin shading
  float e = 0.02;
  float f = fbm(w);
  float fx = fbm(w + vec2(e, 0.0));
  float fy = fbm(w + vec2(0.0, e));
  vec3 n = normalize(vec3((f - fx) / e, (f - fy) / e, 2.2));
  vec3 l = normalize(vec3(-0.5, 0.6, 0.65));
  float diff = clamp(dot(n, l), 0.0, 1.0);
  float spec = pow(clamp(dot(reflect(-l, n), vec3(0.0, 0.0, 1.0)), 0.0, 1.0), 26.0);

  // palette (more ink, colour only on the crests)
  float k = clamp(f * 0.6 + 0.5, 0.0, 1.0);
  vec3 ink    = vec3(0.031, 0.031, 0.039);
  vec3 indigo = vec3(0.085, 0.065, 0.27);
  vec3 violet = vec3(0.43, 0.27, 0.95);
  vec3 ember  = vec3(1.00, 0.42, 0.24);
  vec3 cream  = vec3(1.00, 0.87, 0.76);

  vec3 col = mix(ink, indigo, smoothstep(0.26, 0.52, k));
  col = mix(col, violet, smoothstep(0.5, 0.74, k));
  col = mix(col, ember, smoothstep(0.7, 0.92, k) * 0.9);
  col *= 0.35 + 0.9 * diff;
  col += spec * mix(cream, ember, 0.3) * 0.5 * smoothstep(0.35, 0.75, k);

  // iridescent sheen on the folds
  vec3 irid = 0.5 + 0.5 * cos(6.2831 * (vec3(0.0, 0.33, 0.67) + n.x * 0.5 + n.y * 0.35 + t));
  col += irid * spec * 0.12;

  // cursor glow
  col += mix(violet, ember, 0.6) * mInf * 0.08;

  // composition: calm the left (headline side), let colour bloom top-right
  float vig = smoothstep(1.15, 0.05, length((uv - vec2(0.78, 0.7)) * vec2(1.0, 1.25)));
  col = mix(ink, col, 0.18 + 0.82 * vig);
  col = mix(col, ink, smoothstep(0.45, 0.0, uv.y) * 0.9);

  // dither / grain
  float g = fract(sin(dot(gl_FragCoord.xy + fract(uTime) * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (g - 0.5) * 0.03;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function ShaderCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      canvas.dataset.fallback = "true";
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      canvas.dataset.fallback = "true";
      return;
    }
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.dataset.fallback = "true";
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uHover = gl.getUniformLocation(prog, "uHover");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const scale = coarse ? 0.5 : 0.62;

    const mouse = { x: 0.68, y: 0.6, tx: 0.68, ty: 0.6, h: 0, th: 0 };
    let raf = 0;
    let visible = true;
    const t0 = performance.now() - 18000; // start mid-flow so the first frame is already interesting

    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const draw = (now: number) => {
      const time = (now - t0) / 1000;
      if (coarse) {
        // gentle autonomous drift on touch devices
        mouse.tx = 0.6 + Math.sin(time * 0.25) * 0.2;
        mouse.ty = 0.55 + Math.cos(time * 0.2) * 0.18;
      }
      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;
      mouse.h += (mouse.th - mouse.h) * 0.05;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uHover, mouse.h);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (!raf && !reduce) raf = requestAnimationFrame(loop);
    };

    resize();
    draw(performance.now());

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(performance.now());
    });
    ro.observe(canvas);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
      mouse.th = 1;
    };
    const onLeave = () => {
      mouse.th = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(canvas);

    const onVis = () => {
      if (!document.hidden) start();
    };
    document.addEventListener("visibilitychange", onVis);

    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn(
        "block h-full w-full",
        // graceful fallback when WebGL is unavailable
        "data-[fallback=true]:bg-[radial-gradient(60%_60%_at_75%_30%,#5b3bd6_0%,transparent_60%),radial-gradient(40%_40%_at_85%_60%,#ff6b3d_0%,transparent_60%),#08080a]",
        className,
      )}
    />
  );
}
