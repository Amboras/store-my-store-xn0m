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

const codeExample = `curl "https://api.geodata.io/geocode?q=525+University+Ave,+Toronto&api_key=YOUR_KEY"

{
  "results": [{
    "formatted_address": "525 University Ave, Toronto, ON M5G 2L3",
    "location": {
      "lat": 43.6571,
      "lng": -79.3877
    },
    "accuracy": "rooftop",
    "fields": {
      "census_tract": "5350101.00",
      "congressional_district": "ON-005",
      "timezone": "America/Toronto"
    }
  }]
}`

const features = [
  {
    icon: <Zap className="h-6 w-6 text-blue-500" />,
    title: 'Geocoding ultra-rapide',
    desc: "Convertissez des adresses en coordonnées GPS en quelques millisecondes. Batch jusqu'à 10 000 adresses en une seule requête.",
  },
  {
    icon: <Database className="h-6 w-6 text-violet-500" />,
    title: 'Données enrichies',
    desc: 'District électoral, census tract, fuseau horaire, code postal, FIPS, et bien plus encore pour chaque adresse.',
  },
  {
    icon: <Globe className="h-6 w-6 text-emerald-500" />,
    title: 'Couverture mondiale',
    desc: 'Géocodage fiable pour les États-Unis, le Canada, le Maroc et plus de 50 pays. Données mises à jour en continu.',
  },
  {
    icon: <Code2 className="h-6 w-6 text-orange-500" />,
    title: 'API REST simple',
    desc: 'Intégration en 5 minutes avec notre API REST documentée. SDKs disponibles pour Python, JS, Ruby et PHP.',
  },
]

const stats = [
  { value: '10M+', label: 'Requêtes/jour' },
  { value: '99.9%', label: 'Uptime garanti' },
  { value: '<50ms', label: 'Latence médiane' },
  { value: '50+', label: 'Pays couverts' },
]

const appendFields = [
  'Congressional District', 'Census Tract', 'Timezone', 'County FIPS',
  'State Legislature', 'School District', 'MSA', 'ZCTA',
  'Latitude / Longitude', 'Accuracy Score', 'Street Number', 'City / State / ZIP',
]

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/mois',
    desc: 'Pour explorer et tester',
    lookups: '2 500 lookups/mois',
    cta: 'Commencer gratuitement',
    href: '/auth/register',
    highlight: false,
    features: ['2 500 geocoding/mois', 'Lat/Lng + Adresse formatée', '1 champ append gratuit', 'Support communauté'],
  },
  {
    name: 'Starter',
    price: '$200',
    period: '/mois',
    desc: 'Pour les équipes en croissance',
    lookups: '2 500 lookups/mois',
    cta: 'Démarrer le plan',
    href: '/products',
    highlight: true,
    features: ['2 500 geocoding/mois', 'Tous les champs append', 'Batch CSV upload', 'Support prioritaire', 'Dashboard analytics', 'SLA 99.9%'],
  },
  {
    name: 'Enterprise',
    price: 'Sur devis',
    period: '',
    desc: 'Pour les grandes organisations',
    lookups: 'Lookups illimités',
    cta: 'Nous contacter',
    href: '/contact',
    highlight: false,
    features: ['Volume illimité', 'IP dédiée', 'Contrat SLA personnalisé', 'Intégration sur-mesure', 'Account manager dédié', 'Facture mensuelle'],
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
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 text-white">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(99,179,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.3) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10 py-24 lg:py-36 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-sm font-medium">
            <Zap className="h-3.5 w-3.5" />
            Géocodage & Enrichissement d&apos;adresses par API
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-balance leading-tight mb-6">
            Transformez vos adresses<br />
            <span className="text-blue-400">en données géo puissantes</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            API de géocodage simple et rapide. Convertissez des adresses en coordonnées GPS,
            district électoral, census tract, fuseau horaire et bien plus encore.
          </p>

          {/* Demo input */}
          <div className="max-w-xl mx-auto mb-10">
            <div className="flex gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-2">
              <div className="flex items-center pl-2 text-slate-400">
                <MapPin className="h-5 w-5" />
              </div>
              <input
                type="text"
                value={demoAddress}
                onChange={(e) => setDemoAddress(e.target.value)}
                placeholder="525 University Ave, Toronto, ON..."
                className="flex-1 bg-transparent text-white placeholder:text-slate-400 text-sm focus:outline-none px-2"
              />
              <Link
                href="/products"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Geocoder →
              </Link>
            </div>
            <p className="text-xs text-slate-500 mt-2">2 500 requêtes gratuites pour commencer. Aucune carte bancaire.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            {['Lat / Lng', 'Census Tract', 'District Electoral', 'Timezone', 'FIPS Code'].map((tag) => (
              <span key={tag} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
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
            {/* Text */}
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">API REST</p>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">
                Intégrez en quelques lignes de code
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Une seule requête HTTP suffit. Notre API retourne des données JSON structurées
                avec lat/lng, adresse formatée et tous les champs append que vous activez.
              </p>
              <ul className="space-y-3">
                {[
                  'SDK Python, JavaScript, Ruby, PHP',
                  'Webhook & batch CSV upload',
                  'Reverse geocoding inclus',
                  'Documentation interactive',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
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
                <span className="text-xs text-slate-500 font-mono">geocode.sh</span>
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
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3">Fonctionnalités</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">
              Tout ce dont vous avez besoin pour la géolocalisation
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all">
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
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">Champs append</p>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">
                Enrichissez chaque adresse avec des données contextuelles
              </h2>
              <p className="text-slate-500 leading-relaxed">
                Au-delà des coordonnées GPS, notre API retourne des données administratives,
                démographiques et politiques précises pour chaque adresse geocodée.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
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
                  <CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0" />
                  {field}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-20 lg:py-28 bg-slate-950 text-white" id="pricing">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 mb-3">Tarifs</p>
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
                    ? 'bg-blue-600 border-blue-500 shadow-2xl shadow-blue-500/20 scale-[1.03]'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-blue-600 text-xs font-bold rounded-full uppercase tracking-wide">
                    Populaire
                  </div>
                )}
                <p className={`text-sm font-semibold mb-1 ${plan.highlight ? 'text-blue-100' : 'text-slate-400'}`}>
                  {plan.name}
                </p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-4xl font-bold font-heading">{plan.price}</span>
                  {plan.period && <span className={`text-sm mb-1.5 ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>{plan.period}</span>}
                </div>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-blue-100' : 'text-slate-400'}`}>{plan.lookups}</p>

                <Link
                  href={plan.href}
                  className={`block text-center py-3 rounded-xl font-semibold text-sm mb-8 transition-colors ${
                    plan.highlight
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {plan.cta}
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2.5 text-sm ${plan.highlight ? 'text-blue-50' : 'text-slate-300'}`}>
                      <CheckCircle2 className={`h-4 w-4 shrink-0 ${plan.highlight ? 'text-white' : 'text-blue-400'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST / USE CASES ─── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3">Cas d&apos;usage</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">
              Qui utilise GeoData ?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Building2 className="h-6 w-6 text-blue-600" />, title: 'PropTech & Immobilier', desc: 'Qualifiez des leads par zone géographique et zone scolaire.' },
              { icon: <Users className="h-6 w-6 text-violet-600" />, title: 'Campagnes politiques', desc: 'Identifiez le district électoral de chaque électeur automatiquement.' },
              { icon: <BarChart3 className="h-6 w-6 text-emerald-600" />, title: 'CRM & Marketing', desc: 'Enrichissez vos bases de données clients avec des données locales.' },
              { icon: <ShieldCheck className="h-6 w-6 text-orange-600" />, title: 'Conformité & KYC', desc: 'Validez et normalisez les adresses pour la conformité réglementaire.' },
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
      <section className="py-20 lg:py-24 bg-blue-600 text-white text-center">
        <div className="container-custom max-w-2xl">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold mb-4">
            Prêt à démarrer ?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            2 500 lookups gratuits. Aucune carte bancaire requise. API key en 30 secondes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors"
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
