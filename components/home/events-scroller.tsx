'use client'

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"

type Event = {
  id: number
  title: string
  description: string
  event_date: string
  location: string
  event_type: string
  image: string
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function EventCard({ event }: { event: Event }) {
  return (
    <div className="flex-shrink-0 w-[300px] md:w-[340px] rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary text-primary-foreground text-xs">
            {event.event_type}
          </Badge>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
            <span>{formatDate(event.event_date)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
        <Link
          href={`/news/events`}
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Learn More <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

export function InfiniteScroller({ events }: { events: Event[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: dir === 'right' ? 360 : -360,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      {/* Arrow buttons — center mein */}
      <div className="flex justify-center gap-3 mb-6">
        <Button
          size="icon"
          variant="outline"
          className="rounded-full w-9 h-9"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full w-9 h-9"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Scrollable cards */}
      <div className="overflow-hidden">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {events.map((event, i) => (
            <EventCard key={`${event.id}-${i}`} event={event} />
          ))}
        </div>
      </div>

      {/* View All Events */}
      <div className="text-center mt-8">
        <Button asChild className="bg-primary text-white hover:bg-primary/90 px-8 rounded-full">
          <Link href="/news/events">
            View All Events <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}