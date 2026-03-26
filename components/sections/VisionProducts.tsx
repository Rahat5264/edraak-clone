"use client"

import React, { useRef } from 'react'

export default function VisionProducts({ products }: { products: any[] }) {
  const ref = useRef<HTMLDivElement | null>(null)

  const scrollBy = (dy: number) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ top: dy, behavior: 'smooth' })
  }

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden vision-products-controls">
      <div className="vp-buttons" aria-hidden>
        <button className="vp-btn" onClick={() => scrollBy(-120)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 15l6-6 6 6" /></svg>
        </button>
        <button className="vp-btn" onClick={() => scrollBy(120)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </button>
      </div>

      <div ref={ref} className="vision-products-scroll p-4">
        {products.slice(0, 12).map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-4 bg-white rounded p-3 border-b last:border-b-0 vp-row">
            <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 bg-gray-100">
              <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-900">{p.title}</h4>
                  <div className="text-sm text-[#02879f]">{p.subtitle}</div>
                </div>
              <p className="text-[18px] text-gray-600 mt-1">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
