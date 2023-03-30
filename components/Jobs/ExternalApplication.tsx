import EditButton from '@/components/Buttons/EditButton/EditButton';
import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import InputField from '@/components/InputFields/Input/Input';
import { JobPosting } from '@/types/JobPost';
import Link from 'next/link';

export default function ExternalApplication({
  externalApplications,
  isEditable = false,
  applicationEditing,
  setApplicationEditing,
  setApplication,
}: {
  externalApplications: JobPosting['externalApplications'];
  isEditable?: boolean;
  applicationEditing?: boolean[];
  setApplicationEditing?: Dispatch<SetStateAction<boolean[]>>;
  setApplication?: Dispatch<SetStateAction<JobPosting['externalApplications']>>;
}) {
  // Live version of externalApplications component
  if (!isEditable) {
    if (!externalApplications || !externalApplications[0]) return;

    return (
      <div className="mb-7">
        <h2 className="mb-2 text-2xl font-extrabold">
          External Applications 🔗
        </h2>
        <ul className="inline-flex flex-wrap">
          {externalApplications.map((externalApp, index) => (
            <Link key={index} href={externalApp.url}>
              <p
                data-testid={`live-job-${index}`}
                key={index}
                className="mb-3 mt-1 mr-3 flex max-w-fit flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-3 text-lg font-semibold"
              >
                {externalApp.name}
              </p>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
  // editable version
  return (
    <div className="mb-3">
      <h2 className="text-2xl font-extrabold">External Applications 🔗</h2>
      {externalApplications.map((externalApp, index) => (
        <form
          action=""
          data-testid="externalApplications-form"
          key={index}
          className="mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setApplicationEditing((curr) =>
              curr.map((externalAppEdit, i) =>
                i === index ? !externalAppEdit : externalAppEdit
              )
            );
          }}
        >
          {applicationEditing && applicationEditing[index] ? (
            <div className="mr-2 mb-3 flex flex-row space-x-3">
              <div>
                <label>
                  Platform <span className="text-yellow-600">*</span>
                </label>
                <InputField
                  data-testid={`job-platform-input-${index}`}
                  type="text"
                  name="platform"
                  id="platformJob"
                  value={externalApp.name}
                  onChange={(e) =>
                    setApplication((s) => {
                      let tempArr = [...s];
                      tempArr[index].name = e.target.value;
                      return tempArr;
                    })
                  }
                  required
                />
              </div>
              <div className="">
                {/* If someone could figure out how to make this input field take up the rest of the space that would be great lol */}
                <label>
                  Job URL <span className="text-yellow-600">*</span>
                </label>
                <InputField
                  data-testid={`job-url-input-${index}`}
                  type="text"
                  name="url"
                  id="urlJob"
                  value={externalApp.url}
                  onChange={(e) =>
                    setApplication((s) => {
                      let tempArr = [...s];
                      tempArr[index].url = e.target.value;
                      return tempArr;
                    })
                  }
                  required
                />
              </div>
            </div>
          ) : (
            <p className="self-center text-xl" key={index}>
              {externalApp.name}
            </p>
          )}
          {isEditable && (
            <div className="flex items-center justify-self-end">
              {/* External edit job button */}
              {applicationEditing && applicationEditing[index] ? (
                <Button
                  data-testid={`job-save-${index}`}
                  className="mr-2"
                  type="submit"
                >
                  Save External Posting
                </Button>
              ) : (
                <EditButton
                  data-testid={`job-edit-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setApplicationEditing((skeditds) =>
                      skeditds.map((job, i) => (i === index ? !job : job))
                    );
                  }}
                />
              )}
              {/* External delete job button */}
              <DeleteButton
                data-testid={`job-delete-button-${index}`}
                onClick={(e) => {
                  e.preventDefault();
                  setApplication((s) => s.filter((_, i) => index !== i));

                  setApplicationEditing((skeditds) =>
                    skeditds.filter((_, i) => index !== i)
                  );
                }}
              />
            </div>
          )}
        </form>
      ))}
      {/* Adding new externalApplications, appears after all job list */}
      {isEditable && (
        <Button
          className="inline"
          data-testid="job-add-button"
          onClick={() => {
            // Append new empty job to current array of externalApplications
            setApplication((s) => [...s, { name: '', url: '' }]);

            setApplicationEditing((skeditds) => [...skeditds, true]);
          }}
        >
          Add New External Application
        </Button>
      )}
    </div>
  );
}
