
"use client"
export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import content from '@/data/content.json'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ProductsPage() {
  const products = Array.isArray(content.products) ? content.products : []
  const router = useRouter()

  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    try {
      const fromStorage = typeof window !== 'undefined' ? sessionStorage.getItem('products:selectedCategory') : null
      return fromStorage
    } catch (e) {
      return null
    }
  })
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [mobileCategoryQuery, setMobileCategoryQuery] = useState('')
  const [transitioning, setTransitioning] = useState(false)

  const categories = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p: any) => {
      const c = p.category || p.subtitle
      if (c) set.add(c)
    })
    let arr = Array.from(set)
    // if content defines an order, sort by that order
    try {
      const order = Array.isArray(content.productCategoriesOrder) ? content.productCategoriesOrder : null
      if (order && order.length > 0) {
        arr = order.filter(o => arr.includes(o)).concat(arr.filter(a => !order.includes(a)))
      }
    } catch (e) {
      // ignore
    }
    return arr
  }, [products])

  const filtered = useMemo(() => {
    return products.filter((p: any) => {
      const matchesQuery = query.trim() === '' || p.title.toLowerCase().includes(query.toLowerCase()) || (p.desc || '').toLowerCase().includes(query.toLowerCase())
      const matchesCategory = !selectedCategory || (p.category && p.category === selectedCategory) || p.subtitle === selectedCategory
      return matchesQuery && matchesCategory
    })
  }, [products, query, selectedCategory])

  // smooth UI transition when switching categories or query
  const changeCategory = (cat: string | null) => {
    // fade out, switch category, then fade in
    setTransitioning(true)
    window.setTimeout(() => {
      setSelectedCategory(cat)
      // allow DOM to update before fading in
      window.setTimeout(() => setTransitioning(false), 200)
    }, 200)
  }

  useEffect(() => {
    // when query changes, do the same fade-out / fade-in sequence
    if (query === undefined) return
    setTransitioning(true)
    const t1 = window.setTimeout(() => {
      const t2 = window.setTimeout(() => setTransitioning(false), 200)
      // cleanup inner timeout if needed
      return () => clearTimeout(t2)
    }, 200)
    return () => clearTimeout(t1)
  }, [query])

  // Inquiry modal state
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [inquiryProduct, setInquiryProduct] = useState<any>(null)
  const [inquiryForm, setInquiryForm] = useState({ name: '', address: '', company: '', message: '', product: '' })

  const openInquiry = (p: any) => {
    setInquiryProduct(p)
    setInquiryForm({ name: '', address: '', company: '', message: '', product: p.title || '' })
    setInquiryOpen(true)
  }

  const closeInquiry = () => {
    setInquiryOpen(false)
    setInquiryProduct(null)
  }

  const submitInquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiryForm)
      })

      if (res.ok) {
        // simple success feedback
        closeInquiry()
        // eslint-disable-next-line no-alert
        alert('Inquiry sent — we will contact you soon.')
      } else {
        const data = await res.json()
        // eslint-disable-next-line no-alert
        alert('Failed to send inquiry: ' + (data?.error || res.statusText))
      }
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert('Network error while sending inquiry')
    }
  }

  // Load more / pagination
  const BATCH_SIZE = 6
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)

  useEffect(() => {
    // reset visible count when query or category changes
    setVisibleCount(BATCH_SIZE)
  }, [query, selectedCategory])

  // keep selectedCategory in sync with URL search param (back/forward support)
  // sync selectedCategory with URL params on mount and on back/forward
  useEffect(() => {
    const readCategoryFromUrl = () => {
      try {
        const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
        const cat = params ? params.get('category') : null
        if (cat !== selectedCategory) setSelectedCategory(cat)
      } catch (e) {
        // ignore
      }
    }
    readCategoryFromUrl()
    const onPop = () => readCategoryFromUrl()
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // persist selection to sessionStorage as a fallback for mobile navigation/back behavior
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      if (selectedCategory) sessionStorage.setItem('products:selectedCategory', selectedCategory)
      else sessionStorage.removeItem('products:selectedCategory')
    } catch (e) {
      // ignore storage errors
    }
  }, [selectedCategory])

  // update URL when category changes so navigation back returns to same filter
  useEffect(() => {
    try {
      if (selectedCategory) {
        router.push(`/products?category=${encodeURIComponent(selectedCategory)}`)
      } else {
        router.push(`/products`)
      }
    } catch (e) {
      // ignore router errors
    }
    // we only want to run this when selectedCategory changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Simple heading + text (no hero) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">{(content.productsHero && content.productsHero.title) || 'Our Products'}</h1>
          <p className="mt-4 text-base text-black max-w-3xl">{(content.productsHero && content.productsHero.description) || 'Explore our range of hardware and modules designed to improve inspection accuracy, throughput, and quality control.'}</p>
        </div>
      </section>

      {/* Products list with left filter and right grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mobile filter: show icon that opens category panel */}
        <div className="block sm:hidden mb-4 -mx-4 px-4">
          <div className="flex items-center justify-start">
            <button
              onClick={() => setMobileFilterOpen(v => !v)}
              aria-expanded={mobileFilterOpen}
              className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded shadow text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 12.414V17a1 1 0 01-1.447.894L7 15H4a1 1 0 01-1-1V5z" clipRule="evenodd" />
              </svg>
              <span className="text-slate-700">{selectedCategory || 'Filter'}</span>
              {selectedCategory && <span className="ml-2 text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">Active</span>}
            </button>
          </div>

          {mobileFilterOpen && (
            <div className="mt-3 bg-white rounded shadow p-3 max-h-56 overflow-y-auto w-full">
              <div className="mb-3">
                <label className="sr-only">Search categories</label>
                <div className="relative">
                  <input
                    value={mobileCategoryQuery}
                    onChange={e => setMobileCategoryQuery(e.target.value)}
                    placeholder="Search categories..."
                    className="w-full rounded border px-3 py-2 pr-8"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute right-2 top-2.5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l3.387 3.386-1.414 1.415-3.387-3.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => { changeCategory(null); setMobileFilterOpen(false); setMobileCategoryQuery('') }}
                  className="text-left w-full px-3 py-2"
                  style={{ borderRadius: 0, ...(selectedCategory === null ? { backgroundColor: 'rgb(5,3,42)', color: '#fff' } : {}) }}
                >All</button>
                {categories.filter(c => c.toLowerCase().includes(mobileCategoryQuery.toLowerCase())).map((c) => (
                  <button
                    key={c}
                    onClick={() => { changeCategory(c); setMobileFilterOpen(false); setMobileCategoryQuery('') }}
                    className="text-left w-full px-3 py-2"
                    style={{ borderRadius: 0, ...(selectedCategory === c ? { backgroundColor: 'rgb(5,3,42)', color: '#fff' } : {}) }}
                  >{c}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <aside className="hidden lg:block lg:col-span-3">
                  <div className="sticky top-24 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products" className="w-full rounded border px-3 py-2" />
              </div>

              <div>
                <p className="text-sm font-medium text-slate-700 mb-2">Category</p>
                <div className="space-y-2">
                  <button onClick={() => changeCategory(null)} className="block text-left w-full px-3 py-2" style={{ borderRadius: 0, ...(selectedCategory === null ? { backgroundColor: 'rgb(5,3,42)', color: '#fff' } : {}) }}>All</button>
                  {categories.map((c) => (
                    <button key={c} onClick={() => changeCategory(c)} className="block text-left w-full px-3 py-2" style={{ borderRadius: 0, ...(selectedCategory === c ? { backgroundColor: 'rgb(5,3,42)', color: '#fff' } : {}) }}>{c}</button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch" style={{ transition: 'opacity 160ms ease, transform 160ms ease', opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateY(6px)' : 'translateY(0)', willChange: 'opacity, transform' }}>
              {(selectedCategory ? filtered : filtered.slice(0, visibleCount)).map((p: any, idx: number) => {
                const slug = slugify(p.title)
                return (
                  <div key={slug} className="bg-white overflow-hidden shadow-sm border border-gray-200 flex flex-col h-full">
                    <div className="h-56 bg-gray-100 overflow-hidden flex-shrink-0">
                      {p.img ? (
                        <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between" style={{backgroundColor: '#05032A'}}>
                      <div>
                        <h3 className="text-xl font-bold text-white">{p.title}</h3>
                        <p className="mt-3 text-sm text-slate-200">{p.desc && p.desc.length > 140 ? `${p.desc.slice(0, 140)}...` : p.desc}</p>
                      </div>

                        <div className="mt-6 flex items-center gap-4">
                          <Link href={selectedCategory ? `/products/${slug}?category=${encodeURIComponent(selectedCategory)}` : `/products/${slug}`} className="px-4 py-2" style={{backgroundColor: '#ffffff', color: '#000000', textDecoration: 'none', border: '1px solid rgba(0,0,0,0.08)'}}>Read more</Link>
                        <button onClick={() => openInquiry(p)} className="px-4 py-2" style={{backgroundColor: '#ffffff', color: '#000000', border: '1px solid rgba(0,0,0,0.08)'}}>Inquiry</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Load more */}
            {!selectedCategory && filtered.length > visibleCount && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setVisibleCount(v => v + BATCH_SIZE)}
                  className="px-6 py-2 text-white"
                  style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }}
                >
                  Load more
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {inquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeInquiry} />
          <div className="bg-white w-full max-w-lg mx-4 rounded-md z-60 p-6">
            <h3 className="text-xl font-bold mb-4">Product Inquiry</h3>
            <form onSubmit={submitInquiry} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product</label>
                <select value={inquiryForm.product} onChange={e => setInquiryForm(f => ({ ...f, product: e.target.value }))} className="w-full border px-3 py-2 bg-white">
                  {products.map((pp: any) => (
                    <option key={pp.title} value={pp.title}>{pp.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input value={inquiryForm.name} onChange={e => setInquiryForm(f => ({ ...f, name: e.target.value }))} className="w-full rounded border px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input value={inquiryForm.address} onChange={e => setInquiryForm(f => ({ ...f, address: e.target.value }))} className="w-full rounded border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <input value={inquiryForm.company} onChange={e => setInquiryForm(f => ({ ...f, company: e.target.value }))} className="w-full rounded border px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea value={inquiryForm.message} onChange={e => setInquiryForm(f => ({ ...f, message: e.target.value }))} className="w-full rounded border px-3 py-2" rows={4} />
              </div>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={closeInquiry} className="px-4 py-2 border" style={{borderRadius:0}}>Cancel</button>
                <button type="submit" className="px-4 py-2 text-white" style={{backgroundColor: 'rgb(5,3,42)', borderRadius:0}}>Send Inquiry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
