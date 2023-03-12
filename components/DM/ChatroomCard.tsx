import NotifBlueDotIcon from '@/components/Icons/NotifBlueDotIcon/NotifBlueDotIcon';
import LinkIcon from '@/components/Icons/LinkIcon/LinkIcon';
import ChatroomCardHeader from './ChatroomCardHeader';
import { ChatRoom } from '@/types/Message';
import { useEffect, useState } from 'react';
import { User } from '@/types/User';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc } from '@firebase/firestore';
import { db } from '@/config/firestore';

export default function postNotification({ room }: { room: ChatRoom }) {
  const [user, setUser] = useState<User>();
  const { authUser } = useAuth();
  let id = '';
  room.participants.forEach((uid) => {
    if (uid !== authUser.uid) {
      id = uid;
    }
  });

  useEffect(() => {
    console.log(room.participants);

    // console.log(authUser.uid)
    getUser.then((data) => {
      setUser(data);
    });
  }, []);

  const getUser = new Promise<User>((resolve, reject) => {
    resolve(
      getDoc(doc(db.users, id)).then((res) => {
        return res.data();
      })
    );
  });

  return (
    <>
      {user && (
        <div className="start my-5 flex items-center rounded-md bg-purple-text-area p-2">
          <div className="flex items-center justify-center">
            <div className="ml-5">
              <ChatroomCardHeader user={user} room={room} />
              <div className="m-3">
                <p>{room.lastMessage.content}</p>
              </div>
            </div>
          </div>
          <div className="m-4">
            <NotifBlueDotIcon read={true} />
          </div>
        </div>
      )}
    </>
  );
}
