import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600
import { medusaServerClient } from '@/lib/medusa-client'
import Link from 'next/link'
import {
  ChevronRight,
  CheckCircle2,
  Zap,
  Database,
  Globe,
  Code2,
  Shield,
  Clock,
  BarChart3,
  ArrowRight,
} from 'lucide-react'
import GeocodeDemo from '@/components/geocode/geocode-demo'
import { ProductViewTracker } from '@/components/product/product-view-tracker'
import { type VariantExtension } from '@/components/product/product-price'
import ProductActions from '@/components/product/product-actions'

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getProduct(handle: string) {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) throw new Error('No region found')

    const response = await medusaServerClient.store.product.list({
      handle,
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    return response.products?.[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getVariantExtensions(productId: string): Promise<Record<string, VariantExtension>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const storeId = process.env.NEXT_PUBLIC_STORE_ID
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    const headers: Record<string, string> = {}
    if (storeId) headers['X-Store-Environment-ID'] = storeId
    if (publishableKey) headers['x-publishable-api-key'] = publishableKey

    const res = await fetch(
      `${baseUrl}/store/product-extensions/products/${productId}/variants`,
      { headers, next: { revalidate: 30 } },
    )
    if (!res.ok) return {}

    const data = await res.json()
    const map: Record<string, VariantExtension> = {}
    for (const v of data.variants || []) {
      map[v.id] = {
        compare_at_price: v.compare_at_price,
        manage_inventory: v.manage_inventory ?? false,
        inventory_quantity: v.inventory_quantity,
      }
    }
    return map
  } catch {
    return {}
  }
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) return { title: 'Plan introuvable' }

  return {
    title: `${product.title} — GeoData API`,
    description: product.description || `Abonnement ${product.title} — API de géocodage`,
    openGraph: {
      title: product.title,
      description: product.description || `Abonnement ${product.title}`,
    },
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: currency.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(amount / 100)
}

// ─── Feature list by plan ─────────────────────────────────────────────────────

const PLAN_FEATURES: Record<string, string[]> = {
  starter: [
    '2 500 geocoding / mois',
    'Lat / Lng + adresse formatée',
    'Timezone & County FIPS',
    '1 requête batch CSV / jour',
    'Reverse geocoding inclus',
    'Support e-mail (48h)',
    'Dashboard usage inclus',
    'SLA 99.5%',
  ],
  business: [
    'Lookups illimités par mois',
    'Tous les append fields activés',
    'Congressional district + Census tract',
    'Batch CSV illimité',
    'Webhooks & callbacks',
    'IP dédiée disponible',
    'Support prioritaire (4h)',
    'SLA 99.9% garanti',
    'Dashboard analytics avancé',
    'Clé API multi-environnements',
  ],
  enterprise: [
    'Volume sur-mesure',
    'Tous les champs append',
    'Intégration sur-mesure',
    'Account manager dédié',
    'Contrat SLA personnalisé',
    'Formation & onboarding',
    'Facturation mensuelle',
    'Support téléphonique 24/7',
  ],
}

function getPlanFeatures(title: string): string[] {
  const lower = title.toLowerCase()
  if (lower.includes('enterprise') || lower.includes('entreprise')) return PLAN_FEATURES.enterprise
  if (lower.includes('business') || lower.includes('professional') || lower.includes('pro')) return PLAN_FEATURES.business
  return PLAN_FEATURES.starter
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) notFound()

  const variantExtensions = await getVariantExtensions(product.id)
  const features = getPlanFeatures(product.title)

  const firstVariant = product.variants?.[0]
  const price = firstVariant?.calculated_price
  const priceFormatted = price
    ? formatPrice(price.calculated_amount, price.currency_code)
    : null

  return (
    <>
      <ProductViewTracker
        productId={product.id}
        productTitle={product.title}
        variantId={firstVariant?.id || null}
        currency={price?.currency_code || 'usd'}
        value={price?.calculated_amount ?? null}
      />

      {/* ── Breadcrumb ── */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-slate-700 transition-colors">Accueil</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-slate-700 transition-colors">Plans & Tarifs</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-700 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero plan header ── */}
      <section className="bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white">
        <div className="container-custom py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: plan info */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-xs font-semibold uppercase tracking-widest">
                <Zap className="h-3 w-3" />
                {product.subtitle || 'API Subscription Plan'}
              </div>

              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-balance">
                {product.title}
              </h1>

              {product.description && (
                <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
                  {product.description}
                </p>
              )}

              {/* Price display */}
              {priceFormatted && (
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold font-heading text-white">{priceFormatted}</span>
                  <span className="text-slate-400 mb-1.5">/mois</span>
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <ProductActions product={product} variantExtensions={variantExtensions} />
                </div>
              </div>

              {/* Trust */}
              <div className="flex flex-wrap gap-5 text-sm text-slate-400 pt-2">
                {[
                  { icon: <Shield className="h-4 w-4 text-blue-400" />, label: 'SLA 99.9%' },
                  { icon: <Clock className="h-4 w-4 text-blue-400" />, label: 'Latence < 50ms' },
                  { icon: <Globe className="h-4 w-4 text-blue-400" />, label: '50+ pays' },
                ].map(({ icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5">
                    {icon} {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: feature list */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-3">
              <p className="text-sm font-semibold text-slate-300 uppercase tracking-widest mb-4">
                Inclus dans ce plan
              </p>
              {features.map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-blue-400 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE GEOCODE DEMO ── */}
      <section className="py-16 lg:py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
              <Zap className="h-3 w-3" />
              Demo interactive
            </div>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">
              Testez l&apos;algorithme de géocodage
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Entrez n&apos;importe quelle adresse et voyez exactement ce que l&apos;API retourne —
              coordonnées GPS, composants d&apos;adresse, et tous les champs append.
            </p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:p-8">
            <GeocodeDemo />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3">Algorithme</p>
            <h2 className="text-3xl font-heading font-bold text-slate-900">
              Comment fonctionne le géocodage ?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                icon: <Code2 className="h-6 w-6 text-blue-600" />,
                title: 'Parsing de l\'adresse',
                desc: 'Décomposition de l\'adresse en composants (numéro, rue, ville, état, zip) via NLP.',
              },
              {
                step: '02',
                icon: <Database className="h-6 w-6 text-violet-600" />,
                title: 'Matching dans la base',
                desc: 'Correspondance avec la base TIGER/Line® du Census Bureau et OpenStreetMap.',
              },
              {
                step: '03',
                icon: <Globe className="h-6 w-6 text-emerald-600" />,
                title: 'Score de précision',
                desc: 'Score de 0 à 1 selon la granularité : rooftop, street, city, zip.',
              },
              {
                step: '04',
                icon: <BarChart3 className="h-6 w-6 text-orange-600" />,
                title: 'Enrichissement',
                desc: 'Ajout des champs append : district, census tract, timezone, FIPS…',
              },
            ].map((s) => (
              <div key={s.step} className="relative p-6 rounded-2xl border border-slate-100 bg-slate-50">
                <div className="text-5xl font-bold font-heading text-slate-100 absolute top-4 right-4 select-none">
                  {s.step}
                </div>
                <div className="mb-4 p-2.5 w-fit rounded-xl bg-white border border-slate-100 shadow-sm relative z-10">
                  {s.icon}
                </div>
                <h3 className="font-heading font-bold text-slate-900 mb-2 relative z-10">{s.title}</h3>
                <p className="text-sm text-slate-500 relative z-10">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accuracy types ── */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-heading font-bold text-slate-900 mb-8 text-center">
              Types de précision (accuracy_type)
            </h2>
            <div className="space-y-3">
              {[
                { type: 'rooftop', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', score: '1.0', desc: 'Coordonnées exactes du bâtiment — précision maximale.' },
                { type: 'street_center', color: 'bg-blue-100 text-blue-700 border-blue-200', score: '0.9', desc: 'Centre du tronçon de rue correspondant.' },
                { type: 'range_interpolation', color: 'bg-violet-100 text-violet-700 border-violet-200', score: '0.8', desc: 'Interpolation entre deux numéros de rue connus.' },
                { type: 'place', color: 'bg-amber-100 text-amber-700 border-amber-200', score: '0.7', desc: 'Centre de la ville ou zone nommée.' },
                { type: 'zip_code', color: 'bg-orange-100 text-orange-700 border-orange-200', score: '0.5', desc: 'Centre géographique du code postal.' },
                { type: 'state', color: 'bg-red-100 text-red-700 border-red-200', score: '0.2', desc: 'Centroïde de l\'état — faible précision.' },
              ].map((a) => (
                <div key={a.type} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200">
                  <span className={`px-2.5 py-1 rounded-full border text-xs font-bold whitespace-nowrap ${a.color}`}>
                    {a.type}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700">{a.desc}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 shrink-0">score: {a.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container-custom max-w-xl">
          <h2 className="text-3xl font-heading font-bold mb-4">
            Prêt à intégrer l&apos;API ?
          </h2>
          <p className="text-blue-100 mb-8">
            Commencez avec 2 500 lookups gratuits. Aucune carte bancaire requise.
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
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Voir tous les plans
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
