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

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    setSearchResults([]);
    const vals = query(
      db.users,
      where('name', '>=', searchTerm),
      orderBy('name'),
      limit(10),
      startAt(searchTerm),
      endAt(searchTerm + '\uf8ff')
    );
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
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <FiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      {/* the input box fits the theme of this website using purple tones isntead of white*/}
      <input
        id="search"
        name="search"
        className="block w-full rounded-md  bg-gray-800 py-2 pl-10 pr-3 leading-6 text-white placeholder-gray-400 focus:placeholder-gray-500 focus:outline-none  "
        placeholder="Search"
        type="search"
        value={searchTerm}
        onChange={handleChange}
      />

      {showResults && (
        <div className="shadow-l absolute z-10 mt-1 w-full rounded-lg bg-gray-800">
          {searchResults.map((user) => (
            <Link
              key={user.name}
              href={`/profile/${user.id}`}
              onClick={() => setShowSearch(!showSearch)}
              className="block px-4 py-2 text-sm text-white"
            >
              <div className="flex items-center space-x-2">
                <span>
                  <ImageOptimized
                    className="h-8 min-h-[2rem] w-2 min-w-[2rem] rounded-full md:h-5 md:w-5"
                    src={
                      user?.profilePicture ||
                      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png'
                    }
                    alt={''}
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
