import Card from '../../Card/Card';
import Message from './Message';
import { MessageInterface } from '@/types/Message';

const MessageGroup = ({ message }: { message: MessageInterface }) => {
  return <Message message={message} />;
};

export default MessageGroup;
