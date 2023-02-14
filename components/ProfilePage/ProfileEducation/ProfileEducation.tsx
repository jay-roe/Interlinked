import type { User } from '@/types/User';

export default function ProfileEducation({
  currentUser,
}: {
  currentUser: User;
}) {
  return (
    <div>
      {currentUser.education.map((ed, index) => (
        <div
          key={index}
          style={{
            border: '1px solid white',
            borderRadius: '6px',
            padding: '1em',
            marginBottom: '1em',
          }}
        >
          {ed.image && <img src={ed.image} alt={ed.name} />}
          <h3>{ed.name}</h3>
          <h4>{ed.location}</h4>
          <h6>
            {ed.startDate.toDate().getFullYear()} -{' '}
            {ed.endDate ? ed.endDate.toDate().getFullYear() : 'present'}
          </h6>
          <div>{ed.description}</div>
        </div>
      ))}
    </div>
  );
}
