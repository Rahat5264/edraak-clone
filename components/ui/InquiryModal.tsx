"use client"

import React, { useEffect, useState } from 'react'
import content from '@/data/content.json'
import { toast } from 'sonner'
import { sendInquiry } from '@/app/actions/send-inquiry'

export default function InquiryModal() {
  // Build product options from multiple content sources so top-level pages
  // (case studies, technology items, etc.) that aren't in `content.products`
  // also appear in the inquiry select.
  const productsMap = new Map<string, any>()
  try {
    if (Array.isArray((content as any).products)) {
      ;(content as any).products.forEach((p: any) => { if (p && p.title) productsMap.set(p.title, p) })
    }
    if (content && (content as any).caseStudies && Array.isArray((content as any).caseStudies.items)) {
      ;(content as any).caseStudies.items.forEach((c: any) => { if (c && c.title && !productsMap.has(c.title)) productsMap.set(c.title, { title: c.title, desc: c.description || '' }) })
    }
    if (content && (content as any).technology && Array.isArray((content as any).technology.items)) {
      ;(content as any).technology.items.forEach((t: any) => { if (t && t.title && !productsMap.has(t.title)) productsMap.set(t.title, { title: t.title, desc: t.description || '' }) })
    }
    // Static extras for pages that exist in `app/` but aren't represented in content.json
    const staticExtras = [
      { title: 'Digital Data Loggers' },
      { title: 'RFID & Barcoding' },
      { title: 'Data & Business Analytics' },
      { title: 'Visual Fault Detection' }
    ]
    staticExtras.forEach(s => { if (s && s.title && !productsMap.has(s.title)) productsMap.set(s.title, s) })
  } catch (e) {
    // ignore
  }

  const products = Array.from(productsMap.values())

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', address: '', company: '', message: '', product: '' })

  useEffect(() => {
    const handler = (e: any) => {
      const p = e?.detail?.product || null
      setForm({ name: '', email: '', address: '', company: '', message: '', product: (p && (p.title || p)) || (products[0] && products[0].title) || '' })
      setOpen(true)
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('edraaksystems:open-inquiry', handler)
    }
    return () => { if (typeof window !== 'undefined') window.removeEventListener('edraaksystems:open-inquiry', handler) }
  }, [products])

  const close = () => setOpen(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email || !emailRegex.test(form.email)) {
      alert('Please enter a valid email address')
      return
    }

    try {
      const res = await sendInquiry(form as any)
      if (res) {
        setOpen(false)
        toast.success('Inquiry sent — we will contact you soon.')
      } else {
        toast.error('Failed to send inquiry')
      }
    } catch (err) {
      toast.error('Network error while sending inquiry')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={close} />
      <div className="bg-white w-full max-w-lg mx-4 rounded-md z-60 p-6">
        <h3 className="text-xl font-bold mb-4">Product Inquiry</h3>
        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Product</label>
            <select value={form.product} onChange={e => setForm(f => ({ ...f, product: e.target.value }))} className="w-full border px-3 py-2 bg-white">
              {products.map((pp: any) => (
                <option key={pp.title} value={pp.title}>{pp.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full rounded border px-3 py-2" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full rounded border px-3 py-2" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="w-full rounded border px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <input value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className="w-full rounded border px-3 py-2" />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="w-full rounded border px-3 py-2" rows={4} />
          </div>

          <div className="sm:col-span-2 flex justify-end gap-3">
            <button type="button" onClick={close} className="px-4 py-2 border" style={{ borderRadius: 0 }}>Cancel</button>
            <button type="submit" className="px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }}>Send Inquiry</button>
          </div>
        </form>
      </div>
    </div>
  )
}
