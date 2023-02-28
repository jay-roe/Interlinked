import { User } from '../types/User';
import { Post, Comment } from '../types/Post';
import { firestore } from './firebase';
import { collection } from 'firebase/firestore';
import type { QueryDocumentSnapshot } from 'firebase/firestore';

// Visit this article for a description of the approach to get types in Firestore: https://medium.com/swlh/using-firestore-with-typescript-65bd2a602945

// Enforce retrieved data is of generic type
const converter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

// Converts collection path to typed collection
const dataPoint = <T>(collectionPath: string) =>
  collection(firestore, collectionPath).withConverter(converter<T>());

// List of supported collections exported as 'db'
export const db = {
  users: dataPoint<User>('users'),
  posts: dataPoint<Post>('posts'),
};
