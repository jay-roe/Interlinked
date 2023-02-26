import type { ComponentProps } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { Notification } from '@/types/User';
import PostNotification from '../Notification/PostNotification';
import { NotifType } from '@/types/User';
import { Timestamp } from 'firebase/firestore';
import { MdDescription } from "react-icons/md";
import { FaComment } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import LinkIcon from '../Icons/LinkIcon/LinkIcon';


export default function postNotification() {

  const notifications:Notification[] = 
    [{
      notifType: NotifType.POST,
      context: 'Welcome to my post',
      sender: {
        awards: [],
        bio: '',
        codingLanguages: [],
        connections: [],
        courses: [],
        coverPhoto: '',
        education: [],
        email: '',
        experience: [],
        languages: [],
        name: 'Meli',
        phone: '',
        profilePicture: '',
        projects: [],
        recommendations: [],
        skills: [],
        socials: {
          github: '',
          instagram: ''
        },
        volunteering: [],
        notifications: []
      },
      read: false
    },
    {
      notifType: NotifType.COMMENT,
      context: 'This is so funny',
      sender: {
        awards: [],
        bio: '',
        codingLanguages: [],
        connections: [],
        courses: [],
        coverPhoto: '',
        education: [],
        email: '',
        experience: [],
        languages: [],
        name: 'Maxx',
        phone: '',
        profilePicture: '',
        projects: [],
        recommendations: [],
        skills: [],
        socials: {
          github: '',
          instagram: ''
        },
        volunteering: [],
        notifications: []
      },
      read: false
    },{
        notifType: NotifType.DM,
        context: 'Welcome to my post',
        sender: {
          awards: [],
          bio: '',
          codingLanguages: [],
          connections: [],
          courses: [],
          coverPhoto: '',
          education: [],
          email: '',
          experience: [],
          languages: [],
          name: 'Meli',
          phone: '',
          profilePicture: '',
          projects: [],
          recommendations: [],
          skills: [],
          socials: {
            github: '',
            instagram: ''
          },
          volunteering: [],
          notifications: []
        },
        read: false
      },{
        notifType: NotifType.LINK_ACC,
        context: 'Welcome to my post',
        sender: {
          awards: [],
          bio: '',
          codingLanguages: [],
          connections: [],
          courses: [],
          coverPhoto: '',
          education: [],
          email: '',
          experience: [],
          languages: [],
          name: 'Meli',
          phone: '',
          profilePicture: '',
          projects: [],
          recommendations: [],
          skills: [],
          socials: {
            github: '',
            instagram: ''
          },
          volunteering: [],
          notifications: []
        },
        read: false
      },{
        notifType: NotifType.LINK_REQ,
        context: 'Welcome to my post',
        sender: {
          awards: [],
          bio: '',
          codingLanguages: [],
          connections: [],
          courses: [],
          coverPhoto: '',
          education: [],
          email: '',
          experience: [],
          languages: [],
          name: 'Meli',
          phone: '',
          profilePicture: '',
          projects: [],
          recommendations: [],
          skills: [],
          socials: {
            github: '',
            instagram: ''
          },
          volunteering: [],
          notifications: []
        },
        read: false
      },{
        notifType: NotifType.LIKE,
        context: 'Welcome to my post',
        sender: {
          awards: [],
          bio: '',
          codingLanguages: [],
          connections: [],
          courses: [],
          coverPhoto: '',
          education: [],
          email: '',
          experience: [],
          languages: [],
          name: 'Meli',
          phone: '',
          profilePicture: '',
          projects: [],
          recommendations: [],
          skills: [],
          socials: {
            github: '',
            instagram: ''
          },
          volunteering: [],
          notifications: []
        },
        read: false
      }]



  return (
    <ul className="mb-3 inline-flex" data-testid="live-profile">
        {notifications.map((notif, index) => (
          <li
            key={index}
            className="mb-3 mt-1 mr-3 flex max-w-fit flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-3 text-xl font-semibold"
          >

            {notif.notifType === NotifType.POST && <PostNotification Notification={notif}/>}
            {notif.notifType === NotifType.COMMENT && <PostNotification Notification={notif}/>}
            {notif.notifType === NotifType.LIKE && <PostNotification Notification={notif}/>}
            {notif.notifType === NotifType.LINK_REQ && <PostNotification Notification={notif}/>}
            {notif.notifType === NotifType.LINK_ACC && <PostNotification Notification={notif}/>}
            {notif.notifType === NotifType.DM && <PostNotification Notification={notif}/>}


          </li>
        ))}
      </ul>
  );
}
