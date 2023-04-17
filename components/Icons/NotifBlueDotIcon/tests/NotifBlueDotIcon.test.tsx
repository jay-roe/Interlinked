import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';

import NotifBlueDotIcon from '../NotifBlueDotIcon';

describe('NotifBlueDotIcon', () => {
  it('renders a blue dot when the notification is unread', () => {
    const { container } = render(<NotifBlueDotIcon read={false} />);
    const blueDot = container.querySelector('svg');
    expect(blueDot).toBeInTheDocument();
  });

  it('does not render a blue dot when the notification is read', () => {
    const { container } = render(<NotifBlueDotIcon read={true} />);
    const blueDot = container.querySelector('svg');
    expect(blueDot).not.toBeInTheDocument();
  });
});
