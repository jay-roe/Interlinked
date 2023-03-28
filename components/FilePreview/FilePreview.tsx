export default function FilePreview({ file }: { file: File }) {
  return (
    <div className="border-red-200">
      <a href={URL.createObjectURL(file)} type={file.type} download>
        <p>{file.name}</p>
      </a>
    </div>
  );
}
