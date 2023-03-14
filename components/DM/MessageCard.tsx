import { Message } from '@/types/Message';
import { useAuth } from '@/contexts/AuthContext';
import ImageOptimized from '../ImageOptimized/ImageOptimized';
import { Disclosure } from '@headlessui/react';

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
          alt={message.sender?.name}
          height={48}
          width={48}
        />
      </div>

      <Disclosure as="div">
        <Disclosure.Button>
          <div className="rounded-xl bg-purple-message-area p-4 ">
            <p>{message.content}</p>
          </div>
        </Disclosure.Button>
        <Disclosure.Panel
          as="div"
          className={`flex text-gray-500 ${
            message.sender.name == currentUser.name ? 'justify-items-end ' : ''
          }`}
        >
          <p>
            {message.time_stamp.toDate().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
};

export default MessageCard;
<Disclosure>
  <Disclosure.Button>Is team pricing available?</Disclosure.Button>
  <Disclosure.Panel className="text-gray-500">
    Yes! You can purchase a license that you can share with your entire team.
  </Disclosure.Panel>
</Disclosure>;
