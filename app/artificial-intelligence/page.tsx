import Link from 'next/link'
import InquiryButton from '@/components/ui/InquiryButton'
import QuickLinks from '@/components/sections/QuickLinks'

const prod = {
  title: 'Artificial Intelligence',
  subtitle: 'AI-powered Fabric Inspection',
  summary: 'We use AI to inspect fabric for defects, color deviations, and pattern anomalies — leveraging the same high-speed camera pipelines and model training workflows used across our inspection products, repurposed for advanced anomaly detection and predictive analytics.',
  need: [
    'High-speed camera integration',
    'Labeled training data and model training',
    'Edge or cloud inference deployment'
  ],
  existingProcess: `Inspections are often manual or use basic thresholding approaches, which miss subtle defects and cannot scale to high line speeds.`,
  proposedProcess: `We apply trained AI models on camera streams to detect and classify defects in real-time, integrate with traceability systems, and produce actionable reports for operators and managers.`,
  img: 'https://db.edraaksystems.com/wp-content/uploads/2026/03/7f056ae68bfcfdfe2ccc91083e0797aa4a786fc0-scaled.png',
  images: [
    'https://db.edraaksystems.com/wp-content/uploads/2026/03/7f056ae68bfcfdfe2ccc91083e0797aa4a786fc0-scaled.png'
  ]
}

export const metadata = {
  title: prod.title,
  description: prod.summary || prod.desc || 'AI-powered fabric inspection and predictive analytics for textile manufacturing.',
}

export default function ArtificialIntelligencePage() {
  return (
    <div className="min-h-screen bg-white py-12">
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
