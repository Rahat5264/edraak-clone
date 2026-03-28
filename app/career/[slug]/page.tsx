import content from '@/data/content.json'
import JobDetailClient from '@/components/career/JobDetailClient'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function JobPage({ params }: { params: { slug: string } }) {
  const slug = params.slug || ''
  const jobs = Array.isArray(content.careers?.items) ? content.careers.items : []
  const job = jobs.find((j: any) => slugify(j.title || '') === slug) || null

  // Always render the client component. The client will resolve the job if server-side lookup fails.
  return <JobDetailClient job={job} jobs={jobs} slug={slug} />
}
