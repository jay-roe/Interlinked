import type { User } from '@/types/User';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import { ChangeEvent, Dispatch, SetStateAction, useRef } from 'react';
import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import InputField from '@/components/InputFields/Input/Input';
import { FaCloudUploadAlt, FaCheck } from 'react-icons/fa';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '@/config/firebase';
import FileButton from '@/components/Buttons/FileButton/FileButton';
import { useTranslations } from 'next-intl';

export default function ProfileDocuments({
  isEditable = false,
  resume,
  coverLetter,
  resumeEditing,
  coverLetterEditing,
  setResumeEditing,
  setCoverLetterEditing,
  setResume,
  setCoverLetter,
  uid,
}: {
  isEditable?: boolean;
  resume: User['resume'];
  coverLetter: User['coverLetter'];
  resumeEditing?: boolean;
  coverLetterEditing?: boolean;
  setResumeEditing?: Dispatch<SetStateAction<boolean>>;
  setCoverLetterEditing?: Dispatch<SetStateAction<boolean>>;
  setResume?: Dispatch<SetStateAction<User['resume']>>;
  setCoverLetter?: Dispatch<SetStateAction<User['coverLetter']>>;
  uid?: string;
}) {
  const t = useTranslations('Profile.Documents');

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

    const fileRef = ref(storage, `users/${uid}/${fileType}/${links[0].name}`);

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
      setResume((resume) => {
        let tempResume = { ...resume };
        tempResume.link = fileURL;
        return tempResume;
      });
    } else if (fileType === 'coverLetter') {
      setCoverLetter((coverLetter) => {
        let tempCoverLetter = { ...coverLetter };
        tempCoverLetter.link = fileURL;
        return tempCoverLetter;
      });
    }
  };

  // Live version of documents component
  if (!isEditable) {
    if (!resume && !coverLetter) return;

    //****CardStack has to output first the resume , then the coverletter*****
    return (
      <div className="mb-10">
        <h2 className="mb-2 text-2xl font-extrabold">{t('docs')}</h2>
        <div className="flex gap-2">
          {resume && <FileButton link={resume.link}>{resume.name}</FileButton>}
          {coverLetter && (
            <FileButton link={coverLetter.link}>{coverLetter.name}</FileButton>
          )}
        </div>
      </div>
    );
  }

  // Editable version of documents component
  return (
    <div className="mb-3">
      <h2 className="mb-1 text-2xl font-extrabold">{t('your-docs')}</h2>

      {/* Resume */}
      {resume ? (
        <form
          action=""
          className="mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!resume.link) {
              alert(t('alert-must-upload-resume'));
              return;
            }
            setResumeEditing((curr) => !curr);
          }}
        >
          {resumeEditing ? (
            <div className="mr-2 mb-3 w-full max-w-xs">
              <label>
                {t('resume')} <span className="text-yellow-600">*</span>
              </label>
              <div>
                <InputField
                  data-testid="change-resume-name"
                  placeholder={t('resume-placeholder')}
                  defaultValue={resume.name}
                  onChange={(e) =>
                    setResume((res) => {
                      let tempRes = { ...res };
                      tempRes.name = e.target.value;
                      return tempRes;
                    })
                  }
                />

                <Button
                  data-testid="upload-resume-btn"
                  onClick={handleResumeUploadClick}
                  type="button"
                >
                  {t('upload-resume')}
                  {!resume.link && <FaCloudUploadAlt size={25} />}
                  {resume.link && (
                    <FaCheck data-testid="resume-check"> </FaCheck>
                  )}
                </Button>

                <input
                  type="file"
                  data-testid="input-resume"
                  ref={resumeInputRef}
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e, 'resume')}
                />
                <p data-testid="uploaded-res-link"></p>
              </div>
            </div>
          ) : (
            <div data-testid="editable-resume">
              <FileButton link={resume.link}>{resume.name}</FileButton>
            </div>
          )}
          <div className="flex items-center">
            {/* Edit resume button */}
            {resumeEditing ? (
              <Button
                className="mr-2"
                type="submit"
                data-testid="resume-save-btn"
              >
                {t('save-resume')}
              </Button>
            ) : (
              <EditButton
                data-testid="resume-edit-button"
                onClick={(e) => {
                  e.preventDefault();
                  setResumeEditing((curr) => !curr);
                }}
              />
            )}
            {/* Delete resume */}
            <DeleteButton
              data-testid="delete-resume-btn"
              onClick={(e) => {
                e.preventDefault();
                setResume(null);
                setResumeEditing((curr) => !curr);
              }}
            />
          </div>
        </form>
      ) : (
        <Button
          data-testid="doc-add-resume-button"
          className="mr-2 mb-2 inline"
          type="button"
          onClick={() => {
            // Add new resume
            setResume({
              name: t('resume'),
              link: '',
              isPrivate: false,
            });
            setResumeEditing(true);
          }}
        >
          {t('add-resume')}
        </Button>
      )}

      {/* Cover letter */}

      {coverLetter ? (
        <form
          data-testid="submit-cover-letter"
          action=""
          className="mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            if (!coverLetter.link) {
              alert(t('alert-must-upload-cover-letter'));
              return;
            }
            setCoverLetterEditing((curr) => !curr);
          }}
        >
          {coverLetterEditing ? (
            <div>
              <label>
                {t('cover-letter')} <span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid="change-cover-name"
                placeholder={t('cover-letter-placeholder')}
                defaultValue={coverLetter.name}
                onChange={(e) =>
                  setCoverLetter((res) => {
                    let tempRes = { ...res };
                    tempRes.name = e.target.value;
                    return tempRes;
                  })
                }
              />
              <Button
                data-testid="upload-coverletter-btn"
                onClick={handleCoverLetterUploadClick}
                type="button"
              >
                {t('upload-cover-letter')}
                {!coverLetter.link && <FaCloudUploadAlt size={25} />}
                {coverLetter.link && (
                  <FaCheck data-testid="coverletter-check"> </FaCheck>
                )}
              </Button>

              <input
                type="file"
                data-testid="input-coverletter"
                ref={coverLetterInputRef}
                style={{ display: 'none' }}
                onChange={(e) => handleFileUpload(e, 'coverLetter')}
              />
              <p data-testid="uploaded-cov-link">{}</p>
            </div>
          ) : (
            <div data-testid="editable-cover-letter">
              <FileButton link={coverLetter.link}>
                {coverLetter.name}
              </FileButton>
            </div>
          )}
          <div className="flex items-center">
            {/* Edit cover letter button */}
            {coverLetterEditing ? (
              <Button
                className="mr-2"
                type="submit"
                data-testid="cover-letter-save-btn"
              >
                {t('save-cover-letter')}
              </Button>
            ) : (
              <EditButton
                data-testid="cover-letter-edit-button"
                onClick={(e) => {
                  e.preventDefault();
                  setCoverLetterEditing((curr) => !curr);
                }}
              />
            )}
            {/* Delete cover letter */}
            <DeleteButton
              data-testid="delete-cover-letter-btn"
              onClick={(e) => {
                e.preventDefault();
                setCoverLetter(null);
                setCoverLetterEditing((curr) => !curr);
              }}
            />
          </div>
        </form>
      ) : (
        <Button
          data-testid="doc-add-cover-letter-button"
          className="inline"
          type="button"
          onClick={() => {
            // Add cover letter
            setCoverLetter({
              name: t('cover-letter'),
              link: '',
              isPrivate: false,
            });
            setCoverLetterEditing(true);
          }}
        >
          {t('add-cover-letter')}
        </Button>
      )}
    </div>
  );
}
