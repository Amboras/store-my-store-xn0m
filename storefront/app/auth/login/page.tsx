'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Loader2, MapPin, Eye, EyeOff, BarChart3, Key, Zap } from 'lucide-react'
import { toast } from 'sonner'

function LoginForm() {
  const searchParams = useSearchParams()
  const prefillEmail = searchParams.get('email') || ''
  const redirectTo = searchParams.get('redirect') || '/account'

  const [email, setEmail] = useState(prefillEmail)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoggingIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login({ email, password })
      toast.success('Bienvenue sur GeoData.ma !')
      router.push(redirectTo)
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Email ou mot de passe incorrect')
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
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-700/10 rounded-full blur-3xl pointer-events-none" />

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

        {/* Dashboard preview cards */}
        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="text-3xl font-heading font-bold text-white mb-2">
              Votre dashboard<br />
              <span className="text-red-400">vous attend 🇲🇦</span>
            </h2>
            <p className="text-slate-400 text-sm">
              Gérez vos clés API, suivez votre consommation et accédez à toute
              la documentation depuis un seul espace.
            </p>
          </div>

          {/* Mini dashboard cards */}
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center">
                <Key className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Votre clé API</p>
                <p className="text-sm font-mono font-bold text-white">gd_ma_••••••••••••••••</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-green-600/20 border border-green-500/30 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-400">Lookups ce mois</p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full">
                    <div className="h-full w-[34%] bg-red-500 rounded-full" />
                  </div>
                  <p className="text-xs text-slate-300">853 / 2 500</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <Zap className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Statut API</p>
                <p className="text-sm font-semibold text-emerald-400">● Opérationnel · 99.9% uptime</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <p className="text-xs text-slate-600">
            🇲🇦 1 538 communes · 12 régions · Données HCP
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
              Connexion à votre compte
            </h1>
            <p className="text-sm text-slate-500">
              Accédez à votre dashboard et vos clés API GeoData.ma
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide">
                  Mot de passe
                </label>
                <Link
                  href={`/auth/forgot-password${prefillEmail ? `?email=${encodeURIComponent(prefillEmail)}` : ''}`}
                  className="text-xs text-red-600 hover:underline"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="Votre mot de passe"
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
            </div>

            {/* CTA */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white text-sm font-bold rounded-xl transition-colors shadow-sm shadow-red-500/20"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              Pas encore de compte ?{' '}
              <Link href="/auth/register" className="font-semibold text-red-600 hover:underline">
                Créer un compte gratuit →
              </Link>
            </p>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1">🔒 SSL sécurisé</span>
            <span className="flex items-center gap-1">🇲🇦 Hébergé au Maroc</span>
            <span className="flex items-center gap-1">⚡ Accès immédiat</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-red-600" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
