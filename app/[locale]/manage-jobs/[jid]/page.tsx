'use client';

import Button from '@/components/Buttons/Button';
import Card from '@/components/Card/Card';
import ImageOptimized from '@/components/ImageOptimized/ImageOptimized';
import { typeCollection, db } from '@/config/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { JobPosting } from '@/types/JobPost';
import { collection, getDoc, doc } from 'firebase/firestore';
import Link from '@/components/Link/Link';

import { useEffect, useState } from 'react';
import { GrDocumentDownload } from 'react-icons/gr';
import { useTranslations } from 'next-intl';

export default function JobDetails({ params }) {
  const t = useTranslations('ManageJobs.jid');
  const jobId = params.jid;
  const { currentUser, authUser } = useAuth();
  const [job, setJob] = useState<JobPosting>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobPosting = async () => {
      const jobRef = await getDoc(
        doc(
          typeCollection<JobPosting>(
            collection(doc(db.companies, authUser.uid), 'jobPosts')
          ),
          jobId
        )
      );
      return jobRef.data();
    };
    fetchJobPosting().then((job) => {
      setJob(job);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>{t('loading')}</p>;

  if (!currentUser && authUser.uid !== job.companyId) {
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

  if (!job) {
    return (
      <p data-testid="no-apps-msg" className="mb-3 text-left text-2xl">
        {t('job-no-exist')}
      </p>
    );
  }

  if (job && (!job?.applications || job?.applications?.length === 0)) {
    return (
      <p data-testid="no-apps-msg" className="mb-3 text-left text-2xl">
        {t('no-applications')}😥
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {job.applications?.map((application, index) => {
        return (
          <Card
            key={index}
            data-testid={`profile-card-${index}`}
            className="w-full hover:bg-opacity-[0.18]"
          >
            <div className="flex items-center justify-between space-x-4">
              <Link
                href={`/profile/${application.applicantId}`}
                className="flex items-center justify-start space-x-4"
              >
                <div className="flex items-center space-x-4">
                  <span>
                    <ImageOptimized
                      data-testid="test-coverphoto"
                      className="h-8 min-h-[2rem] w-8 min-w-[2rem] rounded-full md:h-12 md:w-12"
                      src={application?.applicantProfilePic}
                      alt={application?.applicantName}
                      width={32}
                      height={32}
                    />
                  </span>
                  <div className="flex flex-col">
                    <div className="break-all text-sm md:text-lg">
                      {application?.applicantName}
                    </div>
                  </div>
                </div>
              </Link>
              <div
                data-testid="application-buttons-container"
                className="flex flex-wrap gap-2"
              >
                {application?.documents?.map((document, index) => {
                  return (
                    document?.link && (
                      <Link href={document?.link || ''} key={index}>
                        <Button className="flex gap-1">
                          <GrDocumentDownload />
                          {document?.name}
                        </Button>
                      </Link>
                    )
                  );
                })}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
