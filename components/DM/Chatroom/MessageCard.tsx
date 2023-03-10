import Card from '../../Card/Card';
import { Message } from '@/types/Message';
import { useAuth } from '@/contexts/AuthContext';

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
        <img
          className="h-25 min-h-[2rem] w-8 min-w-[2rem] rounded-full p-2 md:h-12 md:w-12"
          src={
            message.sender?.profilePicture ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
          }
        ></img>
      </div>

      <Card>
        <div>{message.content}</div>
      </Card>
    </div>
  );
};

export default MessageCard;
