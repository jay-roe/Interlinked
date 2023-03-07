import React, { useState, useEffect } from 'react';
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

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState(''); // search input
  const [searchResults, setSearchResults] = useState([]); // search results
  const [showResults, setShowResults] = useState(false); // show search results
  const { handleSearch } = props;

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setSearchResults([]);
    // query for users with names that start with the search term
    const vals = query(
      db.users,
      where('name', '>=', searchTerm),
      orderBy('name'),
      limit(10),
      startAt(searchTerm),
      endAt(searchTerm + '\uf8ff')
    );
    // if the search term is not empty, get the results and the user's profile id
    if (searchTerm.length > 0) {
      getDocs(vals).then((docs) => {
        docs.forEach((doc) => {
          setSearchResults((current) => [
            ...current,
            { ...doc.data(), id: doc.id },
          ]);
        });
        setShowResults(true);
      });
    } else {
      setShowResults(false);
    }
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
        value={searchTerm}
        onChange={handleChange}
      />

      {/* Search results */}
      {showResults && (
        <div className="shadow-l absolute z-10 mt-1 w-full rounded-lg bg-gray-800">
          {searchResults.map((user) => (
            <Link
              key={user.name}
              href={`/profile/${user.id}`}
              onClick={handleSearch}
              className="block px-4 py-2 text-sm text-white"
            >
              <div className="flex items-center space-x-2">
                <span>
                  <ImageOptimized
                    className="h-8 min-h-[2rem] w-2 min-w-[2rem] rounded-full md:h-5 md:w-5"
                    src={user?.profilePicture}
                    alt={user?.profilePicture}
                    width={13}
                    height={13}
                  ></ImageOptimized>
                </span>
                <span>{user.name}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
