import type { Metadata } from 'next'
import Link from 'next/link'

const SITE_URL = 'https://www.edraaksystems.com'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const industries = [
  {
    name: 'Automobile',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/07/automibile-1.jpg',
    intro: 'Quality control in the automobile industry at the final stages.',
    outcome: 'Outcome is reporting, tagging of defects, and better planning for the next process.',
  },
  {
    name: 'Minerals',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/07/pexels-mart-production-8471928-scaled.webp',
    intro: 'Sorting and evaluation of minerals at the input stage.',
    outcome: 'Outcome is reporting and removal of defective parts.',
  },
  {
    name: 'Paper',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/07/paper-roll.jpg',
    intro: 'Detecting anomalies in printing, de-coloration, and/or stains.',
    outcome: 'Outcome is reporting, removal of defective parts, and calculation of machine efficiency.',
  },
  {
    name: 'Food & Beverages',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/07/ChatGPT-Image-Jul-27-2026-11_17_48-AM.jpg',
    intro: 'Detecting packaging issues, baking issues in biscuits, broken items, color-based issues, incorrect packaging, etc.',
    outcome: 'Outcome is better quality control, reporting, and removal of defective parts. Calculation of machine efficiency.',
  },
  {
    name: 'Textiles',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/07/ChatGPT-Image-Jul-27-2026-11_26_11-AM.webp',
    intro: 'Fabric inspection, defect detection, and inline quality monitoring.',
    outcome: 'Outcome is improved fabric quality, automated reporting, and fewer manual checks.',
  },
  {
    name: 'Pharma',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/07/ChatGPT-Image-Jul-27-2026-11_24_25-AM.jpg',
    intro: 'Installed in blister scanning lines, the cameras are capable of identifying defects such as broken or cracked pills.',
    outcome: 'Outcome is reliable QA, traceable reporting, and removal of defective items.',
  },
  {
    name: 'Robotics',
    image: 'https://db.edraaksystems.com/wp-content/uploads/2026/07/robotics.jpg',
    intro: 'Vision checks for robotic cells and automated production lines.',
    outcome: 'Outcome is faster feedback, better process control, and reduced downtime.',
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Other Industries | Edraak Systems'
  const description = 'Explore the industries Edraak Systems can serve beyond textiles with a clean, modular visual layout.'

  return {
    title,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/other-industries`,
      siteName: 'Edraak Systems',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${SITE_URL}/other-industries`,
    },
  }
}

export default function OtherIndustriesPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Other Industries',
    url: `${SITE_URL}/other-industries`,
    itemListElement: industries.map((industry, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Thing',
        name: industry.name,
        description: industry.intro,
      },
    })),
  }

  return (
    <main className="min-h-screen bg-white text-foreground">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#02879F]">Edraak Vision Systems</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Other Industries
            </h1>
            <p className="mt-4 max-w-4xl text-base leading-7 text-gray-600 sm:text-lg">
              EVS can be used across other industries to support visual detection, signal machines at the right moment,
              and capture the machine data that helps teams improve quality, efficiency, and process control.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex w-fit items-center rounded-full border border-[#02879F]/20 bg-[#02879F] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#02879F]/90"
          >
            Contact Sales
          </Link>
        </div>

        <div className="space-y-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <Link
                key={industry.name}
                href={`/other-industries/${slugify(industry.name)}`}
                className="block bg-white border flex flex-col overflow-hidden"
                aria-label={`Open details for ${industry.name}`}
              >
                <div className="h-56 bg-gray-100">
                  {industry.image ? (
                    <img
                      src={industry.image}
                      alt={industry.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[linear-gradient(135deg,rgba(2,135,159,0.08),rgba(255,255,255,1))]" />
                  )}
                </div>

                <div
                  className="p-6 flex-1 flex flex-col justify-between"
                  style={{ backgroundColor: '#05032A' }}
                >
                  <div>
                    <h3 className="text-xl font-bold text-white">{industry.name}</h3>
                    <p className="mt-3 text-sm text-slate-200">
                      {industry.intro}
                    </p>
                  </div>

                  <div className="mt-6">
                    <span className="inline-block px-4 py-2 bg-white text-black text-sm">
                      Read more
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-10 lg:pt-12">
            <p className="max-w-4xl text-base leading-7 text-gray-600 sm:text-lg">
              These use cases are only a starting point. The same EVS approach can be tailored to different production environments,
              helping teams detect defects earlier, trigger machine actions at the right time, and collect usable data for better decisions.
            </p>
            <p className="mt-4 max-w-5xl text-base leading-7 text-gray-600 sm:text-lg">
              From automobile lines to minerals, paper, food and beverages, textiles, robotics, and pharma, EVS helps teams connect
              visual inspection with process control. That means fewer manual checks, clearer reporting, and a more reliable flow of
              machine data across the full production chain.
            </p>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  )
}