import { FaCloudUploadAlt } from 'react-icons/fa';

export default function UploadMediaButton() {
  return (
    <div className="    flex items-center gap-2 rounded-md bg-accent-orange p-1 px-2  font-para-med font-bold text-black hover:text-white ">
      Upload Media
      <FaCloudUploadAlt />
    </div>
  );
}
