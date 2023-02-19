import { User } from '@/types/User';
import SocialIcon from '../SocialIcon/SocialIcon';

export default function SocialIconGroup({
  socials,
}: {
  socials: User['socials'];
}) {
  return (
    <div
      data-testid="socials"
      className="flex flex-row justify-center gap-2 md:justify-start"
    >
      {socials &&
        Object.keys(socials)
          .filter((social) => socials[social].length > 0)
          .map((social: keyof User['socials'], index) => {
            return (
              <a
                key={index}
                className="text-white no-underline transition-all hover:text-accent-orange"
                href={socials[social]}
              >
                <SocialIcon social={social} />
              </a>
            );
          })}
    </div>
  );
}
