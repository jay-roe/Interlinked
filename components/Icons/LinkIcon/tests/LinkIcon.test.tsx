import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import LinkIcon from '../LinkIcon';

it('renders link icon if not linked', async () => {
  const { findByTestId } = render(<LinkIcon linked={false} />);

  const linkButton = await findByTestId('link-btn-icon');

  expect(linkButton).toBeInTheDocument();
});

it('renders unlink icon if linked', async () => {
  const { findByTestId } = render(<LinkIcon linked={true} />);

  const unlinkButton = await findByTestId('unlink-btn-icon');

  expect(unlinkButton).toBeInTheDocument();
});
