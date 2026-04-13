'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { getMedusaClient } from '@/lib/medusa-client'
import {
  CheckCircle2,
  Zap,
  ArrowRight,
  Globe,
  Shield,
  Clock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Variant {
  id: string
  title: string
  calculated_price?: {
    calculated_amount: number
    currency_code: string
  }
}

interface Product {
  id: string
  title: string
  handle: string
  description?: string
  subtitle?: string
  variants?: Variant[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(amount / 100)
}

function isHighlight(title: string) {
  return title.toLowerCase().includes('business') || title.toLowerCase().includes('pro')
}

const PLAN_FEATURES: Record<string, string[]> = {
  default: [
    '2 500 geocoding / mois',
    'Lat / Lng + adresse formatée',
    'Timezone & County FIPS',
    'Support e-mail',
    'Dashboard usage',
    'Reverse geocoding inclus',
  ],
  business: [
    'Lookups illimités',
    'Tous les append fields',
    'Congressional district',
    'Census tract',
    'Batch CSV illimité',
    'Webhooks & callbacks',
    'Support prioritaire (4h)',
    'SLA 99.9%',
    'Dashboard analytics',
    'Multi-environnements',
  ],
  enterprise: [
    'Volume sur-mesure',
    'Tous les champs append',
    'Intégration sur-mesure',
    'Account manager dédié',
    'SLA personnalisé',
    'Formation & onboarding',
    'Support téléphonique 24/7',
  ],
}

function getPlanFeatures(title: string): string[] {
  const l = title.toLowerCase()
  if (l.includes('enterprise') || l.includes('entreprise')) return PLAN_FEATURES.enterprise
  if (l.includes('business') || l.includes('pro') || l.includes('professional')) return PLAN_FEATURES.business
  return PLAN_FEATURES.default
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Qu'est-ce qu'un lookup ?",
    a: "Un lookup correspond à une requête de géocodage : vous envoyez une adresse, l'API retourne les coordonnées et les champs append. Chaque adresse traitée compte comme un lookup.",
  },
  {
    q: 'Les lookups non utilisés sont-ils reportés ?',
    a: "Non, les lookups se réinitialisent chaque mois. Ils ne sont pas cumulables. Si vous avez des besoins variables, contactez-nous pour un plan Enterprise sur-mesure.",
  },
  {
    q: "Qu'est-ce que le reverse geocoding ?",
    a: "Le reverse geocoding convertit des coordonnées GPS (lat, lng) en adresse lisible. Inclus dans tous les plans sans surcoût.",
  },
  {
    q: 'Puis-je changer de plan en cours de mois ?',
    a: "Oui. La mise à niveau est instantanée et vous êtes facturé au prorata. Le retour à un plan inférieur prend effet au prochain cycle de facturation.",
  },
  {
    q: 'Quels pays sont couverts ?',
    a: "Nous couvrons les États-Unis, le Canada, le Maroc et plus de 50 pays. La couverture est maximale pour l'Amérique du Nord. Pour les autres pays, la précision peut varier.",
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 text-left text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors"
      >
        {q}
        {open ? <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" /> : <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />}
      </button>
      {open && <p className="pb-4 text-sm text-slate-500 leading-relaxed">{a}</p>}
    </div>
  )
}

// ─── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({ product }: { product: Product }) {
  const highlight = isHighlight(product.title)
  const variant = product.variants?.[0]
  const price = variant?.calculated_price
  const priceFormatted = price
    ? formatPrice(price.calculated_amount, price.currency_code)
    : null
  const features = getPlanFeatures(product.title)

  return (
    <div
      className={`relative flex flex-col rounded-2xl border transition-all ${
        highlight
          ? 'bg-blue-600 border-blue-500 shadow-2xl shadow-blue-500/20 scale-[1.03] text-white'
          : 'bg-white border-slate-200 shadow-sm hover:border-blue-200 hover:shadow-md'
      }`}
    >
      {highlight && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-blue-600 text-xs font-bold rounded-full uppercase tracking-widest shadow-sm">
          ⭐ Populaire
        </div>
      )}

      <div className="p-8 flex-1">
        {/* Plan name */}
        <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${highlight ? 'text-blue-200' : 'text-slate-400'}`}>
          {product.subtitle || 'API Plan'}
        </p>
        <h3 className={`text-xl font-heading font-bold mb-1 ${highlight ? 'text-white' : 'text-slate-900'}`}>
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-end gap-1 mt-4 mb-2">
          {priceFormatted ? (
            <>
              <span className={`text-4xl font-bold font-heading ${highlight ? 'text-white' : 'text-slate-900'}`}>
                {priceFormatted}
              </span>
              <span className={`text-sm mb-1.5 ${highlight ? 'text-blue-200' : 'text-slate-400'}`}>/mois</span>
            </>
          ) : (
            <span className={`text-2xl font-bold font-heading ${highlight ? 'text-white' : 'text-slate-900'}`}>
              Sur devis
            </span>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <p className={`text-sm mb-6 leading-relaxed ${highlight ? 'text-blue-100' : 'text-slate-500'}`}>
            {product.description}
          </p>
        )}

        {/* Features */}
        <ul className="space-y-2.5 mb-8">
          {features.map((f) => (
            <li key={f} className={`flex items-center gap-2.5 text-sm ${highlight ? 'text-blue-50' : 'text-slate-600'}`}>
              <CheckCircle2 className={`h-4 w-4 shrink-0 ${highlight ? 'text-white' : 'text-blue-500'}`} />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="px-8 pb-8">
        <Link
          href={`/products/${product.handle}`}
          className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-colors ${
            highlight
              ? 'bg-white text-blue-600 hover:bg-blue-50'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Choisir ce plan
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  const { data: regionData } = useQuery({
    queryKey: ['region'],
    queryFn: async () => {
      const res = await getMedusaClient().store.region.list()
      return res.regions?.[0] || null
    },
  })

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', regionData?.id],
    queryFn: async () => {
      if (!regionData?.id) return []
      const res = await getMedusaClient().store.product.list({
        limit: 20,
        region_id: regionData.id,
        fields: '*variants.calculated_price',
      })
      return (res.products || []) as Product[]
    },
    enabled: !!regionData?.id,
  })

  return (
    <>
      {/* ── Page header ── */}
      <section className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="container-custom py-20 lg:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <Zap className="h-3 w-3" />
            Plans & Tarifs
          </div>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-balance leading-tight mb-6">
            Simple, transparent,<br />
            <span className="text-blue-400">sans surprise</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto mb-10">
            Commencez gratuitement avec 2 500 lookups. Passez au niveau supérieur quand vous avez besoin de plus.
          </p>

          {/* Trust */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
            {[
              { icon: <Shield className="h-4 w-4 text-blue-400" />, label: 'SLA 99.9%' },
              { icon: <Clock className="h-4 w-4 text-blue-400" />, label: 'Latence < 50ms' },
              { icon: <Globe className="h-4 w-4 text-blue-400" />, label: '50+ pays' },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-2">{icon}{label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free plan banner ── */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="container-custom py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-white font-semibold">🎁 Plan Gratuit disponible</p>
              <p className="text-slate-400 text-sm">2 500 lookups/mois · Aucune carte bancaire requise</p>
            </div>
            <Link
              href="/auth/register"
              className="shrink-0 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-colors"
            >
              Commencer gratuitement →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Plans grid ── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container-custom">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[500px] bg-slate-200 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className={`grid gap-6 max-w-5xl mx-auto ${
              products.length === 1 ? 'max-w-sm' :
              products.length === 2 ? 'sm:grid-cols-2 max-w-3xl' :
              'sm:grid-cols-2 lg:grid-cols-3'
            }`}>
              {products.map((product) => (
                <PlanCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg">Aucun plan disponible pour le moment.</p>
              <Link href="/contact" className="mt-4 inline-block text-blue-600 hover:underline text-sm">
                Contactez-nous pour un devis →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Compare table ── */}
      <section className="py-16 lg:py-20 bg-white border-t border-slate-100">
        <div className="container-custom max-w-4xl">
          <h2 className="text-2xl font-heading font-bold text-slate-900 mb-10 text-center">
            Comparaison des fonctionnalités
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-6 py-4 text-slate-700 font-semibold w-1/3">Fonctionnalité</th>
                  <th className="text-center px-4 py-4 text-slate-700 font-semibold">Free</th>
                  <th className="text-center px-4 py-4 text-blue-600 font-bold bg-blue-50">Business</th>
                  <th className="text-center px-4 py-4 text-slate-700 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ['Lookups / mois', '2 500', 'Illimités', 'Sur-mesure'],
                  ['Lat / Lng + adresse', '✅', '✅', '✅'],
                  ['Reverse geocoding', '✅', '✅', '✅'],
                  ['Timezone', '✅', '✅', '✅'],
                  ['Congressional district', '❌', '✅', '✅'],
                  ['Census tract', '❌', '✅', '✅'],
                  ['State legislature', '❌', '✅', '✅'],
                  ['School district', '❌', '✅', '✅'],
                  ['County FIPS', '✅', '✅', '✅'],
                  ['ZIP+4', '❌', '✅', '✅'],
                  ['Batch CSV upload', 'Limité', 'Illimité', 'Illimité'],
                  ['Webhooks', '❌', '✅', '✅'],
                  ['Support', 'Communauté', 'Prioritaire 4h', 'Téléphone 24/7'],
                  ['SLA', '99.5%', '99.9%', 'Personnalisé'],
                ].map(([feature, free, business, enterprise]) => (
                  <tr key={feature} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3.5 text-slate-700 font-medium">{feature}</td>
                    <td className="px-4 py-3.5 text-center text-slate-500">{free}</td>
                    <td className="px-4 py-3.5 text-center text-slate-800 font-semibold bg-blue-50/40">{business}</td>
                    <td className="px-4 py-3.5 text-center text-slate-500">{enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 lg:py-20 bg-slate-50 border-t border-slate-100">
        <div className="container-custom max-w-2xl">
          <h2 className="text-2xl font-heading font-bold text-slate-900 mb-8 text-center">
            Questions fréquentes
          </h2>
          <div className="bg-white rounded-2xl border border-slate-200 px-6 divide-y divide-slate-100">
            {faqs.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container-custom max-w-xl">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Prêt à démarrer ?
          </h2>
          <p className="text-blue-100 mb-8">
            2 500 lookups gratuits. API key en 30 secondes. Aucune carte bancaire.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors"
            >
              Créer un compte gratuit
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Parler à un expert
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
