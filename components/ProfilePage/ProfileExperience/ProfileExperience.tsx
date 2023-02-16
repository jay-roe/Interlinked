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
        {currentUser.experience.map((exp, index) => (
          <div key={index}>
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
        ))}
      </CardStack>
    </div>
  );
}
