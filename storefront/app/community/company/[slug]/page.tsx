"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  Star,
  MapPin,
  Users2,
  ArrowLeft,
  TrendingUp,
  MessageCircle,
  DollarSign,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Building2,
  Award,
} from "lucide-react";
import CommunitySidebar from "../../components/CommunitySidebar";
import PostCard from "../../components/PostCard";
import { COMPANIES, POSTS, SALARIES } from "../../data/mock-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function RatingBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-32 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full"
          style={{ width: `${(value / 5) * 100}%` }}
        />
      </div>
      <span className="text-xs font-semibold text-gray-700 w-6 text-right">
        {value}
      </span>
    </div>
  );
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          className={
            s <= Math.round(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300 fill-gray-100"
          }
        />
      ))}
    </div>
  );
}

export default function CompanyPage({ params }: PageProps) {
  const { slug } = use(params);
  const company = COMPANIES.find((c) => c.slug === slug);
  const [activeTab, setActiveTab] = useState<"posts" | "salaires" | "avis">(
    "posts"
  );

  const companyPosts = POSTS.filter((p) => p.companySlug === slug);
  const companySalaries = SALARIES.filter((s) => s.companySlug === slug);

  // Fake sub-ratings
  const subRatings = [
    { label: "Équilibre vie pro/perso", value: Number((company?.rating ?? 3.5) - 0.2) },
    { label: "Culture & valeurs", value: Number((company?.rating ?? 3.5) + 0.1) },
    { label: "Opportunités carrière", value: Number((company?.rating ?? 3.5) - 0.4) },
    { label: "Management", value: Number((company?.rating ?? 3.5) - 0.1) },
    { label: "Rémunération", value: Number((company?.rating ?? 3.5) + 0.3) },
  ];

  if (!company) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🏢</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Entreprise introuvable
        </h1>
        <Link
          href="/community/companies"
          className="text-emerald-600 hover:text-emerald-700 font-medium"
        >
          ← Voir toutes les entreprises
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-5 min-w-0">
          {/* Back */}
          <Link
            href="/community/companies"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft size={14} />
            Toutes les entreprises
          </Link>

          {/* Company Hero */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Cover */}
            <div className="h-28 bg-gradient-to-r from-emerald-600 to-teal-600" />
            <div className="px-6 pb-6">
              {/* Logo */}
              <div className="-mt-10 mb-4 w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-4xl">
                {company.logo}
              </div>

              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-gray-900">
                    {company.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Building2 size={14} />
                      {company.industry}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {company.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users2 size={14} />
                      {company.size} employés
                    </span>
                  </div>
                </div>

                {/* Rating summary */}
                <div className="text-center bg-gray-50 border border-gray-200 rounded-xl px-5 py-3">
                  <div className="text-4xl font-black text-gray-900">
                    {company.rating}
                  </div>
                  <StarDisplay rating={company.rating} />
                  <p className="text-xs text-gray-400 mt-1">
                    {company.reviewCount} avis
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                {company.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {company.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Rating breakdown */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award size={18} className="text-yellow-500" />
              Évaluations détaillées
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-3">
                {subRatings.slice(0, 3).map((r) => (
                  <RatingBar key={r.label} {...r} />
                ))}
              </div>
              <div className="space-y-3">
                {subRatings.slice(3).map((r) => (
                  <RatingBar key={r.label} {...r} />
                ))}
              </div>
            </div>

            {/* Would recommend */}
            <div className="mt-5 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-3">Recommanderiez-vous cette entreprise ?</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                    <ThumbsUp size={16} className="text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-lg font-black text-emerald-600">72%</div>
                    <div className="text-xs text-gray-400">Oui</div>
                  </div>
                </div>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "72%" }} />
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-lg font-black text-red-500">28%</div>
                    <div className="text-xs text-gray-400">Non</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-red-50 border-2 border-red-200 flex items-center justify-center">
                    <ThumbsDown size={16} className="text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex border-b border-gray-200">
              {(
                [
                  { key: "posts", label: "💬 Discussions", count: companyPosts.length },
                  { key: "salaires", label: "💰 Salaires", count: companySalaries.length },
                  { key: "avis", label: "⭐ Avis", count: company.reviewCount },
                ] as { key: typeof activeTab; label: string; count: number }[]
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? "text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-1.5 text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="p-4">
              {/* Posts tab */}
              {activeTab === "posts" && (
                <div className="space-y-3">
                  {companyPosts.length === 0 ? (
                    <div className="text-center py-10">
                      <MessageCircle size={32} className="text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">
                        Aucune discussion pour cette entreprise.
                      </p>
                      <Link
                        href="/community/new-post"
                        className="mt-2 inline-block text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                      >
                        Démarrer la discussion →
                      </Link>
                    </div>
                  ) : (
                    companyPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))
                  )}
                </div>
              )}

              {/* Salaires tab */}
              {activeTab === "salaires" && (
                <div className="space-y-3">
                  {companySalaries.length === 0 ? (
                    <div className="text-center py-10">
                      <DollarSign size={32} className="text-gray-300 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">
                        Aucun salaire reporté pour cette entreprise.
                      </p>
                    </div>
                  ) : (
                    companySalaries.map((sal) => (
                      <div
                        key={sal.id}
                        className="border border-gray-100 rounded-lg p-4 hover:border-emerald-200 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">
                              {sal.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Niveau : {sal.level} · {sal.city} · {sal.yearsExp} ans d'exp
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-lg font-black text-emerald-600">
                              {sal.baseSalary.toLocaleString("fr-MA")} MAD
                              <span className="text-xs font-normal text-gray-400">/mois</span>
                            </p>
                            <p className="text-xs text-gray-400">
                              TC :{" "}
                              {sal.totalComp.toLocaleString("fr-MA")} MAD/an
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">{sal.timeAgo}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Avis tab */}
              {activeTab === "avis" && (
                <div className="space-y-3">
                  {[
                    {
                      author: "Employé_Anonyme_1",
                      role: "Ingénieur Senior",
                      rating: 4,
                      pros: "Bons avantages, projets intéressants, équipe soudée.",
                      cons: "Évolution de carrière lente, processus RH bureaucratiques.",
                      recommend: true,
                      timeAgo: "il y a 2 semaines",
                    },
                    {
                      author: "AnonColleague_88",
                      role: "Chef de Projet",
                      rating: 3,
                      pros: "Stabilité, bonne réputation sur le marché.",
                      cons: "Management parfois dépassé, manque de modernité dans les outils.",
                      recommend: false,
                      timeAgo: "il y a 1 mois",
                    },
                    {
                      author: "SeniorDev_MA",
                      role: "Développeur",
                      rating: 4,
                      pros: "Flexibilité horaire, ambiance détendue dans l'équipe tech.",
                      cons: "Salaires en dessous du marché pour les profils expérimentés.",
                      recommend: true,
                      timeAgo: "il y a 3 semaines",
                    },
                  ].map((review, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-100 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                            {review.author.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {review.author}
                            </p>
                            <p className="text-xs text-gray-400">{review.role}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <StarDisplay rating={review.rating} />
                          {review.recommend ? (
                            <span className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <ThumbsUp size={10} /> Recommande
                            </span>
                          ) : (
                            <span className="text-xs text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <ThumbsDown size={10} /> Ne recommande pas
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-emerald-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-emerald-700 mb-1">
                            ✅ Points positifs
                          </p>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {review.pros}
                          </p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-3">
                          <p className="text-xs font-semibold text-red-600 mb-1">
                            ❌ Points négatifs
                          </p>
                          <p className="text-xs text-gray-600 leading-relaxed">
                            {review.cons}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">{review.timeAgo}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <CommunitySidebar />
      </div>
    </div>
  );
}
