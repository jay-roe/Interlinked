import LinkIcon from '@/components/Icons/LinkIcon/LinkIcon';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import LinkButtonNoNumber from '../LinkButtonNoNumber';

it('renders link icon no number when clicked', async () => {
  const { findByTestId } = render(<LinkButtonNoNumber />);

  const linkButtonNoNumber = await findByTestId('link-btn-no-number');
  fireEvent.click(linkButtonNoNumber);
  expect(linkButtonNoNumber).toBeInTheDocument();
});

it('renders link icon small', async () => {
  const { findByTestId } = render(<LinkButtonNoNumber small={false} />);

  const linkIcon = await findByTestId('link-btn');
  expect(linkIcon).toBeInTheDocument();
});

it('renders link icon', async () => {
  const { findByTestId } = render(<LinkButtonNoNumber small={true} />);

  const linkIcon = await findByTestId('link-btn');
  expect(linkIcon).toBeInTheDocument();
});
