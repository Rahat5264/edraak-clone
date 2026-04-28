import Link from 'next/link'
import InquiryButton from '@/components/ui/InquiryButton'
import content from '@/data/content.json'
import QuickLinks from '@/components/sections/QuickLinks'

const techRobotics: any = (content.technology?.items || []).find((t: any) => (t.title || '').toString().toLowerCase() === 'robotics') || {}

const prod: any = {
  title: techRobotics.title || 'Robotics',
  subtitle: 'Robotics in Textile Industry',
  summary: 'Robotic systems enable precise marking and removal of defective areas, reducing manual intervention, improving accuracy, and ensuring seamless integration with inspection and cutting processes for higher operational efficiency.',
  need: [
    'Robotic arms with appropriate end-effectors for marking/removal',
    'High-speed cameras and AI-based vision algorithms',
    'Label applicators and barcode scanners',
    'Integration with MES/production tracking and cutting systems',
    'Safety systems and machine guarding'
  ],
  existingProcess: `In many production lines defect detection and marking are handled manually or with semi-automated tools. Operators visually inspect rolls, apply tags or marks by hand, and sort fabric for rework. This approach is slow, inconsistent across shifts, and often misses defects or applies labels inaccurately, increasing fabric waste and breaking traceability between inspection and cutting processes.`,
  proposedProcess: `Robotic systems combined with machine vision detect defects and precisely mark or remove defective areas in real time. Robots can apply automated labels, read barcodes, and perform pick-and-place removal of faulty patches without slowing down the line. When integrated with inspection and cutting systems, robotics enable dynamic exclusion of defective zones from cutting plans, tighten traceability by updating MES at the point of inspection, and reduce human error. The outcome is lower material waste, faster throughput, and more consistent quality control.`,
  img: techRobotics.image || 'https://db.edraaksystems.com/wp-content/uploads/2026/03/d393d14be34baf192609b2e7c5487a7ba973a078.png',
  images: techRobotics.image ? [techRobotics.image] : ['https://db.edraaksystems.com/wp-content/uploads/2026/03/d393d14be34baf192609b2e7c5487a7ba973a078.png']
}

export const metadata = {
  title: prod.title,
  description: prod.summary || prod.proposedProcess || 'Robotic integration for marking, removal and automated handling in textile inspection workflows.',
}

export default function RoboticsPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-md overflow-hidden shadow-md">
              <img src={(prod.img || (prod.images && prod.images[0]) || '')} alt={prod.title} className="w-full h-80 object-cover" />
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
                  {(((prod.images && Array.isArray(prod.images) && prod.images) || []).length > 0 ? (
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

const SITE_URL = 'https://www.edraaksystems.com'

export async function generateMetadata() {
  const title = `${prod.title} | Edraak Systems`
  const description = prod.summary || prod.proposedProcess || 'Robotics and automation solutions for textile production.'
  return { title, description, openGraph: { title, description, url: `${SITE_URL}/robotics` }, alternates: { canonical: `${SITE_URL}/robotics` } }
}
