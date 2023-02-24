import EditButton from '@/components/Buttons/EditButton/EditButton';
import type { User } from '@/types/User';
import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import { Timestamp } from 'firebase/firestore';
import InputField from '@/components/InputFields/Input/Input';
import TextArea from '@/components/InputFields/TextArea/TextArea';
import CardStack from '@/components/CardStack/CardStack';
export default function ProfileEducation({
  education,
  isEditable = false,
  educationEditing,
  setEducationEditing,
  setEducation,
}: {
  education: User['education'];
  isEditable?: boolean;
  educationEditing?: boolean[];
  setEducationEditing?: Dispatch<SetStateAction<boolean[]>>;
  addEducation?: Dispatch<SetStateAction<boolean>>;
  setEducation?: Dispatch<SetStateAction<User['education']>>;
  setNewEducation?: (education: User['education']) => void;
}) {
  // Live version of education component
  if (!isEditable) {
    return (
      <CardStack data-testid="education-stack">
        {education.map((ed, index) => (
          <div data-testid={`live-edu-${index}`} key={index}>
            <h3 className="text-xl font-semibold">{ed.program}</h3>
            {ed.image && <img src={ed.image} alt={ed.name} />}
            <h3>{ed.name}</h3>
            <h4>{ed.location}</h4>
            <h6>
              {`${ed.startDate?.toDate().toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })} - `}
              {ed.endDate
                ? `${ed.endDate?.toDate().toLocaleString('default', {
                    month: 'long',
                    year: 'numeric',
                  })}`
                : 'present'}
            </h6>
            <p>{ed.description}</p>
          </div>
        ))}
      </CardStack>
    );
  }

  // Editable version of education component
  return (
    <div className="mb-3" data-testid="editable-edu">
      {education.map((ed, index) => (
        <form
          data-testid="submit-education"
          action=""
          key={index}
          className="mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setEducationEditing((eduedits) =>
              eduedits.map((edu, i) => (i === index ? !edu : edu))
            );
          }}
        >
          {educationEditing && educationEditing[index] ? (
            <div className="mr-2 mb-3">
              <label>
                Program <span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid={`change-edu-program-${index}`}
                type="text"
                name="program"
                id="profileProgram"
                value={ed.program}
                onChange={(e) =>
                  setEducation((edus) => {
                    let tempArr = [...edus];
                    tempArr[index].program = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
              <label>
                School <span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid={`change-edu-school-${index}`}
                name="name"
                id="profileName"
                value={ed.name}
                onChange={(e) =>
                  setEducation((edus) => {
                    let tempArr = [...edus];
                    tempArr[index].name = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
              <label>
                Location <span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid={`change-edu-location-${index}`}
                type="text"
                id="profileLocation"
                name="location"
                value={ed.location}
                onChange={(e) =>
                  setEducation((edus) => {
                    let tempArr = [...edus];
                    tempArr[index].location = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
              <div className="flex flex-wrap gap-2">
                <div className="w-full">
                  <label>
                    Start Date <span className="text-yellow-600">*</span>
                  </label>
                  <InputField
                    type="date"
                    name="startdate"
                    data-testid={`change-edu-startdate-${index}`}
                    value={ed.startDate
                      ?.toDate()
                      .toISOString()
                      .substring(0, 10)}
                    onChange={(e) =>
                      setEducation((edus) => {
                        if (!e.target.valueAsDate) return edus;

                        let tempArr = [...edus];
                        tempArr[index].startDate = Timestamp.fromDate(
                          e.target.valueAsDate
                        );
                        return tempArr;
                      })
                    }
                    max={ed.endDate?.toDate().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="w-full">
                  <label>End Date</label>
                  <InputField
                    type="date"
                    name="enddate"
                    data-testid={`change-edu-enddate-${index}`}
                    value={ed.endDate?.toDate().toISOString().substring(0, 10)}
                    onChange={(e) =>
                      setEducation((edus) => {
                        let tempArr = [...edus];
                        tempArr[index].endDate = Timestamp.fromDate(
                          e.target.valueAsDate
                        );
                        return tempArr;
                      })
                    }
                    min={ed.startDate?.toDate().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <p>Description</p>
              <TextArea
                data-testid={`change-edu-description-${index}`}
                name="info"
                value={ed.description}
                onChange={(e) =>
                  setEducation((edus) => {
                    let tempArr = [...edus];
                    tempArr[index].description = e.target.value;
                    return tempArr;
                  })
                }
              />
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-semibold">{ed.program}</h3>
              {ed.image && <img src={ed.image} alt={ed.name} />}
              <h3>{ed.name}</h3>
              <h4>{ed.location}</h4>
              <h6>
                {`${ed.startDate?.toDate().toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })} - `}
                {ed.endDate
                  ? `${ed.endDate?.toDate().toLocaleString('default', {
                      month: 'long',
                      year: 'numeric',
                    })}`
                  : 'present'}
              </h6>
              <p>{ed.description}</p>
            </div>
          )}
          <div className="flex items-center">
            {/* External edit education button */}
            {educationEditing && educationEditing[index] ? (
              <Button
                className="mr-2"
                type="submit"
                data-testid={`save-education-${index}`}
              >
                Save Education
              </Button>
            ) : (
              <EditButton
                data-testid={`edit-edu-ext-${index}`}
                onClick={(e) => {
                  e.preventDefault();
                  setEducationEditing((eduedits) =>
                    eduedits.map((edu, i) => (i === index ? !edu : edu))
                  );
                }}
              />
            )}
            {/* External delete education button */}
            <DeleteButton
              data-testid={`delete-edu-ext-${index}`}
              onClick={(e) => {
                e.preventDefault();
                setEducation((edus) => edus.filter((_, i) => index !== i));

                setEducationEditing((eduedits) =>
                  eduedits.filter((_, i) => index !== i)
                );
              }}
            />
          </div>
        </form>
      ))}
      {/* Adding new education, appears after all education cards */}
      <Button
        data-testid="add-new-edu"
        className="inline"
        onClick={() => {
          // Append new empty education to current array of educations
          setEducation((edus) => [
            ...edus,
            {
              program: '',
              name: '',
              location: '',
              startDate: Timestamp.now(),
            },
          ]);

          setEducationEditing((eduedits) => [...eduedits, true]);
        }}
      >
        Add New Education
      </Button>
    </div>
  );
}
