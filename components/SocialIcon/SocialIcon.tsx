import { User } from "@/types/User";
import { FaGithub, FaInstagram } from "react-icons/fa";

// Add other social media options to this map to represent icon elements
const iconMap = {
  github: <FaGithub size={30} />,
  instagram: <FaInstagram size={30} />,
};

export default function SocialIcon({
  social,
}: {
  social: keyof User["socials"];
}) {
  return iconMap[social];
}
