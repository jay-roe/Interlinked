import { JobPosting, JobType } from '@/types/JobPost';
import Card from '../Card/Card';
import CardGrid from '../Card/CardGrid';
import { GoLocation } from 'react-icons/go';
import { BsCalendar3 } from 'react-icons/bs';
import {
  AiOutlineExclamationCircle,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import { FaCloudUploadAlt, FaPaperPlane } from 'react-icons/fa';
import Button from '../Buttons/Button';
import FileButton from '../Buttons/FileButton/FileButton';
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '@/config/firebase';
import type { Document } from '../../types/User';
import InputField from '@/components/InputFields/Input/Input';

export default function Jobs({
  job,
  setJob,
  postingId,
}: {
  job: JobPosting;
  setJob: Dispatch<SetStateAction<JobPosting[]>>;
  postingId: string;
}) {
  const { currentUser, authUser } = useAuth();
  const [isEditable, setEditing] = useState<boolean>(true);

  const [tempResume, setTempResume] = useState<Document>(null);
  const [tempCoverLetter, setTempCoverLetter] = useState<Document>(null);

  // uploading a file from button

  const resumeInputRef = useRef(null);
  const coverLetterInputRef = useRef(null);

  const handleResumeUploadClick = () => {
    resumeInputRef.current.click();
  };

  const handleCoverLetterUploadClick = () => {
    coverLetterInputRef.current.click();
  };

  const handleFileUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    fileType: 'resume' | 'coverLetter'
  ) => {
    const links = Array.from(event.target.files);
    if (!links || !links[0]) {
      return;
    }

    const fileRef = ref(
      storage,
      `users/${authUser.uid}/application/${fileType}/${links[0].name}`
    );
    console.log('FT', fileType);

    // Check if file already exists
    getDownloadURL(fileRef)
      .then((res) => {
        // File already exists, delete it
        deleteObject(fileRef).then((res) => {});
      })
      .catch((err) => console.error(err));

    await uploadBytes(fileRef, links[0]);
    const fileURL = await getDownloadURL(fileRef);

    if (fileType === 'resume') {
      setTempResume((resume) => {
        let tempResume = { ...resume };
        tempResume.link = fileURL;
        return tempResume;
      });
    } else if (fileType === 'coverLetter') {
      setTempCoverLetter((coverLetter) => {
        let tempCoverLetter = { ...coverLetter };
        tempCoverLetter.link = fileURL;
        return tempCoverLetter;
      });
    }
  };

  return (
    <div className="mb-3 flex flex-wrap items-stretch justify-between">
      <CardGrid
        data-testid="card-grid"
        className="w-full grid-cols-1 lg:grid-cols-2-1"
        // style={{ backgroundColor: ''}}
      >
        {/* Post card */}
        {/* <div className="flex flex-wrap gap-3 "> */}
        {/* <div> */}
        <Card className="col-span-1 transition-all">
          <div className="mb-7 text-sm font-light max-md:hidden">
            {job?.datePosted?.toDate().toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
              day: '2-digit',
            })}
          </div>
          <Card className="mb-3">
            <div className="break-all text-2xl font-extrabold">
              <p>{job.title}</p>
            </div>
            <div className="font-lg break-all text-2xl">
              <p>{job.companyName}</p>
            </div>

            <Card className="mb-3">
              <div className="mr-2 max-w-fit">
                <p style={{ overflowWrap: 'break-word' }}>{job.description}</p>
              </div>
            </Card>
            <ul
              className="inline-flex flex-wrap"
              data-testid="live-code-langs" // MUST CHANGE DATA-TESTID
            >
              {job.skills.map((sk, index) => (
                <li
                  key={index}
                  data-testid={`live-coding-lang-${index}`} // MUST CHANGE DATA-TESTID
                  className="mb-3 mt-1 mr-3 flex max-w-fit flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-3 text-lg font-light"
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
          {isEditable && (
            <div className="flex flex-wrap gap-3">
              {/* Main apply button */}
              <div>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    setEditing((curr) => !curr);
                  }}
                >
                  Apply <FaPaperPlane className="" />
                </Button>
              </div>
              {/* Quick apply to job button */}
              <div>
                <Button
                  className="bg-indigo-900"
                  onClick={(e) => {
                    e.preventDefault();
                    if (job.cvRequired && !currentUser.resume) {
                      alert('You need a resume to apply to this job.');
                    } else if (
                      job.coverLetterRequired &&
                      !currentUser.coverLetter
                    ) {
                      alert('You need a cover letter to apply to this job.');
                    } else {
                      setJob((jobs) => {
                        let actJob = jobs.find((tempJob) => job === tempJob);
                        let newApp = {
                          applicantId: authUser.uid,
                          applicantName: currentUser.name,
                          applicantProfilePic: currentUser.profilePicture,
                          documents: [
                            currentUser?.resume,
                            currentUser?.coverLetter,
                          ],
                        };
                        actJob.applications.push(newApp);
                        return jobs;
                      });
                      updateDoc(
                        doc(
                          collection(doc(db.users, job.companyId), 'jobPosts'),
                          postingId
                        ),
                        job
                      );
                      alert('application sent!');
                    }
                  }}
                >
                  Quick Apply <FaPaperPlane className="" />
                </Button>
              </div>
            </div>
          )}
        </Card>
        {/* </div> */}

        {/* Apply button innards */}
        {!isEditable && (
          <Card className="relative row-span-2 break-words">
            {/* <div className="mt-2 flex justify-end"> */}
            {/* <CardGrid> */}
            <div className="mb-4 flex gap-1 text-xl font-bold text-accent-orange">
              Job Application
            </div>
            <div className="flex-wrap gap-2">
              <div className="flex-wrap gap-2">
                {/* <div>
                        <FileButton link={'should link to resume'}>
                          My Resume
                        </FileButton>
                      </div> */}
                <Card className="mb-2">
                  <div>
                    <label>
                      Resume <span className="text-yellow-600">*</span>
                    </label>
                    <div>
                      <InputField
                        placeholder="Resume file name"
                        defaultValue={tempResume?.name}
                        onChange={(e) =>
                          setTempResume((res) => {
                            let tempRes = { ...res };
                            tempRes.name = e.target.value;
                            return tempRes;
                          })
                        }
                      />
                      <Button onClick={handleResumeUploadClick} type="button">
                        Upload Resume &nbsp; <FaCloudUploadAlt size={25} />
                      </Button>

                      <input
                        type="file"
                        ref={resumeInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(e, 'resume')}
                      />
                    </div>
                  </div>
                </Card>
                <Card className="mb-2">
                  <div>
                    <label>
                      Cover Letter <span className="text-yellow-600">*</span>
                    </label>
                    <div>
                      <InputField
                        placeholder="Cover letter file name"
                        defaultValue={tempCoverLetter?.name}
                        onChange={(e) =>
                          setTempCoverLetter((res) => {
                            let tempRes = { ...res };
                            tempRes.name = e.target.value;
                            return tempRes;
                          })
                        }
                      />
                      <Button
                        onClick={handleCoverLetterUploadClick}
                        type="button"
                      >
                        Upload Cover Letter &nbsp;{' '}
                        <FaCloudUploadAlt size={25} />
                      </Button>

                      <input
                        type="file"
                        ref={coverLetterInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(e, 'coverLetter')}
                      />
                    </div>
                  </div>
                </Card>
              </div>
              <div className="flex flex-wrap gap-2">
                <div>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      setEditing((curr) => !curr);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
                <div>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      if (job.cvRequired && !tempResume) {
                        alert('You need a resume to apply to this job.');
                      } else if (job.coverLetterRequired && !tempCoverLetter) {
                        alert('You need a cover letter to apply to this job.');
                      } else {
                        setJob((jobs) => {
                          let actJob = jobs.find((tempJob) => job === tempJob);
                          let newApp = {
                            applicantId: authUser.uid,
                            applicantName: currentUser.name,
                            applicantProfilePic: currentUser.profilePicture,
                            documents: [tempResume, tempCoverLetter],
                          };
                          actJob.applications.push(newApp);
                          return jobs;
                        });
                        updateDoc(
                          doc(
                            collection(
                              doc(db.users, job.companyId),
                              'jobPosts'
                            ),
                            postingId
                          ),
                          job
                        );
                        alert('application sent!');
                      }
                    }}
                  >
                    Send Application <FaPaperPlane className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </CardGrid>
    </div>
  );
}
