import React from 'react'
import content from '@/data/content.json'

const SITE_URL = 'https://www.edraaksystems.com'

export async function generateMetadata() {
  const siteName = content?.brand?.name || 'Edraak Systems'
  return { title: `Careers | ${siteName}`, description: 'Careers and job openings at Edraak Systems.', alternates: { canonical: `${SITE_URL}/career` } }
}

export default function CareerPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white py-20">
      <div className="max-w-2xl text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Careers — Coming Soon</h1>
        <p className="text-lg text-gray-700 mb-6">
          We are currently updating our careers page. If you'd like to reach out about opportunities or submit your CV, please email us at{' '}
          <a href="mailto:career@edraaksystems.com" className="text-[#02879F]">career@edraaksystems.com</a>.
        </p>
        <p className="text-sm text-gray-500">Thanks for your interest — we’ll post openings and application details here soon.</p>
      </div>
    </main>
  )
}
