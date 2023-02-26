import { Notification } from '@/types/User';
import PostNotification from '../Notification/PostNotification';
import { NotifType } from '@/types/User';import CommentNotification from './CommentNotification';
import LikeNotification from './LikeNotification';
import LinkRequestNotification from './LinkRequestNotification';
import DmNotification from './DmNotification';
import LinkAcceptNotification from './LinkAcceptNotification';


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
        context: 'You got a DM',
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
        context: 'your link request was accepted',
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
        context: 'you got a link request',
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
        context: 'your post was liked',
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
    <ul className="mb-3" data-testid="live-profile">
        {notifications.map((notif, index) => (
          <li
            key={index}
            className="mb-3 rounded-xl bg-white bg-opacity-[8%] p-3"
          >
            {notif.notifType === NotifType.POST && <PostNotification Notification={notif}/>}
            {notif.notifType === NotifType.COMMENT && <CommentNotification Notification={notif}/>}
            {notif.notifType === NotifType.LIKE && <LikeNotification Notification={notif}/>}
            {notif.notifType === NotifType.LINK_REQ && <LinkRequestNotification Notification={notif}/>}
            {notif.notifType === NotifType.LINK_ACC && <LinkAcceptNotification Notification={notif}/>}
            {notif.notifType === NotifType.DM && <DmNotification Notification={notif}/>}
          </li>
          
        ))}
      </ul>
    
  );
}
