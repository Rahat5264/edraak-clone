import ProductDetailClient from './ProductDetailClient'
import fs from 'fs'
import path from 'path'

const SITE_URL = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.edraaksystems.com').replace(/\/$/, '')

function slugify(s: any) {
  return String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug
  try {
    const file = path.join(process.cwd(), 'data', 'content.json')
    const raw = await fs.promises.readFile(file, 'utf8')
    const content = JSON.parse(raw)
    const products = Array.isArray(content.products) ? content.products : []
    const prod = products.find((p: any) => slugify(p.title) === slug || (p.title || '').toString().toLowerCase() === decodeURIComponent(slug || '').toLowerCase())
    if (!prod) {
      return {
        title: 'Product not found — Edraak Systems',
        description: 'Product not found',
        robots: { index: false, follow: false },
      }
    }

    const title = `${prod.title} | Edraak Systems`
    const description = prod.desc || prod.summary || (prod.pageContent && Array.isArray(prod.pageContent) ? prod.pageContent.find((i: any) => i.type === 'text')?.text : '') || 'Edraak Systems product'
    const keywords = [prod.title, prod.category, prod.subtitle].filter(Boolean).join(', ')
    const image = prod.img || (prod.images && prod.images[0]) || 'https://db.edraaksystems.com/wp-content/uploads/2026/04/images.png'
    const url = `${SITE_URL}/products/${slug}`

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        url,
        images: [
          {
            url: image,
            alt: prod.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
      alternates: { canonical: url }
    }
  } catch (e) {
    return {}
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const file = path.join(process.cwd(), 'data', 'content.json')
  let prod: any = null
  try {
    const raw = await fs.promises.readFile(file, 'utf8')
    const content = JSON.parse(raw)
    const products = Array.isArray(content.products) ? content.products : []
    prod = products.find((p: any) => slugify(p.title) === slug || (p.title || '').toString().toLowerCase() === decodeURIComponent(slug || '').toLowerCase())
  } catch (e) {
    prod = null
  }

  const jsonLd = prod ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: prod.title,
    description: prod.desc || prod.summary || '',
    image: prod.img || (prod.images && prod.images[0]) || [],
    url: `${SITE_URL}/products/${slug}`,
    brand: {
      '@type': 'Organization',
      name: 'Edraak Systems',
      url: SITE_URL,
      logo: 'https://db.edraaksystems.com/wp-content/uploads/2026/04/images.png',
    },
  } : null

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Edraak Systems',
    url: SITE_URL,
    logo: 'https://db.edraaksystems.com/wp-content/uploads/2026/04/images.png',
  }

  return (
    <>
      {prod && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, orgLd]) }}
        />
      )}
      <ProductDetailClient />
    </>
  )
}
