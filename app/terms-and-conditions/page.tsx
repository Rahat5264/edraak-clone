import React from 'react'
import content from '@/data/terms.json'

const SITE_URL = 'https://www.edraaksystems.com'

export async function generateMetadata() {
  const title = `${content?.title || 'Terms & Conditions'} | Edraak Systems`
  return {
    title,
    description: (Array.isArray(content?.content) ? content.content.slice(0, 2).join(' ') : content?.content) || 'Terms and conditions for Edraak Systems.',
    alternates: { canonical: `${SITE_URL}/terms-and-conditions` }
  }
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <section className="bg-gradient-to-tr from-[#02879F] to-[#02E3DF] py-28">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">{content.title}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-slate-700 space-y-6">
          {Array.isArray(content.content)
            ? content.content.map((p: string, idx: number) => (
                <p key={idx} className="leading-relaxed">{p}</p>
              ))
            : <p className="leading-relaxed">{content.content}</p>
          }
        </div>
      </section>
    </div>
  )
}
