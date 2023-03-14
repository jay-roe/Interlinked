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
      <div className="flex min-w-min basis-4">
        <div
          data-testid="unlink-btn-icon"
          className="flex min-w-min basis-4 text-accent-orange"
        >
          <FaLink className="my-auto" size={size} />
        </div>
        {showText && (
          <p className="my-auto ml-2 min-w-min basis-4 text-accent-orange">
            Unlink
          </p>
        )}
      </div>
    );
  }

  // Not yet linked, show 'Link' button
  return (
    <div className="flex min-w-min basis-4">
      <div data-testid="link-btn-icon" className="flex min-w-min basis-4">
        <FaLink
          size={size}
          viewBox="-21 -21 554 554"
          color="transparent"
          className="my-auto"
          stroke="orange"
          strokeWidth="1rem"
        />
      </div>
      {showText && (
        <p
          data-testid="link-prompt"
          className="my-auto ml-2 flex min-w-min basis-4 text-accent-orange"
        >
          Link
        </p>
      )}
    </div>
  );
}
