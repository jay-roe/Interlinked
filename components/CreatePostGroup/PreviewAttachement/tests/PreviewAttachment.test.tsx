import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';

import PreviewAttachement from '../PreviewAttachement';

it('renders', async () => {
  const { findByText } = render(
    <PreviewAttachement clean={4} deleteImage={jest.fn} getImage={jest.fn} />
  );

  const previewAttachmentPrompt = await findByText('Preview Attachments');
  expect(previewAttachmentPrompt).toBeInTheDocument();
});
