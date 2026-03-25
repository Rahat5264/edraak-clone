'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Ensure a stable default on initial render to avoid SSR/client hydration mismatch.
  return (
    <NextThemesProvider {...props} defaultTheme="light" enableSystem={false} enableColorScheme={false}>
      {children}
    </NextThemesProvider>
  )
}
