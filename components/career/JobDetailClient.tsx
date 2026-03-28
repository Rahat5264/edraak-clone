"use client"

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import ApplyModal from '@/components/ui/ApplyModal'

function slugify(s: string) {
  return (s || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function JobDetailClient({ job, jobs, slug }: { job?: any, jobs?: any[], slug?: string }) {
  const [applyOpen, setApplyOpen] = useState(false)
  const [resolvedJob, setResolvedJob] = useState<any | null>(job || null)
  const pathname = usePathname()

  useEffect(() => {
    if (resolvedJob) return
    const effectiveSlug = slug || (pathname ? pathname.split('/').filter(Boolean).pop() : '')
    if (!effectiveSlug) return
    const list = Array.isArray(jobs) ? jobs : []
    const found = list.find(j => slugify(j.title) === effectiveSlug)
    if (found) setResolvedJob(found)
  }, [job, jobs, slug, pathname, resolvedJob])

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-md overflow-hidden shadow-md">
          {resolvedJob && resolvedJob.image && <img src={resolvedJob.image} alt={resolvedJob.title} className="w-full h-72 object-cover" />}
        </div>
        <h1 className="mt-6 text-4xl font-semibold">{resolvedJob?.title}</h1>
        <div className="mt-2 text-sm text-slate-700">{resolvedJob?.location} • {resolvedJob?.type}</div>

        <div className="mt-6 prose max-w-none text-slate-700">
          <p>{resolvedJob?.description}</p>

          {Array.isArray(resolvedJob?.responsibilities) && (
            <>
              <h3>Responsibilities</h3>
              <ul>
                {resolvedJob.responsibilities.map((r: string, i: number) => <li key={i}>{r}</li>)}
              </ul>
            </>
          )}

          {Array.isArray(resolvedJob?.qualifications) && (
            <>
              <h3>Qualifications</h3>
              <ul>
                {resolvedJob.qualifications.map((q: string, i: number) => <li key={i}>{q}</li>)}
              </ul>
            </>
          )}
        </div>

        <div className="mt-8 flex gap-3">
          <Link href="/career" className="inline-block px-4 py-2 border" style={{borderRadius:0}}>Back</Link>
          <button onClick={() => setApplyOpen(true)} className="inline-block px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius:0 }}>Apply Now</button>
        </div>
        {applyOpen && <ApplyModal job={job} onClose={() => setApplyOpen(false)} />}
      </div>
    </div>
  )
}
