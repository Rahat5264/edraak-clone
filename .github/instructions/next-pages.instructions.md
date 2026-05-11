---
name: next-pages
description: "Use when: creating or editing Next.js page components (page.tsx). Ensures proper async params handling for dynamic routes and consistent metadata generation with SEO schema."
applyTo: "app/**/page.tsx"
---

# Next.js Page Component Instructions

Follow these patterns when creating or modifying page components in the `app/` directory.

## Async Params in Dynamic Routes

For any page with dynamic segments (e.g., `[slug]`, `[id]`), always use `await params`:

```tsx
// ✅ CORRECT - Next.js 15+ pattern
export default async function Page({ params }: { params: { slug: string } }) {
  const slug = await params.slug
  // Use slug in the component
}

// ✅ ALSO CORRECT - With additional props
export default async function Page({ 
  params, 
  searchParams 
}: { 
  params: { slug: string }
  searchParams: Record<string, string | string[]>
}) {
  const slug = await params.slug
  const query = await searchParams
  // Component logic
}
```

### Why?
- Next.js 15+ makes `params` an async object
- `await params.slug` ensures proper async resolution before rendering
- Prevents race conditions and server rendering issues

### For `generateMetadata()` Functions

Always `await params` in metadata generators too:

```tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = await params.slug
  // Fetch or process data based on slug
  return {
    title: `Page Title | Edraak Systems`,
    description: `...`,
    openGraph: { /* config */ },
  }
}
```

---

## Metadata Generation Requirements

Every page should have proper metadata for SEO. Export a `generateMetadata` function:

### Structure

```tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  // 1. Resolve async params
  const slug = await params.slug
  
  // 2. Fetch data (e.g., product, career, case study)
  const data = await fetchData(slug)
  
  // 3. Extract or generate title and description
  const title = `${data.title} | Edraak Systems`
  const description = generateDescription(data) // Keep under 160 chars
  const url = `https://www.edraaksystems.com/path/${slug}`
  
  // 4. Return complete metadata object
  return {
    title,
    description,
    
    // Open Graph (for social sharing)
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: data.image || 'default-og.jpg' }],
    },
    
    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [data.image || 'default-twitter.jpg'],
    },
    
    // Canonical & Alternate URLs
    alternates: {
      canonical: url,
    },
  }
}
```

### Description Length
- Keep descriptions **under 160 characters** for optimal display in search results
- Extract from `summary`, `desc`, or `description` fields
- If text is longer, truncate: `text.slice(0, 157).trim() + '...'`
- Always sanitize: replace multiple spaces/newlines with single space

### Fallback Metadata
Always provide fallback values if data is not found:

```tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = await params.slug
  let data = null
  
  try {
    data = await fetchData(slug)
  } catch (e) {
    console.error(`Failed to fetch data for slug: ${slug}`, e)
  }
  
  // Return fallback if no data
  if (!data) {
    return {
      title: 'Page Not Found | Edraak Systems',
      description: 'This page could not be found.',
    }
  }
  
  // ... generate metadata from data
}
```

---

## Schema Markup (Structured Data)

For products, jobs, articles, and case studies, include JSON-LD schema markup in the page component:

```tsx
// Example: Product Schema
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.title,
  description: product.description,
  image: product.image,
  url: `https://www.edraaksystems.com/products/${slug}`,
  brand: {
    '@type': 'Brand',
    name: 'Edraak Systems',
  },
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'USD',
    price: product.price || '0',
  },
}

// Render in component
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

### Schema Types by Page
- **Products**: Use `Product` schema
- **Jobs/Careers**: Use `JobPosting` schema
- **Case Studies**: Use `Article` or `BlogPosting` schema
- **Organization/Contact**: Use `Organization` schema

---

## Static vs. Dynamic Rendering

### Opt-in to Dynamic Rendering When Needed
If your page fetches fresh data per request:

```tsx
export const dynamic = 'force-dynamic'
```

### Use ISR (Incremental Static Regeneration) for Better Performance
For semi-static pages that don't change frequently:

```tsx
export const revalidate = 3600 // Revalidate every hour
```

---

## Common Patterns

### Pattern 1: Product/Service Detail Page
```tsx
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = await params.slug
  const product = await getProduct(slug)
  
  if (!product) {
    return { title: 'Product Not Found | Edraak Systems' }
  }
  
  return {
    title: `${product.name} | Products | Edraak Systems`,
    description: truncateDescription(product.summary, 160),
    openGraph: {
      title: `${product.name} | Edraak Systems`,
      description: truncateDescription(product.summary, 160),
      url: `https://www.edraaksystems.com/products/${slug}`,
      images: [{ url: product.image }],
    },
    alternates: { canonical: `https://www.edraaksystems.com/products/${slug}` },
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const slug = await params.slug
  const product = await getProduct(slug)
  
  if (!product) notFound()
  
  return (
    <>
      <ProductContent product={product} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductSchema(product, slug)) }}
      />
    </>
  )
}
```

### Pattern 2: Non-Dynamic Page with Metadata
```tsx
export async function generateMetadata() {
  return {
    title: 'Solutions | Edraak Systems',
    description: 'Explore industrial automation and quality control solutions.',
    openGraph: {
      title: 'Solutions | Edraak Systems',
      description: 'Explore industrial automation and quality control solutions.',
      url: 'https://www.edraaksystems.com/solutions',
    },
    alternates: { canonical: 'https://www.edraaksystems.com/solutions' },
  }
}

export default function SolutionsPage() {
  return <SolutionsContent />
}
```

---

## Checklist

- [ ] Dynamic routes use `await params`
- [ ] `generateMetadata` function is exported
- [ ] Metadata has title, description, openGraph, twitter, and canonical URL
- [ ] Descriptions are truncated to ~160 characters
- [ ] Schema markup is included for SEO (Product, JobPosting, Article, etc.)
- [ ] Fallback metadata is provided if data fetch fails
- [ ] Component is marked `async` for proper server rendering
- [ ] Import `notFound` and return it if resource not found
