import { SiGooglemessages } from "react-icons/si";
import NotificationHeader from './NotificationHeader';


export default function postNotification({Notification:notif}) {
  return (
    <div className="flex start"> 
        <div className="text-accent-orange">
          <SiGooglemessages size={60} className="align-self-center"/>
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
