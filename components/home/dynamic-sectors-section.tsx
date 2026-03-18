'use client'

import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { Shirt, Leaf, Wrench, Cpu, Palette, Pill, Utensils, Package, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const iconMap: Record<string, React.ReactNode> = {
  'shirt': <Shirt className="h-8 w-8" />,
  'leaf': <Leaf className="h-8 w-8" />,
  'wrench': <Wrench className="h-8 w-8" />,
  'cpu': <Cpu className="h-8 w-8" />,
  'palette': <Palette className="h-8 w-8" />,
  'pill': <Pill className="h-8 w-8" />,
  'spoon': <Utensils className="h-8 w-8" />,
  'shoe': <Package className="h-8 w-8" />,
}

const sectorImages: Record<string, string> = {
  'shirt': 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600',
  'leaf': 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=600',
  'wrench': 'https://images.pexels.com/photos/210881/pexels-photo-210881.jpeg?auto=compress&cs=tinysrgb&w=600',
  'cpu': 'https://images.pexels.com/photos/343457/pexels-photo-343457.jpeg?auto=compress&cs=tinysrgb&w=600',
  'palette': 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=600',
  'pill': 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=600',
  'spoon': 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
  'shoe': 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg?auto=compress&cs=tinysrgb&w=600',
}

const defaultImage = 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600'

interface Sector {
  id: string
  name: string
  description?: string
  icon_name?: string
}

function WobbleCard({ children, containerClassName, image }: {
  children: React.ReactNode
  containerClassName?: string
  image: string
}) {
  const [transform, setTransform] = useState('translate3d(0,0,0)')
  const [innerTransform, setInnerTransform] = useState('translate3d(0,0,0)')

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - (rect.left + rect.width / 2)) / 20).toFixed(1)
    const y = ((e.clientY - (rect.top + rect.height / 2)) / 20).toFixed(1)
    setTransform(`translate3d(${x}px, ${y}px, 0)`)
    setInnerTransform(`translate3d(${-Number(x)}px, ${-Number(y)}px, 0) scale3d(1.03,1.03,1)`)
  }

  const handleMouseLeave = () => {
    setTransform('translate3d(0,0,0)')
    setInnerTransform('translate3d(0,0,0)')
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.1s ease-out' }}
      className={cn('flex-shrink-0 w-[260px] md:w-[280px] rounded-2xl overflow-hidden cursor-pointer relative group', containerClassName)}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div
        style={{ transform: innerTransform, transition: 'transform 0.1s ease-out' }}
        className="relative z-10 h-full px-6 py-10"
      >
        {children}
      </div>
    </div>
  )
}

export function DynamicSectorsSection() {
  const [sectors, setSectors] = useState<Sector[]>([])
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)
  const posRef = useRef(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    async function fetchSectors() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('sectors')
          .select('id, name, description, icon_name')
          .order('order_index', { ascending: true })
        if (error) { console.error('[v0] Error fetching sectors:', error); return }
        setSectors(data || [])
      } catch (err) {
        console.error('[v0] Error in fetchSectors:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSectors()
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el || sectors.length === 0) return
    const speed = 0.5
    const animate = () => {
      if (!paused) {
        posRef.current += speed
        const singleWidth = el.scrollWidth / 3
        if (posRef.current >= singleWidth) posRef.current = 0
        el.style.transform = `translateX(-${posRef.current}px)`
      }
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animRef.current)
  }, [paused, sectors])

  const scroll = (dir: 'left' | 'right') => {
    posRef.current += dir === 'right' ? 300 : -300
    if (scrollRef.current) {
      scrollRef.current.style.transform = `translateX(-${posRef.current}px)`
    }
  }

  if (loading || !sectors.length) return null

  const items = [...sectors, ...sectors, ...sectors]

  return (
    <section className="py-12 md:py-16 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Centered heading with horizontal lines — same as benefits */}
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-border" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground whitespace-nowrap">
            Sectors We Serve
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Arrow buttons */}
        <div className="flex justify-center gap-3 mb-8">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full w-9 h-9 border-foreground/30"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full w-9 h-9 border-foreground/30"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Infinite scroll */}
      <div
        className="overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={scrollRef}
          className="flex gap-4 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {items.map((sector, i) => (
            <WobbleCard
              key={`${sector.id}-${i}`}
              image={sectorImages[sector.icon_name || ''] || defaultImage}
              containerClassName="min-h-[220px]"
            >
              <div className="flex flex-col items-start gap-3">
                <div className="text-white/90">
                  {iconMap[sector.icon_name || 'leaf'] || iconMap['leaf']}
                </div>
                <h3 className="text-white font-bold text-lg">{sector.name}</h3>
                {sector.description && (
                  <p className="text-white/80 text-sm leading-relaxed">{sector.description}</p>
                )}
              </div>
            </WobbleCard>
          ))}
        </div>
      </div>
    </section>
  )
}