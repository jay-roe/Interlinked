import { JobPosting, JobType } from '@/types/JobPost';
import Card from '../Card/Card';
import CardGrid from '../Card/CardGrid';
import { GoLocation } from 'react-icons/go';
import { BsCalendar3 } from 'react-icons/bs';
import {
  AiOutlineExclamationCircle,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import { FaPaperPlane } from 'react-icons/fa';
import Button from '../Buttons/Button';
import { Dispatch, SetStateAction } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';

export default function jobs({
  job,
  setJob,
}: {
  job: JobPosting;
  setJob: Dispatch<SetStateAction<JobPosting[]>>;
}) {
  const { currentUser, authUser } = useAuth();
  return (
    <div className="mb-3">
      <CardGrid
        data-testid="card-grid"
        className={`grid-cols-1 lg:grid-cols-2-1`}
      >
        {/* Post card */}
        <Card>
          <div className="mb-7 text-sm font-light max-md:hidden">
            {job.datePosted.toDate().toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
              day: '2-digit',
            })}
          </div>
          <Card className="mb-3">
            <div className="break-all text-2xl font-extrabold">{job.title}</div>
            <div className="font-lg break-all text-2xl">{job.companyName}</div>

            <Card className="mb-3">
              <div className="mr-2 max-w-fit">{job.description}</div>
            </Card>
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
              <div className="flex gap-1">
                <GoLocation className="text-accent-orange" /> {job.location}
              </div>
              <div>
                {job.jobType === JobType.FULLTIME && (
                  <div className="flex gap-1">
                    <BsCalendar3 className="text-accent-orange" />
                    Full-time
                  </div>
                )}
                {job.jobType === JobType.PARTTIME && (
                  <div className="flex gap-1">
                    <BsCalendar3 className="text-accent-orange" />
                    Part-time
                  </div>
                )}
                {job.jobType === JobType.INTERNSHIP && (
                  <div className="flex gap-1">
                    <BsCalendar3 className="text-accent-orange" />
                    Internship
                  </div>
                )}
              </div>
              <div className="flex gap-1">
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
                <div className="flex gap-1">
                  <AiOutlineExclamationCircle className="text-accent-orange" />
                  Submit with resume and cover letter
                </div>
              )}
              {job.coverLetterRequired && !job.cvRequired && (
                <div className="flex gap-1">
                  <AiOutlineExclamationCircle className="text-accent-orange" />
                  Submit with cover letter
                </div>
              )}
              {!job.coverLetterRequired && job.cvRequired && (
                <div className="flex gap-1">
                  <AiOutlineExclamationCircle className="text-accent-orange" />
                  Submit with resume
                </div>
              )}
            </div>
          </Card>
          {/* Quick apply to job button */}
          <div className="flex gap-3">
            <Button type="button" style={{ float: 'right' }}>
              {' '}
              Apply <FaPaperPlane className="ml-2" />
            </Button>
            <Button
              type="button"
              style={{ float: 'right' }}
              onClick={() => {
                // e.preventDefault();
                setJob((jobs) => {
                  let actJob = jobs.find((tempJob) => job === tempJob);
                  let newApp = {
                    applicantId: authUser.uid,
                    applicantName: currentUser.name,
                    applicantProfilePic: currentUser.profilePicture,
                    documents: [currentUser.resume, currentUser.coverLetter],
                  };
                  actJob.applications.push(newApp);
                  return jobs;
                });
                updateDoc(
                  doc(
                    collection(doc(db.users, job.companyId), 'jobPosts'),
                    'P3IlUBNr3Q3ignfIJOLd' // job posting ID -> talk to Koosha about how to get it
                  ),
                  job
                );
              }}
            >
              {' '}
              Quick Apply <FaPaperPlane className="ml-2" />
            </Button>
          </div>
        </Card>
      </CardGrid>
    </div>
  );
}
