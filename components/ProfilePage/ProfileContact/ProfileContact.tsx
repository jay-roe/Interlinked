import type { User } from '@/types/User';

export default function ProfileContact({ currentUser }: { currentUser: User }) {
  return (
    <div>
      <p>
        ✉ <a href={`mailto:${currentUser.email}`}>{currentUser.email}</a>{' '}
        {/* TODO: Add to edit profile: <VerifiedIcon verified={authUser.emailVerified} showText /> */}
      </p>
      {currentUser.phone && (
        <p>
          📞 <a href={`telno:${currentUser.phone}`}>{currentUser.phone}</a>
        </p>
      )}
    </div>
  );
}
