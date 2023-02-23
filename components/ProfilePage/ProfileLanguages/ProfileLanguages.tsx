import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import CardStack from '@/components/CardStack/CardStack';
import Input from '@/components/InputFields/Input/Input';
import type { User } from '@/types/User';
import { Dispatch, SetStateAction } from 'react';
import InputField from '@/components/InputFields/Input/Input';
import type { Language } from '@/types/User';

export default function ProfileLanguages({
  isEditable = false,
  languages,
  languagesHovering,
  newLanguage,
  setLanguages,
  setLanguagesHovering,
  setNewLanguage,
}: {
  isEditable?: boolean;
  languages: User['languages'];
  languagesHovering?: boolean[];
  newLanguage?: Language;
  addLanguages?: Dispatch<SetStateAction<boolean>>;
  setLanguages?: Dispatch<SetStateAction<User['languages']>>;
  setNewLanguages?: (Languages: User['languages']) => void;
  setLanguagesHovering?: Dispatch<SetStateAction<boolean[]>>;
  setNewLanguage?: Dispatch<SetStateAction<Language>>;
}) {
  // every language string ends with a number from 1-5 that represents proficiency
  if (!isEditable) {
    return (
      <ul className="inline-flex" data-testid="live-lang-profile">
        {languages.map((lang, index) => (
          <li
            key={index}
            className="mb-3 mt-1 mr-3 flex max-w-fit flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-3 text-xl font-semibold"
          >
            {languages[index].title}
            {languages[index].proficiency &&
              ' (' + languages[index].proficiency + ')'}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      {languages.map((lang, index) => (
        <div key={index}>
          <ul className="inline-flex">
            <li>
              <form
                data-testid="editable-lang-form"
                action=""
                className="mb-3 mt-1 mr-3 flex max-w-fit flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-3 text-xl font-semibold"
                onSubmit={(e) => {
                  e.preventDefault();
                  setLanguagesHovering((langedits) =>
                    langedits.map((lang, i) => (i === index ? !lang : lang))
                  );
                }}
              >
                {languagesHovering && languagesHovering[index] ? (
                  // On hover, reveal delete button and proficiency options
                  <div>
                    <div
                      data-testid="lang-hovering-parent"
                      className="relative"
                      onMouseLeave={(e) => {
                        e.preventDefault();
                        setLanguagesHovering((langhover) =>
                          langhover.map((lang, i) =>
                            index === i ? !lang : lang
                          )
                        );
                      }}
                    >
                      <div
                        data-testid="lang-hovering-lang-name"
                        onMouseOver={(e) => {
                          e.preventDefault();
                          setLanguagesHovering((langhover) =>
                            langhover.map((lang, i) =>
                              index === i ? true : false
                            )
                          );
                        }}
                      >
                        {languages[index].title}
                        {languages[index].proficiency &&
                          ' (' + languages[index].proficiency + ')'}
                      </div>
                      <div className="absolute -top-1 -right-10 items-center">
                        <DeleteButton
                          data-testid="lang-hovering-delete"
                          size={18}
                          onClick={(e) => {
                            e.preventDefault();
                            setLanguages((langs) =>
                              langs.filter((_, i) => index !== i)
                            );
                            setLanguagesHovering((langedits) =>
                              langedits.filter((_, i) => index !== i)
                            );
                          }}
                          onMouseOver={(e) => {
                            e.preventDefault();
                            setLanguagesHovering((langhover) =>
                              langhover.map((lang, i) =>
                                index === i ? true : false
                              )
                            );
                          }}
                        />
                        <select
                          onMouseOver={(e) => {
                            e.preventDefault();
                            setLanguagesHovering((langhover) =>
                              langhover.map((lang, i) =>
                                index === i ? true : false
                              )
                            );
                          }}
                          onChange={(e) =>
                            setLanguages((langs) => {
                              let tempArr = [...langs];
                              tempArr[index].proficiency = e.target.value;
                              return tempArr;
                            })
                          }
                          className="m-2 inline-block min-h-[30px] appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                        >
                          <option value="1">Elementary</option>
                          <option value="2">Limited working</option>
                          <option value="3">Professional working</option>
                          <option value="4">Full professional</option>
                          <option value="5">Native</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    data-testid="lang-not-hovering"
                    onMouseOver={(e) => {
                      e.preventDefault();
                      setLanguagesHovering((langhover) =>
                        langhover.map((lang, i) => (index === i ? true : false))
                      );
                    }}
                  >
                    {languages[index].title}
                    {languages[index].proficiency &&
                      ' (' + languages[index].proficiency + ')'}
                  </div>
                )}
              </form>
            </li>
          </ul>
        </div>
      ))}
      {/* Add new Language, appears after all coding languages */}
      <InputField
        name="newLanguage"
        className="flex max-w-xs"
        id="newLanguage"
        data-testid="new-lang-input"
        value={newLanguage.title}
        onChange={(e) => setNewLanguage({ title: e.target.value })}
      />
      <Button
        className="inline"
        data-testid="new-lang-button"
        onClick={() => {
          newLanguage.title.length > 0 &&
            setLanguages((langs) => [...langs, newLanguage]);
          setNewLanguage({ title: '' });
          setLanguagesHovering((langhovers) => [...langhovers, false]);
        }}
      >
        Add New Language
      </Button>
    </div>
  );
}

{
  /* {isEditable && (
        <EditButton
          className="inline"
          onClick={() => setLanguageEditing((curr) => !curr)}
        />
      )}

      {!languageEditing && isEditable && (
        <ul>
          {languages.map((lang, index) => (
            <li key={index}>
              {lang.slice(0, lang.length - 1)}
              {lang.slice(-1) === '1' && ' - Elementary '}
              {lang.slice(-1) === '2' && ' - Limited working '}
              {lang.slice(-1) === '3' && ' - Professional working '}
              {lang.slice(-1) === '4' && ' - Full professional '}
              {lang.slice(-1) === '5' && ' - Native '}
              proficiency
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center">
        {languageEditing && (
          <>
            <ul>
              {languages.map((lang, index) => (
                <li key={index} className="flex items-center">
                  <Input
                    className=""
                    name="langauge"
                    value={lang.slice(0, lang.length - 1)}
                    onChange={(e) => updateLanguage(e.target.value, index)}
                  />
                  <div>
                    <select
                      onChange={(e) => changeProficiency(e.target.value, index)}
                      value={lang.slice(-1)}
                      className="m-2 inline-block min-h-[30px] appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="1">Elementary</option>
                      <option value="2">Limited working</option>
                      <option value="3">Professional working</option>
                      <option value="4">Full professional</option>
                      <option value="5">Native</option>
                    </select>
                  </div>
                  <div>
                    <DeleteButton onClick={() => deleteLanguage(index)} />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {languageEditing && (
        <div className="mb-5">
          <br />
          <Button onClick={() => addStringToArray()}>Add Language</Button>
        </div>
      )} */
}
