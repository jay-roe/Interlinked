import Button from '@/components/Buttons/Button';
import PostButton from '@/components/Buttons/PostButton/PostButton';
import { useAuth } from '@/contexts/AuthContext';
import type { Post } from '@/types/Post';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import UploadMediaButton from '@/components/Buttons/UploadMediaButton/UploadMediaButton';
import RemoveImageButton from '@/components/Buttons/RemoveImageButton/RemoveImageButton';

export default function PreviewAttachement(props: any) {
  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  useEffect(() => {
    props.getImage(images);
  }, [images]);

  useEffect(() => {
    if (props.clean) {
      setPreview([]);
      setImages([]);
    }
  }, [props.clean]);

  const handleSelectedFile = (files: FileList) => {
    if (files && files[0].size < 10000000) {
      const file = Array.from(files);
      if (images == null) setImages(file);
      else setImages((prevImage) => prevImage.concat(file));
      if (preview == null) setPreview([URL.createObjectURL(files[0])]);
      else setPreview((prev) => prev.concat(URL.createObjectURL(files[0])));
    }
  };

  // reference to the hidden input so a custom button may be used
  const hiddenFileInput = useRef(null);

  // redirect function that allows a click on a button to be a click on an input
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleFileSubmition = () => {
    props.getImage(images);
    setPreview([]);
  };

  const removeImage = (value: string) => {
    if (confirm('Remove image?') == true) {
      setPreview((oldValues) => {
        return oldValues.filter((img) => img !== value);
      });

      setImages((oldValues) => {
        return oldValues.filter((img) => URL.createObjectURL(img) !== value);
      });

      props.deleteImage(value);
    }
  };

  return (
    <>
      <div className=" flex  font-para-med ">
        <div className=" rounded-lg   bg-purple-component p-4 px-7 font-para-med shadow-lg ">
          <h1 className="text-2xl font-bold text-white">Preview Attachments</h1>

          <ul className=" h-[12rem] overflow-y-auto ">
            {preview != null &&
              preview.map((imgPreview, key) => {
                return (
                  <li className="hover:border-red-900" key={key}>
                    <button
                      className="hover:border-red-900"
                      onClick={() => removeImage(imgPreview)}
                    >
                      <img
                        className="h-[13rem] w-[13rem] object-scale-down  "
                        src={imgPreview}
                      ></img>
                    </button>
                  </li>
                );
              })}
          </ul>

          <div className="flex justify-end">
            <button onClick={handleClick}>
              <UploadMediaButton />
            </button>
            <input
              id="image_upload"
              type="file"
              accept="image/*"
              ref={hiddenFileInput}
              onChange={(files) => handleSelectedFile(files.target.files)}
              style={{ display: 'none' }}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}
