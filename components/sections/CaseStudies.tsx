"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'

export default function CaseStudies() {
  const intro = content.caseStudies.intro
  const [expanded, setExpanded] = useState<Set<number>>(new Set())

  const toggle = (i: number) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const truncateWords = (text: string, limit = 23) => {
    const words = text.split(/\s+/)
    if (words.length <= limit) return text
    return words.slice(0, limit).join(' ') + '...'
  }

  return (
    <section id="cases" className="py-20 md:py-32 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-[56px] font-bold text-center mb-4 text-primary">{content.caseStudies.title}</h2>

        {intro && (
          <p className="mx-auto max-w-3xl text-center text-gray-700 mb-10">{intro}</p>
        )}

        <div className="space-y-8">
          {content.caseStudies.items.map((study: any, idx: number) => {
            const reverse = idx % 2 === 1 // odd-indexed cards reverse on md+
            const isExpanded = expanded.has(idx)
            return (
              <div key={idx} className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-6">
                <div className="flex-shrink-0 flex items-start md:items-center">
                  <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">{idx + 1}</div>
                </div>

                <div className={`flex-1 bg-white rounded-3xl overflow-hidden shadow-md flex flex-col md:flex-row relative ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} md:items-stretch ${isExpanded ? 'md:h-auto' : 'md:h-72'}`}>
                  <div className="md:w-1/2 p-6 md:p-10 flex flex-col gap-4 md:h-full">
                    <h3 className="text-2xl md:text-3xl font-extrabold">{study.title}</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">{isExpanded ? study.description : truncateWords(study.description, 23)}</p>

                    <div className="mt-auto">
                      <Button onClick={() => toggle(idx)} className="bg-primary text-white hover:opacity-95 border-0">
                        {isExpanded ? 'Show less' : study.cta || 'Read case'}
                      </Button>
                    </div>
                  </div>

                  <div className="md:w-1/2 w-full overflow-hidden flex-shrink-0 md:h-full">
                    {study.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={study.image} alt={study.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
