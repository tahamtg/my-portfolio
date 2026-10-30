"use client";

import { useEffect, useRef } from "react";

const TWO_PI = Math.PI * 2;
const DRIFT_X = Math.cos(-0.45);
const DRIFT_Y = Math.sin(-0.45);

interface StarfieldProps {
	starColor?: string;
	accentColor?: string;
	density?: number;
	layers?: number;
	driftSpeed?: number;
	twinkle?: number;
	shootingStars?: number;
	glow?: number;
	paused?: boolean;
	reducedMotion?: boolean;
	className?: string;
}

interface Star {
	x: number;
	y: number;
	size: number;
	baseAlpha: number;
	phase: number;
	depth: number;
	accent: boolean;
}

interface Shot {
	x: number;
	y: number;
	vx: number;
	vy: number;
	len: number;
	life: number;
	alive: boolean;
}

type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
	const h = hex.replace("#", "");
	const full =
		h.length === 3
			? h
					.split("")
					.map((c) => c + c)
					.join("")
			: h;
	const n = parseInt(full, 16);
	return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function Starfield({
	starColor = "#ffffff",
	accentColor = "#a855f7",
	density = 1,
	layers = 3,
	driftSpeed = 0.5,
	twinkle = 0.5,
	shootingStars = 0.4,
	glow = 8,
	paused = false,
	reducedMotion = false,
	className,
}: StarfieldProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const starsRef = useRef<Star[]>([]);
	const shotsRef = useRef<Shot[]>([]);
	const sizeRef = useRef({ w: 0, h: 0 });

	const live = useRef({
		starColor,
		accentColor,
		density,
		layers,
		driftSpeed,
		twinkle,
		shootingStars,
		glow,
		paused,
		reducedMotion,
	});
	live.current = {
		starColor,
		accentColor,
		density,
		layers,
		driftSpeed,
		twinkle,
		shootingStars,
		glow,
		paused,
		reducedMotion,
	};

	const rebuildRef = useRef<(() => void) | null>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const drawRef = useRef<(() => void | false) | null>(null);
	const measureRef = useRef<((m: Metrics) => void) | null>(null);

	const loop = useAnimationLoop({
		target: containerRef,
		halted: paused || reducedMotion,
		dpr: 2,
		resizeDebounceMs: 100,
		onResize: (metrics) => measureRef.current?.(metrics),
		onFrame: () => (drawRef.current ? drawRef.current() : false),
	});

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d", { alpha: true });
		if (!ctx) return;
		let t = 0;

		function depthOf(index: number, total: number) {
			return total <= 1 ? 1 : 0.3 + (0.7 * index) / (total - 1);
		}

		function initStars() {
			const { w, h } = sizeRef.current;
			const p = live.current;
			const total = Math.max(
				20,
				Math.min(600, Math.floor(((w * h) / 8000) * p.density)),
			);
			const layerCount = Math.max(1, Math.round(p.layers));
			const stars: Star[] = new Array(total);
			for (let i = 0; i < total; i++) {
				const layer = i % layerCount;
				const depth = depthOf(layer, layerCount);
				stars[i] = {
					x: Math.random() * w,
					y: Math.random() * h,
					size: (Math.random() * 0.9 + 0.4) * (0.5 + depth),
					baseAlpha: (Math.random() * 0.5 + 0.4) * (0.4 + depth * 0.6),
					phase: Math.random() * TWO_PI,
					depth,
					accent: Math.random() < 0.14,
				};
			}
			starsRef.current = stars;
			shotsRef.current = [];
			for (let i = 0; i < 4; i++) {
				shotsRef.current.push({
					x: 0,
					y: 0,
					vx: 0,
					vy: 0,
					len: 0,
					life: 0,
					alive: false,
				});
			}
		}

		measureRef.current = ({ width: w, height: h, dpr, bufferWidth, bufferHeight }) => {
			canvas!.width = bufferWidth;
			canvas!.height = bufferHeight;
			canvas!.style.width = `${w}px`;
			canvas!.style.height = `${h}px`;
			ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
			sizeRef.current = { w, h };
			initStars();
		};

		function spawnShot(shot: Shot) {
			const { w, h } = sizeRef.current;
			const fromTop = Math.random() < 0.6;
			const speed = 7 + Math.random() * 6;
			const angle = 2.3 + Math.random() * 0.5;
			shot.vx = Math.cos(angle) * speed;
			shot.vy = Math.sin(angle) * speed;
			shot.x = fromTop ? Math.random() * w : w + 20;
			shot.y = fromTop ? -20 : Math.random() * h * 0.5;
			shot.len = 80 + Math.random() * 120;
			shot.life = 1;
			shot.alive = true;
		}

		function drawStars(animate: boolean) {
			const { w, h } = sizeRef.current;
			const p = live.current;
			const stars = starsRef.current;
			const [sr, sg, sb] = hexToRgb(p.starColor);
			const [ar, ag, ab] = hexToRgb(p.accentColor);
			const drift = animate ? p.driftSpeed : 0;

			for (let i = 0; i < stars.length; i++) {
				const st = stars[i];
				if (animate && drift > 0) {
					const s = drift * (0.2 + st.depth) * 0.6;
					st.x += DRIFT_X * s;
					st.y += DRIFT_Y * s;
					if (st.x < 0) st.x += w;
					else if (st.x > w) st.x -= w;
					if (st.y < 0) st.y += h;
					else if (st.y > h) st.y -= h;
				}

				let alpha = st.baseAlpha;
				if (animate && p.twinkle > 0) {
					alpha *= 1 + Math.sin(t + st.phase) * p.twinkle;
				}
				alpha = Math.max(0, Math.min(1, alpha));

				const r = st.accent ? ar : sr;
				const g = st.accent ? ag : sg;
				const b = st.accent ? ab : sb;
				ctx!.beginPath();
				ctx!.arc(st.x, st.y, Math.max(0.2, st.size), 0, TWO_PI);
				ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
				if (p.glow > 0) {
					ctx!.shadowBlur = p.glow * st.depth;
					ctx!.shadowColor = `rgb(${r}, ${g}, ${b})`;
					ctx!.fill();
					ctx!.shadowBlur = 0;
				} else {
					ctx!.fill();
				}
			}
		}

		function drawShots() {
			const p = live.current;
			const { w, h } = sizeRef.current;
			const shots = shotsRef.current;
			const [ar, ag, ab] = hexToRgb(p.accentColor);

			if (p.shootingStars > 0 && Math.random() < p.shootingStars * 0.02) {
				const free = shots.find((s) => !s.alive);
				if (free) spawnShot(free);
			}

			for (let i = 0; i < shots.length; i++) {
				const sh = shots[i];
				if (!sh.alive) continue;
				sh.x += sh.vx;
				sh.y += sh.vy;
				const mag = Math.sqrt(sh.vx * sh.vx + sh.vy * sh.vy) || 1;
				const tx = sh.x - (sh.vx / mag) * sh.len;
				const ty = sh.y - (sh.vy / mag) * sh.len;
				const grad = ctx!.createLinearGradient(sh.x, sh.y, tx, ty);
				grad.addColorStop(0, `rgba(${ar}, ${ag}, ${ab}, ${0.9 * sh.life})`);
				grad.addColorStop(1, `rgba(${ar}, ${ag}, ${ab}, 0)`);
				ctx!.strokeStyle = grad;
				ctx!.lineWidth = 2;
				ctx!.lineCap = "round";
				ctx!.beginPath();
				ctx!.moveTo(sh.x, sh.y);
				ctx!.lineTo(tx, ty);
				ctx!.stroke();
				if (sh.x < -sh.len || sh.x > w + sh.len || sh.y > h + sh.len) {
					sh.alive = false;
				}
			}
		}

		function tick() {
			const p = live.current;
			const still = p.paused || p.reducedMotion;
			const { w, h } = sizeRef.current;
			ctx!.clearRect(0, 0, w, h);

			if (still) {
				drawStars(false);
				return false;
			}

			t += 0.04;
			if (t > TWO_PI) t -= TWO_PI;
			drawStars(true);
			drawShots();
		}
		drawRef.current = tick;

		loop.resize();
		loop.start();

		rebuildRef.current = () => {
			if (sizeRef.current.w > 0) {
				initStars();
				loop.paint();
			}
		};

		return () => {
			drawRef.current = null;
			measureRef.current = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		rebuildRef.current?.();
	}, [density, layers]);

	return (
		<div
			ref={containerRef}
			className={className}
			style={{ position: "relative", height: "100%", width: "100%" }}
		>
			<canvas
				ref={canvasRef}
				style={{
					position: "absolute",
					inset: 0,
					width: "100%",
					height: "100%",
				}}
			/>
		</div>
	);
}

import { useCallback, useLayoutEffect, useMemo} from "react";

export interface Metrics {
  width: number;
  height: number;
  dpr: number;
  bufferWidth: number;
  bufferHeight: number;
}

export interface FrameInfo {
  now: number;
  dt: number;
  elapsed: number;
  frame: number;
}

export interface AnimationLoopHandle {
  start(): void;
  stop(): void;
  paint(): void;
  resize(): void;
  readonly running: boolean;
}

export interface AnimationLoopOptions {
  target: React.RefObject<HTMLElement | null>;
  halted?: boolean;
  dpr?: number | "auto";
  onResize?(metrics: Metrics): void;
  onFrame?(info: FrameInfo): void | false;
  paintWhenHalted?: boolean;
  resizeDebounceMs?: number;
  gl?(): WebGLRenderingContext | WebGL2RenderingContext | null | undefined;
  onDispose?(): void;
  deps?: unknown[];
}

const MAX_DT = 1 / 15;

export function useAnimationLoop(
  options: AnimationLoopOptions,
): AnimationLoopHandle {
  const opts = useRef(options);
  useLayoutEffect(() => {
    opts.current = options;
  });

  const raf = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const running = useRef(false);
  const disposed = useRef(false);
  const startedAt = useRef(0);
  const last = useRef(0);
  const frame = useRef(0);

  const measure = useCallback((): Metrics | null => {
    const el = opts.current.target.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const cap = opts.current.dpr ?? "auto";
    const limit = cap === "auto" ? 2 : cap;
    const dpr = Math.min(
      typeof window === "undefined" ? 1 : window.devicePixelRatio || 1,
      limit,
    );
    return {
      width: rect.width,
      height: rect.height,
      dpr,
      bufferWidth: Math.max(1, Math.round(rect.width * dpr)),
      bufferHeight: Math.max(1, Math.round(rect.height * dpr)),
    };
  }, []);

  const tick = useCallback(function tick(now: number) {
    if (disposed.current) return;

    if (startedAt.current === 0) startedAt.current = now;
    const dt = last.current === 0 ? 0 : Math.min((now - last.current) / 1000, MAX_DT);
    last.current = now;

    const info: FrameInfo = {
      now,
      dt,
      elapsed: (now - startedAt.current) / 1000,
      frame: frame.current++,
    };

    const verdict = opts.current.onFrame?.(info);

    if (disposed.current) return;

    if (verdict === false || opts.current.halted) {
      running.current = false;
      raf.current = null;
      return;
    }
    raf.current = requestAnimationFrame(tick);
  }, []);

  const start = useCallback(() => {
    if (disposed.current || running.current) return;
    running.current = true;
    last.current = 0;
    raf.current = requestAnimationFrame(tick);
  }, [tick]);

  const stop = useCallback(() => {
    running.current = false;
    if (raf.current !== null) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
  }, []);

  const paint = useCallback(() => start(), [start]);

  const resize = useCallback(() => {
    const metrics = measure();
    if (!metrics) return;
    opts.current.onResize?.(metrics);
    if (opts.current.paintWhenHalted !== false) paint();
    else if (!opts.current.halted) start();
  }, [measure, paint, start]);

  const deps = options.deps ?? [];

  useEffect(() => {
    disposed.current = false;
    const el = opts.current.target.current;
    if (!el) return;

    const run = () => {
      if (disposed.current) return;
      resize();
    };

    const observer = new ResizeObserver(() => {
      const wait = opts.current.resizeDebounceMs ?? 0;
      if (wait <= 0) {
        run();
        return;
      }
      if (timer.current !== null) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        timer.current = null;
        run();
      }, wait);
    });
    observer.observe(el);

    resize();
    if (!opts.current.halted) start();

    return () => {
      disposed.current = true;
      running.current = false;
      if (raf.current !== null) {
        cancelAnimationFrame(raf.current);
        raf.current = null;
      }
      if (timer.current !== null) {
        clearTimeout(timer.current);
        timer.current = null;
      }
      observer.disconnect();
      opts.current.onDispose?.();
      const context = opts.current.gl?.();
      context?.getExtension("WEBGL_lose_context")?.loseContext();
      startedAt.current = 0;
      last.current = 0;
      frame.current = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const halted = options.halted ?? false;
  useEffect(() => {
    if (!halted) start();
  }, [halted, start]);

  return useMemo<AnimationLoopHandle>(
    () => ({
      start,
      stop,
      paint,
      resize,
      get running() {
        return running.current;
      },
    }),
    [start, stop, paint, resize],
  );
}

<Starfield
  starColor="#ffffff"
  accentColor="#ffffff"
  density={1}
  layers={3}
  driftSpeed={0.5}
  twinkle={0.5}
  shootingStars={0.4}
  glow={5}
/>

