export const dynamic = 'force-dynamic'

import ProductsClient from './ProductsClient'
import content from '@/data/content.json'

const SITE_URL = 'https://www.edraaksystems.com'

export async function generateMetadata() {
  const siteName = content?.brand?.name || 'Edraak Systems'
  const title = content?.productsHero?.title ? `${content.productsHero.title} | ${siteName}` : `Products | ${siteName}`
  const description = content?.productsHero?.description || content?.brand?.tagline || 'Products and solutions by Edraak Systems.'
  return {
    title,
    description,
    openGraph: { title, description, url: `${SITE_URL}/products` },
    twitter: { card: 'summary_large_image', title, description },
    alternates: { canonical: `${SITE_URL}/products` }
  }
}

export default function ProductsPage() {
  return <ProductsClient />
}
