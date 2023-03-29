export default function FilePreview({
  url,
  type,
  name,
}: {
  url: string;
  type: string;
  name: string;
}) {
  return (
    <div className="rounded-md border-2 border-white bg-gray-600 p-2 ">
      <a href={url} type={type} target="_blank" rel="noreferrer" download>
        <p>{name}</p>
      </a>
    </div>
  );
}
