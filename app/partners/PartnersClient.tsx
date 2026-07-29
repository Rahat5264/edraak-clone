'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import Turnstile from 'react-turnstile'
import { contactUs } from '@/app/actions/contact-us'

export default function PartnersClient() {
  const [turnstileToken, setTurnstileToken] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!turnstileToken) {
        toast.error('Please complete verification')
        setIsSubmitting(false)
        return
      }

      const formEl = e.currentTarget
      const formData = new FormData(formEl)
      const payload: any = Object.fromEntries(formData.entries())
      payload.turnstileToken = turnstileToken
      payload.requestType = 'integration-partner'

      const response = await contactUs(payload)

      if (!response) {
        toast.error('Submission failed. Please try again later.')
        setIsSubmitting(false)
        return
      }

      toast.success('Thanks for your interest. We will get back to you soon.')
      setFormSubmitted(true)
      formEl.reset()
      setTurnstileToken('')

      if (typeof window !== 'undefined' && (window as any).turnstile) {
        ;(window as any).turnstile.reset()
      }

      setTimeout(() => setFormSubmitted(false), 3000)
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white text-foreground">
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="mb-12 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#02879F]">Edraak Systems</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Partners
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg">
            Become an integration partner with us and connect your solution to Edraak’s industrial vision workflows.
          </p>
        </div>

        <div className="grid gap-8">
          <div className="border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground">Become Our Integration Partner</h2>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Share your company details and partnership focus so we can review the best integration path.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input name="firstName" placeholder="First name" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#02879F]" />
                <input name="lastName" placeholder="Last name" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#02879F]" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input name="company" placeholder="Company" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#02879F]" />
                <input name="website" placeholder="Website" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#02879F]" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input type="email" name="email" placeholder="Email" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#02879F]" />
                <input type="tel" name="phone" placeholder="Phone" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#02879F]" />
              </div>

              <input name="partnershipFocus" placeholder="What do you want to integrate with Edraak Systems?" className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#02879F]" />

              <textarea name="message" rows={6} placeholder="Tell us about your solution, target industries, and integration goals." className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#02879F]" />

              <Turnstile
                sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITEKEY || ''}
                onVerify={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken('')}
                onError={() => setTurnstileToken('')}
                theme="light"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center rounded-full bg-[#02879F] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#02879F]/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>

              {formSubmitted && (
                <div className="rounded-lg border border-[#02879F]/20 bg-[#02879F]/10 p-3 text-sm text-[#02879F]">
                  Thanks for reaching out. We’ll review your partnership inquiry soon.
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}