import { JobPosting, JobPostingWithId, JobType } from '@/types/JobPost';
import Card from '../Card/Card';
import CardGrid from '../Card/CardGrid';
import { GoLocation } from 'react-icons/go';
import { BsCalendar3 } from 'react-icons/bs';
import {
  AiOutlineExclamationCircle,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import { FaLink } from 'react-icons/fa';
import { FaCheck, FaCloudUploadAlt, FaPaperPlane } from 'react-icons/fa';
import Button from '../Buttons/Button';
import FileButton from '../Buttons/FileButton/FileButton';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import auth, { storage } from '@/config/firebase';
import type { Document } from '../../types/User';
import InputField from '@/components/InputFields/Input/Input';
import { hoverAction } from '@use-gesture/react';
import LinkButton from '../Buttons/LinkButton/LinkButton';

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

  const [applicationSent, setApplicationSent] = useState<boolean>(false);
  // uploading a file from button

  const resumeInputRef = useRef(null);
  const coverLetterInputRef = useRef(null);

  const handleResumeUploadClick = () => {
    resumeInputRef.current.click();
  };

  const handleCoverLetterUploadClick = () => {
    coverLetterInputRef.current.click();
  };
  // getting profile documents
  const [gettingProfileResume, setGetttingProfileResume] =
    useState<boolean>(false);
  const [gettingProfileCoverLetter, setGetttingProfileCoverLetter] =
    useState<boolean>(false);
  const getResumefromProfile = () => {
    const profileResume = currentUser.resume;
    setTempResume((resume) => {
      let tempResume = { ...resume };
      tempResume.link = profileResume.link;
      tempResume.name = profileResume.name;
      return tempResume;
    });
  };
  const getCoverLetterfromProfile = () => {
    const profileCoverLetter = currentUser.coverLetter;
    setTempCoverLetter((coverLetter) => {
      let tempCoverLetter = { ...coverLetter };
      tempCoverLetter.link = profileCoverLetter.link;
      tempCoverLetter.name = profileCoverLetter.name;
      return tempCoverLetter;
    });
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

  useEffect(() => {
    getDoc(
      doc(
        typeCollection<JobPostingWithId>(
          collection(doc(db.companies, job.companyId), 'jobPosts')
        ),
        postingId
      )
    ).then((job) => {
      let applcations = job.data().applications;
      applcations.forEach((application) => {
        if (application.applicantId === authUser.uid) {
          setApplicationSent(true);
        }
      });
    });
  }, [authUser.uid, job.companyId, postingId]);

  return (
    <div
      data-testid={`full-job-card-cv-${job.cvRequired}-cover-${job.coverLetterRequired}`}
      className="mb-7 items-stretch justify-between "
    >
      <CardGrid
        data-testid="card-grid"
        className={`card flex:1 grid-cols-1 lg:grid-cols-2-1`}
      >
        {/* Post card */}

        <Card
          className={`${
            !isEditable ? 'col-span-1' : 'col-span-3'
          } transition-all`}
          data-testid="job-post-card"
        >
          {applicationSent && (
            <div className="flex justify-end text-accent-orange">
              {' '}
              Already Sent &nbsp; <FaCheck></FaCheck>
            </div>
          )}
          <div className="mb-3 text-sm font-light max-md:hidden">
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

            <Card data-testid="card" className="mb-3">
              <div className="mr-2 max-w-fit">
                <p style={{ overflowWrap: 'break-word' }}>{job.description}</p>
              </div>
            </Card>
            <ul className="inline-flex flex-wrap">
              {job.skills.map((sk, index) => (
                <li
                  key={index}
                  className="mb-3 mt-1 mr-3 flex max-w-fit flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-3 text-lg font-light"
                >
                  {sk}
                </li>
              ))}
            </ul>
            <div className=" ">
              <div className="flex gap-1" style={{ alignItems: 'center' }}>
                <GoLocation className="text-accent-orange" /> {job.location}
              </div>
              <div>
                {job.jobType === JobType.FULLTIME && (
                  <div
                    data-testid="full-time-job-display"
                    className="flex gap-1"
                    style={{ alignItems: 'center' }}
                  >
                    <BsCalendar3 className="text-accent-orange" />
                    Full-time
                  </div>
                )}
                {job.jobType === JobType.PARTTIME && (
                  <div
                    data-testid="part-time-job-display"
                    className="flex gap-1"
                    style={{ alignItems: 'center' }}
                  >
                    <BsCalendar3 className="text-accent-orange" />
                    Part-time
                  </div>
                )}
                {job.jobType === JobType.INTERNSHIP && (
                  <div
                    data-testid="internship-job-display"
                    className="flex gap-1"
                    style={{ alignItems: 'center' }}
                  >
                    <BsCalendar3 className="text-accent-orange" />
                    Internship
                  </div>
                )}
              </div>
              <div className="flex gap-1" style={{ alignItems: 'center' }}>
                <AiOutlineClockCircle className="text-accent-orange " />
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
                <div className="flex gap-1" style={{ alignItems: 'center' }}>
                  <AiOutlineExclamationCircle className="text-accent-orange" />
                  Submit with resume and cover letter
                </div>
              )}
              {job.coverLetterRequired && !job.cvRequired && (
                <div className="flex gap-1" style={{ alignItems: 'center' }}>
                  <AiOutlineExclamationCircle className="text-accent-orange" />
                  Submit with cover letter
                </div>
              )}
              {!job.coverLetterRequired && job.cvRequired && (
                <div className="flex gap-1" style={{ alignItems: 'center' }}>
                  <AiOutlineExclamationCircle className="text-accent-orange" />
                  Submit with resume
                </div>
              )}
            </div>
          </Card>
          {isEditable && !applicationSent && (
            <div className="flex flex-wrap gap-3">
              {/* Main apply button */}
              <div>
                <Button
                  data-testid="apply-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setEditing((curr) => !curr);
                  }}
                >
                  Apply <FaPaperPlane className="ml-2" />
                </Button>
              </div>
              {/* Quick apply to job button */}
              <div>
                <Button
                  data-testid="quick-apply-button"
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
                      try {
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
                        setApplicationSent(true);
                        alert('application sent!');
                      } catch (err) {
                        console.log(err);
                      }
                    }
                  }}
                >
                  Quick Apply <FaPaperPlane className="ml-2" />
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Apply button innards */}
        {!isEditable && (
          <Card data-testid="card" className="relative row-span-2 break-words">
            <div
              data-testid="job-application-form"
              className=" mb-2 flex-wrap gap-2 text-xl font-bold text-accent-orange"
            >
              Apply to Job with new documents
            </div>
            <div className="flex-wrap gap-2">
              <div className="flex-wrap gap-2">
                <Card data-testid="card" className="mb-2">
                  <div>
                    <label>
                      Resume <span className="text-yellow-600">*</span>
                    </label>
                    <div>
                      <InputField
                        name={'resume'}
                        placeholder="Resume file name"
                        data-testid="cover-letter-input"
                        defaultValue={tempResume?.name}
                        onChange={(e) =>
                          setTempResume((res) => {
                            let tempRes = { ...res };
                            tempRes.name = e.target.value;
                            return tempRes;
                          })
                        }
                      />
                      <div className="flex gap-2">
                        <div>
                          <Button
                            onClick={(e) => {
                              handleResumeUploadClick();
                              setGetttingProfileResume((curr) => !curr);
                            }}
                            type="button"
                          >
                            Upload Resume &nbsp;
                            {!gettingProfileResume && (
                              <FaCloudUploadAlt size={25} />
                            )}
                            {gettingProfileResume && (
                              <FaCheck data-testid="job-resume-check">
                                {' '}
                              </FaCheck>
                            )}
                          </Button>
                        </div>
                        <div>
                          {currentUser.resume && (
                            <Button
                              onClick={(e) => {
                                getResumefromProfile();
                                setGetttingProfileResume((curr) => !curr);
                              }}
                            >
                              <FaLink> </FaLink> &nbsp; Profile Resume
                            </Button>
                          )}
                        </div>
                      </div>

                      <input
                        type="file"
                        ref={resumeInputRef}
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(e, 'resume')}
                      />
                    </div>
                  </div>
                </Card>
                <Card data-testid="card" className="mb-2">
                  <div>
                    <label>
                      Cover Letter <span className="text-yellow-600">*</span>
                    </label>
                    <div>
                      <InputField
                        name={'cover-letter'}
                        data-testid="-input"
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

                      <div className="flex gap-2">
                        <div>
                          <Button
                            //  onClick={handleCoverLetterUploadClick}
                            onClick={(e) => {
                              handleCoverLetterUploadClick();
                              setGetttingProfileCoverLetter((curr) => !curr);
                            }}
                            type="button"
                          >
                            Upload Cover Letter &nbsp;{' '}
                            {!gettingProfileCoverLetter && (
                              <FaCloudUploadAlt size={25} />
                            )}
                            {gettingProfileCoverLetter && (
                              <FaCheck data-testid="job-coverLetter-check">
                                {' '}
                              </FaCheck>
                            )}
                          </Button>
                        </div>
                        <div>
                          {currentUser.coverLetter && (
                            <Button
                              onClick={(e) => {
                                getCoverLetterfromProfile();
                                setGetttingProfileCoverLetter((curr) => !curr);
                              }}
                            >
                              <FaLink> </FaLink> &nbsp; Profile Cover Letter
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* { gettingProfileCoverLetter &&
                      <p>  { tempCoverLetter.name || 'none'} </p> 
                      } */}

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
              <div
                data-testid="cancel-application-button"
                className="flex flex-wrap gap-2"
              >
                <div>
                  <button
                    className=" inline-flex items-center rounded-lg bg-gray-400 px-5 py-2.5 text-center text-sm font-bold text-purple-background transition-all hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-900"
                    onClick={(e) => {
                      e.preventDefault();
                      setEditing((curr) => !curr);
                    }}
                  >
                    Cancel
                  </button>
                </div>
                <div>
                  <Button
                    data-testid="send-application-button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (job.cvRequired && !tempResume) {
                        alert('You need a resume to apply to this job.');
                      } else if (job.coverLetterRequired && !tempCoverLetter) {
                        alert('You need a cover letter to apply to this job.');
                      } else {
                        try {
                          setJob((jobs) => {
                            let actJob = jobs.find(
                              (tempJob) => job === tempJob
                            );
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
                        } catch (err) {
                          console.log(err);
                        }
                        setEditing((curr) => !curr);
                        setApplicationSent(true);
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
