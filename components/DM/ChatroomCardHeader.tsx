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
    <div className="start flex items-center" data-testid="chat-room-header">
      <ImageOptimized
        className="h-24 w-24 rounded-full p-2"
        src={user.profilePicture}
        alt={'profile picture'}
        height={96}
        width={96}
      />
      <div>
        <h2 className="text-xl font-bold">{user.name}</h2>
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
