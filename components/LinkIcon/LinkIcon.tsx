import { FaLink } from "react-icons/fa";

export default function LinkIcon({
  linked,
  showText,
  size=40
}: {
  linked?: boolean;
  showText?: boolean;
  size?: number;
}) {
  // Linked, show 'Unlink' button
  if (linked) {
    return (
      <div className="flex min-w-min basis-4 text-accent-orange">
        <FaLink size={size} />
        {showText && <p>Unlink</p>}
      </div>
    );
  }

  // Not yet linked, show 'Link' button
  return (
    <div className="flex min-w-min basis-4">
      <FaLink size={size} viewBox='-21 -21 554 554' color='transparent' stroke='orange' strokeWidth='1rem' />
      {showText && <p className="text-accent-orange">Link</p>}
    </div>
  );
}
