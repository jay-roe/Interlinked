import { imageIdentifier } from './ImageIdentifier';

export interface PreviewImageProps {
  clean: number;
  deleteImage: (name: imageIdentifier) => void;
  getImage: (file: File[]) => void;
}
