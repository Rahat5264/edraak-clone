"use client"

import Link from 'next/link'
import { useState } from 'react'
import ApplyModal from '@/components/ui/ApplyModal'
import content from '@/data/content.json'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function CareerPage() {
  const jobs = Array.isArray(content.careers?.items) ? content.careers.items : []
  const [applyOpen, setApplyOpen] = useState(false)
  const [applyJob, setApplyJob] = useState<any | null>(null)

  return (
    <div className="min-h-screen bg-white text-foreground py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{content.careers?.title || 'Careers'}</h1>
        <p className="text-lg text-gray-700 mb-8">{content.careers?.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jobs.map((j: any) => {
            const slug = slugify(j.title || '')
            return (
              <div key={slug} className="bg-white overflow-hidden shadow-sm border border-gray-200 flex flex-col h-full">
                <div className="h-48 bg-gray-100 overflow-hidden flex-shrink-0">
                  {j.image ? <img src={j.image} alt={j.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200" />}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between" style={{backgroundColor: '#05032A'}}>
                  <div>
                    <h3 className="text-xl font-bold text-white">{j.title}</h3>
                    <div className="mt-2 text-sm text-slate-200">{j.location} • {j.type}</div>
                    <p className="mt-3 text-sm text-slate-200">{j.short}</p>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <Link href={`/career/${slug}`} className="px-4 py-2" style={{backgroundColor: '#ffffff', color: '#000000', textDecoration: 'none', border: '1px solid rgba(0,0,0,0.08)'}}>Read more</Link>
                    <button onClick={() => { setApplyJob(j); setApplyOpen(true) }} className="px-4 py-2" style={{backgroundColor: '#ffffff', color: '#000000', border: '1px solid rgba(0,0,0,0.08)'}}>Apply now</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        {applyOpen && <ApplyModal job={applyJob} onClose={() => setApplyOpen(false)} />}
      </div>
    </div>
  )
}
