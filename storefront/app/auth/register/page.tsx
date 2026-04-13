'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Loader2, MapPin, CheckCircle2, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { trackMetaEvent } from '@/lib/meta-pixel'

const perks = [
  '2 500 lookups gratuits par mois',
  'Wilaya, Commune, Code Commune inclus',
  'Zone CIN & Circonscription Électorale',
  'Batch CSV jusqu\'à 500 adresses/jour',
  'Dashboard usage en temps réel',
  'Aucune carte bancaire requise',
]

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { register, isRegistering } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password.length < 8) {
      toast.error('Le mot de passe doit contenir au moins 8 caractères')
      return
    }
    try {
      await register({ first_name: firstName, last_name: lastName, email, password })
      trackMetaEvent('CompleteRegistration', { status: 'completed' })
      toast.success('Compte créé ! Votre clé API est prête.')
      router.push('/account')
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Erreur lors de la création du compte')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* ── Panneau gauche — branding ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-slate-950 via-red-950/30 to-slate-900 flex-col justify-between p-12 relative overflow-hidden">
        {/* Grid bg */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(200,16,46,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,98,51,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Glow */}
        <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-red-700/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-red-600">
              <MapPin className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-heading text-2xl font-bold text-white">
              Geo<span className="text-red-400">Data</span>
              <span className="text-slate-500 font-normal text-sm ml-1">.ma</span>
            </span>
          </Link>
        </div>

        {/* Perks */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-heading font-bold text-white mb-2">
              L&apos;API de géocodage <br />
              <span className="text-red-400">100% dédiée au Maroc</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Votre compte gratuit vous donne accès instantanément à l&apos;infrastructure de géocodage
              la plus précise pour les adresses marocaines.
            </p>
          </div>

          <ul className="space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-red-400 shrink-0" />
                {perk}
              </li>
            ))}
          </ul>

          {/* Demo JSON snippet */}
          <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-4 font-mono text-xs text-slate-400 leading-relaxed">
            <div className="flex gap-1.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <p className="text-slate-500">$ curl api.geodata.ma/v1/geocode?q=Casablanca</p>
            <p className="text-emerald-400 mt-2">{`{`}</p>
            <p className="pl-4 text-slate-300"><span className="text-blue-400">&quot;wilaya&quot;</span>: <span className="text-amber-300">&quot;Casablanca-Settat&quot;</span>,</p>
            <p className="pl-4 text-slate-300"><span className="text-blue-400">&quot;code_commune&quot;</span>: <span className="text-amber-300">&quot;201101&quot;</span>,</p>
            <p className="pl-4 text-slate-300"><span className="text-blue-400">&quot;cin_zone&quot;</span>: <span className="text-amber-300">&quot;BE / BH&quot;</span>,</p>
            <p className="pl-4 text-slate-300"><span className="text-blue-400">&quot;accuracy&quot;</span>: <span className="text-green-400">0.95</span></p>
            <p className="text-emerald-400">{`}`}</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-xs text-slate-600">
            🇲🇦 Données HCP · OpenStreetMap Maroc · Ministère de l&apos;Intérieur
          </p>
        </div>
      </div>

      {/* ── Panneau droit — formulaire ── */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16 bg-white">
        {/* Mobile logo */}
        <div className="flex lg:hidden items-center justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-red-600">
              <MapPin className="h-4 w-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-heading text-xl font-bold text-slate-900">
              Geo<span className="text-red-600">Data</span>
              <span className="text-slate-400 font-normal text-xs ml-1">.ma</span>
            </span>
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-heading font-bold text-slate-900 mb-1">
              Créez votre compte gratuit
            </h1>
            <p className="text-sm text-slate-500">
              Obtenez votre clé API en 30 secondes · Aucune carte bancaire
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nom / Prénom */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Prénom
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  autoComplete="given-name"
                  placeholder="Mohammed"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                  Nom
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  autoComplete="family-name"
                  placeholder="El Amrani"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                Adresse e-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="vous@entreprise.ma"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  minLength={8}
                  placeholder="Minimum 8 caractères"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password.length > 0 && (
                <div className="mt-1.5 flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        password.length >= i * 3
                          ? password.length >= 12 ? 'bg-emerald-500'
                          : password.length >= 8 ? 'bg-amber-400'
                          : 'bg-red-400'
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                  <span className="text-xs text-slate-400 ml-1 whitespace-nowrap">
                    {password.length >= 12 ? 'Fort' : password.length >= 8 ? 'Moyen' : 'Faible'}
                  </span>
                </div>
              )}
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={isRegistering}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-bold rounded-xl transition-colors shadow-sm shadow-red-500/20"
            >
              {isRegistering ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Création du compte...
                </>
              ) : (
                <>🇲🇦 Créer mon compte gratuit</>
              )}
            </button>

            <p className="text-xs text-slate-400 text-center">
              En créant un compte, vous acceptez nos{' '}
              <Link href="/terms" className="text-red-600 hover:underline">Conditions d&apos;utilisation</Link>{' '}
              et notre{' '}
              <Link href="/privacy" className="text-red-600 hover:underline">Politique de confidentialité</Link>.
            </p>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Déjà un compte ?{' '}
              <Link href="/auth/login" className="font-semibold text-red-600 hover:underline">
                Se connecter
              </Link>
            </p>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1">🔒 SSL sécurisé</span>
            <span className="flex items-center gap-1">🇲🇦 Données au Maroc</span>
            <span className="flex items-center gap-1">⚡ Accès immédiat</span>
          </div>
        </div>
      </div>
    </div>
  )
}
