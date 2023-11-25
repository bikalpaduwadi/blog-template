import type { Comment, Post, User } from "@prisma/client";

export type AppPost = Post & { user: User };

export type AppComment = Comment & { user: User };
