'use client';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  function switchLocale() {
    const path = window.location.pathname;
    const newHref = path.replace(`/${locale}`, '');
    const newLocale = locale === 'en' ? 'de' : 'en';
    router.push(`/${newLocale}/${newHref}`);
  }

  return (
    <span className="cursor-pointer">
      <button className="text-yellow-600" onClick={() => switchLocale()}>
        {locale === 'en' ? 'EN' : locale === 'de' ? 'DE' : null}
      </button>
    </span>
  );
}
