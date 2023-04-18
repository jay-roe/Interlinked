import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';
import ViewLinkButton from '../ViewLinkButton';

it('renders edit button correctly', async () => {
  const { findByTestId } = render(<ViewLinkButton linkedUserIds={[]} />);

  const button = await findByTestId('view-link-button');
  expect(button).toBeInTheDocument();
});
