import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Button from '@/components/Buttons/Button';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import CheckBox from '@/components/InputFields/CheckBox/CheckBox';
import JobHuntIcon from '@/components/Icons/JobHuntIcon/JobHuntIcon';
import JobKeywordSearch from '@/components/JobKeyword/JobKeyword';
import type { JobKeyword } from '@/types/JobKeyword';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/config/firestore';

export default function ProfileJobHunt({
  isEditable = false,
  userid,
  isWantJobNotif,
  setIsWantJobNotif,
  jobNotifEditing = false,
  setJobNotifEditing,
}: {
  isEditable?: boolean;
  userid: string;
  isWantJobNotif: boolean;
  setIsWantJobNotif?: Dispatch<SetStateAction<boolean>>;
  jobNotifEditing?: boolean;
  setJobNotifEditing?: Dispatch<SetStateAction<boolean>>;
}) {
  // does not appear in live version

  const [jobKeywords, setJobKeywords] = useState<JobKeyword[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get all job keywords that user is subscribed to
    getDocs(
      query(db.jobKeywords, where('subscribers', 'array-contains', userid))
    ).then((res) => {
      setJobKeywords(
        res.docs.map((keyword) => ({
          ...keyword.data(),
          id: keyword.id,
        }))
      );
      setLoading(false);
    });
  }, []);

  const addSubscriberKeyword = (keyword: JobKeyword) => {
    // Add userid to selected job keyword for updates!
    updateDoc(doc(db.jobKeywords, keyword.id), {
      subscribers: arrayUnion(userid),
    });
    setJobKeywords((curr) =>
      curr.map((currkeyword) => {
        console.log(`checking keyword:`, currkeyword);

        if (currkeyword.id === keyword.id) {
          keyword.subscribers = [...keyword.subscribers, userid];
          console.log(
            `adding new sub to keyword. subs: ${keyword.subscribers}`
          );
        }
        return keyword;
      })
    );
  };

  const removeSubscriberKeyword = (keywordId: string) => {
    // Remove subscribed user from job keyword
    updateDoc(doc(db.jobKeywords, keywordId), {
      subscribers: arrayRemove(userid),
    });
    setJobKeywords((curr) =>
      curr.map((keyword) => {
        if (keyword.id === keywordId) {
          keyword.subscribers = keyword.subscribers.filter(
            (subscriber) => subscriber !== userid
          );
          console.log(`deleting sub from keyword. subs:`, keyword.subscribers);
        }
        return keyword;
      })
    );
  };

  // editable version
  return (
    <div className="flex flex-row">
      {!jobNotifEditing ? (
        <div className="flex">
          <div className="mt-2 mb-3 flex flex-wrap items-center justify-between rounded-xl bg-white bg-opacity-[8%] p-4">
            <JobHuntIcon isWantJobNotif={isWantJobNotif} />
          </div>
          <EditButton
            data-testid="job-hunt-edit-button"
            onClick={() => setJobNotifEditing((curr) => !curr)}
          />
        </div>
      ) : (
        <div className="mt-2 mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-4">
          <form
            className=""
            onSubmit={(e) => {
              e.preventDefault();
              setJobNotifEditing((curr) => !curr);
            }}
          >
            <div className="">
              <label>
                <JobHuntIcon isWantJobNotif={isWantJobNotif} />
              </label>
              <div className="mt-3 flex items-center gap-3">
                <CheckBox
                  name="jobHunt"
                  label="Receive Job Notifications"
                  checked={isWantJobNotif}
                  onChange={(e) => setIsWantJobNotif(e.target.checked)}
                />
              </div>
              {isWantJobNotif && !loading && (
                <div>
                  <h3>Job keywords to notify you:</h3>
                  <JobKeywordSearch
                    jobKeywords={jobKeywords}
                    addKeyword={addSubscriberKeyword}
                    removeKeyword={removeSubscriberKeyword}
                  />
                </div>
              )}
              <div>
                <Button className="mt-3" type="submit">
                  Save Job Notification Settings
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
