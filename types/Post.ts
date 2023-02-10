import type { Timestamp } from "firebase/firestore";

export type Post = {
  title: string;
  text_content?: string;
  image_content?: string;
  author: string;
  userID: string;      // ID related to author found in DB
  likes?: Like[];
  comments?: Comment[];
  date: Timestamp;
  meta_tags?: string[];  //descriptors of the post to help refine user's feed based on preference
                        // ex: meme, advertisement, python, lisp,
};

export type Comment = {
    author: string;
    content: string;
    date: Timestamp;

}

export type Like = {
    authorID: string;
}