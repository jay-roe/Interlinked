import { Message } from '@/types/Message';
import { useAuth } from '@/contexts/AuthContext';
import ImageOptimized from '../ImageOptimized/ImageOptimized';

const MessageCard = ({ message }: { message: Message }) => {
  const { currentUser } = useAuth();

  return (
    <div
      className={`my-3 flex gap-x-3 
      ${
        message.sender.name == currentUser.name
          ? ' order-first justify-end '
          : ' order-last justify-start '
      }`}
    >
      <div
        className={`${
          message.sender.name == currentUser.name ? 'order-last ' : ''
        }`}
      >
        <ImageOptimized
          className="h-25 min-h-[2rem] w-8 min-w-[2rem] rounded-full p-2 md:h-12 md:w-12"
          src={message.sender?.profilePicture}
          alt={'no image'}
          height={48}
          width={48}
        />
      </div>

      <div className="rounded-xl bg-purple-message-area p-4">
        <p>{message.content}</p>
      </div>
    </div>
  );
};

export default MessageCard;
