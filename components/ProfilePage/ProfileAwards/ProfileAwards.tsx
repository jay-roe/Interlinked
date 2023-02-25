import EditButton from '@/components/Buttons/EditButton/EditButton';
import type { User } from '@/types/User';
import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import { Timestamp } from 'firebase/firestore';
import InputField from '@/components/InputFields/Input/Input';
import TextArea from '@/components/InputFields/TextArea/TextArea';
import CardStack from '@/components/CardStack/CardStack';
export default function ProfileAwards({
  awards,
  isEditable = false,
  awardsEditing,
  setAwardsEditing,
  setAwards,
}: {
  awards: User['awards'];
  isEditable?: boolean;
  awardsEditing?: boolean[];
  setAwardsEditing?: Dispatch<SetStateAction<boolean[]>>;
  setAwards?: Dispatch<SetStateAction<User['awards']>>;
}) {
  // Live version of awards component
  if (!isEditable) {
    return (
      <CardStack height={12}>
        {awards.map((award, index) => (
          <div key={index} data-testid="live-awards">
            <h3 className="text-xl font-semibold">{award.title}</h3>
            <h6>
              {`${award.date.toDate().toLocaleString('default', {
                month: 'long',
                year: 'numeric',
              })}`}
            </h6>
            <p>{award.description}</p>
          </div>
        ))}
      </CardStack>
    );
  }

  // Editable version of awards component
  return (
    <div>
      {awards.map((award, index) => (
        <form
          action=""
          key={index}
          className="mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setAwardsEditing((awdedits) =>
              awdedits.map((awd, i) => (i === index ? !awd : awd))
            );
          }}
        >
          {awardsEditing && awardsEditing[index] ? (
            <div className="mr-2 mb-3 w-full max-w-xs">
              <label>
                Award Title<span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid="awards-title-box"
                type="text"
                name="title"
                id="awardTitle"
                value={award.title}
                onChange={(e) =>
                  setAwards((awds) => {
                    let tempArr = [...awds];
                    tempArr[index].title = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
              <label>
                Date <span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid="awards-date-box"
                type="date"
                name="date"
                value={award.date?.toDate().toISOString().substring(0, 10)}
                onChange={(e) =>
                  setAwards((awds) => {
                    if (!e.target.valueAsDate) return awds;
                    let tempArr = [...awds];
                    tempArr[index].date = Timestamp.fromDate(
                      e.target.valueAsDate
                    );
                    return tempArr;
                  })
                }
                required
              />
              <p>Description</p>
              <TextArea
                data-testid="awards-desc-box"
                name="info"
                value={award.description}
                onChange={(e) =>
                  setAwards((awds) => {
                    let tempArr = [...awds];
                    tempArr[index].description = e.target.value;
                    return tempArr;
                  })
                }
              />
            </div>
          ) : (
            <div key={index} data-testid="editable-awards">
              <h3>{award.title}</h3>
              <h6>
                {`${award.date.toDate().toLocaleString('default', {
                  month: 'long',
                  year: 'numeric',
                })}`}
              </h6>
              <p>{award.description}</p>
            </div>
          )}
          <div className="flex items-center">
            {/* External edit award button */}
            {awardsEditing && awardsEditing[index] ? (
              <Button
                className="mr-2"
                type="submit"
                data-testid="awards-save-button"
              >
                Save Award
              </Button>
            ) : (
              <EditButton
                data-testid="awards-edit-button"
                onClick={(e) => {
                  e.preventDefault();
                  setAwardsEditing((awdsedits) =>
                    awdsedits.map((awd, i) => (i === index ? !awd : awd))
                  );
                }}
              />
            )}
            {/* External delete award button */}
            <DeleteButton
              data-testid="awards-delete-button"
              onClick={(e) => {
                e.preventDefault();
                setAwards((awds) => awds.filter((_, i) => index !== i));
                setAwardsEditing((awdedits) =>
                  awdedits.filter((_, i) => index !== i)
                );
              }}
            />
          </div>
        </form>
      ))}
      {/* Adding new award, appears after all award cards */}
      <Button
        data-testid="awards-add-button"
        className="inline"
        onClick={() => {
          // Append new empty award to current array of awards
          setAwards((awds) => [
            ...awds,
            {
              title: '',
              date: Timestamp.now(),
            },
          ]);
          setAwardsEditing((awds) => [...awds, true]);
        }}
      >
        Add New Award
      </Button>
    </div>
  );
}
