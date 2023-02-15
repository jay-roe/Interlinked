import CardStack from '@/components/CardStack/CardStack';
import type { User } from '@/types/User';

export default function ProfileExperience({
  currentUser,
}: {
  currentUser: User;
}) {
  return (
    <div>
      <CardStack>
        {/* {currentUser.experience.map((exp, index) => (
          <div
            key={index}
            style={{
              border: '1px solid white',
              borderRadius: '6px',
              padding: '1em',
              marginBottom: '1em',
            }}
          >
            {exp.image && <img src={exp.image} alt={exp.title} />}
            <h3>{exp.title}</h3>
            <h4>{exp.employer}</h4>
            <h5>{exp.location}</h5>
            <h6>
              {exp.startDate.toDate().toLocaleDateString()}
              {exp.endDate
                ? ' - ' + exp.endDate.toDate().toLocaleDateString()
                : ''}
            </h6>
            <div>{exp.description}</div>
          </div>
        ))} */}
        <div>
          <h2>First Card</h2>
          <h3>Some more content down here</h3>
          <p>Bullet points about experience</p>
        </div>
        <div>
          <h2>Second Card</h2>
        </div>
      </CardStack>
    </div>
  );
}
