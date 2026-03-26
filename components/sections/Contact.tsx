"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import content from '@/data/content.json'

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  return (
    <section id="contact" className="py-20 md:py-32 px-4 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto">
        {/* main heading removed as requested */}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[var(--card)] p-8 rounded-3xl border" style={{ borderColor: 'var(--border)' }}>
            <h3 className="text-xl font-bold mb-4">{content.contact.panelTitle}</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder={content.contact.form.firstName} className="bg-[var(--input)] text-[var(--foreground)]" />
                <Input placeholder={content.contact.form.lastName} className="bg-[var(--input)] text-[var(--foreground)]" />
              </div>

              <Input type="email" placeholder={content.contact.form.email} className="bg-[var(--input)] text-[var(--foreground)]" />
              <Input type="tel" placeholder={content.contact.form.phone} className="bg-[var(--input)] text-[var(--foreground)]" />
              <Textarea placeholder={content.contact.form.message} rows={5} className="bg-[var(--input)] text-[var(--foreground)]" />

              <Button type="submit" className="bg-gradient-to-tr from-[#02879F] to-[#02E3DF] text-white font-normal">{content.contact.form.submit}</Button>

              {formSubmitted && (
                <div className="p-3 rounded-lg bg-[#02879f]/10 border border-[#02879f]/20 text-[#02879f] text-sm">
                  {content.contact.successMessage}
                </div>
              )}
            </form>
          </div>

          <div className="relative bg-[var(--card)] p-0 rounded-3xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
            <div className="p-2 md:p-3">
              <h3 className="text-xl font-bold mb-0">{content.contact.map.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{content.contact.map.description}</p>
            </div>

            {content.offices && content.offices.items && content.offices.items.length > 0 ? (
              (() => {
                const office = content.offices.items[0]
                let mapSrc = ''
                const hasEmbed = office.embedUrl && office.embedUrl.includes('/maps/embed')
                const externalMapLink = office.externalLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((office.name || '') + ' ' + (office.address || office.city || ''))}`
                if (hasEmbed) {
                  mapSrc = office.embedUrl
                } else if (office.latitude && office.longitude) {
                  const lat = office.latitude
                  const lng = office.longitude
                  mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`
                } else {
                  const address = office.address || `${office.city} ${office.country}`
                  const query = office.name ? `${office.name} ${address}` : address
                  mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=17&output=embed`
                }
                return (
                  <>
                    <div className="p-2 md:p-3">
                      <div className="font-semibold text-[#02879f] mb-1">{office.city}, {office.country}</div>
                      <div className="text-sm text-gray-700 mt-0">{office.address}</div>
                      <div className="mt-0 text-sm">Phone: <a href={`tel:${office.phone}`} className="text-[#02879f]">{office.phone}</a></div>
                      <div className="mt-0 text-sm">Email: <a href={`mailto:${office.email}`} className="text-[#02879f]">{office.email}</a></div>
                    </div>

                    {externalMapLink && (
                      <div className="px-3 md:px-4">
                        <a href={externalMapLink} target="_blank" rel="noopener noreferrer" className="text-sm text-[#02879f] underline">{content.contact.map.openInMapsLabel}</a>
                      </div>
                    )}

                    <div className="h-[240px] md:h-[300px] w-full relative">
                      <iframe
                        src={mapSrc}
                        className="w-full h-full"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />

                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[#02879f] opacity-30 mix-blend-multiply" />
                      </div>
                    </div>
                  </>
                )
              })()
            ) : (
              <div className="p-6">
                <p className="text-gray-600">{content.contact.map.unavailableMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
