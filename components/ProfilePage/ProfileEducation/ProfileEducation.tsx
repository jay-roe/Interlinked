import EditButton from '@/components/Buttons/EditButton/EditButton';
import type { User } from '@/types/User';
import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import { Timestamp } from 'firebase/firestore';
import InputField from '@/components/InputFields/Input/Input';
import TextArea from '@/components/InputFields/TextArea/TextArea';
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
  return (
    <div>
      {education.map((ed, index) => (
        <form
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
          {isEditable && (
            <div className="flex items-center">
              {/* External edit education button */}
              {educationEditing && educationEditing[index] ? (
                <Button className="mr-2" type="submit">
                  Save Education
                </Button>
              ) : (
                <EditButton
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
                onClick={(e) => {
                  e.preventDefault();
                  setEducation((edus) => edus.filter((_, i) => index !== i));

                  setEducationEditing((eduedits) =>
                    eduedits.filter((_, i) => index !== i)
                  );
                }}
              />
            </div>
          )}
        </form>
      ))}
      {/* Adding new education, appears after all education cards */}
      {isEditable && (
        <Button
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
      )}
    </div>
  );
}
