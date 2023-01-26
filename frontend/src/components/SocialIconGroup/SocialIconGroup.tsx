import { User } from "../../types/User";
import { FaGithub, FaInstagram } from "react-icons/fa";

export default function SocialIconGroup({
  socials,
}: {
  socials: User["socials"];
}) {
  const iconMap = {
    github: <FaGithub size={30} />,
    instagram: <FaInstagram size={30} />,
  };

  return (
    <div>
      {socials && Object.keys(socials).map((social, index) => {
        return (
          <a
            key={index}
            style={{ textDecoration: "none", color: "black" }}
            href={socials[social]}
          >
            {iconMap[social]}
          </a>
        );
      })}
    </div>
  );
}
