import LinkIcon from '../Icons/LinkIcon/LinkIcon';
import NotificationHeader from './NotificationHeader';


export default function postNotification({Notification:notif}) {
  return (
    <div className="flex start"> 
        <div className="text-accent-orange">
          <LinkIcon linked size={60}/>
        </div>
        <div className="ml-5">
          <NotificationHeader Notification={notif} />
          <div className="m-3">
            <p>{notif.context}</p>
          </div>
        </div>
    </div>
  );
}

