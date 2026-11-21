import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { SocialPost } from "./social";
import { AuthProvider, useAuth } from "./AuthContext";
import { fetchPostsApi } from "./feedApi";
import { Navbar } from "./Navbar";
import { HomePage } from "./HomePage";
import { ProfilePage } from "./ProfilePage";

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    fetchPostsApi().then((data) => {
      if (mounted) {
        setPosts(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleAddPost = (content: string): void => {
    const newPost: SocialPost = {
      id: Date.now(),
      authorId: currentUser.id,
      authorName: currentUser.name,
      content,
      likes: 0,
      isLiked: false,
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleToggleLike = (postId: number): void => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleAddComment = (postId: number, commentText: string): void => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  authorName: currentUser.name,
                  content: commentText,
                },
              ],
            }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      {loading ? (
        <div className="mx-auto max-w-2xl px-4 py-10 text-center text-sm text-gray-500">
          Đang tải bài viết...
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                posts={posts}
                searchQuery={searchQuery}
                onAddPost={handleAddPost}
                onToggleLike={handleToggleLike}
                onAddComment={handleAddComment}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProfilePage
                posts={posts}
                onToggleLike={handleToggleLike}
                onAddComment={handleAddComment}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}