import { useEffect, useRef, useState } from 'react';
import UploadMediaButton from '@/components/Buttons/UploadMediaButton/UploadMediaButton';
import { PreviewImageProps } from '@/types/PreviewImage';
import { imageIdentifier } from '@/types/ImageIdentifier';
import ImageOptimized from '@/components/ImageOptimized/ImageOptimized';

export default function PreviewAttachement({
  clean,
  deleteImage,
  getImage,
}: PreviewImageProps) {
  const [images, setImages] = useState<File[]>([]);
  const [preview, setPreview] = useState<imageIdentifier[]>([]);
  const FILE_SIZE_MAXIMUM = 10000000;

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
    if (files && files[0].size < FILE_SIZE_MAXIMUM) {
      const file = Array.from(files);
      if (images == null) setImages(file);
      else setImages((prevImage) => prevImage.concat(file));

      if (preview == null)
        setPreview([
          {
            url: URL.createObjectURL(files[0]),
            name: files[0].name,
            size: file[0].size,
          },
        ]);
      else
        setPreview((prev) =>
          prev.concat({
            url: URL.createObjectURL(files[0]),
            name: files[0].name,
            size: file[0].size,
          })
        );
    }
  };

  // reference to the hidden input so a custom button may be used
  const hiddenFileInput = useRef(null);

  // redirect function that allows a click on a button to be a click on an input
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const removeImage = (value: imageIdentifier) => {
    if (confirm('Remove image?') == true) {
      setPreview((oldValues) => {
        return oldValues.filter((img) => img.url !== value.url);
      });

      setImages((oldValues) => {
        return oldValues.filter(
          (img) => !(img.name == value.name && img.size == value.size)
        );
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
                      src={imgPreview.url}
                      alt={imgPreview.url}
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
