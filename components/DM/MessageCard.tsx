import Card from '../Card/Card';
import { Message } from '@/types/Message';
import { useAuth } from '@/contexts/AuthContext';
import { User } from '@/types/User';
import { Disclosure } from '@headlessui/react';

const MessageCard = ({ message }: { message: Message }) => {
  const { currentUser } = useAuth();

  return (
    <Disclosure>
      <Disclosure.Button>
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

          <div className="rounded-xl bg-purple-message-area p-4">
            <p>{message.content}</p>
          </div>
        </div>
      </Disclosure.Button>
      <Disclosure.Panel className="text-gray-500">
        <p>
          {' '}
          {message.time_stamp.toDate().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </Disclosure.Panel>
    </Disclosure>
  );
};

export default MessageCard;
