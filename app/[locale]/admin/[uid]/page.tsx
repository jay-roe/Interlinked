'use client';
import { useAuth } from '@/contexts/AuthContext';
import {
  doc,
  getDoc,
  collection,
  onSnapshot,
  DocumentSnapshot,
  deleteDoc,
  updateDoc,
  Timestamp,
} from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';
import { useEffect, useState } from 'react';
import { Report } from '@/types/Report';
import { UserWithId } from '@/types/User';
import { Message } from '@/types/Message';
import { useRouter } from 'next/navigation';
import { Menu } from '@headlessui/react';
import Card from '@/components/Card/Card';
import TimeDivider from '@/components/DM/TimeDivider';
import ReportMessageCard from '@/components/Report/ReportMessageCard';
import ImageOptimized from '@/components/ImageOptimized/ImageOptimized';
import Button from '@/components/Buttons/Button';
import Link from '@/components/Link/Link';
import { useTranslations, useLocale } from 'next-intl';

const ViewReport = ({ params }) => {
  const t = useTranslations('Admin.uid');
  // timeout options
  const TIMEOUT_OPTIONS = [
    { value: 120000, label: '2 minutes' },
    { value: 86400000, label: '1 day' },
    { value: 2592000000, label: '1 month' },
  ];

  const { authUser, currentUser } = useAuth();
  const router = useRouter();
  const locale = useLocale();

  const [report, setReport] = useState<Report>();
  const [loading, setLoading] = useState(true);

  // DM chatroom
  const [participants, setParticipants] = useState<UserWithId[]>([]);
  const [participantsLoading, setParticipantsLoading] = useState(true);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatRoomRef, setChatRoomRef] = useState<any>(null);

  // if account is locked or timed out, redirect to locked page
  useEffect(() => {
    if (currentUser?.accountLocked || currentUser?.accountTimeout) {
      router.push('/' + locale + '/locked');
    }
  }, [currentUser, router]);

  // get the report
  useEffect(() => {
    if (!authUser?.uid) {
      return;
    }
    getDoc(
      doc(
        typeCollection<Report>(
          collection(doc(db.users, authUser.uid), 'report')
        ),
        params.uid
      )
    ).then((res) => {
      setReport(res.data());
      setLoading(false);
    });
  }, [authUser, params]);

  // get the chatroom
  useEffect(() => {
    if (report) {
      setChatRoomRef(doc(db.chatrooms, report.chatroomId));
    }
  }, [report]);

  // get the messages
  useEffect(() => {
    if (chatRoomRef) {
      const unsub = onSnapshot(chatRoomRef, (doc) => {
        setChatMessages(doc.data().messages);
      });
      return () => unsub();
    }
  }, [chatRoomRef]);

  // get the participants
  useEffect(() => {
    if (!authUser) return;
    if (chatRoomRef) {
      getDoc(chatRoomRef).then((room: DocumentSnapshot) => {
        room
          .data()
          .participants.filter(
            (participantID) => participantID !== authUser.uid
          )
          .forEach((participantID) => {
            getDoc(doc(db.users, participantID)).then((user) => {
              setParticipants((curr) => {
                if (curr.some((usr) => usr.userId === user.id)) return curr;
                return [...curr, { ...user.data(), userId: user.id }];
              });
            });
          });
        setParticipantsLoading(false);
      });
    }
  }, [authUser, chatRoomRef, report]);

  // lock the account
  async function lockAccount() {
    await updateDoc(doc(db.users, report.reported), {
      accountLocked: true,
    }); //set accountLocked to true
    discardReport(); //delete the report
  }

  // timeout the account
  async function timeoutAccount(time: number) {
    const timeoutUntil = Timestamp.fromDate(new Date(Date.now() + time)); //calculate timeoutUntil
    await updateDoc(doc(db.users, report.reported), {
      accountTimeout: true,
      accountTimeoutUntil: timeoutUntil,
    }); //set accountTimeout value
    discardReport(); //delete the report
  }

  // discard the report
  async function discardReport() {
    await deleteDoc(
      doc(collection(doc(db.users, authUser.uid), 'report'), report.reportId)
    );
    router.push('/' + locale + '/admin'); //redirect to admin home
  }

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  if (participantsLoading) {
    return <div>{t('participants-loading')}</div>;
  }

  // display the report
  return (
    // display the participants and their profile pictures
    <div className="container mx-auto text-white" data-testid="admin-home">
      {t('participants')}:
      <div className="flex gap-4">
        {participants.map((person) => (
          <Link
            key={person.userId}
            href={`/profile/${person.userId}`}
            className="mb-3 flex w-max items-center gap-4 rounded-xl p-3 hover:bg-purple-component active:bg-purple-component"
          >
            <ImageOptimized
              className="rounded-full"
              src={person.profilePicture}
              alt={person.name}
              width={50}
              height={50}
            />
            <h1 className="text-2xl font-bold">{person.name}</h1>
          </Link>
        ))}
      </div>
      <div className="rounded-xl bg-white bg-opacity-[8%] p-5">
        {/* display who reported the conversation and the report message */}
        <h3 className="text-3xl font-extrabold">
          {report.reporterName}
          {t('has-reported')}
        </h3>
        <div>
          {t('report-message')}: {report.context}
        </div>
        {/* display the chat messages */}
        <Card className="m-5 flex h-96 flex-grow flex-col overflow-y-auto">
          {chatMessages.map((m, id) => {
            return (
              <div key={id}>
                <ReportMessageCard message={m} report={report} />
                {id !== chatMessages.length - 1 &&
                  chatMessages[id + 1].time_stamp.seconds -
                    m.time_stamp.seconds >=
                    14400 && (
                    <TimeDivider time={chatMessages[id + 1].time_stamp} />
                  )}
              </div>
            );
          })}
        </Card>
        {/* display the buttons to lock or timeout the account */}
        <div className="flex justify-center space-x-4">
          <Button
            data-testid="lock-report"
            onClick={() => {
              lockAccount();
            }}
          >
            {t('lock')}
            {report.reportedName}
            {t('saccount')}
          </Button>
          {/* timeout button and dropdown menu to select the timeout duration */}
          <Menu>
            <Menu.Button
              data-testid="timeout-report"
              className={
                ' inline-flex items-center rounded-lg bg-yellow-600 px-5 py-2.5 text-center text-sm font-bold text-purple-background transition-all hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900'
              }
            >
              {t('timeout')}
              {report.reportedName}
              {t('saccount')}
            </Menu.Button>
            <Menu.Items>
              {TIMEOUT_OPTIONS.map((option) => (
                <Menu.Item
                  key={option.value}
                  data-testid={`timeout-report-${option.value}`}
                >
                  <div
                    className={`
                         m-1 inline-flex items-center rounded-lg bg-yellow-600 px-5 py-2.5 text-center text-sm font-bold text-purple-background transition-all hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900`}
                    onClick={() => timeoutAccount(option.value)}
                  >
                    {option.label}
                  </div>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
          {/* discard report button */}
          <Button
            data-testid="discard-report"
            onClick={() => {
              discardReport();
            }}
          >
            {t('discard')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
