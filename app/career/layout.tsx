import React from 'react'

export default function CareerLayout({ children }: { children: React.ReactNode }) {
  // route-level layout that intentionally does not include the global header/footer
  // so the careers pages appear with a minimal layout while under maintenance
  return <>{children}</>
}
