import content from '@/data/content.json'
import ProductDetailClient from './ProductDetailClient'
import fs from 'fs'
import path from 'path'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const products = Array.isArray(content.products) ? content.products : []
    const prod = products.find((p: any) => slugify(p.title) === params.slug)
    return {
      title: prod?.title || 'Product',
      description: '',
    }
  } catch (e) {
    return { title: 'Product' }
  }
}

export default function ProductPage() {
  return <ProductDetailClient />
}
