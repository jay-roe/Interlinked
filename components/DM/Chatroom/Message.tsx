import Card from '../../Card/Card';
import { MessageInterface } from '@/types/Message';

const Message = ({ message }: { message: MessageInterface }) => {
  return (
    <Card>
      <div>{message.content}</div>
    </Card>
  );
};

export default Message;
