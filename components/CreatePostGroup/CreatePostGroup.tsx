import { useEffect, useState } from 'react';
import CreatePost from './CreatePost/CreatePost';
import PreviewAttachement from './PreviewAttachement/PreviewAttachement';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firestore';
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
    await createPost(text).then(() => {
      //  setImage(null);
    });
  };

  const removeImage = (value: string) => {
    alert('deleted' + value);
    setImage((oldValues) => {
      return oldValues.filter((img) => URL.createObjectURL(img) !== value);
    });
  };

  const retreiveImage = (file: File[]) => {
    setImage(file);
  };

  const defineAndSetPost = async (text: string, pics: string[]) => {
    let definePost: Post = {
      authorID: authUser.uid,
      author: currentUser.name || currentUser.email,
      title: 'post', // is a title needed?
      text_content: text, // text from createPost component
      image_content: pics, // URL created after images has been uploaded to firestore storage
      likes: null,
      comments: null,
      date: null,
      meta_tags: null,
    };

    const docRef = doc(db.posts);
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
      if (image != null) {
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
    <div className="my-7 flex flex-row align-top">
      <div className=" flex items-center gap-5 ">
        <div>
          <CreatePost getText={retrieveText} />
        </div>

        <div>
          <PreviewAttachement
            clean={trigger}
            deleteImage={removeImage}
            getImage={retreiveImage}
          />
        </div>
      </div>
    </div>
  );
}
