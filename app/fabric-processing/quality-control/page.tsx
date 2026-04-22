import Link from 'next/link'
import content from '../../../data/fabric-quality-control.json'
import InquiryButton from '@/components/ui/InquiryButton'

export default function FabricQualityControlPage() {
  const prod: any = content || {}
  const media: any = prod.media || {}
  const paragraphs: string[] = prod.paragraphs || prod.desc || []

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-md overflow-hidden shadow-md">
              {media && media.type === 'video' && media.url ? (
                <video controls src={media.url} className="w-full h-80 object-cover bg-black" />
              ) : media && media.type === 'image' && media.url ? (
                <img src={media.url} alt={prod.title || 'Fabric Quality Control'} className="w-full h-80 object-cover" />
              ) : (
                <div className="w-full h-80 bg-gray-100 flex items-center justify-center text-2xl font-semibold text-gray-500">No media</div>
              )}
            </div>

            <h1 className="mt-6 text-4xl md:text-5xl leading-tight font-semibold text-slate-900">{prod.title || 'Fabric Quality Control'}</h1>
            {prod.subtitle && <p className="text-sm font-medium mt-2" style={{ color: 'rgb(5,3,42)' }}>{prod.subtitle}</p>}

            {paragraphs && paragraphs.length > 0 && (
              <div className="mt-4 text-lg text-slate-700 space-y-4">
                {paragraphs.map((d: any, i: number) => <p key={i}>{d}</p>)}
              </div>
            )}

            {Array.isArray(prod.capabilities) && prod.capabilities.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Key capabilities</h4>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  {prod.capabilities.map((b: string, i: number) => <li key={i}>{b}</li>)}
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
                <p className="text-sm font-medium text-slate-700">Summary</p>
                <p className="text-sm" style={{ color: 'rgb(5,3,42)' }}>{prod.summary || '—'}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-700">Media</h4>
                <div className="mt-2">
                  {media && media.url ? (
                    media.type === 'video' ? (
                      <video controls src={media.url} className="w-full h-40 object-cover rounded-md bg-black" />
                    ) : (
                      <img src={media.url} alt="media" className="w-full h-40 object-cover rounded-md" />
                    )
                  ) : (
                    <div className="h-40 w-full overflow-hidden rounded-md bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-500">No media</div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
