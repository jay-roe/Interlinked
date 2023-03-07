import type { Timestamp } from 'firebase/firestore';

export type Post = {
  authorID: string; // ID related to author found in DB
  author: string;
  title: string;
  text_content?: string;
  image_content?: string[];
  likes?: Like[];
  comments?: Comment[];
  date: Timestamp;
  meta_tags?: string[]; //descriptors of the post to help refine user's feed based on preference
  // ex: meme, advertisement, python, lisp,
};

export interface PostWithId extends Post {
  postId: string;
}

export type Comment = {
  authorID: string;
  author: string;
  content: string;
  date: Timestamp;
};

export type Like = {
  authorID: string;
  author: string;
};
