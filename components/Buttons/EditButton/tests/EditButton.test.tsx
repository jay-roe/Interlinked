import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';
import EditButton from '../EditButton';

it('renders edit button correctly', async () => {
  const { findByTestId } = render(<EditButton />);

  const icon = await findByTestId('edit-icon');
  expect(icon).toBeInTheDocument();
});
