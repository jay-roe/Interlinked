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
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '@/config/firebase';
import type { Document } from '../../types/User';
import InputField from '@/components/InputFields/Input/Input';
import { useLocale, useTranslations } from 'next-intl';
import Link from '../Link/Link';
import { localeToDateLocale } from '@/translations/locales';

export default function Jobs({
  job,
  setJob,
  postingId,
}: {
  job: JobPosting;
  setJob: Dispatch<SetStateAction<JobPosting[]>>;
  postingId: string;
}) {
  const t = useTranslations('Jobs.FullJobCard');
  const locale = useLocale();

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
      setGetttingProfileResume(true);
    } else if (fileType === 'coverLetter') {
      setTempCoverLetter((coverLetter) => {
        let tempCoverLetter = { ...coverLetter };
        tempCoverLetter.link = fileURL;
        return tempCoverLetter;
      });
      setGetttingProfileCoverLetter(true);
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
      if (
        job
          .data()
          .applications.some(
            (application) => application.applicantId === authUser.uid
          )
      ) {
        setApplicationSent(true);
      }
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
          <div className="mb-3 text-sm font-light max-md:hidden">
            {job?.datePosted
              ?.toDate()
              .toLocaleString(localeToDateLocale[locale], {
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
                    {t('full-time')}
                  </div>
                )}
                {job.jobType === JobType.PARTTIME && (
                  <div
                    data-testid="part-time-job-display"
                    className="flex gap-1"
                    style={{ alignItems: 'center' }}
                  >
                    <BsCalendar3 className="text-accent-orange" />
                    {t('part-time')}
                  </div>
                )}
                {job.jobType === JobType.INTERNSHIP && (
                  <div
                    data-testid="internship-job-display"
                    className="flex gap-1"
                    style={{ alignItems: 'center' }}
                  >
                    <BsCalendar3 className="text-accent-orange" />
                    {t('internship')}
                  </div>
                )}
              </div>
              <div className="flex gap-1" style={{ alignItems: 'center' }}>
                <AiOutlineClockCircle className="text-accent-orange " />
                <div>
                  {t('apply-before') +
                    job.deadline
                      .toDate()
                      .toLocaleString(localeToDateLocale[locale], {
                        month: 'long',
                        year: 'numeric',
                        day: '2-digit',
                      })}
                </div>
              </div>
              {job.coverLetterRequired && job.cvRequired && (
                <div className="flex gap-1" style={{ alignItems: 'center' }}>
                  <AiOutlineExclamationCircle className="text-accent-orange" />
                  {t('submit-with-res-and-cl')}
                </div>
              )}
              {job.coverLetterRequired && !job.cvRequired && (
                <div className="flex gap-1" style={{ alignItems: 'center' }}>
                  <AiOutlineExclamationCircle className="text-accent-orange" />
                  {t('submit-with-cl')}
                </div>
              )}
              {!job.coverLetterRequired && job.cvRequired && (
                <div className="flex gap-1" style={{ alignItems: 'center' }}>
                  <AiOutlineExclamationCircle className="text-accent-orange" />
                  {t('submit-with-resume')}
                </div>
              )}
            </div>
          </Card>
          {/* 'Already Sent' check replaces application buttons when job application is sent */}
          {applicationSent && (
            <div
              className="flex justify-start "
              style={{ color: 'green' }}
              data-testid="already-sent-check"
            >
              {' '}
              &nbsp; {t('already-sent')} &nbsp;
              <FaCheck></FaCheck>
            </div>
          )}
          {isEditable &&
            !applicationSent &&
            job.externalApplications.length === 0 && (
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
                    {t('apply')} <FaPaperPlane className="ml-1" />
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
                        alert(t('alert-need-resume'));
                      } else if (
                        job.coverLetterRequired &&
                        !currentUser.coverLetter
                      ) {
                        alert(t('alert-need-cl'));
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
                          alert(t('alert-app-sent'));
                        } catch (err) {
                          console.log(err);
                        }
                      }
                    }}
                  >
                    {t('quick-apply')}
                    <FaPaperPlane className="ml-1" />
                  </Button>
                </div>
              </div>
            )}
          {job.externalApplications.length !== 0 && (
            <div className="flex flex-wrap gap-3">
              {job.externalApplications.map((externalApp, index) => (
                <Link
                  key={index}
                  href={
                    externalApp.url.startsWith('http')
                      ? externalApp.url
                      : 'http://' + externalApp.url
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline"
                >
                  <Button>
                    {t('apply-via')} {externalApp.name}
                    <FaPaperPlane className="ml-1" />
                  </Button>
                </Link>
              ))}
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
              {t('job-application')}
            </div>
            <div className="flex-wrap gap-2">
              <div className="flex-wrap gap-2">
                <Card data-testid="card" className="mb-2">
                  <div>
                    <label>
                      {t('resume')} <span className="text-yellow-600">*</span>
                    </label>
                    <div>
                      <InputField
                        name={'resume'}
                        placeholder={t('resume-filename')}
                        data-testid="resume-input"
                        defaultValue={tempResume?.name}
                        onChange={(e) =>
                          setTempResume((res) => {
                            let tempRes = { ...res };
                            tempRes.name = e.target.value;
                            return tempRes;
                          })
                        }
                      />
                      <div className="flex-col gap-2 ">
                        <div>
                          <Button
                            className="mb-3"
                            onClick={(e) => {
                              handleResumeUploadClick();
                            }}
                            type="button"
                          >
                            {t('upload-resume')} &nbsp;
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
                          {/* if ever the resume is not saved with a name the button defaults to 'profile resume' */}
                          {currentUser.resume && currentUser.resume.name && (
                            <Button
                              onClick={(e) => {
                                getResumefromProfile();
                                setGetttingProfileResume(true);
                              }}
                            >
                              <FaLink> </FaLink> &nbsp;{' '}
                              {currentUser.resume.name}
                            </Button>
                          )}
                          {currentUser.resume && !currentUser.resume.name && (
                            <Button
                              onClick={(e) => {
                                getResumefromProfile();
                                setGetttingProfileResume(true);
                              }}
                            >
                              <FaLink> </FaLink> &nbsp; {t('profile-resume')}
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
                      {t('cover-letter')}{' '}
                      <span className="text-yellow-600">*</span>
                    </label>
                    <div>
                      <InputField
                        name={'cover-letter'}
                        data-testid="cover-letter-input"
                        placeholder={t('cover-letter-filename')}
                        defaultValue={tempCoverLetter?.name}
                        onChange={(e) =>
                          setTempCoverLetter((res) => {
                            let tempRes = { ...res };
                            tempRes.name = e.target.value;
                            return tempRes;
                          })
                        }
                      />

                      <div className="flex-col gap-2">
                        <div>
                          <Button
                            className="mb-3"
                            //  onClick={handleCoverLetterUploadClick}
                            onClick={(e) => {
                              handleCoverLetterUploadClick();
                            }}
                            type="button"
                          >
                            {t('upload-cover-letter')} &nbsp;{' '}
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
                          {/* if ever the cover letter is not saved with a name the button defaults to 'profile cover letter' */}
                          {currentUser.coverLetter &&
                            currentUser.coverLetter.name && (
                              <Button
                                onClick={(e) => {
                                  getCoverLetterfromProfile();
                                  setGetttingProfileCoverLetter(true);
                                }}
                              >
                                <FaLink> </FaLink> &nbsp;{' '}
                                {currentUser.coverLetter.name}
                              </Button>
                            )}

                          {currentUser.coverLetter &&
                            !currentUser.coverLetter.name && (
                              <Button
                                onClick={(e) => {
                                  getCoverLetterfromProfile();
                                  setGetttingProfileCoverLetter(true);
                                }}
                              >
                                <FaLink> </FaLink> &nbsp;{' '}
                                {t('profile-cover-letter')}
                              </Button>
                            )}
                        </div>
                      </div>

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
                    {t('cancel')}
                  </button>
                </div>
                <div>
                  <Button
                    data-testid="send-application-button"
                    onClick={(e) => {
                      e.preventDefault();
                      if (job.cvRequired && !tempResume) {
                        alert(t('alert-need-resume'));
                      } else if (job.coverLetterRequired && !tempCoverLetter) {
                        alert(t('alert-need-cl'));
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
                          alert(t('alert-app-sent'));
                        } catch (err) {
                          console.log(err);
                        }
                        setEditing((curr) => !curr);
                      }
                    }}
                  >
                    {t('send-application')} <FaPaperPlane className="ml-2" />
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
