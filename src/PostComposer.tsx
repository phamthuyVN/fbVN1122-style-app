import React, { useState } from "react";
import { useAuth } from "./AuthContext";

interface PostComposerProps {
  onAddPost: (content: string) => void;
}

export const PostComposer: React.FC<PostComposerProps> = ({ onAddPost }) => {
  const { currentUser } = useAuth();
  const [content, setContent] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = content.trim();
    if (!text) return;
    onAddPost(text);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl bg-white p-4 shadow-sm">
      <textarea
        rows={3}
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setContent(e.target.value)
        }
        placeholder={`${currentUser.name} ơi, bạn đang nghĩ gì thế?`}
        className="w-full resize-none rounded-lg bg-gray-100 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Đăng bài
        </button>
      </div>
    </form>
  );
};