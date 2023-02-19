import type { User } from '@/types/User';
import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import InputField from '@/components/InputFields/Input/Input';
export default function ProfileCodingLanguages({
  isEditable = false,
  codingLanguages,
  codingLanguagesHovering,
  newCodingLanguage,
  setCodingLanguages,
  setCodingLanguagesHovering,
  setNewCodingLanguage,
}: {
  isEditable?: boolean;
  codingLanguages: User['codingLanguages'];
  codingLanguagesHovering?: boolean[];
  newCodingLanguage?: string;
  addCodingLanguages?: Dispatch<SetStateAction<boolean>>;
  setCodingLanguages?: Dispatch<SetStateAction<User['codingLanguages']>>;
  setNewCodingLanguages?: (codingLanguages: User['codingLanguages']) => void;
  setCodingLanguagesHovering?: Dispatch<SetStateAction<boolean[]>>;
  setNewCodingLanguage?: Dispatch<SetStateAction<string>>;
}) {
  // Live version of Coding Languages component
  if (!isEditable) {
    return (
      <ul className="inline-flex">
        {codingLanguages.map((cl, index) => (
          <li
            key={index}
            className="mb-3 mt-1 mr-3 flex max-w-fit flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-1 text-xl font-semibold"
          >
            {cl}
          </li>
        ))}
      </ul>
    );
  }

  // Editable version of Coding languages component
  return (
    <div>
      {codingLanguages.map((cl, index) => (
        <div key={index}>
          <ul className="inline-flex">
            <li>
              <form
                action=""
                className="mb-3 mt-1 mr-3 flex max-w-fit flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-1 text-xl font-semibold"
                onSubmit={(e) => {
                  e.preventDefault();
                  setCodingLanguagesHovering((clsedits) =>
                    clsedits.map((cl, i) => (i === index ? !cl : cl))
                  );
                }}
              >
                {codingLanguagesHovering && codingLanguagesHovering[index] ? (
                  // On hover delete button
                  <div>
                    <div
                      className="relative"
                      onMouseLeave={(e) => {
                        e.preventDefault();
                        setCodingLanguagesHovering((clhover) =>
                          clhover.map((cl, i) => (index === i ? !cl : cl))
                        );
                      }}
                    >
                      <div
                        onMouseOver={(e) => {
                          e.preventDefault();
                          setCodingLanguagesHovering((clhover) =>
                            clhover.map((cl, i) => (index === i ? true : false))
                          );
                        }}
                      >
                        {codingLanguages[index]}
                      </div>
                      <div className="absolute -top-1 -right-8 items-center">
                        <DeleteButton
                          size={18}
                          onClick={(e) => {
                            e.preventDefault();
                            setCodingLanguages((cls) =>
                              cls.filter((_, i) => index !== i)
                            );
                            setCodingLanguagesHovering((cledits) =>
                              cledits.filter((_, i) => index !== i)
                            );
                          }}
                          onMouseOver={(e) => {
                            e.preventDefault();
                            setCodingLanguagesHovering((clhover) =>
                              clhover.map((cl, i) =>
                                index === i ? true : false
                              )
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    onMouseOver={(e) => {
                      e.preventDefault();
                      setCodingLanguagesHovering((clhover) =>
                        clhover.map((cl, i) => (index === i ? true : false))
                      );
                    }}
                    onMouseOut={(e) => {
                      e.preventDefault();
                      setCodingLanguagesHovering((clhover) =>
                        clhover.map((cl, i) => (index === i ? false : false))
                      );
                    }}
                  >
                    {codingLanguages[index]}
                  </div>
                )}
              </form>
            </li>
          </ul>
        </div>
      ))}
      {/* Add new Coding Language, appears after all coding languages */}
      <InputField
        name="newCodingLanguage"
        className="flex max-w-xs"
        id="newCodingLanguage"
        // rows={1}
        value={newCodingLanguage}
        onChange={(e) => setNewCodingLanguage(e.target.value)}
      />
      <Button
        className="inline"
        onClick={() => {
          newCodingLanguage.length > 0 &&
            setCodingLanguages((cls) => [...cls, newCodingLanguage]);
          setNewCodingLanguage('');
          setCodingLanguagesHovering((clhovers) => [...clhovers, false]);
        }}
      >
        Add New Coding Language
      </Button>
    </div>
  );
}
