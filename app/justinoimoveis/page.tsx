'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
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
  Instagram,
  Facebook,
  Search,
  Menu,
  X,
  Award,
  Building2,
  Star,
} from 'lucide-react'
import { properties } from './properties'
import type { Property } from './properties'

// ─── Brand tokens ────────────────────────────────────────────────
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

// ─── Logo ────────────────────────────────────────────────────────
function Logo({ size = 46 }: { size?: number }) {
  return (
    <div
      className="rounded-full shrink-0 flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: GRADIENT,
        padding: 2,
      }}
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

// ─── Property Card ───────────────────────────────────────────────
function PropertyCard({ property }: { property: Property }) {
  const [photo, setPhoto] = useState(0)
  const [hovered, setHovered] = useState(false)

  const prev = (e: React.MouseEvent) => {
    e.preventDefault()
    setPhoto((p) => (p - 1 + property.photos.length) % property.photos.length)
  }
  const next = (e: React.MouseEvent) => {
    e.preventDefault()
    setPhoto((p) => (p + 1) % property.photos.length)
  }

  const stats = [
    { Icon: Ruler, val: `${property.area}m²` },
    { Icon: BedDouble, val: `${property.bedrooms} qts` },
    { Icon: Car, val: `${property.parking} vgs` },
    { Icon: Bath, val: `${property.bathrooms} ban` },
  ]

  return (
    <div
      className="flex flex-col overflow-hidden shrink-0 transition-all duration-300"
      style={{
        width: 320,
        background: '#FFFFFF',
        borderRadius: 16,
        boxShadow: hovered
          ? '0 20px 48px rgba(22,53,53,0.18)'
          : '0 4px 20px rgba(22,53,53,0.08)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo carousel */}
      <div className="relative overflow-hidden" style={{ height: 210, borderRadius: '16px 16px 0 0' }}>
        <img
          src={property.photos[photo]}
          alt={property.name}
          className="w-full h-full object-cover"
          style={{
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />

        {/* Dark gradient bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 40%, rgba(13,37,37,0.5) 100%)',
          }}
        />

        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{ background: 'rgba(13,37,37,0.7)', backdropFilter: 'blur(4px)' }}
        >
          <ChevronLeft size={15} color="white" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{ background: 'rgba(13,37,37,0.7)', backdropFilter: 'blur(4px)' }}
        >
          <ChevronRight size={15} color="white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
          {property.photos.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.preventDefault(); setPhoto(i) }}
              className="rounded-full transition-all"
              style={{
                width: i === photo ? 16 : 6,
                height: 6,
                background: i === photo ? GOLD : 'rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </div>

        {/* Operation Badge */}
        <span
          className="absolute top-3 left-3 text-xs font-bold px-3 py-1 tracking-wider uppercase"
          style={{
            background: GOLD,
            color: TEAL_DARK,
            borderRadius: 6,
            fontFamily: FONT,
          }}
        >
          {property.operation}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div
          className="flex items-center gap-1.5 mb-2"
          style={{ color: '#888', fontSize: 12 }}
        >
          <MapPin size={12} style={{ color: GOLD }} />
          <span style={{ fontFamily: FONT }}>{property.neighborhood} · {property.city}, SC</span>
        </div>

        <h3
          className="font-bold text-base leading-snug mb-4"
          style={{ color: TEAL, fontFamily: FONT }}
        >
          {property.name}
        </h3>

        {/* Stats grid */}
        <div
          className="grid grid-cols-4 gap-1 py-3 mb-4"
          style={{
            borderTop: '1px solid #EDEBE6',
            borderBottom: '1px solid #EDEBE6',
          }}
        >
          {stats.map(({ Icon, val }, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <Icon size={14} style={{ color: GOLD }} />
              <span
                className="font-semibold"
                style={{ color: '#555', fontSize: 11, fontFamily: FONT }}
              >
                {val}
              </span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <p style={{ color: '#aaa', fontSize: 11, fontFamily: FONT }}>Valor</p>
            <p
              className="font-extrabold text-base"
              style={{ color: TEAL, fontFamily: FONT }}
            >
              {formatPrice(property.price)}
            </p>
          </div>
          <Link
            href={`/imovel/${property.slug}`}
            className="text-sm font-bold px-5 py-2.5 tracking-wide uppercase transition-all"
            style={{
              background: TEAL,
              color: 'white',
              fontFamily: FONT,
              borderRadius: 8,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = GOLD
              ;(e.currentTarget as HTMLElement).style.color = TEAL_DARK
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = TEAL
              ;(e.currentTarget as HTMLElement).style.color = 'white'
            }}
          >
            Ver mais
          </Link>
        </div>
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────
export default function JustinoBrokersHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    carouselRef.current?.scrollBy({
      left: dir === 'left' ? -340 : 340,
      behavior: 'smooth',
    })
  }

  const stats = [
    { Icon: Award, number: '15+', label: 'Anos de Experiência', desc: 'Referência no mercado imobiliário de Itajaí' },
    { Icon: Building2, number: '200+', label: 'Imóveis Negociados', desc: 'Portfólio diversificado de alto padrão' },
    { Icon: Star, number: '98%', label: 'Clientes Satisfeitos', desc: 'Excelência em atendimento e resultados' },
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
            <Logo size={46} />
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

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { href: '#imoveis', label: 'Imóveis' },
              { href: '#sobre', label: 'Sobre' },
              { href: '#contato', label: 'Contato' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm font-medium tracking-wide transition-colors relative group"
                style={{ color: 'rgba(255,255,255,0.6)', fontFamily: FONT }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {label}
              </a>
            ))}
            <a
              href="#contato"
              className="text-sm font-bold px-6 py-2.5 tracking-widest uppercase transition-all"
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

          {/* Mobile toggle */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: 'white' }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden px-6 py-5 flex flex-col gap-4"
            style={{
              background: TEAL_DARK,
              borderTop: '1px solid rgba(201,160,96,0.1)',
            }}
          >
            {[
              { href: '#imoveis', label: 'Imóveis' },
              { href: '#sobre', label: 'Sobre' },
              { href: '#contato', label: 'Contato' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm font-semibold py-1"
                style={{ color: 'rgba(255,255,255,0.7)', fontFamily: FONT }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href="#contato"
              className="text-sm font-bold px-5 py-3 text-center tracking-widest uppercase mt-1"
              style={{
                background: GOLD,
                color: TEAL_DARK,
                fontFamily: FONT,
                borderRadius: 8,
              }}
              onClick={() => setMenuOpen(false)}
            >
              Falar Conosco
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: '100vh' }}
      >
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80"
          alt="Itajaí, Santa Catarina"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(9,28,28,0.5) 0%, rgba(9,28,28,0.62) 40%, rgba(9,28,28,0.9) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 w-full max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div
              className="h-px w-12"
              style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }}
            />
            <span
              className="text-xs font-bold tracking-[0.5em] uppercase"
              style={{ color: GOLD, fontFamily: FONT }}
            >
              Itajaí · Santa Catarina
            </span>
            <div
              className="h-px w-12"
              style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }}
            />
          </div>

          <h1
            className="font-black leading-[1.05] mb-6"
            style={{
              fontFamily: FONT,
              fontSize: 'clamp(2.6rem, 6vw, 5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Encontre o Imóvel
            <br />
            <span style={{ color: GOLD }}>dos Seus Sonhos</span>
          </h1>

          <p
            className="text-base md:text-lg mb-12 mx-auto"
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontFamily: FONT,
              maxWidth: 500,
              lineHeight: 1.7,
            }}
          >
            Soluções imobiliárias de alto padrão em Itajaí e região
          </p>

          {/* Search form */}
          <div
            className="p-6 md:p-7 mx-auto"
            style={{
              background: 'rgba(9,28,28,0.82)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(201,160,96,0.2)',
              borderRadius: 16,
              maxWidth: 920,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                {
                  label: 'Operação',
                  name: 'op',
                  options: ['Compra / Aluguel', 'Compra', 'Aluguel'],
                },
                {
                  label: 'Tipo de Imóvel',
                  name: 'type',
                  options: ['Todos', 'Apartamento', 'Casa', 'Terreno'],
                },
                {
                  label: 'Cidade',
                  name: 'city',
                  options: ['Itajaí - SC'],
                },
                {
                  label: 'Bairro',
                  name: 'bairro',
                  options: [
                    'Todos os Bairros',
                    'Barra do Rio',
                    'Cabeçudas',
                    'Centro',
                    'Cordeiros',
                    'Dom Bosco',
                    'Espinheiros',
                    'Fazenda',
                    'Itaipava',
                    'Limoeiro',
                    'Murta',
                    'São João',
                  ],
                },
              ].map(({ label, name, options }) => (
                <div key={name} className="flex flex-col gap-2 text-left">
                  <label
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: 'rgba(201,160,96,0.6)', fontFamily: FONT }}
                  >
                    {label}
                  </label>
                  <select
                    name={name}
                    className="px-4 py-3 text-sm appearance-none focus:outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(201,160,96,0.2)',
                      color: 'rgba(255,255,255,0.85)',
                      fontFamily: FONT,
                      borderRadius: 8,
                    }}
                  >
                    {options.map((o) => (
                      <option key={o} value={o} style={{ background: TEAL_DARK, color: 'white' }}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <button
              className="mt-5 w-full py-4 text-sm font-extrabold tracking-widest uppercase flex items-center justify-center gap-2 transition-all"
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
              <Search size={16} />
              Buscar Imóveis
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          <div
            className="w-px animate-pulse"
            style={{ height: 44, background: `linear-gradient(to bottom, ${GOLD}, transparent)` }}
          />
          <span
            className="text-xs tracking-widest uppercase font-medium"
            style={{ fontFamily: FONT }}
          >
            Explorar
          </span>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section id="imoveis" style={{ background: CREAM, padding: '96px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-end justify-between mb-14">
            <div>
              <p
                className="text-xs font-extrabold tracking-[0.45em] uppercase mb-3"
                style={{ color: GOLD, fontFamily: FONT }}
              >
                Seleção Especial
              </p>
              <h2
                className="font-black text-3xl md:text-4xl leading-tight"
                style={{ color: TEAL, fontFamily: FONT }}
              >
                Imóveis em Destaque
              </h2>
              <div
                className="mt-4"
                style={{ height: 3, width: 64, background: GRADIENT, borderRadius: 2 }}
              />
            </div>

            {/* Desktop nav arrows */}
            <div className="hidden md:flex gap-3">
              {(['left', 'right'] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => scroll(dir)}
                  className="w-12 h-12 flex items-center justify-center transition-all"
                  style={{
                    border: `1.5px solid rgba(22,53,53,0.2)`,
                    color: TEAL,
                    borderRadius: 10,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = TEAL
                    el.style.color = 'white'
                    el.style.borderColor = TEAL
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.background = ''
                    el.style.color = TEAL
                    el.style.borderColor = 'rgba(22,53,53,0.2)'
                  }}
                >
                  {dir === 'left' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
              ))}
            </div>
          </div>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-6"
            style={{ scrollbarWidth: 'none' }}
          >
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>

          {/* Mobile arrows */}
          <div className="flex md:hidden justify-center gap-3 mt-6">
            {(['left', 'right'] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                className="w-12 h-12 flex items-center justify-center"
                style={{ border: '1.5px solid rgba(22,53,53,0.2)', color: TEAL, borderRadius: 10 }}
              >
                {dir === 'left' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY JUSTINO BROKERS ── */}
      <section
        id="sobre"
        style={{
          background: TEAL_DARK,
          padding: '96px 0',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-16">
            <p
              className="text-xs font-extrabold tracking-[0.45em] uppercase mb-3"
              style={{ color: GOLD, fontFamily: FONT }}
            >
              Nossa Expertise
            </p>
            <h2
              className="font-black text-3xl md:text-4xl text-white"
              style={{ fontFamily: FONT }}
            >
              Por que escolher a Justino Brokers?
            </h2>
            <div
              className="mt-4 mx-auto"
              style={{ height: 3, width: 64, background: GRADIENT, borderRadius: 2 }}
            />
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map(({ Icon, number, label, desc }) => (
              <div
                key={label}
                className="text-center p-10 transition-all"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(201,160,96,0.15)',
                  borderRadius: 16,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(201,160,96,0.07)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,160,96,0.35)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(201,160,96,0.15)'
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: 'rgba(201,160,96,0.12)', border: `1px solid rgba(201,160,96,0.25)` }}
                >
                  <Icon size={22} style={{ color: GOLD }} />
                </div>
                <p
                  className="font-black text-5xl mb-2"
                  style={{ color: GOLD, fontFamily: FONT, lineHeight: 1 }}
                >
                  {number}
                </p>
                <p
                  className="font-bold text-base mb-3"
                  style={{ color: 'white', fontFamily: FONT }}
                >
                  {label}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'rgba(255,255,255,0.4)', fontFamily: FONT }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contato" style={{ background: CREAM, padding: '96px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left – Info */}
            <div>
              <p
                className="text-xs font-extrabold tracking-[0.45em] uppercase mb-3"
                style={{ color: GOLD, fontFamily: FONT }}
              >
                Entre em Contato
              </p>
              <h2
                className="font-black text-3xl md:text-4xl mb-4 leading-tight"
                style={{ color: TEAL, fontFamily: FONT }}
              >
                Fale com um<br />Especialista
              </h2>
              <div
                className="mb-8"
                style={{ height: 3, width: 64, background: GRADIENT, borderRadius: 2 }}
              />
              <p
                className="text-base leading-relaxed mb-10"
                style={{ color: '#666', fontFamily: FONT, maxWidth: 420 }}
              >
                Nossa equipe está pronta para encontrar o imóvel ideal para você. Atendimento personalizado e consultoria especializada no mercado de Itajaí.
              </p>

              {/* Contact details */}
              <div className="flex flex-col gap-5 mb-10">
                {[
                  { Icon: Phone, text: '(47) 9 9999-9999', label: 'Telefone / WhatsApp' },
                  { Icon: Mail, text: 'contato@justinobrokers.com.br', label: 'E-mail' },
                  { Icon: MapPin, text: 'Itajaí, Santa Catarina', label: 'Localização' },
                ].map(({ Icon, text, label }) => (
                  <div key={text} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: 'rgba(22,53,53,0.08)' }}
                    >
                      <Icon size={16} style={{ color: GOLD }} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#aaa', fontFamily: FONT }}>
                        {label}
                      </p>
                      <p className="text-sm font-semibold" style={{ color: TEAL, fontFamily: FONT }}>
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="flex gap-3">
                {[
                  { Icon: Instagram, label: 'Instagram' },
                  { Icon: Facebook, label: 'Facebook' },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="w-10 h-10 flex items-center justify-center transition-all"
                    style={{
                      border: `1.5px solid rgba(22,53,53,0.2)`,
                      color: TEAL,
                      borderRadius: 8,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = TEAL
                      el.style.color = 'white'
                      el.style.borderColor = TEAL
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = ''
                      el.style.color = TEAL
                      el.style.borderColor = 'rgba(22,53,53,0.2)'
                    }}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Right – Form */}
            <div
              className="p-8 md:p-10"
              style={{
                background: '#FFFFFF',
                borderRadius: 20,
                boxShadow: '0 8px 40px rgba(22,53,53,0.1)',
                border: '1px solid rgba(22,53,53,0.06)',
              }}
            >
              <h3
                className="font-bold text-xl mb-6"
                style={{ color: TEAL, fontFamily: FONT }}
              >
                Envie sua mensagem
              </h3>

              <form className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { label: 'Nome Completo', type: 'text', placeholder: 'Seu nome' },
                    { label: 'Telefone / WhatsApp', type: 'tel', placeholder: '(47) 99999-9999' },
                  ].map(({ label, type, placeholder }) => (
                    <div key={label} className="flex flex-col gap-2">
                      <label
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{ color: '#888', fontFamily: FONT }}
                      >
                        {label}
                      </label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        className="px-4 py-3 text-sm focus:outline-none transition-all"
                        style={{
                          background: CREAM,
                          border: '1.5px solid #E8E4DC',
                          color: TEAL,
                          fontFamily: FONT,
                          borderRadius: 8,
                        }}
                        onFocus={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = GOLD
                        }}
                        onBlur={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = '#E8E4DC'
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: '#888', fontFamily: FONT }}
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="px-4 py-3 text-sm focus:outline-none transition-all"
                    style={{
                      background: CREAM,
                      border: '1.5px solid #E8E4DC',
                      color: TEAL,
                      fontFamily: FONT,
                      borderRadius: 8,
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = GOLD
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#E8E4DC'
                    }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: '#888', fontFamily: FONT }}
                  >
                    Interesse
                  </label>
                  <select
                    className="px-4 py-3 text-sm focus:outline-none appearance-none transition-all"
                    style={{
                      background: CREAM,
                      border: '1.5px solid #E8E4DC',
                      color: TEAL,
                      fontFamily: FONT,
                      borderRadius: 8,
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = GOLD
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#E8E4DC'
                    }}
                  >
                    <option value="">Selecione...</option>
                    <option value="comprar">Quero comprar</option>
                    <option value="alugar">Quero alugar</option>
                    <option value="vender">Quero vender meu imóvel</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: '#888', fontFamily: FONT }}
                  >
                    Mensagem
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Descreva o imóvel que você busca..."
                    className="px-4 py-3 text-sm focus:outline-none resize-none transition-all"
                    style={{
                      background: CREAM,
                      border: '1.5px solid #E8E4DC',
                      color: TEAL,
                      fontFamily: FONT,
                      borderRadius: 8,
                    }}
                    onFocus={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = GOLD
                    }}
                    onBlur={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#E8E4DC'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="py-4 text-sm font-extrabold tracking-widest uppercase mt-1 transition-all"
                  style={{
                    background: TEAL,
                    color: 'white',
                    fontFamily: FONT,
                    borderRadius: 10,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = GOLD
                    ;(e.currentTarget as HTMLElement).style.color = TEAL_DARK
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = TEAL
                    ;(e.currentTarget as HTMLElement).style.color = 'white'
                  }}
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: TEAL_DARK,
          borderTop: '1px solid rgba(201,160,96,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Logo size={46} />
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
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.3)', fontFamily: FONT, maxWidth: 280 }}
              >
                Especialistas em imóveis de alto padrão em Itajaí e região. Realizando sonhos com elegância e excelência.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <p
                className="text-xs font-extrabold uppercase tracking-widest mb-6"
                style={{ color: 'rgba(201,160,96,0.5)', fontFamily: FONT }}
              >
                Navegação
              </p>
              <div className="flex flex-col gap-3.5">
                {[
                  { href: '/justinoimoveis', label: 'Início' },
                  { href: '#imoveis', label: 'Imóveis em Destaque' },
                  { href: '#sobre', label: 'Sobre Nós' },
                  { href: '#contato', label: 'Falar com Especialista' },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-sm font-medium transition-colors"
                    style={{ color: 'rgba(255,255,255,0.3)', fontFamily: FONT }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p
                className="text-xs font-extrabold uppercase tracking-widest mb-6"
                style={{ color: 'rgba(201,160,96,0.5)', fontFamily: FONT }}
              >
                Contato
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { Icon: Phone, text: '(47) 9 9999-9999' },
                  { Icon: Mail, text: 'contato@justinobrokers.com.br' },
                  { Icon: MapPin, text: 'Itajaí, Santa Catarina' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <Icon size={14} style={{ color: GOLD, flexShrink: 0 }} />
                    <span
                      className="text-sm"
                      style={{ color: 'rgba(255,255,255,0.35)', fontFamily: FONT }}
                    >
                      {text}
                    </span>
                  </div>
                ))}

                <div className="flex gap-2.5 mt-1">
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
              </div>
            </div>
          </div>

          <div
            className="mt-12 pt-7 flex flex-col md:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <p
              className="text-xs"
              style={{ color: 'rgba(255,255,255,0.18)', fontFamily: FONT }}
            >
              © {new Date().getFullYear()} Justino Brokers · Todos os direitos reservados.
            </p>
            <p
              className="text-xs"
              style={{ color: 'rgba(255,255,255,0.18)', fontFamily: FONT }}
            >
              CRECI · SC-XXXXX
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
