"use client"

import React from 'react'
import content from '@/data/privacy.json'

export default function PrivacyPolicyPage() {
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
                <p key={idx} className="mb-6 leading-relaxed">{p}</p>
              ))
            : <p className="mb-6 leading-relaxed">{content.content}</p>
          }
        </div>
      </section>
    </div>
  )
}
