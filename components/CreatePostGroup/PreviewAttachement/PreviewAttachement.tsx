import { useEffect, useRef, useState } from 'react';
import UploadMediaButton from '@/components/Buttons/UploadMediaButton/UploadMediaButton';
import { PreviewImageProps } from '@/types/PreviewImage';
import ImageOptimized from '@/components/ImageOptimized/ImageOptimized';

export default function PreviewAttachement({
  clean,
  deleteImage,
  getImage,
}: PreviewImageProps) {
  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  useEffect(() => {
    getImage(images);
  }, [images]);

  useEffect(() => {
    if (clean) {
      setPreview([]);
      setImages([]);
    }
  }, [clean]);

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

  const removeImage = (value: string) => {
    if (confirm('Remove image?') == true) {
      setPreview((oldValues) => {
        return oldValues.filter((img) => img !== value);
      });

      setImages((oldValues) => {
        return oldValues.filter((img) => URL.createObjectURL(img) !== value);
      });

      deleteImage(value);
      hiddenFileInput.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-lg bg-purple-component p-4 px-7 shadow-lg ">
        <h1 className="text-2xl text-white">Preview Attachments</h1>

        <ul className="h-[12rem] overflow-y-auto">
          {preview != null &&
            preview.map((imgPreview, key) => {
              return (
                <li className="" key={key}>
                  <button
                    data-testid={`remove-image-${key}`}
                    className="hover:bg-red-900"
                    onClick={() => removeImage(imgPreview)}
                  >
                    <ImageOptimized
                      className="h-[13rem] w-[13rem] object-scale-down hover:opacity-50"
                      src={imgPreview}
                      alt={imgPreview}
                      width={208}
                      height={208}
                    />
                  </button>
                </li>
              );
            })}
        </ul>

        <div className="flex justify-end">
          <button data-testid="upload-pic" onClick={handleClick}>
            <UploadMediaButton />
          </button>
          <input
            id="image_upload"
            data-testid="image-upload"
            type="file"
            accept="image/*"
            ref={hiddenFileInput}
            onChange={(files) => handleSelectedFile(files.target.files)}
            style={{ display: 'none' }}
          ></input>
        </div>
      </div>
    </div>
  );
}
