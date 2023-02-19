import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import CardStack from '@/components/CardStack/CardStack';
import Input from '@/components/InputFields/Input/Input';
import type { User } from '@/types/User';
import { Dispatch, SetStateAction } from 'react';

export default function ProfileLanguages({
  languages = [],
  isEditable = false,
  languageEditing = false,
  setLanguageEditing,
  setLanguage,
}: {
  languages: string[];
  isEditable?: boolean;
  languageEditing?: boolean;
  setLanguageEditing?: Dispatch<SetStateAction<boolean>>;
  setLanguage?: Dispatch<SetStateAction<string[]>>;
}) {
  // every language string ends with a number from 1-5 that represents proficiency

  // create a new array with another value
  function addStringToArray() {
    setLanguage((language) => [...language, '1']);
  }

  function updateLanguage(newLang: string, index) {
    const proficiency = languages[index].slice(-1);
    const newArray = languages.map((l, i) => {
      if (i === index) {
        return newLang.concat(proficiency);
      } else {
        return l;
      }
    });
    setLanguage(newArray);
  }

  function deleteLanguage(index: number) {
    const newArray = languages.filter(
      (lang) => languages.indexOf(lang) !== index
    );
    setLanguage(newArray);
  }

  function changeProficiency(proficiency, index) {
    const newArray = languages.map((l, i) => {
      if (i === index) {
        return l.slice(0, l.length - 1).concat(proficiency);
      } else {
        return l;
      }
    });
    setLanguage(newArray);
  }

  return (
    <>
      {isEditable && (
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
      )}

      {!isEditable && (
        <div>
          <CardStack top={3.5} height={12}>
            {languages.map((lang, index) => (
              <div key={index}>
                <h3 className="mb-4 text-xl font-semibold">
                  {lang.slice(0, lang.length - 1)}
                </h3>
                <h5>
                  Proficiency:
                  {lang.slice(-1) === '1' && ' Elementary'}
                  {lang.slice(-1) === '2' && ' Limited working'}
                  {lang.slice(-1) === '3' && ' Professional working'}
                  {lang.slice(-1) === '4' && ' Full professional'}
                  {lang.slice(-1) === '5' && ' Native'}
                </h5>
              </div>
            ))}
          </CardStack>
        </div>
      )}
    </>
  );
}
