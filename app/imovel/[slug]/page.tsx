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
const CREAM = '#F7F5F0'
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
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: TEAL_DARK,
          borderBottom: '1px solid rgba(201,160,96,0.12)',
        }}
      >
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
                style={{ color: 'rgba(201,160,96,0.5)', fontFamily: FONT }}
              >
                Soluções Imobiliárias
              </p>
            </div>
          </Link>

          <a
            href="/justinoimoveis#contato"
            className="hidden md:block text-sm font-bold px-6 py-2.5 tracking-widest uppercase transition-all"
            style={{
              background: GOLD,
              color: TEAL_DARK,
              fontFamily: FONT,
              borderRadius: 8,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '0.88'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = '1'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
            }}
          >
            Falar Conosco
          </a>
        </div>
      </nav>

      {/* ── BACK BAR ── */}
      <div className="pt-20" style={{ background: '#0A1E1E' }}>
        <div className="max-w-7xl mx-auto px-6 py-3.5">
          <Link
            href="/justinoimoveis"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors group"
            style={{ color: 'rgba(255,255,255,0.4)', fontFamily: FONT }}
            onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
          >
            <ArrowLeft size={15} />
            Voltar para imóveis
          </Link>
        </div>
      </div>

      {/* ── PHOTO GALLERY ── */}
      <section style={{ background: '#0A1E1E' }}>
        {/* Hero image */}
        <div
          className="relative max-w-5xl mx-auto overflow-hidden"
          style={{ height: 480 }}
        >
          <img
            src={property.photos[currentPhoto]}
            alt={`${property.name} — foto ${currentPhoto + 1}`}
            className="w-full h-full object-cover"
            style={{ transition: 'opacity 0.3s ease' }}
          />

          {/* Subtle gradient bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, transparent 60%, rgba(10,30,30,0.4) 100%)',
            }}
          />

          <button
            onClick={prevPhoto}
            className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(13,37,37,0.75)', backdropFilter: 'blur(8px)' }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = GOLD)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = 'rgba(13,37,37,0.75)')
            }
          >
            <ChevronLeft size={22} color="white" />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all"
            style={{ background: 'rgba(13,37,37,0.75)', backdropFilter: 'blur(8px)' }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = GOLD)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = 'rgba(13,37,37,0.75)')
            }
          >
            <ChevronRight size={22} color="white" />
          </button>

          {/* Counter badge */}
          <div
            className="absolute bottom-4 right-5 text-xs font-bold px-3.5 py-2"
            style={{
              background: 'rgba(13,37,37,0.85)',
              color: GOLD,
              borderRadius: 8,
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(201,160,96,0.2)',
              fontFamily: FONT,
            }}
          >
            {currentPhoto + 1} / {property.photos.length}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="max-w-5xl mx-auto flex gap-2.5 pt-3 pb-7 px-4">
          {property.photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setCurrentPhoto(i)}
              className="flex-1 overflow-hidden transition-all"
              style={{
                height: 68,
                borderRadius: 8,
                border: `2.5px solid ${i === currentPhoto ? GOLD : 'transparent'}`,
                opacity: i === currentPhoto ? 1 : 0.45,
                transition: 'border-color 0.2s, opacity 0.2s',
              }}
            >
              <img
                src={photo}
                alt=""
                className="w-full h-full object-cover"
                style={{ borderRadius: 6 }}
              />
            </button>
          ))}
        </div>
      </section>

      {/* ── PROPERTY DETAILS ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* ── Main info ── */}
            <div className="lg:col-span-2">
              {/* Badges */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs font-extrabold px-3.5 py-1.5 tracking-widest uppercase"
                  style={{
                    background: GOLD,
                    color: TEAL_DARK,
                    borderRadius: 6,
                    fontFamily: FONT,
                  }}
                >
                  {property.operation}
                </span>
                <span
                  className="text-xs font-semibold px-3 py-1.5 tracking-wide uppercase"
                  style={{
                    background: 'rgba(22,53,53,0.07)',
                    color: TEAL,
                    borderRadius: 6,
                    fontFamily: FONT,
                  }}
                >
                  {property.type}
                </span>
              </div>

              <h1
                className="font-black leading-tight mb-3"
                style={{
                  color: TEAL,
                  fontFamily: FONT,
                  fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                }}
              >
                {property.name}
              </h1>

              <div
                className="mb-5"
                style={{ height: 3, width: 56, background: GRADIENT, borderRadius: 2 }}
              />

              <div
                className="flex items-center gap-2 mb-10"
              >
                <MapPin size={15} style={{ color: GOLD }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: '#777', fontFamily: FONT }}
                >
                  {property.neighborhood}, {property.city} · SC
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {stats.map(({ Icon, label, value }) => (
                  <div
                    key={label}
                    className="text-center p-5 bg-white"
                    style={{
                      borderRadius: 12,
                      border: '1.5px solid #EDEBE6',
                      boxShadow: '0 2px 12px rgba(22,53,53,0.05)',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3"
                      style={{ background: 'rgba(201,160,96,0.1)' }}
                    >
                      <Icon size={18} style={{ color: GOLD }} />
                    </div>
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-1"
                      style={{ color: '#bbb', fontFamily: FONT }}
                    >
                      {label}
                    </p>
                    <p
                      className="font-extrabold text-lg"
                      style={{ color: TEAL, fontFamily: FONT }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div
                className="p-7 bg-white"
                style={{
                  borderRadius: 14,
                  border: '1.5px solid #EDEBE6',
                  boxShadow: '0 2px 12px rgba(22,53,53,0.05)',
                }}
              >
                <h2
                  className="font-extrabold text-lg mb-4"
                  style={{ color: TEAL, fontFamily: FONT }}
                >
                  Sobre o Imóvel
                </h2>
                <div
                  className="mb-4"
                  style={{ height: 2, width: 40, background: GRADIENT, borderRadius: 2 }}
                />
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#666', fontFamily: FONT, lineHeight: 1.9 }}
                >
                  {property.description}
                </p>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-1">
              <div
                className="bg-white sticky top-28"
                style={{
                  borderRadius: 18,
                  border: '1.5px solid #EDEBE6',
                  boxShadow: '0 8px 40px rgba(22,53,53,0.1)',
                  overflow: 'hidden',
                }}
              >
                {/* Price section */}
                <div
                  className="p-7"
                  style={{ borderBottom: '1px solid #EDEBE6' }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: '#bbb', fontFamily: FONT }}
                  >
                    Valor do Imóvel
                  </p>
                  <p
                    className="font-black mb-3"
                    style={{
                      color: TEAL,
                      fontFamily: FONT,
                      fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                      lineHeight: 1.1,
                    }}
                  >
                    {formatPrice(property.price)}
                  </p>
                  <div
                    style={{ height: 3, width: 44, background: GRADIENT, borderRadius: 2 }}
                  />
                </div>

                {/* CTAs */}
                <div className="p-7 flex flex-col gap-3">
                  <a
                    href={`https://wa.me/5547999999999?text=Olá! Tenho interesse no imóvel ${property.name}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-4 text-sm font-extrabold tracking-wider uppercase text-center block transition-all"
                    style={{
                      background: GOLD,
                      color: TEAL_DARK,
                      fontFamily: FONT,
                      borderRadius: 10,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = '0.88'
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.opacity = '1'
                      ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    }}
                  >
                    Tenho Interesse
                  </a>
                  <a
                    href="tel:+5547999999999"
                    className="py-4 text-sm font-extrabold tracking-wider uppercase text-center flex items-center justify-center gap-2 transition-all"
                    style={{
                      border: `2px solid ${TEAL}`,
                      color: TEAL,
                      fontFamily: FONT,
                      borderRadius: 10,
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
                    <Phone size={15} />
                    Ligar Agora
                  </a>
                </div>

                {/* Agent info */}
                <div
                  className="px-7 pb-7"
                  style={{ borderTop: '1px solid #EDEBE6' }}
                >
                  <div className="pt-6 flex items-start gap-4">
                    <div
                      className="rounded-full shrink-0 flex items-center justify-center"
                      style={{
                        width: 44,
                        height: 44,
                        background: GRADIENT,
                        padding: 2,
                      }}
                    >
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{ background: TEAL }}
                      >
                        <svg width={23} height={26} viewBox="0 0 26 30" fill="none">
                          <path d="M13 2 L24 11 L24 27 L2 27 L2 11 Z" stroke={GOLD} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
                          <path d="M13 8 L13 20 Q13 24 9.5 24 Q7 24 7 21.5" stroke={GOLD} strokeWidth="1.8" fill="none" strokeLinecap="round" />
                          <line x1="10.5" y1="8" x2="15.5" y2="8" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p
                        className="font-extrabold text-sm mb-0.5"
                        style={{ color: TEAL, fontFamily: FONT }}
                      >
                        Justino Brokers
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: '#999', fontFamily: FONT }}
                      >
                        Soluções Imobiliárias
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 mt-5">
                    {[
                      { Icon: Phone, text: '(47) 9 9999-9999' },
                      { Icon: Mail, text: 'contato@justinobrokers.com.br' },
                    ].map(({ Icon, text }) => (
                      <div
                        key={text}
                        className="flex items-center gap-2.5 text-sm"
                        style={{ color: '#777', fontFamily: FONT }}
                      >
                        <Icon size={13} style={{ color: GOLD }} />
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
          padding: '40px 0',
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

            <div className="flex items-center gap-3">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center transition-all"
                  style={{
                    border: '1px solid rgba(201,160,96,0.2)',
                    color: 'rgba(255,255,255,0.35)',
                    borderRadius: 8,
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
                  <Icon size={15} />
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
