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

function getSchemaFeatureList(prod: any) {
  const source = Array.isArray(prod?.schema?.featureList) && prod.schema.featureList.length
    ? prod.schema.featureList
    : Array.isArray(prod?.features) && prod.features.length
      ? prod.features
      : Array.isArray(prod?.bullets) && prod.bullets.length
        ? prod.bullets
        : []

  return source.filter((item: any) => typeof item === 'string' && item.trim())
}

function getSchemaType(prod: any) {
  if (typeof prod?.schema?.type === 'string' && prod.schema.type.trim() === 'SoftwareApplication') {
    return 'SoftwareApplication'
  }

  return 'SoftwareApplication'
}

function generateProductSchema(prod: any, slug: string) {
  if (!prod) return null

  const schemaType = getSchemaType(prod)
  const featureList = getSchemaFeatureList(prod)

  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: prod.title,
    description: getMetaDescription(prod) || prod.title,
    url: `${SITE_URL}/products/${slug}`,
    image: prod.img || (prod.images && prod.images[0]) || '',
    provider: {
      '@type': 'Organization',
      name: 'Edraak Systems',
      url: SITE_URL,
    },
  }

  if (schemaType === 'SoftwareApplication') {
    schema.applicationCategory = prod?.schema?.applicationCategory || prod.subtitle || prod.category || 'Industrial Automation Software'
    schema.operatingSystem = prod?.schema?.operatingSystem || 'Industrial IoT / Machine Vision Systems'
    if (featureList.length) {
      schema.featureList = featureList
    }
  } else {
    schema.category = prod?.schema?.category || prod.subtitle || prod.category || 'Industrial product'
    if (featureList.length) {
      schema.additionalProperty = featureList.slice(0, 6).map((feature: string) => ({
        '@type': 'PropertyValue',
        name: 'Capability',
        value: feature,
      }))
    }
  }

  // Add a B2B-style Offer that indicates customers should request a quote.
  // This keeps a simple standardized offers block while avoiding merchant-specific pricing details.
  schema['offers'] = {
    '@type': 'Offer',
    price: 'Request a quote',
    priceCurrency: 'USD',
    priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    availability: 'https://schema.org/InStock',
    url: `${SITE_URL}/products/${slug}`,
    seller: {
      '@type': 'Organization',
      name: 'Edraak Systems',
      url: SITE_URL,
    },
  }

  return schema
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const products = Array.isArray(content.products) ? content.products : []
    const prod = products.find((p: any) => slugify(p.title) === slug)
    return {
      title: prod?.title || 'Product',
      description: getMetaDescription(prod),
      openGraph: {
        title: prod?.title || 'Product',
        description: getMetaDescription(prod),
        url: `${SITE_URL}/products/${slug}`,
      },
      twitter: { card: 'summary_large_image', title: prod?.title || 'Product', description: getMetaDescription(prod) },
      alternates: { canonical: `${SITE_URL}/products/${slug}` },
    }
  } catch (e) {
    return { title: 'Product', description: '' }
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  let productSchema = null
  const { slug } = await params
  try {
    const products = Array.isArray(content.products) ? content.products : []
    const prod = products.find((p: any) => slugify(p.title) === slug)
    if (prod) {
      productSchema = generateProductSchema(prod, slug)
    }
  } catch (e) {
    console.error('Schema generation error:', e)
  }

  return (
    <>
      {productSchema && (
        <Script
          id={`product-schema-${slug}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
      <ProductDetailClient />
    </>
  )
}
