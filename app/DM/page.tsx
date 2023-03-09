import Message from '@/components/DM/Chatroom/Message';
import { MessageInterface } from '@/types/Message';

export default function dms() {
  const m: MessageInterface = { content: 'Hello Julian ' };
  return (
    <div>
      Your dms
      <Message message={m} />
    </div>
  );
}
