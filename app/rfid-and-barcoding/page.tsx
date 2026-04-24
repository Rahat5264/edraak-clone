import Link from 'next/link'
import InquiryButton from '@/components/ui/InquiryButton'
import QuickLinks from '@/components/sections/QuickLinks'

const prod = {
  title: 'RFID AND BARCODING',
  subtitle: 'Production Tracking',
  summary: 'A digital system that captures live production data through operator and bundle scanning, ensuring accurate tracking of output, work-in-progress, and performance.',
  desc: 'Real-time production monitoring for sewing lines that tracks operators, machines, and workflow using barcode/RFID scanning, enabling full visibility and automated control.',
  need: [
    'Operator and bundle cards',
    'Barcode/RFID scanners',
    'Centralized Edraak software for monitoring and reporting'
  ],
  existingProcess: 'Manual tracking with delayed reporting\nLimited visibility of production and WIP\nManual wage calculation',
  proposedProcess: 'Operator cards assigned by IE/HR\nBundle cards assigned by cutting/WIP team\nOperations assigned via system\nOperators scan cards to start work and bundles to begin production\nSystem records progress and calculates wages in real time',
  img: 'https://db.edraaksystems.com/wp-content/uploads/2026/04/edited.png',
  images: [
    'https://db.edraaksystems.com/wp-content/uploads/2026/04/edited.png'
  ],
  bullets: [
    'Real-time production tracking',
    'Automated wage calculation',
    'WIP tracking and control',
    'Improved efficiency and line balancing',
    'Lead time alerts',
    'Data-driven reporting and insights'
  ]
}

export default function RfidAndBarcodingPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="no-scrollbar" style={{ maxHeight: 'calc(100vh - 6rem)', overflowY: 'auto', paddingRight: '1rem' }}>
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

              <div className="mt-8 flex gap-3">
                <Link href="/products" className="inline-block px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }}>Back</Link>
                <InquiryButton product={prod} className="inline-block px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }} />
              </div>
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
