"use client";

import Link from "next/link";
import { ThumbsUp, MessageCircle, Eye, TrendingUp, Pin, Flame } from "lucide-react";
import type { Post } from "../data/mock-data";

interface PostCardProps {
  post: Post;
  compact?: boolean;
}

export default function PostCard({ post, compact = false }: PostCardProps) {
  return (
    <Link
      href={`/community/post/${post.id}`}
      className="block group"
    >
      <article
        className={`bg-white border border-gray-200 rounded-xl hover:border-emerald-400 hover:shadow-md transition-all duration-200 ${
          compact ? "p-4" : "p-5"
        }`}
      >
        {/* Badges */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {post.isPinned && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              <Pin size={10} /> Épinglé
            </span>
          )}
          {post.isHot && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
              <Flame size={10} /> Hot
            </span>
          )}
          <Link
            href={`/community/bowl/${post.bowlSlug}`}
            onClick={(e) => e.stopPropagation()}
            className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full hover:bg-emerald-100 transition-colors"
          >
            {post.bowl}
          </Link>
        </div>

        {/* Title */}
        <h3
          className={`font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug mb-2 ${
            compact ? "text-sm" : "text-base"
          }`}
        >
          {post.title}
        </h3>

        {/* Body preview */}
        {!compact && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">
            {post.body}
          </p>
        )}

        {/* Tags */}
        {!compact && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-xs font-bold text-gray-600">
              {post.author.slice(0, 2).toUpperCase()}
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-gray-700 font-medium">{post.author}</span>
              <Link
                href={`/community/company/${post.companySlug}`}
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-gray-400 hover:text-emerald-600 transition-colors"
              >
                @ {post.company}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <ThumbsUp size={12} />
              {post.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle size={12} />
              {post.comments}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={12} />
              {post.views.toLocaleString("fr-MA")}
            </span>
            <span className="text-gray-300">{post.timeAgo}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

// ─── Trending sidebar card ────────────────────────────────────────────────────

interface TrendingPostRowProps {
  post: Post;
  rank: number;
}

export function TrendingPostRow({ post, rank }: TrendingPostRowProps) {
  return (
    <Link
      href={`/community/post/${post.id}`}
      className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0 group hover:bg-gray-50 px-1 rounded-lg transition-colors"
    >
      <span className="text-2xl font-black text-gray-200 w-6 text-center leading-none mt-0.5">
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
          {post.title}
        </p>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
          <TrendingUp size={10} />
          <span>{post.likes} likes</span>
          <span>·</span>
          <span>{post.comments} commentaires</span>
        </div>
      </div>
    </Link>
  );
}
