"use client"

import Link from 'next/link'
import { useMemo, useState } from 'react'
import content from '@/data/content.json'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function ProductsPage() {
  const products = Array.isArray(content.products) ? content.products : []
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [mobileCategoryQuery, setMobileCategoryQuery] = useState('')

  const categories = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p: any) => {
      const c = p.category || p.subtitle
      if (c) set.add(c)
    })
    return Array.from(set)
  }, [products])

  const filtered = useMemo(() => {
    return products.filter((p: any) => {
      const matchesQuery = query.trim() === '' || p.title.toLowerCase().includes(query.toLowerCase()) || (p.desc || '').toLowerCase().includes(query.toLowerCase())
      const matchesCategory = !selectedCategory || p.subtitle === selectedCategory
      return matchesQuery && matchesCategory
    })
  }, [products, query, selectedCategory])

  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* Hero — matches home page style */}
      <section
        className="relative flex flex-col overflow-hidden px-4 md:px-12 lg:px-24 bg-gradient-to-tr from-[#02879F] to-[#02E3DF] h-[50vh] sm:h-[50vh]"
      >
        <div className="flex-1 flex items-center w-full">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 px-4 lg:px-8 text-left">
              <p className="text-base sm:text-lg md:text-xl text-white/90 tracking-wide">{(content.productsHero && content.productsHero.subtitle) || content.hero.subtitle}</p>

              <h1 className="mt-3 text-3xl sm:text-4xl md:text-[44px] lg:text-[44px] leading-tight tracking-tight text-white font-extrabold">
                {(content.productsHero && content.productsHero.title) || 'Fabric Defect Detection Hardware'}
              </h1>

              <p className="mt-4 sm:mt-6 max-w-2xl text-white text-sm sm:text-base md:text-lg leading-relaxed">
                {(content.productsHero && content.productsHero.description) || 'High-speed textile inspection hardware for accurate defect detection, reduced waste, and consistent fabric quality.'}
              </p>

              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 items-center">
                <Link href={(content.productsHero && content.productsHero.secondaryCtaHref) || '/contact'} className="inline-block bg-white text-slate-900 px-6 sm:px-8 py-2.5 rounded shadow-sm font-medium">{(content.productsHero && content.productsHero.secondaryCtaLabel) || 'Contact Us'}</Link>
              </div>
            </div>
          </div>
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
                <button onClick={() => { setSelectedCategory(null); setMobileFilterOpen(false); setMobileCategoryQuery('') }} className={`text-left w-full px-3 py-2 rounded ${selectedCategory === null ? 'bg-[#02879F] text-white' : 'bg-white text-slate-700'}`}>All</button>
                {categories.filter(c => c.toLowerCase().includes(mobileCategoryQuery.toLowerCase())).map((c) => (
                  <button key={c} onClick={() => { setSelectedCategory(c); setMobileFilterOpen(false); setMobileCategoryQuery('') }} className={`text-left w-full px-3 py-2 rounded ${selectedCategory === c ? 'bg-[#02879F] text-white' : 'bg-white text-slate-700'}`}>{c}</button>
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
                  <button onClick={() => setSelectedCategory(null)} className={`block text-left w-full px-3 py-2 rounded ${selectedCategory === null ? 'bg-[#02879F] text-white' : 'bg-white text-slate-700'}`}>All</button>
                  {categories.map((c) => (
                    <button key={c} onClick={() => setSelectedCategory(c)} className={`block text-left w-full px-3 py-2 rounded ${selectedCategory === c ? 'bg-[#02879F] text-white' : 'bg-white text-slate-700'}`}>{c}</button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p: any) => {
                const slug = slugify(p.title)
                return (
                  <div key={slug} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col border border-gray-200">
                    <div className="h-48 bg-gray-100 overflow-hidden">
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <p className="text-sm text-teal-700 font-medium uppercase">{p.subtitle}</p>
                      <h3 className="mt-2 text-lg font-bold text-slate-900">{p.title}</h3>
                      <p className="mt-2 text-sm text-slate-700 flex-1">{p.desc && p.desc.length > 120 ? `${p.desc.slice(0, 120)}...` : p.desc}</p>
                      <div className="mt-4">
                        <Link href={`/products/${encodeURIComponent(slug)}`} className="inline-block bg-gradient-to-tr from-[#02879F] to-[#02E3DF] text-white px-4 py-2 rounded">Read more</Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
