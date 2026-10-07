// Điều phối toàn bộ chuyển động & tương tác phía trình duyệt.
// Chạy một lần; mỗi lần chuyển trang (Astro ClientRouter) sẽ khởi tạo lại phần của trang.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { navigate } from 'astro:transitions/client';
import type { SceneAPI, Anchor } from './scene';

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ------------------------------------------------------------
// Cuộn mượt (Lenis) nối với GSAP ticker
// ------------------------------------------------------------
const lenis = new Lenis({
  duration: 1.15,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: !reduced,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Chỉ dùng khi phát triển: chạy hoạt ảnh thủ công khi tab bị ẩn (để chụp màn hình kiểm tra)
if (import.meta.env.DEV) {
  (window as any).__pump = async (ms = 1500) => {
    const end = performance.now() + ms;
    while (performance.now() < end) {
      await new Promise((r) => setTimeout(r, 16));
      gsap.ticker.tick();
      (window as any).__os?.frame(performance.now());
    }
  };
}

// ------------------------------------------------------------
// Cảnh 3D (tải trễ để không chặn nội dung chính)
// ------------------------------------------------------------
let scene: SceneAPI | null = null;

/**
 * Mỗi phần tử có data-shape là một "mốc": khi phần tử nằm giữa màn hình,
 * hạt tạo thành hình đó (data-place: hero | corner | right | left | center; data-opacity tuỳ chọn).
 */
function collectAnchors(): Anchor[] {
  const vh = window.innerHeight;
  return Array.from(document.querySelectorAll<HTMLElement>('[data-shape]'))
    .map((el) => {
      // Section được ghim (pin) -> đo theo pin-spacer để tính cả quãng cuộn ngang
      const box = el.parentElement?.classList.contains('pin-spacer') ? el.parentElement : el;
      const r = box.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const center = top + r.height / 2 - vh / 2;
      return {
        y: Math.max(0, center),
        shape: el.dataset.shape as Anchor['shape'],
        place: (el.dataset.place ?? 'right') as Anchor['place'],
        opacity: el.dataset.opacity ? parseFloat(el.dataset.opacity) : 1,
      };
    })
    .sort((a, b) => a.y - b.y);
}

function syncAnchors(immediate = false) {
  scene?.setAnchors(collectAnchors(), immediate);
}
ScrollTrigger.addEventListener('refresh', () => syncAnchors());
window.addEventListener('resize', () => syncAnchors());

function bootScene() {
  const host = document.querySelector<HTMLElement>('[data-scene-host]');
  if (!host || host.dataset.booted) return;
  host.dataset.booted = '1';
  const start = () =>
    import('./scene').then(({ createScene }) => {
      scene = createScene(host, { reducedMotion: reduced });
      syncAnchors(true);
    });
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(start, { timeout: 1200 });
  } else {
    setTimeout(start, 300);
  }
}

// ------------------------------------------------------------
// Màn che: intro & chuyển trang
// ------------------------------------------------------------
const curtain = () => document.querySelector<HTMLElement>('[data-curtain]');
const ARC_FULL = 89.6; // 322.7° / 360°

function setArc(p: number) {
  const arc = document.querySelector<SVGCircleElement>('[data-curtain-arc]');
  arc?.setAttribute('stroke-dasharray', `${(p * ARC_FULL).toFixed(2)} 100`);
}

async function playIntro() {
  const el = curtain();
  const html = document.documentElement;
  if (!el || !html.classList.contains('intro')) return;
  const count = el.querySelector<HTMLElement>('[data-curtain-count]');
  const dot = el.querySelector<SVGElement>('[data-curtain-dot]');
  const state = { p: 0 };
  await gsap
    .timeline()
    .to(state, {
      p: 1,
      duration: reduced ? 0.01 : 1.1,
      ease: 'power2.inOut',
      onUpdate: () => {
        setArc(state.p);
        if (count) count.textContent = String(Math.round(state.p * 100)).padStart(3, '0');
      },
    })
    .to(dot, { attr: { opacity: 1 }, duration: 0.25 })
    .to(el, { clipPath: 'inset(0% 0% 100% 0%)', duration: reduced ? 0.01 : 0.9, ease: 'expo.inOut' }, '+=0.1')
    .then();
  html.classList.remove('intro');
  gsap.set(el, { clearProps: 'clipPath' });
  try {
    sessionStorage.setItem('os-intro', '1');
  } catch {}
}

function coverCurtain(): Promise<void> {
  const el = curtain();
  if (!el || reduced) return Promise.resolve();
  const dot = el.querySelector<SVGElement>('[data-curtain-dot]');
  const count = el.querySelector<HTMLElement>('[data-curtain-count]');
  if (count) count.textContent = '';
  setArc(0);
  gsap.set(dot, { attr: { opacity: 0 } });
  const state = { p: 0 };
  return gsap
    .timeline()
    .fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'expo.inOut' })
    .to(state, { p: 1, duration: 0.55, ease: 'power2.inOut', onUpdate: () => setArc(state.p) }, '-=0.25')
    .to(dot, { attr: { opacity: 1 }, duration: 0.15 })
    .then(() => undefined);
}

function revealCurtain() {
  const el = curtain();
  if (!el || reduced) return;
  gsap.fromTo(
    el,
    { clipPath: 'inset(0% 0% 0% 0%)' },
    { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.85, ease: 'expo.inOut', delay: 0.05 },
  );
}

// ------------------------------------------------------------
// Con trỏ tùy chỉnh
// ------------------------------------------------------------
function initCursor() {
  if (!finePointer || reduced) return;
  const root = document.querySelector<HTMLElement>('[data-cursor-root]');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = '1';
  document.documentElement.classList.add('has-cursor');
  const dot = root.querySelector<HTMLElement>('.cursor__dot')!;
  const ring = root.querySelector<HTMLElement>('.cursor__ring')!;
  const label = ring.querySelector<HTMLElement>('span')!;
  const pos = { x: innerWidth / 2, y: innerHeight / 2 };
  const ringPos = { ...pos };
  const setDot = { x: gsap.quickSetter(dot, 'x', 'px'), y: gsap.quickSetter(dot, 'y', 'px') };
  const setRing = { x: gsap.quickSetter(ring, 'x', 'px'), y: gsap.quickSetter(ring, 'y', 'px') };

  window.addEventListener(
    'pointermove',
    (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      setDot.x(pos.x);
      setDot.y(pos.y);
      const target = e.target as HTMLElement;
      const labelled = target.closest<HTMLElement>('[data-cursor]');
      const hidden = target.closest('[data-cursor-hide], input, textarea, .chat__panel');
      const interactive = target.closest('a, button, summary, label, [role="button"]');
      root.classList.toggle('is-hidden', !!hidden);
      root.classList.toggle('is-label', !!labelled?.dataset.cursor);
      root.classList.toggle('is-hover', !!interactive && !labelled?.dataset.cursor);
      label.textContent = labelled?.dataset.cursor ?? '';
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => root.classList.add('is-hidden'));
  document.addEventListener('pointerenter', () => root.classList.remove('is-hidden'));
  gsap.ticker.add(() => {
    ringPos.x += (pos.x - ringPos.x) * 0.18;
    ringPos.y += (pos.y - ringPos.y) * 0.18;
    setRing.x(ringPos.x);
    setRing.y(ringPos.y);
  });
}

// ------------------------------------------------------------
// Hiệu ứng chữ & xuất hiện khi cuộn
// ------------------------------------------------------------
function splitWords(el: HTMLElement) {
  if (el.classList.contains('is-split')) return el.querySelectorAll<HTMLElement>('.w > span');
  // Tách theo từ (không tách ký tự để giữ nguyên dấu tiếng Việt)
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(' '));
          } else {
            const w = document.createElement('span');
            w.className = 'w';
            const inner = document.createElement('span');
            inner.textContent = part;
            w.appendChild(inner);
            frag.appendChild(w);
          }
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as HTMLElement).tagName !== 'BR') {
        walk(child);
      }
    });
  };
  walk(el);
  el.classList.add('is-split');
  return el.querySelectorAll<HTMLElement>('.w > span');
}

let mm: gsap.MatchMedia | null = null;
let ctx: gsap.Context | null = null;

function initPage(firstLoad: boolean) {
  ctx?.revert();
  mm?.revert();

  ctx = gsap.context(() => {
    const heroDelay = firstLoad && document.documentElement.classList.contains('intro') ? 2.0 : 0.55;

    // Tiêu đề tách từ
    document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
      const words = splitWords(el);
      if (reduced) return;
      const inHero = !!el.closest('.hero, .phero');
      gsap.from(words, {
        yPercent: 110,
        rotate: 4,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.045,
        delay: inHero ? heroDelay : 0,
        scrollTrigger: inHero ? undefined : { trigger: el, start: 'top 85%' },
      });
    });

    // Khối xuất hiện
    if (!reduced) {
      const inHero = gsap.utils.toArray<HTMLElement>('.hero [data-reveal], .phero [data-reveal]');
      if (inHero.length) {
        gsap.to(inHero, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, delay: heroDelay + 0.35 });
      }
      ScrollTrigger.batch(gsap.utils.toArray<HTMLElement>('[data-reveal]').filter((el) => !inHero.includes(el)), {
        start: 'top 88%',
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 }),
      });
    }

    // Tuyên ngôn: từng từ sáng dần theo cuộn
    document.querySelectorAll<HTMLElement>('[data-scrub-words]').forEach((el) => {
      if (!el.classList.contains('is-scrub')) {
        el.innerHTML = (el.textContent ?? '')
          .trim()
          .split(/\s+/)
          .map((w) => `<span class="sw">${w}</span>`)
          .join(' ');
        el.classList.add('is-scrub');
      }
      const words = el.querySelectorAll('.sw');
      if (reduced) {
        gsap.set(words, { opacity: 1 });
        return;
      }
      gsap.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
      });
    });

    // Thanh teal trên các trụ cột
    document.querySelectorAll<HTMLElement>('.pillar').forEach((el) => {
      ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => el.classList.add('is-in') });
    });

    // Parallax nhẹ cho ảnh concept
    if (!reduced) {
      document.querySelectorAll<HTMLElement>('.work__art').forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -6 },
          { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el.parentElement, scrub: true } },
        );
      });
    }
  });

  // Quy trình cuộn ngang (chỉ máy tính)
  mm = gsap.matchMedia();
  mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
    document.querySelectorAll<HTMLElement>('[data-hscroll]').forEach((section) => {
      const track = section.querySelector<HTMLElement>('.process__track');
      if (!track) return;
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
    });
  });

  initSpotlight();
  initMagnetic();
  initFaq();
  initForm();
  initHeader();
  initChat();
  initNextPage();
  initLab();
  ScrollTrigger.refresh();
}

// ------------------------------------------------------------
// Thẻ dịch vụ: vệt sáng theo chuột
// ------------------------------------------------------------
function initSpotlight() {
  document.querySelectorAll<HTMLElement>('.card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

// ------------------------------------------------------------
// Nút "nam châm"
// ------------------------------------------------------------
function initMagnetic() {
  if (!finePointer || reduced) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    if (el.dataset.magReady) return;
    el.dataset.magReady = '1';
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * 0.25);
      yTo((e.clientY - r.top - r.height / 2) * 0.35);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

// ------------------------------------------------------------
// FAQ: mở/đóng mượt
// ------------------------------------------------------------
function initFaq() {
  document.querySelectorAll<HTMLDetailsElement>('.faq details').forEach((d) => {
    const summary = d.querySelector('summary')!;
    const body = d.querySelector<HTMLElement>('.faq__a')!;
    summary.addEventListener('click', (e) => {
      if (reduced) return;
      e.preventDefault();
      if (d.open) {
        gsap.to(body, {
          height: 0,
          duration: 0.5,
          ease: 'power3.inOut',
          onComplete: () => {
            d.open = false;
            gsap.set(body, { clearProps: 'height' });
            ScrollTrigger.refresh();
          },
        });
      } else {
        d.open = true;
        gsap.from(body, { height: 0, duration: 0.6, ease: 'power3.out', onComplete: () => ScrollTrigger.refresh() });
      }
    });
  });
}

// ------------------------------------------------------------
// Form liên hệ
// ------------------------------------------------------------
function initForm() {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;
  const msgs = JSON.parse(form.dataset.msgs ?? '{}');
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const btnLabel = btn.querySelector<HTMLElement>('[data-btn-text]')!;
  const original = btnLabel.textContent;

  const setErr = (input: HTMLInputElement | HTMLTextAreaElement, msg: string) => {
    const err = input.closest('.field')?.querySelector<HTMLElement>('.field__err');
    if (err) err.textContent = msg;
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
  };

  form.addEventListener('input', (e) => {
    const el = e.target as HTMLInputElement;
    if (el.getAttribute('aria-invalid') === 'true') setErr(el, '');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let firstBad: HTMLElement | null = null;
    form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[required]').forEach((el) => {
      let msg = '';
      if (!el.value.trim()) msg = msgs.required;
      else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim())) msg = msgs.invalidEmail;
      setErr(el, msg);
      if (msg && !firstBad) firstBad = el;
    });
    if (firstBad) {
      (firstBad as HTMLElement).focus();
      return;
    }

    btn.disabled = true;
    btnLabel.textContent = msgs.sending;

    // TODO: gửi dữ liệu thật — ví dụ Web3Forms / Formspree / API riêng / Google Sheet.
    // const data = Object.fromEntries(new FormData(form));
    // await fetch('https://api.web3forms.com/submit', { method: 'POST', body: JSON.stringify({...data, access_key: '...'}) })
    await new Promise((r) => setTimeout(r, 900));

    form.classList.add('is-sent');
    btn.disabled = false;
    btnLabel.textContent = original;
    const tick = form.querySelector<SVGPathElement>('[data-tick]');
    if (tick && !reduced) gsap.fromTo(tick, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out', delay: 0.2 });
  });

  form.querySelector('[data-form-again]')?.addEventListener('click', () => {
    form.reset();
    form.classList.remove('is-sent');
  });
}

// ------------------------------------------------------------
// Header: ẩn khi cuộn xuống, hiện khi cuộn lên; menu mobile
// ------------------------------------------------------------
let lastY = 0;
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const burger = document.querySelector<HTMLButtonElement>('[data-burger]');
  const html = document.documentElement;
  html.classList.remove('menu-open');
  if (burger) {
    burger.setAttribute('aria-expanded', 'false');
    burger.addEventListener('click', () => {
      const open = !html.classList.contains('menu-open');
      html.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
      open ? lenis.stop() : lenis.start();
    });
  }
  header?.classList.remove('is-hidden');
}
function updateHeaderTone(header: HTMLElement) {
  // Logo chuyển sang bản màu khi header nằm trên khối nền sáng
  const y = 40;
  const onLight = Array.from(document.querySelectorAll<HTMLElement>('.light')).some((el) => {
    const r = el.getBoundingClientRect();
    return r.top <= y && r.bottom >= y;
  });
  header.classList.toggle('on-light', onLight);
}
function onHeaderScroll() {
  const scroll = window.scrollY;
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header || document.documentElement.classList.contains('menu-open')) return;
  const down = scroll > lastY && scroll > 160;
  header.classList.toggle('is-hidden', down);
  header.classList.toggle('is-scrolled', scroll > 40);
  updateHeaderTone(header);
  lastY = scroll;
}
window.addEventListener('scroll', onHeaderScroll, { passive: true });

// ------------------------------------------------------------
// Chat CSKH (giao diện; chưa nối hệ thống nhắn tin thật)
// ------------------------------------------------------------
// ------------------------------------------------------------
// Cuối trang: cuộn tiếp -> vòng tròn vẽ đầy -> tự sang trang sau
// ------------------------------------------------------------
let navigating = false;
function initNextPage() {
  const sec = document.querySelector<HTMLElement>('[data-nextp]');
  if (!sec) return;
  const link = sec.querySelector<HTMLAnchorElement>('[data-nextp-link]')!;
  const arc = sec.querySelector<SVGCircleElement>('[data-nextp-arc]')!;
  const dot = sec.querySelector<SVGCircleElement>('[data-nextp-dot]')!;
  navigating = false;
  let timer = 0;
  ScrollTrigger.create({
    trigger: sec,
    start: 'top bottom',
    end: 'bottom bottom',
    onUpdate: (st) => {
      const p = st.progress;
      arc.setAttribute('stroke-dasharray', `${(p * ARC_FULL).toFixed(2)} 100`);
      dot.setAttribute('opacity', p > 0.98 ? '1' : '0');
      sec.style.setProperty('--p', p.toFixed(3));
      clearTimeout(timer);
      // Tới cuối hẳn và dừng một nhịp -> chuyển trang (không tự chuyển nếu người dùng chọn giảm chuyển động)
      if (p > 0.995 && !navigating && !reduced) {
        timer = window.setTimeout(() => {
          if (navigating) return;
          navigating = true;
          navigate(link.getAttribute('href')!);
        }, 450);
      }
    },
  });
}

// ------------------------------------------------------------
// Trang Lab: nút "kích nổ" + bảng thông số trực tiếp
// ------------------------------------------------------------
let fpsRaf = 0;
function initLab() {
  document.querySelectorAll<HTMLButtonElement>('[data-explode]').forEach((b) =>
    b.addEventListener('click', () => scene?.pulse()),
  );
  cancelAnimationFrame(fpsRaf);
  const fpsEl = document.querySelector<HTMLElement>('[data-hud-fps]');
  const countEl = document.querySelector<HTMLElement>('[data-hud-count]');
  if (!fpsEl) return;
  let frames = 0;
  let last = performance.now();
  const loop = (now: number) => {
    frames++;
    if (now - last >= 500) {
      fpsEl.textContent = String(Math.round((frames * 1000) / (now - last)));
      frames = 0;
      last = now;
      if (countEl && scene) countEl.textContent = scene.count.toLocaleString('en-US');
    }
    fpsRaf = requestAnimationFrame(loop);
  };
  fpsRaf = requestAnimationFrame(loop);
}

function initChat() {
  const root = document.querySelector<HTMLElement>('[data-chat]');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = '1';
  const t = JSON.parse(root.dataset.i18n ?? '{}');
  const body = root.querySelector<HTMLElement>('[data-chat-body]')!;
  const form = root.querySelector<HTMLFormElement>('[data-chat-form]')!;
  const input = form.querySelector('input')!;
  let started = false;
  let leadAsked = false;

  const scrollDown = () => body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
  const add = (text: string, who: 'bot' | 'me') => {
    const m = document.createElement('div');
    m.className = `msg msg--${who}`;
    m.textContent = text;
    body.appendChild(m);
    scrollDown();
    return m;
  };
  const botSay = (text: string, after?: () => void) => {
    const typing = document.createElement('div');
    typing.className = 'msg msg--bot msg--typing';
    typing.innerHTML = '<i></i><i></i><i></i>';
    body.appendChild(typing);
    scrollDown();
    setTimeout(() => {
      typing.remove();
      add(text, 'bot');
      after?.();
    }, reduced ? 50 : 700 + Math.min(text.length * 8, 900));
  };
  const askLead = () => {
    if (leadAsked) return;
    leadAsked = true;
    botSay(t.leadPrompt, () => {
      const wrap = document.createElement('form');
      wrap.className = 'chat__lead';
      wrap.innerHTML = `<input type="text" required placeholder="${t.leadPlaceholder}" aria-label="${t.leadPlaceholder}"><button type="submit">${t.send}</button>`;
      wrap.addEventListener('submit', (e) => {
        e.preventDefault();
        const v = wrap.querySelector('input')!.value.trim();
        if (!v) return;
        // TODO: gửi số điện thoại / email về CSKH (email, Telegram, CRM…)
        wrap.remove();
        add(v, 'me');
        botSay(t.leadThanks);
      });
      body.appendChild(wrap);
      scrollDown();
    });
  };
  const start = () => {
    if (started) return;
    started = true;
    botSay(t.greeting, () => {
      const quick = document.createElement('div');
      quick.className = 'chat__quick';
      t.quick.forEach((item: { q: string; a: string }) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.textContent = item.q;
        b.addEventListener('click', () => {
          quick.remove();
          add(item.q, 'me');
          botSay(item.a, askLead);
        });
        quick.appendChild(b);
      });
      body.appendChild(quick);
      scrollDown();
    });
  };

  const open = () => {
    root.classList.add('is-open');
    start();
    setTimeout(() => input.focus({ preventScroll: true }), 300);
  };
  const close = () => root.classList.remove('is-open');
  root.querySelector('[data-chat-open]')!.addEventListener('click', open);
  root.querySelector('[data-chat-close]')!.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && root.classList.contains('is-open')) close();
  });
  // Ngăn Lenis cuộn trang khi cuộn trong khung chat
  body.setAttribute('data-lenis-prevent', '');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) return;
    input.value = '';
    root.querySelector('.chat__quick')?.remove();
    add(v, 'me');
    // TODO: gửi tin nhắn tới hệ thống chat thật
    botSay(t.autoReply, askLead);
  });
}

// ------------------------------------------------------------
// Vòng đời trang
// ------------------------------------------------------------
let first = true;

document.addEventListener('astro:before-preparation', (e: any) => {
  const original = e.loader;
  e.loader = async () => {
    scene?.pulse();
    await Promise.all([coverCurtain(), original()]);
  };
});

document.addEventListener('astro:after-swap', () => {
  syncAnchors(true);
  lenis.scrollTo(0, { immediate: true, force: true });
  lastY = 0;
  document.documentElement.classList.add('js');
  revealCurtain();
});

document.addEventListener('astro:page-load', () => {
  initCursor();
  bootScene();
  initPage(first);
  if (first) {
    playIntro();
    first = false;
  }
  document.querySelectorAll<HTMLAnchorElement>('[data-to-top]').forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      lenis.scrollTo(0, { duration: 1.6 });
    }),
  );
});

document.addEventListener('astro:before-swap', (e: any) => {
  // Giữ các class trạng thái trên <html> (Lenis, con trỏ…) khi đổi trang
  const keep = Array.from(document.documentElement.classList).filter((c) => c !== 'intro' && c !== 'menu-open');
  e.newDocument.documentElement.classList.add(...keep);
  lenis.start();
  ctx?.revert();
  mm?.revert();
  ScrollTrigger.getAll().forEach((st) => st.kill());
});
