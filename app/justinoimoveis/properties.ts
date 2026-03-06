export interface Property {
  id: number
  slug: string
  name: string
  type: 'Apartamento' | 'Casa' | 'Terreno'
  operation: 'Compra' | 'Aluguel'
  neighborhood: string
  city: string
  area: number
  bedrooms: number
  bathrooms: number
  parking: number
  price: number
  description: string
  photos: string[]
}

export const properties: Property[] = [
  {
    id: 1,
    slug: 'marina-vista-cabecudas',
    name: 'Marina Vista',
    type: 'Apartamento',
    operation: 'Compra',
    neighborhood: 'Cabeçudas',
    city: 'Itajaí',
    area: 120,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    price: 850000,
    description:
      'Luxuoso apartamento com vista privilegiada para o mar em Cabeçudas. Acabamento de alto padrão, cozinha gourmet e varanda espaçosa com vista direta para o oceano. Condomínio com piscina e academia.',
    photos: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80',
    ],
  },
  {
    id: 2,
    slug: 'beira-mar-premium-centro',
    name: 'Beira Mar Premium',
    type: 'Apartamento',
    operation: 'Compra',
    neighborhood: 'Centro',
    city: 'Itajaí',
    area: 85,
    bedrooms: 2,
    bathrooms: 2,
    parking: 1,
    price: 620000,
    description:
      'Apartamento moderno no coração de Itajaí, a poucos metros da orla. Design contemporâneo, janelas amplas e localização privilegiada para quem valoriza praticidade e estilo.',
    photos: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    ],
  },
  {
    id: 3,
    slug: 'alto-padrao-itaipava',
    name: 'Alto Padrão Itaipava',
    type: 'Apartamento',
    operation: 'Compra',
    neighborhood: 'Itaipava',
    city: 'Itajaí',
    area: 180,
    bedrooms: 4,
    bathrooms: 3,
    parking: 3,
    price: 1200000,
    description:
      'Espaçoso apartamento de alto padrão em Itaipava. Amplas áreas sociais, suíte master com closet, sacada gourmet e vista panorâmica da cidade. Acabamento impecável.',
    photos: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
    ],
  },
  {
    id: 4,
    slug: 'reserva-fazenda-exclusive',
    name: 'Reserva Fazenda',
    type: 'Apartamento',
    operation: 'Compra',
    neighborhood: 'Fazenda',
    city: 'Itajaí',
    area: 130,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    price: 780000,
    description:
      'Apartamento exclusivo no bairro Fazenda com infraestrutura completa de lazer, portaria 24h e acabamento premium. Área de lazer com piscina, churrasqueira e salão de festas.',
    photos: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&q=80',
    ],
  },
  {
    id: 5,
    slug: 'penthouse-sao-joao',
    name: 'Penthouse São João',
    type: 'Apartamento',
    operation: 'Compra',
    neighborhood: 'São João',
    city: 'Itajaí',
    area: 150,
    bedrooms: 3,
    bathrooms: 3,
    parking: 2,
    price: 950000,
    description:
      'Cobertura duplex com terraço privativo no São João. Piscina privada, churrasqueira exclusiva e vista de 360° da cidade. O máximo em sofisticação e privacidade.',
    photos: [
      'https://images.unsplash.com/photo-1560184897-ae75f418493e?w=800&q=80',
      'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=80',
    ],
  },
  {
    id: 6,
    slug: 'garden-suite-cordeiros',
    name: 'Garden Suite Cordeiros',
    type: 'Apartamento',
    operation: 'Compra',
    neighborhood: 'Cordeiros',
    city: 'Itajaí',
    area: 72,
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    price: 480000,
    description:
      'Charmoso apartamento térreo com garden privativo em Cordeiros. Ideal para quem busca conforto, tranquilidade e contato com a natureza em ambiente seguro e bem localizado.',
    photos: [
      'https://images.unsplash.com/photo-1623298317883-6b70254edf31?w=800&q=80',
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    ],
  },
  {
    id: 7,
    slug: 'terraco-limoeiro-residencial',
    name: 'Terraço Limoeiro',
    type: 'Apartamento',
    operation: 'Compra',
    neighborhood: 'Limoeiro',
    city: 'Itajaí',
    area: 110,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    price: 690000,
    description:
      'Sofisticado apartamento com terraço gourmet no Limoeiro. Condomínio completo com academia, piscina, salão de festas e espaço kids. Ótima localização e fácil acesso.',
    photos: [
      'https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1560440021-33f9b867899d?w=800&q=80',
    ],
  },
  {
    id: 8,
    slug: 'excellence-barra-do-rio',
    name: 'Excellence Barra do Rio',
    type: 'Apartamento',
    operation: 'Compra',
    neighborhood: 'Barra do Rio',
    city: 'Itajaí',
    area: 220,
    bedrooms: 4,
    bathrooms: 4,
    parking: 3,
    price: 1650000,
    description:
      'Majestoso apartamento no exclusivo condomínio Excellence à beira do rio em Barra do Rio. O ponto mais alto em luxo e sofisticação de Itajaí. Vista privilegiada, acabamento importado.',
    photos: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80',
    ],
  },
]
