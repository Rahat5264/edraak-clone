import { Inria_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Navigation from '@/components/sections/Navigation'
import Footer from '@/components/sections/Footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'sonner'
import InquiryModal from '@/components/ui/InquiryModal'
import Script from 'next/script'

const inria = Inria_Sans({ subsets: ["latin"], weight: ['300', '700'], variable: '--font-sans' });

// Site-level metadata removed — pages now define their own `metadata` exports.


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inria.variable} light`}>
      <head>
        <Script async strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_G_TAG}`}></Script>
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
      </body>
    </html>
  )
}
