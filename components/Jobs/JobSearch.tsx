import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import {
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from 'firebase/firestore';
import { db } from '@/config/firestore';
import ImageOptimized from '../ImageOptimized/ImageOptimized';
import type { UserWithId } from '@/types/User';
import { JobPostingWithId } from '@/types/JobPost';

const JobSearchBar = ({
  setSearchKey,
  searchKey,
}: {
  setSearchKey: Dispatch<SetStateAction<string>>;
  searchKey: string;
}) => {
  const [searchTerm, setSearchTerm] = useState(''); // search input
  const [searchResults, setSearchResults] = useState<UserWithId[]>([]); // search results
  const [showResults, setShowResults] = useState(false); // show search results

  const handleChange = (e) => {
    setSearchKey(e.target.value);
  };

  useEffect(() => {
    setSearchResults([]);

    const searchTermLowerCase = searchTerm.toLowerCase();
  }, [searchTerm]);

  return (
    // search input box
    <div className="relative">
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
        value={searchKey}
        onChange={handleChange}
      />
    </div>
  );
};

export default JobSearchBar;
