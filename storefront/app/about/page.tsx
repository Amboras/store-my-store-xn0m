import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, CheckCircle2, ArrowRight, Users, Database, Globe, Zap } from 'lucide-react'

export const metadata: Metadata = {
  title: 'À propos — GeoData.ma',
  description: "L'API de géocodage 100% dédiée au Maroc. Notre mission, notre technologie, notre équipe.",
}

const stats = [
  { value: '1 538', label: 'Communes marocaines' },
  { value: '12', label: 'Régions couvertes' },
  { value: '16', label: 'Champs append Maroc' },
  { value: '99.9%', label: 'Uptime garanti' },
]

const team = [
  {
    name: 'Équipe Data',
    role: 'Ingénierie & Algorithmes',
    desc: 'Experts en géodonnées marocaines, normalisation d\'adresses et parsing multilingue arabe/français.',
    emoji: '🗺️',
  },
  {
    name: 'Équipe Sources',
    role: 'Partenariats & Données HCP',
    desc: 'Relations avec le HCP, le Ministère de l\'Intérieur et la communauté OpenStreetMap Maroc.',
    emoji: '🏛️',
  },
  {
    name: 'Équipe Produit',
    role: 'API & Infrastructure',
    desc: 'Architecture haute disponibilité, latence < 50ms, SLA 99.9%, infrastructure 100% marocaine.',
    emoji: '⚡',
  },
]

const sources = [
  {
    icon: '📊',
    name: 'HCP — Haut-Commissariat au Plan',
    desc: 'Base Nationale des Adresses, Recensement Général de la Population, découpage communal officiel.',
  },
  {
    icon: '🏛️',
    name: 'Ministère de l\'Intérieur',
    desc: 'Wilayas, provinces, préfectures, communes, arrondissements. Mises à jour réglementaires.',
  },
  {
    icon: '🗺️',
    name: 'OpenStreetMap Maroc',
    desc: 'Réseau de rues, points d\'intérêt, quartiers, médinas. Communauté de cartographes marocains.',
  },
  {
    icon: '📮',
    name: 'Barid Al-Maghrib',
    desc: 'Codes postaux, secteurs postaux, zones de distribution. Base officielle des codes MA.',
  },
  {
    icon: '🪪',
    name: 'DGSN — Direction Générale',
    desc: 'Zones CIN par wilaya (préfixes BE, BH, D, G, H, etc.). Validation et conformité KYC.',
  },
  {
    icon: '⚖️',
    name: 'Ministère de la Justice',
    desc: 'Tribunaux compétents par commune, ressort judiciaire, tribunaux de commerce.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-slate-950 via-red-950/20 to-slate-900 text-white">
        <div className="container-custom py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-400/30 bg-red-500/10 text-red-300 text-xs font-semibold uppercase tracking-widest mb-6">
              <span>🇲🇦</span>
              Notre mission
            </div>
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-balance leading-tight mb-6">
              Rendre chaque adresse marocaine
              <span className="text-red-400"> géocodable, précisément</span>
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
              GeoData.ma est né d&apos;un constat simple : le Maroc mérite une infrastructure
              de géocodage aussi précise et fiable que les meilleurs services mondiaux —
              mais adaptée à ses spécificités administratives, linguistiques et territoriales.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
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

      {/* ── Notre histoire ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-red-600">Notre Histoire</p>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">
                Pourquoi GeoData.ma ?
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Les solutions de géocodage génériques (Google, HERE, Nominatim) manquent de précision
                  pour les adresses marocaines. Elles ne connaissent pas les codes communes HCP, les zones
                  CIN, les circumscriptions électorales ou les tribunaux compétents.
                </p>
                <p>
                  GeoData.ma a été créé pour répondre aux besoins réels des entreprises, des
                  administrations et des développeurs marocains : une API simple, précise,
                  et enrichie des données administratives officielles du Maroc.
                </p>
                <p>
                  Nous agrégeons les données du HCP, du Ministère de l&apos;Intérieur,
                  de Barid Al-Maghrib et d&apos;OpenStreetMap Maroc pour offrir la couverture
                  la plus complète possible — des grandes villes aux communes rurales les plus reculées.
                </p>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Voir les plans & tarifs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Zap className="h-6 w-6 text-red-500" />, title: 'Latence < 50ms', desc: 'Infrastructure hébergée au Maroc pour une vitesse optimale.' },
                { icon: <Database className="h-6 w-6 text-green-600" />, title: 'Données HCP', desc: 'Base nationale officielle, mise à jour en continu.' },
                { icon: <Globe className="h-6 w-6 text-red-400" />, title: '1 538 communes', desc: 'Couverture nationale complète — toutes les régions.' },
                { icon: <Users className="h-6 w-6 text-green-500" />, title: 'Multilingue', desc: 'Adresses en arabe, français et translittération latine.' },
              ].map((item) => (
                <div key={item.title} className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:border-red-100 transition-colors">
                  <div className="mb-3 p-2.5 w-fit rounded-xl bg-white border border-slate-100 shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="font-heading font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sources de données ── */}
      <section className="py-20 lg:py-24 bg-slate-50 border-t border-slate-100">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-600 mb-3">Sources officielles</p>
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-slate-900">
              Données issues de sources gouvernementales marocaines
            </h2>
            <p className="text-slate-500 mt-4 leading-relaxed">
              Chaque donnée retournée par l&apos;API GeoData.ma est tracée jusqu&apos;à
              sa source officielle. Transparence et fiabilité garanties.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sources.map((source) => (
              <div key={source.name} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-red-200 hover:shadow-sm transition-all">
                <div className="text-3xl mb-4">{source.icon}</div>
                <h3 className="font-heading font-bold text-slate-900 mb-2 text-sm">{source.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{source.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Équipe ── */}
      <section className="py-20 lg:py-24 bg-white border-t border-slate-100">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-600 mb-3">L&apos;équipe</p>
            <h2 className="text-3xl font-heading font-bold text-slate-900">
              Construite par des experts du Maroc, pour le Maroc
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center p-8 rounded-2xl border border-slate-100 bg-slate-50">
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="font-heading font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-xs text-red-600 font-semibold uppercase tracking-wide mb-3">{member.role}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Valeurs ── */}
      <section className="py-20 bg-slate-950 text-white">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-red-400 mb-3">Nos valeurs</p>
            <h2 className="text-3xl font-heading font-bold">Ce qui nous guide</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { emoji: '🎯', title: 'Précision', desc: 'Chaque champ retourné est vérifiable et sourcé. Pas d\'approximation.' },
              { emoji: '🔒', title: 'Confidentialité', desc: 'Aucune adresse n\'est stockée. Traitement stateless, zéro rétention de données.' },
              { emoji: '📖', title: 'Transparence', desc: 'Sources ouvertes, scores de précision explicites, erreurs documentées.' },
              { emoji: '🇲🇦', title: 'Marocanité', desc: 'Conçu pour les spécificités du Maroc — pas un fork d\'un service occidental.' },
            ].map((v) => (
              <div key={v.title} className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50">
                <div className="text-3xl mb-3">{v.emoji}</div>
                <h3 className="font-heading font-bold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-red-600 text-white text-center">
        <div className="container-custom max-w-xl">
          <div className="text-4xl mb-3">🇲🇦</div>
          <h2 className="text-3xl font-heading font-bold mb-4">
            Rejoignez GeoData.ma
          </h2>
          <p className="text-red-100 mb-8 leading-relaxed">
            2 500 lookups gratuits, accès immédiat. Aucune carte bancaire requise.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors"
            >
              Créer un compte gratuit
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Contacter l&apos;équipe
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
