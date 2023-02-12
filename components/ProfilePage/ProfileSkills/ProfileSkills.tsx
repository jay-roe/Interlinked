import type { User } from '@/types/User';

export default function ProfileSkills({ currentUser }: { currentUser: User }) {
  return (
    <ul>
      {currentUser.skills.map((skill, index) => (
        <li key={index}>{skill.name}</li>
      ))}
    </ul>
  );
}
