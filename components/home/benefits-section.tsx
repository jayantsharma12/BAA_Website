import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import {
  Building2,
  GraduationCap,
  Mic,
  Network,
  Share2,
  ShoppingBag
} from "lucide-react"
import Link from "next/link"

const iconList = [GraduationCap, Share2, Mic, Building2, ShoppingBag, Network]

export async function BenefitsSection() {
  const supabase = await createClient()

  const { data: benefits } = await supabase
    .from("benefits")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true })

  const defaultBenefits = [
    { id: 1, title: "Skill Development", description: "The Buying Agents Association organises training workshops, seminars, conference in compliance, merchandising, production, quality." },
    { id: 2, title: "Knowledge Sharing", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id est at lectus tristique tristique. Morbi finibus nibh nec commodo." },
    { id: 3, title: "Voice of Industry", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id est at lectus tristique tristique. Morbi finibus nibh nec commodo." },
    { id: 4, title: "Govt Liaison – Your connect to the Govt", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id est at lectus tristique tristique. Morbi finibus nibh nec commodo." },
    { id: 5, title: "Access to Markets", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id est at lectus tristique tristique. Morbi finibus nibh nec commodo." },
    { id: 6, title: "Community Networking", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id est at lectus tristique tristique. Morbi finibus nibh nec commodo." },
  ]

  const displayBenefits = benefits && benefits.length > 0 ? benefits : defaultBenefits

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Centered heading with lines */}
        <div className="flex items-center gap-4 mb-14">
          <div className="flex-1 h-px bg-border" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center whitespace-nowrap">
            Members Benefits
          </h2>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {displayBenefits.map((benefit, i) => {
            const Icon = iconList[i % iconList.length]
            return (
              <div key={benefit.id} className="flex flex-col items-start gap-3">
                <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-1">
                  <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-foreground text-base leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                  <Link
                    href="/membership"
                    className="text-primary hover:underline ml-1"
                  >
                    ...Read More
                  </Link>
                </p>
              </div>
            )
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-14">
          <Button
            asChild
            className="bg-primary text-white hover:bg-primary/90 px-10 rounded-full"
          >
            <Link href="/membership">View All</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}