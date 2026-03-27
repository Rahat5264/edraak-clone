import React from 'react'
import content from '@/data/content.json'
import VisionProducts from '@/components/sections/VisionProducts'

export const metadata = {
  title: 'Vision Platform - Edraak Systems',
}

export default function VisionPlatformPage() {
  const vision = content?.visionSystem || {}
  const products = content?.products || []
  const cam = content?.cameraIndustries || {}
  const sectors = content?.sectors || { items: [] }

  return (
    <main className="bg-[var(--bg,white)]">
      {/* Hero */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 px-4 lg:px-8">
            <p className="text-sm text-[#02879f] font-medium uppercase tracking-wide mb-3">Global Textile Solutions</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-slate-900 leading-tight mb-4">Camera Inspection in the Textile Industry</h1>
            <div className="text-[18px] text-gray-700 mb-6 max-w-2xl space-y-4">
              <p>EVS (Edraak Vision System) is an AI camera-based inspection solution for textile production lines. It uses high-resolution cameras to scan fabric continuously and detect defects such as stains, holes, misweaves, and color variations in real time.</p>
              <p>EVS detects faults early to reduce waste and maintain consistent fabric quality. Inspection data is recorded for monitoring, traceability, and better quality control.</p>
            </div>
            <div className="flex gap-3">
              <a href="/products" className="inline-flex items-center px-5 py-2 rounded bg-gradient-to-tr from-[#02879F] to-[#02E3DF] text-white shadow">Explore Products</a>
              <a href="/contact" className="inline-flex items-center px-5 py-2 rounded border border-slate-900 bg-white text-slate-900">Contact Sales</a>
            </div>
          </div>

          <div className="lg:col-span-5 px-4 lg:px-8">
              <div className="w-full rounded-lg overflow-hidden shadow-lg bg-white">
              <img src={cam.image || ''} alt="machine" className="w-full h-64 sm:h-80 md:h-96 lg:h-[360px] object-cover hero-image-rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Built for Excellence */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 px-4 lg:px-8 order-last lg:order-first">
            <div className="rounded-lg overflow-hidden shadow bg-white">
              <img src={content.sectors.items[0].subtabs[0].image} alt="inspection" className="w-full h-64 sm:h-72 md:h-80 object-cover hero-image-rounded" />
            </div>
          </div>

          <div className="lg:col-span-7 px-4 lg:px-8 order-first lg:order-last">
            <p className="text-sm text-[#02879f] font-medium uppercase tracking-wide mb-3">Why Choose Us</p>
            <h2 className="text-3xl md:text-4xl lg:text-[56px] font-bold text-slate-900 mb-4">Built for Excellence in Textile Manufacturing</h2>
            <p className="text-[18px] text-gray-700 leading-relaxed mb-6">Our textile quality control hardware is engineered to handle the toughest demands of modern global fabric production — delivering consistent results you can trust on every roll.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(vision.features || []).map((f: string, idx: number) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-7 h-7 mt-1 flex-shrink-0 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" fill="#02879f" />
                      <path d="M8.5 12.5l2 2 5-5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                  <div className="text-[18px] text-gray-700 leading-relaxed">{f}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Camera Inspection in Other Industries */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 px-4 lg:px-8">
            <p className="text-sm text-[#02879f] font-medium uppercase tracking-wide mb-3">{cam.title || ''}</p>
            <h3 className="text-2xl md:text-3xl lg:text-[56px] font-bold text-slate-900 mb-4">{cam.title || ''}</h3>
            <div className="text-[18px] text-gray-700 mb-6 max-w-2xl space-y-4">
              {Array.isArray(cam.description) ? (
                cam.description.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))
              ) : (
                <p>{cam.description || ''}</p>
              )}
            </div>
            <a href="/contact" className="inline-flex items-center px-5 py-2 rounded bg-gradient-to-tr from-[#02879F] to-[#02E3DF] text-white shadow">Learn More</a>
          </div>

          <div className="lg:col-span-5 px-4 lg:px-8">
              <div className="w-full rounded-lg overflow-hidden shadow-lg bg-white">
              <img src={cam.image || ''} alt="camera-industries" className="w-full h-64 sm:h-72 md:h-80 lg:h-[360px] object-cover hero-image-rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Products list (hardware) */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-[#02879f] font-medium uppercase tracking-wide mb-3">Hardware Products</p>
          <h3 className="text-[30px] md:text-[56px] font-bold text-slate-900 mb-6">Fabric Defect Detection Hardware</h3>

          <VisionProducts products={products} />
        </div>
      </section>

      {/* CTA dark */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-white rounded-lg p-10 md:p-16" style={{ background: 'var(--hero-gradient)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">Ready to Upgrade Your Fabric Quality Control?</h3>
              <p className="text-[18px] text-gray-200 mt-3">Join major textile manufacturers who count on us. Sign up quickly and start using it.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-start md:justify-end">
              <a href="/contact" className="inline-block w-full sm:w-auto bg-white text-black px-6 py-2 rounded shadow text-center">Contact</a>
              <a href="/products" className="inline-block w-full sm:w-auto bg-white text-black px-6 py-2 rounded text-center">Download Catalog</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
