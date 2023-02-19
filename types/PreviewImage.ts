export interface PreviewImageProps {
  clean: number;
  deleteImage: (name: string) => void;
  getImage: (file: File[]) => void;
}
