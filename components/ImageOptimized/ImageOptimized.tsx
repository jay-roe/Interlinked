import NextImage from 'next/image';
import type { ImageProps } from 'next/image';

export default function ImageOptimized(props: ImageProps) {
  return (
    <NextImage
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcu/bSbAAHRALZD7Io9wAAAABJRU5ErkJggg=="
      alt={props.alt}
      {...props}
      src={props.src || ''}
    />
  );
}
