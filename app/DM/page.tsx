'use client';
import MessageCard from '@/components/DM/MessageCard';
import { ChatMessage, Message, ChatRoom } from '@/types/Message';
import { User, testUser } from '@/types/User';
import { useAuth } from '@/contexts/AuthContext';
import TimeDivider from '@/components/DM/TimeDivider';
import {
  doc,
  getDoc,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  collection,
  setDoc,
  updateDoc,
  collectionGroup,
  getDocs,
} from 'firebase/firestore';

import { db, typeCollection } from '@/config/firestore';
import { useEffect, useState } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';
import { firestore } from '@/config/firebase';

export default function DMs({ params }) {
  //     const { currentUser, authUser } = useAuth();
  //     const chatsRef = typeCollection<Message>(
  //         collection(doc(db.messages, authUser.uid), authUser.uid)
  //       ); // messages -> userID
  //       useEffect(() => {
  //         const museums = query(collectionGroup(firestore, 'messages'), where('type', '==', 'museum'));
  //       }, []);
  //   return (<div>
  //   </div>);
  // const { currentUser, authUser } = useAuth();
  // let combinedID : string= "";
  // let id = "FvfPPYhtKbalIp9eGO9OrMGRRNz1";
  // if (authUser.uid === "FvfPPYhtKbalIp9eGO9OrMGRRNz1") id = "j6Qu8XsdUsg4NfnPFQ0IAgvhpX42";
  // // Higher alphabetical order string always goes first in concatination
  // // This ensures that twos users will share the same chatroom ID :)
  // if (authUser.uid.localeCompare(id) == 1)
  //     combinedID =id + authUser.uid ;
  // else
  //     combinedID = authUser.uid + id;
  //  const senderRef = typeCollection<Message>(
  //    collection(doc(db.messages, authUser.uid), id)
  //  ); // messages -> userID -> participantID
  // const receiverRef = typeCollection<Message>(
  //    collection(doc(db.messages,id), authUser.uid)
  //  ); // messages -> userID -> participantID
  //   //getDoc(userRef).then((snapshot) => {console.log(snapshot.data())})
  //   //await setDoc(userRef, {roomID: combinedID});
  // const [message, setMessage] = useState<string>(''); // message to be sent
  // const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]); // messages seen by both parties
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (message === '') return; //don't send empty messages
  //   const newMessage: Message = {
  //     content: message,
  //     sender: {
  //       name: currentUser.name,
  //       profilePicture: currentUser.profilePicture,
  //     },
  //     time_stamp: Timestamp.now(),
  //   };
  //   await addDoc(receiverRef, newMessage); // add message to chatroom collection
  //   await addDoc(senderRef, newMessage); // add message to chatroom collection
  //   setMessage('');
  // };
  // useEffect(() => {
  //   const getChatMessages = query(senderRef, orderBy('time_stamp'));
  //   const unsubscribe = onSnapshot(getChatMessages, (snapshot) => {
  //     let messages: ChatMessage[] = [];
  //     snapshot.forEach((doc) => {
  //       messages.push({ message: doc.data(), id: doc.id });
  //     });
  //     setChatMessages(messages);
  //   });
  //   return () => unsubscribe(); // removes listener
  // }, []);
  // return (
  //   <div className="grid grid-cols-8 ">
  //     <div className="col-span-4 col-start-3">
  //       Your dms
  //       <div>
  //         {chatMessages.map((m) => {
  //           return (
  //             <div key={m.id}>
  //               <MessageCard message={m.message} />
  //             </div>
  //           );
  //         })}
  //       </div>
  //       <div>
  //         <form onSubmit={handleSubmit}>
  //           <div className="flex flex-row">
  //             <div>
  //               <input
  //                 className="bg-purple-text-area"
  //                 type="text"
  //                 placeholder="Write your message..."
  //                 value={message}
  //                 onChange={(event) => setMessage(event.target.value)}
  //               />
  //             </div>
  //             <div>
  //               <button type="submit">
  //                 <FaRegPaperPlane />
  //               </button>
  //             </div>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
}
