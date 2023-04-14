import Button from '../Button';
import { useState } from 'react';
import type { ComponentProps, MouseEventHandler } from 'react';
import { useTranslations } from 'next-intl';

const LoadMoreButton = (props: ComponentProps<'button'>) => {
  const t = useTranslations('Button.LoadMore');
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
      {!loading ? t('load-more') : t('loading')}
    </Button>
  );
};

export default LoadMoreButton;
