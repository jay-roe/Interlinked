import { useState } from 'react';
import CreatePost from './CreatePost/CreatePost';
import PreviewAttachement from './PreviewAttachement/PreviewAttachement';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/config/firebase';
import { Post } from '@/types/Post';

export default function CreatePostGroup() {
  const { currentUser, authUser } = useAuth();
  const [image, setImage] = useState<File>();
  const [text, setText] = useState<string>('');
  const [imageURL, setImageURL] = useState<string>(''); // link to download image from firestore
  const [post, setPost] = useState<Post>();

  const retrieveText = (text: string) => {
    setText(text);
    createPost();
  };

  const retreiveImage = (file: File) => {
    setImage(file);
  };

  const defineAndSetPost = () => {
    let definePost: Post = {
      authorID: authUser.uid,
      author: currentUser.name,
      title: 'post', // is a title needed?
      text_content: text, // text from createPost component
      image_content: imageURL, // URL created after image has been uploaded to firestore storage
      likes: null,
      comments: null,
      date: null,
      meta_tags: null,
    };
    setPost(definePost);
  };

  async function createPost() {
    try {
      if (image != null) {
        const name = '`image/' + image.name + '`';
        const storageRef = ref(storage, `image/`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            alert('Image upload failed');
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageURL(downloadURL);
            });

            alert('image uploaded successfully');
          }
        );
      }
      defineAndSetPost();
      // TO DO: UPLOAD POST TO FIRESTORE
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
