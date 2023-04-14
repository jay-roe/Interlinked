'use client';

import Link from '@/components/Link/Link';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Buttons/Button';
import { JobPostingWithId } from '@/types/JobPost';
import FullJobCard from '@/components/Jobs/FullJobCard';
import { collection, doc, getDocs, query } from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';
import { checkIfJobIsInFilter } from '@/components/Jobs/CheckIfJobIsInFilter';
import CheckBox from '@/components/InputFields/CheckBox/CheckBox';
import JobSearchBar from '@/components/Jobs/JobSearch';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function Feeds(props) {
  const t = useTranslations('JobsFeed');
  const router = useRouter();
  const locale = useLocale();
  const { searchParams } = props;
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [jobs, setJobs] = useState<JobPostingWithId[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPostingWithId[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [displayJobs, setDisplayJobs] = useState<boolean>(false);
  const [fullTime, setFullTime] = useState<boolean>(false);
  const [partTime, setPartTime] = useState<boolean>(false);
  const [internship, setInternship] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>(
    searchParams.searchParam
      ? typeof searchParams.searchParam === 'string'
        ? searchParams.searchParam
        : searchParams.searchParam[0]
      : ''
  );

  // if account is locked or timed out, redirect to locked page
  useEffect(() => {
    if (currentUser?.accountLocked || currentUser?.accountTimeout) {
      router.push('/' + locale + '/locked');
    }
  }, [currentUser, router]);

  useEffect(() => {
    async function getUsers() {
      setCompanies([]);
      setJobs([]);
      const res = await getDocs(db.companies);
      res.forEach((doc) => {
        if (doc.data().isCompany) {
          setCompanies((cur) => [...cur, doc.id]);
        }
      });
    }
    getUsers().then(() => setDisplayJobs(true));
  }, []);

  useEffect(() => {
    companies.forEach((comp) => {
      getDocs(
        query(
          typeCollection<JobPostingWithId>(
            collection(doc(db.companies, comp), 'jobPosts')
          )
        )
      ).then((jobsTemp) => {
        jobsTemp.forEach((job) => {
          setJobs((cur) => [...cur, { ...job.data(), postingId: job.id }]);
        });
      });
    });
    setFilteredJobs(jobs);
  }, [displayJobs]);

  useEffect(() => {
    setFilteredJobs([]);
    jobs
      .filter((job) =>
        checkIfJobIsInFilter({
          fullTime: fullTime,
          partTime: partTime,
          internship: internship,
          job: job,
          searchKey: searchKey,
        })
      )
      .forEach((job) => {
        setFilteredJobs((cur) => [...cur, job]);
      });
    setLoading(false);
  }, [partTime, fullTime, internship, searchKey, jobs]);

  if (loading) {
    return <div>{t('loading')}</div>;
  }

  if (!currentUser || loading) {
    // user isnt logged in or the page is still loading
    // TODO make a better loading page
    return (
      <div>
        <p data-testid="base-msg" className="mb-3 text-left text-2xl">
          {t('should-login')}
        </p>
        <div className="flex space-x-1.5">
          <Link href="/login">
            <Button>{t('sign-in')}</Button>
          </Link>
          <Link href="/register">
            <Button>{t('register')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* <CreatePostGroup /> */}
      <p data-testid="welcome-msg" className="mb-3 text-left text-2xl">
        {t('find')}
      </p>
      <div className="my-4 flex flex-col items-center align-middle text-xl sm:flex-row sm:space-x-4">
        <JobSearchBar setSearchKey={setSearchKey} searchKey={searchKey} />
        <CheckBox
          name="FullTime"
          checked={fullTime}
          onChange={() => {
            setFullTime((curr) => !curr);
          }}
          label={t('full-time')}
        />
        <CheckBox
          name="PartTime"
          checked={partTime}
          onChange={() => {
            setPartTime((curr) => !curr);
          }}
          label={t('part-time')}
        />
        <CheckBox
          name="Internship"
          checked={internship}
          onChange={() => {
            setInternship((curr) => !curr);
          }}
          label={t('internship')}
        />
      </div>
      {/*if there is a filter, display jobs*/}
      {filteredJobs?.map((jb, index) => {
        return (
          <FullJobCard
            key={index}
            job={jb}
            setJob={setJobs}
            postingId={jb.postingId}
          />
        );
      })}
    </div>
  );
}
