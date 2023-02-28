import NextImage from 'next/image';
import type { ImageProps } from 'next/image';
import md5 from 'md5';

interface ImageOptimizedProps extends ImageProps {
  variant?: 'cover';
}

export default function ImageOptimized(props: ImageOptimizedProps) {
  if (props.variant === 'cover') {
  }
  return (
    <NextImage
      placeholder={props.width >= 40 ? 'blur' : 'empty'}
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPcu/bSbAAHRALZD7Io9wAAAABJRU5ErkJggg=="
      alt={props.alt}
      {...props}
      src={
        props.src ||
        `https://www.gravatar.com/avatar/${md5(
          props.alt.trim().toLowerCase()
        )}?d=identicon&s=160`
      }
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
