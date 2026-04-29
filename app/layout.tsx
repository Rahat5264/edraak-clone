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

const ORG_JSONLD = JSON.stringify([
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Edraak Systems',
    url: SITE_URL,
    logo: 'https://db.edraaksystems.com/wp-content/uploads/2026/04/images.png',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Edraak Systems',
    url: SITE_URL,
    publisher: {
      '@type': 'Organization',
      name: 'Edraak Systems',
    },
  },
])

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Edraak Systems | Quality Control & Traceability Solutions for Textiles',
  description: 'Advanced machine vision and AI-powered quality control solutions for textile, apparel, and manufacturing industries. Real-time traceability and defect detection.',
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
    description: 'Advanced machine vision and AI-powered quality control solutions for textile and apparel manufacturing.',
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
      </head>
      <body className="antialiased">
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
