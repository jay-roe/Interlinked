import { FaCloudUploadAlt } from 'react-icons/fa';

export default function UploadMediaButton() {
  return (
    <div className="flex items-center gap-2 rounded-md bg-yellow-600 p-1 px-2 text-center text-sm font-bold text-purple-background transition-all hover:bg-yellow-500">
      Upload Media
      <FaCloudUploadAlt />
    </div>
  );
}
