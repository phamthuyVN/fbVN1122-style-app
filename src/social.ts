export type PageKey = "home" | "profile";

export interface UserProfile {
  id: number;
  name: string;
  handle: string;
  bio: string;
}

export interface PostComment {
  id: number;
  authorName: string;
  content: string;
}

export interface SocialPost {
  id: number;
  authorId: number;
  authorName: string;
  content: string;
  likes: number;
  isLiked: boolean;
  comments: PostComment[];
}