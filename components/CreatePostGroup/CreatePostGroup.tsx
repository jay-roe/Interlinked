import { useState } from 'react';
import CreatePost from './CreatePost/CreatePost';
import PreviewAttachement from './PreviewAttachement/PreviewAttachement';
import {
  FieldValue,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/config/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import firebase, { firestore, storage } from '@/config/firebase';
import { Post } from '@/types/Post';

export default function CreatePostGroup() {
  const { currentUser, authUser } = useAuth();
  const [image, setImage] = useState<File>();
  const [upload, setUpload] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState<string>(''); // link to download image from firestore

  const retrieveText = async (text: string) => {
    await createPost(text).then(() => {
      setImageURL('');
      setImage(null);
    });
  };

  const retreiveImage = (file: File) => {
    setImage(file);
  };

  const defineAndSetPost = async (text: string, pic: string) => {
    let definePost: Post = {
      authorID: authUser.uid,
      author: currentUser.name,
      title: 'post', // is a title needed?
      text_content: text, // text from createPost component
      image_content: pic, // URL created after image has been uploaded to firestore storage
      likes: null,
      comments: null,
      date: null,
      meta_tags: null,
    };

    console.log(definePost);
    //setPost(definePost);
    // TO DO: UPLOAD POST TO FIRESTORE
    // const postRef = doc(collection(db.posts, "posts"));
    const docRef = doc(db.posts);
    await setDoc(docRef, definePost);
    // set date field to timestamp of uploaded post
    await updateDoc(docRef, {
      date: serverTimestamp(),
    });
  };

  async function createPost(text: string) {
    try {
      if (image != null) {
        console.log('image not null ');
        const name = '`image/' + image.name + '`';
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            alert('Image upload failed');
          },
          async () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              defineAndSetPost(text, downloadURL);
            });

            alert('image uploaded successfully');
          }
        );
      } else {
        defineAndSetPost(text, '');
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="my-7 flex flex-row align-top">
      <div className=" flex items-center gap-5 ">
        <div>
          <CreatePost getText={retrieveText} />
        </div>

        <div>
          <PreviewAttachement getImage={retreiveImage} />
        </div>
      </div>
    </div>
  );
}
