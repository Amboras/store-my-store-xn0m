'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  ArrowRight,
  MapPin,
  Zap,
  Database,
  Globe,
  Code2,
  CheckCircle2,
  ChevronRight,
  Copy,
  Check,
  Building2,
  Users,
  BarChart3,
  ShieldCheck,
} from 'lucide-react'
import GeocodeDemo from '@/components/geocode/geocode-demo'

const codeExample = `# Géocodage d'une adresse marocaine
curl "https://api.geodata.ma/v1/geocode?q=23+Rue+Allal+Ben+Abdellah,+Casablanca&api_key=YOUR_KEY"

{
  "input": {
    "formatted_address": "23 Rue Allal Ben Abdellah, Casablanca"
  },
  "results": [{
    "formatted_address": "23 Rue Allal Ben Abdellah, Casablanca, 20000, Maroc",
    "location": {
      "lat": 33.5935,
      "lng": -7.6187
    },
    "accuracy": 0.95,
    "accuracy_type": "range_interpolation",
    "source": "Base Nationale des Adresses — HCP",
    "fields": {
      "wilaya": "Casablanca-Settat",
      "code_wilaya": "20",
      "commune": "Casablanca (Ain Chock)",
      "code_commune": "201101",
      "province_prefecture": "Préfecture de Casablanca",
      "region_administrative": "Casablanca-Settat",
      "code_postal": "20000",
      "timezone": "Africa/Casablanca (UTC+1)",
      "cin_zone": "BE / BH",
      "circonscription_electorale": "Casablanca-Anfa",
      "tribunal_competent": "Tribunal de Commerce de Casablanca",
      "academie_regionale": "Académie Régionale Casablanca-Settat"
    }
  }]
}`

const features = [
  {
    icon: <Zap className="h-6 w-6 text-red-500" />,
    title: 'Géocodage ultra-rapide',
    desc: "Convertissez des adresses marocaines en coordonnées GPS en quelques millisecondes. Batch jusqu'à 10 000 adresses.",
  },
  {
    icon: <Database className="h-6 w-6 text-green-600" />,
    title: 'Données enrichies Maroc',
    desc: 'Wilaya, commune, code commune, arrondissement, circumscription électorale, zone CIN, tribunal compétent et plus encore.',
  },
  {
    icon: <Globe className="h-6 w-6 text-red-400" />,
    title: 'Couverture nationale',
    desc: 'Toutes les 12 régions, 75 provinces/préfectures, 1538 communes marocaines. Données HCP mises à jour continuellement.',
  },
  {
    icon: <Code2 className="h-6 w-6 text-green-500" />,
    title: 'API REST simple',
    desc: 'Intégration en 5 minutes. SDKs Python, JS, PHP, Ruby. Documentation complète en français et arabe.',
  },
]

const stats = [
  { value: '1 538', label: 'Communes couvertes' },
  { value: '12', label: 'Régions du Maroc' },
  { value: '99.9%', label: 'Uptime garanti' },
  { value: '<50ms', label: 'Latence médiane' },
]

const appendFields = [
  'Wilaya & Code Wilaya', 'Province / Préfecture', 'Commune & Code Commune',
  'Arrondissement', 'Région Administrative', 'Code Postal',
  'Secteur Postal', 'Zone CIN', 'Circonscription Électorale',
  'Fuseau Horaire', 'Tribunal Compétent', 'Académie Régionale',
  'Centre de Santé', 'Latitude / Longitude', 'Score de précision',
  'Source (HCP / OSM)',
]

const plans = [
  {
    name: 'Gratuit',
    price: '0 MAD',
    period: '/mois',
    desc: 'Pour explorer et tester',
    lookups: '2 500 lookups/mois',
    cta: 'Commencer gratuitement',
    href: '/auth/register',
    highlight: false,
    features: ['2 500 geocoding/mois', 'Lat/Lng + Adresse formatée', 'Wilaya & Commune', 'Support communauté'],
  },
  {
    name: 'Business',
    price: '1 990 MAD',
    period: '/mois',
    desc: 'Pour les équipes en croissance',
    lookups: 'Lookups illimités',
    cta: 'Démarrer le plan',
    href: '/products',
    highlight: true,
    features: ['Lookups illimités', 'Tous les champs append', 'Batch CSV illimité', 'Support prioritaire', 'Dashboard analytics', 'SLA 99.9%'],
  },
  {
    name: 'Enterprise',
    price: 'Sur devis',
    period: '',
    desc: 'Pour les grandes organisations',
    lookups: 'Volume sur-mesure',
    cta: 'Nous contacter',
    href: '/contact',
    highlight: false,
    features: ['Volume illimité', 'IP dédiée', 'SLA personnalisé', 'Intégration sur-mesure', 'Account manager dédié', 'Facture mensuelle'],
  },
]

export default function HomePage() {
  const [copied, setCopied] = useState(false)
  const [demoAddress, setDemoAddress] = useState('')

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExample)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-red-950/30 to-slate-900 text-white">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(200,16,46,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,98,51,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Glow drapeau Maroc rouge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-700/15 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10 py-24 lg:py-36 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-red-400/30 bg-red-500/10 text-red-300 text-sm font-medium">
            <span>🇲🇦</span>
            API de géocodage 100% dédiée au Maroc
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-balance leading-tight mb-6">
            Géocodez toutes les adresses<br />
            <span className="text-red-400">du Maroc, instantanément</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            L&apos;API de géocodage la plus précise pour le Maroc. Convertissez n&apos;importe quelle adresse
            en coordonnées GPS + wilaya, commune, code commune, zone CIN, tribunal et plus encore.
          </p>

          {/* Demo live */}
          <div className="max-w-2xl mx-auto mb-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
            <GeocodeDemo compact defaultAddress="" />
          </div>

          <p className="text-xs text-slate-500 mt-2">2 500 requêtes gratuites. Aucune carte bancaire requise.</p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 mt-6">
            {['Wilaya', 'Code Commune', 'Zone CIN', 'Circonscription', 'Timezone', 'HCP Data'].map((tag) => (
              <span key={tag} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-red-400" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-slate-900 border-b border-slate-800">
        <div className="container-custom py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl lg:text-4xl font-bold font-heading text-white">{s.value}</p>
                <p className="text-sm text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CODE DEMO ─── */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Texte */}
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-red-600">API REST</p>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">
                Intégrez en quelques lignes de code
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Une seule requête HTTP suffit. Notre API retourne du JSON structuré avec
                coordonnées, adresse normalisée et tous les champs administratifs marocains.
              </p>
              <ul className="space-y-3">
                {[
                  'SDK Python, JavaScript, PHP, Ruby',
                  'Batch CSV — jusqu\'à 10 000 adresses',
                  'Reverse geocoding inclus',
                  'Documentation en français & arabe',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-red-600 font-semibold hover:underline"
              >
                Voir la documentation complète
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Code block */}
            <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs text-slate-500 font-mono">geocode-maroc.sh</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copié !' : 'Copier'}
                </button>
              </div>
              <pre className="p-5 text-xs sm:text-sm text-slate-300 font-mono overflow-x-auto leading-relaxed whitespace-pre-wrap">
                <code>{codeExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-600 mb-3">Fonctionnalités</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">
              Conçu spécifiquement pour le Maroc 🇲🇦
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-red-100 hover:bg-red-50/20 transition-all">
                <div className="mb-4 p-2.5 w-fit rounded-xl bg-white border border-slate-100 shadow-sm">
                  {f.icon}
                </div>
                <h3 className="font-heading font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APPEND FIELDS ─── */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-red-600">Champs Append Maroc</p>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">
                16 champs de données administratives marocaines
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Au-delà des coordonnées GPS, notre API retourne toutes les données
                administratives officielles du Maroc pour chaque adresse geocodée —
                issues du HCP, du Ministère de l&apos;Intérieur et d&apos;OpenStreetMap Maroc.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Voir les plans & tarifs
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {appendFields.map((field) => (
                <div
                  key={field}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white border border-slate-100 shadow-sm text-sm text-slate-700 font-medium"
                >
                  <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0" />
                  {field}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── RÉGIONS MAROC ─── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container-custom">
          <div className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-600 mb-3">Couverture</p>
            <h2 className="text-3xl font-heading font-bold text-slate-900">
              Les 12 régions du Maroc couvertes
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Tanger-Tétouan-Al Hoceïma', 'Oriental', 'Fès-Meknès',
              'Rabat-Salé-Kénitra', 'Béni Mellal-Khénifra', 'Casablanca-Settat',
              'Marrakech-Safi', 'Drâa-Tafilalet', 'Souss-Massa',
              'Guelmim-Oued Noun', 'Laâyoune-Sakia El Hamra', 'Dakhla-Oued Ed-Dahab',
            ].map((region) => (
              <span
                key={region}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-sm text-red-800 font-medium"
              >
                🇲🇦 {region}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-20 lg:py-28 bg-slate-950 text-white" id="pricing">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-400 mb-3">Tarifs en MAD</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold">
              Simple, transparent, sans surprise
            </h2>
            <p className="text-slate-400 mt-3">Commencez gratuitement. Passez au niveau supérieur quand vous en avez besoin.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 border transition-all ${
                  plan.highlight
                    ? 'bg-red-600 border-red-500 shadow-2xl shadow-red-500/20 scale-[1.03]'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-red-600 text-xs font-bold rounded-full uppercase tracking-wide">
                    ⭐ Populaire
                  </div>
                )}
                <p className={`text-sm font-semibold mb-1 ${plan.highlight ? 'text-red-100' : 'text-slate-400'}`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-3xl font-bold font-heading">{plan.price}</span>
                  {plan.period && <span className={`text-sm mb-1.5 ${plan.highlight ? 'text-red-200' : 'text-slate-400'}`}>{plan.period}</span>}
                </div>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-red-100' : 'text-slate-400'}`}>{plan.lookups}</p>

                <Link
                  href={plan.href}
                  className={`block text-center py-3 rounded-xl font-semibold text-sm mb-8 transition-colors ${
                    plan.highlight
                      ? 'bg-white text-red-600 hover:bg-red-50'
                      : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {plan.cta}
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2.5 text-sm ${plan.highlight ? 'text-red-50' : 'text-slate-300'}`}>
                      <CheckCircle2 className={`h-4 w-4 shrink-0 ${plan.highlight ? 'text-white' : 'text-red-400'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CAS D'USAGE ─── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-600 mb-3">Cas d&apos;usage</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">
              Qui utilise GeoData.ma ?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Building2 className="h-6 w-6 text-red-600" />, title: 'PropTech & Immobilier', desc: 'Qualifiez des biens par wilaya, commune et zone. Agences et portails immobiliers au Maroc.' },
              { icon: <Users className="h-6 w-6 text-green-600" />, title: 'Services Publics', desc: 'Normalisez les adresses des citoyens. Identifiez la commune, le tribunal et l\'académie compétents.' },
              { icon: <BarChart3 className="h-6 w-6 text-red-400" />, title: 'CRM & E-Commerce', desc: 'Enrichissez vos bases clients avec la wilaya, la commune et le code postal marocain.' },
              { icon: <ShieldCheck className="h-6 w-6 text-green-500" />, title: 'Conformité & KYC', desc: 'Validez les adresses pour la conformité BAM / OFPPT. Zone CIN incluse.' },
            ].map((uc) => (
              <div key={uc.title} className="p-6 rounded-2xl border border-slate-100 bg-slate-50">
                <div className="mb-4 p-2.5 w-fit rounded-xl bg-white border border-slate-100 shadow-sm">
                  {uc.icon}
                </div>
                <h3 className="font-heading font-bold text-slate-900 mb-2">{uc.title}</h3>
                <p className="text-sm text-slate-500">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 lg:py-24 bg-red-600 text-white text-center">
        <div className="container-custom max-w-2xl">
          <div className="text-5xl mb-4">🇲🇦</div>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Prêt à démarrer ?
          </h2>
          <p className="text-red-100 text-lg mb-8">
            2 500 lookups gratuits. API key en 30 secondes. Aucune carte bancaire requise.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors"
            >
              Créer un compte gratuit
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Parler à un expert
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
