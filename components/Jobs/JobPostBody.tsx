import { JobPostingWithId } from '@/types/JobPost';
import { HiLocationMarker } from 'react-icons/hi';
import {
  AiOutlineClockCircle,
  AiOutlinePaperClip,
  AiOutlineEye,
} from 'react-icons/ai';
import Button from '../Buttons/Button';
import { useTranslations } from 'next-intl';

const PostBody = ({ jobPost }: { jobPost?: JobPostingWithId }) => {
  // Creates the body of the post constaining the title, body text and also handles editing logic
  const t = useTranslations('Jobs.PostBody');
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
        <p>{t('location') + jobPost?.location}</p>
      </div>
      <div className="flex space-x-1 align-middle">
        <AiOutlineClockCircle className="my-auto text-accent-orange" />
        <div
          data-testid="test-date"
          className="text-sm font-light max-md:hidden"
        >
          {t('deadline') +
            jobPost?.deadline?.toDate().toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }) || 'Unknown'}
        </div>
        <div className="text-sm font-light md:hidden">
          {t('deadline') +
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
        <p>
          {t('resume-required') + (jobPost?.cvRequired ? t('yes') : t('no'))}
        </p>
      </div>
      <div className="flex space-x-1 align-middle" data-testid="job-post-cl">
        <AiOutlinePaperClip className="my-auto text-accent-orange" />
        <p>
          {t('cover-letter-required') +
            (jobPost?.coverLetterRequired ? t('yes') : t('no'))}
        </p>
      </div>
      <div
        className="flex space-x-1 align-middle"
        data-testid="job-post-hidden"
      >
        <AiOutlineEye className="my-auto text-accent-orange" />
        <p>{t('hidden') + (jobPost?.hidden ? t('yes') : t('no'))}</p>
      </div>
      <div data-testid="job-post-keywords">
        {t('keywords')}{' '}
        {jobPost?.keywords && jobPost?.keywords.length > 0
          ? jobPost.keywords.map((kw) => kw.keyword).join(', ')
          : t('none')}
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
              <Button>
                {t('apply-via')} {externalApp.name}
              </Button>
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
          {t('skills') +
            (jobPost?.skills.length === 0
              ? t('none')
              : jobPost?.skills.join(', '))}
        </p>
      </div>
    </div>
  );
};

export default PostBody;
