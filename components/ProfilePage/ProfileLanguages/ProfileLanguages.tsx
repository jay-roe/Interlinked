import type { User } from '@/types/User';

export default function ProfileLanguages({
  currentUser,
}: {
  currentUser: User;
}) {
  return (
    <ul>
      {currentUser.languages.map((lang, index) => (
        <li key={index}>{lang}</li>
      ))}
    </ul>
  );
}
