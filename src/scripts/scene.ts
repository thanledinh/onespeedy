// Cảnh WebGL nền: hàng nghìn hạt sáng biến hình theo từng section khi cuộn.
//   ring   — chữ O của logo (hero, CTA)
//   sphere — quả địa cầu (Việt Nam & quốc tế)
//   wave   — mặt sóng (dịch vụ)
//   galaxy — thiên hà xoắn ốc (quy trình)
//   frame  — khung trình duyệt website (dự án)
//   helix  — xoắn kép (lab)
//   knot   — nút xuyến vô tận (lab)
// Giữa hai section, hạt vỡ ra rồi gộp lại thành hình mới. Canvas được giữ qua các lần chuyển trang.
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer,
} from 'three';

// Hình học chữ O theo Brand Kit (viewBox 770, tâm 385, bán kính ngoài 385, trong 243)
const R_OUT = 1;
const R_IN = 243 / 385;
const R_MID = (R_OUT + R_IN) / 2;
const GAP_FROM = (21.3 * Math.PI) / 180;
const GAP_TO = (58.6 * Math.PI) / 180;
const DOT_ANGLE = (40 * Math.PI) / 180;
const DOT_R = 71 / 385;

export const SHAPES = ['ring', 'sphere', 'wave', 'galaxy', 'frame', 'helix', 'knot'] as const;
export type ShapeName = (typeof SHAPES)[number];
export type Place = 'hero' | 'corner' | 'right' | 'left' | 'center';

export interface Anchor {
  /** scrollY tại đó hình này hiện đầy đủ */
  y: number;
  shape: ShapeName;
  place: Place;
  opacity: number;
}

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uForm;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uBreak;
  uniform vec4 uWa;   // ring, sphere, wave, galaxy
  uniform vec4 uWb;   // frame, helix, knot, (trống)
  uniform vec2 uMouse;
  uniform float uMouseForce;
  attribute vec3 aScatter;
  attribute vec3 aSphere;
  attribute vec3 aWave;
  attribute vec3 aGalaxy;
  attribute vec3 aFrame;
  attribute vec3 aHelix;
  attribute vec3 aKnot;
  attribute vec4 aRand; // x: size, y: phase, z: color, w: speed
  varying float vColor;
  varying float vAlpha;

  mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

  void main() {
    // --- Từng hình, có chuyển động riêng ---
    vec3 sph = aSphere;
    sph.xz = rot(uTime * 0.18) * sph.xz;

    vec3 wav = aWave;
    wav.y += sin(wav.x * 2.4 + uTime * 0.9) * 0.14 + cos(wav.z * 3.2 + uTime * 0.7) * 0.09;
    wav.yz = rot(-0.62) * wav.yz;

    vec3 gal = aGalaxy;
    gal.xz = rot(uTime * 0.07) * gal.xz;
    gal.yz = rot(-1.05) * gal.yz;

    vec3 frm = aFrame;
    frm.y += sin(uTime * 0.8 + frm.x) * 0.02;

    vec3 hel = aHelix;
    hel.xz = rot(uTime * 0.35) * hel.xz;
    hel.xy = rot(0.5) * hel.xy;

    vec3 knt = aKnot;
    knt.xy = rot(uTime * 0.12) * knt.xy;
    knt.yz = rot(sin(uTime * 0.2) * 0.4) * knt.yz;

    vec3 shape = position * uWa.x + sph * uWa.y + wav * uWa.z + gal * uWa.w
      + frm * uWb.x + hel * uWb.y + knt * uWb.z;

    // --- Hội tụ lúc mở đầu ---
    float delay = aRand.y * 0.55;
    float f = smoothstep(delay, delay + 0.45, uForm);
    vec3 p = mix(aScatter, shape, f);

    // --- Vỡ ra khi chuyển giữa hai hình ---
    float brk = clamp(uBreak * 1.35 - aRand.y * 0.35, 0.0, 1.0);
    vec3 cloud = aScatter * 0.62 + vec3(0.0, 0.0, 0.6);
    p = mix(p, cloud, brk * brk * (3.0 - 2.0 * brk));

    // Dao động nhẹ
    float ang = atan(p.y, p.x);
    p.z += sin(ang * 3.0 + uTime * 0.7 + aRand.y * 6.2831) * 0.03 * f;
    p.xy += vec2(
      cos(uTime * aRand.w + aRand.y * 20.0),
      sin(uTime * aRand.w * 1.3 + aRand.y * 10.0)
    ) * 0.012;

    vec4 world = modelMatrix * vec4(p, 1.0);

    // Hạt bị đẩy ra quanh con trỏ chuột
    vec2 d = world.xy - uMouse;
    float dist = length(d);
    float push = smoothstep(0.55, 0.0, dist) * uMouseForce;
    world.xy += (d / (dist + 0.0001)) * push * 0.22;
    world.z += push * 0.15;

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aRand.x * uPixelRatio * (1.0 / -mv.z);

    vColor = aRand.z;
    float twinkle = 0.775 + 0.225 * sin(uTime * 1.6 + aRand.y * 40.0);
    vAlpha = mix(0.35, 1.0, f) * twinkle * mix(1.0, 0.55, brk);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uTeal;
  uniform float uOpacity;
  varying float vColor;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = pow(smoothstep(0.5, 0.0, d), 1.7);
    vec3 col = vColor > 0.95 ? uTeal : mix(uColorA, uColorB, vColor / 0.95);
    gl_FragColor = vec4(col, a * vAlpha * uOpacity);
  }
`;

function gauss() {
  return (Math.random() + Math.random() + Math.random() + Math.random() - 2) / 2;
}

// ---------- Sinh toạ độ cho từng hình ----------

function ringPoint(out: Float32Array, i: number) {
  const span = Math.PI * 2 - (GAP_TO - GAP_FROM);
  const a = GAP_TO + Math.random() * span;
  const halo = Math.random() < 0.12;
  let r = Math.sqrt(R_IN * R_IN + Math.random() * (R_OUT * R_OUT - R_IN * R_IN));
  if (halo) r = R_MID + gauss() * 0.35;
  out[i * 3] = Math.cos(a) * r;
  out[i * 3 + 1] = Math.sin(a) * r;
  out[i * 3 + 2] = gauss() * (halo ? 0.25 : 0.09);
  return halo;
}

function spherePoints(n: number) {
  const out = new Float32Array(n * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const inner = Math.random() < 0.1 ? 0.55 + Math.random() * 0.4 : 1 + gauss() * 0.015;
    out[i * 3] = Math.cos(th) * r * inner;
    out[i * 3 + 1] = y * inner;
    out[i * 3 + 2] = Math.sin(th) * r * inner;
  }
  return shuffle(out, n);
}

function wavePoints(n: number) {
  const out = new Float32Array(n * 3);
  const W = 3.4;
  const D = 1.9;
  const cols = Math.round(Math.sqrt((n * W) / D));
  const rows = Math.ceil(n / cols);
  for (let i = 0; i < n; i++) {
    const cx = i % cols;
    const cz = Math.floor(i / cols);
    out[i * 3] = (cx / (cols - 1) - 0.5) * W + gauss() * 0.006;
    out[i * 3 + 1] = gauss() * 0.01;
    out[i * 3 + 2] = (cz / (rows - 1) - 0.5) * D + gauss() * 0.006;
  }
  return shuffle(out, n);
}

function galaxyPoints(n: number) {
  const out = new Float32Array(n * 3);
  const arms = 3;
  for (let i = 0; i < n; i++) {
    const r = Math.pow(Math.random(), 0.65) * 1.45;
    const arm = ((i % arms) / arms) * Math.PI * 2;
    const spin = r * 2.8;
    const spread = (gauss() * 0.42) / (r + 0.35);
    const a = arm + spin + spread;
    out[i * 3] = Math.cos(a) * r + gauss() * 0.03;
    out[i * 3 + 1] = gauss() * 0.06 * (1.5 - r);
    out[i * 3 + 2] = Math.sin(a) * r + gauss() * 0.03;
  }
  return out;
}

/** Khung trình duyệt: viền, thanh tiêu đề, 3 chấm, dòng chữ, nút, khối ảnh */
function framePoints(n: number) {
  const out = new Float32Array(n * 3);
  const W = 2.5;
  const H = 1.65;
  const x0 = -W / 2;
  const y0 = H / 2;
  const barY = y0 - 0.22;
  const rect = (u: number, v: number, w: number, h: number) => [u + Math.random() * w, v - Math.random() * h];
  const line = (ax: number, ay: number, bx: number, by: number) => {
    const t = Math.random();
    return [ax + (bx - ax) * t, ay + (by - ay) * t];
  };
  for (let i = 0; i < n; i++) {
    const k = Math.random();
    let x: number, y: number;
    if (k < 0.34) {
      // viền ngoài
      const per = Math.random() * 2 * (W + H);
      if (per < W) [x, y] = [x0 + per, y0];
      else if (per < W + H) [x, y] = [x0 + W, y0 - (per - W)];
      else if (per < 2 * W + H) [x, y] = [x0 + W - (per - W - H), y0 - H];
      else [x, y] = [x0, y0 - H + (per - 2 * W - H)];
      x += gauss() * 0.008;
      y += gauss() * 0.008;
    } else if (k < 0.42) {
      [x, y] = line(x0, barY, x0 + W, barY);
    } else if (k < 0.47) {
      // 3 chấm
      const c = Math.floor(Math.random() * 3);
      const a = Math.random() * Math.PI * 2;
      const rr = Math.sqrt(Math.random()) * 0.035;
      x = x0 + 0.14 + c * 0.11 + Math.cos(a) * rr;
      y = y0 - 0.11 + Math.sin(a) * rr;
    } else if (k < 0.6) {
      // hai dòng tiêu đề
      const row = Math.random() < 0.5 ? 0 : 1;
      [x, y] = rect(x0 + 0.2, barY - 0.32 - row * 0.16, row ? 0.85 : 1.05, 0.07);
    } else if (k < 0.65) {
      // dòng phụ
      [x, y] = rect(x0 + 0.2, barY - 0.7, 0.7, 0.03);
    } else if (k < 0.72) {
      // nút
      [x, y] = rect(x0 + 0.2, barY - 0.88, 0.42, 0.12);
    } else {
      // khối ảnh bên phải (viền + lấp mờ)
      const bx = x0 + W * 0.56;
      const bw = W * 0.36;
      const by = barY - 0.2;
      const bh = H - 0.62;
      if (Math.random() < 0.55) {
        const per = Math.random() * 2 * (bw + bh);
        if (per < bw) [x, y] = [bx + per, by];
        else if (per < bw + bh) [x, y] = [bx + bw, by - (per - bw)];
        else if (per < 2 * bw + bh) [x, y] = [bx + bw - (per - bw - bh), by - bh];
        else [x, y] = [bx, by - bh + (per - 2 * bw - bh)];
      } else {
        [x, y] = rect(bx, by, bw, bh);
      }
    }
    out[i * 3] = x;
    out[i * 3 + 1] = y;
    out[i * 3 + 2] = gauss() * 0.03;
  }
  return out;
}

/** Xoắn kép: hai dải hạt quấn quanh trục đứng, có các "bậc" nối giữa */
function helixPoints(n: number) {
  const out = new Float32Array(n * 3);
  const H = 2.6;
  const R = 0.42;
  const turns = 2.4;
  for (let i = 0; i < n; i++) {
    const k = Math.random();
    const t = Math.random();
    const y = (t - 0.5) * H;
    const a = t * turns * Math.PI * 2;
    if (k < 0.82) {
      const strand = k < 0.41 ? 0 : Math.PI;
      out[i * 3] = Math.cos(a + strand) * R + gauss() * 0.03;
      out[i * 3 + 1] = y + gauss() * 0.02;
      out[i * 3 + 2] = Math.sin(a + strand) * R + gauss() * 0.03;
    } else {
      // bậc nối hai dải
      const step = Math.round(t * 28) / 28;
      const sa = step * turns * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      out[i * 3] = Math.cos(sa) * R * u;
      out[i * 3 + 1] = (step - 0.5) * H;
      out[i * 3 + 2] = Math.sin(sa) * R * u;
    }
  }
  return out;
}

/** Nút xuyến (2,3) — một ống liền mạch */
function knotPoints(n: number) {
  const out = new Float32Array(n * 3);
  const P = 2;
  const Q = 3;
  const tube = 0.13;
  const curve = (t: number) => {
    const r = 0.62 + 0.28 * Math.cos(Q * t);
    return [r * Math.cos(P * t), r * Math.sin(P * t), 0.28 * Math.sin(Q * t)];
  };
  for (let i = 0; i < n; i++) {
    const t = Math.random() * Math.PI * 2;
    const c = curve(t);
    const c2 = curve(t + 0.001);
    // Hệ trục cục bộ để rải hạt quanh ống
    const tx = c2[0] - c[0], ty = c2[1] - c[1], tz = c2[2] - c[2];
    const tl = Math.hypot(tx, ty, tz) || 1;
    const T = [tx / tl, ty / tl, tz / tl];
    let N = [-T[1], T[0], 0];
    const nl = Math.hypot(N[0], N[1], N[2]) || 1;
    N = [N[0] / nl, N[1] / nl, N[2] / nl];
    const B = [T[1] * N[2] - T[2] * N[1], T[2] * N[0] - T[0] * N[2], T[0] * N[1] - T[1] * N[0]];
    const a = Math.random() * Math.PI * 2;
    const rr = tube * (0.85 + Math.random() * 0.15);
    out[i * 3] = c[0] + (N[0] * Math.cos(a) + B[0] * Math.sin(a)) * rr;
    out[i * 3 + 1] = c[1] + (N[1] * Math.cos(a) + B[1] * Math.sin(a)) * rr;
    out[i * 3 + 2] = c[2] + (N[2] * Math.cos(a) + B[2] * Math.sin(a)) * rr;
  }
  return out;
}

function shuffle(arr: Float32Array, n: number) {
  // Xáo thứ tự để khi biến hình, các hạt bay chéo nhau thay vì trượt đều
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    for (let c = 0; c < 3; c++) {
      const t = arr[i * 3 + c];
      arr[i * 3 + c] = arr[j * 3 + c];
      arr[j * 3 + c] = t;
    }
  }
  return arr;
}

function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(24,182,164,0.9)');
  grd.addColorStop(0.25, 'rgba(24,182,164,0.35)');
  grd.addColorStop(1, 'rgba(24,182,164,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  return new CanvasTexture(c);
}

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

export interface SceneAPI {
  count: number;
  setAnchors(list: Anchor[], immediate?: boolean): void;
  pulse(): void;
  destroy(): void;
}

export function createScene(host: HTMLElement, opts: { reducedMotion: boolean }): SceneAPI | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
  } catch {
    return null;
  }

  const isMobile = window.matchMedia('(max-width: 720px)').matches;
  const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;
  const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 1.75);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  const root = new Group();
  scene.add(root);
  const ring = new Group();
  root.add(ring);

  // ---- Hạt ----
  const COUNT = isMobile || lowPower ? 6000 : 11000;
  const pos = new Float32Array(COUNT * 3);
  const scatter = new Float32Array(COUNT * 3);
  const rand = new Float32Array(COUNT * 4);

  for (let i = 0; i < COUNT; i++) {
    const halo = ringPoint(pos, i);
    const sr = 2.2 + Math.random() * 3.2;
    const sa = Math.random() * Math.PI * 2;
    const sp = (Math.random() - 0.5) * Math.PI;
    scatter[i * 3] = Math.cos(sa) * Math.cos(sp) * sr;
    scatter[i * 3 + 1] = Math.sin(sp) * sr * 0.6;
    scatter[i * 3 + 2] = Math.sin(sa) * Math.cos(sp) * sr - 1.5;
    rand[i * 4] = halo ? 0.4 + Math.random() * 0.6 : 0.6 + Math.random() * 1.2;
    rand[i * 4 + 1] = Math.random();
    rand[i * 4 + 2] = Math.random();
    rand[i * 4 + 3] = 0.2 + Math.random() * 0.8;
  }

  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(pos, 3));
  geo.setAttribute('aScatter', new BufferAttribute(scatter, 3));
  geo.setAttribute('aSphere', new BufferAttribute(spherePoints(COUNT), 3));
  geo.setAttribute('aWave', new BufferAttribute(wavePoints(COUNT), 3));
  geo.setAttribute('aGalaxy', new BufferAttribute(galaxyPoints(COUNT), 3));
  geo.setAttribute('aFrame', new BufferAttribute(framePoints(COUNT), 3));
  geo.setAttribute('aHelix', new BufferAttribute(helixPoints(COUNT), 3));
  geo.setAttribute('aKnot', new BufferAttribute(knotPoints(COUNT), 3));
  geo.setAttribute('aRand', new BufferAttribute(rand, 4));

  const uniforms = {
    uTime: { value: 0 },
    uForm: { value: opts.reducedMotion ? 1 : 0 },
    uSize: { value: isMobile ? 24 : 27 },
    uPixelRatio: { value: dpr },
    uBreak: { value: 0 },
    uWa: { value: new Vector4(1, 0, 0, 0) },
    uWb: { value: new Vector4(0, 0, 0, 0) },
    uMouse: { value: new Vector2(99, 99) },
    uMouseForce: { value: 0 },
    uOpacity: { value: 1 },
    uColorA: { value: new Color('#F5F7F6') },
    uColorB: { value: new Color('#7E98A6') },
    uTeal: { value: new Color('#18B6A4') },
  };

  const mat = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  ring.add(new Points(geo, mat));

  // ---- Bụi sao nền ----
  const DUST = isMobile ? 500 : 1200;
  const dpos = new Float32Array(DUST * 3);
  const drand = new Float32Array(DUST * 4);
  for (let i = 0; i < DUST; i++) {
    dpos[i * 3] = (Math.random() - 0.5) * 16;
    dpos[i * 3 + 1] = (Math.random() - 0.5) * 10;
    dpos[i * 3 + 2] = -Math.random() * 8;
    drand[i * 4] = 0.3 + Math.random() * 0.5;
    drand[i * 4 + 1] = Math.random();
    drand[i * 4 + 2] = Math.random() * 0.9;
    drand[i * 4 + 3] = 0.1 + Math.random() * 0.3;
  }
  const dgeo = new BufferGeometry();
  dgeo.setAttribute('position', new BufferAttribute(dpos, 3));
  for (const name of ['aScatter', 'aSphere', 'aWave', 'aGalaxy', 'aFrame', 'aHelix', 'aKnot']) {
    dgeo.setAttribute(name, new BufferAttribute(dpos, 3));
  }
  dgeo.setAttribute('aRand', new BufferAttribute(drand, 4));
  const dustUniforms = {
    ...uniforms,
    uForm: { value: 1 },
    uBreak: { value: 0 },
    uWa: { value: new Vector4(1, 0, 0, 0) },
    uWb: { value: new Vector4(0, 0, 0, 0) },
    uMouseForce: { value: 0 },
    uOpacity: { value: 0.55 },
  };
  const dmat = new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: dustUniforms,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const dust = new Points(dgeo, dmat);
  scene.add(dust);

  // ---- Chấm teal (chỉ thuộc chữ O) ----
  const dotMat = new MeshBasicMaterial({ color: '#18B6A4', transparent: true });
  const dot = new Mesh(new SphereGeometry(DOT_R * 0.78, 32, 32), dotMat);
  const glowMat = new SpriteMaterial({ map: glowTexture(), blending: AdditiveBlending, depthWrite: false, transparent: true });
  const glow = new Sprite(glowMat);
  glow.scale.setScalar(DOT_R * 7);
  dot.add(glow);
  ring.add(dot);

  let dotAngle = opts.reducedMotion ? DOT_ANGLE : GAP_TO;
  let dotIntro = opts.reducedMotion ? 1 : 0.4;
  const placeDot = () => dot.position.set(Math.cos(dotAngle) * R_MID, Math.sin(dotAngle) * R_MID, 0.02);
  placeDot();

  // ---- Vị trí đặt hình trên màn hình ----
  let viewW = 1;
  let viewH = 1;
  let narrow = false;

  function placeOf(place: Place, opacity: number) {
    // Trả về { x, y, scale, opacity } theo đơn vị thế giới tại z = 0
    if (narrow) {
      switch (place) {
        case 'hero':
          return { x: viewW * 0.16, y: viewH * 0.24, scale: Math.min(viewW * 0.36, 1.2), opacity: 0.7 * opacity };
        case 'corner':
          return { x: viewW * 0.32, y: viewH * 0.32, scale: viewW * 0.36, opacity: 0.35 * opacity };
        default:
          return { x: 0, y: 0, scale: viewW * 0.34, opacity: 0.35 * opacity };
      }
    }
    switch (place) {
      case 'hero':
        return { x: viewW * 0.29, y: viewH * 0.06, scale: Math.min(viewH * 0.34, viewW * 0.19), opacity };
      case 'corner':
        return { x: viewW * 0.35, y: viewH * 0.24, scale: Math.min(viewH * 0.26, viewW * 0.16), opacity: 0.5 * opacity };
      case 'right':
        return { x: viewW * 0.29, y: 0, scale: Math.min(viewH * 0.28, viewW * 0.17), opacity };
      case 'left':
        return { x: -viewW * 0.26, y: -viewH * 0.05, scale: Math.min(viewH * 0.3, viewW * 0.18), opacity };
      case 'center':
        return { x: 0, y: 0, scale: Math.min(viewH * 0.36, viewW * 0.26), opacity };
    }
  }

  function layout() {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    viewH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    viewW = viewH * camera.aspect;
    narrow = w < 900;
  }

  // ---- Dòng thời gian theo cuộn ----
  let anchors: Anchor[] = [{ y: 0, shape: 'ring', place: 'corner', opacity: 1 }];
  let ySmooth = window.scrollY;
  const current = { x: 0, y: 0, scale: 1, opacity: 1 };
  const weights = [1, 0, 0, 0, 0, 0, 0];

  function sample(y: number) {
    const n = anchors.length;
    let a = anchors[0];
    let b = anchors[0];
    let m = 0;
    if (y >= anchors[n - 1].y) {
      a = b = anchors[n - 1];
    } else if (y > anchors[0].y) {
      for (let i = 0; i < n - 1; i++) {
        if (y >= anchors[i].y && y < anchors[i + 1].y) {
          a = anchors[i];
          b = anchors[i + 1];
          const u = (y - a.y) / Math.max(b.y - a.y, 1);
          // Giữ hình ổn định ở hai đầu, chỉ biến hình ở khoảng giữa
          m = smoothstep(0.22, 0.78, u);
          break;
        }
      }
    }
    const pa = placeOf(a.place, a.opacity);
    const pb = placeOf(b.place, b.opacity);
    const sameShape = a.shape === b.shape;
    const samePlace = a.place === b.place;
    return {
      a,
      b,
      m,
      brk: sameShape && samePlace ? 0 : Math.sin(Math.PI * m) * (sameShape ? 0.7 : 1),
      x: pa.x + (pb.x - pa.x) * m,
      y: pa.y + (pb.y - pa.y) * m,
      scale: pa.scale + (pb.scale - pa.scale) * m,
      opacity: pa.opacity + (pb.opacity - pa.opacity) * m,
    };
  }

  // ---- Chuột ----
  const mouseNdc = new Vector2(0, 0);
  const mouseSmooth = new Vector2(0, 0);
  let mouseActive = 0;
  const ray = new Vector3();
  const onMove = (e: PointerEvent) => {
    mouseNdc.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    mouseActive = 1;
  };
  const onLeave = () => (mouseActive = 0);
  window.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerleave', onLeave);

  let pulseT = 0;

  // ---- Intro: hạt hội tụ + chấm chạy một vòng ----
  const introStart = performance.now();
  const INTRO_FORM = 2600;
  const INTRO_DOT = 2900;
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  let raf = 0;
  let running = true;
  let last = performance.now();

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    if (!running) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const t = now / 1000;
    uniforms.uTime.value = t;

    if (!opts.reducedMotion) {
      const e = now - introStart;
      uniforms.uForm.value = easeOut(Math.min(e / INTRO_FORM, 1));
      const de = Math.min(Math.max((e - 300) / INTRO_DOT, 0), 1);
      dotAngle = GAP_TO + easeInOut(de) * (Math.PI * 2 - (GAP_TO - DOT_ANGLE));
      placeDot();
      dotIntro = 0.4 + 0.6 * easeOut(de);
    }

    // Cuộn (làm mượt thêm để lúc nhảy trang không giật)
    const k = 1 - Math.pow(0.0015, dt);
    ySmooth += (window.scrollY - ySmooth) * (1 - Math.pow(0.0005, dt));
    const s = sample(ySmooth);

    // Trọng số từng hình
    for (let i = 0; i < weights.length; i++) weights[i] = 0;
    weights[SHAPES.indexOf(s.a.shape)] += 1 - s.m;
    weights[SHAPES.indexOf(s.b.shape)] += s.m;
    uniforms.uWa.value.set(weights[0], weights[1], weights[2], weights[3]);
    uniforms.uWb.value.set(weights[4], weights[5], weights[6], 0);

    if (pulseT > 0) pulseT = Math.max(0, pulseT - dt * 1.4);
    const pulse = Math.sin(pulseT * Math.PI) * 0.35;
    uniforms.uBreak.value = Math.min(s.brk + pulse, 1);

    current.x += (s.x - current.x) * k;
    current.y += (s.y - current.y) * k;
    current.scale += (s.scale - current.scale) * k;
    current.opacity += (s.opacity - current.opacity) * k;
    uniforms.uOpacity.value = current.opacity;
    root.position.set(current.x, current.y, 0);
    root.scale.setScalar(current.scale);

    // Nghiêng theo chuột, xoay nhẹ khi vỡ ra
    mouseSmooth.lerp(mouseNdc, 1 - Math.pow(0.02, dt));
    const b = uniforms.uBreak.value;
    ring.rotation.x = -mouseSmooth.y * 0.22 + b * 0.5;
    ring.rotation.y = mouseSmooth.x * 0.32 + Math.sin(t * 0.25) * 0.06;
    ring.rotation.z = Math.sin(t * 0.18) * 0.04 + b * 0.25;
    dust.rotation.y = t * 0.01 + mouseSmooth.x * 0.05;

    // Vị trí chuột trên mặt phẳng z = 0
    ray.set(mouseSmooth.x, mouseSmooth.y, 0.5).unproject(camera).sub(camera.position).normalize();
    const dist = -camera.position.z / ray.z;
    uniforms.uMouse.value.set(camera.position.x + ray.x * dist, camera.position.y + ray.y * dist);
    uniforms.uMouseForce.value += (mouseActive * (opts.reducedMotion ? 0 : 1) - uniforms.uMouseForce.value) * k;

    // Chấm teal: chỉ hiện khi đang là chữ O
    const dotVis = Math.max(0, weights[0] * (1 - b * 1.6)) * dotIntro;
    dot.visible = dotVis > 0.01;
    dot.scale.setScalar(Math.max(dotVis, 0.001));
    glow.scale.setScalar(DOT_R * 7 * (1 + Math.sin(t * 2.2) * 0.04));
    dotMat.opacity = Math.min(1, current.opacity);
    glowMat.opacity = Math.min(1, current.opacity);

    renderer.render(scene, camera);
  }

  const ro = new ResizeObserver(layout);
  ro.observe(host);
  layout();
  {
    const s0 = sample(ySmooth);
    Object.assign(current, { x: s0.x, y: s0.y, scale: s0.scale, opacity: s0.opacity });
  }

  const onVis = () => {
    running = document.visibilityState === 'visible';
    last = performance.now();
  };
  document.addEventListener('visibilitychange', onVis);

  raf = requestAnimationFrame(frame);
  host.classList.add('is-ready');
  if (import.meta.env.DEV) (window as any).__os = { root, current, uniforms, camera, renderer, frame, introStart, getAnchors: () => anchors };

  return {
    count: COUNT,
    setAnchors(list, immediate = false) {
      anchors = list.length ? list : [{ y: 0, shape: 'ring', place: 'corner', opacity: 1 }];
      if (immediate) {
        ySmooth = window.scrollY;
        const s0 = sample(ySmooth);
        Object.assign(current, { x: s0.x, y: s0.y, scale: s0.scale, opacity: s0.opacity });
      }
    },
    pulse() {
      if (!opts.reducedMotion) pulseT = 1;
    },
    destroy() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVis);
      renderer.dispose();
      geo.dispose();
      dgeo.dispose();
      mat.dispose();
      dmat.dispose();
    },
  };
}
