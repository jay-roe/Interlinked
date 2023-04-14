import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { render } from '@/renderWrapper';
import SearchBar from '../SearchBar';

it('renders search bar with search button', async () => {
  const { findByTestId } = render(<SearchBar />);
  const searchButton = await findByTestId('search-button');
  expect(searchButton).toBeInTheDocument();
});

it('test handleChange setSearchTerm', async () => {
  const { findByTestId } = render(<SearchBar />);
  const searchTerm = await findByTestId('search-button');
  fireEvent.change(searchTerm, { target: { value: 'test' } });
  expect((searchTerm as HTMLInputElement).value).toBe('test');
});
