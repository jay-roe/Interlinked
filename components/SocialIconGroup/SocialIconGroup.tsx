import { User } from "@/types/User";
import SocialIcon from "../SocialIcon/SocialIcon";

export default function SocialIconGroup({
  socials,
}: {
  socials: User["socials"];
}) {
  return (
    <div className='flex flex-row gap-2'>
      {socials &&
        Object.keys(socials).map((social: keyof User["socials"], index) => {
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
