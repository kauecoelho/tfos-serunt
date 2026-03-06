import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'Justino Brokers | Soluções Imobiliárias em Itajaí - SC',
  description:
    'Justino Brokers — Soluções Imobiliárias. Encontre apartamentos, casas e terrenos de alto padrão em Itajaí, Santa Catarina.',
}

export default function JustinoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={montserrat.variable}>{children}</div>
}
