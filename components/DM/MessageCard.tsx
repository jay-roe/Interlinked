import { Message } from '@/types/Message';
import { useAuth } from '@/contexts/AuthContext';
import ImageOptimized from '../ImageOptimized/ImageOptimized';
import { Disclosure } from '@headlessui/react';
import FilePreview from '../FilePreview/FilePreview';

const MessageCard = ({ message }: { message: Message }) => {
  const { currentUser, authUser } = useAuth();

  return (
    <div
      className={`my-3 flex gap-x-3 
      ${
        message.sender.id == authUser.uid
          ? ' order-first justify-end '
          : ' order-last justify-start '
      }`}
    >
      <div
        className={`${message.sender.id == authUser.uid ? 'order-last ' : ''}`}
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
          <div
            className={`rounded-xl ${
              message.content == '' ? '' : 'bg-purple-message-area'
            }  p-4 `}
          >
            {message.content && <p>{message.content}</p>}
            {message.file &&
              message.fileType &&
              (message.fileType.includes('image') ? (
                <ImageOptimized
                  className="mt-1 h-[13rem] w-[13rem] rounded-md object-scale-down"
                  src={message.file}
                  alt={message.file}
                  width={208}
                  height={208}
                />
              ) : (
                <div className="mt-1">
                  <FilePreview
                    url={message.file}
                    type={message.fileType}
                    name={message.fileName}
                  />
                </div>
              ))}
          </div>
        </Disclosure.Button>
        <Disclosure.Panel
          as="div"
          className={`flex text-gray-500 ${
            message.sender.id == authUser.uid ? 'justify-items-end ' : ''
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
