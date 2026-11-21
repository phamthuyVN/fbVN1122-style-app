import React, { useState } from "react";
import type { SocialPost } from "./social";
import { useAuth } from "./AuthContext";

interface PostItemProps {
  post: SocialPost;
  onToggleLike: (postId: number) => void;
  onAddComment: (postId: number, commentText: string) => void;
}

export const PostItem: React.FC<PostItemProps> = ({
  post,
  onToggleLike,
  onAddComment,
}) => {
  const { currentUser } = useAuth();
  const [commentInput, setCommentInput] = useState<string>("");

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const trimmed = commentInput.trim();
    if (!trimmed) return;
    onAddComment(post.id, trimmed);
    setCommentInput("");
  };

  return (
    <article className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-sm font-bold text-gray-900">{post.authorName}</h3>
        <p className="mt-1 whitespace-pre-line text-sm text-gray-800">
          {post.content}
        </p>
      </div>

      <div className="border-t pt-2">
        <button
          type="button"
          onClick={() => onToggleLike(post.id)}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
            post.isLiked
              ? "bg-blue-100 text-blue-600"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          👍 Like ({post.likes})
        </button>
      </div>

      <div className="space-y-2 border-t pt-3">
        <p className="text-xs font-semibold text-gray-500">Bình luận:</p>
        {post.comments.map((c) => (
          <div key={c.id} className="rounded-lg bg-gray-100 px-3 py-2 text-sm">
            <span className="font-semibold">{c.authorName}: </span>
            <span>{c.content}</span>
          </div>
        ))}

        <form onSubmit={handleCommentSubmit} className="flex gap-2">
          <input
            type="text"
            value={commentInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCommentInput(e.target.value)
            }
            placeholder={`Bình luận dưới tên ${currentUser.name}...`}
            className="flex-1 rounded-full bg-gray-100 px-3.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="rounded-full bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white"
          >
            Gửi
          </button>
        </form>
      </div>
    </article>
  );
};