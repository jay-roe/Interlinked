import { Post } from '@/types/Post';
import { User } from '@/types/User';

const PostHeader = ({
  author,
  post
}: {
  author?: User
  post?: Post
}) => {
  return (
    <div className='flex'>
      <span><img className='rounded-full w-10 h-10 md:w-12 md:h-12' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"></img></span> 
      <div>name and time  </div>
      <div>link button</div>
    </div>
  )
}

export default PostHeader