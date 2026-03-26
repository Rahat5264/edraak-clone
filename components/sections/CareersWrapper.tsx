"use client"

import { usePathname } from 'next/navigation'
import Careers from './Careers'

export default function CareersWrapper() {
  const pathname = usePathname() || ''
  if (pathname.startsWith('/products')) return null
  if (pathname.startsWith('/contact')) return null
  if (pathname.startsWith('/vision-platform')) return null
  return <Careers />
}
