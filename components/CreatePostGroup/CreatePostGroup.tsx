import { useState } from 'react';
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
  const [URLs, setURLs] = useState<string[]>(['']);
  const [uploadAmount, setUploadAmount] = useState<number>(0);

  const retrieveText = async (text: string) => {
    await createPost(text).then(() => {
      setImage(null);
    });
  };

  const retreiveImage = (file: File[]) => {
    setImage(file);
  };

  const defineAndSetPost = async (text: string, pics: string[]) => {
    console.log('inside defineandsetpostfunction');
    let definePost: Post = {
      authorID: authUser.uid,
      author: currentUser.name,
      title: 'post', // is a title needed?
      text_content: text, // text from createPost component
      image_content: pics, // URL created after images has been uploaded to firestore storage
      likes: null,
      comments: null,
      date: null,
      meta_tags: null,
    };

    console.log(definePost);
    //setPost(definePost);
    // TO DO: UPLOAD POST TO FIRESTORE
    // const postRef = doc(collection(db.posts, "posts"));
    console.log('posting post on firebase');
    const docRef = doc(db.posts);
    await setDoc(docRef, definePost);
    // set date field to timestamp of uploaded post
    await updateDoc(docRef, {
      date: serverTimestamp(),
    });
  };

  async function upLoadImage(img: File, text: string) {
    console.log('inside upload image function');

    let storageRef = ref(storage, '`image/' + img.name + '`');

    const uploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        alert('Image upload failed');
      },
      async () => {
        console.log('getting URL');
        await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUploadAmount((a) => a + 1);

          setURLs([url, url, url]);
          console.log(URLs);
          console.log(URLs.length + ' : ' + image.length);
          if (URLs.length === image.length) {
            defineAndSetPost(text, URLs);
            console.log('making post now');
          }
        });
      }
    );
  }

  async function createPost(text: string) {
    try {
      if (image != null) {
        console.log(
          'images are not null: there are currently' + image.length + ' images'
        );
        image.forEach((img) => {
          upLoadImage(img, text);
        });
        // console.log("uploading image");
        //  const downloadRefs= await Promise.all(image.map( async (img) => await upLoadImage(img)))
        //  console.log("getting urls");
        //  const downloadURLs = await Promise.all(downloadRefs.map( async (ref) => await getURLs(ref)))
        //  console.log("making post");
        //  defineAndSetPost(text, downloadURLs)
        //console.log(downloadURLs);
      } else {
        console.log('images are  null');
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
          <PreviewAttachement getImage={retreiveImage} />
        </div>
      </div>
    </div>
  );
}
