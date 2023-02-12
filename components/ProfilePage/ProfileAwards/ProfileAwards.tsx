import type { User } from '@/types/User';

export default function ProfileAwards({ currentUser }: { currentUser: User }) {
  return (
    <div>
      {currentUser.awards.map((award, index) => (
        <div
          key={index}
          style={{
            border: '1px solid white',
            borderRadius: '6px',
            padding: '1em',
            marginBottom: '1em',
          }}
        >
          <h3>{award.title}</h3>
          <h6>{award.date.toDate().toLocaleDateString()}</h6>
          <div>{award.description}</div>
        </div>
      ))}
    </div>
  );
}
