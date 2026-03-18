import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Calendar, MapPin } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Events | Buying Agents Association",
  description: "Stay updated with the latest events and gatherings from the Buying Agents Association.",
}

const defaultEvents = [
  {
    id: 1,
    title: "Annual General Meeting 2024",
    description: "Join us for our annual gathering to discuss industry trends and association updates.",
    event_date: "2024-03-15",
    location: "Mumbai Trade Center",
    event_type: "Meeting",
    image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    title: "Export Summit 2024",
    description: "A comprehensive summit focusing on export opportunities and global market trends.",
    event_date: "2024-04-20",
    location: "Delhi Convention Center",
    event_type: "Conference",
    image: "https://images.pexels.com/photos/2182973/pexels-photo-2182973.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Networking Dinner",
    description: "An evening of networking with industry leaders and fellow buying agents.",
    event_date: "2024-05-10",
    location: "Taj Hotel, Mumbai",
    event_type: "Networking",
    image: "https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    title: "Trade Fair 2024",
    description: "Explore the latest products and connect with exporters from across the country.",
    event_date: "2024-06-18",
    location: "Bangalore Exhibition Center",
    event_type: "Trade Fair",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 5,
    title: "Buyer-Seller Meet",
    description: "A focused meet to facilitate direct connections between buyers and sellers.",
    event_date: "2024-07-05",
    location: "Chennai Trade Hub",
    event_type: "Meeting",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    title: "IHGF Delhi Fair 2024",
    description: "India's largest handicrafts and gifts fair bringing together buyers and exporters.",
    event_date: "2024-10-14",
    location: "Greater Noida",
    event_type: "Trade Fair",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
]

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default async function EventsPage() {
  const supabase = await createClient()

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .order("event_date", { ascending: true })

  const displayEvents = events && events.length > 0 ? events : defaultEvents

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex gap-8">

            {/* Sidebar — same as notices */}
            <aside className="hidden md:flex flex-col gap-2 w-44 shrink-0 pt-1">
              <Link
                href="/news/notices"
                className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-primary transition-colors"
              >
                Notice Board
              </Link>
              <Link
                href="/news/events"
                className="px-3 py-2 text-sm font-semibold rounded text-white"
                style={{ backgroundColor: "#E8520A" }}
              >
                Events
              </Link>
              <Link
                href="/news/media-coverage"
                className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-primary transition-colors"
              >
                Media Coverage
              </Link>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                BAA Events
              </h1>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                {displayEvents.map((event) => (
                  <article
                    key={event.id}
                    className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow bg-white"
                  >
                    {/* Card Image */}
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={event.image || "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"}
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                      {/* Event type badge */}
                      <span
                        className="absolute top-3 left-3 text-xs text-white px-2 py-1 rounded-full font-medium"
                        style={{ backgroundColor: "#E8520A" }}
                      >
                        {event.event_type}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-4">
                      {/* Date */}
                      <div
                        className="flex items-center gap-1 text-xs mb-1"
                        style={{ color: "#E8520A" }}
                      >
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(event.event_date)}</span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>

                      {/* Title */}
                      <h2 className="font-semibold text-foreground text-sm leading-snug mb-1">
                        {event.title}
                      </h2>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}