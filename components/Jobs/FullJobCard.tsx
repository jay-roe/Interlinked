import { JobPosting } from '@/types/JobPost';
import Card from '../Card/Card';
import CardGrid from '../Card/CardGrid';
import { GoLocation } from 'react-icons/go';
import {
  AiOutlineExclamationCircle,
  AiOutlineClockCircle,
} from 'react-icons/ai';

export default function jobs({ job }: { job: JobPosting }) {
  return (
    <CardGrid
      data-testid="card-grid"
      className={`grid-cols-1 lg:grid-cols-2-1`}
    >
      {/* Post card */}
      <Card>
        <div>
          {job.datePosted.toDate().toLocaleString('en-US', {
            month: 'long',
            year: 'numeric',
            day: '2-digit',
          })}
        </div>
        <div>{job.title}</div>
        <div>{job.companyName}</div>
        <div>{job.description}</div>
        <ul className="inline-flex flex-wrap" data-testid="live-code-langs">
          {job.skills.map((sk, index) => (
            <li
              key={index}
              data-testid={`live-coding-lang-${index}`}
              className="mb-3 mt-1 mr-3 flex max-w-fit flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-3 text-lg font-semibold"
            >
              {sk}
            </li>
          ))}
        </ul>
        <div>
          <div>
            <GoLocation className="text-accent-orange" /> {job.location}
          </div>
          <div>
            <AiOutlineClockCircle className="text-accent-orange" />
            <div>
              {'Apply before ' +
                job.deadline.toDate().toLocaleString('en-US', {
                  month: 'long',
                  year: 'numeric',
                  day: '2-digit',
                })}
            </div>
          </div>
          {job.coverLetterRequired && job.cvRequired && (
            <div>
              <AiOutlineExclamationCircle className="text-accent-orange" />{' '}
              Submit with resume and cover letter
            </div>
          )}
          {job.coverLetterRequired && !job.cvRequired && (
            <div>
              <AiOutlineExclamationCircle className="text-accent-orange" />{' '}
              Submit with cover letter
            </div>
          )}
          {!job.coverLetterRequired && job.cvRequired && (
            <div>
              <AiOutlineExclamationCircle className="text-accent-orange" />{' '}
              Submit with resume
            </div>
          )}
        </div>
      </Card>
    </CardGrid>
  );
}
