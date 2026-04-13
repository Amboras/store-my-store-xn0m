'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Mail, Clock, MessageSquare, Loader2, CheckCircle2, Phone, Building2 } from 'lucide-react'

const topics = [
  'Question sur l\'API',
  'Problème technique',
  'Facturation / Abonnement',
  'Partenariat / Intégration',
  'Devis Enterprise',
  'Données / Sources HCP',
  'Autre',
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    topic: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-b from-slate-950 via-red-950/20 to-slate-900 text-white">
        <div className="container-custom py-16 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-400/30 bg-red-500/10 text-red-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <MessageSquare className="h-3 w-3" />
            Nous contacter
          </div>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-4">
            Parlez à notre équipe
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto">
            Une question sur l&apos;API, un besoin Enterprise ou un partenariat ?
            Notre équipe basée au Maroc répond sous 24h.
          </p>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* ── Infos contact ── */}
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-heading font-bold text-slate-900 mb-6">
                  Comment nous joindre
                </h2>

                <div className="space-y-5">
                  <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Email</p>
                      <p className="text-sm font-semibold text-slate-900">support@geodata.ma</p>
                      <p className="text-xs text-slate-400 mt-0.5">Réponse sous 24h ouvrées</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Téléphone</p>
                      <p className="text-sm font-semibold text-slate-900">+212 5XX-XXX-XXX</p>
                      <p className="text-xs text-slate-400 mt-0.5">Lun–Ven · 9h–18h (GMT+1)</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Adresse</p>
                      <p className="text-sm font-semibold text-slate-900">Casablanca, Maroc 🇲🇦</p>
                      <p className="text-xs text-slate-400 mt-0.5">Wilaya Casablanca-Settat</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Horaires</p>
                      <p className="text-sm text-slate-700">Lun–Ven : 9h00 – 18h00</p>
                      <p className="text-xs text-slate-400 mt-0.5">Fuseau : Africa/Casablanca (UTC+1)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enterprise card */}
              <div className="p-5 rounded-xl border border-red-200 bg-red-50">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="h-5 w-5 text-red-600" />
                  <p className="font-heading font-bold text-slate-900 text-sm">Besoin Enterprise ?</p>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Volume personnalisé, SLA dédié, intégration sur-mesure, account manager.
                  Obtenez un devis en 24h.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:underline"
                >
                  Voir le plan Enterprise →
                </Link>
              </div>

              {/* Status */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-sm font-semibold text-emerald-800">API opérationnelle</p>
                </div>
                <p className="text-xs text-emerald-600 mt-1">Uptime 99.9% · Latence 43ms moyenne</p>
              </div>
            </div>

            {/* ── Formulaire ── */}
            <div className="lg:col-span-2">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-12 rounded-2xl border border-emerald-200 bg-emerald-50">
                  <CheckCircle2 className="h-16 w-16 text-emerald-500 mb-4" />
                  <h3 className="text-xl font-heading font-bold text-slate-900 mb-2">
                    Message envoyé ! 🇲🇦
                  </h3>
                  <p className="text-slate-600 mb-6 max-w-sm">
                    Notre équipe vous répondra dans les 24 heures ouvrées.
                    En attendant, consultez notre documentation.
                  </p>
                  <div className="flex gap-3">
                    <Link
                      href="/faq"
                      className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors"
                    >
                      Voir la documentation
                    </Link>
                    <button
                      onClick={() => setSent(false)}
                      className="px-5 py-2.5 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-white transition-colors"
                    >
                      Nouveau message
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                  <h2 className="text-xl font-heading font-bold text-slate-900 mb-6">
                    Envoyez-nous un message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Prénom *</label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="Mohammed"
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Nom *</label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="El Amrani"
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Email *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="vous@entreprise.ma"
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Entreprise</label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Nom de votre société"
                          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Sujet *</label>
                      <select
                        required
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                      >
                        <option value="">Sélectionnez un sujet...</option>
                        {topics.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">Message *</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Décrivez votre question ou besoin en détail..."
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-bold rounded-xl transition-colors"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="h-4 w-4" />
                          Envoyer le message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
