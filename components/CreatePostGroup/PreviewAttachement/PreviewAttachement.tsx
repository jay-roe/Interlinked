import Button from '@/components/Buttons/Button';
import PostButton from '@/components/Buttons/PostButton/PostButton';
import { useAuth } from '@/contexts/AuthContext';
import type { Post } from '@/types/Post';
import Link from 'next/link';
import { useState } from 'react';
import UploadMediaButton from '@/components/Buttons/UploadMediaButton/UploadMediaButton';
import RemoveImageButton from '@/components/Buttons/RemoveImageButton/RemoveImageButton';

export default function PreviewAttachement(props: any) {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>('');

  const handleSelectedFile = (files: FileList) => {
    if (files && files[0].size < 10000000) {
      setImage(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleFileSubmition = () => {
    props.getImage(image);
    setPreview('');
  };

  return (
    <>
      <div className=" flex font-para-med ">
        <div className=" rounded-lg   bg-purple-component p-4 px-7 font-para-med shadow-lg ">
          <h1 className="text-2xl font-bold text-white">Preview Attachments</h1>
          {preview == '' ? (
            <input
              type="file"
              accept="image/*"
              onChange={(files) => handleSelectedFile(files.target.files)}
            ></input>
          ) : (
            <>
              <img
                className="h-[15rem] w-[15rem] object-scale-down  "
                src={preview}
              ></img>
              <div className="flex ">
                <button onClick={() => setPreview('')}>
                  <RemoveImageButton />
                </button>

                <div className="flex justify-end">
                  <button onClick={handleFileSubmition}>
                    <UploadMediaButton />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
