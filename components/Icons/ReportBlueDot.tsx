'use client';
import { db } from '@/config/firestore';
import { collection, updateDoc, doc } from '@firebase/firestore';
import {
  RiCheckboxBlankCircleFill,
  RiCheckboxBlankCircleLine,
} from 'react-icons/ri';
import { useAuth } from '@/contexts/AuthContext';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Report } from '@/types/Report';

export default function ReportBlueDot({
  reportRead,
  reportId,
  setReports, //necessary to update parent object about new read state (for read all button)
}: {
  reportRead: boolean;
  reportId: string;
  setReports: Dispatch<SetStateAction<Report[]>>;
}) {
  const { authUser } = useAuth();
  const [read, setRead] = useState(reportRead);
  useEffect(() => {
    setRead(reportRead);
  }, [reportRead]);
  return (
    <button
      onClick={async (e) => {
        e.preventDefault();
        await updateDoc(
          doc(collection(doc(db.users, authUser.uid), 'report'), reportId),
          {
            read: !read,
          }
        );
        setRead((curr) => !curr);
        setReports((curr) =>
          curr.map((rep) => {
            if (rep.reportId === reportId) {
              return {
                ...rep,
                read: !rep.read,
              };
            }
            return rep;
          })
        );
      }}
    >
      <div className="text-indigo-600 hover:text-emerald-600">
        {read ? (
          <RiCheckboxBlankCircleLine size={40} data-testid="blue-dot" />
        ) : (
          <RiCheckboxBlankCircleFill size={40} data-testid="blue-dot" />
        )}
      </div>
    </button>
  );
}
