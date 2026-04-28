import content from '@/data/content.json'
import Link from 'next/link'
import QuickLinks from '@/components/sections/QuickLinks'

const prod = (Array.isArray(content.products) ? content.products : []).find(p => p.title === 'RFID Tracking Unit')

export const metadata = {
  title: prod?.title || 'RFID Tracking Unit',
  description: '',
}

export default function RfidPage() {
  if (!prod) return <div className="p-8">Product not found</div>

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-md overflow-hidden shadow-md">
              <img src={prod.img} alt={prod.title} className="w-full h-72 object-cover" />
            </div>

            <h1 className="mt-6 text-[56px] leading-tight tracking-tight font-normal text-slate-900">{prod.title}</h1>
            <p className="text-sm text-[#02879f] font-medium mt-2">{prod.subtitle}</p>
            <p className="mt-4 text-lg text-slate-700">{prod.desc}</p>

            {Array.isArray(prod.bullets) && prod.bullets.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Key points</h4>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  {prod.bullets.map((b: string) => <li key={b}>{b}</li>)}
                </ul>
              </div>
            )}

            <div className="mt-6">
              <Link href="/products" className="inline-block bg-gradient-to-tr from-[#02879F] to-[#02E3DF] text-white px-4 py-2 rounded">Back</Link>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-slate-700">Gallery</h4>
              <div className="grid grid-cols-3 gap-2">
                {((prod.images && Array.isArray(prod.images) && prod.images) || []).length > 0 ? (
                  prod.images?.map((u: string, i: number) => (
                    <div key={i} className="h-20 w-full overflow-hidden rounded-md bg-gray-100">
                      <img src={u} alt={`${prod.title}-${i}`} className="w-full h-full object-cover" />
                    </div>
                  ))
                ) : (
                  <div className="h-20 w-full overflow-hidden rounded-md bg-gray-100">
                    <img src={prod.img} alt={prod.title} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              </div>
              <div className="sticky top-24"><QuickLinks /></div>
            </aside>
        </div>
      </div>
    </div>
  )
}
