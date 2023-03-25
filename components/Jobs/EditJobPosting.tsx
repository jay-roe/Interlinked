// This component holds the logic for creating job postings

import { db, typeCollection } from '@/config/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { JobPosting, JobPostingWithId } from '@/types/JobPost';
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { Dispatch, SetStateAction, useState } from 'react';
import Button from '../Buttons/Button';
import CheckBox from '../InputFields/CheckBox/CheckBox';
import Input from '../InputFields/Input/Input';
import TextArea from '../InputFields/TextArea/TextArea';
import ProfileSkills from '../ProfilePage/ProfileSkills/ProfileSkills';
import ExternalApplication from './ExternalApplication';

const EditJobPosting = ({
  newJob,
  jobPosting,
  setJobPostingArray,
  setEditsOpen,
}: {
  newJob?: boolean;
  jobPosting?: JobPostingWithId;
  setJobPostingArray?: Dispatch<SetStateAction<JobPostingWithId[]>>;
  setEditsOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const { currentUser, authUser } = useAuth();
  const [postTitle, setPostTitle] = useState<string>(jobPosting?.title || '');
  const [postDescription, setPostDescription] = useState<string>(
    jobPosting?.description || ''
  );
  const [postLocation, setPostLocation] = useState<string>(
    jobPosting?.location || ''
  );
  const [postDate, setPostDate] = useState<Timestamp>(
    jobPosting?.deadline || Timestamp.fromMillis(Date.now())
  );
  const [postTags, setPostTags] = useState<string[]>(jobPosting?.skills || []);
  const [postTagsEditing, setPostTagsEditing] = useState<boolean>(true);
  const [tagsEditing, setTagsEditing] = useState<boolean[]>(
    jobPosting?.skills.map(() => false) || []
  );
  const [postCoverLetter, setPostCoverLetter] = useState<boolean>(
    jobPosting?.coverLetterRequired || false
  );
  const [postCV, setPostCV] = useState<boolean>(
    jobPosting?.cvRequired || false
  );
  const [postHidden, setPostHidden] = useState<boolean>(
    jobPosting?.hidden || false
  );
  const [externalApp, setExternalApp] = useState<boolean>(
    jobPosting?.externalApplications.length !== 0 ? true : false || false
  );
  const [externalApplications, setExternalApplications] = useState<
    JobPosting['externalApplications']
  >(jobPosting?.externalApplications || []);
  const [externalApplicationsEditing, setExternalApplicationsEditing] =
    useState<boolean[]>(
      jobPosting?.externalApplications.map(() => false) || []
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      postTitle === '' ||
      postDescription === '' ||
      postLocation === '' ||
      (externalApp && externalApplications === null)
    ) {
      alert('Job Posting Not Complete');
      return;
    }

    const definedJob: JobPosting = {
      title: postTitle,
      description: postDescription,
      location: postLocation,
      companyId: authUser.uid,
      companyName: currentUser.name,
      companyProfilePic: currentUser.profilePicture,
      deadline: postDate,
      applications: [],
      skills: postTags,
      coverLetterRequired: postCoverLetter,
      cvRequired: postCV,
      hidden: postHidden,
      datePosted: jobPosting?.datePosted || null,
      externalApplications: externalApp ? externalApplications : [],
    };

    if (newJob && !jobPosting) {
      const docRef = doc(
        typeCollection<JobPosting>(
          collection(doc(db.users, authUser.uid), 'jobPosts')
        )
      );
      await setDoc(docRef, definedJob);
      await updateDoc(docRef, {
        datePosted: serverTimestamp(),
      });
      window.location.reload();
    } else {
      const docRef = doc(
        typeCollection<JobPosting>(
          collection(doc(db.users, authUser.uid), 'jobPosts')
        ),
        jobPosting.postingId
      );
      await updateDoc(docRef, definedJob);

      setJobPostingArray((curr) => {
        return curr.map((job) => {
          if (job.postingId === jobPosting.postingId) {
            return { postingId: jobPosting.postingId, ...definedJob };
          }
          return job;
        });
      });
      setEditsOpen(false);
    }
  };

  return (
    <div className="flex-col space-y-2">
      <div className="flex flex-col align-middle">
        <p className="my-auto whitespace-nowrap text-2xl font-extrabold">
          Job Name:
        </p>
        <Input
          type="text"
          required
          data-testid="change-title"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col align-middle">
        <p className="my-auto whitespace-nowrap text-2xl font-extrabold">
          Job Description:
        </p>
        <TextArea
          required
          data-testid="change-description"
          value={postDescription}
          rows={6}
          onChange={(e) => setPostDescription(e.target.value)}
        />
      </div>

      <div className="flex flex-col align-middle">
        <p className="my-auto whitespace-nowrap text-2xl font-extrabold">
          Location 📍
        </p>
        <Input
          type="text"
          required
          data-testid="change-location"
          value={postLocation}
          onChange={(e) => setPostLocation(e.target.value)}
        />
      </div>

      <div className="flex flex-col align-middle">
        <p className="my-auto whitespace-nowrap text-2xl font-extrabold">
          Application Deadline 📆
        </p>
        <Input
          type="date"
          required
          min={new Date().toISOString().substring(0, 10)}
          data-testid="change-date"
          value={postDate?.toDate().toISOString().substring(0, 10)}
          onChange={(e) =>
            setPostDate(
              Timestamp.fromDate(new Date(e.target.value || Date.now()))
            )
          }
        />
      </div>

      <div className="flex-col">
        <ProfileSkills
          skills={postTags}
          setSkills={setPostTags}
          isEditable={postTagsEditing}
          skillsEditing={tagsEditing}
          setSkillsEditing={setTagsEditing}
        />
        <div className="flex w-auto justify-center">
          <Button
            onClick={() => {
              setPostTagsEditing((curr) => !curr);
            }}
          >
            {postTagsEditing ? 'Save Skills' : 'Edit Skills'}
          </Button>
        </div>
      </div>

      <div className="flex flex-col align-middle sm:flex-row sm:space-x-4">
        <CheckBox
          name="cv"
          checked={postCV}
          onChange={() => setPostCV((curr) => !curr)}
          label="Resume Required?"
        />
        <CheckBox
          name="coverletter"
          checked={postCoverLetter}
          onChange={() => setPostCoverLetter((curr) => !curr)}
          label="Cover Letter Required?"
        />
        <CheckBox
          name="external"
          checked={externalApp}
          onChange={() => setExternalApp((curr) => !curr)}
          label="External Application?"
        />
        <CheckBox
          name="hidden"
          checked={postHidden}
          onChange={() => setPostHidden((curr) => !curr)}
          label="Hide Job Posting?"
        />
      </div>

      {externalApp && (
        <div className="flex flex-col align-middle">
          <ExternalApplication
            data-testid="external-application"
            externalApplications={externalApplications}
            applicationEditing={externalApplicationsEditing}
            setApplication={setExternalApplications}
            setApplicationEditing={setExternalApplicationsEditing}
            isEditable
          />
        </div>
      )}

      <div className="align-end flex w-auto">
        <Button
          type="submit"
          data-testid={newJob ? 'new-job-submit' : 'edit-job-submit'}
          onClick={handleSubmit}
        >
          {newJob ? 'Create Job Posting' : 'Update Job Posting'}
        </Button>
      </div>
    </div>
  );
};

export default EditJobPosting;
