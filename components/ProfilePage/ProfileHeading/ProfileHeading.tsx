import type { User } from '@/types/User';

/* eslint-disable @next/next/no-img-element */
export default function ProfileHeading({ currentUser }: { currentUser: User }) {
  return (
    <div className="mb-5 block gap-5 md:flex md:max-w-xl">
      {currentUser.profilePicture && (
        <div className="row-auto">
          <img
            className="m-auto h-40 w-40 rounded-full md:w-52"
            src={currentUser.profilePicture}
            alt={currentUser.name}
          />
        </div>
      )}
      <div className="row-auto place-self-start self-center text-center md:text-left">
        <h1 data-testid="profile-title" className="text-3xl font-extrabold">
          {currentUser?.name || 'No name provided.'}
        </h1>
        <p>{currentUser.bio || 'No bio given.'}</p>
      </div>
    </div>
  );
}
