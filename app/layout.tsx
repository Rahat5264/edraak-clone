import type { Metadata } from 'next'
import { Inria_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Navigation from '@/components/sections/Navigation'
import Careers from '@/components/sections/Careers'
import Footer from '@/components/sections/Footer'
import { ThemeProvider } from '@/components/theme-provider'

const inria = Inria_Sans({ subsets: ["latin"], weight: ['300','400','700'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Edraak Systems | Quality Control & Traceability Solutions for Textiles',
  description: 'Advanced machine vision and AI-powered quality control solutions for textile, apparel, and manufacturing industries. Real-time traceability and defect detection.',
  keywords: 'textile quality control, apparel inspection, machine vision, AI manufacturing, traceability, fabric inspection',
  authors: [{ name: 'Edraak Systems' }],
  creator: 'Edraak Systems',
  publisher: 'Edraak Systems',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://edraaksystems.com',
    siteName: 'Edraak Systems',
    title: 'Edraak Systems | Quality Control & Traceability Solutions',
    description: 'Advanced machine vision and AI-powered quality control solutions for textile and apparel manufacturing.',
    images: [
      {
        url: '/placeholder.jpg',
        width: 1200,
        height: 630,
        alt: 'Edraak Systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edraak Systems | Quality Control & Traceability Solutions',
    description: 'Advanced machine vision and AI-powered quality control solutions for textile and apparel manufacturing.',
    creator: '@EdraakSystems',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inria.variable} light`}>
      <body className="antialiased">
        <ThemeProvider attribute="class">
          <Navigation />
          <main>{children}</main>
          <Careers />
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
