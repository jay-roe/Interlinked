import { User, UserWithId } from '@/types/User';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Card from '../Card/Card';
import JobPostHeader from './JobPostHeader';
import JobPostBody from './JobPostBody';
import JobPostFooter from './JobPostFooter';
import { JobPostingWithId } from '@/types/JobPost';
import EditJobPosting from './EditJobPosting';

const FullPostCard = ({
  author,
  jobPost,
  currentUser,
  setJobArray,
  testKey,
}: {
  author?: UserWithId;
  jobPost?: JobPostingWithId;
  currentUser?: User;
  setJobArray: Dispatch<SetStateAction<JobPostingWithId[]>>;
  testKey?: number;
}) => {
  const [editsOpen, setEditsOpen] = useState(false);

  const postContainer = useRef(null);

  return (
    <Card className="mb-4">
      <div
        data-testid={`post-card-${testKey}`}
        id="post-content"
        ref={postContainer}
      >
        <JobPostHeader author={author} jobPost={jobPost} />
        {editsOpen ? (
          <div className="border-b-2 border-y-white border-opacity-10 pb-2">
            <EditJobPosting
              jobPosting={jobPost}
              setJobPostingArray={setJobArray}
              setEditsOpen={setEditsOpen}
            />
          </div>
        ) : (
          <JobPostBody jobPost={jobPost} />
        )}
        <JobPostFooter
          data-testid="post-footer"
          jobPost={jobPost}
          edits={editsOpen}
          setEdits={setEditsOpen}
          setJobArray={setJobArray}
          testKey={testKey}
        />
      </div>
    </Card>
  );
};

export default FullPostCard;
