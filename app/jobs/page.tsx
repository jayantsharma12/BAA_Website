import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Briefcase, Clock, DollarSign, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Jobs | Buying Agents Association",
  description: "Explore career opportunities in the buying agent sector.",
}

export default async function JobsPage() {
  const supabase = await createClient()

  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_active", true)
    .order("posted_at", { ascending: false })

  const defaultJobs = [
    {
      id: 1,
      title: "Senior Export Manager",
      company: "Global Trade Solutions",
      location: "Mumbai",
      job_type: "Full-time",
      experience: "5-8 years",
      salary_range: "15-20 LPA",
      description: "Looking for an experienced export manager to lead our international operations team.",
      posted_at: "2024-02-18",
    },
    {
      id: 2,
      title: "Buying Agent - Handicrafts",
      company: "Artisan Exports Ltd",
      location: "Jaipur",
      job_type: "Full-time",
      experience: "3-5 years",
      salary_range: "8-12 LPA",
      description: "Seeking a buying agent specializing in handicrafts and home decor items.",
      posted_at: "2024-02-15",
    },
    {
      id: 3,
      title: "Trade Compliance Officer",
      company: "Export Ventures India",
      location: "Delhi NCR",
      job_type: "Full-time",
      experience: "4-6 years",
      salary_range: "10-15 LPA",
      description: "Required trade compliance officer to ensure adherence to export regulations.",
      posted_at: "2024-02-10",
    },
    {
      id: 4,
      title: "Quality Control Inspector",
      company: "Textile Export House",
      location: "Tirupur",
      job_type: "Full-time",
      experience: "2-4 years",
      salary_range: "5-8 LPA",
      description: "Looking for quality control inspector for our textile export unit.",
      posted_at: "2024-02-05",
    },
    {
      id: 5,
      title: "Business Development Executive",
      company: "International Trade Corp",
      location: "Bangalore",
      job_type: "Full-time",
      experience: "2-3 years",
      salary_range: "6-9 LPA",
      description: "Energetic BD executive needed to develop new buyer relationships.",
      posted_at: "2024-02-01",
    },
    {
      id: 6,
      title: "Sourcing Specialist - Leather Goods",
      company: "Premium Exports",
      location: "Chennai",
      job_type: "Contract",
      experience: "3-5 years",
      salary_range: "7-10 LPA",
      description: "Contract position for sourcing specialist in leather goods.",
      posted_at: "2024-01-28",
    },
  ]

  const displayJobs = jobs && jobs.length > 0 ? jobs : defaultJobs

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffDays = Math.ceil(Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">

        {/* Hero — background image instead of orange */}
        <section
          className="relative py-16 md:py-24 overflow-hidden"
          style={{
            backgroundImage: `url("https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1920")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="font-semibold text-4xl md:text-5xl font-bold text-white">
                Career Opportunities
              </h1>
              <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                Explore exciting job opportunities in the buying agent sector and
                take your career to new heights.
              </p>
            </div>
          </div>
        </section>

        {/* Jobs List */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                Showing {displayJobs.length} job openings
              </p>
            </div>

            <div className="space-y-6">
              {displayJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <CardTitle className="text-xl">
                          {job.title}
                        </CardTitle>
                        <p className="text-primary font-medium mt-1">{job.company}</p>
                      </div>
                      <Badge variant="outline" className="shrink-0 w-fit">
                        {job.job_type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-primary" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4 text-primary" />
                        {job.experience}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-primary" />
                        {job.salary_range}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-primary" />
                        Posted {formatDate(job.posted_at)}
                      </div>
                    </div>
                    <Button asChild className="bg-primary text-white hover:bg-primary/90">
                      <Link href={`/jobs/${job.id}`} className="flex items-center gap-2">
                        Apply Now
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Post Job CTA — background image instead of orange */}
        <section
          className="relative py-16 overflow-hidden"
          style={{
            backgroundImage: `url("https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-semibold text-2xl md:text-3xl font-bold text-white">
              Looking to Hire?
            </h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">
              Post your job openings on our platform and reach qualified
              professionals in the buying agent community.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 bg-primary text-white hover:bg-primary/90"
            >
              <Link href="/contact">
                Post a Job
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}