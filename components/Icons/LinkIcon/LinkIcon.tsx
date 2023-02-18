import { FaLink } from 'react-icons/fa';

export default function LinkIcon({
  linked,
  showText,
  size = 40,
}: {
  linked?: boolean;
  showText?: boolean;
  size?: number;
}) {
  // Linked, show 'Unlink' button
  if (linked) {
    return (
      <div
        data-testid="unlink-btn"
        className="flex min-w-min basis-4 text-accent-orange"
      >
        <FaLink size={size} />
        {showText && <p>Unlink</p>}
      </div>
    );
  }

  // Not yet linked, show 'Link' button
  return (
    <div data-testid="link-btn" className="flex min-w-min basis-4">
      <FaLink
        size={size}
        viewBox="-21 -21 554 554"
        color="transparent"
        stroke="orange"
        strokeWidth="1rem"
      />
      {showText && (
        <p data-testid="link-prompt" className="text-accent-orange">
          Link
        </p>
      )}
    </div>
  );
}
