'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { heroMedia } from "@/lib/landing/hero-media"

const slides = heroMedia.slides

export function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length)
        setFade(true)
      }, 500)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index: number) => {
    setFade(false)
    setTimeout(() => {
      setCurrent(index)
      setFade(true)
    }, 300)
  }

  return (
    <section className="relative overflow-hidden min-h-[500px] md:min-h-[580px] lg:min-h-[620px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url("${slides[current].imageUrl}")`,
          opacity: fade ? 1 : 0,
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Left aligned text */}
          <div className="lg:col-span-7 max-w-2xl">
            <h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight transition-opacity duration-500 drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]"
              style={{ opacity: fade ? 1 : 0 }}
            >
              {slides[current].title}
            </h1>

            <p
              className="mt-6 text-base md:text-lg text-white/80 leading-relaxed transition-opacity duration-500"
              style={{ opacity: fade ? 1 : 0 }}
            >
              {slides[current].subtitle}
            </p>
          </div>

          {/* Right overlay image (on top of bg) */}
          {heroMedia.rightOverlayImageUrl ? (
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative mx-auto w-full max-w-[420px]">
                <img
                  src={heroMedia.rightOverlayImageUrl}
                  alt={heroMedia.rightOverlayAlt || "https://images.pexels.com/photos/32156544/pexels-photo-32156544.jpeg"}
                  className="w-full h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] select-none pointer-events-none"
                  loading="eager"
                />
              </div>
            </div>
          ) : null}
        </div>

        {/* Dots - bottom center */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-white scale-125" : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}