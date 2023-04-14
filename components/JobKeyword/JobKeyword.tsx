import { db } from '@/config/firestore';
import type { JobKeyword } from '@/types/JobKeyword';
import { query, setDoc } from '@firebase/firestore';
import {
  doc,
  endAt,
  getDocs,
  limit,
  orderBy,
  startAt,
  where,
} from 'firebase/firestore';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Button from '../Buttons/Button';
import DeleteButton from '../Buttons/DeleteButton/DeleteButton';
import Input from '../InputFields/Input/Input';

export default function JobKeywordSearch({
  jobKeywords,
  addKeyword,
  removeKeyword,
  canCreateKeywords,
}: {
  jobKeywords: JobKeyword[];
  addKeyword: (keyword: JobKeyword) => void;
  removeKeyword: (keywordId: string) => void;
  canCreateKeywords?: boolean;
}) {
  const t = useTranslations('Jobs.Keywords');
  const [searchTerm, setSearchTerm] = useState(''); // search input
  const [searchResults, setSearchResults] = useState<JobKeyword[]>([]); // search results
  const [showResults, setShowResults] = useState(false); // show search results
  const [selectedKeywords, setSelectedKeywords] = useState<JobKeyword[]>(
    jobKeywords || []
  );

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Add keyword to local state, then trigger `addKeyword` from props
   * @param keyword JobKeyword to add to
   */
  const addKeywordLocal = (keyword: JobKeyword) => {
    setSelectedKeywords((currentKeywords) => [...currentKeywords, keyword]);
    addKeyword(keyword);
  };

  /**
   * Remove keyword form local state, then trigger `removeKeyword` from props
   * @param keywordId JobKeyword document id to remove
   */
  const removeKeywordLocal = (keywordId: string) => {
    setSelectedKeywords((s) => s.filter((keyword) => keyword.id !== keywordId));
    removeKeyword(keywordId);
  };

  /**
   * Create new keyword in jobkeywords collection of database
   * @param keyword New JobKeyword for database
   */
  const createKeyword = (keyword: string) => {
    const newKeywordRef = doc(db.jobKeywords);
    const newJobKeyword = {
      id: newKeywordRef.id,
      keyword,
      subscribers: [],
    };
    setDoc(newKeywordRef, newJobKeyword).then(() => {
      addKeywordLocal(newJobKeyword);
    });
  };

  useEffect(() => {
    // setSearchResults([]);

    const searchTermLowerCase = searchTerm.toLowerCase();

    // Search for job keyword
    const vals = query(
      // typeCollection<JobKeyword>(collection(firestore, 'jobkeywords')),
      db.jobKeywords,
      where('keyword', '>=', searchTermLowerCase),
      orderBy('keyword'),
      limit(10),
      startAt(searchTermLowerCase),
      endAt(searchTermLowerCase + '\uf8ff')
    );

    // if the search term is not empty, get the results and the user's profile id
    if (searchTerm.length > 0) {
      getDocs(vals).then((docs) => {
        // Add user id to each doc, then set it as search result object
        setSearchResults(
          docs.docs.map(
            (jobKeywordDoc) =>
              ({
                ...jobKeywordDoc.data(),
                id: jobKeywordDoc.id,
              } as JobKeyword)
          )
        );
        setShowResults(true);
      });
    } else {
      setShowResults(false);
    }
  }, [searchTerm]);

  return (
    // search input box
    <div>
      {/* Search bar */}
      <div className="relative mb-3 flex h-16 items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
        {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"> */}
        <div>
          <FiSearch size={20} className="text-gray-400" aria-hidden="true" />
        </div>
        {/* </div> */}
        <Input
          id="search"
          data-testid="job-keywords-input"
          name="job-keywords"
          className="inline w-full rounded-md border-none bg-inherit leading-6 text-white placeholder-gray-400 focus:placeholder-gray-500 focus:outline-none  "
          placeholder={t('search')}
          type="search"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        {canCreateKeywords &&
          searchTerm &&
          !searchResults.some(
            (result) => result.keyword === searchTerm.toLowerCase()
          ) &&
          !selectedKeywords.some(
            (selectedKeyword) =>
              selectedKeyword.keyword === searchTerm.toLowerCase()
          ) && (
            <Button
              className="whitespace-nowrap"
              onClick={() => createKeyword(searchTerm.toLowerCase())}
            >
              Create keyword
            </Button>
          )}
      </div>

      {/* Search results */}
      {showResults && (
        <div className="z-10 mt-1 mb-3 w-full rounded-lg">
          {searchResults
            .filter(
              (keyword) =>
                !selectedKeywords.some(
                  (selectedKey) => selectedKey.keyword === keyword.keyword
                )
            )
            .map((keyword, index) => (
              <button
                type="button"
                key={index}
                onClick={() => addKeywordLocal(keyword)}
                className="mb-1 block w-full rounded-md bg-gray-700 px-4 py-2 text-start text-sm text-white transition-all hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900"
              >
                <p className="">{keyword.keyword}</p>
              </button>
            ))}
        </div>
      )}

      {/* Selected keywords */}
      {selectedKeywords.map((keyword) => (
        <div
          key={keyword.id}
          className="mb-2 flex items-center justify-between rounded-md bg-white bg-opacity-10 p-3"
        >
          <p>{keyword.keyword}</p>
          <DeleteButton
            size={20}
            data-testid={`keyword-delete-button-${keyword.id}`}
            onClick={() => removeKeywordLocal(keyword.id)}
          />
        </div>
      ))}
    </div>
  );
}
