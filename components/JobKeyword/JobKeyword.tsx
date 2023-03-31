import { db } from '@/config/firestore';
import type { JobKeyword } from '@/types/JobKeyword';
import { query } from '@firebase/firestore';
import {
  endAt,
  getDocs,
  limit,
  orderBy,
  startAt,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import DeleteButton from '../Buttons/DeleteButton/DeleteButton';

export default function JobKeywordSearch({
  jobKeywords,
  addKeyword,
  removeKeyword,
}: {
  jobKeywords: JobKeyword[];
  addKeyword: (keyword: JobKeyword) => void;
  removeKeyword: (keywordId: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState(''); // search input
  const [searchResults, setSearchResults] = useState<JobKeyword[]>([]); // search results
  const [showResults, setShowResults] = useState(false); // show search results
  const [selectedKeywords, setSelectedKeywords] = useState<JobKeyword[]>(
    jobKeywords || []
  );

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addSubscriberKeyword = (keyword: JobKeyword) => {
    setSelectedKeywords((currentKeywords) => [...currentKeywords, keyword]);
    addKeyword(keyword);
  };

  const removeSubscriberKeyword = (keywordId: string) => {
    setSelectedKeywords((s) => s.filter((keyword) => keyword.id !== keywordId));
    removeKeyword(keywordId);
  };

  useEffect(() => {
    setSearchResults([]);

    const searchTermLowerCase = searchTerm.toLowerCase();

    // Search for job keyword
    const vals = query(
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
      <div className="relative mb-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <FiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id="search"
          data-testid="search-button"
          name="search"
          className="block w-full rounded-md  bg-gray-800 py-2 pl-10 pr-3 leading-6 text-white placeholder-gray-400 focus:placeholder-gray-500 focus:outline-none  "
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
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
                onClick={() => addSubscriberKeyword(keyword)}
                className="mb-1 block w-full rounded-md bg-gray-800 px-4 py-2 text-start text-sm text-white"
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
            onClick={() => removeSubscriberKeyword(keyword.id)}
          />
        </div>
      ))}
    </div>
  );
}
