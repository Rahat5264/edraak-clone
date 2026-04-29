import content from '@/data/content.json'
import ProductDetailClient from './ProductDetailClient'

const SITE_URL = 'https://www.edraaksystems.com'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function getMetaDescription(prod: any) {
  if (!prod) return ''
  const candidate = prod.summary || prod.desc
  if (typeof candidate === 'string' && candidate.trim()) {
    const cleaned = candidate.replace(/\s+/g, ' ').trim()
    return cleaned.length > 160 ? `${cleaned.slice(0, 157).trim()}...` : cleaned
  }
  if (Array.isArray(prod.pageContent)) {
    const parts: string[] = []
    prod.pageContent.forEach((c: any) => {
      if (typeof c.text === 'string') parts.push(c.text)
      else if (Array.isArray(c.text)) {
        parts.push(...c.text.map((seg: any) => (seg.type === 'link' ? seg.label : (seg.text || ''))))
      }
    })
    const text = parts.join(' ')
    const cleaned = text.replace(/\s+/g, ' ').trim()
    return cleaned.length > 160 ? `${cleaned.slice(0, 157).trim()}...` : cleaned
  }
  return ''
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const products = Array.isArray(content.products) ? content.products : []
    const prod = products.find((p: any) => slugify(p.title) === params.slug)
    return {
      title: prod?.title || 'Product',
      description: getMetaDescription(prod),
      openGraph: {
        title: prod?.title || 'Product',
        description: getMetaDescription(prod),
        url: `${SITE_URL}/products/${params.slug}`,
      },
      twitter: { card: 'summary_large_image', title: prod?.title || 'Product', description: getMetaDescription(prod) },
      alternates: { canonical: `${SITE_URL}/products/${params.slug}` },
    }
  } catch (e) {
    return { title: 'Product', description: '' }
  }
}

export default function ProductPage() {
  return <ProductDetailClient />
}
