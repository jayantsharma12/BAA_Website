import { createClient } from '@/lib/supabase/server'
import { BenefitCard } from '@/components/cards/benefit-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export async function DynamicBenefitsSection() {
  const supabase = await createClient()

  const { data: benefits, error } = await supabase
    .from('benefits')
    .select('id, title, description, icon, sort_order')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('[v0] Error fetching benefits:', error)
    return null
  }

  const displayBenefits = (benefits || []).slice(0, 6)

  if (!displayBenefits.length) {
    return null
  }

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center animate-rise-in-slow">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Member Benefits
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-2">
            Exclusive advantages for all BAA members
          </p>
          {benefits && benefits.length > 6 && (
            <div className="mt-4">
              <Button asChild variant="outline" size="sm" className="text-primary border-primary hover:bg-primary/5">
                <Link href="/benefits">View All</Link>
              </Button>
            </div>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max">
          {displayBenefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="animate-rise-in"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <BenefitCard
                id={benefit.id}
                title={benefit.title}
                description={benefit.description}
                icon_name={benefit.icon ?? "briefcase"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}