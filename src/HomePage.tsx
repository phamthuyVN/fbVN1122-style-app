import React from "react";
import type { SocialPost } from "./social";
import { PostComposer } from "./PostComposer";
import { PostItem } from "./PostItem";

interface HomePageProps {
  posts: SocialPost[];
  searchQuery: string;
  onAddPost: (content: string) => void;
  onToggleLike: (postId: number) => void;
  onAddComment: (postId: number, commentText: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  posts,
  searchQuery,
  onAddPost,
  onToggleLike,
  onAddComment,
}) => {
  const q = searchQuery.trim().toLowerCase();
  const visiblePosts = posts.filter(
    (p) =>
      !q ||
      p.content.toLowerCase().includes(q) ||
      p.authorName.toLowerCase().includes(q)
  );

  return (
    <main className="mx-auto max-w-2xl space-y-4 px-4 py-6">
      <PostComposer onAddPost={onAddPost} />
      {visiblePosts.length === 0 ? (
        <div className="rounded-xl bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
          Không tìm thấy bài viết phù hợp.
        </div>
      ) : (
        visiblePosts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            onToggleLike={onToggleLike}
            onAddComment={onAddComment}
          />
        ))
      )}
    </main>
  );
};