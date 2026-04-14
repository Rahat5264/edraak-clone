"use client"

import React from 'react'

type Props = {
  product?: any
  title?: string
  className?: string
  style?: React.CSSProperties
}

export default function InquiryButton({ product, title, className, style }: Props) {
  const handle = (e: React.MouseEvent) => {
    e.preventDefault()
    const detail = { product: product || { title: title || '' } }
    if (typeof window !== 'undefined') {
      ;(window as any).dispatchEvent(new CustomEvent('edraaksystems:open-inquiry', { detail }))
    }
  }

  return (
    <button onClick={handle} className={className} style={style}>
      Inquiry
    </button>
  )
}
