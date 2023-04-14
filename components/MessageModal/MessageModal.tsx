'use client';
import { FaRegCommentDots, FaCommentDots } from 'react-icons/fa';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

import CreateChatModal from '@/components/DM/CreateChatModal';
import Button from '../Buttons/Button';
import { useTranslations } from 'next-intl';

export default function MessageModal({
  userUID,
  userName,
}: {
  userUID: string;
  userName: string;
}) {
  const t = useTranslations('MessageModal');
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <div data-testid="message-modal" className=" flex items-center">
        <button
          data-testid="modal-button"
          type="button"
          onClick={openModal}
          className=" inline-flex items-center gap-2 rounded-lg bg-yellow-600 px-5 py-2.5 text-center text-sm font-bold text-purple-background transition-all hover:bg-yellow-500 focus:outline-none "
        >
          {isOpen ? <FaCommentDots /> : <FaRegCommentDots />}
          {t('message')}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  data-testid="create-modal-button"
                  className="w-full max-w-md transform overflow-hidden rounded-2xl bg-purple-component p-5 text-left align-middle shadow-xl transition-all"
                >
                  <Dialog.Title className="pb-3 text-white">
                    {t('send')} <b>{userName}</b> {t('a-message')}!
                  </Dialog.Title>

                  <CreateChatModal userUID={userUID} />

                  <Button className="mt-2" type="button" onClick={closeModal}>
                    {t('close')}
                  </Button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
