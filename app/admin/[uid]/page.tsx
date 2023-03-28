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
} from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';
import { useEffect, useState } from 'react';
import { Report } from '@/types/Report';
import { User, UserWithId } from '@/types/User';
import { Message } from '@/types/Message';
import { useRouter } from 'next/navigation';
import Card from '@/components/Card/Card';
import TimeDivider from '@/components/DM/TimeDivider';
import ReportMessageCard from '@/components/Report/ReportMessageCard';
import ImageOptimized from '@/components/ImageOptimized/ImageOptimized';
import Button from '@/components/Buttons/Button';

const ViewReport = ({ params }) => {
  const { authUser } = useAuth();
  const router = useRouter();

  const [report, setReport] = useState<Report>();
  const [loading, setLoading] = useState(true);

  const [participants, setParticipants] = useState<UserWithId[]>([]);
  const [participantsLoading, setParticipantsLoading] = useState(true);

  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [chatRoomRef, setChatRoomRef] = useState<any>(null);

  const [user, setUser] = useState<User>();

  useEffect(() => {
    // if not logged in, redirect to home page
    if (!authUser?.uid) {
      router.push('/');
    }
  }, [authUser, router]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (report) {
      setChatRoomRef(doc(db.chatrooms, report.chatroomId));
    }
  }, [report]);

  useEffect(() => {
    if (chatRoomRef) {
      const unsub = onSnapshot(chatRoomRef, (doc) => {
        setChatMessages(doc.data().messages);
      });
      return () => unsub();
    }
  }, [chatRoomRef]);

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

  async function lockAccount() {
    //get account of the person reported and set accountLocked to true
    updateDoc(doc(db.users, report.reported), {
      accountLocked: true,
    });
  }

  async function timeoutAccount() {
    console.log('Timeing out account');
  }

  async function discardReport() {
    await deleteDoc(
      doc(collection(doc(db.users, authUser.uid), 'report'), report.reportId)
    );
    router.push('/admin');
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (participantsLoading) {
    return <div>Participants Loading...</div>;
  }

  return (
    <div className="container mx-auto text-white" data-testid="admin-home">
      Participants:
      <div className="flex gap-4">
        {!participantsLoading &&
          participants.map((person) => (
            <div
              key={person.userId}
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
            </div>
          ))}
      </div>
      <div className="rounded-xl bg-white bg-opacity-[8%] p-5">
        <h3 className="text-3xl font-extrabold">
          {report.reporterName} has reported this conversation
        </h3>
        <div>Report message: {report.context}</div>
        <Card className="m-5 flex h-96 flex-grow flex-col overflow-y-auto">
          {chatMessages.map((m, id) => {
            return (
              <div key={id}>
                <ReportMessageCard
                  message={m}
                  report={report}
                  participants={participants}
                />

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
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => {
              lockAccount();
            }}
          >
            Lock {report.reportedName}&apos;s Account
          </Button>
          <Button
            onClick={() => {
              timeoutAccount();
            }}
          >
            Timeout {report.reportedName}&apos;s Account
          </Button>
          <Button
            onClick={() => {
              discardReport();
            }}
          >
            Discard Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewReport;
