'use client';
updateDoc;
import MessageCard from '@/components/DM/MessageCard';
import { FaRegPaperPlane, FaFileUpload, FaTrash } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import {
  doc,
  onSnapshot,
  Timestamp,
  updateDoc,
  arrayUnion,
  getDoc,
  getDocs,
  collection,
} from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';
import { useEffect, useRef, useState } from 'react';
import { Message } from '@/types/Message';
import Card from '@/components/Card/Card';
import TimeDivider from '@/components/DM/TimeDivider';
import { createNotification } from '@/components/Notification/AddNotification/AddNotification';
import { NotifType } from '@/types/Notification';
import ImageOptimized from '@/components/ImageOptimized/ImageOptimized';
import type { UserWithId } from '@/types/User';
import Link from 'next/link';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/config/firebase';
import FilePreview from '@/components/FilePreview/FilePreview';
import Button from '@/components/Buttons/Button';
import { createReport } from '@/components/Report/AddReport';
import { Report } from '@/types/Report';

export default function ChatRoom({ params }) {
  const { currentUser, authUser } = useAuth();
  let adminId = '85C6Pe9p0VehxlqlQqNJlSP55Wn1';

  const chatRoomRef = doc(db.chatrooms, params.uid); // get right chat

  const [message, setMessage] = useState<string>(''); // message to be sent
  const [chatMessages, setChatMessages] = useState<Message[]>([]); // messages seen by both parties
  const [imgPreview, setImgPreview] = useState<string>();
  const [fileBuffer, setFileBuffer] = useState<File>();

  // Participants (not including current user)
  const [participants, setParticipants] = useState<UserWithId[]>([]);
  const [participantsLoading, setParticipantsLoading] = useState(true);

  // reference to bring user back to bottom of chat
  const dummy = useRef<HTMLDivElement>();

  // reference to the hidden input so a custom button may be used
  const hiddenFileInput = useRef(null);

  useEffect(() => {
    if (!chatRoomRef || !authUser) return;

    getDoc(chatRoomRef).then((room) => {
      //make sure user is in chatroom
      let belongs = false;
      room.data().participants.forEach((participantID) => {
        if (participantID == authUser.uid) {
          belongs = true;
        }
      });

      room
        .data()
        .participants.filter((participantID) => participantID !== authUser.uid)
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

    const unsub = onSnapshot(chatRoomRef, (doc) => {
      setChatMessages(doc.data().messages);
    });

    return () => unsub(); // removes listener
  }, []);

  // User not logged in
  if (!currentUser || !authUser) {
    return (
      <div className="text-white">
        <h1 className="text-lg font-bold">Your DMs</h1>
        <h2 data-testid="profile-login-prompt">
          You must be logged in to view your messages.
        </h2>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button>Register</Button>
        </Link>
      </div>
    );
  }

  const uploadFile = async () => {
    if (fileBuffer == null) return null;

    const storageRef = ref(storage, `chats/${params.uid}/'${fileBuffer.name}`);

    //upload and get download reference
    await uploadBytesResumable(storageRef, fileBuffer);
    const fileDownload = await getDownloadURL(storageRef);
    return fileDownload;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (fileBuffer == null && message === '') return; //don't send empty messages

    const fileURL = await uploadFile();

    const newMessage: Message = {
      content: message,
      sender: {
        name: currentUser.name,
        profilePicture: currentUser.profilePicture,
      },
      time_stamp: Timestamp.now(),
      file: fileURL,
      fileType: fileBuffer?.type || null,
      fileName: fileBuffer?.name || null,
    };

    updateDoc(chatRoomRef, {
      recentTimeStamp: newMessage.time_stamp,
      lastMessage: newMessage,
      messages: arrayUnion(newMessage),
    }).catch(() => {
      return;
    });

    //send notification to user using ID from chat
    getDoc(chatRoomRef).then((room) => {
      let participants = room.data().participants;

      let id = ''; // id of message notification receiver

      //parsing out receiver from participants[]
      participants.forEach((uid) => {
        if (uid !== authUser.uid) {
          id = uid;
        }
      });

      createNotification({
        notifType: NotifType.DM,
        context: newMessage.content,
        sender: authUser.uid,
        receiver: id,
        chatroomId: params.uid,
      });
    });

    setMessage('');
    setFileBuffer(null);
    setImgPreview(null);
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  async function handleSelectedFile(fileList: FileList) {
    const file: File = fileList[0];
    setFileBuffer(file);
    setImgPreview(URL.createObjectURL(file));
  }

  const removeFile = () => {
    setFileBuffer(null);
    setImgPreview(null);
    hiddenFileInput.current.value = ''; // reset input value
  };

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  async function getReports() {
    if (!!process.env.NEXT_PUBLIC_EMULATOR) {
      adminId = 'HvAOuFbE5diXp0ayCpqwUjDXOfBy';
    }
    const res = await getDocs(
      typeCollection<Report>(collection(doc(db.users, adminId), 'report'))
    );
    return res.docs.map((resData) => resData.data());
  }

  //check if reporter has reported reported user already
  async function checkIfReported(reporter: string, reported: string) {
    const reports = await getReports();
    return reports.some(
      (report) => report.reporter === reporter && report.reported === reported
    );
  }

  return (
    <div data-testid="chat-room-root" className="flex h-[85vh] flex-col">
      <div className="flex gap-4">
        {/* TODO: Adjust this when group chats are added. */}
        {!participantsLoading &&
          participants.map((person) => (
            <div key={person.userId}>
              <Link
                className="mb-3 flex w-max items-center gap-4 rounded-xl p-3 hover:bg-purple-component active:bg-purple-component"
                href={`/profile/${person.userId}`}
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
              <Button
                className="mb-3"
                data-testid="report-user-btn"
                onClick={async () => {
                  if (!!process.env.NEXT_PUBLIC_EMULATOR) {
                    adminId = 'HvAOuFbE5diXp0ayCpqwUjDXOfBy';
                  }
                  const report = {
                    context:
                      'User ' +
                      person.name +
                      ' has been reported for bad DM etiquette.',
                    reporter: authUser.uid, // User ID of person that reported
                    reporterName: currentUser.name, // name of person that reported
                    reported: person.userId, // User ID of person that got reported
                    reportedName: person.name, // name of person that got reported
                    chatroomId: params.uid,
                    adminId: adminId,
                  };
                  if (await checkIfReported(authUser.uid, person.userId)) {
                    alert('You have already reported this user.');
                  } else {
                    createReport(report);
                    alert('User reported!');
                  }
                }}
              >
                Report this user
              </Button>
            </div>
          ))}
      </div>
      <Card className="flex flex-grow flex-col overflow-y-auto rounded-b-none">
        {chatMessages.map((m, id) => {
          return (
            <div key={id}>
              <MessageCard message={m} />

              {id !== chatMessages.length - 1 &&
                chatMessages[id + 1].time_stamp.seconds -
                  m.time_stamp.seconds >=
                  14400 && (
                  <TimeDivider time={chatMessages[id + 1].time_stamp} />
                )}
            </div>
          );
        })}
        <div className="pb-12" ref={dummy}></div>
      </Card>
      <div className="flex w-full rounded-b-xl bg-chat-input-secondary p-2">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col  rounded-md bg-chat-text-input ">
            <div className="flex flex-row p-1 ">
              <input
                data-testid="dm-text-input"
                className="w-full bg-chat-text-input p-1 focus:outline-none dark:text-white dark:placeholder-gray-400"
                type="text"
                placeholder="Write your message..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />

              <button data-testid="send-dm" type="submit" className="pr-2">
                <FaRegPaperPlane className="active hover:text-accent-orange active:text-white" />
              </button>
            </div>

            {imgPreview != null &&
              fileBuffer != null &&
              (fileBuffer.type.includes('image') ? (
                <div className="flex gap-2 self-center">
                  <ImageOptimized
                    data-testid="dm-image-preview"
                    className="h-[13rem] w-[13rem] object-scale-down hover:opacity-50"
                    src={imgPreview}
                    alt={imgPreview}
                    width={208}
                    height={208}
                  />
                  <button
                    data-testid="dm-remove-image-button"
                    className="hover:text-red-900"
                    onClick={() => removeFile()}
                  >
                    <FaTrash />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 self-center">
                  <FilePreview
                    data-testid="file-preview-dm"
                    url={URL.createObjectURL(fileBuffer)}
                    name={fileBuffer.name}
                    type={fileBuffer.type}
                  />
                  <button
                    data-testid="dm-remove-file-button"
                    className="hover:text-red-900"
                    onClick={() => removeFile()}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
          </div>
        </form>
        <button
          data-testid="dm-button-file-upload"
          onClick={handleClick}
          className=" pl-3 pr-2"
        >
          <FaFileUpload />
        </button>

        <input
          id="dm-image-upload"
          data-testid="dm-image-upload"
          type="file"
          ref={hiddenFileInput}
          onChange={(files) => handleSelectedFile(files.target.files)}
          style={{ display: 'none' }}
        ></input>
      </div>
    </div>
  );
}
