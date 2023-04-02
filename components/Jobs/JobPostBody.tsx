import { JobPostingWithId } from '@/types/JobPost';
import { HiLocationMarker } from 'react-icons/hi';
import {
  AiOutlineClockCircle,
  AiOutlinePaperClip,
  AiOutlineEye,
} from 'react-icons/ai';
import Button from '../Buttons/Button';

const PostBody = ({ jobPost }: { jobPost?: JobPostingWithId }) => {
  // Creates the body of the post constaining the title, body text and also handles editing logic
  return (
    <div className="mb-3 flex flex-col space-y-2 border-y-2 border-y-white border-opacity-10 p-2">
      {jobPost?.title ? (
        <div
          data-testid="job-post-title"
          className="text-2xl font-medium leading-10"
        >
          {jobPost?.title || ''}
        </div>
      ) : (
        <div data-testid="no-post-title"></div>
      )}

      <div className="leading-normal" data-testid="job-post-description">
        {jobPost?.description || ''}
      </div>

      <div
        className="flex space-x-1 align-middle"
        data-testid="job-post-location"
      >
        <HiLocationMarker className="my-auto text-accent-orange" />
        <p>{'Location: ' + jobPost?.location}</p>
      </div>
      <div className="flex space-x-1 align-middle">
        <AiOutlineClockCircle className="my-auto text-accent-orange" />
        <div
          data-testid="test-date"
          className="text-sm font-light max-md:hidden"
        >
          {'Deadline: ' +
            jobPost?.deadline?.toDate().toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }) || 'Unknown'}
        </div>
        <div className="text-sm font-light md:hidden">
          {'Deadline: ' +
            jobPost?.deadline?.toDate().toLocaleString('en-US', {
              month: '2-digit',
              year: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              hour12: false,
              minute: '2-digit',
            }) || 'Unknown'}
        </div>
      </div>
      <div className="flex space-x-1 align-middle" data-testid="job-post-cv">
        <AiOutlinePaperClip className="my-auto text-accent-orange" />
        <p>{'Resume Required: ' + (jobPost?.cvRequired ? 'Yes' : 'No')}</p>
      </div>
      <div className="flex space-x-1 align-middle" data-testid="job-post-cl">
        <AiOutlinePaperClip className="my-auto text-accent-orange" />
        <p>
          {'Cover Letter Required: ' +
            (jobPost?.coverLetterRequired ? 'Yes' : 'No')}
        </p>
      </div>
      <div
        className="flex space-x-1 align-middle"
        data-testid="job-post-hidden"
      >
        <AiOutlineEye className="my-auto text-accent-orange" />
        <p>{'Hidden: ' + (jobPost?.hidden ? 'Yes' : 'No')}</p>
      </div>
      <div data-testid="job-post-keywords">
        🔑 Keywords:{' '}
        {jobPost?.keywords && jobPost?.keywords.length > 0
          ? jobPost.keywords.map((kw) => kw.keyword).join(', ')
          : 'None'}
      </div>
      <div data-testid="job-post-external">
        {jobPost?.externalApplications?.map((externalApp, index) => (
          <div className="mb-2" key={index}>
            <a
              href={externalApp.url}
              target="_blank"
              rel="noreferrer"
              className="inline"
            >
              <Button>Apply via {externalApp.name}</Button>
            </a>
            <br />
          </div>
        ))}
      </div>
      <div
        className="flex space-x-1 align-middle"
        data-testid="job-post-skills"
      >
        <p>
          {'💪 Skills: ' +
            (jobPost?.skills.length === 0
              ? 'None'
              : jobPost?.skills.join(', '))}
        </p>
      </div>
    </div>
  );
};

export default PostBody;
