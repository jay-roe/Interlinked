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
        <div id={`stack_card_1`} key="1">
          <h2>First Card</h2>
        </div>
        <div id={`stack_card_2`} key="2">
          <h2>Second Card</h2>
        </div>
      </CardStack>
    </div>
  );
}
