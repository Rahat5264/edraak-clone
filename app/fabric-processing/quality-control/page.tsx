import Link from 'next/link'
import content from '../../../data/fabric-quality-control.json'
import InquiryButton from '@/components/ui/InquiryButton'
import QuickLinks from '@/components/sections/QuickLinks'

export const metadata = {
  title: content?.title || 'Fabric Quality Control',
  description: Array.isArray(content?.paragraphs) ? content.paragraphs.slice(0,2).join(' ') : (content?.desc || 'Fabric quality control and inspection systems.'),
}

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

            {prod.pageContent && Array.isArray(prod.pageContent) ? (
              <div className="mt-4 text-lg text-slate-700 space-y-6">
                {prod.pageContent.map((item: any, i: number) => {
                  if (!item) return null
                  if (item.type === 'heading') return <h2 key={i} className="text-2xl font-semibold">{item.text}</h2>
                  if (item.type === 'text') return <p key={i}>{item.text}</p>
                  if (item.type === 'image') return (
                    item.src ? (
                      <div key={i} className="w-full">
                        <img src={item.src} alt={item.alt || ''} className="w-full object-cover" />
                      </div>
                    ) : (
                      <div key={i} className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-500">Image placeholder</div>
                    )
                  )
                  return null
                })}
              </div>
            ) : (paragraphs && paragraphs.length > 0 && (
              <div className="mt-4 text-lg text-slate-700 space-y-4">
                {paragraphs.map((d: any, i: number) => <p key={i}>{d}</p>)}
              </div>
            ))}

            <div className="mt-8 flex gap-3">
              <Link href="/products" className="inline-block px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }}>Back</Link>
              <InquiryButton product={prod} className="inline-block px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }} />
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="space-y-4 sticky top-24">
              <QuickLinks />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
