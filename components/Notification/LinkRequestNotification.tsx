import LinkIcon from '../Icons/LinkIcon/LinkIcon';
import NotificationHeader from './NotificationHeader';
import { BsCheckLg, BsXLg } from "react-icons/bs";



export default function postNotification({Notification:notif}) {
  return (
    <div className="flex justify-between">
      <div className="flex start"> 
          <div className="text-accent-orange">
            <LinkIcon size={60}/>
          </div>
          <div className="ml-5">
            <NotificationHeader Notification={notif} />
            <div className="m-3">
              <p>{notif.context}</p>
            </div>
          </div>
      </div>
      <div className="flex start text-accent-orange">
        <BsCheckLg className="m-4" size={30}/><BsXLg className="m-4" size={30}/>
      </div>
    </div>
    
  );
}

