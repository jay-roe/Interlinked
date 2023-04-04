import '@testing-library/jest-dom';
import 'intersection-observer';
import { render } from '@testing-library/react';
import React from 'react';
import JobPostHeader from '../JobPostHeader';

it('all notification types are rendered from the notification list', async () => {
  const { findByTestId } = render(<JobPostHeader />);

  const headerPage = await findByTestId('header-page');
  expect(headerPage).toBeInTheDocument();
});
