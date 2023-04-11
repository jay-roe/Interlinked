import { useTranslations } from 'next-intl';
import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { FiSearch } from 'react-icons/fi';

const JobSearchBar = ({
  setSearchKey,
  searchKey,
}: {
  setSearchKey: Dispatch<SetStateAction<string>>;
  searchKey: string;
}) => {
  const t = useTranslations('Jobs.Search');
  const handleChange = (e) => {
    setSearchKey(e.target.value);
  };

  return (
    // search input box
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <FiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        id="search"
        data-testid="job-search-bar"
        name="search"
        className="block w-full rounded-md  bg-gray-800 py-2 pl-10 pr-3 leading-6 text-white placeholder-gray-400 focus:placeholder-gray-500 focus:outline-none  "
        placeholder={t('search')}
        type="search"
        value={searchKey}
        onChange={handleChange}
      />
    </div>
  );
};

export default JobSearchBar;
