import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';

import FilePreview from '../FilePreview';

const img = 'gs://interlinked-420e3.appspot.com/`image/1637773583.png`';

it('renders', async () => {
  const { findByTestId } = render(
    <FilePreview url={img} type="image/png" name="testImage" />
  );

  const previewAttachmentPrompt = await findByTestId('file-preview-test');
  expect(previewAttachmentPrompt).toBeInTheDocument();
});
