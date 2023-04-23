import { Message } from '@/types/Message';
import { Disclosure } from '@headlessui/react';
import { Report } from '@/types/Report';
import ImageOptimized from '../ImageOptimized/ImageOptimized';
import { useLocale } from 'next-intl';
import { localeToDateLocale } from '@/translations/locales';

const ReportMessageCard = ({
  message,
  report,
}: {
  message: Message;
  report: Report;
}) => {
  const locale = useLocale();

  return (
    <div
      data-testid="report-card-sender"
      className={`my-3 flex gap-x-3 
      ${
        message.sender.id == report.reporter
          ? ' order-first justify-end '
          : ' order-last justify-start '
      }`}
    >
      <div
        className={`${
          message.sender.id == report.reporter ? 'order-last ' : ''
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
            message.sender.id == report.reporter ? 'justify-items-end ' : ''
          }`}
        >
          <p>
            {message.time_stamp
              .toDate()
              .toLocaleTimeString(localeToDateLocale[locale], {
                hour: '2-digit',
                minute: '2-digit',
              })}
          </p>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
};

export default ReportMessageCard;
