import React from 'react';
import { render } from '@testing-library/react';

import { NextIntlProvider } from 'next-intl';

const locale = 'en';
const messages = require(`./translations/${locale}.json`);
// eslint-disable-next-line
function ProvidersWrapper({ children }) {
  return (
    <NextIntlProvider locale={locale} messages={messages}>
      {children}
    </NextIntlProvider>
  );
}

function customRender(component, options) {
  return render(component, { wrapper: ProvidersWrapper, ...options });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
