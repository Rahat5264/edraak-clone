"use client"

import React, { useState } from 'react'

type Props = { job?: any, onClose: () => void }

export default function ApplyModal({ job, onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sending, setSending] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const readFileAsDataUrl = (file: File) => new Promise<string>((res, rej) => {
    const reader = new FileReader()
    reader.onload = () => res(String(reader.result))
    reader.onerror = () => rej(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!file) {
      setError('Please upload your CV (required)')
      return
    }
    setSending(true)
    try {
      const dataUrl = await readFileAsDataUrl(file)
      const base64 = dataUrl.split(',')[1]
      const payload = { job: job?.title, ...form, fileName: file.name, fileType: file.type, fileData: base64 }
      const res = await fetch('/api/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setError(json?.error || 'Submission failed')
        return
      }
      // open mail client as fallback
      window.location.href = `mailto:hr@edraaksystems.com?subject=${encodeURIComponent('Job application - ' + (job?.title||''))}&body=${encodeURIComponent('Name: ' + form.name + '\nEmail: ' + form.email + '\n\n' + form.message)}`
      onClose()
    } catch (e) {
      setError('Submission failed')
      onClose()
    } finally { setSending(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="bg-white w-full max-w-md mx-4 rounded-md z-60 p-6">
        <h3 className="text-xl font-bold mb-4">Apply for {job?.title}</h3>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full rounded border px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full rounded border px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="w-full rounded border px-3 py-2" rows={4} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Upload CV (PDF/DOC) <span className="text-red-600">*</span></label>
            <input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={e => setFile(e.target.files?.[0] ?? null)} className="w-full" required />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border">Cancel</button>
            <button type="submit" disabled={sending} className="px-4 py-2 text-white" style={{ backgroundColor: 'rgb(5,3,42)', borderRadius: 0 }}>{sending ? 'Sending...' : 'Send Application'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
