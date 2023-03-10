import { Message } from '@/types/Message';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';

export default function notificationHeader({ message }: { message: Message }) {
  return (
    <div className="start flex">
      <img
        className="h-25 min-h-[2rem] w-8 min-w-[2rem] rounded-full p-2 md:h-12 md:w-12"
        src={
          message.sender.profilePicture ||
          'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
        }
      ></img>
      <div>
        <p>{message.sender.name}</p>
        <p>
          {message.time_stamp?.toDate().toLocaleString('en-US', {
            month: 'long',
            year: 'numeric',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}