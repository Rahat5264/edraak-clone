import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import industries from '@/data/other-industries.json'

const SITE_URL = 'https://www.edraaksystems.com'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function getIndustry(slug: string) {
  return industries.find((industry) => slugify(industry.name) === slug)
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const industry = getIndustry(slug)

  if (!industry) {
    return {
      title: 'Similar Industries | Edraak Systems',
      description: 'Explore how Edraak Systems can be applied across multiple industrial sectors.',
    }
  }

  const title = industry.metaTitle || `${industry.name} | Similar Industries | Edraak Systems`
  const description = industry.metaDescription || industry.intro

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/similar-industries/${slug}`,
      siteName: 'Edraak Systems',
      type: 'website',
      images: industry.image ? [{ url: industry.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: industry.image ? [industry.image] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}/similar-industries/${slug}`,
    },
  }
}

export default async function OtherIndustriesDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = getIndustry(slug)

  if (!industry) {
    notFound()
  }

  const relatedIndustries = industries.filter((item) => slugify(item.name) !== slug).slice(0, 4)

  return (
    <main className="min-h-screen bg-white text-foreground">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <Link href="/similar-industries" className="text-sm font-medium text-[#02879F] hover:underline">
          ← Back to Similar Industries
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#02879F]">Edraak Vision Systems</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {industry.name}
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg">
              {industry.details}
            </p>

            <div className="mt-10 space-y-6 text-base text-gray-600">
              {industry.pageContent.map((item, i) => {
                if (item.type === 'heading') {
                  return (
                    <h2 key={i} className="text-xl font-semibold text-foreground">
                      {item.text}
                    </h2>
                  )
                }
                if (item.type === 'text') {
                  return (
                    <p key={i} className="leading-7">
                      {item.text}
                    </p>
                  )
                }
                if (item.type === 'list' && item.items) {
                  return (
                    <ul key={i} className="list-disc pl-6 space-y-1">
                      {item.items.map((li, lii) => (
                        <li key={lii}>{li}</li>
                      ))}
                    </ul>
                  )
                }
                return null
              })}
            </div>
          </div>

          <div className="bg-white border flex flex-col overflow-hidden shadow-sm">
            <div className="h-80 bg-gray-100">
              <img src={industry.image} alt={industry.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <section className="mt-16 border-t border-gray-200 pt-10">
          <h2 className="text-2xl font-semibold text-foreground">Related Industries</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {relatedIndustries.map((item, index) => (
              <Link
                key={item.name}
                href={`/similar-industries/${slugify(item.name)}`}
                className="block overflow-hidden shadow-sm"
                style={{ backgroundColor: '#05032A' }}
              >
                <div className="h-48">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    <span className="text-xs uppercase tracking-[0.28em] text-white/60">0{index + 1}</span>
                  </div>
                  <p className="text-sm text-slate-200">{item.intro}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
