import Button from '../Button';
import { useState } from 'react';
import type { ComponentProps, MouseEventHandler } from 'react';

const LoadMoreButton = (props: ComponentProps<'button'>) => {
  const [loading, setLoading] = useState(false);

  const wrapper = (handler: MouseEventHandler<HTMLButtonElement>) => {
    setLoading(true);
    handler.call(this).then(() => setLoading(false));
  };

  return (
    <Button
      className="mx-auto"
      onClick={() => wrapper(props.onClick)}
      {...props}
    >
      {!loading ? 'Load More...' : 'Loading...'}
    </Button>
  );
};

export default LoadMoreButton;
