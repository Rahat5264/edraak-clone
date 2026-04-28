export const metadata = {
  title: {
    default: 'Products',
    template: '%s | Edraak Systems',
  },
  description: 'Explore Edraak Systems products — inspection hardware, sensors, and software modules for textile quality control and traceability.',
}

import ProductTitleSync from '@/components/ui/ProductTitleSync'

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProductTitleSync />
      {children}
    </>
  )
}
