"use client";

import Link from "next/link";
import { useState } from "react";
import {
  TrendingUp,
  Clock,
  Flame,
  ArrowRight,
  Star,
  Building2,
  DollarSign,
  MessageSquare,
  Shield,
  ChevronRight,
} from "lucide-react";
import PostCard, { TrendingPostRow } from "./components/PostCard";
import CommunitySidebar from "./components/CommunitySidebar";
import { POSTS, BOWLS, COMPANIES, COMMUNITY_STATS } from "./data/mock-data";

type FeedFilter = "hot" | "nouveau" | "top";

export default function CommunityHomePage() {
  const [filter, setFilter] = useState<FeedFilter>("hot");

  const filteredPosts = [...POSTS].sort((a, b) => {
    if (filter === "hot") return b.likes + b.comments - (a.likes + a.comments);
    if (filter === "top") return b.views - a.views;
    return 0; // "nouveau" => garder l'ordre original
  });

  const hotPosts = POSTS.filter((p) => p.isHot).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 rounded-2xl p-6 sm:p-8 mb-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 text-9xl font-black text-white select-none">🇲🇦</div>
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={18} className="text-emerald-200" />
            <span className="text-sm font-semibold text-emerald-200 uppercase tracking-wider">
              100% Anonyme
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mb-2 leading-tight">
            La communauté pro anonyme du Maroc
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base max-w-xl mb-5">
            Partagez votre vécu, comparez les salaires, discutez de carrière —
            sans jamais révéler votre identité. Rejoignez{" "}
            <strong>{COMMUNITY_STATS.totalMembers.toLocaleString("fr-MA")}</strong>{" "}
            professionnels marocains.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/community/new-post"
              className="inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-emerald-50 transition-colors shadow"
            >
              <MessageSquare size={15} />
              Publier anonymement
            </Link>
            <Link
              href="/community/salaires"
              className="inline-flex items-center gap-2 bg-emerald-500/40 text-white font-semibold px-4 py-2 rounded-lg text-sm hover:bg-emerald-500/60 transition-colors border border-emerald-400/40"
            >
              <DollarSign size={15} />
              Explorer les salaires
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Main feed */}
        <div className="space-y-5 min-w-0">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Membres", value: COMMUNITY_STATS.totalMembers.toLocaleString("fr-MA"), icon: "👥", color: "text-emerald-600" },
              { label: "En ligne", value: COMMUNITY_STATS.activeToday.toLocaleString("fr-MA"), icon: "🟢", color: "text-teal-600" },
              { label: "Posts / semaine", value: COMMUNITY_STATS.postsThisWeek.toLocaleString("fr-MA"), icon: "💬", color: "text-blue-600" },
              { label: "Entreprises", value: COMMUNITY_STATS.companiesListed.toString(), icon: "🏢", color: "text-purple-600" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-gray-200 rounded-xl p-4 text-center"
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className={`text-xl font-black ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Bowls rapides */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900 text-sm">Catégories populaires</h2>
              <Link
                href="/community/bowls"
                className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                Toutes <ChevronRight size={12} />
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {BOWLS.map((bowl) => (
                <Link
                  key={bowl.id}
                  href={`/community/bowl/${bowl.slug}`}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-transform hover:scale-105 ${bowl.color} border-current/20`}
                >
                  <span>{bowl.icon}</span>
                  <span>{bowl.name}</span>
                  <span className="opacity-60">
                    ({(bowl.memberCount / 1000).toFixed(1)}k)
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Feed tabs */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex border-b border-gray-200">
              {(
                [
                  { key: "hot", label: "🔥 Hot", },
                  { key: "nouveau", label: "🕐 Récents" },
                  { key: "top", label: "📈 Top" },
                ] as { key: FeedFilter; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`flex-1 py-3 text-sm font-medium transition-colors ${
                    filter === tab.key
                      ? "text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="divide-y divide-gray-100">
              {filteredPosts.map((post) => (
                <div key={post.id} className="p-4">
                  <PostCard post={post} />
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-100 text-center">
              <Link
                href="/community/feed"
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Voir toutes les discussions
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Companies Spotlight */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Building2 size={18} className="text-gray-700" />
                <h2 className="font-bold text-gray-900">Entreprises en vedette</h2>
              </div>
              <Link
                href="/community/companies"
                className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                Tout voir <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COMPANIES.slice(0, 4).map((company) => (
                <Link
                  key={company.id}
                  href={`/community/company/${company.slug}`}
                  className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group"
                >
                  <div className="text-3xl w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
                    {company.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-gray-900 group-hover:text-emerald-700 transition-colors truncate">
                      {company.name}
                    </div>
                    <div className="text-xs text-gray-500">{company.industry}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <Star size={11} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-xs font-medium text-gray-700">
                        {company.rating}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({company.reviewCount})
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <CommunitySidebar />
      </div>
    </div>
  );
}
