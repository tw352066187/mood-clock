import { useEffect } from 'react'

type RGB = [number, number, number]

type Palette = {
  c1: RGB
  c2: RGB
  c3: RGB
  ink: RGB
  muted: RGB
  glow: RGB
}

function rgb(r: number, g: number, b: number): RGB {
  return [r, g, b]
}

const KEYS: { min: number; pal: Palette }[] = [
  {
    min: 0,
    pal: {
      c1: rgb(14, 16, 24),
      c2: rgb(22, 26, 38),
      c3: rgb(10, 12, 18),
      ink: rgb(232, 226, 214),
      muted: rgb(168, 162, 150),
      glow: rgb(80, 90, 120),
    },
  },
  {
    min: 5 * 60,
    pal: {
      c1: rgb(232, 196, 178),
      c2: rgb(186, 168, 186),
      c3: rgb(140, 158, 178),
      ink: rgb(48, 36, 36),
      muted: rgb(96, 78, 78),
      glow: rgb(240, 200, 180),
    },
  },
  {
    min: 8 * 60,
    pal: {
      c1: rgb(244, 232, 210),
      c2: rgb(214, 200, 176),
      c3: rgb(176, 196, 188),
      ink: rgb(42, 38, 32),
      muted: rgb(92, 84, 72),
      glow: rgb(236, 220, 180),
    },
  },
  {
    min: 12 * 60,
    pal: {
      c1: rgb(236, 228, 212),
      c2: rgb(200, 196, 180),
      c3: rgb(154, 176, 180),
      ink: rgb(38, 40, 36),
      muted: rgb(86, 88, 80),
      glow: rgb(210, 214, 196),
    },
  },
  {
    min: 16 * 60,
    pal: {
      c1: rgb(236, 208, 176),
      c2: rgb(196, 156, 128),
      c3: rgb(138, 120, 132),
      ink: rgb(48, 32, 28),
      muted: rgb(102, 78, 68),
      glow: rgb(232, 180, 130),
    },
  },
  {
    min: 18 * 60 + 20,
    pal: {
      c1: rgb(196, 132, 112),
      c2: rgb(120, 86, 110),
      c3: rgb(62, 52, 82),
      ink: rgb(250, 236, 220),
      muted: rgb(214, 190, 176),
      glow: rgb(200, 120, 90),
    },
  },
  {
    min: 21 * 60,
    pal: {
      c1: rgb(36, 38, 62),
      c2: rgb(28, 30, 52),
      c3: rgb(18, 18, 32),
      ink: rgb(230, 224, 212),
      muted: rgb(164, 158, 148),
      glow: rgb(90, 80, 130),
    },
  },
  {
    min: 24 * 60,
    pal: {
      c1: rgb(14, 16, 24),
      c2: rgb(22, 26, 38),
      c3: rgb(10, 12, 18),
      ink: rgb(232, 226, 214),
      muted: rgb(168, 162, 150),
      glow: rgb(80, 90, 120),
    },
  },
]

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

function lerpRgb(a: RGB, b: RGB, t: number): RGB {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)]
}

function lerpPal(a: Palette, b: Palette, t: number): Palette {
  return {
    c1: lerpRgb(a.c1, b.c1, t),
    c2: lerpRgb(a.c2, b.c2, t),
    c3: lerpRgb(a.c3, b.c3, t),
    ink: lerpRgb(a.ink, b.ink, t),
    muted: lerpRgb(a.muted, b.muted, t),
    glow: lerpRgb(a.glow, b.glow, t),
  }
}

function cssRgb(c: RGB, a = 1): string {
  const r = Math.round(c[0])
  const g = Math.round(c[1])
  const b = Math.round(c[2])
  return a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
}

function paletteAt(minutes: number): Palette {
  const m = ((minutes % 1440) + 1440) % 1440
  for (let i = 0; i < KEYS.length - 1; i++) {
    const cur = KEYS[i]!
    const next = KEYS[i + 1]!
    if (m >= cur.min && m <= next.min) {
      const span = next.min - cur.min || 1
      const t = (m - cur.min) / span
      const eased = t * t * (3 - 2 * t)
      return lerpPal(cur.pal, next.pal, eased)
    }
  }
  return KEYS[0]!.pal
}

function applyPalette(p: Palette) {
  const root = document.documentElement
  root.style.setProperty('--c1', cssRgb(p.c1))
  root.style.setProperty('--c2', cssRgb(p.c2))
  root.style.setProperty('--c3', cssRgb(p.c3))
  root.style.setProperty('--ink', cssRgb(p.ink))
  root.style.setProperty('--muted', cssRgb(p.muted))
  root.style.setProperty('--glow', cssRgb(p.glow, 0.35))
  root.style.setProperty('--line', cssRgb(p.ink, 0.14))
  root.style.setProperty('--panel', cssRgb(p.c3, 0.42))
}

export function useAtmosphere() {
  useEffect(() => {
    let raf = 0
    let lastBucket = -1

    const paint = () => {
      const d = new Date()
      const minutes = d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60 + d.getMilliseconds() / 60000
      const bucket = Math.floor(minutes * 4)
      if (bucket !== lastBucket) {
        lastBucket = bucket
        applyPalette(paletteAt(minutes))
      }
      raf = window.requestAnimationFrame(paint)
    }

    applyPalette(paletteAt(new Date().getHours() * 60 + new Date().getMinutes()))
    raf = window.requestAnimationFrame(paint)
    return () => window.cancelAnimationFrame(raf)
  }, [])
}
