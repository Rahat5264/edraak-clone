"use client"

import React, { useEffect, useState } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import InquiryButton from '@/components/ui/InquiryButton'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ProductDetailClient() {
  const pathname = usePathname() || ''
  const parts = pathname.split('/').filter(Boolean)
  const slug = parts[parts.length - 1] || ''

  const [content, setContent] = useState<any | null>(null)
  const [prod, setProd] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const [backCategory, setBackCategory] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetch('/api/content')
      .then(r => r.json())
      .then(c => {
        if (!mounted) return
        setContent(c)
        const products = Array.isArray(c.products) ? c.products : []
        const found = products.find((p: any) => {
          const s = slugify(p.title || '')
          if (!slug) return false
          if (s === slug) return true
          if ((p.title || '').toString().toLowerCase() === decodeURIComponent(slug || '').toLowerCase()) return true
          return false
        })
        setProd(found || null)
      })
      .catch(() => { if (mounted) setContent(null) })
      .finally(() => { if (mounted) setLoading(false) })
    return () => { mounted = false }
  }, [slug])

  // determine a category to use for the Back link: prefer URL param, fallback to sessionStorage
  useEffect(() => {
    try {
      const catFromUrl = searchParams?.get('category') ?? null
      if (catFromUrl) {
        setBackCategory(catFromUrl)
        return
      }
      if (typeof window !== 'undefined') {
        const catFromStorage = sessionStorage.getItem('products:selectedCategory')
        if (catFromStorage) setBackCategory(catFromStorage)
      }
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  if (loading) return <div className="p-8">Loading…</div>
  if (!content) return <div className="p-8">Could not load content</div>
  if (!prod) {
    const available = (Array.isArray(content.products) ? content.products : []).map((p: any) => slugify(p.title || ''))
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold mb-2">Product not found</h2>
        <p className="mb-2">Requested slug: <strong>{slug || '(empty)'}</strong></p>
        <p className="mb-2">Decoded slug: <strong>{(() => { try { return decodeURIComponent(slug || '') } catch (e) { return '(decode error)' } })()}</strong></p>
        <p className="mb-2">Available product slugs:</p>
        <ul className="list-disc pl-6">
          {available.map(s => <li key={s}><code>{s}</code></li>)}
        </ul>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
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
            ) : (prod.desc && (
              <div className="mt-4 text-lg text-slate-700 space-y-4">
                {typeof prod.desc === 'string' ? <p>{prod.desc}</p> : (Array.isArray(prod.desc) ? prod.desc.map((d: string, i: number) => <p key={i}>{d}</p>) : null)}
              </div>
            ))}

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

            {Array.isArray(prod.advantages) && prod.advantages.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Advantages</h4>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  {prod.advantages.map((a: string, i: number) => <li key={i}>{a}</li>)}
                </ul>
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

            {Array.isArray(prod.modules) && prod.modules.length > 0 && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">Modules</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prod.modules.map((m: string, i: number) => (
                    <div key={i} className="p-3 border bg-slate-50" style={{ borderRadius: 0 }}>
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-3">
              <Link href={backCategory ? `/products?category=${encodeURIComponent(backCategory)}` : '/products'} className="inline-block px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }}>Back</Link>
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

              <div>
                <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  {Array.isArray(content.products) ? content.products.map((p: any, i: number) => (
                    <li key={i}>
                      <Link href={`/products/${slugify((p.title || '').toString())}`} className="text-[var(--site-header-bg)] hover:underline">{p.title}</Link>
                    </li>
                  )) : null}
                </ul>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
