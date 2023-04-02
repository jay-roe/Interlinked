import { RiCheckboxBlankCircleFill } from 'react-icons/ri';

export default function NotifBlueDotIcon({ read }: { read: boolean }) {
  return (
    <div className="text-indigo-600">
      {!read && <RiCheckboxBlankCircleFill size={30} />}
    </div>
  );
}
