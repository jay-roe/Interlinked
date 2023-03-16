'use client';
import LinkIcon from '../../Icons/LinkIcon/LinkIcon';
import { createNotification } from '@/components/Notification/AddNotification/AddNotification';
import { useAuth } from '@/contexts/AuthContext';
import { Notification, NotifType } from '@/types/Notification';
import { unlink } from './Unlink';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';
import { ImCancelCircle } from 'react-icons/im';
import { deleteNotification } from '@/components/Notification/DeleteNotification/DeleteNotification';

export default function LinkButton({
  profileOwnerUID,
}: {
  profileOwnerUID?: string;
}) {
  // set the current user
  const { currentUser, authUser } = useAuth(); // User sending out the request

  const [notification, setNotification] = useState<Notification>();

  // Get the link request notification to visited user
  useEffect(() => {
    getDocs(
      query(
        typeCollection<Notification>(
          collection(db.users, profileOwnerUID, 'notifications')
        ),
        where('notifType', '==', NotifType.LINK_REQ),
        where('sender', '==', authUser.uid)
      )
    ).then((notifDoc) => {
      if (!notifDoc.empty) {
        setNotification(notifDoc.docs[0].data());
      }
    });
  }, []);

  return !notification && profileOwnerUID !== authUser.uid ? (
    <button
      data-testid="link-btn"
      className="mb-3 flex max-w-fit items-center gap-2 rounded-xl bg-white bg-opacity-[0.12] p-3 font-semibold hover:bg-opacity-20 active:bg-opacity-20"
      onClick={() => {
        if (
          profileOwnerUID &&
          !currentUser.linkedUserIds?.some(
            (receiverID) => receiverID === profileOwnerUID
          )
        ) {
          const notif = {
            notifType: NotifType.LINK_REQ,
            context: currentUser.name + ' would like to link with you!',
            sender: authUser.uid, // sender
            receiver: profileOwnerUID, // receiver
          };

          createNotification(notif).then((notifID) => {
            setNotification({ ...notif, read: false, notificationId: notifID });
          });
        } else {
          // After completely unlinked -> refresh window (in case they're viewing a private account)
          unlink(authUser.uid, profileOwnerUID).then(() => {
            window.location.reload();
          });
        }
      }}
    >
      <LinkIcon
        linked={currentUser.linkedUserIds?.some(
          (receiverID) => receiverID === profileOwnerUID
        )}
        showText={true}
      />
    </button>
  ) : (
    <button
      data-testid="unlink-btn"
      className="mb-3 flex max-w-fit items-center gap-2 rounded-xl bg-white bg-opacity-[0.12] p-3 font-semibold text-accent-orange hover:bg-opacity-20 active:bg-opacity-20"
      onClick={() => {
        deleteNotification(notification.notificationId, profileOwnerUID).then(
          () => {
            setNotification(null);
          }
        );
      }}
    >
      <ImCancelCircle size={30} />
      Cancel Link Request
    </button>
  );
}
