import type { User } from '@/types/User';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import { Dispatch, SetStateAction, useState } from 'react';
import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import InputField from '@/components/InputFields/Input/Input';
import CardStack from '@/components/CardStack/CardStack';
import TextArea from '@/components/InputFields/TextArea/TextArea';
import Link from 'next/link';
import UploadMediaButton from '@/components/Buttons/UploadMediaButton/UploadMediaButton';
import { FaCloudUploadAlt } from 'react-icons/fa';
import React from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/config/firebase';

export default function ProfileDocuments({
  isEditable = false,
  documents,
  setDocuments,
  documentsEditing,
  setDocumentsEditing,
  uid,
}: {
  isEditable?: boolean;
  documents: User['documents'];
  documentsEditing?: boolean[];
  setDocumentsEditing?: Dispatch<SetStateAction<boolean[]>>;
  setDocuments?: Dispatch<SetStateAction<User['documents']>>;
  uid: string;
}) {
  // uploading a file from button

  const [resume, setResume] = useState<File>();

  const hiddenFileInput = React.useRef(null);
  const hiddenFileInput2 = React.useRef(null);
  const handleUploadClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
  };

  const handleResumeUpload = async (resumeIndex: number) => {
    //const links = Array.from(event.target.files);
    // if (!links || !links[0]) {
    //   return;
    //  }
    const resumeRef = ref(storage, `users/${uid}/resume/${resume.name}`);
    await uploadBytes(resumeRef, resume);
    const resumeURL = await getDownloadURL(resumeRef);

    setDocuments((docs) => {
      let tempArr = [...docs];
      tempArr[resumeIndex].resume.link = resumeURL;
      return tempArr;
    });

    // setResume(links[0]);
  };

  // Live version of documents component
  if (!isEditable) {
    if (!documents || !documents[0]) return;

    //****CardStack has to output first the resume , then the coverletter*****
    return (
      <div className="mb-10">
        <h2 className="text-2xl font-extrabold"> Docs </h2>
        <CardStack>
          {documents.map((doc, index) => (
            <div key={index}>
              <p> {doc.resume.link} </p>
              <p> {doc.coverLetter.link} </p>
            </div>
          ))}
        </CardStack>
      </div>
    );
  }

  // Editable version of documents component
  return (
    <div>
      <h2 className="text-2xl font-extrabold"> Your Documents</h2>
      {documents?.map((docs, index) => (
        <form
          action=""
          key={index}
          className="mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setDocumentsEditing((docedits) =>
              docedits.map((doc, i) => (i === index ? !doc : doc))
            );
          }}
        >
          {documentsEditing && documentsEditing[index] ? (
            <div className="mr-2 mb-3 w-full max-w-xs">
              <label>
                Resume <span className="text-yellow-600">*</span>
              </label>
              <div>
                <label htmlFor="resume-upload">
                  <Button>
                    Upload Resume <FaCloudUploadAlt />
                  </Button>
                </label>

                <input
                  id="resume-upload"
                  type="file"
                  ref={hiddenFileInput}
                  style={{ display: 'none' }}
                  value={docs.resume.link}
                  onChange={
                    (e) => handleResumeUpload(index)
                    //  {const links = Array.from(e.target.files);
                    //    if (!links || !links[0]) {
                    //      return;
                    //    }
                    //   setResume(links[0])}
                  }
                  required
                />
              </div>

              <label>
                Cover Letter <span className="text-yellow-600">*</span>
              </label>

              <div>
                <InputField
                  data-testid={`coverletter-link-box-${index}`}
                  type="text"
                  name="coverletter"
                  value={docs.coverLetter.link}
                  readOnly
                />
                <Button>
                  Upload Cover Letter <FaCloudUploadAlt />
                </Button>
              </div>
            </div>
          ) : (
            <div key={index} data-testid="editable-docs">
              <p> resume: {docs.resume.link}</p>
              <h6></h6>
              <p>cover: {docs.coverLetter.link}</p>
            </div>
          )}
          <div className="flex items-center">
            {/* External edit award button */}
            {documentsEditing && documentsEditing[index] ? (
              <Button
                className="mr-2"
                type="submit"
                data-testid={`docs-save-btn-${index}`}
              >
                Save Document
              </Button>
            ) : (
              <EditButton
                data-testid={`awards-edit-btn-${index}`}
                onClick={(e) => {
                  e.preventDefault();
                  setDocumentsEditing((docedits) =>
                    docedits.map((doc, i) => (i === index ? !doc : doc))
                  );
                }}
              />
            )}
            {/* External delete award button */}
            <DeleteButton
              data-testid={`docs-delete-btn-${index}`}
              onClick={(e) => {
                e.preventDefault();
                setDocuments((docs) => docs.filter((_, i) => index !== i));
                setDocumentsEditing((docedits) =>
                  docedits.filter((_, i) => index !== i)
                );
              }}
            />
          </div>
        </form>
      ))}
      {/* Adding new document, appears after all docs cards */}
      <Button
        data-testid="doc-add-button"
        className="inline"
        type="button"
        onClick={() => {
          // Append new empty document to current array of document
          setDocuments((docs) => [
            ...docs,
            {
              resume: {
                link: '',
                isPrivate: false,
              },
              coverLetter: {
                link: '',
                isPrivate: false,
              },
            },
          ]);
          setDocumentsEditing((docs) => [...docs, true]);
        }}
      >
        Add New Document
      </Button>
    </div>
  );
}
