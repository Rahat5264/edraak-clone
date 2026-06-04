import Link from 'next/link'
import InquiryButton from '@/components/ui/InquiryButton'
import QuickLinks from '@/components/sections/QuickLinks'

const prod: any = {
  title: 'Energy Monitoring System',
  subtitle: 'Energy Monitoring System',
  summary: `Energy Monitoring System is a hardware + software solution designed for energy monitoring in production, accurately measuring electricity, water, steam, and compressed air used in each fabric roll or production piece. This enables precise, real-time energy monitoring instead of relying on estimated averages.`,
  need: [
    'Measuring devices for electricity, water, steam, and air',
    'Centralized software for data collection and analysis',
    'Machine-level integration for energy monitoring in production per fabric roll'
  ],
  existingProcess: `Currently, factories follow a manual estimation approach for energy monitoring: Utility readings are taken at department level over 24 hours and average consumption is calculated for overall usage. This average is used to estimate SAM (Standard Allowed Minutes) per article.`,
  limitations: [
    'Based on assumptions rather than real data',
    'No precise energy monitoring in production at roll or process level',
    'High risk of SAM calculation and verification errors'
  ],
  proposedProcess: `The proposed energy monitoring system provides a data-driven approach: real-time energy monitoring at machine and process level, accurate measurement of utilities used per fabric roll, and automated data collection and analysis through software.`,
  result: [
    'Reliable SAM calculation and verification',
    'Transparent energy monitoring in production',
    'Reduced waste and improved operational efficiency'
  ],
  img: 'https://db.edraaksystems.com/wp-content/uploads/2026/03/08c3ae8d67a75f29c2762de6ddc3d4f7ba59a2f3.png',
  images: [
    'https://db.edraaksystems.com/wp-content/uploads/2026/03/08c3ae8d67a75f29c2762de6ddc3d4f7ba59a2f3.png'
  ]
}

export const metadata = {
  title: prod.title,
  description: 'Energy Monitoring System (EMS) is a hardware + software setup that tracks real-time electricity, water, steam & gas usage across processes to cut cost & waste.',
  alternates: {
    canonical: 'https://www.edraaksystems.com/energy-monitoring'
  }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": prod.title,
  "description": metadata.description,
  "url": "https://www.edraaksystems.com/energy-monitoring",
  "mainEntity": {
    "@type": "Service",
    "name": "Energy Monitoring System",
    "description": metadata.description
  }
}

export default function EnergyMonitoringPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-md overflow-hidden shadow-md">
              {prod.comingSoon ? (
                <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-2xl font-semibold text-gray-500">{prod.comingSoonText || 'Coming soon'}</div>
              ) : (
                <img src={(prod.img || (prod.images && prod.images[0]) || '')} alt={prod.title} className="w-full h-80 object-cover" />
              )}
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl leading-tight font-semibold text-slate-900">{prod.title}</h1>
            {prod.subtitle && <p className="text-sm font-medium mt-2" style={{ color: 'rgb(5,3,42)' }}>{prod.subtitle}</p>}

            {prod.desc && (
              <div className="mt-4 text-lg text-slate-700 space-y-4">
                {typeof prod.desc === 'string' ? <p>{prod.desc}</p> : (Array.isArray(prod.desc) ? prod.desc.map((d: string, i: number) => <p key={i}>{d}</p>) : null)}
              </div>
            )}

            {prod.summary && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Summary</h4>
                <p className="text-slate-700">{prod.summary}</p>
              </div>
            )}

            {Array.isArray(prod.need) && prod.need.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Need</h4>
                <ul className="list-disc pl-6 text-slate-700">
                  {prod.need.map((n: string, i: number) => <li key={i}>{n}</li>)}
                </ul>
              </div>
            )}

            {prod.existingProcess && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Existing Process</h4>
                <p className="text-slate-700">{prod.existingProcess}</p>
              </div>
            )}

            {prod.proposedProcess && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Proposed Process</h4>
                <p className="text-slate-700">{prod.proposedProcess}</p>
              </div>
            )}

            {Array.isArray(prod.limitations) && prod.limitations.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Limitations</h4>
                <ul className="list-disc pl-6 text-slate-700">
                  {prod.limitations.map((l: string, i: number) => <li key={i}>{l}</li>)}
                </ul>
              </div>
            )}

            {prod.result && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Result</h4>
                {Array.isArray(prod.result) ? prod.result.map((r: string, i: number) => <p key={i} className="text-slate-700">{r}</p>) : <p className="text-slate-700">{prod.result}</p>}
              </div>
            )}

            <div className="mt-8 flex gap-3">
              <Link href="/products" className="inline-block px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }}>Back</Link>
              <InquiryButton product={prod} className="inline-block px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }} />
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-700">Category</p>
                <p className="text-sm" style={{ color: 'rgb(5,3,42)' }}>{prod.category || prod.subtitle || '—'}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-700">Gallery</h4>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {prod.comingSoon ? (
                    <div className="h-20 w-full overflow-hidden rounded-md bg-gray-100 col-span-3 flex items-center justify-center text-sm font-medium text-gray-500">{prod.comingSoonText || 'Coming soon'}</div>
                  ) : (((prod.images && Array.isArray(prod.images) && prod.images) || []).length > 0 ? (
                    prod.images.map((u: string, i: number) => (
                      <div key={i} className="h-20 w-full overflow-hidden rounded-md bg-gray-100">
                        <img src={u} alt={`${prod.title}-${i}`} className="w-full h-full object-cover" />
                      </div>
                    ))
                  ) : (
                    <div className="h-20 w-full overflow-hidden rounded-md bg-gray-100">
                      <img src={prod.img} alt={prod.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="sticky top-24"><QuickLinks /></div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
