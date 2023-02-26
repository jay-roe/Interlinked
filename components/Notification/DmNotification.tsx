import type { ComponentProps } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { Notification } from '@/types/User';
import { NotifType } from '@/types/User';
import { Timestamp } from 'firebase/firestore';
import { MdDescription } from "react-icons/md";
import { FaComment } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import LinkIcon from '../Icons/LinkIcon/LinkIcon';


export default function postNotification({Notification:notif}) {
  return (
    <div> 
        <div data-testid="sender-info">
        {notif.sender.name}
        <img
          className="h-8 min-h-[2rem] w-8 min-w-[2rem] rounded-full md:h-12 md:w-12"
          src={
            notif.sender.profilePicture ||
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
              }>
        </img>
      </div>
          <div data-testid="notif-icon">
            <MdDescription/>
          </div>
      <div data-testid="notif-context"></div>
      <div data-testid="accept-request-buttons"></div>
    </div>
  );
}
