import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

export interface IridescenceProps {
  /** Custom CSS classes for container wrapper */
  className?: string;
  /** Primary custom RGB color array [r, g, b] (0.0 to 1.0) */
  color?: [number, number, number];
  /** Flow animation speed multiplier (Default: 1.8) */
  speed?: number;
  /** Liquid wave distortion amplitude (Default: 0.13) */
  amplitude?: number;
  /** CSS softness blur radius in pixels (Default: 6) */
  blur?: number;
  /** Rounded corner radius in pixels or CSS string (Default: 24) */
  borderRadius?: number | string;
  /** Enable subtle mouse interaction response (Default: true) */
  mouseReact?: boolean;
  /** Distortion wave intensity multiplier (Default: 1.0) */
  intensity?: number;
  /** Custom array of HEX color strings for palette blending */
  colors?: string[];
}

/** Helper: Convert Hex color "#RRGGBB" to normalized RGB array [r, g, b] (0.0 to 1.0) */
function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;
  return [r, g, b];
}

// Default Healthcare AI Brand Palette: Teal, Cyan, Emerald, Soft Blue
const DEFAULT_COLORS = [
  '#0d9488', // Healthcare Teal
  '#06b6d4', // Bright Cyan
  '#10b981', // Medical Emerald
  '#3b82f6', // Soft Clinical Blue
];

/**
 * GLSL Vertex Shader: Fullscreen Quad Pass-through
 */
const vertexShader = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

/**
 * GLSL Fragment Shader: Crisp Liquid-Glass Iridescence
 * Enhanced fluid motion with higher wave amplitude, crisp color transitions, and GPU acceleration.
 */
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uSpeed;
  uniform float uAmplitude;
  uniform float uIntensity;
  uniform vec3 uColor;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;

  varying vec2 vUv;

  void main() {
    // Normalize coordinates maintaining aspect ratio
    vec2 st = vUv;
    st.x *= uResolution.x / uResolution.y;

    // Fluid time multiplier tuned for 1.8 speed
    float t = uTime * uSpeed * 0.3;

    // Subtle mouse offset interaction
    vec2 mouseOffset = (uMouse - 0.5) * 0.35;
    vec2 p = (st + mouseOffset) * uIntensity * 2.0;

    // Multi-layered organic liquid wave distortion scaled by uAmplitude
    for(int i = 1; i <= 3; i++) {
      float fi = float(i);
      p.x += (uAmplitude / fi * 3.0) * sin(fi * 3.2 * p.y + t + float(i) * 1.4);
      p.y += (uAmplitude / fi * 3.0) * cos(fi * 3.2 * p.x + t + float(i) * 1.7);
    }

    // Dynamic wave patterns with crisper frequency definition
    float wavePattern = sin(p.x + p.y + t * 1.4) * 0.5 + 0.5;
    float secondaryWave = cos(p.x * 1.8 - p.y * 1.8 + t * 0.9) * 0.5 + 0.5;

    // Blend Palette & Custom Color
    vec3 baseColor1 = mix(uColor1, uColor, clamp(length(uColor), 0.0, 1.0));
    vec3 col = mix(baseColor1, uColor2, sin(st.x * 2.8 + t) * 0.5 + 0.5);
    col = mix(col, uColor3, wavePattern);
    col = mix(col, uColor4, secondaryWave * 0.5);

    // Crisper liquid glass sheen highlight (25% sharper definition)
    float glassSheen = pow(clamp(wavePattern, 0.0, 1.0), 2.8) * 0.28;
    col += vec3(glassSheen);

    // Light theme glass backdrop opacity blend
    vec3 lightBase = vec3(0.97, 0.98, 0.99); // #f8fafc
    vec3 finalColor = mix(lightBase, col, 0.42);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export const IridescenceBackground: React.FC<IridescenceProps> = ({
  className = '',
  color,
  speed = 1.8,
  amplitude = 0.13,
  blur = 6,
  borderRadius = 24,
  mouseReact = true,
  intensity = 1.0,
  colors = DEFAULT_COLORS,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SECTION 1: WebGL Renderer Setup via OGL
    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        antialias: true,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    const canvas = gl.canvas;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.filter = `blur(${blur}px)`;
    canvas.style.transform = 'translateZ(0)'; // GPU acceleration trigger
    container.appendChild(canvas);

    // SECTION 2: Geometry & Color Uniform Setup
    const geometry = new Triangle(gl);

    const palette = colors.length >= 4 ? colors : DEFAULT_COLORS;
    const c1 = hexToRgb(palette[0] || DEFAULT_COLORS[0]);
    const c2 = hexToRgb(palette[1] || DEFAULT_COLORS[1]);
    const c3 = hexToRgb(palette[2] || DEFAULT_COLORS[2]);
    const c4 = hexToRgb(palette[3] || DEFAULT_COLORS[3]);
    const customColor: [number, number, number] = color || [0, 0, 0];

    // SECTION 3: Shader Program Creation with Uniforms
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [container.clientWidth, container.clientHeight] },
        uMouse: { value: [0.5, 0.5] },
        uSpeed: { value: speed },
        uAmplitude: { value: amplitude },
        uIntensity: { value: intensity },
        uColor: { value: customColor },
        uColor1: { value: c1 },
        uColor2: { value: c2 },
        uColor3: { value: c3 },
        uColor4: { value: c4 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    // SECTION 4: Responsive Resize Handler
    function handleResize() {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // SECTION 5: Pointer Pass-through Mouse Tracking
    function handleMouseMove(e: MouseEvent) {
      if (!mouseReact || !container) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mousePos.current = { x, y };
    }

    if (mouseReact) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // SECTION 6: Continuous 60 FPS Render Loop
    let animationFrameId: number;
    let startTime = performance.now();

    function render(now: number) {
      const elapsed = (now - startTime) * 0.001;
      program.uniforms.uTime.value = elapsed;

      // Smooth lerp mouse position
      const currentMouse = program.uniforms.uMouse.value as [number, number];
      currentMouse[0] += (mousePos.current.x - currentMouse[0]) * 0.05;
      currentMouse[1] += (mousePos.current.y - currentMouse[1]) * 0.05;

      renderer.render({ scene: mesh });
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    // SECTION 7: Clean Resource Teardown
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (mouseReact) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      if (container && canvas.parentElement === container) {
        container.removeChild(canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [color, speed, amplitude, blur, intensity, colors, mouseReact]);

  const formattedRadius = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;

  return (
    <div
      ref={containerRef}
      style={{ borderRadius: formattedRadius }}
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
