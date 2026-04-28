import Link from 'next/link'
import content from '@/data/content.json'
import InquiryButton from '@/components/ui/InquiryButton'
import QuickLinks from '@/components/sections/QuickLinks'

const findProduct = () => {
  try {
    const products = Array.isArray((content as any).products) ? (content as any).products : []
    return products.find((p: any) => (p && p.title && p.title.toString().toLowerCase() === 'highspeed barcode + seam sensor')) || null
  } catch (e) {
    return null
  }
}

const prodData = findProduct()

const prod = prodData || {
  title: 'Highspeed Barcode + Seam Sensor',
  subtitle: 'Traceability System',
  summary: 'Combined inline barcode reader and optical seam sensor for precise roll metering and traceability.',
  desc: 'Highspeed inline barcode reader coupled with an optical seam sensor, synchronized to encoders for accurate position tagging and reliable roll identification.',
  bullets: [
    'Inline seam detection with encoder sync',
    'High-speed barcode/QR reading',
    'Automatic association of seam events to roll IDs',
    'Supports automated labeling and batching workflows'
  ],
  img: 'https://db.edraaksystems.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-14-at-4.45.06-PM.jpeg',
  images: ['https://db.edraaksystems.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-14-at-4.45.06-PM.jpeg']
}

const SITE_URL = 'https://www.edraaksystems.com'

function getMetaDescription(prod: any) {
  if (!prod) return ''
  const candidate = prod.summary || prod.desc
  if (typeof candidate === 'string' && candidate.trim()) {
    const cleaned = candidate.replace(/\s+/g, ' ').trim()
    return cleaned.length > 160 ? `${cleaned.slice(0, 157).trim()}...` : cleaned
  }
  if (Array.isArray(prod.pageContent)) {
    const text = prod.pageContent.map((c: any) => (typeof c.text === 'string' ? c.text : '')).filter(Boolean).join(' ')
    const cleaned = text.replace(/\s+/g, ' ').trim()
    return cleaned.length > 160 ? `${cleaned.slice(0, 157).trim()}...` : cleaned
  }
  return ''
}

export const metadata = {
  title: prod?.title || 'Highspeed Barcode + Seam Sensor',
  description: getMetaDescription(prod),
  openGraph: {
    title: prod?.title || 'Highspeed Barcode + Seam Sensor',
    description: getMetaDescription(prod),
    url: `${SITE_URL}/products/highspeed-barcode-seam-sensor`,
  },
  twitter: { card: 'summary_large_image', title: prod?.title || 'Highspeed Barcode + Seam Sensor', description: getMetaDescription(prod) },
  alternates: { canonical: `${SITE_URL}/products/highspeed-barcode-seam-sensor` },
}

export default function HighspeedBarcodePage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">

            <div id="product-left-column">
              <div id="product-left-column-inner" className='overflow-visible'>
                <div className="rounded-md overflow-hidden shadow-md">
                  {prod.img ? (
                    <img src={prod.img} alt={prod.title} className="w-full h-80 object-cover" />
                  ) : (
                    <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-gray-500">Image</div>
                  )}
                </div>

                <h1 className="mt-6 text-4xl md:text-5xl leading-tight font-semibold text-slate-900">{prod.title}</h1>
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
                  <Link href="/products" className="inline-block px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }}>Back</Link>
                  <InquiryButton product={prod} className="inline-block px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }} />
                </div>
            </div>
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
