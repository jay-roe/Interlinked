import CardStack from '@/components/CardStack/CardStack';
import type { User } from '@/types/User';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import { Timestamp } from 'firebase/firestore';
import InputField from '@/components/InputFields/Input/Input';
import TextArea from '@/components/InputFields/TextArea/TextArea';

export default function ProfileVolunteering({
  volunteering,
  isEditable = false,
  volunteeringEditing,
  setVolunteeringEditing,
  setVolunteering,
}: {
  volunteering: User['volunteering'];
  isEditable?: boolean;
  volunteeringEditing?: boolean[];
  setVolunteeringEditing?: Dispatch<SetStateAction<boolean[]>>;
  setVolunteering?: Dispatch<SetStateAction<User['volunteering']>>;
}) {
  if (!isEditable) {
    return (
      <CardStack>
        {volunteering?.map((vol, index) => (
          <div key={index} data-testid={`live-vol-${index}`}>
            {vol.image && <img src={vol.image} alt={vol.title} />}
            <h3>{vol.title}</h3>
            <h4>{vol.organization}</h4>
            <h5>{vol.location}</h5>
            <h6>
              {vol.startDate.toDate().toLocaleDateString()}
              {vol.endDate
                ? ' - ' + vol.endDate.toDate().toLocaleDateString()
                : ''}
            </h6>
            <div>{vol.description}</div>
          </div>
        ))}
      </CardStack>
    );
  }
  return (
    <div className="mb-3">
      {volunteering.map((vol, index) => (
        <form
          key={index}
          action=""
          className="mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setVolunteeringEditing((exedits) =>
              exedits.map((ex, i) => (i === index ? !ex : ex))
            );
          }}
        >
          {' '}
          {volunteeringEditing && volunteeringEditing[index] ? (
            <div className="mr-2 mb-3">
              <label>
                Title <span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid={`edit-vol-title-${index}`}
                type="text"
                name="title"
                id="profileVolunteeringTitle"
                value={vol.title}
                onChange={(e) =>
                  setVolunteering((exs) => {
                    let tempArr = [...exs];
                    tempArr[index].title = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
              <label>
                Location <span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid={`edit-vol-location-${index}`}
                name="location"
                id="profileVolunteeringLocation"
                value={vol.location}
                onChange={(e) =>
                  setVolunteering((exs) => {
                    let tempArr = [...exs];
                    tempArr[index].location = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
              <label>
                Organization <span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid={`edit-vol-organization-${index}`}
                type="text"
                id="organization"
                name="organization"
                value={vol.organization}
                onChange={(e) =>
                  setVolunteering((exs) => {
                    let tempArr = [...exs];
                    tempArr[index].organization = e.target.value;
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
                    data-testid={`edit-vol-startDate-${index}`}
                    type="date"
                    name="startdate"
                    value={vol.startDate
                      ?.toDate()
                      .toISOString()
                      .substring(0, 10)}
                    onChange={(e) =>
                      setVolunteering((exs) => {
                        if (!e.target.valueAsDate) return exs;

                        let tempArr = [...exs];
                        tempArr[index].startDate = Timestamp.fromDate(
                          e.target.valueAsDate
                        );
                        return tempArr;
                      })
                    }
                    max={vol.endDate?.toDate().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="w-full">
                  <label>End Date</label>
                  <InputField
                    data-testid={`edit-vol-endDate-${index}`}
                    type="date"
                    name="enddate"
                    value={vol.endDate?.toDate().toISOString().substring(0, 10)}
                    onChange={(e) =>
                      setVolunteering((exs) => {
                        if (!e.target.valueAsDate) return exs;

                        let tempArr = [...exs];
                        tempArr[index].endDate = Timestamp.fromDate(
                          e.target.valueAsDate
                        );
                        return tempArr;
                      })
                    }
                    min={vol.startDate?.toDate().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <p>Description</p>
              <TextArea
                data-testid={`edit-vol-description-${index}`}
                name="info"
                value={vol.description}
                onChange={(e) =>
                  setVolunteering((exs) => {
                    let tempArr = [...exs];
                    tempArr[index].description = e.target.value;
                    return tempArr;
                  })
                }
              />
            </div>
          ) : (
            <div data-testid="editable-vol">
              {vol.image && <img src={vol.image} alt={vol.title} />}
              <h3>{vol.title}</h3>
              <h4>{vol.organization}</h4>
              <h5>{vol.location}</h5>
              <h6>
                {`${vol.startDate?.toDate().toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })} - `}
                {vol.endDate
                  ? `${vol.endDate?.toDate().toLocaleString('default', {
                      month: 'long',
                      year: 'numeric',
                    })}`
                  : 'present'}
              </h6>
              <div>{vol.description}</div>
            </div>
          )}
          {isEditable && (
            <div className="flex items-center">
              {/* External edit education button */}
              {volunteeringEditing && volunteeringEditing[index] ? (
                <Button
                  className="mr-2"
                  type="submit"
                  data-testid={`vol-save-btn-${index}`}
                >
                  Save Volunteering Experience
                </Button>
              ) : (
                <EditButton
                  data-testid={`vol-edit-btn-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setVolunteeringEditing((exedits) =>
                      exedits.map((ex, i) => (i === index ? !ex : ex))
                    );
                  }}
                />
              )}
              {/* External delete education button */}
              <DeleteButton
                data-testid={`vol-delete-btn-${index}`}
                onClick={(e) => {
                  e.preventDefault();
                  setVolunteering((exs) => exs.filter((_, i) => index !== i));

                  setVolunteeringEditing((exedits) =>
                    exedits.filter((_, i) => index !== i)
                  );
                }}
              />
            </div>
          )}
        </form>
      ))}
      {isEditable && (
        <Button
          data-testid="vol-add-button"
          className="inline"
          onClick={() => {
            // Append new empty education to current array of educations
            setVolunteering((vols) => [
              ...vols,
              {
                title: '',
                location: '',
                organization: '',
                startDate: Timestamp.now(),
                description: '',
              },
            ]);

            setVolunteeringEditing((voledits) => [...voledits, true]);
          }}
        >
          Add New Volunteering Experience
        </Button>
      )}
    </div>
  );
}
