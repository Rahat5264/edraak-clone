import Link from 'next/link'
import content from '../../data/content.json'
import InquiryButton from '@/components/ui/InquiryButton'

const tech = (content?.technology?.items || []).find((i: any) => {
  const t = (i?.title || '').toLowerCase()
  return t.includes('data') || t.includes('analytics') || t.includes('business')
})

// Create an organic, non-repetitive intro and a concise summary derived from the tech card
const baseDesc = Array.isArray(tech?.description) ? tech.description.join(' ') : (tech?.description || '')
const refinedIntro = baseDesc
  ? baseDesc + ' We ingest inspection, production and energy telemetry, normalize it, and surface dashboards, alerts, and exportable reports tailored to operations and management.'
  : 'We unify inspection, production and energy data to provide dashboards, anomaly detection and predictive insights that improve yield and reduce downtime.'

const summary = baseDesc
  ? 'Turn disparate production and inspection data into clear, actionable insights that reduce waste, improve yield, and lower operating costs.'
  : 'Transform data into actionable operational insights.'

const needHints = tech?.need ?? (baseDesc.includes(',') ? baseDesc.split(',').slice(0,3).map((s:any)=> s.trim()) : [])
const images = tech?.image ? [tech.image] : ((tech?.images && tech.images.length) ? tech.images : [])

const prod = {
  title: tech?.title ?? 'Data & Business Analytics',
  subtitle: tech?.title ?? 'Data & Business Analytics',
  summary,
  desc: refinedIntro,
  need: needHints,
  proposedProcess: 'Collect data from cameras, machines and sensors; normalize and store in a unified analytics engine; provide dashboards, anomaly detection, and scheduled reports to operations and management.',
  img: images[0] ?? '',
  images,
  bullets: tech?.bullets ?? [
    'Unified production and inspection dashboards',
    'Custom KPI reports and scheduled exports',
    'Anomaly detection and alerts',
    'Predictive insights for maintenance and yield optimization',
    'API-ready datasets for BI integration'
  ]
}

export default function DataAnalyticsPage() {
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

            {prod.proposedProcess && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Proposed Process</h4>
                <p className="text-slate-700">{prod.proposedProcess}</p>
              </div>
            )}

            {Array.isArray(prod.bullets) && prod.bullets.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Key Points</h4>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  {prod.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
                </ul>
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
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
