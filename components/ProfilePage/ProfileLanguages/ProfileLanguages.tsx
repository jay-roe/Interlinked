import Button from '@/components/Buttons/Button';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import type { User } from '@/types/User';
import { Dispatch, SetStateAction } from 'react';

export default function ProfileLanguages({
  currentUser,
  languages = [],
  isEditable = false,
  languageEditing = false,
  setLanguageEditing,
  setLanguage,
}: {
  currentUser: User;
  languages: string[];
  isEditable?: boolean,
  languageEditing?: boolean;
  setLanguageEditing?: Dispatch<SetStateAction<boolean>>;
  setLanguage?: Dispatch<SetStateAction<string[]>>;
}) {


  // create a new array with another value
  function addStringToArray(newLang: string)
  {
    setLanguage((language) => [...language, '']);
  }

  function updateLanguage(newLang: string, index)
  {
    const newArray = languages.map((l, i) => {
      if (i === index) {
        return newLang;
      } else {
        return l;
      }
    });
    setLanguage(newArray);
  }

  function deleteLanguage(index: number) 
  {
    const newArray = languages.filter((lang) => languages.indexOf(lang) !== index);
    setLanguage(newArray);
  }


   return (
    <>
    
    {isEditable && (
          <EditButton
            className="inline"
            onClick={() => setLanguageEditing((curr) => !curr)} />
        )}
    
    <ul>
      {languages.map((lang, index) => (
        <li key={index}>{lang}</li>
      ))}
    </ul>
    
    <div className="flex items-center">
        {languageEditing ? (
        <>
        <ul>
          {languages.map((lang, index) => (
            <li key={index}>
              <textarea
              className="mb-2 mt-2 inline-block min-h-[20px] w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              name="langauge"
              rows={1}
              value={lang}
              onChange={(e) => updateLanguage(e.target.value, index)} 
             />
             <Button onClick={() => deleteLanguage(index)}>Delete</Button>
            </li>

          ))}
        </ul>
        <Button onClick={(e) => addStringToArray(e.target.value)}>+</Button>
          </>
        ) : (
          <p>{languages != null || 'I am illiterate.'}</p>
        )}
      </div></>
    
  );
}


// {currentUser.languages.map((lang, index) => (
//   <li key={index}>
//     <textarea
//       className="mb-2 mt-2 block min-h-[75px] w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
//       name="langauge"
//       rows={1}
//       value={lang}
//       //onChange={(e) => makeNewLanguageArray(e.target.value)} 
//     />
//   </li>