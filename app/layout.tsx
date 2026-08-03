import { Inria_Sans } from 'next/font/google'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Navigation from '@/components/sections/Navigation'
import Footer from '@/components/sections/Footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'
import InquiryModal from '@/components/ui/InquiryModal'
import Script from 'next/script'

const inria = Inria_Sans({ subsets: ["latin"], weight: ['300', '700'], variable: '--font-sans' });

// Site-level metadata (used as sensible defaults)
const SITE_URL = 'https://www.edraaksystems.com'

type CatalogThing = {
  '@type': 'Thing'
  name: string
  url: string
}

type OfferCatalogListItem = {
  '@type': 'ListItem'
  position: number
  item: CatalogThing
}

type OrganizationJsonLd = {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo: string
  description: string
  sameAs: string[]
  hasOfferCatalog: {
    '@type': 'OfferCatalog'
    name: string
    itemListElement: OfferCatalogListItem[]
  }
}

const catalogItems: CatalogThing[] = [
  { '@type': 'Thing', name: 'Audit Inspection', url: 'https://www.edraaksystems.com/products/audit-inspection' },
  { '@type': 'Thing', name: 'Camera Inspection System', url: 'https://www.edraaksystems.com/products/camera-inspection-system' },
  { '@type': 'Thing', name: 'Fabric Batch Making', url: 'https://www.edraaksystems.com/products/fabric-batch-making' },
  { '@type': 'Thing', name: 'Fabric Production Processing', url: 'https://www.edraaksystems.com/products/fabric-production-processing' },
  { '@type': 'Thing', name: 'Highspeed Barcode Seam Sensor', url: 'https://www.edraaksystems.com/products/highspeed-barcode-seam-sensor' },
  { '@type': 'Thing', name: 'In-Line Moisture Meter', url: 'https://www.edraaksystems.com/products/in-line-moisture-meter' },
  { '@type': 'Thing', name: 'Labelling System', url: 'https://www.edraaksystems.com/products/labelling-system' },
  { '@type': 'Thing', name: 'Manual Inspection', url: 'https://www.edraaksystems.com/products/manual-inspection' },
  { '@type': 'Thing', name: 'On-Loom Inspection', url: 'https://www.edraaksystems.com/products/on-loom-inspection' },
  { '@type': 'Thing', name: 'Planning Software', url: 'https://www.edraaksystems.com/products/planning-software' },
  { '@type': 'Thing', name: 'Processing Traceability', url: 'https://www.edraaksystems.com/products/processing-traceability' },
  { '@type': 'Thing', name: 'Spectrophotometer', url: 'https://www.edraaksystems.com/products/spectrophotometer' },
  { '@type': 'Thing', name: 'Weft Straightener', url: 'https://www.edraaksystems.com/products/weft-straightener' },
  { '@type': 'Thing', name: 'Width Measurement System', url: 'https://www.edraaksystems.com/products/width-measurement-system' },
]

const ORG_JSONLD: string = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Edraak Systems',
  url: 'https://edraaksystems.com',
  logo: 'https://db.edraaksystems.com/wp-content/uploads/2022/04/ES-Logo2-2.png',
  description: 'Edraak Systems is a global provider of AI-powered fabric quality control and traceability solutions. The company develops advanced vision inspection systems using high-resolution line-scan cameras to detect, analyze, and report textile defects such as holes, stains, and weave inconsistencies at production speeds up to 100 meters per minute. Its solutions help textile manufacturers improve quality, reduce waste, and optimize production efficiency.',
  sameAs: [
    'https://www.linkedin.com/company/edraak-systems/',
    'https://x.com/edraaksystems',
    'https://www.youtube.com/@IndustrialProcessOptimization',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Edraak Systems Products',
    itemListElement: catalogItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item,
    })),
  },
} satisfies OrganizationJsonLd)

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Edraak Systems | Quality Control & Traceability Solutions for Textiles',
  description: 'AI-driven fabric quality control system that detects defects in real-time. It also ensures traceability and provides Industry 4.0 textile QC solutions.',
  keywords: 'textile quality control, apparel inspection, machine vision, AI manufacturing, traceability, fabric inspection',
  authors: [{ name: 'Edraak Systems' }],
  creator: 'Edraak Systems',
  publisher: 'Edraak Systems',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Edraak Systems',
    title: 'Edraak Systems | Quality Control & Traceability Solutions',
    description: 'AI-driven fabric quality control system that detects defects in real-time. It also ensures traceability and provides Industry 4.0 textile QC solutions.',
    images: [
      {
        url: 'https://db.edraaksystems.com/wp-content/uploads/2026/04/images.png',
        width: 1200,
        height: 630,
        alt: 'Edraak Systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Edraak Systems | Quality Control & Traceability Solutions',
    description: 'AI-driven fabric quality control system that detects defects in real-time. It also ensures traceability and provides Industry 4.0 textile QC solutions.',
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
        url: 'https://db.edraaksystems.com/wp-content/uploads/2026/04/images.png',
        type: 'image/png',
      },
    ],
    shortcut: 'https://db.edraaksystems.com/wp-content/uploads/2026/04/images.png',
    apple: 'https://db.edraaksystems.com/wp-content/uploads/2026/04/images.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inria.variable} light`}>
      <head>
        <meta name="google-site-verification" content="MlvyPgepZrLNb2RX-4Fm2p0JQh7ypCYR_Xtg2c4_kDM" />
        <link rel="icon" href="https://db.edraaksystems.com/wp-content/uploads/2026/04/images.png" />
        <link rel="apple-touch-icon" href="https://db.edraaksystems.com/wp-content/uploads/2026/04/images.png" />
        {/* Clarity */}

        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "jvj59mnu8j")`}
        </Script>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ORG_JSONLD }} />
        {/* Cloudflare Turnstile - Implicit Rendering */}
        <Script 
          src="https://challenges.cloudflare.com/turnstile/v0/api.js" 
          async 
          defer 
          strategy="beforeInteractive"
        />
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class">
          <Navigation />
          <Toaster />
          <InquiryModal />
          <main>{children}</main>
          <Footer />
          <Analytics />
        </ThemeProvider>
          {/* Google Analytics Script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_G_TAG}`}
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_G_TAG}');
          `}
        </Script>

      </body>
    </html>
  )
}
