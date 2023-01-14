
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../Home';

it('renders temp landing page link', async () => {
  const { findByText } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const titleElement = await findByText("Interlinked", { exact: true });
  expect(titleElement).toBeInTheDocument();
});