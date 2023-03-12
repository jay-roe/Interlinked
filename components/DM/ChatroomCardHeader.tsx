import { ChatRoom, Message } from '@/types/Message';
import { User } from '@/types/User';
import ImageOptimized from '../ImageOptimized/ImageOptimized';

export default function ChatroomCardHeader({
  room,
  user,
}: {
  room: ChatRoom;
  user: User;
}) {
  return (
    <div className="start flex" data-testid="chat-room-header">
      <ImageOptimized
        className="h-25 min-h-[2rem] w-8 min-w-[2rem] rounded-full p-2 md:h-12 md:w-12"
        src={user.profilePicture}
        alt={'profile picture'}
        height={48}
        width={48}
      />
      <div>
        <p>{user.name}</p>
        <p>
          {room.lastMessage.time_stamp?.toDate().toLocaleString('en-US', {
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
