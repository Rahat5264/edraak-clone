"use client"

import Link from 'next/link'
import { useMemo, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import content from '@/data/content.json'
import InquiryButton from '@/components/ui/InquiryButton'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

/* ✅ ONLY THESE PRODUCTS WILL BE HIDDEN */
const HIDDEN_PRODUCTS = [
  "On Loom Inspection",
  "Weft Straightener",
  "In-Line Moisture Meter"
]

export default function ProductsClient() {
  /* ✅ APPLY FILTER HERE ONLY (DO NOT TOUCH ANY UI LOGIC) */
  const products = useMemo(() => {
    return (Array.isArray(content.products) ? content.products : [])
      .filter((p: any) => !HIDDEN_PRODUCTS.includes(p.title))
  }, [])

  const router = useRouter()

  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    try {
      const fromStorage =
        typeof window !== 'undefined'
          ? sessionStorage.getItem('products:selectedCategory')
          : null
      return fromStorage
    } catch (e) {
      return null
    }
  })

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [mobileCategoryQuery, setMobileCategoryQuery] = useState('')
  const [transitioning, setTransitioning] = useState(false)

  /* categories stay EXACT SAME */
  const categories = useMemo(() => {
    const set = new Set<string>()
    products.forEach((p: any) => {
      const c = p.category || p.subtitle
      if (c) set.add(c)
    })

    let arr = Array.from(set)

    try {
      const order = Array.isArray(content.productCategoriesOrder)
        ? content.productCategoriesOrder
        : null

      if (order && order.length > 0) {
        arr = order.filter(o => arr.includes(o)).concat(arr.filter(a => !order.includes(a)))
      }
    } catch (e) {}

    return arr
  }, [products])

  const filtered = useMemo(() => {
    return products.filter((p: any) => {
      const matchesQuery =
        query.trim() === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        (p.desc || '').toLowerCase().includes(query.toLowerCase())

      const matchesCategory =
        !selectedCategory ||
        (p.category && p.category === selectedCategory) ||
        p.subtitle === selectedCategory

      return matchesQuery && matchesCategory
    })
  }, [products, query, selectedCategory])

  const changeCategory = (cat: string | null) => {
    setTransitioning(true)
    window.setTimeout(() => {
      setSelectedCategory(cat)
      window.setTimeout(() => setTransitioning(false), 200)
    }, 200)
  }

  useEffect(() => {
    if (query === undefined) return
    setTransitioning(true)
    const t1 = window.setTimeout(() => {
      const t2 = window.setTimeout(() => setTransitioning(false), 200)
      return () => clearTimeout(t2)
    }, 200)
    return () => clearTimeout(t1)
  }, [query])

  useEffect(() => {
    const readCategoryFromUrl = () => {
      try {
        const params =
          typeof window !== 'undefined'
            ? new URLSearchParams(window.location.search)
            : null
        const cat = params ? params.get('category') : null
        if (cat !== selectedCategory) setSelectedCategory(cat)
      } catch (e) {}
    }

    readCategoryFromUrl()

    const onPop = () => readCategoryFromUrl()
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      if (selectedCategory)
        sessionStorage.setItem('products:selectedCategory', selectedCategory)
      else sessionStorage.removeItem('products:selectedCategory')
    } catch (e) {}
  }, [selectedCategory])

  useEffect(() => {
    try {
      if (selectedCategory) {
        router.push(`/products?category=${encodeURIComponent(selectedCategory)}`)
      } else {
        router.push(`/products`)
      }
    } catch (e) {}
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-white text-foreground">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            {content.productsHero?.title || 'Our Products'}
          </h1>
          <p className="mt-4 text-base text-black max-w-3xl">
            {content.productsHero?.description ||
              'Explore our range of hardware and modules designed to improve inspection accuracy, throughput, and quality control.'}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* MOBILE FILTER */}
        <div className="block sm:hidden mb-4 -mx-4 px-4">
          <div className="flex items-center justify-start">
            <button
              onClick={() => setMobileFilterOpen(v => !v)}
              className="inline-flex items-center gap-2 px-3 py-2 bg-white rounded shadow text-sm"
            >
              <span>{selectedCategory || 'Filter'}</span>
            </button>
          </div>

          {mobileFilterOpen && (
            <div className="mt-3 bg-white rounded shadow p-3">
              <button
                onClick={() => changeCategory(null)}
                className="w-full text-left px-3 py-2"
              >
                All
              </button>

              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => changeCategory(c)}
                  className="w-full text-left px-3 py-2"
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* SIDEBAR (UNCHANGED) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products"
                className="w-full rounded border px-3 py-2"
              />

              <div>
                <p className="text-sm font-medium mb-2">Category</p>

                <button
                  onClick={() => changeCategory(null)}
                  className="block w-full text-left px-3 py-2"
                  style={{
                    borderRadius: 0,
                    ...(selectedCategory === null
                      ? { backgroundColor: 'rgb(5,3,42)', color: '#fff' }
                      : {})
                  }}
                >
                  All
                </button>

                {categories.map(c => (
                  <button
                    key={c}
                    onClick={() => changeCategory(c)}
                    className="block w-full text-left px-3 py-2"
                    style={{
                      borderRadius: 0,
                      ...(selectedCategory === c
                        ? { backgroundColor: 'rgb(5,3,42)', color: '#fff' }
                        : {})
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCTS GRID (ONLY DATA FILTERED) */}
          <div className="lg:col-span-9">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              style={{
                opacity: transitioning ? 0 : 1,
                transform: transitioning ? 'translateY(6px)' : 'translateY(0)'
              }}
            >
              {filtered.map((p: any) => {
                const slug = slugify(p.title)

                return (
                  <div key={slug} className="bg-white border flex flex-col">
                    <div className="h-56 bg-gray-100">
                      {p.img ? (
                        <img src={p.img} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full" />
                      )}
                    </div>

                    <div
                      className="p-6 flex-1 flex flex-col justify-between"
                      style={{ backgroundColor: '#05032A' }}
                    >
                      <div>
                        <h3 className="text-xl font-bold text-white">{p.title}</h3>
                        <p className="mt-3 text-sm text-slate-200">
                          {p.desc?.slice(0, 140)}
                        </p>
                      </div>

                      <div className="mt-6 flex gap-4">
                        <Link
                          href={`/products/${slug}`}
                          className="px-4 py-2 bg-white text-black"
                        >
                          Read more
                        </Link>
                        <InquiryButton product={p} className="px-4 py-2 bg-white text-black" />
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