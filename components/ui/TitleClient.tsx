"use client"

import { useEffect } from 'react'

export default function TitleClient({ title }: { title?: string }) {
  useEffect(() => {
    if (!title) return
    try {
      const t = title || 'Product'
      document.title = `${t} | Edraak Systems`
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
      if (meta) meta.content = ''
      else {
        meta = document.createElement('meta')
        meta.name = 'description'
        meta.content = ''
        document.head.appendChild(meta)
      }
    } catch (e) {
      // ignore DOM errors during SSR hydration
    }
  }, [title])

  return null
}
