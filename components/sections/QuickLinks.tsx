import Link from 'next/link'
import content from '@/data/content.json'

function slugify(s: string) {
  return (s || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function QuickLinks({ heading = 'Quick Links', maxItems }: { heading?: string, maxItems?: number }) {
  const products = Array.isArray(content.products) ? content.products : []
  const list = (typeof maxItems === 'number') ? products.slice(0, maxItems) : products

  return (
    <div>
      <h4 className="text-lg font-semibold mb-3">{heading}</h4>
      <ul className="space-y-2 text-sm">
        {list.map((p: any, i: number) => (
          <li key={i}>
            <Link href={`/products/${slugify((p.title || '').toString())}`} className="text-[var(--site-header-bg)] hover:underline">{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
