import type { ComponentProps } from 'react';

type CardProps = ComponentProps<'div'>;

const Card = (props: CardProps) => {
  return (
    <div
      {...props}
      className={`${props.className} min-h-min rounded-xl bg-white bg-opacity-[0.12] p-4`}
    >
      {props.children}
    </div>
  );
};

export default Card;
