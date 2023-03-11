'use client';
import { FaRegCommentDots, FaCommentDots } from 'react-icons/fa';
import { Disclosure } from '@headlessui/react';
import CreateChatModal from '@/components/DM/CreateChatModal';

export default function MessageButton({ userUID }: { userUID: string }) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className="flex inline-flex items-center gap-2 rounded-lg bg-yellow-600 px-5 py-2.5 text-center text-sm font-bold text-purple-background transition-all hover:bg-yellow-500 focus:outline-none  ">
            {open ? <FaCommentDots /> : <FaRegCommentDots />}
            Message
          </Disclosure.Button>

          <Disclosure.Panel>
            <CreateChatModal userUID={userUID} />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
