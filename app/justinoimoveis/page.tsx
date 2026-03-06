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
} from 'lucide-react'
import { properties } from './properties'
import type { Property } from './properties'

// ─── Brand tokens ────────────────────────────────────────────────
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
          {/* House outline */}
          <path
            d="M13 2 L24 11 L24 27 L2 27 L2 11 Z"
            stroke={GOLD}
            strokeWidth="1.8"
            fill="none"
            strokeLinejoin="round"
          />
          {/* J mark */}
          <path
            d="M13 8 L13 20 Q13 24 9.5 24 Q7 24 7 21.5"
            stroke={GOLD}
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          {/* J cap */}
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
      className="flex flex-col overflow-hidden bg-white shrink-0"
      style={{
        width: 320,
        boxShadow: '0 4px 24px rgba(22,53,53,0.1)',
      }}
    >
      {/* Photo carousel */}
      <div className="relative overflow-hidden" style={{ height: 200 }}>
        <img
          src={property.photos[photo]}
          alt={property.name}
          className="w-full h-full object-cover"
          style={{ transition: 'opacity 0.3s' }}
        />

        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(13,37,37,0.72)' }}
        >
          <ChevronLeft size={14} color="white" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(13,37,37,0.72)' }}
        >
          <ChevronRight size={14} color="white" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1">
          {property.photos.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.preventDefault()
                setPhoto(i)
              }}
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background:
                  i === photo ? 'white' : 'rgba(255,255,255,0.45)',
              }}
            />
          ))}
        </div>

        {/* Badge */}
        <span
          className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 tracking-widest uppercase"
          style={{ background: GOLD, color: TEAL }}
        >
          {property.operation}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div
          className="flex items-center gap-1 mb-1.5"
          style={{ color: '#999', fontSize: 11 }}
        >
          <MapPin size={11} />
          <span>{property.neighborhood} · Itajaí, SC</span>
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
            borderTop: '1px solid #EAE6DF',
            borderBottom: '1px solid #EAE6DF',
          }}
        >
          {stats.map(({ Icon, val }, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <Icon size={15} style={{ color: GOLD }} />
              <span
                className="font-semibold"
                style={{ color: '#444', fontSize: 11 }}
              >
                {val}
              </span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <p style={{ color: '#aaa', fontSize: 11 }}>Valor</p>
            <p
              className="font-extrabold text-base"
              style={{ color: TEAL }}
            >
              {formatPrice(property.price)}
            </p>
          </div>
          <Link
            href={`/imovel/${property.slug}`}
            className="text-sm font-bold px-4 py-2.5 tracking-wide uppercase transition-opacity hover:opacity-85"
            style={{ background: TEAL, color: 'white', fontFamily: FONT }}
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

  return (
    <div style={{ fontFamily: FONT, background: CREAM }}>
      {/* ── NAVBAR ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{ background: TEAL }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
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
                style={{ color: 'rgba(201,160,96,0.55)', fontFamily: FONT }}
              >
                Soluções Imobiliárias
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {['#imoveis', '#contato'].map((href, i) => (
              <a
                key={href}
                href={href}
                className="text-sm font-semibold tracking-wide transition-colors"
                style={{ color: 'rgba(255,255,255,0.65)', fontFamily: FONT }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = GOLD)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')
                }
              >
                {i === 0 ? 'Imóveis' : 'Contato'}
              </a>
            ))}
            <a
              href="#contato"
              className="text-sm font-extrabold px-5 py-2.5 tracking-widest uppercase transition-opacity hover:opacity-85"
              style={{ background: GOLD, color: TEAL, fontFamily: FONT }}
            >
              Falar Conosco
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
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
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <a
              href="#imoveis"
              className="text-sm font-semibold"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onClick={() => setMenuOpen(false)}
            >
              Imóveis
            </a>
            <a
              href="#contato"
              className="text-sm font-semibold"
              style={{ color: 'rgba(255,255,255,0.7)' }}
              onClick={() => setMenuOpen(false)}
            >
              Contato
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative flex items-center justify-center"
        style={{ minHeight: '100vh' }}
      >
        {/* Background */}
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80"
          alt="Itajaí, Santa Catarina"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(13,37,37,0.45) 0%, rgba(13,37,37,0.65) 50%, rgba(13,37,37,0.92) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 w-full max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10" style={{ background: GOLD }} />
            <span
              className="text-xs font-bold tracking-[0.45em] uppercase"
              style={{ color: GOLD, fontFamily: FONT }}
            >
              Itajaí · Santa Catarina
            </span>
            <div className="h-px w-10" style={{ background: GOLD }} />
          </div>

          <h1
            className="font-black text-4xl md:text-6xl leading-tight mb-4"
            style={{ fontFamily: FONT, letterSpacing: '-0.01em' }}
          >
            Encontre o Imóvel
            <br />
            <span style={{ color: GOLD }}>dos Seus Sonhos</span>
          </h1>
          <p
            className="text-base md:text-lg mb-10"
            style={{ color: 'rgba(255,255,255,0.6)', fontFamily: FONT }}
          >
            Soluções imobiliárias de alto padrão em Itajaí e região
          </p>

          {/* Search form */}
          <div
            className="p-5 md:p-6 mx-auto"
            style={{
              background: 'rgba(13,37,37,0.78)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(201,160,96,0.22)',
              maxWidth: 900,
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {[
                {
                  label: 'Tipo',
                  name: 'op',
                  options: [
                    'Compra / Aluguel',
                    'Compra',
                    'Aluguel',
                  ],
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
                <div key={name} className="flex flex-col gap-1.5 text-left">
                  <label
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: 'rgba(201,160,96,0.65)', fontFamily: FONT }}
                  >
                    {label}
                  </label>
                  <select
                    name={name}
                    className="px-3 py-3 text-sm appearance-none focus:outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(201,160,96,0.22)',
                      color: 'white',
                      fontFamily: FONT,
                    }}
                  >
                    {options.map((o) => (
                      <option
                        key={o}
                        value={o}
                        style={{ background: TEAL, color: 'white' }}
                      >
                        {o}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <button
              className="mt-3 w-full py-3.5 text-sm font-extrabold tracking-widest uppercase flex items-center justify-center gap-2 transition-opacity hover:opacity-85"
              style={{ background: GOLD, color: TEAL, fontFamily: FONT }}
            >
              <Search size={16} />
              Buscar Imóveis
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          <div
            className="w-px animate-pulse"
            style={{ height: 40, background: GOLD }}
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
      <section id="imoveis" style={{ background: CREAM, padding: '80px 0' }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <p
                className="text-xs font-extrabold tracking-[0.4em] uppercase mb-2"
                style={{ color: GOLD, fontFamily: FONT }}
              >
                Seleção Especial
              </p>
              <h2
                className="font-black text-3xl md:text-4xl"
                style={{ color: TEAL, fontFamily: FONT }}
              >
                Imóveis em Destaque
              </h2>
              {/* Gradient underline */}
              <div
                className="mt-3"
                style={{ height: 3, width: 56, background: GRADIENT }}
              />
            </div>

            {/* Desktop nav arrows */}
            <div className="hidden md:flex gap-2">
              {(['left', 'right'] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => scroll(dir)}
                  className="w-11 h-11 flex items-center justify-center transition-all"
                  style={{
                    border: '1.5px solid #DDD8CF',
                    color: TEAL,
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
                    el.style.borderColor = '#DDD8CF'
                  }}
                >
                  {dir === 'left' ? (
                    <ChevronLeft size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: 'none' }}
          >
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>

          {/* Mobile arrows */}
          <div className="flex md:hidden justify-center gap-2 mt-6">
            {(['left', 'right'] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => scroll(dir)}
                className="w-11 h-11 flex items-center justify-center"
                style={{ border: '1.5px solid #DDD8CF', color: TEAL }}
              >
                {dir === 'left' ? (
                  <ChevronLeft size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contato" style={{ background: TEAL, padding: '80px 0' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p
              className="text-xs font-extrabold tracking-[0.4em] uppercase mb-2"
              style={{ color: GOLD, fontFamily: FONT }}
            >
              Entre em Contato
            </p>
            <h2
              className="font-black text-3xl md:text-4xl text-white"
              style={{ fontFamily: FONT }}
            >
              Fale com um Especialista
            </h2>
            <div
              className="mt-3 mx-auto"
              style={{ height: 3, width: 56, background: GRADIENT }}
            />
            <p
              className="mt-4 text-sm"
              style={{ color: 'rgba(255,255,255,0.45)', fontFamily: FONT }}
            >
              Nossa equipe está pronta para encontrar o imóvel ideal para você
            </p>
          </div>

          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  label: 'Nome Completo',
                  type: 'text',
                  placeholder: 'Seu nome',
                },
                {
                  label: 'Telefone / WhatsApp',
                  type: 'tel',
                  placeholder: '(47) 99999-9999',
                },
              ].map(({ label, type, placeholder }) => (
                <div key={label} className="flex flex-col gap-2">
                  <label
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: 'rgba(201,160,96,0.65)', fontFamily: FONT }}
                  >
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    className="px-4 py-3 text-sm focus:outline-none"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(201,160,96,0.2)',
                      color: 'white',
                      fontFamily: FONT,
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'rgba(201,160,96,0.65)', fontFamily: FONT }}
              >
                E-mail
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                className="px-4 py-3 text-sm focus:outline-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(201,160,96,0.2)',
                  color: 'white',
                  fontFamily: FONT,
                }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'rgba(201,160,96,0.65)', fontFamily: FONT }}
              >
                Interesse
              </label>
              <select
                className="px-4 py-3 text-sm focus:outline-none appearance-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(201,160,96,0.2)',
                  color: 'rgba(255,255,255,0.55)',
                  fontFamily: FONT,
                }}
              >
                <option value="" style={{ background: TEAL }}>
                  Selecione...
                </option>
                <option value="comprar" style={{ background: TEAL }}>
                  Quero comprar
                </option>
                <option value="alugar" style={{ background: TEAL }}>
                  Quero alugar
                </option>
                <option value="vender" style={{ background: TEAL }}>
                  Quero vender meu imóvel
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: 'rgba(201,160,96,0.65)', fontFamily: FONT }}
              >
                Mensagem
              </label>
              <textarea
                rows={4}
                placeholder="Descreva o imóvel que você busca..."
                className="px-4 py-3 text-sm focus:outline-none resize-none"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(201,160,96,0.2)',
                  color: 'white',
                  fontFamily: FONT,
                }}
              />
            </div>

            <button
              type="submit"
              className="py-4 text-sm font-extrabold tracking-widest uppercase mt-2 transition-opacity hover:opacity-85"
              style={{ background: GOLD, color: TEAL, fontFamily: FONT }}
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: TEAL_DARK,
          borderTop: '1px solid rgba(201,160,96,0.1)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-5">
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
                style={{
                  color: 'rgba(255,255,255,0.32)',
                  fontFamily: FONT,
                }}
              >
                Especialistas em imóveis de alto padrão em Itajaí e região.
                Realizando sonhos com elegância e excelência.
              </p>
            </div>

            {/* Links */}
            <div>
              <p
                className="text-xs font-extrabold uppercase tracking-widest mb-5"
                style={{ color: 'rgba(201,160,96,0.55)', fontFamily: FONT }}
              >
                Navegação
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { href: '/justinoimoveis', label: 'Início' },
                  { href: '#imoveis', label: 'Imóveis em Destaque' },
                  { href: '#contato', label: 'Falar com Especialista' },
                ].map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-sm font-medium transition-colors"
                    style={{ color: 'rgba(255,255,255,0.32)', fontFamily: FONT }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = GOLD)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'rgba(255,255,255,0.32)')
                    }
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <p
                className="text-xs font-extrabold uppercase tracking-widest mb-5"
                style={{ color: 'rgba(201,160,96,0.55)', fontFamily: FONT }}
              >
                Contato
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { Icon: Phone, text: '(47) 9 9999-9999' },
                  { Icon: Mail, text: 'contato@justinobrokers.com.br' },
                  { Icon: MapPin, text: 'Itajaí, Santa Catarina' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <Icon size={13} style={{ color: GOLD, flexShrink: 0 }} />
                    <span
                      className="text-sm"
                      style={{
                        color: 'rgba(255,255,255,0.38)',
                        fontFamily: FONT,
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ))}

                {/* Social */}
                <div className="flex gap-2 mt-1">
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
              </div>
            </div>
          </div>

          <div
            className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
            style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <p
              className="text-xs"
              style={{
                color: 'rgba(255,255,255,0.18)',
                fontFamily: FONT,
              }}
            >
              © {new Date().getFullYear()} Justino Brokers · Todos os direitos
              reservados.
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
