/* eslint-disable @next/next/no-img-element */
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import DeleteAccountPopup from '@/components/DeleteAccountPopup/DeleteAccountPopup';
import { useRouter } from 'next/navigation';
import SocialIconGroup from '@/components/Icons/SocialIconGroup/SocialIconGroup';

import type { User } from '@/types/User';
import type { Language } from '@/types/User';

import ProfileHeading from '@/components/ProfilePage/ProfileHeading/ProfileHeading';
import ProfileContact from '@/components/ProfilePage/ProfileContact/ProfileContact';
import ViewLinkButton from '@/components/Buttons/LinkButton/ViewLinkButton';
import ProfileLanguages from '@/components/ProfilePage/ProfileLanguages/ProfileLanguages';
import ProfileCodingLanguages from '@/components/ProfilePage/ProfileCodingLanguages/ProfileCodingLanguages';
import ProfileEducation from '@/components/ProfilePage/ProfileEducation/ProfileEducation';
import ProfileCourses from '@/components/ProfilePage/ProfileCourses/ProfileCourses';
import ProfileExperience from '@/components/ProfilePage/ProfileExperience/ProfileExperience';
import ProfileProjects from '@/components/ProfilePage/ProfileProjects/ProfileProjects';
import ProfileSkills from '@/components/ProfilePage/ProfileSkills/ProfileSkills';
import ProfileAwards from '@/components/ProfilePage/ProfileAwards/ProfileAwards';
import Link from '@/components/Link/Link';

import { db } from '@/config/firestore';
import { collection, doc, getDocs, Query, updateDoc } from 'firebase/firestore';
import Button from '@/components/Buttons/Button';
import ProfileSocials from '@/components/ProfilePage/ProfileSocials/ProfileSocials';
import { storage } from '@/config/firebase';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import ProfileVolunteering from '@/components/ProfilePage/ProfileVolunteering/ProfileVolunteering';
import ProfileCertifications from '@/components/ProfilePage/ProfileCertifications/ProfileCertifications';
import ProfilePrivacy from '@/components/ProfilePage/ProfilePrivacy/ProfilePrivacy';
import ProfileDocuments from '@/components/ProfilePage/ProfileDocuments/ProfileDocuments';
import ProfileJobHunt from '@/components/ProfilePage/ProfileJobHunt/ProfileJobHunt';

export default function EditProfile() {
  const router = useRouter();
  const { currentUser, authUser, deleteAccount, refresh } = useAuth();
  const [isModalShow, setIsModalShow] = useState(false);

  // Profile component states
  const [profilePicture, setProfilePicture] = useState<File>();
  const [profilePictureURL, setProfilePictureURL] = useState<string>(
    currentUser?.profilePicture
  );

  // Preview uploaded profile picture before posting to database
  useEffect(() => {
    if (!profilePicture) {
      return;
    }

    const objectUrl = URL.createObjectURL(profilePicture);
    setProfilePictureURL(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [profilePicture]);

  // Heading component states
  const [name, setName] = useState<string>(currentUser?.name || '');
  const [nameEditing, setNameEditing] = useState<boolean>(false);

  const [bio, setBio] = useState<string>(currentUser?.bio || '');
  const [bioEditing, setBioEditing] = useState<boolean>(false);

  const [isPrivate, setIsPrivate] = useState<boolean>(
    currentUser?.isPrivate || false
  ); //defaults to false
  const [privacyEditing, setPrivacyEditing] = useState<boolean>(false);

  // Job Notifs component states
  const [isWantJobNotif, setIsWantJobNotif] = useState<boolean>(
    currentUser?.isWantJobNotif || false
  ); //defaults to false
  const [jobNotifEditing, setJobNotifEditing] = useState<boolean>(false);

  // Documents component states
  const [resume, setResume] = useState<User['resume']>(
    currentUser?.resume || null
  );
  const [resumeEditing, setResumeEditing] = useState<boolean>(false);

  const [coverLetter, setCoverLetter] = useState<User['coverLetter']>(
    currentUser?.coverLetter || null
  );
  const [coverLetterEditing, setCoverLetterEditing] = useState<boolean>(false);

  // Language component states
  const [languageEditing, setLanguageEditing] = useState<boolean>(false);

  const [languages, setLanguages] = useState<User['languages']>(
    currentUser?.languages || []
  );
  const [languagesHovering, setLanguagesHovering] = useState<boolean[]>(
    currentUser?.languages?.map(() => false)
  );
  const [newLanguage, setNewLanguage] = useState<Language>({ title: '' });

  // Socials component states
  const [socials, setSocials] = useState<User['socials']>(
    currentUser?.socials || ({ github: '', instagram: '' } as User['socials'])
  );
  const [socailsEditing, setSocialsEditing] = useState<boolean>(false);

  // Contact component states
  const [email, setEmail] = useState<string>(currentUser?.email);
  const [phone, setPhone] = useState<string>(currentUser?.phone || '');
  const [contactEditing, setContactEditing] = useState<boolean>(false);

  // Education component states
  const [education, setEducation] = useState<User['education']>(
    currentUser?.education
  );
  const [educationEditing, setEducationEditing] = useState<boolean[]>(
    currentUser?.education.map(() => false)
  );

  // Coding Languages component states
  const [codingLanguages, setCodingLanguages] = useState<
    User['codingLanguages']
  >(currentUser?.codingLanguages);
  const [codingLanguagesHovering, setCodingLanguagesHovering] = useState<
    boolean[]
  >(currentUser?.codingLanguages.map(() => false));
  const [newCodingLanguage, setNewCodingLanguage] = useState<string>('');

  // Award component states
  const [awards, setAwards] = useState<User['awards']>(currentUser?.awards);
  const [awardsEditing, setAwardsEditing] = useState<boolean[]>(
    currentUser?.awards.map(() => false)
  );

  // Skills component states
  const [skills, setSkills] = useState<User['skills']>(currentUser?.skills);
  const [skillsEditing, setSkillsEditing] = useState<boolean[]>(
    currentUser?.skills.map(() => false)
  );

  // Projects component states
  const [projects, setProjects] = useState<User['projects']>(
    currentUser?.projects
  );
  const [projectsEditing, setProjectsEditing] = useState<boolean[]>(
    currentUser?.projects.map(() => false)
  );

  // Experience component states
  const [experience, setExperience] = useState<User['experience']>(
    currentUser?.experience
  );
  const [experienceEditing, setExperienceEditing] = useState<boolean[]>(
    currentUser?.experience.map(() => false)
  );

  // Courses component states
  const [courses, setCourses] = useState<User['courses']>(currentUser?.courses);
  const [coursesEditing, setCoursesEditing] = useState<boolean[]>(
    currentUser?.courses.map(() => false)
  );

  // Ceritifications component states
  const [certifications, setCertifications] = useState<User['certifications']>(
    currentUser?.certifications || []
  );
  const [certificationsEditing, setCertificationsEditing] = useState(
    currentUser?.certifications
      ? currentUser?.certifications.map(() => false)
      : []
  );

  // Volunteering component states
  const [volunteering, setVolunteering] = useState<User['volunteering']>(
    currentUser?.volunteering
  );
  const [volunteeringEditing, setVolunteeringEditing] = useState(
    currentUser?.volunteering.map(() => false)
  );

  // User not logged in
  if (!currentUser || !authUser) {
    return (
      <div className="text-white">
        <h1 className="text-lg font-bold">Your Profile</h1>
        <h2 data-testid="profile-login-prompt">
          You must be logged in to edit your profile.
        </h2>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/register">
          <Button>Register</Button>
        </Link>
      </div>
    );
  }

  const statesToUpdate: Partial<User> = {
    name: name,
    nameCaseInsensitive: name?.toLowerCase(),
    bio: bio,
    languages: languages,
    education: education.filter((_, i) => !educationEditing[i]),
    phone: phone,
    email: !contactEditing ? email : currentUser.email,
    socials: socials,
    codingLanguages: codingLanguages,
    awards: awards.filter((_, i) => !awardsEditing[i]),
    skills: skills,
    projects: projects,
    experience: experience,
    courses: courses,
    certifications: certifications.filter((_, i) => !certificationsEditing[i]),
    volunteering: volunteering.filter((_, i) => !volunteeringEditing[i]),
    isPrivate: isPrivate,
    isWantJobNotif: isWantJobNotif,
    resume: resume,
    coverLetter: coverLetter,
  };

  async function uploadProfilePicture() {
    const profilePictureRef = ref(
      storage,
      `users/${authUser.uid}/profilePicture/${profilePicture.name}`
    );

    // Upload new profile picture, update database with new link
    await uploadBytes(profilePictureRef, profilePicture);
    statesToUpdate.profilePicture = await getDownloadURL(profilePictureRef);
  }

  async function updateAccount() {
    const save = confirm('Unsaved changes will be lost. Continue?');
    if (!save) {
      return;
    }
    try {
      if (profilePicture) {
        await uploadProfilePicture();
      }

      await updateDoc(doc(db.users, authUser.uid), statesToUpdate);

      await refresh();
      alert('Successfully updated your profile!');
      router.push('/profile');
    } catch (err) {
      console.error(err);
    }
  }

  async function onDeleteAccount() {
    try {
      await deleteAccount();

      // Redirect to home page, with state saying account was just deleted
      router.push('/'); // TODO reintroduce deleted account alert, { state: { deletedAccount: true } });
      setIsModalShow(false);
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  if (currentUser.isCompany) {
    return (
      <div className="container mx-auto text-white">
        <div className="mb-3 flex justify-between">
          <h1 className="text-7xl font-extrabold">Edit Profile</h1>
          <Button
            className="max-h-10 self-end"
            data-testid="update-account-button"
            onClick={updateAccount}
          >
            Save Changes
          </Button>
        </div>
        <div className="mb-3 rounded-xl bg-white bg-opacity-[8%] p-5">
          <ProfileHeading
            isEditable
            profilePictureURL={profilePictureURL}
            setProfilePicture={setProfilePicture}
            name={name}
            setName={setName}
            nameEditing={nameEditing}
            setNameEditing={setNameEditing}
            bio={bio}
            setBio={setBio}
            bioEditing={bioEditing}
            setBioEditing={setBioEditing}
            uid={''}
          />

          <ProfilePrivacy
            isEditable
            isPrivate={isPrivate}
            setIsPrivate={setIsPrivate}
            privacyEditing={privacyEditing}
            setPrivacyEditing={setPrivacyEditing}
          />

          <ProfileSocials
            isEditable
            socials={socials}
            setSocials={setSocials}
            socialsEditing={socailsEditing}
            setSocialsEditing={setSocialsEditing}
          />

          <ProfileContact
            isEditable
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            contactEditing={contactEditing}
            setContactEditing={setContactEditing}
          />
        </div>
        <div className="flex justify-end">
          <Button data-testid="update-account-button2" onClick={updateAccount}>
            Save Changes
          </Button>
        </div>

        <h1 className="mb-3 text-3xl font-extrabold">Manage Profile</h1>
        <p className="mb-1">
          We&apos;re sorry to see you go. Click the button below to permanently
          delete your account and all of its information.
        </p>
        <Button
          data-testid="danger-zone"
          variant="danger"
          onClick={() => setIsModalShow(true)}
        >
          Delete account
        </Button>
        <DeleteAccountPopup
          show={isModalShow}
          onHide={() => setIsModalShow(false)}
          onDeleteAccount={onDeleteAccount}
        />
      </div>
    );
  }

  // User logged in
  return (
    <div className="container mx-auto text-white">
      <div className="mb-3 flex justify-between">
        <h1 className="text-7xl font-extrabold">Edit Profile</h1>
        <Button
          className="max-h-10 self-end"
          data-testid="update-account-button"
          onClick={updateAccount}
        >
          Save Changes
        </Button>
      </div>
      <div className="mb-3 rounded-xl bg-white bg-opacity-[8%] p-5">
        <ProfileHeading
          isEditable
          profilePictureURL={profilePictureURL}
          setProfilePicture={setProfilePicture}
          name={name}
          setName={setName}
          nameEditing={nameEditing}
          setNameEditing={setNameEditing}
          bio={bio}
          setBio={setBio}
          bioEditing={bioEditing}
          setBioEditing={setBioEditing}
          uid={''}
        />

        <ProfilePrivacy
          isEditable
          isPrivate={isPrivate}
          setIsPrivate={setIsPrivate}
          privacyEditing={privacyEditing}
          setPrivacyEditing={setPrivacyEditing}
        />

        <ProfileSocials
          isEditable
          socials={socials}
          setSocials={setSocials}
          socialsEditing={socailsEditing}
          setSocialsEditing={setSocialsEditing}
        />

        <ViewLinkButton linkedUserIds={currentUser.linkedUserIds} />

        <ProfileJobHunt
          isEditable
          userid={authUser.uid}
          isWantJobNotif={isWantJobNotif}
          setIsWantJobNotif={setIsWantJobNotif}
          jobNotifEditing={jobNotifEditing}
          setJobNotifEditing={setJobNotifEditing}
        />

        <ProfileContact
          isEditable
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          contactEditing={contactEditing}
          setContactEditing={setContactEditing}
        />

        <ProfileDocuments
          isEditable
          resume={resume}
          setResume={setResume}
          coverLetter={coverLetter}
          setCoverLetter={setCoverLetter}
          resumeEditing={resumeEditing}
          setResumeEditing={setResumeEditing}
          coverLetterEditing={coverLetterEditing}
          setCoverLetterEditing={setCoverLetterEditing}
          uid={authUser.uid}
        />

        <ProfileLanguages
          isEditable
          languages={languages}
          languagesHovering={languagesHovering}
          newLanguage={newLanguage}
          setLanguages={setLanguages}
          setLanguagesHovering={setLanguagesHovering}
          setNewLanguage={setNewLanguage}
        />

        {/* TODO: change coding languages picture */}

        <ProfileCodingLanguages
          isEditable
          codingLanguages={codingLanguages}
          codingLanguagesHovering={codingLanguagesHovering}
          newCodingLanguage={newCodingLanguage}
          setCodingLanguages={setCodingLanguages}
          setCodingLanguagesHovering={setCodingLanguagesHovering}
          setNewCodingLanguage={setNewCodingLanguage}
        />

        <ProfileEducation
          isEditable
          education={education}
          educationEditing={educationEditing}
          setEducation={setEducation}
          setEducationEditing={setEducationEditing}
        />

        <ProfileCourses
          isEditable
          courses={courses}
          coursesEditing={coursesEditing}
          setCoursesEditing={setCoursesEditing}
          setCourses={setCourses}
        />

        <ProfileExperience
          isEditable
          experience={experience}
          experienceEditing={experienceEditing}
          setExperience={setExperience}
          setExperienceEditing={setExperienceEditing}
        />

        <ProfileProjects
          isEditable
          projects={projects}
          projectsEditing={projectsEditing}
          setProjectsEditing={setProjectsEditing}
          setProjects={setProjects}
        />

        <ProfileSkills
          isEditable
          skills={skills}
          skillsEditing={skillsEditing}
          setSkills={setSkills}
          setSkillsEditing={setSkillsEditing}
        />

        <ProfileAwards
          isEditable
          awards={awards}
          awardsEditing={awardsEditing}
          setAwards={setAwards}
          setAwardsEditing={setAwardsEditing}
        />

        <ProfileCertifications
          isEditable
          certifications={certifications}
          setCertifications={setCertifications}
          certificationsEditing={certificationsEditing}
          setCertificationsEditing={setCertificationsEditing}
        />

        <ProfileVolunteering
          isEditable
          volunteering={volunteering}
          setVolunteering={setVolunteering}
          volunteeringEditing={volunteeringEditing}
          setVolunteeringEditing={setVolunteeringEditing}
        />
      </div>
      <div className="flex justify-end">
        <Button data-testid="update-account-button2" onClick={updateAccount}>
          Save Changes
        </Button>
      </div>

      <h1 className="mb-3 text-3xl font-extrabold">Manage Profile</h1>
      <p className="mb-1">
        We&apos;re sorry to see you go. Click the button below to permanently
        delete your account and all of its information.
      </p>
      <Button
        data-testid="danger-zone"
        variant="danger"
        onClick={() => setIsModalShow(true)}
      >
        Delete account
      </Button>
      <DeleteAccountPopup
        show={isModalShow}
        onHide={() => setIsModalShow(false)}
        onDeleteAccount={onDeleteAccount}
      />
    </div>
  );
}
