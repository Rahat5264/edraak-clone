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
      {
        source: '/fabric-processing/width-measurement',
        destination: '/products/width-measurement-system',
        permanent: true,
      },
      {
        source: '/hiring',
        destination: '/career',
        permanent: true,
      },
      {
        source: '/industries/agritech',
        destination: '/',
        permanent: true,
      },
      {
        source: '/erp-systems',
        destination: '/',
        permanent: true,
      },
      {
        source: '/industries/pharma',
        destination: '/',
        permanent: true,
      },
      {
        source: '/fabric-processing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/stitching-apparel/wash-monitoring-system',
        destination: '/',
        permanent: true,
      },
      {
        source: '/industries/agritech/visual-crop-analysis',
        destination: '/',
        permanent: true,
      },
      {
        source: '/posts/business-intelligence-quality-assurance-system',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services/artificial-intelligence/nlp-genarative-ai',
        destination: '/',
        permanent: true,
      },
      {
        source: '/stitching-apparel/wages',
        destination: '/',
        permanent: true,
      },
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
      {
        source: '/services/artificial-intelligence/deep-learning',
        destination: '/artificial-intelligence',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
