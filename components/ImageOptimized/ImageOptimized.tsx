import NextImage from 'next/image';
import type { ImageProps } from 'next/image';

interface ImageOptimizedProps extends ImageProps {
  variant?: 'cover';
}

const placeholderImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcu/bSbAAHRALZD7Io9wAAAABJRU5ErkJggg==';

export default function ImageOptimized(props: ImageOptimizedProps) {
  return (
    <NextImage
      placeholder={props.width >= 40 ? 'blur' : 'empty'}
      blurDataURL={placeholderImage}
      alt={props.alt}
      {...props}
      src={props.src || placeholderImage}
      // please dont look at this alex 🙉
      {...(props.variant && {
        style: {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          overflow: 'hidden',
        },
      })}
    />
  );
}
