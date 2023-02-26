import { MdDescription } from "react-icons/md";
import NotificationHeader from './NotificationHeader';


export default function postNotification({Notification:notif}) {
  return (
    <div className="flex start"> 
        <div className="text-accent-orange">
          <MdDescription size={60} className="align-self-center"/>
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