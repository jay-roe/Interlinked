import { Dispatch, SetStateAction, useState } from 'react';

import Button from '../Buttons/Button';
import { JobPosting, JobPostingWithId } from '@/types/JobPost';
import { typeCollection, db } from '@/config/firestore';
import { collection, deleteDoc, doc } from 'firebase/firestore';

const PostFooter = ({
  jobPost,
  edits,
  setEdits,
  setJobArray,
}: {
  jobPost: JobPostingWithId;
  edits: boolean;
  setEdits: Dispatch<SetStateAction<boolean>>;
  setJobArray: Dispatch<SetStateAction<JobPostingWithId[]>>;
}) => {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this job post?')) {
      setJobArray((curr) => {
        return curr.filter((job) => job.postingId !== jobPost.postingId);
      });

      await deleteDoc(
        doc(
          typeCollection<JobPosting>(
            collection(doc(db.users, jobPost.companyId), 'jobPosts')
          ),
          jobPost.postingId
        )
      );
    }
    return;
  };

  return (
    <div className="my-2 flex items-center space-x-4">
      <Button
        data-testid="job-post-edit"
        onClick={() => {
          if (edits && confirm('All unsaved changes will be lost!')) {
            setEdits((curr) => !curr);
          } else if (!edits) setEdits((curr) => !curr);
        }}
      >
        Edit Job Posting
      </Button>
      {/* TODO: Do view applicants when applications are being worked on */}
      <Button data-testid="job-post-applicants">View Applicants</Button>
      <Button
        variant="danger"
        data-testid="job-post-delete"
        onClick={handleDelete}
      >
        Delete Job Posting
      </Button>
    </div>
  );
};

export default PostFooter;
