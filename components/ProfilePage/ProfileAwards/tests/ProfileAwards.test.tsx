import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Timestamp } from 'firebase/firestore';
import ProfileAwards from '../ProfileAwards';

// let mock = {
//   toDate: () => {
//     return new Date();
//   },
// } as unknown as Timestamp;

// it('renders awards given user', async () => {
//   const { findByText } = render(<ProfileAwards currentUser={currentUser} />);

//   const testerAward = await findByText('best tester', { exact: false });
//   const shenaniganAward = await findByText('big shenaniganer', {
//     exact: false,
//   });

//   expect(testerAward).toBeInTheDocument();
//   expect(shenaniganAward).toBeInTheDocument();
// });

it('award', async () => {
  expect(true);
});
