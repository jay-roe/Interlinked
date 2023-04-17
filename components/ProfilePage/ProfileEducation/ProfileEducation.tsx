import EditButton from '@/components/Buttons/EditButton/EditButton';
import type { User } from '@/types/User';
import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import { Timestamp } from 'firebase/firestore';
import InputField from '@/components/InputFields/Input/Input';
import TextArea from '@/components/InputFields/TextArea/TextArea';
import CardStack from '@/components/CardStack/CardStack';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('Profile.Education');

  // Live version of education component
  if (!isEditable) {
    if (!education || !education[0]) return;

    return (
      <div className="mb-10">
        <h2 className="text-2xl font-extrabold">{t('education')} 🏫</h2>
        <CardStack data-testid="education-stack">
          {education.map((ed, index) => (
            <div data-testid={`live-edu-${index}`} key={index}>
              <h3 className="text-2xl font-semibold">{ed.program}</h3>
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
      </div>
    );
  }

  // Editable version of education component
  return (
    <div className="mb-3" data-testid="editable-edu">
      <h2 className="text-2xl font-extrabold">{t('education')} 🏫 </h2>
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
                {t('program')} <span className="text-yellow-600">*</span>
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
                {t('school')} <span className="text-yellow-600">*</span>
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
                {t('location')} <span className="text-yellow-600">*</span>
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
                    {t('start-date')} <span className="text-yellow-600">*</span>
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
                  <label>{t('end-date')}</label>
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
              <p>{t('description')}</p>
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
                {t('save')}
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
        {t('add-new')}
      </Button>
    </div>
  );
}
