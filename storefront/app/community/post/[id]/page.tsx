"use client";

import { useState } from "react";
import Link from "next/link";
import { use } from "react";
import {
  ThumbsUp,
  MessageCircle,
  Eye,
  Share2,
  Bookmark,
  Flag,
  ArrowLeft,
  Send,
  ChevronDown,
  ChevronUp,
  Flame,
  Pin,
} from "lucide-react";
import CommunitySidebar from "../../components/CommunitySidebar";
import { POSTS, COMMENTS_P1 } from "../../data/mock-data";
import type { Comment } from "../../data/mock-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [liked, setLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [localLikes, setLocalLikes] = useState(comment.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLocalLikes((v) => (liked ? v - 1 : v + 1));
  };

  return (
    <div className={depth > 0 ? "ml-6 border-l-2 border-gray-100 pl-4" : ""}>
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-2">
        {/* Author row */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold">
            {comment.author.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-800">
              {comment.author}
            </span>
            <span className="text-xs text-gray-400 ml-2">@ {comment.company}</span>
          </div>
          <span className="ml-auto text-xs text-gray-400">{comment.timeAgo}</span>
        </div>

        {/* Body */}
        <p className="text-sm text-gray-700 leading-relaxed mb-3">{comment.body}</p>

        {/* Actions */}
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 transition-colors ${
              liked ? "text-emerald-600 font-medium" : "hover:text-gray-600"
            }`}
          >
            <ThumbsUp size={12} />
            {localLikes}
          </button>
          <button className="flex items-center gap-1 hover:text-gray-600 transition-colors">
            <MessageCircle size={12} />
            Répondre
          </button>
          <button className="flex items-center gap-1 hover:text-red-500 transition-colors ml-auto">
            <Flag size={12} />
          </button>
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div>
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 mb-2 ml-2"
          >
            {showReplies ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {comment.replies.length} réponse(s)
          </button>
          {showReplies &&
            comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
            ))}
        </div>
      )}
    </div>
  );
}

export default function PostDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const post = POSTS.find((p) => p.id === id);
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post?.likes ?? 0);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(
    id === "p1" ? COMMENTS_P1 : []
  );

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Post introuvable</h1>
        <Link
          href="/community"
          className="text-emerald-600 hover:text-emerald-700 font-medium"
        >
          ← Retour à la communauté
        </Link>
      </div>
    );
  }

  const handleLike = () => {
    setLiked(!liked);
    setLocalLikes((v) => (liked ? v - 1 : v + 1));
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: `cm_new_${Date.now()}`,
      postId: post.id,
      author: "Anonyme_" + Math.floor(Math.random() * 9999),
      company: "Votre entreprise",
      body: commentText.trim(),
      likes: 0,
      timeAgo: "À l'instant",
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-4 min-w-0">
          {/* Back */}
          <Link
            href="/community/feed"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft size={14} />
            Retour au fil
          </Link>

          {/* Post article */}
          <article className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Post header */}
            <div className="p-5 border-b border-gray-100">
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
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
                  className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full hover:bg-emerald-100 transition-colors"
                >
                  {post.bowl}
                </Link>
              </div>

              <h1 className="text-xl font-black text-gray-900 leading-tight mb-4">
                {post.title}
              </h1>

              {/* Author info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
                  {post.author.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-800">
                    {post.author}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Link
                      href={`/community/company/${post.companySlug}`}
                      className="hover:text-emerald-600 transition-colors"
                    >
                      @ {post.company}
                    </Link>
                    <span>·</span>
                    <span>{post.timeAgo}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Post body */}
            <div className="p-5">
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {post.body}
              </div>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-full cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions bar */}
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex items-center gap-2 flex-wrap">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  liked
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600"
                }`}
              >
                <ThumbsUp size={14} />
                {localLikes}
              </button>

              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-white border border-gray-200 text-gray-600 hover:border-emerald-300 hover:text-emerald-600 transition-colors">
                <MessageCircle size={14} />
                {comments.length + post.comments} commentaires
              </button>

              <div className="flex items-center gap-1 text-xs text-gray-400 ml-1">
                <Eye size={12} />
                {post.views.toLocaleString("fr-MA")} vues
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`p-2 rounded-lg transition-colors ${
                    bookmarked
                      ? "text-amber-500 bg-amber-50"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  }`}
                  title="Sauvegarder"
                >
                  <Bookmark size={16} />
                </button>
                <button
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                  title="Partager"
                >
                  <Share2 size={16} />
                </button>
                <button
                  className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  title="Signaler"
                >
                  <Flag size={16} />
                </button>
              </div>
            </div>
          </article>

          {/* Comment composer */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Répondre anonymement
            </h3>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs font-bold shrink-0">
                A
              </div>
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                  placeholder="Partagez votre expérience ou votre avis anonymement…"
                  className="w-full text-sm border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none placeholder:text-gray-400"
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400">
                    Votre identité reste totalement anonyme 🔒
                  </p>
                  <button
                    onClick={handleSubmitComment}
                    disabled={!commentText.trim()}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                  >
                    <Send size={13} />
                    Publier
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">
              {comments.length} commentaire{comments.length > 1 ? "s" : ""}
            </h3>
            {comments.length === 0 ? (
              <div className="text-center py-10 bg-white border border-gray-200 rounded-xl">
                <div className="text-3xl mb-2">💬</div>
                <p className="text-gray-500 text-sm">
                  Aucun commentaire pour l'instant. Soyez le premier !
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <CommunitySidebar />
      </div>
    </div>
  );
}
