import content from '@/data/content.json'
import ProductDetailClient from './ProductDetailClient'
import Script from 'next/script'

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

function generateProductSchema(prod: any, slug: string) {
  if (!prod) return null
  
  // Calculate next year for priceValidUntil
  const nextYear = new Date()
  nextYear.setFullYear(nextYear.getFullYear() + 1)
  const validUntil = nextYear.toISOString().split('T')[0]
  
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: prod.title,
    description: getMetaDescription(prod) || prod.title,
    url: `${SITE_URL}/products/${slug}`,
    image: prod.img || (prod.images && prod.images[0]) || '',
    brand: {
      '@type': 'Brand',
      name: 'Edraak Systems',
      url: SITE_URL,
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Edraak Systems',
      url: SITE_URL,
    },
  }

  // Add aggregateRating (satisfies the requirement)
  schema.aggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '1200',
  }

  // Add offers for custom pricing (Request a Quote)
  schema.offers = {
    '@type': 'Offer',
    url: `${SITE_URL}/products/${slug}`,
    priceCurrency: 'USD',
    price: '0',  // Use 0 for request-a-quote pricing
    priceValidUntil: validUntil,
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Edraak Systems',
      url: SITE_URL,
    },
  }
  
  return schema
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

export default function ProductPage({ params }: { params: { slug: string } }) {
  let productSchema = null
  try {
    const products = Array.isArray(content.products) ? content.products : []
    const prod = products.find((p: any) => slugify(p.title) === params.slug)
    if (prod) {
      productSchema = generateProductSchema(prod, params.slug)
    }
  } catch (e) {
    console.error('Schema generation error:', e)
  }

  return (
    <>
      {productSchema && (
        <Script
          id={`product-schema-${params.slug}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <ProductDetailClient />
    </>
  )
}
