/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // ============================================
      // OTHER INDUSTRIES → SIMILAR INDUSTRIES
      // ============================================
      {
        source: '/other-industries/:path*',
        destination: '/similar-industries/:path*',
        permanent: true,
      },

      // ============================================
      // FABRIC PROCESSING - Quality Control & Measurement
      // ============================================
      {
        source: '/fabric-processing/width-measurement',
        destination: '/products/width-measurement-system',
        permanent: true,
      },
      // Removed redirect for /fabric-processing/quality-control to serve its own page
      {
        source: '/fabric-processing/fault-labeling-system',
        destination: '/products/labelling-system',
        permanent: true,
      },
      {
        source: '/fabric-processing',
        destination: '/products',
        permanent: true,
      },
      
      // ============================================
      // STITCHING & APPAREL - Production & Inspection
      // ============================================
      {
        source: '/stitching-apparel/smart-sewing-system',
        destination: '/products/camera-inspection-system',
        permanent: true,
      },
      {
        source: '/stitching-apparel/machine-care-pro',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/stitching-apparel/maintenance',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/stitching-apparel/camera-measurement',
        destination: '/products/width-measurement-system',
        permanent: true,
      },
      {
        source: '/stitching-apparel/wash-monitoring-system',
        destination: '/products/fabric-production-processing',
        permanent: true,
      },
      {
        source: '/stitching-apparel/wages',
        destination: '/products/planning-software',
        permanent: true,
      },
      {
        source: '/stitching-apparel',
        destination: '/products',
        permanent: true,
      },
      
      // ============================================
      // PHARMA - Blister & Inspection Solutions
      // ============================================
      {
        source: '/pharma/blister-scanning',
        destination: '/products/camera-inspection-system',
        permanent: true,
      },
      {
        source: '/industries/pharma/oee',
        destination: '/products/planning-software',
        permanent: true,
      },
      {
        source: '/industries/pharma/blister-rejection',
        destination: '/products/audit-inspection',
        permanent: true,
      },
      {
        source: '/industries/pharma/blister-scanning',
        destination: '/products/camera-inspection-system',
        permanent: true,
      },
      {
        source: '/pharma',
        destination: '/',
        permanent: true,
      },
      {
        source: '/industries/pharma',
        destination: '/',
        permanent: true,
      },
      
      // ============================================
      // GENERAL / HORIZONTAL TECHNOLOGY PAGES
      // ============================================
      {
        source: '/general/energy-monitoring',
        destination: '/energy-monitoring',
        permanent: true,
      },
      {
        source: '/general/data-engineering',
        destination: '/data-and-business-analytics',
        permanent: true,
      },
      {
        source: '/general/warehouse-management',
        destination: '/products/fabric-production-processing',
        permanent: true,
      },
      {
        source: '/general',
        destination: '/',
        permanent: true,
      },
      
      // ============================================
      // PRODUCTION TRACKING & MONITORING
      // ============================================
      {
        source: '/posts/production-tracking-data-logging-recording-and-tracking',
        destination: '/products/fabric-production-processing',
        permanent: true,
      },
      {
        source: '/industries/fabric-processing/production-tracking',
        destination: '/products/fabric-production-processing',
        permanent: true,
      },
      
      // ============================================
      // AGRITECH (OUT OF SCOPE)
      // ============================================
      {
        source: '/industries/agritech',
        destination: '/',
        permanent: true,
      },
      {
        source: '/industries/agritech/visual-crop-analysis',
        destination: '/',
        permanent: true,
      },
      {
        source: '/agritech',
        destination: '/',
        permanent: true,
      },
      
      // ============================================
      // SERVICES & CONSULTING (OUT OF SCOPE / ARCHIVE)
      // ============================================
      {
        source: '/erp-systems',
        destination: '/',
        permanent: true,
      },
      {
        source: '/erp-systems-odoo',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/artificial-intelligence/nlp-genarative-ai',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/artificial-intelligence/deep-learning',
        destination: '/artificial-intelligence',
        permanent: true,
      },
      {
        source: '/services/artificial-intelligence/data-science',
        destination: '/data-and-business-analytics',
        permanent: true,
      },
      {
        source: '/services/system-analysis-advisory',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/services/hardware-design-development',
        destination: '/services',
        permanent: true,
      },
      
      // ============================================
      // BLOG / POSTS
      // ============================================
      {
        source: '/posts/business-intelligence-quality-assurance-system',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/posts/process-quality-control-realtime-width-measure',
        destination: '/products/width-measurement-system',
        permanent: true,
      },
      {
        source: '/posts/ai-in-industrial-process-cutting-plan-optimization',
        destination: '/products/cutting-optimization-module',
        permanent: true,
      },
      {
        source: '/posts/computer-vision-eagle-eye',
        destination: '/products/camera-inspection-system',
        permanent: true,
      },
      {
        source: '/posts/erp-integration',
        destination: '/contact',
        permanent: true,
      },
      
      // ============================================
      // MISCELLANEOUS OLD PAGES
      // ============================================
      {
        source: '/hiring',
        destination: '/career',
        permanent: true,
      },
      {
        source: '/about/history',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/qr/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/industries/:path*',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
