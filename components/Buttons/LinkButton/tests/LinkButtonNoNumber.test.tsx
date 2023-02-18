import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import LinkButtonNoNumber from '../LinkButtonNoNumber';

it('renders link icon no number when clicked', async () => {
  const { findByTestId } = render(<LinkButtonNoNumber />);

  const linkButtonNoNumber = await findByTestId('link-btn-no-number');
  fireEvent.click(linkButtonNoNumber);
  expect(linkButtonNoNumber).toBeInTheDocument();
});
