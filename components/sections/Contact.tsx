'use client'

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
    <section id="contact" className="py-20 md:py-32 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-[56px] font-bold text-center mb-8 text-primary">{content.contact.title}</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold mb-4">{content.contact.panelTitle}</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder={content.contact.form.firstName} className="bg-gray-50" />
                <Input placeholder={content.contact.form.lastName} className="bg-gray-50" />
              </div>
              <Input type="email" placeholder={content.contact.form.email} className="bg-gray-50" />
              <Input type="tel" placeholder={content.contact.form.phone} className="bg-gray-50" />
              <Textarea placeholder={content.contact.form.message} rows={5} className="bg-gray-50" />

              <Button type="submit" className="bg-primary text-white hover:bg-primary/90 font-semibold">{content.contact.form.submit}</Button>

              {formSubmitted && (
                <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                  {content.contact.successMessage}
                </div>
              )}
            </form>
          </div>

          <div className="relative bg-white p-0 rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-2 md:p-3">
              <h3 className="text-xl font-bold mb-0">{content.contact.map.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{content.contact.map.description}</p>
            </div>

            {content.offices && content.offices.items && content.offices.items.length > 0 ? (
              (() => {
                const office = content.offices.items[0]
                // Determine iframe src for embedding the map.
                // If an explicit Google Maps embed URL is provided, use it (shows exact pin/place).
                // Otherwise prefer coordinates, else fall back to name+address query.
                let mapSrc = ''
                const hasEmbed = office.embedUrl && office.embedUrl.includes('/maps/embed')
                // external map link to open in new tab (maps search URL)
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
                      <div className="font-semibold text-primary mb-1">{office.city}, {office.country}</div>
                      <div className="text-sm text-gray-700 mt-0">{office.address}</div>
                      <div className="mt-0 text-sm">Phone: <a href={`tel:${office.phone}`} className="text-primary">{office.phone}</a></div>
                      <div className="mt-0 text-sm">Email: <a href={`mailto:${office.email}`} className="text-primary">{office.email}</a></div>
                    </div>

                    {externalMapLink && (
                      <div className="px-3 md:px-4">
                        <a href={externalMapLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline">{content.contact.map.openInMapsLabel}</a>
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

                      {/* tint overlay using primary color */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-primary opacity-30 mix-blend-multiply" />
                      </div>
                    </div>

                    {/* details below map removed as requested */}
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
