'use client'

import { useEffect, useState } from "react"

// ─── Types ───────────────────────────────────────────────────────────────────
type SlideType = "globe" | "map" | "diamond" | "plain"

interface Slide {
  id: number
  type: SlideType
  title: string
  subtitle: string
  bgImage: string
}

// ─── Slides — exact from PDF ─────────────────────────────────────────────────
const slides: Slide[] = [
  {
    id: 1,
    type: "globe",
    title: "Supporting Members\nSince 1946",
    subtitle: "Over seven decades of championing the rights and interests of buying agents across every major industry sector.",
    bgImage: "/images/banner/4.jpeg",
  },
  {
    id: 2,
    type: "map",
    title: "Building Stronger\nTrade Relations",
    subtitle: "Fostering partnerships that drive growth, innovation, and excellence in India's thriving export ecosystem.",
    bgImage: "/images/banner/5.jpeg",
  },
  {
    id: 3,
    type: "diamond",
    title: "Connecting Buyers &\nSellers Globally",
    subtitle: "Bridging the gap between international buyers and Indian exporters with trust, expertise, and decades of industry knowledge.",
    bgImage: "/images/banner/6.jpeg",
  },
]

// ─── Globe nodes ─────────────────────────────────────────────────────────────
const globeNodes = [
  { id: 1, label: "Advantage of product\ncustomization", icon: "⚙️", angle: -60, dist: 175 },
  { id: 2, label: "Flexibility\nof MOQ",                 icon: "📦", angle: 0,   dist: 195 },
  { id: 3, label: "Handcrafted products and\nincreasing demand", icon: "🤲", angle: -140, dist: 178 },
  { id: 4, label: "Hub of sustainable\nmaterials",       icon: "🌿", angle: 52,  dist: 190 },
  { id: 5, label: "Varied material and\nmixed material products", icon: "🎨", angle: 108, dist: 168 },
  { id: 6, label: "Spreading of sourcing in\nSouth East Asia",   icon: "🌏", angle: 152, dist: 178 },
]

// ─── Diamond images — 17 images for extended grid ────────────────────────────
const connectImages = [
  "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/934063/pexels-photo-934063.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1619651/pexels-photo-1619651.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/2294342/pexels-photo-2294342.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/1078973/pexels-photo-1078973.jpeg?auto=compress&cs=tinysrgb&w=400",
  "https://images.pexels.com/photos/3771807/pexels-photo-3771807.jpeg?auto=compress&cs=tinysrgb&w=400",  // [1] top-right
  "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=400",  // [3] row2 far-right
  "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=400",  // [2] row3 far-right
]

// ─── Globe Visual ─────────────────────────────────────────────────────────────
function GlobeVisual() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const cx = 200
  const cy = 210
  const globeR = 88

  if (!mounted) return <div style={{ width: "100%", height: "100%" }} />

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      <svg viewBox="0 0 420 430" width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <clipPath id="globeClip">
            <circle cx={cx} cy={cy} r={globeR} />
          </clipPath>
        </defs>

        {/* Lines */}
        {globeNodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180
          const ex = cx + Math.cos(rad) * globeR
          const ey = cy + Math.sin(rad) * globeR
          const nx = cx + Math.cos(rad) * node.dist
          const ny = cy + Math.sin(rad) * node.dist
          return <line key={node.id} x1={ex} y1={ey} x2={nx} y2={ny} stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
        })}

        {/* Ghost rings */}
        {[115, 142, 170].map((r, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        ))}

        {/* Globe image from public folder — clipped to circle */}
        <image
          href="/images/globe.png"
          x={cx - globeR}
          y={cy - globeR}
          width={globeR * 2}
          height={globeR * 2}
          clipPath="url(#globeClip)"
          preserveAspectRatio="xMidYMid slice"
        />

        {/* Subtle shine overlay */}
        <circle cx={cx - 24} cy={cy - 28} r={32}
          fill="rgba(255,255,255,0.08)" clipPath="url(#globeClip)" />

        {/* Globe border */}
        <circle cx={cx} cy={cy} r={globeR}
          fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />

        {/* Orange orbit */}
        <ellipse cx={cx} cy={cy} rx={globeR + 10} ry={18} fill="none" stroke="#E8620A" strokeWidth="3"
          style={{ animation: "orbitSpin 9s linear infinite", transformOrigin: `${cx}px ${cy}px` }} />

        {/* Orange dots on lines */}
        {globeNodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180
          const dx = cx + Math.cos(rad) * (node.dist - 30)
          const dy = cy + Math.sin(rad) * (node.dist - 30)
          return <circle key={node.id} cx={dx} cy={dy} r={4.5} fill="#E8620A" />
        })}

        {/* Node badges */}
        {globeNodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180
          const nx = cx + Math.cos(rad) * node.dist
          const ny = cy + Math.sin(rad) * node.dist
          const isRight = nx > cx
          const lines = node.label.split("\n")
          return (
            <g key={node.id} style={{ animation: `floatNode 4s ease-in-out ${node.id * 0.4}s infinite`, transformOrigin: `${nx}px ${ny}px` }}>
              <circle cx={nx} cy={ny} r={26} fill="rgba(220,232,242,0.93)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <text x={nx} y={ny + 6} textAnchor="middle" fontSize="17">{node.icon}</text>
              {lines.map((line, li) => (
                <text key={li}
                  x={isRight ? nx + 32 : nx - 32}
                  y={ny - 4 + li * 13}
                  textAnchor={isRight ? "start" : "end"}
                  fontSize="9.5" fill="rgba(255,255,255,0.92)"
                  style={{ fontFamily: "DM Sans, sans-serif" }}>
                  {line}
                </text>
              ))}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ─── India Map Visual — Static image from public folder ──────────────────────
function IndiaMapVisual() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return <div style={{ width: 480, height: 370 }} />

  return (
    <div className="relative flex items-center justify-center" style={{ width: "100%", height: "100%" }}>
      <img
        src="/images/india-map.png"
        alt="India Map"
        style={{
          maxHeight: 370,
          maxWidth: 480,
          width: "auto",
          height: "auto",
          objectFit: "contain",
          filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.5))",
          animation: "fadeUp 0.5s ease forwards",
        }}
      />
    </div>
  )
}

// ─── Diamond Collage ──────────────────────────────────────────────────────────
function DiamondCollage({ visible, images }: { visible: boolean; images: string[] }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return <div style={{ width: 666, height: 378 }} />

  return (
    <div
      className="gallery-wrapper-outer"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}
    >
      {images.map((src, i) => (
        <div key={i} className={`gallery-cell${visible ? " is-visible" : ""}`}>
          <img src={src} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  )
}

// ─── Main HeroSection ─────────────────────────────────────────────────────────
export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)
  const [rightVisible, setRightVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setRightVisible(true), 150)
    return () => clearTimeout(t)
  }, [current])

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false)
      setRightVisible(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length)
        setFade(true)
      }, 450)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index: number) => {
    if (index === current) return
    setFade(false)
    setRightVisible(false)
    setTimeout(() => { setCurrent(index); setFade(true) }, 350)
  }

  const slide = slides[current]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap');

        @keyframes floatNode {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes orbitSpin {
          from { transform: rotateX(70deg) rotateZ(0deg); }
          to   { transform: rotateX(70deg) rotateZ(360deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cellIn {
          from { opacity: 0; transform: scale(0.72); }
          to   { opacity: 1; transform: scale(1); }
        }

        .hero-title {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
        }
        .hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
        }
        .slide-dot {
          transition: all 0.3s ease;
          cursor: pointer;
          border: none;
          padding: 0;
        }

        /* ── Gallery — Extended diamond with right-side tail ──
         *
         *  col:  1   2   3   4   5   6   7   8
         *  r1:           [1]                         ← top tip
         *  r2:       [2] [3] [12]                    ← +1 right
         *  r3:   [4] [5] [6] [13][14]                ← +2 right
         *  r4:   [7] [8] [9]     [15]                ← +1 right (offset)
         *  r5:      [10][11]                          ← bottom
         */

        .gallery-wrapper-outer {
          display: grid;
          grid-template-columns: repeat(9, 72px);
          grid-template-rows: repeat(5, 72px);
          gap: 6px;
          transform: rotate(45deg);
          width: 666px;
          height: 378px;
          flex-shrink: 0;
        }

        .gallery-cell {
          overflow: hidden;
          border-radius: 10px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.4);
          opacity: 0;
          cursor: pointer;
          transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.35s ease;
          position: relative;
        }

        /* Staggered entry */
        .gallery-cell.is-visible { animation: cellIn 0.42s ease forwards; }
        .gallery-cell.is-visible:nth-child(1)  { animation-delay: 0.00s; }
        .gallery-cell.is-visible:nth-child(2)  { animation-delay: 0.05s; }
        .gallery-cell.is-visible:nth-child(3)  { animation-delay: 0.10s; }
        .gallery-cell.is-visible:nth-child(4)  { animation-delay: 0.15s; }
        .gallery-cell.is-visible:nth-child(5)  { animation-delay: 0.20s; }
        .gallery-cell.is-visible:nth-child(6)  { animation-delay: 0.25s; }
        .gallery-cell.is-visible:nth-child(7)  { animation-delay: 0.30s; }
        .gallery-cell.is-visible:nth-child(8)  { animation-delay: 0.35s; }
        .gallery-cell.is-visible:nth-child(9)  { animation-delay: 0.40s; }
        .gallery-cell.is-visible:nth-child(10) { animation-delay: 0.45s; }
        .gallery-cell.is-visible:nth-child(11) { animation-delay: 0.50s; }
        .gallery-cell.is-visible:nth-child(12) { animation-delay: 0.55s; }
        .gallery-cell.is-visible:nth-child(13) { animation-delay: 0.60s; }
        .gallery-cell.is-visible:nth-child(14) { animation-delay: 0.65s; }
        .gallery-cell.is-visible:nth-child(15) { animation-delay: 0.70s; }
        .gallery-cell.is-visible:nth-child(16) { animation-delay: 0.75s; }
        .gallery-cell.is-visible:nth-child(17) { animation-delay: 0.80s; }

        /* HOVER — zoom IN + float up */
        .gallery-cell:hover {
          transform: scale(1.18) translateY(-10px) !important;
          box-shadow: 0 24px 48px rgba(0,0,0,0.65);
          z-index: 50;
        }

        .gallery-cell img {
          width: 100%; height: 100%;
          object-fit: cover;
          transform: rotate(-45deg) scale(1.5);
          transform-origin: center;
          transition: transform 0.35s ease, filter 0.35s ease;
          filter: brightness(0.84) saturate(0.92);
          display: block;
        }
        .gallery-cell:hover img {
          transform: rotate(-45deg) scale(1.55);
          filter: brightness(1) saturate(1.1);
        }

        /* ── Grid placement — diamond + right tail ── */
        .gallery-cell:nth-child(1)  { grid-area: 1 / 3 / 2 / 4; }  /* top tip */
        .gallery-cell:nth-child(2)  { grid-area: 2 / 2 / 3 / 3; }
        .gallery-cell:nth-child(3)  { grid-area: 2 / 3 / 3 / 4; }
        .gallery-cell:nth-child(4)  { grid-area: 3 / 1 / 4 / 2; }
        .gallery-cell:nth-child(5)  { grid-area: 3 / 2 / 4 / 3; }
        .gallery-cell:nth-child(6)  { grid-area: 3 / 3 / 4 / 4; }
        .gallery-cell:nth-child(7)  { grid-area: 4 / 1 / 5 / 2; }
        .gallery-cell:nth-child(8)  { grid-area: 4 / 2 / 5 / 3; }
        .gallery-cell:nth-child(9)  { grid-area: 4 / 3 / 5 / 4; }
        .gallery-cell:nth-child(10) { grid-area: 5 / 2 / 6 / 3; }
        .gallery-cell:nth-child(11) { grid-area: 5 / 3 / 6 / 4; }
        /* Right tail */
        .gallery-cell:nth-child(12) { grid-area: 2 / 4 / 3 / 5; }  /* row2 right */
        .gallery-cell:nth-child(13) { grid-area: 3 / 4 / 4 / 5; }  /* row3 right */
        .gallery-cell:nth-child(14) { grid-area: 4 / 4 / 5 / 5; }  /* row4 right */
        /* 3 new cells — yellow 1,2,3 from screenshot */
        .gallery-cell:nth-child(15) { grid-area: 1 / 4 / 2 / 5; }  /* [1] top-right */
        .gallery-cell:nth-child(16) { grid-area: 2 / 5 / 3 / 6; }  /* [3] row2 far-right */
        .gallery-cell:nth-child(17) { grid-area: 3 / 5 / 4 / 6; }  /* [2] row3 far-right */
      `}</style>

      {/* ── Section ── */}
      <section className="relative" style={{ height: "clamp(400px, 62vh, 560px)", overflow: "hidden" }}>

        {/* BG */}
        <div className="absolute inset-0 bg-cover bg-center" style={{
          backgroundImage: `url("${slide.bgImage}")`,
          opacity: fade ? 1 : 0,
          transition: "opacity 0.45s ease",
        }} />
        {/* Overlay */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(105deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.3) 100%)",
        }} />

        {/* Content */}
        <div className="relative h-full flex items-center mx-auto w-full px-8 lg:px-14"
          style={{ maxWidth: 1280 }}>
          <div className="grid items-center w-full" style={{ gridTemplateColumns: "1fr 1fr", gap: 24 }}>

            {/* LEFT */}
            <div key={`t-${current}`} style={{ animation: "fadeUp 0.5s ease forwards" }}>
              <h1 className="hero-title text-white" style={{
                fontSize: "clamp(1.75rem, 2.8vw, 2.6rem)",
                lineHeight: 1.15,
                marginBottom: 16,
                whiteSpace: "pre-line",
              }}>
                {slide.title}
              </h1>
              <p className="hero-sub" style={{
                fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
                color: "rgba(255,255,255,0.82)",
                lineHeight: 1.65,
                maxWidth: 480,
              }}>
                {slide.subtitle}
              </p>
            </div>

            {/* RIGHT placeholder — keeps grid balanced */}
            <div className="hidden lg:block" />
          </div>
        </div>

        {/* Collage — absolutely pinned to right edge, vertically centered */}
        {slide.type === "diamond" && (
          <div
            key={`v-${current}`}
            className="hidden lg:block"
            style={{
              position: "absolute",
              right: -50,
              top: "30%",
              transform: "translateY(-50%)",
              animation: "fadeUp 0.5s ease 0.1s forwards",
              opacity: 0,
              zIndex: 10,
            }}
          >
            <DiamondCollage visible={rightVisible} images={connectImages} />
          </div>
        )}

        {/* Globe / Map — normal flow right column */}
        {(slide.type === "globe" || slide.type === "map") && (
          <div
            key={`v-${current}`}
            className="hidden lg:flex items-center justify-center"
            style={{
              position: "absolute",
              right: 56,
              top: 0,
              bottom: 0,
              width: "50%",
              animation: "fadeUp 0.5s ease 0.1s forwards",
              opacity: 0,
            }}
          >
            {slide.type === "globe" && <GlobeVisual />}
            {slide.type === "map"   && <IndiaMapVisual />}
          </div>
        )}

        {/* Dots */}
        <div className="absolute flex gap-2" style={{ bottom: 18, left: "50%", transform: "translateX(-50%)" }}>
          {slides.map((_, i) => (
            <button key={i} className="slide-dot rounded-full" onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? 28 : 8,
                height: 8,
                background: i === current ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
              }} />
          ))}
        </div>
      </section>
    </>
  )
}