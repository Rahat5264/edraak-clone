"use client"

import React from 'react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <section className="bg-gradient-to-tr from-[#02879F] to-[#02E3DF] py-28">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white">Privacy Policy</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 text-slate-700">
          <p className="mb-6 leading-relaxed">
            Throughout this site, there are several areas where we collect information, including name, title, company name, address, telephone number, fax number, e-mail address, department, industry, country, address, city, state, and zip code. In some instances, we may verify or combine this information with data that has been previously obtained. This information, where noted, will not be saved or recorded except for EDRAAK SYSTEMS' own use.
          </p>

          <p className="mb-6 leading-relaxed">
            We compile and use this information to complete transactions and keep our customers apprised of new products, product enhancements, and services.
          </p>

          <p className="mb-6 leading-relaxed">
            The information we collect is never sold, rented, leased, traded, swapped, marketed, exchanged, bartered, distributed, or disclosed in any way. We don’t like to receive junk mail or spam and know our customers don’t either.
          </p>

          <p className="mb-6 leading-relaxed">
            We also want to make sure the information we have collected is up-to-date and accurate. If there are inaccuracies please e-mail the correct information to mail@edraaksystems.com
          </p>
        </div>
      </section>
    </div>
  )
}
