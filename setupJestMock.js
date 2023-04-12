global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const mockProps = jest.fn();
// eslint-disable-next-line react/display-name
jest.mock('./components/TextEditor/TextEditorPreview', () => (props) => {
  mockProps(props);
  console.log(props);
  return <div {...props}>{props.message}</div>;
});
