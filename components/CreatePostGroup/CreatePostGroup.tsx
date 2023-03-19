import { useEffect, useState } from 'react';
import CreatePost from './CreatePost/CreatePost';
import { imageIdentifier } from '@/types/ImageIdentifier';
import PreviewAttachement from './PreviewAttachement/PreviewAttachement';
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';
import { useAuth } from '@/contexts/AuthContext';
import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '@/config/firebase';
import { Post } from '@/types/Post';

export default function CreatePostGroup() {
  const { currentUser, authUser } = useAuth();
  const [image, setImage] = useState<File[]>([]);
  const [URLs, setURLs] = useState<string[]>([]);
  const [text, setText] = useState<string>();
  const [trigger, setTrigger] = useState(0);

  const retrieveText = async (text: string) => {
    await createPost(text).then(() => {});
  };

  const removeImage = (value: imageIdentifier) => {
    setImage((oldValues) => {
      return oldValues.filter(
        (img) => !(img.name == value.name && img.size == value.size)
      );
    });
  };

  const retreiveImage = (file: File[]) => {
    setImage(file);
  };

  const defineAndSetPost = async (text: string, pics: string[]) => {
    let definePost: Post = {
      authorID: authUser.uid,
      author: currentUser.name || currentUser.email,
      title: null, // is a title needed?
      text_content: text, // text from createPost component
      image_content: pics, // URL created after images has been uploaded to firestore storage
      likes: [],
      comments: [],
      date: null,
      meta_tags: [],
    };

    const docRef = doc(
      typeCollection<Post>(collection(doc(db.users, authUser.uid), 'posts'))
    );
    await setDoc(docRef, definePost);
    await updateDoc(docRef, {
      date: serverTimestamp(),
    });

    setTrigger((trig) => trig + 1);
    alert('Posted!');
  };

  async function upLoadImage(img: File, text: string) {
    let storageRef = ref(storage, '`image/' + img.name + '`');

    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        alert('Image upload failed');
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setURLs((prev) => [...prev, url]);
        });
      }
    );
  }

  useEffect(() => {
    if (image.length != 0 && URLs.length === image.length) {
      defineAndSetPost(text, URLs);
      setImage([]);
      setURLs([]);
    }
  }, [URLs]);

  async function createPost(text: string) {
    try {
      if (image.length != 0) {
        setText(text);
        image.forEach((img) => {
          upLoadImage(img, text);
        });
      } else {
        defineAndSetPost(text, []);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      data-testid="create-post"
      className="my-7 grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2-1"
    >
      <CreatePost getText={retrieveText} />
      <PreviewAttachement
        clean={trigger}
        deleteImage={removeImage}
        getImage={retreiveImage}
      />
    </div>
  );
}
