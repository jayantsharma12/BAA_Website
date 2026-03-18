'use client'

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

const slides = [
  {
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Voice of the Industry",
    subtitle: "The Buying Agents Association represents and supports buying agents across India, fostering international trade relationships and driving industry excellence for over seven decades.",
  },
  {
    image: "https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Connecting Buyers & Sellers Globally",
    subtitle: "Bridging the gap between international buyers and Indian exporters with trust, expertise, and decades of industry knowledge.",
  },
  {
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Building Stronger Trade Relations",
    subtitle: "Fostering partnerships that drive growth, innovation, and excellence in India's thriving export ecosystem.",
  },
  {
    image: "https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Supporting Members Since 1946",
    subtitle: "Over seven decades of championing the rights and interests of buying agents across every major industry sector.",
  },
]

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
          backgroundImage: `url("${slides[current].image}")`,
          opacity: fade ? 1 : 0,
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        {/* Left aligned like old site */}
        <div className="max-w-2xl">
          <h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight transition-opacity duration-500"
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

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 text-base px-8"
            >
            
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/40 text-white bg-transparent hover:bg-white/10 text-base px-8"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
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