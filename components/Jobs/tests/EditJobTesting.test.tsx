import '@testing-library/jest-dom';
import { useAuth } from '@/contexts/AuthContext';
import { fireEvent } from '@testing-library/react';
import { render } from '@/renderWrapper';
import EditJobPosting from '../EditJobPosting';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case

mockedUseAuth.mockImplementation(() => {
  return {
    authUser: null,
    currentUser: { isCompany: true },
  };
});

it('render edit job', async () => {
  const { findByTestId } = render(<EditJobPosting newJob={true} />);

  const changeTitle = await findByTestId('change-title');
  expect(changeTitle).toBeInTheDocument();
});

it('presses buttons', async () => {
  const { findByTestId } = render(<EditJobPosting newJob={true} />);
  const cv = await findByTestId('cv-check');
  expect(cv).toBeInTheDocument();
  const coverletter = await findByTestId('coverletter-check');
  expect(coverletter).toBeInTheDocument();
  const hidden = await findByTestId('hidden-check');
  expect(hidden).toBeInTheDocument();
  const external = await findByTestId('external-check');
  expect(external).toBeInTheDocument();

  fireEvent.click(cv);
  fireEvent.click(coverletter);
  fireEvent.click(hidden);
  fireEvent.click(external);

  expect(cv).toBeChecked;
  expect(coverletter).toBeChecked;
  expect(hidden).toBeChecked;
  expect(external).toBeChecked;

  const submit = await findByTestId('new-job-submit');
  expect(submit).toBeInTheDocument();

  fireEvent.click(submit);
});
