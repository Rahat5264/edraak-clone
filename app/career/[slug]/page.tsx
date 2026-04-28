import Link from 'next/link'
import fs from 'fs'
import path from 'path'

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
    const items = content?.careers?.items || []
    const job = Array.isArray(items) ? items.find((j: any) => slugify(j.title) === slug) : null
    if (!job) return { title: 'Careers — Edraak Systems', description: 'Careers at Edraak Systems' }
    const title = `${job.title} | Careers — Edraak Systems`
    const description = job.short || job.description || content?.careers?.description || 'Career opportunity at Edraak Systems'
    return {
      title,
      description,
      openGraph: { title, description, url: `https://www.edraaksystems.com/career/${slug}` },
      twitter: { card: 'summary', title, description },
      alternates: { canonical: `https://www.edraaksystems.com/career/${slug}` },
    }
  } catch (e) {
    return { title: 'Careers — Edraak Systems', description: 'Careers at Edraak Systems' }
  }
}

export default async function JobPageSlug({ params }: { params: { slug: string } }) {
  const slug = params.slug
  let job: any = null
  try {
    const file = path.join(process.cwd(), 'data', 'content.json')
    const raw = await fs.promises.readFile(file, 'utf8')
    const content = JSON.parse(raw)
    const items = content?.careers?.items || []
    job = Array.isArray(items) ? items.find((j: any) => slugify(j.title) === slug) : null
  } catch (e) {
    job = null
  }

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job?.title || 'Job opening',
    description: job?.description || job?.short || '',
    employmentType: job?.type || 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Edraak Systems',
      sameAs: 'https://www.edraaksystems.com',
    },
    jobLocation: job?.location ? { '@type': 'Place', address: job.location } : undefined,
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white py-20">
      <div className="max-w-2xl text-center px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{job?.title || 'Careers — Coming Soon'}</h1>
        <p className="text-lg text-gray-700 mb-6">
          {job ? job.description : (
            <>This position page is temporarily unavailable while we update our listings. For enquiries and CV submissions, email{' '}<a href="mailto:career@edraaksystems.com" className="text-[#02879F]">career@edraaksystems.com</a>.</>
          )}
        </p>
        <Link href="/career" className="text-sm text-gray-500 underline">Back to careers</Link>
      </div>
      {job && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      )}
    </main>
  )
}
