'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  BedDouble,
  Car,
  Bath,
  Ruler,
  Phone,
  Mail,
  ArrowLeft,
  Instagram,
  Facebook,
} from 'lucide-react'
import { properties } from '@/app/justinoimoveis/properties'

// ─── Brand tokens ─────────────────────────────────────────────────
const TEAL = '#163535'
const TEAL_DARK = '#0D2525'
const GOLD = '#C9A060'
const CREAM = '#F5F1EB'
const GRADIENT = 'linear-gradient(135deg, #E91E8C 0%, #FF6B35 50%, #F5C518 100%)'
const FONT = 'var(--font-montserrat, system-ui, sans-serif)'

function formatPrice(price: number) {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
  })
}

function Logo({ size = 44 }: { size?: number }) {
  return (
    <div
      className="rounded-full shrink-0 flex items-center justify-center"
      style={{ width: size, height: size, background: GRADIENT, padding: 2 }}
    >
      <div
        className="w-full h-full rounded-full flex items-center justify-center"
        style={{ background: TEAL }}
      >
        <svg
          width={size * 0.52}
          height={size * 0.58}
          viewBox="0 0 26 30"
          fill="none"
        >
          <path
            d="M13 2 L24 11 L24 27 L2 27 L2 11 Z"
            stroke={GOLD}
            strokeWidth="1.8"
            fill="none"
            strokeLinejoin="round"
          />
          <path
            d="M13 8 L13 20 Q13 24 9.5 24 Q7 24 7 21.5"
            stroke={GOLD}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <line
            x1="10.5"
            y1="8"
            x2="15.5"
            y2="8"
            stroke={GOLD}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  )
}

export default function PropertyPage() {
  const params = useParams()
  const slug = params?.slug as string
  const property = properties.find((p) => p.slug === slug)
  const [currentPhoto, setCurrentPhoto] = useState(0)

  if (!property) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: CREAM, fontFamily: FONT }}
      >
        <div className="text-center">
          <h1
            className="text-2xl font-black mb-4"
            style={{ color: TEAL, fontFamily: FONT }}
          >
            Imóvel não encontrado
          </h1>
          <Link
            href="/justinoimoveis"
            className="font-bold text-sm"
            style={{ color: GOLD }}
          >
            ← Voltar para o início
          </Link>
        </div>
      </div>
    )
  }

  const prevPhoto = () =>
    setCurrentPhoto(
      (p) => (p - 1 + property.photos.length) % property.photos.length
    )
  const nextPhoto = () =>
    setCurrentPhoto((p) => (p + 1) % property.photos.length)

  const stats = [
    { Icon: Ruler, label: 'Área', value: `${property.area} m²` },
    { Icon: BedDouble, label: 'Quartos', value: `${property.bedrooms}` },
    { Icon: Car, label: 'Vagas', value: `${property.parking}` },
    { Icon: Bath, label: 'Banheiros', value: `${property.bathrooms}` },
  ]

  return (
    <div style={{ fontFamily: FONT, background: CREAM }}>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: TEAL }}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/justinoimoveis" className="flex items-center gap-3">
            <Logo size={44} />
            <div>
              <p
                className="font-extrabold text-sm tracking-[0.18em] uppercase"
                style={{ color: GOLD, lineHeight: 1.2, fontFamily: FONT }}
              >
                Justino Brokers
              </p>
              <p
                className="text-xs tracking-[0.28em] uppercase font-light"
                style={{ color: 'rgba(201,160,96,0.55)', fontFamily: FONT }}
              >
                Soluções Imobiliárias
              </p>
            </div>
          </Link>

          <a
            href="/justinoimoveis#contato"
            className="hidden md:block text-sm font-extrabold px-5 py-2.5 tracking-widest uppercase transition-opacity hover:opacity-85"
            style={{ background: GOLD, color: TEAL, fontFamily: FONT }}
          >
            Falar Conosco
          </a>
        </div>
      </nav>

      {/* ── BACK BAR ── */}
      <div className="pt-20" style={{ background: TEAL_DARK }}>
        <div className="max-w-7xl mx-auto px-6 py-3.5">
          <Link
            href="/justinoimoveis"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: 'rgba(255,255,255,0.45)', fontFamily: FONT }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = GOLD)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')
            }
          >
            <ArrowLeft size={15} />
            Voltar para imóveis
          </Link>
        </div>
      </div>

      {/* ── PHOTO GALLERY ── */}
      <section style={{ background: TEAL_DARK }}>
        <div
          className="relative max-w-5xl mx-auto overflow-hidden"
          style={{ height: 480 }}
        >
          <img
            src={property.photos[currentPhoto]}
            alt={`${property.name} — foto ${currentPhoto + 1}`}
            className="w-full h-full object-cover"
          />

          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'rgba(22,53,53,0.8)' }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = GOLD)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                'rgba(22,53,53,0.8)')
            }
          >
            <ChevronLeft size={20} color="white" />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'rgba(22,53,53,0.8)' }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = GOLD)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                'rgba(22,53,53,0.8)')
            }
          >
            <ChevronRight size={20} color="white" />
          </button>

          {/* Counter */}
          <div
            className="absolute bottom-4 right-4 text-xs font-bold px-3 py-1.5"
            style={{ background: 'rgba(22,53,53,0.85)', color: GOLD }}
          >
            {currentPhoto + 1} / {property.photos.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="max-w-5xl mx-auto flex gap-2 pt-2 pb-6 px-4">
          {property.photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setCurrentPhoto(i)}
              className="flex-1 overflow-hidden transition-all"
              style={{
                height: 64,
                border: `2px solid ${i === currentPhoto ? GOLD : 'transparent'}`,
                opacity: i === currentPhoto ? 1 : 0.5,
              }}
            >
              <img
                src={photo}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      {/* ── PROPERTY DETAILS ── */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="text-xs font-extrabold px-3 py-1 tracking-widest uppercase"
                  style={{ background: GOLD, color: TEAL }}
                >
                  {property.operation}
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: '#999' }}
                >
                  {property.type}
                </span>
              </div>

              <h1
                className="font-black text-3xl md:text-4xl mb-2 leading-tight"
                style={{ color: TEAL, fontFamily: FONT }}
              >
                {property.name}
              </h1>
              <div
                className="mb-4"
                style={{ height: 3, width: 48, background: GRADIENT }}
              />
              <div
                className="flex items-center gap-1.5 mb-8"
                style={{ color: '#999' }}
              >
                <MapPin size={14} style={{ color: GOLD }} />
                <span className="text-sm font-semibold">
                  {property.neighborhood}, {property.city} · SC
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                {stats.map(({ Icon, label, value }) => (
                  <div
                    key={label}
                    className="text-center p-4 bg-white"
                    style={{ border: '1px solid #EAE6DF' }}
                  >
                    <Icon
                      size={20}
                      className="mx-auto mb-2"
                      style={{ color: GOLD }}
                    />
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-1"
                      style={{ color: '#bbb', fontFamily: FONT }}
                    >
                      {label}
                    </p>
                    <p
                      className="font-extrabold"
                      style={{ color: TEAL, fontFamily: FONT }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <h2
                  className="font-extrabold text-lg mb-3"
                  style={{ color: TEAL, fontFamily: FONT }}
                >
                  Sobre o Imóvel
                </h2>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#666', fontFamily: FONT }}
                >
                  {property.description}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div
                className="bg-white p-6 sticky top-24"
                style={{ border: '1px solid #EAE6DF' }}
              >
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: '#bbb', fontFamily: FONT }}
                >
                  Valor
                </p>
                <p
                  className="font-black text-3xl mb-2"
                  style={{ color: TEAL, fontFamily: FONT }}
                >
                  {formatPrice(property.price)}
                </p>
                <div
                  className="mb-6"
                  style={{ height: 3, width: 40, background: GRADIENT }}
                />

                <div className="flex flex-col gap-3">
                  <a
                    href={`https://wa.me/5547999999999?text=Olá! Tenho interesse no imóvel ${property.name}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 text-sm font-extrabold tracking-wider uppercase text-center block transition-opacity hover:opacity-85"
                    style={{
                      background: GOLD,
                      color: TEAL,
                      fontFamily: FONT,
                    }}
                  >
                    Tenho Interesse
                  </a>
                  <a
                    href="tel:+5547999999999"
                    className="py-3.5 text-sm font-extrabold tracking-wider uppercase text-center flex items-center justify-center gap-2 transition-colors"
                    style={{
                      border: `1.5px solid ${TEAL}`,
                      color: TEAL,
                      fontFamily: FONT,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = TEAL
                      el.style.color = 'white'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = ''
                      el.style.color = TEAL
                    }}
                  >
                    <Phone size={14} />
                    Ligar Agora
                  </a>
                </div>

                <div
                  className="mt-6 pt-5"
                  style={{ borderTop: '1px solid #EAE6DF' }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-3"
                    style={{ color: '#bbb', fontFamily: FONT }}
                  >
                    Justino Brokers
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {[
                      { Icon: Phone, text: '(47) 9 9999-9999' },
                      {
                        Icon: Mail,
                        text: 'contato@justinobrokers.com.br',
                      },
                    ].map(({ Icon, text }) => (
                      <div
                        key={text}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: '#777', fontFamily: FONT }}
                      >
                        <Icon size={12} style={{ color: GOLD }} />
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: TEAL_DARK,
          borderTop: '1px solid rgba(201,160,96,0.1)',
          padding: '36px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Logo size={40} />
              <div>
                <p
                  className="font-extrabold text-sm tracking-[0.18em] uppercase"
                  style={{ color: GOLD, fontFamily: FONT, lineHeight: 1.2 }}
                >
                  Justino Brokers
                </p>
                <p
                  className="text-xs tracking-[0.28em] uppercase font-light"
                  style={{ color: 'rgba(201,160,96,0.5)', fontFamily: FONT }}
                >
                  Soluções Imobiliárias
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 flex items-center justify-center transition-colors"
                  style={{
                    border: '1px solid rgba(201,160,96,0.2)',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = GOLD
                    el.style.color = GOLD
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'rgba(201,160,96,0.2)'
                    el.style.color = 'rgba(255,255,255,0.35)'
                  }}
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>

            <p
              className="text-xs"
              style={{ color: 'rgba(255,255,255,0.18)', fontFamily: FONT }}
            >
              © {new Date().getFullYear()} Justino Brokers · Itajaí, SC
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
