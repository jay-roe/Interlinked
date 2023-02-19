import { FaPaperPlane } from 'react-icons/fa';

export default function PostButton() {
  return (
    <div className="    flex items-center gap-2 rounded-md bg-accent-orange p-1 px-2 font-bold text-black hover:text-white ">
      Post
      <FaPaperPlane></FaPaperPlane>
    </div>
  );
}
