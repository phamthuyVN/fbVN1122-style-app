import type { SocialPost } from "./social";

export const DEFAULT_POSTS: SocialPost[] = [
  {
    id: 1,
    authorId: 1,
    authorName: "Phạm Thị Thúy",
    content:
      "2026/11/04 Grateful for the first day of my Mini Social Network project!",
    likes: 1,
    isLiked: true,
    comments: [
      {
        id: 11,
        authorName: "Người bạn đồng hành",
        content: "Chúc mừng dự án mới!",
      },
    ],
  },
];

export function fetchPostsApi(): Promise<SocialPost[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DEFAULT_POSTS);
    }, 200);
  });
}