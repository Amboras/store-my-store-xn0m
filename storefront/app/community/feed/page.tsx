"use client";

import { useState } from "react";
import Link from "next/link";
import { SlidersHorizontal, Search, ChevronDown } from "lucide-react";
import PostCard from "../components/PostCard";
import CommunitySidebar from "../components/CommunitySidebar";
import { POSTS, BOWLS } from "../data/mock-data";

type SortOption = "hot" | "nouveau" | "top" | "controversial";

export default function FeedPage() {
  const [sort, setSort] = useState<SortOption>("hot");
  const [selectedBowl, setSelectedBowl] = useState<string>("all");
  const [search, setSearch] = useState("");

  const sortedAndFiltered = [...POSTS]
    .filter((p) => {
      const matchBowl = selectedBowl === "all" || p.bowlSlug === selectedBowl;
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.body.toLowerCase().includes(search.toLowerCase());
      return matchBowl && matchSearch;
    })
    .sort((a, b) => {
      if (sort === "hot") return b.likes + b.comments * 2 - (a.likes + a.comments * 2);
      if (sort === "top") return b.views - a.views;
      if (sort === "controversial") return b.comments - a.comments;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-4 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h1 className="text-2xl font-black text-gray-900">
              Fil de discussion
            </h1>
            <Link
              href="/community/new-post"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              + Nouvelle discussion
            </Link>
          </div>

          {/* Filters bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
            {/* Search */}
            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher dans les discussions…"
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Sort + Bowl filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <SlidersHorizontal size={14} className="text-gray-400" />
              <span className="text-xs text-gray-500 font-medium">Trier :</span>
              {(
                [
                  { key: "hot", label: "🔥 Hot" },
                  { key: "nouveau", label: "🕐 Récents" },
                  { key: "top", label: "📈 Top vues" },
                  { key: "controversial", label: "💬 Débattus" },
                ] as { key: SortOption; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSort(opt.key)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    sort === opt.key
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Bowl filter */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-500 font-medium">Catégorie :</span>
              <button
                onClick={() => setSelectedBowl("all")}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedBowl === "all"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Toutes
              </button>
              {BOWLS.map((bowl) => (
                <button
                  key={bowl.id}
                  onClick={() => setSelectedBowl(bowl.slug)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    selectedBowl === bowl.slug
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {bowl.icon} {bowl.name}
                </button>
              ))}
            </div>
          </div>

          {/* Posts count */}
          <p className="text-sm text-gray-500 px-1">
            {sortedAndFiltered.length} discussion
            {sortedAndFiltered.length > 1 ? "s" : ""}
            {selectedBowl !== "all" && (
              <span className="text-emerald-600 font-medium">
                {" "}
                dans «{" "}
                {BOWLS.find((b) => b.slug === selectedBowl)?.name ?? selectedBowl}{" "}
                »
              </span>
            )}
          </p>

          {/* Posts list */}
          <div className="space-y-3">
            {sortedAndFiltered.length === 0 ? (
              <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-gray-500 text-sm">Aucune discussion trouvée.</p>
                <Link
                  href="/community/new-post"
                  className="mt-4 inline-block text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Soyez le premier à publier !
                </Link>
              </div>
            ) : (
              sortedAndFiltered.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>

        <CommunitySidebar />
      </div>
    </div>
  );
}
