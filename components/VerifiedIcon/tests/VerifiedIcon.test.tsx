import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import VerifiedIcon from '../VerifiedIcon';

it('verified icon is shown', async () => {

    const { findByTestId } = render(
        <VerifiedIcon verified={true} showText={true} />
    );

    const verifiedContainer = await findByTestId('verified-icon-container');
    expect(verifiedContainer).toBeInTheDocument();
})

it('unverified icon is not shown', async () => {

    const { findByTestId } = render(
        <VerifiedIcon verified={false} showText={true} showIcon={true} />
    );

    const verifiedContainer = await findByTestId('unverified-icon-container');
    expect(verifiedContainer).toBeInTheDocument();
})