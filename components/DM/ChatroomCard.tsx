import NotifBlueDotIcon from '@/components/Icons/NotifBlueDotIcon/NotifBlueDotIcon';
import LinkIcon from '@/components/Icons/LinkIcon/LinkIcon';
import ChatroomCardHeader from './ChatroomCardHeader';
import { Message } from '@/types/Message';

export default function postNotification({ message }: { message: Message }) {
  return (
    <div className="start flex items-center">
      <div className="flex items-center justify-center">
        <div className="ml-4 text-accent-orange">
          <LinkIcon linked size={60} />
        </div>
        <div className="ml-5">
          <ChatroomCardHeader message={message} />
          <div className="m-3">
            <p>{message.content}</p>
          </div>
        </div>
      </div>
      <div className="m-4">
        <NotifBlueDotIcon read={true} />
      </div>
    </div>
  );
}
