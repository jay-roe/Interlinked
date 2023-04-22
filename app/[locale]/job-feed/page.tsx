'use client';

import Link from '@/components/Link/Link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/Buttons/Button';
import { JobPostingWithId } from '@/types/JobPost';
import FullJobCard from '@/components/Jobs/FullJobCard';
import { collection, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';
import { checkIfJobIsInFilter } from '@/components/Jobs/CheckIfJobIsInFilter';
import CheckBox from '@/components/InputFields/CheckBox/CheckBox';
import JobSearchBar from '@/components/Jobs/JobSearch';
import LoadingScreen from '@/components/Loading/Loading';
import { useLocale, useTranslations } from 'next-intl';

export default function Feeds() {
  const t = useTranslations('JobsFeed');
  const searchParams = useSearchParams();
  const router = useRouter();
  const locale = useLocale();
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
    searchParams.get('keyword') ? searchParams.get('keyword') : ''
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
          ),
          orderBy('datePosted', 'desc')
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
    // TODO make a better loading page
    return <div>{t('loading')}</div>;
  }
  // User not logged in, redirect to account required
  if (!currentUser) {
    router.push('/' + locale + '/account-required');
    return <div> </div>;
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
      {loading && <LoadingScreen />}
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
