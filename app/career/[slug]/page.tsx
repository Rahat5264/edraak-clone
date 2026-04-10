import React from 'react'
import Link from 'next/link'

export default function JobPageSlug() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white py-20">
      <div className="max-w-2xl text-center px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Careers — Coming Soon</h1>
        <p className="text-lg text-gray-700 mb-6">
          This position page is temporarily unavailable while we update our listings. For enquiries and CV submissions, email{' '}
          <a href="mailto:career@edraaksystems.com" className="text-[#02879F]">career@edraaksystems.com</a>.
        </p>
        <Link href="/career" className="text-sm text-gray-500 underline">Back to careers</Link>
      </div>
    </main>
  )
}
