import Link from 'next/link'
import InquiryButton from '@/components/ui/InquiryButton'
import content from '@/data/content.json'
import QuickLinks from '@/components/sections/QuickLinks'

const SITE_URL = 'https://www.edraaksystems.com'

export async function generateMetadata() {
  const title = prod?.title ? `${prod.title} | Edraak Systems` : 'Digital Data Loggers | Edraak Systems'
  const description = prod?.summary || prod?.desc || 'Industrial data loggers and monitoring solutions.'
  return { title, description, openGraph: { title, description, url: `${SITE_URL}/digital-data-loggers` }, alternates: { canonical: `${SITE_URL}/digital-data-loggers` } }
}

const findCase = (title: string) => {
  try {
    const items = Array.isArray((content as any).caseStudies) ? (content as any).caseStudies : []
    return items.find((c: any) => (c && c.title && c.title.toString().toLowerCase() === title.toLowerCase())) || null
  } catch (e) {
    return null
  }
}

const cs = findCase('Digital Data Loggers')

const prod: any = cs
  ? {
      title: cs.title,
      subtitle: 'Industrial Data Loggers',
      summary: cs.description || 'Industrial grade data loggers for machine and operator data capture.',
      desc: cs.description || '',
      bullets: [
        'Collect manual operator inputs and machine sensor data',
        'Industrial-grade hardware with local buffering',
        'Integrates with PLCs, sensors and edge devices',
        'Exportable logs and easy reporting',
      ],
      img: cs.image || '' ,
      images: cs.image ? [cs.image] : []
    }
  : {
      title: 'Digital Data Loggers',
      subtitle: 'Industrial Data Loggers',
      summary: 'Industrial grade data loggers for machine and operator data capture.',
      desc: 'Industrial grade digital data loggers to allow users to input data manually and also link machine & sensors.',
      bullets: [
        'Collect manual operator inputs and machine sensor data',
        'Industrial-grade hardware with local buffering',
        'Integrates with PLCs, sensors and edge devices',
        'Exportable logs and easy reporting',
      ],
      img: 'https://db.edraaksystems.com/wp-content/uploads/2026/03/7416f4777e551f66832b6b56d8cb72b658e09b48-scaled.png',
      images: [
        'https://db.edraaksystems.com/wp-content/uploads/2026/03/7416f4777e551f66832b6b56d8cb72b658e09b48-scaled.png'
      ]
    }

export const metadata = {
  title: prod.title,
  description: prod.summary || prod.desc || 'Industrial data loggers for machine and operator telemetry, integrated with analytics and reporting.',
}

export default function DigitalDataLoggersPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-md overflow-hidden shadow-md">
              {prod.img ? (
                <img src={prod.img} alt={prod.title} className="w-full h-64 object-cover" />
              ) : (
                <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-500">Image</div>
              )}
            </div>

            <h1 className="mt-6 text-3xl md:text-4xl font-semibold text-slate-900">{prod.title}</h1>
            {prod.subtitle && <p className="text-sm font-medium mt-2" style={{ color: 'rgb(5,3,42)' }}>{prod.subtitle}</p>}

            {prod.desc && (
              <div className="mt-4 text-lg text-slate-700 space-y-4">
                <p>{prod.desc}</p>
              </div>
            )}

            {prod.summary && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Summary</h4>
                <p className="text-slate-700">{prod.summary}</p>
              </div>
            )}

            {Array.isArray(prod.bullets) && prod.bullets.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Key points</h4>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  {prod.bullets.map((b: string, i: number) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            )}

            <div className="mt-8 flex gap-3">
              <Link href="/case-studies" className="inline-block px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }}>Back</Link>
              <InquiryButton product={prod} className="inline-block px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }} />
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-slate-700">Gallery</h4>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {((prod.images && Array.isArray(prod.images) && prod.images) || []).map((u: string, i: number) => (
                    <div key={i} className="h-40 w-full overflow-hidden rounded-md bg-gray-100">
                      <img src={u} alt={`${prod.title}-${i}`} className="w-full h-full object-cover" />
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
