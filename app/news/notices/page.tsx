import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Calendar } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Notice Board | Buying Agents Association",
  description: "Stay updated with the latest notices and announcements from the Buying Agents Association.",
}

const defaultNotices = [
  {
    id: 1,
    title: "Orientation for New Members",
    description: "Orientation session for all new members. Attendance mandatory.",
    date: "2025-01-10",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
  },
  {
    id: 2,
    title: "Annual General Meeting 2025",
    description: "All members are notified of the AGM for the year 2025 at New Delhi Trade Center.",
    date: "2025-01-15",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
  },
  {
    id: 3,
    title: "Updated Membership Fee Structure",
    description: "The governing body has approved the revised membership fee structure effective from April 2025.",
    date: "2025-01-20",
    image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg",
  },
  {
    id: 4,
    title: "New Trade Policy Guidelines",
    description: "Ministry of Commerce released new guidelines for export procedures. All members must review.",
    date: "2025-02-01",
    image: "https://images.pexels.com/photos/1181346/pexels-photo-1181346.jpeg",
  },
  {
    id: 5,
    title: "Workshop on Digital Export Documentation",
    description: "BAA is organizing a workshop on digital export documentation and e-commerce practices.",
    date: "2025-02-10",
    image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
  },
  {
    id: 6,
    title: "Call for Nominations — Committee Members",
    description: "Nominations are invited for positions in various BAA committees for the term 2025–2027.",
    date: "2025-02-20",
    image: "https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg",
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

export default async function NoticesPage() {
  const supabase = await createClient()

  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .order("date", { ascending: false })

  const displayNotices =
    notices && notices.length > 0 ? notices : defaultNotices

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col gap-2 w-44 shrink-0 pt-1">
              <Link
                href="/news/notices"
                className="px-3 py-2 text-sm font-semibold rounded text-white"
                style={{ backgroundColor: "#E8520A" }}
              >
                Notice Board
              </Link>
              <Link
                href="/news/events"
                className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-[#E8520A] transition-colors"
              >
                Events
              </Link>
              <Link
                href="/news/media-coverage"
                className="px-3 py-2 text-sm font-medium rounded text-foreground hover:text-[#E8520A] transition-colors"
              >
                Media Coverage
              </Link>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-3xl font-bold text-foreground mb-2">
                Notice Board
              </h1>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                {displayNotices.map((notice) => (
                  <article
                    key={notice.id}
                    className="rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow bg-white"
                  >
                    {/* Card Image */}
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={
                          notice.image ||
                          "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                        }
                        alt={notice.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="p-4">
                      {/* Date */}
                      <div
                        className="flex items-center gap-1 text-xs mb-2"
                        style={{ color: "#E8520A" }}
                      >
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(notice.date)}</span>
                      </div>
                      {/* Title */}
                      <h2 className="font-semibold text-foreground text-sm leading-snug mb-1">
                        {notice.title}
                      </h2>
                      {/* Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                        {notice.description}
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
