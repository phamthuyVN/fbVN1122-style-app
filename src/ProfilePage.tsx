import React, { useState } from "react";
import type{ SocialPost } from "./social";
import { useAuth } from "./AuthContext";
import { PostItem } from "./PostItem";

interface ProfilePageProps {
  posts: SocialPost[];
  onToggleLike: (postId: number) => void;
  onAddComment: (postId: number, commentText: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  posts,
  onToggleLike,
  onAddComment,
}) => {
  const { currentUser, updateBio } = useAuth();
  const [bioText, setBioText] = useState<string>(currentUser.bio);

  const userPosts = posts.filter((p) => p.authorId === currentUser.id);

  const handleSaveBio = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    updateBio(bioText.trim() || currentUser.bio);
  };

  return (
    <main className="mx-auto max-w-2xl space-y-4 px-4 py-6">
      <section className="rounded-xl bg-white p-5 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">{currentUser.name}</h1>
        <p className="text-xs text-gray-500">{currentUser.handle}</p>
        <p className="mt-2 text-sm text-gray-700">{currentUser.bio}</p>
        <p className="mt-2 text-xs font-semibold text-blue-600">
          Số bài viết của bạn: {userPosts.length}
        </p>

        <form onSubmit={handleSaveBio} className="mt-4 flex gap-2">
          <input
            type="text"
            value={bioText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBioText(e.target.value)
            }
            className="flex-1 rounded-lg border px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white"
          >
            Cập nhật Bio
          </button>
        </form>
      </section>

      {userPosts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onToggleLike={onToggleLike}
          onAddComment={onAddComment}
        />
      ))}
    </main>
  );
};